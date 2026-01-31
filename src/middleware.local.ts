// Demostracion de middleware local

import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';

const privateRoutes = ['/protected'];

export const onRequest = defineMiddleware(async (context, next) => {

    const authHeader = context.request.headers.get('authorization') ?? '';

    const { pathname } = context.url;
    if (privateRoutes.includes(pathname)) {
        return checkLocalAuth(authHeader, next);

    }
    return next();
});

const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
    if (authHeaders) {
        const authValue = authHeaders.split(' ').at(-1) ?? 'user:password';
        const decodedAuthValue = atob(authValue).split(':');
        const [username, password] = decodedAuthValue;

        if (username === 'admin' && password === 'admin') {
            return next();
        }
    }

    return new Response('Invalid credentials', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
    });
}