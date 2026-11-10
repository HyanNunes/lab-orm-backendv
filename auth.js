const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
async function registerUser(name, email, plainPassword) {
    if (!plainPassword || plainPassword.length < 8) {
        throw new Error('A senha deve ter no mínimo 8 caracteres.');
    }
    // Geração assíncrona do hash com salt embutido
    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    // Sanitização da resposta removendo a senha do payload retornado
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
module.exports = { registerUser };
