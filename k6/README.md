# Testes de desempenho com Grafana k6

Para o passo a passo, decisões de projeto e interpretação dos resultados, consulte [GUIA_K6.md](../GUIA_K6.md).

Os cenários exercitam `GET /users` da API Prisma. Prepare o banco e inicie o servidor na raiz do projeto:

Crie `.env` na raiz com a URL do SQLite:

```env
DATABASE_URL="file:./dev.db"
```

Depois gere o cliente, aplique as migrações e inicie a API:

```powershell
npx prisma generate
npx prisma migrate deploy
npm start
```

Instale o [Grafana k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) e, em outro terminal, execute:

```powershell
npm run test:k6:load
npm run test:k6:stress
```

O teste de carga mantém 10 usuários virtuais por um minuto. O teste de estresse aumenta gradualmente até 150 usuários virtuais. Ambos verificam o status HTTP e o formato da resposta, além de impor limites de falhas e latência. Defina `BASE_URL` para testar outro host, por exemplo:

```powershell
$env:BASE_URL = "http://localhost:3000"
npm run test:k6:load
```

O servidor disponibiliza `GET /health`, `GET /users`, `POST /users`, `GET /users/:id`, `POST /users/:id/tasks`, `PATCH /tasks/:id` e `DELETE /users/:id`. Os resultados variam conforme hardware, banco e ambiente; os limites dos testes são critérios iniciais, não uma garantia de capacidade em produção.
