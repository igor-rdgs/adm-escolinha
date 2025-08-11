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
          <h2>Histórico de Lições</h2>
          <a href="#" className={styles.caixaUsuario}>Usuário</a>
        </nav>
        <section className={styles.section}>
          <h2>Alfred Futterkiste</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>Data</th>
                <th className={styles.th}>Fase</th>
                <th className={styles.th}>Lição</th>
                <th className={styles.th}>Observações</th>
              </tr>

            </thead>
            <tbody>
              <tr className="styles.tr">
                <td className={styles.td}>11/08/2025</td>
                <td className={styles.td}>1</td>
                <td className={styles.td}>1</td>
                <td className={styles.td}>Aula teórica com instrumento</td>
              </tr>

            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
