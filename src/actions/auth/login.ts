import { defineAction } from "astro:actions";
import { object, z } from "astro:schema";
import { firebase } from "@/firebase/config";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export const loginUser = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ email, password, remember_me }, { cookies }) => {

        if (remember_me) {
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
                path: '/',
            });
        } else {
            cookies.delete('email', {
                path: '/',
            });
        }


        try {
            const userCredential = await signInWithEmailAndPassword(firebase.auth, email, password);

            return {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
            };

        } catch (error) {
            const firebaseError = error as AuthError;

            if (firebaseError.code === 'auth/user-not-found') {
                throw new Error('User not found');
            }

            if (firebaseError.code === 'auth/wrong-password') {
                throw new Error('Wrong password');
            }

            throw new Error('Error logging in');
        }

    }
})