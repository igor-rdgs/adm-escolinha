"use client";
import { useState } from "react";
import { LayoutAdmin } from "../../layout";
import CreateJornadaForm from "./CreateJornadaForm";
import EditarJornadaForm from "./EditarJornadaForm";
import JornadasTable from "./JornadasTable";
import { useJornadas } from "@/hooks";

export default function JornadasPage({ alunoId }) {
  const [jornadaSelecionada, setJornadaSelecionada] = useState(null);
  const { jornadas, reload, loading, error} = useJornadas(alunoId)

  return (
    <LayoutAdmin>
      {jornadaSelecionada ? (
        <EditarJornadaForm
          alunoId={alunoId}
          jornada={jornadaSelecionada}
          reload={reload}
          onUpdated={() => setJornadaSelecionada(null)}
          onCancel={() => setJornadaSelecionada(null)}
        />
      ) : (
        <CreateJornadaForm alunoId={alunoId} reload={reload}/>
      )}

      <JornadasTable
        alunoId={alunoId}
        jornadas={jornadas} 
        loading={loading} 
        error={error} 
        onEdit={setJornadaSelecionada} 
        reload={reload} 
      />
    </LayoutAdmin>
  );
}
