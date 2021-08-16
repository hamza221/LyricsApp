import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";

const Lyrics = (props) => {
  const [lyrics, setLyrics] = useState();
  const [track, setTrack] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        setLyrics(res.data.message.body.lyrics);
      })
      .catch((err) => console.log(err));
    axios
      .get(
        `https://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )

      .then((res) => {
        setTrack(res.data.message.body.track);
        console.log(track);
      })
      .catch((err) => console.log(err));
  }, []);
  if (
    lyrics === undefined ||
    track === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner></Spinner>;
  } else {
    return (
      <React.Fragment>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          {" "}
          Go Back
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track_name} by{" "}
            <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card_text">{lyrics.lyrics_body}</p>
          </div>
        </div>
        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Explicit</strong>:{track.explicit === 0 ? " No" : " Yes"}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{" "}
            <Moment format="DD/MM/YYYY">{track.updated_time}</Moment>
          </li>
        </ul>
      </React.Fragment>
    );
  }
};
export default Lyrics;
