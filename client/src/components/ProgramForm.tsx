import type { ReactNode } from "react";
import "/src/styles/ProgramForm.css";

type ProgramFormProps = {
  defaultValue: {
    title: string;
    synopsis: string;
    poster: string;
  };
  onSubmit: (data: { title: string; synopsis: string; poster: string }) => void;
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
        onSubmit({ title, synopsis, poster });
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
      {children}
      <button type="submit">Submit</button>
    </form>
  );
}
export default ProgramForm;
