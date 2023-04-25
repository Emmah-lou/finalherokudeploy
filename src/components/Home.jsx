import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
};
const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;

  return (
    <div className="search">
      <div className="col-4 col-md-2 col-lg-1 mb-3">
        <Link to={`/movie/${imdbID}/`}>
          <img src={Poster} className="img-fluid" alt="nothing-here" />
        </Link>
      </div>

      <div className="col-8 col-md-10 col-lg-11 mb-3">
        <Link to={`/movie/${imdbID}/`}>
          <h4>{Title}</h4>

          <p>
            {Type} | {Year}
          </p>
        </Link>
      </div>
    </div>
  );
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      results: [],
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    let { searchTerm } = this.state;
    //searchTerm = searchTerm.trim();
    console.log(searchTerm);
    if (!searchTerm) {
      return;
    }
    const apiKey = "73740781";

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`)
      .then((response) => response.json())

      .then((data) => {
        if (data.Response === "True") {
          this.setState({ results: data.Search, error: "" });
        } else {
          this.setState({ error: data.Error });
        }
      });
  }
  render() {
    const { searchTerm, results, error } = this.state;

    return (
      <div className="container">
        <h1 className="main-title">Emma-Lou-Who's Netlify Movie Finder</h1>
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit} className="movie-search-form">
              <input
                type="text"
                className="movie-search-input"
                placeholder="frozen"
                value={searchTerm}
                onChange={this.handleChange}
              />

              <button type="submit">Submit</button>
            </form>

            {(() => {
              if (error) {
                return <NotFound />;
              }

              return results.map((movie) => {
                return <Movie key={movie.imdbID} movie={movie} />;
              });
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
