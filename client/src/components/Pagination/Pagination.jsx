// Libraries and methods
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
// Our modules
import * as actions from '../../redux/actions/paginationActions.js';
import s from './Pagination.module.sass';

function Pagination(props) {
  // React
  const [maxPages, setMaxPages] = useState(0);
  const [localCurrPage, setLocalCurrPage] = useState(1);
  // Redux
  const dispatch = useDispatch();
  const { setCurrentPage } = bindActionCreators(actions, dispatch);
  const { books, filterCard } = useSelector(state => state.books);
  const { users } = useSelector(state => state.users);
  const currentPage = useSelector(state => state.pagination.currentPage);
  const cardsPerPage = useSelector(state => state.pagination.cardsPerPage);
  useEffect(() => {
    if (filterCard === 'books')
      setMaxPages(Math.floor(books.length / cardsPerPage) + 1);
    else if (filterCard === 'users')
      setMaxPages(Math.floor(users.length / cardsPerPage) + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, books, filterCard, currentPage]);
  const handleChangeInput = e => {
    e.preventDefault()
    setLocalCurrPage(e.target.value)
    if (e.target.value >= 1 && e.target.value <= maxPages) setCurrentPage(e.target.value)
  }
  return (
    <div className={s.pagination}>
      <button
        className={currentPage > 1 ? s.pagButton : s.pagButtonDisabled}
        onClick={() => currentPage > 1 && setCurrentPage('prev')}
      >
        {'< Anterior'}
      </button>
      <div id={s.pageContainer}>
        <input
          id={s.currPage}
          type="number"
          value={localCurrPage}
          onChange={e => handleChangeInput(e)}
        >
        </input>
      </div>
      <p>de {maxPages}</p>
      <button
        className={currentPage !== maxPages ? s.pagButton : s.pagButtonDisabled}
        onClick={() => currentPage !== maxPages && setCurrentPage('next')}
      >
        {'Siguiente >'}
      </button>
    </div>
  );
}

export default Pagination;
