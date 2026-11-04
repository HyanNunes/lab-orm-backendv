const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    // CREATE (1:N transacional)
    const newUser = await prisma.user.create({
        data: {
            name: 'Ada Lovelace',
            email: 'ada@example.com',
            tasks: {
                create: [
                    { title: 'Construir algoritmo inicial', completed: true },
                    { title: 'Revisar anotações de Babbage', completed: false }
                ]
            }
        },
        include: { tasks: true }
    });
    console.log('Usuário Criado:', newUser);
    // READ com Filtro
    const tasks = await prisma.task.findMany({
        where: { completed: false },
        include: { user: true }
    });
    console.log('Tarefas Pendentes:', tasks);
    // UPDATE
    const updatedTask = await prisma.task.update({
        where: { id: tasks[0].id },
        data: { completed: true }
    });
    console.log('Tarefa Atualizada:', updatedTask);
    // DELETE
    await prisma.user.delete({
        where: { id: newUser.id }
    });
    console.log('Usuário e tarefas associadas removidos via cascata.');
}
main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
