import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieView = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer <AUTH KEY>",
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovieDetails(response);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  function renderMovieDetails() {
    if (isLoading) {
      return <Hero text="Is Loading ..." />;
    }
    if (movieDetails) {
        const posterPath = `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`;
        const backdropURL = `https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`
        return(
    <>
    <Hero text={movieDetails.original_title}  backdrop={backdropURL} />;
    <div className="container my-5">
        <div className="row">
            <div className="col-md-3">
                <img src={posterPath} className="img-fluid shadow rounded" />
            </div>
            <div className="col-md-9">
                <h2>{movieDetails.original_title}</h2>
                <p className="lead">
                    {movieDetails.overview}
                </p>

            </div>
        </div>
    </div>
    </> 
      
      )
    }
  }

  return renderMovieDetails();
};

export default MovieView;
