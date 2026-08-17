import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useParams, useNavigate } from "react-router-dom";

function Player() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState(null);

    const url =
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmJmOTEyNGFjZWVhODMzMDkyOWFiYmIwMDdmODg3YyIsIm5iZiI6MTc3NDcyODQyMS41NjcwMDAyLCJzdWIiOiI2OWM4MzRlNTc1ZGIxNGM4NzBmYmQwNDIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tb_eMRtd_m0TympnwYxgiR_tooDUZecchicLsXYtuec"
        },
    };

    useEffect(() => {
        fetch(url, options)
            .then((res) => res.json())
            .then((json) => {
    console.log("TMDB response:", json);
    console.log("TMDB results:", json.results);

    if (!json.results) {
        console.log("TMDB returned an error:", json);
        return;
    }

    const trailer = json.results.find(
        video => video.site === "YouTube" && video.type === "Trailer"
    );

    console.log("Trailer:", trailer);

    setApiData(trailer);
})
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <div className="player">

            <img
                src={back_arrow_icon}
                alt=""
                onClick={() => navigate(-1)}
            />

            {apiData ? (
                <>
                    <iframe
                        src={`https://www.youtube.com/embed/${apiData.key}`}
                        frameBorder="0"
                        width="90%"
                        height="90%"
                        title="trailer"
                        allowFullScreen
                    ></iframe>

                    <div className="player-info">
                        <p>
                            {apiData.published_at
                                ? apiData.published_at.slice(0, 10)
                                : ""}
                        </p>

                        <p>{apiData.name}</p>
                        <p>{apiData.type}</p>
                    </div>
                </>
            ) : (
                <p>Loading trailer...</p>
            )}

        </div>
    );
}

export default Player;
