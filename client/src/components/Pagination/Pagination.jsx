// Libraries and methods
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
// Our modules
import * as actions from '../../redux/actions/paginationActions.js';
import s from "./Pagination.module.sass";

function Pagination(props) {
  // React
  const totalCards = 400;
  const [amountPages, setAmountPages] = useState([]);
  // const [refresh, setRefresh] = useState(0);
  // Redux
  const dispatch = useDispatch();
  const { setCurrentPage } = bindActionCreators(actions, dispatch);
  const currentPage = useSelector(state => state.pagination.currentPage);
  const cardsPerPage = useSelector(state => state.pagination.cardsPerPage);
  useEffect(() => {
    setAmountPages(Math.ceil(totalCards / cardsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCards]);
  return (
    <div className={s.pagination}>
      <button className={currentPage > 1 ? s.pagButton : s.pagButtonDisabled} onClick={() => currentPage > 1 && setCurrentPage('prev')}>{'< Anterior'}</button>
      <div id={s.pageContainer}><p id={s.currPage}>{currentPage}</p> de {amountPages}</div>
      <button className={currentPage !== amountPages ? s.pagButton : s.pagButtonDisabled} onClick={() => currentPage !== amountPages && setCurrentPage('next')}>{'Siguiente >'}</button>
    </div>
  );
}

export default Pagination;
