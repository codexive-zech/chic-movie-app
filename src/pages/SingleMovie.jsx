import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SingleMovie = () => {
  const [singleMovie, setSingleMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchSingleMovie = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setSingleMovie(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleMovie(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }

  const {
    backdrop_path: img,
    poster_path: posterImg,
    original_title: title,
    tagline,
    runtime,
    release_date: date,
    genres,
    overview: desc,
  } = singleMovie;
  return (
    <>
      <div className="single-movie">
        <div className="single-movie__intro">
          <img
            className="single-movie__backdrop"
            src={`https://image.tmdb.org/t/p/original${img}`}
            alt={title}
          />
        </div>
        <div className="single-movie__detail">
          <div className="single-movie__detailLeft">
            <div className="single-movie__posterBox">
              <img
                className="single-movie__poster"
                src={`https://image.tmdb.org/t/p/original${posterImg}`}
                alt={title}
              />
            </div>
          </div>
          <div className="single-movie__detailRight">
            <div className="single-movie__detailRightTop">
              <div className="single-movie__name">
                <h5>{title}</h5>
              </div>
              <div className="single-movie__tagline">
                <h3>{tagline}</h3>
              </div>
              <div className="single-movie__runtime">
                <h4>{`Duration: ${runtime} mins`}</h4>
              </div>
              <div className="single-movie__releaseDate">
                <h4>{"Release date: " + date}</h4>
              </div>
              <div className="single-movie__genres">
                {genres.map((genre) => (
                  <>
                    <span className="single-movie__genre" id={genre.id}>
                      {genre.name}
                    </span>
                  </>
                ))}
              </div>
            </div>
            <div className="single-movie__detailRightBottom">
              <div className="single-synopsisText">
                <h1>Storyline</h1>
              </div>
              <div className="description">
                <p>{desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <Link to="/" className="btn">
          Back To Movies
        </Link>
      </div>
    </>
  );
};

export default SingleMovie;
