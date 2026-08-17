import React, { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

function TitleCards({ title, category }) {
  const [apiData,setApiData]=useState([])
  const cardsRef = useRef();

  const url =
    `https://api.themoviedb.org/3/movie/${category? category:"now_playing"}?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmJmOTEyNGFjZWVhODMzMDkyOWFiYmIwMDdmODg3YyIsIm5iZiI6MTc3NDcyODQyMS41NjcwMDAyLCJzdWIiOiI2OWM4MzRlNTc1ZGIxNGM4NzBmYmQwNDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tb_eMRtd_m0TympnwYxgiR_tooDUZecchicLsXYtuec",
    },
  };

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setApiData(json.results))
      .catch((err) => console.error(err));
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="titleCards">
      <h2>{title ? title : "Popular on Netflix "}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((c, i) => {
          return (
            <Link className="card" key={i} to={`/player/${c.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500`+c.backdrop_path} alt="" />
              <p>{c.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCards;
