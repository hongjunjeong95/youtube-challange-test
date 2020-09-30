import express from "express";
import routes from "../routes";
import {
  home,
  search,
  create,
  movieDetail,
  editMovie,
  deleteMovie,
} from "./movieController";

const movieRouter = express.Router();

// Add your magic here!
movieRouter.get(routes.home, home);
movieRouter.get(routes.search, search);
movieRouter.route(routes.create).get(create).post(create);
movieRouter.get(routes.movieDetail(), movieDetail);
movieRouter.route(routes.editMovie()).get(editMovie).post(editMovie);
movieRouter.route(routes.deleteMovie()).get(deleteMovie).post(deleteMovie);

export default movieRouter;
