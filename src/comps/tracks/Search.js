import axios from "axios";
import React, { useState } from "react";
import { Consumer } from "../../context";
const Search = () => {
  const [trackTitle, setTrackTitle] = useState("");
  const handleChange = (e) => {
    setTrackTitle(e.target.value);
    console.log(trackTitle);
  };
  const handleSubmit = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        console.log(res.data.message.body.track_list);
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list,
        });
        setTrackTitle(" ");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Consumer>
      {(value) => {
        return (
          <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
              <i className="fas fa-music"></i> Search for a strong
            </h1>
            <p className="lead text-center"> get the lyrics for any song </p>
            <form onSubmit={handleSubmit.bind(this, value.dispatch)}>
              <div className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Song Title.."
                  name="trackTitle"
                  value={trackTitle}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block mb-5"
                type="submit"
              >
                Get Track Lyrics
              </button>
            </form>
          </div>
        );
      }}
    </Consumer>
  );
};
export default Search;
