import styles from "../page.module.css";
import Link from 'next/link';

export default function Alunos() {
  return (
    <div className={styles.page}>
      <aside className={styles.aside}>
        <h1>Adm GEM</h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="./alunos">Alunos</Link>
          </li>
          <li className={styles.li}>
            <Link href="./instrutores">Instrutores</Link>
          </li>
        </ul>
      </aside>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <h2>Alunos</h2>
          <a href="#" className={styles.caixaUsuario}>Usuário</a>
        </nav>
        <section className={styles.section}>
          <div className={styles.containerBtns}>
            <button className={styles.btns}>Nova Lição</button>
            <button className={styles.btns}>Novo Aluno</button>
          </div>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>Nome</th>
                <th className={styles.th}>Instrumento</th>
                <th className={styles.th}>Nível</th>
                <th className={styles.th}>Histórico de lições</th>
              </tr>

            </thead>
            <tbody>
              <tr className="styles.tr">
                <td className={styles.td}>Alfred Futterkiste</td>
                <td className={styles.td}>Violino</td>
                <td className={styles.td}>RJM</td>
                <td className={styles.td}><Link href="./licoes">Visualizar Histórico</Link></td>
              </tr>

            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
