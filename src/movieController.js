import routes from "../routes";
/*
You DONT have to import the Movie with your username.
Because it's a default export we can nickname it whatever we want.
So import Movie from "./models"; will work!
You can do Movie.find() or whatever you need like normal!
*/
import Movie from "./models/Movie";

// Add your magic here!

export const home = async (req, res) => {
  const moives = await Movie.find({});
  res.render("movies", { pageTitle: "Home", moives });
};

export const search = async (req, res) => {
  let movies = null;
  let num = null;
  const { query } = req;
  const year = query.year ? query.year : null;
  const rating = query.rating ? query.rating : null;
  const term = year ? "year" : "rating";

  try {
    if (year) {
      movies = await Movie.find().lte("year", year);
      num = year;
    } else if (rating) {
      movies = await Movie.find().lte("rating", rating);
      num = rating;
    }
    res.render("search", { pageTitle: "Search", term, num, movies });
  } catch (error) {
    console.log(error);
    res.render("404", { pageTitle: "Not found" });
  }
};

export const create = async (req, res) => {
  if (req.method === "GET") {
    res.render("create", { pageTitle: "Create" });
  } else if (req.method === "POST") {
    const {
      body: { title, year, rating, synopsis, genres },
    } = req;
    try {
      const parsedYear = parseInt(year, 10);
      const parsedRating = parseInt(rating, 10);
      console.log(`parsedYear : ${typeof parsedYear}`);
      console.log(`parsedRating : ${typeof parsedRating}`);
      console.log(typeof 10);

      if (typeof parsedYear !== "number") {
        throw Error("❌  Year must be Number  ❌");
      }
      if (typeof parsedRating !== "number") {
        throw Error("❌  Rating must be Number  ❌");
      }
      if (title.length < 3) {
        throw Error(
          "❌ A title's length  have to be more than 3 characters long.   ❌"
        );
      }

      const newMovie = await Movie.create({
        title,
        year,
        rating,
        synopsis,
        genres: genres.split(","),
      });
      res.redirect(routes.movieDetail(newMovie.id));
    } catch (error) {
      console.log(error);
      res.render("404", { pageTitle: "Movie not found" });
    }
  }
};

export const movieDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log("before try");
  try {
    console.log("after try");
    const movie = await Movie.findById(id);
    console.log(movie);
    res.render("detail", movie);
  } catch (error) {
    console.log(error);
    res.render("404", { pageTitle: "Movie not found" });
  }
};

export const editMovie = (req, res) => {
  if (req.method === "GET") {
    res.render("editMovie");
  } else if (req.method === "POST") {
    res.render("editMovie");
  }
};

export const deleteMovie = (req, res) => {
  if (req.method === "GET") {
    res.render("deleteMovie");
  } else if (req.method === "POST") {
    res.render("deleteMovie");
  }
};
