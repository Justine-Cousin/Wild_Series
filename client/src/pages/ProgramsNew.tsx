import { useNavigate } from "react-router-dom";

import ProgramForm from "../components/ProgramForm";

function ProgramsNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: "",
    category_id: "",
  };

  return (
    <ProgramForm
      defaultValue={newProgram}
      onSubmit={(programData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        })
          .then((response) => response.json())
          .then(() => {
            navigate("/programs");
          });
      }}
    >
      <button type="button" onClick={() => navigate("/programs")}>
        Cancel
      </button>
    </ProgramForm>
  );
}
export default ProgramsNew;
