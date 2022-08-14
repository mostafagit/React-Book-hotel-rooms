import React, { Component, createContext } from "react";
import items from "./data";
const Roomcontext = createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    storedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    this.setState({
      rooms,
      featuredRooms,
      storedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }

  formatData = (items) => {
    let tempitems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => {
        return image.fields.file.url;
      });
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempitems;
  };

  getRoom = (slug) => {
    const room = [...this.state.rooms];
    const TempRoom = room.find((item) => item.slug === slug);
    return TempRoom;
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;

    this.setState(
      {
        [name]: value,
      },
      this.filtredRoom
    );
  };

  filtredRoom = () => {
    let { rooms, type, capacity, price, maxSize, minSize, breakfast, pets } =
      this.state;
    let tempRooms = [...rooms];

    capacity = parseInt(capacity);
    price = parseInt(price);

    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    tempRooms = tempRooms.filter(room => room.price <= price);
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
    if(breakfast){
      tempRooms = tempRooms.filter(room => room.breakfast === true)
    }
    if(pets){
      tempRooms = tempRooms.filter(room => room.pets === true)
    }
    this.setState({ storedRooms: tempRooms });
  };

  render() {
    return (
      <Roomcontext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </Roomcontext.Provider>
    );
  }
}

const RoomConsumer = Roomcontext.Consumer;
export { RoomProvider, RoomConsumer, Roomcontext };
