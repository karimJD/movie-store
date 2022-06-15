import React, { useState, useEffect, useContext } from "react";
import "../Global.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MovieContext } from "../Context/MovieContext";
import Axios from "axios";

function Card({ categoryId }) {
  const [movies, setMovies] = useState([]); // all movies list
  const [state, setState] = useState([]); // ID of movies in the category selected
  const { setBannerMovie } = useContext(MovieContext);

  // token de JWT
  const token =
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTY1NTMyNjM4MX0.8y6MDTKbiyJfJPWCGUPqzlBrGqOcfancEnIZ-qAFxnChv4bxIkMPx14qEZXLhHlHFCAOJsQ_I1iIiohL5WbSNg";

  // ID of movies in the category
  let moviesId = [];

  useEffect(() => {
    Axios.get("http://localhost:8080/api/categories/" + categoryId, {
      headers: { Authorization: token },
    }).then(response => {
      // getting object's lenght
      let length = Object.keys(response.data.movies).length;
      // Pushing category's movies ID into array to display them in cards
      for (let i = 0; i < length; i++) {
        moviesId.push(response.data.movies[i].id);
      }
    });
    fetchMovies(); 
    setState(moviesId);
  }, [categoryId]);

  const fetchMovies = async () => {
    const { data } = await Axios.get("http://localhost:8080/api/movies", {
      headers: { Authorization: token },
    });
    setMovies(data);
  };

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const check = x => {
    for (let i = 0; i < state.length; i++) {
      if (x == state[i]) {
        return true;
      }
    }
    return false;
  };

  // Setting Context variables to send them to banner component
  const imgClicked = (
    id,
    title,
    image,
    description,
    releaseDate,
    actors,
    age,
    duration
  ) => {
    let fetchedCategory = "";

    Axios.get("http://localhost:8080/api/categories", {
      headers: { Authorization: token },
    }).then(response => {
      for (let i = 0; i < response.data.length; i++) {
        for (let x = 0; x < response.data[i].movies.length; x++) {
          if (id == response.data[i].movies[x].id) {
            fetchedCategory = fetchedCategory + "," + response.data[i].name;
          }
        }
      }
      setBannerMovie(prevState => ({ ...prevState, id: id }));
      setBannerMovie(prevState => ({ ...prevState, title: title }));
      setBannerMovie(prevState => ({ ...prevState, image: image }));
      setBannerMovie(prevState => ({ ...prevState, description: description }));
      setBannerMovie(prevState => ({ ...prevState, releaseDate: releaseDate }));
      setBannerMovie(prevState => ({ ...prevState, actors: actors }));
      setBannerMovie(prevState => ({ ...prevState, ageLimit: age }));
      setBannerMovie(prevState => ({ ...prevState, duration: duration }));
      setBannerMovie(prevState => ({...prevState,category: fetchedCategory }));
    });
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  return (
    <div className="cardsContainer">
      <div className="cards">
        <MdChevronLeft className="leftArrow" onClick={slideLeft} size={40} />
        <div
          id="slider"
          className="w-full h-full  scroll whitespace-nowrap scroll-smooth overflow-y-hidden"
        >
          {movies.map(movie => ( 
            <>
              {check(movie.id) === true && (
                <img
                  className="card"
                  src={"data:image/jpeg;base64," + movie.image}
                  alt="ttt"
                  onClick={() =>
                    imgClicked(
                      movie.id,
                      movie.title,
                      movie.image,
                      movie.description,
                      movie.releaseDate,
                      movie.actors,
                      movie.ageLimit,
                      movie.duration
                    )
                  }
                />
              )}
            </>
          ))}
        </div>
        <MdChevronRight className="rightArrow" onClick={slideRight} size={40} />
      </div>
    </div>
  );
}

export default Card;
