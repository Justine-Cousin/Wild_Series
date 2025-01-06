import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/programs">Programmes</Link>
          </li>
        </ul>
      </nav>

      <main>
        <h1>Bienvenue sur Wild Séries !</h1>
        <p>Retrouvez les meilleures séries du moment.</p>
      </main>
      <footer>Développé par Justine;</footer>
    </>
  );
}

export default App;
