import "../Global.css";
import fire from "../fire.png";
import Axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { MovieContext } from "../Context/MovieContext";

function Banner() {
  const moviesUrl = "http://localhost:8080/api/movies";
  const categoryUrl = "http://localhost:8080/api/categories";
  const token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTY1NTMyNjM4MX0.8y6MDTKbiyJfJPWCGUPqzlBrGqOcfancEnIZ-qAFxnChv4bxIkMPx14qEZXLhHlHFCAOJsQ_I1iIiohL5WbSNg";
  const [state, setState] = useState({
    id: "",
    title: "",
    image: "",
    description: "",
    releaseDate: "",
    actors: "",
    ageLimit: "",
    duration: "",
    category: "",
  });

  const { bannerMovie } = useContext(MovieContext);

  let display; // variable to display default banner or selected banner
  let status; // variable to display ' latest upload ' indication or hide it

  useEffect(() => { 
    let defaultId; 
    let fetchedCategory = ""; // variable to put in the latest movie uploaded category because my stupid ass did a mistake in the database architecture :D

    Axios.get(moviesUrl, { headers: { Authorization: token } }).then(
      response => {
        console.log("should be first");
        // getting object lenght to display the latest upload ( latest movie ID )
        let length = Object.keys(response.data).length;
        //updating default banner ( when the application is first open )
        defaultId = response.data[length - 1].id;
        setState(previousState => ({
          ...previousState,
          id: response.data[length - 1].id,
        }));
        setState(previousState => ({
          ...previousState,
          title: response.data[length - 1].title,
        }));
        setState(previousState => ({
          ...previousState,
          image: response.data[length - 1].image,
        }));
        setState(previousState => ({
          ...previousState,
          description: response.data[length - 1].description,
        }));
        setState(previousState => ({
          ...previousState,
          releaseDate: response.data[length - 1].releaseDate,
        }));
        setState(previousState => ({
          ...previousState,
          actors: response.data[length - 1].actors,
        }));
        setState(previousState => ({
          ...previousState,
          ageLimit: response.data[length - 1].ageLimit,
        }));
        setState(previousState => ({
          ...previousState,
          duration: response.data[length - 1].duration,
        }));

        // Getting default movie's categories
        Axios.get(categoryUrl, { headers: { Authorization: token } }).then(
          response => {
            for (let i = 0; i < response.data.length; i++) {
              for (let x = 0; x < response.data[i].movies.length; x++) {
                if (response.data[i].movies[x].id == defaultId) {
                  fetchedCategory =
                    fetchedCategory + "," + response.data[i].name;
                }
              }
            }
            setState(previousState => ({
              ...previousState,
              category: fetchedCategory,
            }));
          }
        );
      }
    );
  }, []);

  // if website opened for the first time it will display the default movie banner else it will display the selected

  if (Object.keys(bannerMovie).length === 0) {
    display = state; // It will get the latest movie uploaded
    status = true; // it will show ' latest upload ' indication
  } else {
    display = bannerMovie; // It will get the movie that user clicked on from card.js by using context ( too lazy to pass it from child to parent manually xD )
    status = false; // It will hide ' latest upload '
  }

  return (
    <div className="banner">
      <img src={"data:image/jpeg;base64," + display.image} className="poster" />
      <div className="mask">
        <div className="miniPosterContainer">
          <img
            src={"data:image/jpeg;base64," + display.image}
            className="miniPoster"
          />
        </div>
      </div>

      {status == true && (
        <>
          <img src={fire} alt="logo" className="logo" />
          <span className="title" hidden="hidden">
            Latest upload
          </span>
        </>
      )}

      <span className="subtitle">{display.title}</span>
      <span className="release">
        Release Date : {display.releaseDate.substring(0, 10)}
        {/* Added substring to remove time */}
      </span>
      <span className="about">{display.description}</span>
      <span className="cast">
        Cast: <span className="castItem">{display.actors}</span>
      </span>
      <span></span>

      <div className="infoContainer">
        <span className="infoItems">
          Genre: <span className="infos">{display.category.substring(1)}</span>
          {/* Added substring to remove the first ',' */}
        </span>
        <span className="infoItems">
          Age: <span className="infos">+{display.ageLimit}</span>
        </span>
        <span className="infoItems">
          Duration: <span className="infos">{display.duration} minutes</span>
        </span>
      </div>
      <button className="watchNowBtn">
        <span className="btnText">Watch Now</span>
      </button>
    </div>
  );
}

export default Banner;
