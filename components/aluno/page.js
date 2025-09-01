"use client";
import { useState } from "react";
import { LayoutAdmin } from '../../layout'
import CreateAlunoForm from './CreateAlunoForm';
import EditarAlunoForm from './EditarAlunoForm';
import AlunosTable from './AlunosTable';
import { useAlunos } from "../../hooks";


export default function Alunos() {
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const { alunos, reload, loading, error } = useAlunos();
    return (
        <LayoutAdmin>
            {alunoSelecionado ? (
                <EditarAlunoForm aluno={alunoSelecionado} reload={reload} onCancel={() => setAlunoSelecionado(null)} />
            ) : (
                <CreateAlunoForm reload={reload} />
            )}
            <AlunosTable alunos={alunos} loading={loading} error={error} onEdit={setAlunoSelecionado} reload={reload} />
        </LayoutAdmin>
    );
}
