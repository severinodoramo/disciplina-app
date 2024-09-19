"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid Credentials");
                return;
            }

            router.replace("home");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md p-4 shadow sm:p-8 bg-gray-50 text-gray-800 drop-shadow-2xl">
                <h2 className="mb-3 text-xl font-semibold">Entre na sua conta</h2>
                <form onSubmit={handleSubmit} noValidate className="space-y-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="user" className="text-sm">
                                Usuário
                            </label>
                            <input
                                type="user"
                                name="user"
                                id="user"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="InsCode"
                                className="focus:ring-0 appearance-none w-full px-3 py-2 transition duration-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="*******"
                                className="focus:ring-0 w-full px-3 py-2 transition duration-300"
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="flex items-center w-full my-4">
                            <p className="px-3 text-red-600">{error}</p>
                        </div>
                    )}
                    <button className="w-full px-8 py-3 font-semibold flex items-center justify-center transition duration-500 hover:scale-105 bg-gray-800 text-gray-50">
                        Entrar
                    </button>

                    <div className="flex justify-center">
                        <a href="/register" className="text-sm text-gray-800">
                            Criar conta
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}