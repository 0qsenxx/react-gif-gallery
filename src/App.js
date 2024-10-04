import "./App.css";
import { Component } from "react";
import GifSearch from "./components/GifSearch/GifSearch";
import GifList from "./components/GifList/GifList";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    gifs: [],
    inputValue: "",
    offset: 1,
    apiKey: "OHEu4x2wdkk8nmAEEgcqrTHORrpBLd8c",
    ableToLoadMore: true,
    totalHits: 0,
    modalImgSrc: "",
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
          ableToLoadMore: data.data.length < data.pagination.total_count,
          totalHits: data.pagination.total_count,
          offset: 0,
        });
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  loadMoreFn = () => {
    this.setState(
      (prevState) => ({ offset: prevState.offset + 12 }),
      () => {
        fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${this.state.apiKey}&q=${this.state.inputValue}&limit=12&offset=${this.state.offset}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.data.length !== 0) {
              this.setState((prevState) => ({
                gifs: prevState.gifs.concat(data.data),
                ableToLoadMore:
                  prevState.gifs.length + data.data.length <
                  this.state.totalHits,
              }));
            } else {
              this.setState({ ableToLoadMore: false });
            }
          });
      }
    );
  };

  getImgSrcForModal = (evt) => {
    const imgSrc = evt.target.src;
    console.log("hello");
    const modalImgIdx = this.state.gifs.findIndex(
      (gif) => gif.images.original.url === imgSrc
    );
    this.setState({ modalImgSrc: imgSrc, modalImgIdx });
    window.addEventListener("keydown", this.switchKeys);
  };

  closeModal = () => {
    this.setState({ modalImgSrc: "" });
    // window.removeEventListener("keydown", this.handleKeyDown);
  };

  switchKeys = (evt) => {
    if (evt.key === "Escape") {
      this.closeModal();
    } else if (evt.key === "ArrowLeft") {
      this.setState((prevState) => {
        const prevIdx =
          prevState.modalImgIdx === 0
            ? prevState.gifs.length - 1
            : prevState.modalImgIdx - 1;
        return {
          modalImgIdx: prevIdx,
          modalImgSrc: prevState.gifs[prevIdx].images.original.url,
        };
      });
    } else if (evt.key === "ArrowRight") {
      this.setState((prevState) => {
        const nextIdx =
          prevState.modalImgIdx === prevState.gifs.length - 1
            ? 0
            : prevState.modalImgIdx + 1;
        return {
          modalImgIdx: nextIdx,
          modalImgSrc: prevState.gifs[nextIdx].images.original.url,
        };
      });
    }
  };

  render() {
    return (
      <>
        <GifSearch getImagesByInput={this.getImagesByInput} />
        <GifList
          gifs={this.state.gifs}
          getGifSrcForModal={this.getImgSrcForModal}
        />
        {this.state.gifs.length !== 0 && this.state.ableToLoadMore && (
          <Button loadMoreFn={this.loadMoreFn} />
        )}
        {this.state.modalImgSrc.length !== 0 && (
          <Modal
            imgSrc={this.state.modalImgSrc}
            closeModal={this.closeModal}
            switchKeys={this.switchKeys}
          />
        )}
        {/* {setTimeout(() => console.log(this.state.modalImgSrc), 15000)} */}
      </>
    );
  }
}

export default App;
