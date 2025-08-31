"use client";

import JornadasPage from "@/components/jornada/page"; // ajuste o caminho se necessário
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const alunoId = params.id; // pega o ID da URL

  return <JornadasPage alunoId={alunoId} />;
}
