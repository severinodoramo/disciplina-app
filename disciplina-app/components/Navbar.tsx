"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-gray-50 p-4">
            <ul className="flex justify-around">
                <li>
                    <Link href="/home">
                        <button className="px-4 py-2 transition duration-300 bg-gray-900 hover:bg-gray-700 rounded">
                            Home
                        </button>
                    </Link>
                </li>
                <li>
                    <Link href="/disciplina">
                        <button className="px-4 py-2 transition duration-300 bg-gray-900 hover:bg-gray-700 rounded">
                            Disciplinas
                        </button>
                    </Link>
                </li>
                <li>
                    <button onClick={() => signOut({ callbackUrl: "/login" })} className="px-4 py-2 transition duration-300 bg-gray-900 hover:bg-gray-700 rounded">
                        Sair
                    </button>
                </li>
            </ul>
        </nav>
    )
}