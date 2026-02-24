import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <Main>
        <WeatherCard />
        <ItemCard />
      </Main>
      <Footer></Footer>
      <ModalWithForm></ModalWithForm>
      <ItemModal></ItemModal>
    </>
  );
}

export default App;
