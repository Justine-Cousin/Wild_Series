import joi from "joi";
import ProgramRepository from "./programRepository";
// Some data to make the trick

const programs = [
  {
    id: 1,
    title: "The Good Place",
    synopsis:
      "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    poster:
      "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    country: "USA",
    year: 2016,
  },
  {
    id: 2,
    title: "Dark",
    synopsis:
      "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    poster:
      "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    country: "Allemagne",
    year: 2017,
  },
];

// Declare the actions

import { r } from "@faker-js/faker/dist/airline-C5Qwd7_q";
import type { RequestHandler } from "express";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const programs = await ProgramRepository.readAll();
    res.json(programs);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);
    const program = await ProgramRepository.read(programId);

    if (program === null) {
      res.sendStatus(404);
    } else {
      res.json(program);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const program = {
      id: Number(req.params.id),
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };

    const affectedRows = await ProgramRepository.update(program);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newProgram = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };

    const insertId = await ProgramRepository.create(newProgram);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);
    const affectedRows: number = await ProgramRepository.delete(programId);
    if (affectedRows === 0) {
      res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const schema = joi.object({
  title: joi.string().required(),
  synopsis: joi.string().required(),
  poster: joi.string().required(),
  country: joi.string().required(),
  year: joi.number().required(),
  category_id: joi.number().required(),
});

interface ValidationErrorDetail {
  message: string;
  path: (string | number)[];
  type: string;
  context?: Record<string, unknown>;
}

interface ValidationError {
  message: string;
  details: ValidationErrorDetail[];
}

const validate: RequestHandler = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    const validationError: ValidationError = {
      message: "Validation error",
      details: error.details,
    };
    res.status(400).json(validationError);
  }
};

// Export them to import them somewhere else

export default { browse, read, edit, add, destroy, validate };
