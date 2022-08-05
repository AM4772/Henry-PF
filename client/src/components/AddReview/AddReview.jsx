import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./AddReview.module.sass";
import StarFull from "../../assets/StarFull.png";
import StarEmpty from "../../assets/StarEmpty.png";
import { asyncAddReview } from "../../redux/actions/reviewActions";
import { setCloseButtonReview } from "../../redux/reducers/booksSlice";
// import { asyncGetBookDetail } from "../../redux/actions/booksActions";

export default function AddReview({ book }) {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.profile);
  const { closeButtonReview } = useSelector((state) => state.books);
  const [errors, setErrors] = React.useState({});
  const [countStars, setCountStars] = useState(0);
  const [myForm, setMyForm] = useState({
    title: "",
    review: "",
    rating: 0,
    bookID: book.ID,
    userID: userProfile.ID,
  });

  const openReview = useRef();
  document.addEventListener("mousedown", closeListReview);

  function closeListReview(e) {
    if (
      openReview.current &&
      closeButtonReview &&
      !openReview.current.contains(e.target)
    ) {
      dispatch(setCloseButtonReview());
    }
  }

  function validate(input) {
    let errors = {};

    if (!input.title || input.title.length > 20) {
      errors.title = "Title is required, and must not exceed 20 characters";
    } else if (!/^[a-zA-Z0-9\s,Ññáéíóú¡!]+$/.test(input.title)) {
      errors.title =
        "The title of the review is invalid, no special characters are allowed";
    }
    if (input.review.length > 350 || input.review.length > 350) {
      errors.review =
        "Descriptionis required, and must not exceed 350 characters";
    }
    return errors;
  }

  let handleChange = (e) => {
    setMyForm({
      ...myForm,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...myForm,
        [e.target.name]: e.target.value,
      })
    );
  };
  useEffect(() => {
    setMyForm({
      ...myForm,
      rating: countStars,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countStars]);

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncAddReview(myForm));
    // dispatch(asyncGetBookDetail(book.ID));
    resetFilters();
    setMyForm({
      title: "",
      review: "",
      rating: 0,
      bookID: "",
      userID: "",
    });
  };

  function resetFilters() {
    setCountStars(0);
    document.getElementById("titleID").selectedIndex = "";
    document.getElementById("descriptionID").selectedIndex = "";
  }

  function goBack() {
    dispatch(setCloseButtonReview());
  }

  function handleButton() {
    if (!errors.title && !errors.review && myForm.rating)
      return (
        <button id={s.active} className={`buttons`}>
          CREATE REVIEW
        </button>
      );
    else
      return (
        <p id={s.waiting} className="buttons">
          CREATE REVIEW
        </p>
      );
  }

  return (
    <div className={s.container0} id="myinput">
      <div className={s.backButton}>
        <button className={s.buttonBack} onClick={goBack}>
          Back
        </button>
      </div>
      <div className={s.containerCard} ref={openReview}>
        <h1 className={s.titleAdd}>Add Review</h1>
        <div className={s.containerImageForm}>
          <div className={s.containerImage}>
            <img
              className={s.image}
              alt={book.title}
              title={book.title}
              src={`${book.image}`}
            />
          </div>
          <div className={s.containerForm}>
            <form onSubmit={handleSubmit}>
              <div className={s.creationCardDisplay}>
                <div className={s.inline}>
                  <div className={s.inline}>
                    <label className={s.fillTitle}>Select Stars:</label>
                    <div className={s.containerStars}>
                      <img
                        className={s.star}
                        onClick={() => setCountStars(1)}
                        alt="1star"
                        src={countStars > 0 ? StarFull : StarEmpty}
                      />
                      <img
                        className={s.star}
                        onClick={() => setCountStars(2)}
                        alt="2star"
                        src={countStars > 1 ? StarFull : StarEmpty}
                      />
                      <img
                        className={s.star}
                        onClick={() => setCountStars(3)}
                        alt="3star"
                        src={countStars > 2 ? StarFull : StarEmpty}
                      />
                      <img
                        className={s.star}
                        onClick={() => setCountStars(4)}
                        alt="4star"
                        src={countStars > 3 ? StarFull : StarEmpty}
                      />
                      <img
                        className={s.star}
                        onClick={() => setCountStars(5)}
                        alt="5star"
                        src={countStars > 4 ? StarFull : StarEmpty}
                      />
                    </div>
                  </div>
                  <div className={s.inline}>
                    <label className={s.fillTitle}>Title: </label>
                  </div>
                  <input
                    className={!errors.title ? s.normal : s.danger}
                    id="titleID"
                    type="text"
                    placeholder="Enter a tittle..."
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={myForm.title}
                    name="title"
                  ></input>
                  <p
                    visibility={errors.title ? "visible" : "hidden"}
                    className={s.errorMessage}
                  >
                    {errors.title}
                  </p>
                </div>
                <div className={s.inline}>
                  <div className={s.inline}>
                    <label className={s.fillTitle}>Description: </label>{" "}
                  </div>
                  <textarea
                    className={!errors.review ? s.normal : s.danger}
                    id="descriptionID"
                    type="text"
                    placeholder="Describe your review..."
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={myForm.review}
                    name="review"
                  ></textarea>
                  <p
                    visibility={errors.review ? "visible" : "hidden"}
                    className={s.errorMessage}
                  >
                    {errors.review}
                  </p>
                  <div className={s.bottomButton}>{handleButton()}</div>
                  {/* <div className={s.bottomButton}>
                    <button className="buttons">CREATE REVIEW</button>
                  </div> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
