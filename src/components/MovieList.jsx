import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-loading-skeleton/dist/skeleton.css";

// const movieApis = `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { type } = useParams();
  const [page, setPage] = useState(1);

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovieList(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );
  }, [type, page]);

  if (isLoading) {
    return <div className="loading"></div>;
  }

  const changeNextPage = () => {
    setPage((page) => {
      let nextPage = page + 1;
      return nextPage;
    });
  };

  return (
    <>
      <div className="poster">
        {movieList.length > 0 ? (
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
          >
            {movieList.map((movie) => {
              const {
                id,
                backdrop_path: img,
                original_title: title,
                release_date: date,
                overview: desc,
              } = movie;
              return (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`movie/${id}`}
                >
                  <div className="posterImage">
                    <img
                      src={`https://image.tmdb.org/t/p/original${img}`}
                      alt={title}
                    />
                  </div>
                  <div className="posterImage__overlay">
                    <div className="posterImage__title">{title}</div>
                    <div className="posterImage__runtime">
                      <span>{date}</span>
                    </div>
                    <div className="posterImage__description">{desc}</div>
                  </div>
                </Link>
              );
            })}
          </Carousel>
        ) : null}
      </div>

      <h1 className="heading">{(type ? type : "Popular").toUpperCase()}</h1>
      <section className="movies ">
        {/* iterate over the movie list state */}
        {movieList.map((movie) => {
          const {
            id,
            backdrop_path: img,
            original_title: title,
            release_date: date,
            overview: desc,
          } = movie;
          return (
            <Link
              to={`movie/${id}`}
              style={{ textDecoration: "none", color: "#fff" }}
              key={id}
            >
              <article className="movie">
                <img
                  src={`https://image.tmdb.org/t/p/original${img}`}
                  alt={title}
                />
                <div className="movie-info">
                  <h4>{title}</h4>
                  <p>
                    <span>{date}</span>
                  </p>
                  <p>{desc.substring(0, 70) + "..."}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
      <div className="btn-container">
        <button className="next-btn" onClick={changeNextPage}>
          Load More Movies
        </button>
      </div>
    </>
  );
};

export default MovieList;
