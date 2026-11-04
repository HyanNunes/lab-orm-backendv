# Relatório de Execução: ORM e Persistência com Prisma (JavaScript)
**Atividade Prática 1**

## 1. Objetivo
Demonstrar a configuração de um banco de dados relacional via SQLite, mapeamento objeto-relacional (ORM) com Prisma, criação de relacionamentos 1:N com exclusão em cascata, e execução de operações CRUD completas através de script em JavaScript puro (`crud.js`).

---

## 2. Evidências de Execução do Script (`node crud.js`)

Abaixo encontra-se o registro da execução bem-sucedida do script na raiz do projeto:

### Comando Executado:
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