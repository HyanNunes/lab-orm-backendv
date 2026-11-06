const http = require('node:http');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const port = Number(process.env.PORT || 3000);
const maxBodyBytes = 1024 * 1024;

class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

function sendJson(response, statusCode, data) {
    response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(data));
}

async function readJsonBody(request) {
    const chunks = [];
    let size = 0;

    for await (const chunk of request) {
        size += chunk.length;
        if (size > maxBodyBytes) {
            throw new HttpError(413, 'Corpo da requisição excede o limite de 1 MB.');
        }
        chunks.push(chunk);
    }

    if (size === 0) {
        throw new HttpError(400, 'O corpo JSON é obrigatório.');
    }

    try {
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if (body === null || typeof body !== 'object' || Array.isArray(body)) {
            throw new Error('O corpo deve ser um objeto JSON.');
        }
        return body;
    } catch {
        throw new HttpError(400, 'O corpo deve conter um objeto JSON válido.');
    }
}

function validateUser(body) {
    if (typeof body.name !== 'string' || !body.name.trim()) {
        throw new HttpError(400, 'O campo name é obrigatório.');
    }
    if (typeof body.email !== 'string' || !body.email.trim()) {
        throw new HttpError(400, 'O campo email é obrigatório.');
    }
    return { name: body.name.trim(), email: body.email.trim() };
}

async function handleRequest(request, response) {
    const url = new URL(request.url || '/', 'http://localhost');
    const segments = url.pathname.split('/').filter(Boolean);

    if (request.method === 'GET' && url.pathname === '/health') {
        await prisma.$queryRaw`SELECT 1`;
        sendJson(response, 200, { status: 'ok' });
        return;
    }

    if (request.method === 'GET' && url.pathname === '/users') {
        const users = await prisma.user.findMany({
            take: 100,
            orderBy: { createdAt: 'desc' },
            include: { _count: { select: { tasks: true } } }
        });
        sendJson(response, 200, users);
        return;
    }

    if (request.method === 'POST' && url.pathname === '/users') {
        const user = await prisma.user.create({
            data: validateUser(await readJsonBody(request))
        });
        sendJson(response, 201, user);
        return;
    }

    if (segments.length === 2 && segments[0] === 'users' && request.method === 'GET') {
        const user = await prisma.user.findUnique({
            where: { id: segments[1] },
            include: { tasks: true }
        });
        if (!user) {
            throw new HttpError(404, 'Usuário não encontrado.');
        }
        sendJson(response, 200, user);
        return;
    }

    if (segments.length === 3 && segments[0] === 'users' &&
        segments[2] === 'tasks' && request.method === 'POST') {
        const body = await readJsonBody(request);
        if (typeof body.title !== 'string' || !body.title.trim()) {
            throw new HttpError(400, 'O campo title é obrigatório.');
        }
        if (body.description !== undefined && body.description !== null &&
            typeof body.description !== 'string') {
            throw new HttpError(400, 'O campo description deve ser texto ou null.');
        }

        const task = await prisma.task.create({
            data: {
                title: body.title.trim(),
                description: body.description?.trim() || null,
                user: { connect: { id: segments[1] } }
            }
        });
        sendJson(response, 201, task);
        return;
    }

    if (segments.length === 2 && segments[0] === 'tasks' &&
        request.method === 'PATCH') {
        const body = await readJsonBody(request);
        if (typeof body.completed !== 'boolean') {
            throw new HttpError(400, 'O campo completed deve ser booleano.');
        }
        const task = await prisma.task.update({
            where: { id: segments[1] },
            data: { completed: body.completed }
        });
        sendJson(response, 200, task);
        return;
    }

    if (segments.length === 2 && segments[0] === 'users' &&
        request.method === 'DELETE') {
        await prisma.user.delete({ where: { id: segments[1] } });
        response.writeHead(204);
        response.end();
        return;
    }

    throw new HttpError(404, 'Rota não encontrada.');
}

function handleError(error, response) {
    if (response.headersSent) {
        console.error(error);
        response.destroy();
        return;
    }

    if (error instanceof HttpError) {
        sendJson(response, error.statusCode, { error: error.message });
        return;
    }
    if (error?.code === 'P2002') {
        sendJson(response, 409, { error: 'Já existe um usuário com este email.' });
        return;
    }
    if (error?.code === 'P2025') {
        sendJson(response, 404, { error: 'Registro não encontrado.' });
        return;
    }

    console.error(error);
    sendJson(response, 500, { error: 'Erro interno do servidor.' });
}

const server = http.createServer((request, response) => {
    handleRequest(request, response).catch(error => handleError(error, response));
});

server.listen(port, () => {
    console.log(`API disponível em http://localhost:${port}`);
});

async function shutdown() {
    server.close(async error => {
        if (error) {
            console.error(error);
            process.exitCode = 1;
        }
        await prisma.$disconnect();
    });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
