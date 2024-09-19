"use client";

import { setCookieSessionId } from "@/app/action";
import Navbar from "@/components/Navbar";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Discipline } from "../../page";

export default function NewDiscipline({ params }: { params: { id: string } }) {
    const [discipline, setDiscipline] = useState<Discipline>();

    const [name, setName] = useState(discipline?.name);
    const [school, setSchool] = useState(discipline?.school);
    const [startTime, setStartTime] = useState(discipline?.schedule);

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
    }, [session]);

    useEffect(() => {
        if (session && sessionId) {
            const getDiscipline = async () => {
                await fetch(`${process.env.API_URL}/api/discipline/get/${params.id}/`, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(`Erro ao fazer a solicitação: ${res.status}`);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        setDiscipline(data.discipline);
                        setName(data.discipline.name);
                        setSchool(data.discipline.school);
                        setStartTime(data.discipline.schedule);
                    })
                    .catch((error) => {
                        console.error("Erro:", error.message);
                    });
            };

            const fetchForm = async () => {
                await setCookieSessionId(sessionId);
                await getDiscipline();
            };

            fetchForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, sessionId]);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        await fetch(`${process.env.API_URL}/api/discipline/update/${params.id}/`, {
            method: "PUT",
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

                toast.success('Disciplina atualizada com sucesso!');
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
                    <h2 className="mb-3 text-xl font-semibold">Atualizar Disciplina</h2>
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
                                    placeholder={discipline?.name}
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
                                    placeholder={discipline?.school}
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
                                    placeholder={discipline?.schedule}
                                />
                            </div>
                        </div>
                        <button className="w-full px-8 py-3 font-semibold flex items-center justify-center transition duration-500 hover:scale-105 bg-gray-800 text-gray-50">
                            Atualizar
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}