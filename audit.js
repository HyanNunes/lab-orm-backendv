const { PrismaClient } = require('@prisma/client');
const { registerUser, authenticateUser } = require('./auth');
const prisma = new PrismaClient();
async function runSecurityAudit() {
    /*const registered = await registerUser('Carlos Silveira', 'carlos@sec.org',
        'SuperSecretPass123!');
    console.log('Usuário registrado com sucesso (payload seguro):', registered);*/
    // Inspeção direta no banco via query SQL pura
    const rawRecords = await prisma.$queryRaw`SELECT email, password FROM User WHERE email = 'carlos@sec.org'`;
    const hash = rawRecords[0].password;
    console.log('Registro Bruto no Banco de Dados:', rawRecords[0]);
    // Verificação da estrutura do hash Bcrypt ($2b$[cost]$[22 salt][31 hash])
    console.log('Prefixo Bcrypt detectado ($2b$):', hash.startsWith('$2b$'));
    console.log('Tamanho total da string hash:', hash.length); // Deve ser exatamente 60 caracteres
    // Teste de autenticação com sucesso
    const authSuccess = await authenticateUser('carlos@sec.org',
        'SuperSecretPass123!');
    console.log('Autenticação bem-sucedida:', authSuccess.email);
}
runSecurityAudit()
    .catch(err => console.error(err))
    .finally(async () => await prisma.$disconnect());
