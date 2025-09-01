"use client";

import { useState, useEffect } from "react";
import { LayoutAdmin } from '../../layout';
import CreateAulaForm from "./CreateAulaForm";
import EditarAulaForm from "./EditarAulaForm";
import AulasTable from "./AulasTable";
import { useAulas, useJornada, useAluno } from "@/hooks";

export default function AulasPage({ alunoId, jornadaId }) {
    const [aulaSelecionada, setAulaSelecionada] = useState(null);

    const { getByAluno } = useAluno()
    const { getJornadaById } = useJornada(alunoId)
    const { aulas, loading, error, reload } = useAulas(alunoId, jornadaId)

    const [aluno, setAluno] = useState(null);
    const [jornada, setJornada] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const alunoData = await getByAluno(alunoId);
                setAluno(alunoData.data || alunoData);  // garante compatibilidade

                const jornadaData = await getJornadaById(jornadaId);
                setJornada(jornadaData.data || jornadaData);
            } catch (err) {
                console.error("Erro ao buscar aluno ou jornada", err);
            }
        }
        fetchData();
    }, [alunoId, jornadaId]);


    return (
        <LayoutAdmin>
            <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                Aulas de{" "}
                {jornada ? jornada.instrumento : `#${jornadaId}`} do{" "}
                {aluno ? aluno.nome : `#${alunoId}`}
            </h1>

            {!aulaSelecionada ? (
                <CreateAulaForm
                    alunoId={alunoId}
                    jornadaId={jornadaId}
                    reload={reload}
                    onCreated={() => setAulaSelecionada(null)}
                />
            ) : (
                <EditarAulaForm
                    alunoId={alunoId}
                    jornadaId={jornadaId}
                    aula={aulaSelecionada}
                    reload={reload}
                    onUpdated={() => setAulaSelecionada(null)}
                    onCancel={() => setAulaSelecionada(null)}
                />
            )}

            <AulasTable
                alunoId={alunoId}
                jornadaId={jornadaId}
                aulas={aulas}
                loading={loading}
                error={error}
                onEdit={(aula) => setAulaSelecionada(aula)}
                reload={reload}
            />
        </LayoutAdmin>
    );
}
