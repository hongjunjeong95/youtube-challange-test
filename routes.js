const HOME = "/";
const SEARCH = "/search";
const CREATE = "/create";
const MOVIE_DETAIL = "/:id";
const EDIT_MOVIE = "/edit";
const DELETE_MOVIE = "delete";

const routes = {
  home: HOME,
  search: SEARCH,
  create: CREATE,

  movieDetail: (id) => {
    if (id) {
      return `/${id}`;
    }
    return MOVIE_DETAIL;
  },
  editMovie: (id) => {
    if (id) {
      return `/${id}/edit`;
    }
    return EDIT_MOVIE;
  },
  deleteMovie: (id) => {
    if (id) {
      return `/${id}/delete`;
    }
    return DELETE_MOVIE;
  },
};

export default routes;
