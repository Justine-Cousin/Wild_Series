import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/src/styles/ProgramsIndex.css";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
}

export default function ProgramsIndex() {
  const [programs, setPrograms] = useState([] as Program[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setPrograms(data);
      });
  }, []);

  return (
    <div className="programs-grid">
      {programs.map((program) => (
        <div key={program.id} className="program-card">
          <div className="text-content">
            <h1>{program.title}</h1>
            <p>{program.synopsis}</p>
          </div>
          <img src={program.poster} alt="visuel" />
          <Link to={`/programs/${program.id}`} className="details-link">
            Voir les détails
          </Link>
        </div>
      ))}
    </div>
  );
}
