"use client";
import { useState } from "react";
import { LayoutAdmin } from '../../layout'
import CreateAlunoForm from './CreateAlunoForm';
import EditarAlunoForm from './EditarAlunoForm';
import AlunosTable from './AlunosTable';


export default function Alunos() {
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);

    return (
        <LayoutAdmin>
            {alunoSelecionado ? (
                <EditarAlunoForm
                    aluno={alunoSelecionado}
                    onCancel={() => setAlunoSelecionado(null)}
                />
            ) : (
                <CreateAlunoForm />
            )}
            <AlunosTable onEdit={setAlunoSelecionado} />
        </LayoutAdmin>
    );
}
