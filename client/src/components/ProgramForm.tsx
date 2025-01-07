import type { ReactNode } from "react";
import "/src/styles/ProgramForm.css";

type ProgramFormProps = {
  defaultValue: {
    title: string;
    synopsis: string;
    poster: string;
    country: string;
    year: number;
    category_id: number;
  };
  onSubmit: (data: {
    title: string;
    synopsis: string;
    poster: string;
    country: string;
    year: number;
    category_id: number;
  }) => void;
  children: ReactNode;
};

function ProgramForm({ defaultValue, onSubmit, children }: ProgramFormProps) {
  return (
    <form
      className="program-form"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const synopsis = formData.get("synopsis") as string;
        const poster = formData.get("poster") as string;
        const country = formData.get("country") as string;
        const year = Number(formData.get("year"));
        const category_id = Number(formData.get("category_id"));
        onSubmit({ title, synopsis, poster, country, year, category_id });
      }}
    >
      <label>
        Title
        <input name="title" defaultValue={defaultValue.title} />
      </label>
      <label>
        Synopsis
        <textarea name="synopsis" defaultValue={defaultValue.synopsis} />
      </label>
      <label>
        Poster
        <input name="poster" defaultValue={defaultValue.poster} />
      </label>
      <label>
        Country
        <input name="country" defaultValue={defaultValue.country} />
      </label>
      <label>
        Year
        <input name="year" defaultValue={defaultValue.year} />
      </label>
      <label>
        Category
        <input name="category_id" defaultValue={defaultValue.category_id} />
      </label>
      {children}
      <button type="submit">Submit</button>
    </form>
  );
}
export default ProgramForm;
