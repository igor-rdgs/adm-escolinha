"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { LayoutAdmin } from '../../layout';
import CreateAulaForm from "./CreateAulaForm";
import AulasTable from "./AulasTable";

export default function AulasPage() {
    const params = useParams();
    const alunoId = params.id;
    const jornadaId = params.jornadaId;

    const [aulaSelecionada, setAulaSelecionada] = useState(null);

    return (
        <LayoutAdmin>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                Aulas da Jornada {jornadaId} do Aluno {alunoId}
            </h1>

            {!aulaSelecionada ? (
                <CreateAulaForm
                    alunoId={alunoId}
                    jornadaId={jornadaId}
                    onCreated={() => setAulaSelecionada(null)}
                />
            ) : (
                <EditarAulaForm
                    alunoId={alunoId}
                    jornadaId={jornadaId}
                    aula={aulaSelecionada}
                    onCancel={() => setAulaSelecionada(null)}
                />
            )}

            <AulasTable
                alunoId={alunoId}
                jornadaId={jornadaId}
                onEdit={(aula) => setAulaSelecionada(aula)}
            />
        </LayoutAdmin>
    );
}
