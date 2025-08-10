import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <aside className={styles.aside}>
        <h1>Adm GEM</h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <a href="#">Alunos</a>
          </li>
          <li className={styles.li}>
            <a href="#">Instrutores</a>
          </li>
        </ul>
      </aside>
      <main className={styles.main}>
        <nav className={styles.nav}>
          <h2>Alunos</h2>
          <a href="#" className={styles.caixaUsuario}>Usuário</a>
        </nav>
        <section className={styles.section}>
          <button className={styles.btns}>Nova Lição</button>
          <button className={styles.btns}>Cadastrar aluno</button>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>Instrumento</th>
              <th className={styles.th}>Lições</th>
            </tr>
            <tr className="styles.tr">
              <td className={styles.td}>Alfreds Futterkiste</td>
              <td className={styles.td}>Violino</td>
              <td className={styles.td}>Histórico</td>
            </tr>
          </table>
        </section>
      </main>
    </div>
  );
}
