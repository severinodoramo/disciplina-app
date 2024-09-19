import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {/* Conteúdo da página */}
            <div>
                <main>{children}</main>
            </div>
        </div>
    );
}
