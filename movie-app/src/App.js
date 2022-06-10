import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
function App() {
  //add a state object which is going to hold the movie result that come back from the search
  const [movies, setMovies] = useState([]);

  //movie parameter is going to be dynamic so to make search dynamic we will add an input , store the value and state the user types and call the API everytime that input changes
  const [searchValue, setSearchValue] = useState("");

  //Adding a call to the API so that you can get the films from the API
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1450179`;

    //using fetch API to make a request
    const response = await fetch(url);

    //converting http response to json
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search); //coming from API response not hard coded stuff in APP.js and we only want to take Search array
    }
  };

  //Calling  getMovieRequest function we need to use useEffect hook
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]); //[] means getMovieRequest is called when page loads only

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        {/* Search bar accepts a value but it doesnt do anything so we will store the value in searchValue state anytime this changes, we want to call get movie request */}
        {/* //first thing is to pass the searchValue and setSearchValue to our search box */}
        {/* //and then hook them up to the input */}
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
