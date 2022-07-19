import React from "react";
import Pagination from "../Pagination/Pagination.jsx";
import LogIn from "../LogIn/LogIn.jsx";
import BookCard from "../BookCard/BookCard.jsx";
import s from "./Home.module.sass";

function Home(props) {
  // Añado mi componente pagination solo para probarlo
  return (
    <div>
      <h1>Estamos en Home</h1>
      <BookCard />
    </div>
  );
}

export default Home;
