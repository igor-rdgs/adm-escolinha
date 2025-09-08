import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/alunos/[id]/jornada/[jornadaId]');
}
