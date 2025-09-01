"use client";

import AulasPage from "@/components/aula/page"; // ajuste o caminho se necessário
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const alunoId = params.id; // pega o ID da URL
  const jornadaId = params.jornadaId

  return <AulasPage alunoId={alunoId} jornadaId={jornadaId} />;
}