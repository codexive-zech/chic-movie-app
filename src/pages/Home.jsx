import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPopularMovies(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );
  }, [page]);

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
        {/* Carousel */}
        {popularMovies.length > 0 ? (
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
          >
            {popularMovies.map((movie) => {
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
                  to={`/movie/${id}`}
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
      {/* End of Carousel */}

      {/* Popular Movies */}
      {popularMovies.length > 0 ? (
        <div>
          <h1 className="heading">{"Popular".toUpperCase()}</h1>
          <section className="movies">
            {popularMovies.map((movie) => {
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
        </div>
      ) : null}
      {/* End of Popular Movies */}

      {/* Button section */}
      <div className="btn-container">
        <button className="next-btn" onClick={changeNextPage}>
          Load More Movies
        </button>
      </div>
    </>
  );
};

export default Home;
