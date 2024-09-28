import "./App.css";
import { Component } from "react";
import GifSearch from "./components/GifSearch/GifSearch";
import GifList from "./components/GifList/GifList";

class App extends Component {
  state = {
    gifs: [],
    inputValue: "",
    page: 1,
    apiKey: "OHEu4x2wdkk8nmAEEgcqrTHORrpBLd8c",
  };

  getImagesByInput = (evt) => {
    evt.preventDefault();
    const inputValue = evt.target.elements.searchbarInput.value;

    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${this.state.apiKey}&q=${inputValue}&limit=12`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          gifs: data.data,
          inputValue,
        });
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <GifSearch getImagesByInput={this.getImagesByInput} />
        <GifList gifs={this.state.gifs} />
      </>
    );
  }
}

export default App;
