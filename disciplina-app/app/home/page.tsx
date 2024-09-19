import Navbar from "@/components/Navbar";
import React from "react";

export default function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-1 flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-bold mb-4">Bem vindo</h1>
                <p className="text-lg mb-2 text-justify">
                    Este aplicativo é uma ferramenta desenvolvida para professores. Aqui, você pode registrar suas disciplinas e usá-las como uma agenda.
                </p>
                <p className="text-lg mb-2 text-justify">
                    Organize seus horários de entrada e saída de forma eficiente. Mantenha todas as suas informações de ensino em um só lugar.
                </p>
            </main>
        </div>
    );
}