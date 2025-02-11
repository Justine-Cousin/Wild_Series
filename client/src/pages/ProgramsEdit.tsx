import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProgramDeleteForm from "../components/ProgramDeleteForm";
import ProgramForm from "../components/ProgramForm";

interface Program {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: string;
  category_id: string;
}

function ProgramsEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [program, setProgram] = useState<Program>({
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: "",
    category_id: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    <div>
      <h1>Modifications</h1>

      <ProgramForm
        defaultValue={program}
        onSubmit={(programData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(programData),
          }).then((response) => {
            if (response.status === 204) {
              navigate(`/programs/${id}`);
            }
          });
        }}
      >
        <button type="button" onClick={() => navigate("/programs")}>
          Cancel
        </button>
      </ProgramForm>
      {id && (
        <ProgramDeleteForm id={Number.parseInt(id, 10)}>
          Supprimer
        </ProgramDeleteForm>
      )}
    </div>
  );
}
export default ProgramsEdit;
