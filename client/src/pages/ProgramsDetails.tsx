import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "/src/styles/ProgramsDetails.css";
import ProgramDeleteForm from "../components/ProgramDeleteForm";

interface Program {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
}

function ProgramsDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    <div className="program-details">
      {program && (
        <>
          <hgroup className="details-hgroup">
            <h1>{program.title}</h1>
            <Link to="/programs">Retour</Link>
            <Link to={`/programs/${program.id}/edit`}>Modifier</Link>

            {/* On ajoutera le bouton supprimer plus tard */}
          </hgroup>
          <img src={program.poster} alt="visuel" />
          <p>{program.synopsis}</p>
          <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
        </>
      )}
    </div>
  );
}

export default ProgramsDetails;
