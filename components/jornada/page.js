"use client";
import { useState } from "react";
import { LayoutAdmin } from "../../layout";
import CreateJornadaForm from "./CreateJornadaForm";
import EditarJornadaForm from "./EditarJornadaForm";
import JornadasTable from "./JornadasTable";

export default function JornadasPage({ alunoId }) {
  const [jornadaSelecionada, setJornadaSelecionada] = useState(null);

  return (
    <LayoutAdmin>
      {jornadaSelecionada ? (
        <EditarJornadaForm
          alunoId={alunoId}
          jornada={jornadaSelecionada}
          onUpdated={() => setJornadaSelecionada(null)}
          onCancel={() => setJornadaSelecionada(null)}
        />
      ) : (
        <CreateJornadaForm alunoId={alunoId} />
      )}

      <JornadasTable
        alunoId={alunoId}
        onEdit={setJornadaSelecionada}
      />
    </LayoutAdmin>
  );
}
