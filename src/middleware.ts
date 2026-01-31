import type { MiddlewareNext } from 'astro';
import { defineMiddleware } from 'astro:middleware';
import { firebase } from './firebase/config';

const privateRoutes = ['/protected'];
const notPrivateRoutes = ['/login', '/register', '/forgot-password'];

export const onRequest = defineMiddleware(async ({ url, request, locals, redirect }, next) => {

    const isLoggedIn = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser;

    locals.isLoggedIn = isLoggedIn;
    if (user) {
        locals.user = {
            avatar: user.photoURL ?? '',
            email: user.email!,
            name: user.displayName!,
            emailVerified: user.emailVerified
        }
    }

    if (privateRoutes.includes(url.pathname) && !isLoggedIn) {
        return redirect('/');
    }

    if (notPrivateRoutes.includes(url.pathname) && isLoggedIn) {
        return redirect('/');
    }


    return next();
});