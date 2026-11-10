# Relatório de Execução: ORM e Persistência com Prisma (JavaScript)
**Atividade Prática 1**


## Evidências de Execução do Script (`node crud.js`)

![Registro da criação do banco de dados no prisma studio](./imagens/Registro%20prisma%20studio.png)
![Registro BD usuário](./imagens/Registro%20BD%20User.png)
![Registro BD tarefas](./imagens/Registro%20BD%20Tasks.png)

### Abaixo o registro da execução bem-sucedida do script na raiz do projeto:

PS D:\Nassau\Projetos\lab-orm-backendv> node crud.js
Usuário Criado: {
  id: '2d6fe879-1cc7-48b3-af2a-c7e9c618f97a',
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  createdAt: 2026-11-04T21:32:37.101Z,
  tasks: [
    {
      id: 'f75eff84-2c3a-4415-8ca4-f5a82f612791',
      title: 'Construir algoritmo inicial',
      description: null,
      completed: true,
      userId: '2d6fe879-1cc7-48b3-af2a-c7e9c618f97a',
      createdAt: 2026-11-04T21:32:37.101Z
    },
    {
      id: '5fce1ce3-e5c5-4c1c-bc5b-2f18bde23c56',
      title: 'Revisar anotações de Babbage',
      description: null,
      completed: false,
      userId: '2d6fe879-1cc7-48b3-af2a-c7e9c618f97a',
      createdAt: 2026-11-04T21:32:37.101Z
    }
  ]
}
Tarefas Pendentes: [
  {
    id: '5fce1ce3-e5c5-4c1c-bc5b-2f18bde23c56',
    title: 'Revisar anotações de Babbage',
    description: null,
    completed: false,
    userId: '2d6fe879-1cc7-48b3-af2a-c7e9c618f97a',
    createdAt: 2026-11-04T21:32:37.101Z,
    user: {
      id: '2d6fe879-1cc7-48b3-af2a-c7e9c618f97a',
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      createdAt: 2026-11-04T21:32:37.101Z
    }
  }
]
Tarefa Atualizada: {
  id: '5fce1ce3-e5c5-4c1c-bc5b-2f18bde23c56',
  title: 'Revisar anotações de Babbage',
  description: null,
  completed: true,
  userId: '2d6fe879-1cc7-48b3-af2a-c7e9c618f97a',
  createdAt: 2026-11-04T21:32:37.101Z
}
Usuário e tarefas associadas removidos via cascata.


# Criptografia Armazenamento Seguro com JavaScript
**Atividade Prática 2:** 

## Evidências de Execução do Script (`node audit.js`)
Execução demonstrativa de teste de autenticação validando casos de sucesso e
de falha com mensagens genéricas.
![Validação: caso de sucesso](./imagens/credenciais%20válidas.png)
![Validação: caso de falha](./imagens/credenciais%20inválidas.png)

### Abaixo o registro da execução bem-sucedida do script na raiz do projeto:

PS D:\Nassau\Projetos\lab-orm-backendv> node audit.js
Usuário registrado com sucesso (payload seguro): {
  id: 'e39d8d72-3c7a-492f-8873-2d459038d754',
  name: 'Carlos Silveira',
  email: 'carlos@sec.org',
  createdAt: 2026-11-10T00:58:49.681Z
}
Registro Bruto no Banco de Dados: {
  email: 'carlos@sec.org',
  password: '$2b$10$/tB2YEtcy7mYun5Vs1gIJeNZpSx.s5l6TxzX9g76aHuiRRhn6jozi'
}
Prefixo Bcrypt detectado ($2b$): true
Tamanho total da string hash: 60
Autenticação bem-sucedida: carlos@sec.org

![Comprovação visual(print do prisma studio)](./imagens/BD%20c%20bcrypt.png)