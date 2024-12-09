import { useEffect, useState } from "react";
import type { programType } from "../../../server/src/modules/programs/programActions";

const API_URL = import.meta.env.VITE_API_URL as string;

export const Programs = () => {
  const [programs, setPrograms] = useState<programType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${API_URL}/api/programs`);
        const data = await response.json();

        setPrograms(data);
      } catch (error) {
        console.error(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div>
      {programs.map((program) => (
        <div key={program.id}>
          <h1>{program.title}</h1>
          <p>{program.synopsis}</p>
          <img src={program.poster} alt="visuel" />
        </div>
      ))}
    </div>
  );
};
