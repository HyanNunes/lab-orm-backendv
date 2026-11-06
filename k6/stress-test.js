import http from 'k6/http';
import { check, sleep } from 'k6';

const baseUrl = __ENV.BASE_URL || 'http://127.0.0.1:3000';

export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '30s', target: 25 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 150 },
        { duration: '30s', target: 0 }
    ],
    thresholds: {
        http_req_failed: ['rate<0.05'],
        checks: ['rate>0.95'],
        http_req_duration: ['p(95)<1500']
    }
};

export default function () {
    const response = http.get(`${baseUrl}/users`);
    check(response, {
        'GET /users retorna 200': result => result.status === 200,
        'resposta contém uma lista de usuários': result => Array.isArray(result.json())
    });
    sleep(0.1);
}
