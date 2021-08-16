import React, { Component } from "react";
import { Consumer } from "../../context.js";
import Spinner from "../layout/Spinner";
import Track from "../tracks/Track";
export default class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          if (value.track_list.length > 0) {
            console.log(value);
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{value.heading}</h3>

                <div className="row">
                  {value.track_list.map((item) => (
                    <Track track={item.track} key={item.track.track_id}></Track>
                  ))}
                </div>
              </React.Fragment>
            );
          } else {
            return <Spinner></Spinner>;
          }
        }}
      </Consumer>
    );
  }
}
