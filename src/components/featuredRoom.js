import React from "react";
import { Roomcontext } from "../context";
import Loading from "./loading";
import Room from "./room";
import Title from "./Title";

class FeaturedRooms extends React.Component {
  state = {};

  static contextType = Roomcontext;

  render() {
    let { loading, featuredRooms: rooms } = this.context;

    rooms = rooms.map((room) => <Room key={room.id} room={room} />);

    return (
      <section className="featured-rooms">
        <Title title="featured rooms" />
        <div className="featured-rooms-center">
          { loading ? <Loading /> : rooms }
        </div>
      </section>
    );
  }
}

export default FeaturedRooms;
