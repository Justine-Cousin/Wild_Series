import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProgramForm from "../components/ProgramForm";

interface Program {
  title: string;
  synopsis: string;
  poster: string;
}

function ProgramsEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [program] = useState<Program>({
    title: "",
    synopsis: "",
    poster: "",
  });
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
    </div>
  );
}
export default ProgramsEdit;
