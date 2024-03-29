import React from "react";
import { Link } from "react-router-dom";
import s from "./Slider.module.sass";
import "@brainhubeu/react-carousel/lib/style.css";

const TESTING_BOOKS = [
  {
    ID: 1,
    title: "harry potter",
    description: "harry potter description",
    price: 200,
    imageL: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    imageS: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    authors: ["JK Rowling"],
    categories: ["Magic"],
    publisher: "Salamandra Infantil Y Juvenil",
    publishedDate: "2021-08-24",
    pageCount: 608,
    rating: 4,
    language: "es",
  },
  {
    ID: 2,
    title: "sherlock holmes",
    description: "sherlock holmes description",
    price: 20000,
    imageL: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    imageS: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    authors: ["Arthur Conan Doyle"],
    categories: ["Detective"],
    publisher: "any publiser",
    publishedDate: "1930-05-22",
    pageCount: 400,
    rating: 3,
    language: "es",
  },
  {
    ID: 3,
    title: "some book",
    description: "some book description",
    price: 100,
    imageL: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    imageS: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    authors: ["new author"],
    categories: ["SomeCategory"],
    publisher: "any publisher",
    publishedDate: "1999-02-23",
    pageCount: 62,
    rating: 5,
    language: "es",
  },
  {
    ID: 4,
    title: "another book",
    description: "another book description",
    price: 700,
    imageL: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    imageS: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    authors: ["Another author"],
    categories: ["AnotherCategory"],
    publisher: "any publisher",
    publishedDate: "2003-01-02",
    pageCount: 608,
    rating: 1,
    language: "es",
  },
  {
    ID: 5,
    title: "special book",
    description: "special description",
    price: 100,
    imageL: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    imageS: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    authors: ["SpecialAuthor"],
    categories: ["SpecialCategory"],
    publisher: "any publisher",
    publishedDate: "1990-01-01",
    pageCount: 608,
    rating: 3,
    language: "es",
  },
  {
    ID: 6,
    title: "lonely book",
    description: "lonely book description",
    price: 2500,
    imageL: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    imageS: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    authors: ["lonely author"],
    categories: ["Lonely"],
    publisher: "any publisher",
    publishedDate: "2020-07-11",
    pageCount: 608,
    rating: 4,
    language: "es",
  },
  {
    ID: 7,
    title: "Wow book",
    description: "wow description",
    price: 2100,
    imageL: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    imageS: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    authors: ["Wow author"],
    categories: ["Wow magic"],
    publisher: "any publisher",
    publishedDate: "2010-12-02",
    pageCount: 608,
    rating: 4,
    language: "es",
  },
  {
    ID: 8,
    title: "Stranger Book",
    description: "OMG Stranger Book description",
    price: 3300,
    imageL: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    imageS: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    authors: ["Best Author"],
    categories: ["Paranormal"],
    publisher: "any publisher",
    publishedDate: "2015-04-04",
    pageCount: 608,
    rating: 1,
    language: "es",
  },
  {
    ID: 10,
    title: "crime book",
    description: "crime book description",
    price: 5000,
    imageL: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    imageS: "https://images-na.ssl-images-amazon.com/images/I/91R1AixEiLL.jpg",
    authors: ["Killer Jackson"],
    categories: ["Crime"],
    publisher: "any publisher",
    publishedDate: "1995-11-15",
    pageCount: 608,
    rating: 5,
    language: "es",
  },
];

const slides = TESTING_BOOKS.map((slide) => (
  <Link to={`/book/${slide.ID}`}>
    <div className={s.slideContainer}>
      <img className={s.slideImg} src={slide.imageS} alt="" />
      <div className={s.slideDesc}>{slide.title}</div>
    </div>
  </Link>
));

export default slides;
