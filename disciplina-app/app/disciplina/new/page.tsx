"use client";

import { setCookieSessionId } from "@/app/action";
import Navbar from "@/components/Navbar";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function NewDiscipline() {
    const [name, setName] = useState("");
    const [school, setSchool] = useState("");
    const [startTime, setStartTime] = useState("");

    const [submitEnable, setSubmitEnable] = useState<boolean>(false)
    const [sessionId, setSessionId] = useState<string>("");
    const session = useSession();

    const router = useRouter();

    useEffect(() => {
        if (session) {
            getSession().then((session) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setSessionId((session as any).sessionId);
            });
        }

        const fetchSession = async () => {
            await setCookieSessionId(sessionId);
        };

        fetchSession();
    }, [session, sessionId]);

    useEffect(() => {
        if (name && school && startTime) {
            console.log("true")
            setSubmitEnable(true);
        }
    }, [name, school, startTime])

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (!submitEnable) {
            return
        }

        // Faça um fetch para o backend POST /api/discipline/create/
        await fetch(`${process.env.API_URL}/api/discipline/create/`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: JSON.stringify({
                name: name,
                school: school,
                schedule: startTime,
            }),
            headers: { "Content-Type": "application/json" },
        }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erro ao fazer a solicitação: ${res.status}}`);
                }

                toast.success('Disciplina criada com sucesso!');
                setTimeout(() => {
                    router.replace("/disciplina");
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

    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-md p-4 shadow sm:p-8 bg-gray-50 text-gray-800 drop-shadow-2xl">
                    <h2 className="mb-3 text-xl font-semibold">Cadastrar Nova Disciplina</h2>
                    <form onSubmit={handleSubmit} noValidate className="space-y-8">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nome da Disciplina"
                                    className="focus:ring-0 appearance-none w-full px-3 py-2 transition duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="school" className="text-sm">
                                    Escola
                                </label>
                                <input
                                    type="text"
                                    name="school"
                                    id="school"
                                    onChange={(e) => setSchool(e.target.value)}
                                    placeholder="Nome da Escola"
                                    className="focus:ring-0 appearance-none w-full px-3 py-2 transition duration-300"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="startTime" className="text-sm">
                                    Horário de Entrada
                                </label>
                                <input
                                    type="time"
                                    name="startTime"
                                    id="startTime"
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="focus:ring-0 w-full px-3 py-2 transition duration-300"
                                />
                            </div>
                        </div>
                        <button disabled={submitEnable} className="w-full px-8 py-3 font-semibold flex items-center justify-center transition duration-500 hover:scale-105 bg-gray-800 text-gray-50">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}