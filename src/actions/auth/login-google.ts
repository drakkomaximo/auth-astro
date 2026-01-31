import { defineAction } from "astro:actions";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebase } from "@/firebase/config";
import { z } from "astro:schema";

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async (credentials) => {

        const credential = GoogleAuthProvider.credentialFromResult(credentials);

        if (!credential) {
            throw new Error('No credential found');
        }

        await signInWithCredential(firebase.auth, credential);
        return { ok: true };
    }
})