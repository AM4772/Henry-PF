import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./Cards.module.sass";
import BookCard from "../BookCard/BookCard";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

function Cards() {
  const { books, filterCard, loading } = useSelector((state) => state.books);
  const { users } = useSelector((state) => state.users);

  const { currentPage, cardsPerPage } = useSelector(
    (state) => state.pagination
  );

  const indexOfLastCards = currentPage * cardsPerPage;
  const indexOfFirstCards = indexOfLastCards - cardsPerPage;
  const currentBooks = books.slice(indexOfFirstCards, indexOfLastCards);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books, currentPage, users, filterCard, loading]);

  return (
    <>
      <div className={s.card_container}>
        {currentBooks[0] ? (
          currentBooks.map((b) => {
            if (b) {
              return (
                <BookCard
                  key={b.ID}
                  ID={b.ID}
                  image={b.image}
                  title={b.title}
                  authors={b.authors}
                  price={b.price}
                />
              );
            }
            return null;
          })
        ) : loading ? (
          <Loading />
        ) : (
          <div className={s.notFound}>
            <h4>There are no books matching your search</h4>
            <p>Check the spelling of the word</p>
            <p>Use more generic words or fewer words</p>
            <p>
              Browse the <Link to="/">home</Link> section to find a similar book
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;
