import type { RequestHandler } from "express";

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];
/* Here you code */
const browse: RequestHandler = (_, res) => {
  res.json(categories);
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const categorie = categories.find((p) => p.id === parsedId);
  if (categorie != null) {
    res.json(categorie);
  } else {
    res.sendStatus(404);
  }
};

// Export them to import them somewhere else
export default { browse, read };
