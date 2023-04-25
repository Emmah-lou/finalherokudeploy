import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Movie = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  console.log(id);
  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=73740781`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        console.table(movieData);
      });
  }, [id]);

  return (
    <div>
      <h1 className="movie-page">Movie</h1>
      <div className="movie-container">
        <div className="movie-title">{movieData.Title} </div>
        <div className="movie-year">
          <b>Year - </b>
          {movieData.Year}
        </div>
        <div className="movie-genre">
          <b>Genre - </b>
          {movieData.Genre}{" "}
        </div>
        <div className="movie-director">
          <b>Director - </b>
          {movieData.Director}{" "}
        </div>
        <div className="movie-actors">
          <b>Actors - </b>
          {movieData.Actors}{" "}
        </div>
        <div className="movie-plot">
          <b>Plot - </b>
          {movieData.Plot}{" "}
        </div>
        <div className="movie-poster">
          <img src={movieData.Poster} />
        </div>
        <div className="movie-data">
          <b>Rating - </b>
          {movieData.imdbRating} | <b>Votes - </b>
          {movieData.imdbVotes} | <b>Type - </b> {movieData.Type}
        </div>
      </div>
    </div>
  );
};

export default Movie;
