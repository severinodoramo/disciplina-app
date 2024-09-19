"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { setCookieSessionId } from "../action";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export type Discipline = {
    id: string;
    name: string;
    school: string;
    schedule: string;
};

export default function DisciplineList() {
    const [sortType, setSortType] = useState("name");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);

    const [sessionId, setSessionId] = useState<string>("");
    const session = useSession();

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
            const getDisciplines = async () => {
                await fetch(`${process.env.API_URL}/api/discipline/list/`, {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setDisciplines(data.disciplines);
                    })
            }

            const fetchList = async () => {
                await setCookieSessionId(sessionId);

                await getDisciplines();
            };

            fetchList();
        }
    }, [session, sessionId]);

    const sortedDisciplines = [...disciplines].sort((a, b) => {
        if (sortType === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortType === "school") {
            return a.school.localeCompare(b.school);
        } else if (sortType === "startTime") {
            return a.schedule.localeCompare(b.schedule);
        }
        return 0;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleDelete(id: any): void {
        fetch(`${process.env.API_URL}/api/discipline/delete/${id}/`, {
            method: "DELETE",
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

                toast.success("Disciplina deletada com sucesso!");
                setDisciplines(disciplines.filter((discipline) => discipline.id !== id));
            })
            .catch((error) => {
                console.error("Erro:", error.message);
            });
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-1 items-center justify-center p-6">
                <div className="w-full max-w-4xl bg-gray-50 text-gray-800 drop-shadow-2xl p-4 rounded-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Lista de Disciplinas</h2>
                        <div className="flex space-x-2">
                            <select
                                onChange={(e) => setSortType(e.target.value)}
                                className="px-4 py-2 bg-gray-800 text-gray-50 rounded transition duration-300 hover:bg-gray-700"
                            >
                                <option value="name">Ordenar por Nome</option>
                                <option value="school">Ordenar por Escola</option>
                                <option value="startTime">Ordenar por Horário de Entrada</option>
                            </select>

                            <Link href={"/disciplina/new"}>
                                <button
                                    className="px-4 py-2 bg-blue-800 text-gray-50 rounded transition duration-300 hover:bg-blue-700"
                                >
                                    Cadastrar Disciplina
                                </button>
                            </Link>
                        </div>
                    </div>
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2">Nome</th>
                                <th className="px-4 py-2">Escola</th>
                                <th className="px-4 py-2">Horário de Entrada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedDisciplines?.map((discipline, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2 text-center">{discipline.name}</td>
                                    <td className="px-4 py-2 text-center">{discipline.school}</td>
                                    <td className="px-4 py-2 text-center">{discipline.schedule}</td>
                                    <td className="px-4 py-2 text-center">
                                        <Link href={`/disciplina/edit/${discipline.id}`}>
                                            <button className="px-2 py-1 bg-yellow-500 text-gray-50 rounded transition duration-300 hover:bg-yellow-400">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(discipline.id)}
                                            className="ml-2 px-2 py-1 bg-red-500 text-gray-50 rounded transition duration-300 hover:bg-red-400"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}