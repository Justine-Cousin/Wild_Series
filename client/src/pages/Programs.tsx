import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL as string;

export const Programs = () => {
  interface Program {
    id: number;
    title: string;
    synopsis: string;
    poster: string;
  }

  const [programs, setPrograms] = useState<Program[]>([]);
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
