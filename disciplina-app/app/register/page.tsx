"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (password !== confirm_password) {
            setError("Passwords do not match");
            return;
        }

        try {
            await fetch(`${process.env.API_URL}/api/user/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, confirm_password }),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Erro ao fazer a solicitação: ${res.status}}`);
                    }

                    toast.success('Conta criada com sucesso!');
                    setTimeout(() => {
                        router.replace("login");
                    }, 3000);
                })
                .catch((error) => {
                    if (error.response) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        error.response.json().then((data: any) => {
                            console.error("Erro:", data);
                        });
                    } else {
                        console.error("Erro:", error.message);
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex min-h-screen items-center justify-center px-6">
                <div className="w-full max-w-md p-4 shadow sm:p-8 bg-gray-50 text-gray-800 drop-shadow-2xl">
                    <h2 className="mb-3 text-xl font-semibold">Crie sua conta</h2>
                    <form onSubmit={handleSubmit} noValidate className="space-y-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="user" className="text-sm">
                                    Usuário
                                </label>
                                <input
                                    type="text"
                                    name="user"
                                    id="user"
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="InsCode"
                                    className="focus:ring-0 appearance-none w-full px-3 py-2 transition duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="*******"
                                    className="focus:ring-0 w-full px-3 py-2 transition duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm">
                                    Confirmação de Senha
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}