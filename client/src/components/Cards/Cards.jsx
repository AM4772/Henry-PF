import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import s from "./Cards.module.sass";
import BookCard from "../BookCard/BookCard";
// import UserCard from "../UserCard/UserCard";
import Loading from "../Loading/Loading";

function Cards() {
  const { books, filterCard } = useSelector((state) => state.books);
  const { users } = useSelector((state) => state.users);

  const { currentPage, cardsPerPage } = useSelector(
    (state) => state.pagination
  );

  const [loading, setLoading] = useState(true);
  const [, setRare] = useState(true);

  const indexOfLastCards = currentPage * cardsPerPage;
  const indexOfFirstCards = indexOfLastCards - cardsPerPage;
  const currentBooks = books.slice(indexOfFirstCards, indexOfLastCards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  if (filterCard === "books") {
    setTimeout(() => {
      if (!currentBooks[0]) {
        setLoading(false);
      }
    }, 2500);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    return () => {
      setRare(true);
    };
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
              Browse the <a href="/">home</a> section to find a similar book
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;
