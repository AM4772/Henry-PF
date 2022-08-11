import React, { useState, useEffect, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadFileBookImage } from "../Firebase/config.js";
import { TiCamera } from "react-icons/ti";
import chroma from "chroma-js";
import { languageOptions } from "./data.jsx";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
// import { IoIosArrowBack } from "react-icons/io";
import s from "./CreateBook.module.sass";
import {
  asyncGetAuthors,
  asyncGetCategories,
  asyncCreateBook,
} from "../../redux/actions/booksActions";

import { makeStyles } from "@material-ui/core";

const useInputStyles = makeStyles({
  root: {
    width: "370px",
    height: "40px",
    padding: "2px",
    color: (props) => (props.color ? props.color : "inherit"),
    verticalAlign: "middle",
    fontSize: "16px",
    background: "white",
    borderRadius: "10px",
  },
});

export default function CreateBook() {
  const dispatch = useDispatch();
  const history = useHistory();
  const inputClasses = useInputStyles();
  const isValidInitialState = {
    title: "",
    description: "",
    price: "",
    image: "",
    authors: "",
    categories: "",
    publisher: "",
    publishedDate: "",
    pageCount: "",
    language: "",
  };
  const infoInitialState = {
    title: "",
    description: "",
    price: "",
    image: "",
    authors: [],
    categories: [],
    publisher: "",
    publishedDate: new Date(),
    pageCount: "",
    language: "",
  };
  const countInitialState = {
    title: 0,
    description: 0,
    price: 0,
    image: 0,
    authors: 0,
    categories: 0,
    publisher: 0,
    publishedDate: 0,
    pageCount: 0,
    language: 0,
  };
  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });
  const customStylesLanguage = {
    control: () => ({
      display: "-webkit-flex",
      backgroundColor: "white",
      borderRadius: 10,
      color: "gray",
      fontFamily: "Roboto",
      fontWeight: "400",
      borderColor: "none",
      border:
        isValid.language && isValid.language.length && count.language
          ? "rgba(255, 0, 0, 0.5960784314) solid 2px"
          : "#ffffff98 solid 2px",
      transition: "0.3s",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.2).css()
          : undefined,
        color: isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({
      ...styles,
      ...dot(),

      ":focus": {
        border: "none",
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      height: "200px",
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      overflow: "hidden",
    }),
    menuList: (provided, state) => ({
      ...provided,
      height: "200px",
    }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };
  const customStylesAuthors = {
    control: () => ({
      display: "-webkit-flex",
      backgroundColor: "white",
      borderRadius: 10,
      color: "gray",
      fontFamily: "Roboto",
      fontWeight: "400",
      border:
        !info.authors.length && count.authors
          ? "rgba(255, 0, 0, 0.5960784314) solid 2px"
          : "#ffffff98 solid 2px",
      transition: "0.3s",
    }),
    menu: (provided, state) => ({
      ...provided,
      height: "200px",
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      overflow: "hidden",
    }),
    menuList: (provided, state) => ({
      ...provided,
      height: "200px",
    }),
  };
  const customStylesCategories = {
    control: () => ({
      display: "-webkit-flex",
      backgroundColor: "white",
      borderRadius: 10,
      color: "gray",
      fontFamily: "Roboto",
      fontWeight: "400",
      border:
        !info.categories.length && count.categories
          ? "rgba(255, 0, 0, 0.5960784314) solid 2px"
          : "#ffffff98 solid 2px",
      transition: "0.3s",
    }),
    menu: (provided, state) => ({
      ...provided,
      height: "200px",
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      overflow: "hidden",
    }),
    menuList: (provided, state) => ({
      ...provided,
      height: "200px",
    }),
  };
  const defaultOptions = [{ value: "", label: "Loading...", isDisabled: true }];
  const [count, setCount] = useState(countInitialState);
  const [authorsOptions, setAuthorsOptions] = useState(null);
  const [caterogiesOptions, setCaterogiesOptions] = useState(null);
  const { authors, categories } = useSelector((state) => state.books);
  const { stack } = useSelector((state) => state.history);
  const [info, setInfo] = useState(infoInitialState);
  const [isValid, setIsValid] = useState(isValidInitialState);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [random, setRandom] = useState();
  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      // eslint-disable-next-line no-mixed-operators
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };
  useMemo(() => {
    setRandom(uuidv4());
    if (!authorsOptions || !caterogiesOptions) {
      let authorsCopy = [],
        categoriesCopy = [];
      if (authors.length && categories.length) {
        for (let i = 0; i < authors.length; i++) {
          authorsCopy.push({ value: authors[i], label: authors[i] });
        }
        for (let k = 0; k < categories.length; k++) {
          categoriesCopy.push({ value: categories[k], label: categories[k] });
        }
        setAuthorsOptions(authorsCopy);
        setCaterogiesOptions(categoriesCopy);
      } else if (!authors.length && !categories.length) {
        dispatch(asyncGetAuthors());
        dispatch(asyncGetCategories());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authors, categories]);

  useEffect(() => {
    const isValidCopy = { ...isValid };
    // Title
    if (!info.title.length) isValidCopy.title = " ";
    else if (info.title.length < 3 || info.title.length > 200)
      isValidCopy.title = "Title must contain 3-200 characters";
    else delete isValidCopy.title;
    // Description
    if (!info.description.length) isValidCopy.description = " ";
    else delete isValidCopy.description;
    // Price
    if (!info.price.length) isValidCopy.price = " ";
    else if (isNaN(info.price))
      isValidCopy.price = "Price must be a number .-.";
    else if (info.price > 10000 || info.price < 1)
      isValidCopy.price = "Price must be between $1 - $10.000";
    else delete isValidCopy.price;
    // Image
    if (!info.image.length) isValidCopy.image = " ";
    else delete isValidCopy.image;
    // Authors
    if (!info.authors.length) isValidCopy.authors = " ";
    else delete isValidCopy.authors;
    // Categories
    if (!info.categories.length) isValidCopy.categories = " ";
    else delete isValidCopy.categories;
    // Publisher
    if (!info.publisher.length) isValidCopy.publisher = " ";
    else delete isValidCopy.publisher;
    // PublishedDate
    if (!info.publishedDate) isValidCopy.publishedDate = " ";
    else delete isValidCopy.publishedDate;
    // PageCount
    if (!info.pageCount.length) isValidCopy.pageCount = " ";
    else if (isNaN(info.pageCount))
      isValidCopy.pageCount = "Page count must be a number .-.";
    else if (info.pageCount > 5000 || info.pageCount < 10)
      isValidCopy.pageCount = "Page count must be between 10 - 5000";
    else delete isValidCopy.pageCount;
    // Language
    if (!info.language.length) isValidCopy.language = " ";
    else delete isValidCopy.language;
    setIsValid(isValidCopy);
    // Check if its valid
    var size = Object.keys(isValidCopy).length;
    if (!size) setIsAllowed(true);
    else if (size) setIsAllowed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);
  const goBack = () => {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/favourites" &&
        stack[i] !== stack[0]
      ) {
        lastPath.push(stack[i]);
      }
    }
    if (lastPath.length > 0) {
      history.push(lastPath[0]);
    } else {
      history.push("/");
    }
  };
  const handleLanguage = (e) => {
    if (e) setInfo({ ...info, language: e.value });
    else setInfo({ ...info, language: "" });
  };
  const handleAuthors = (e) => {
    const mapped = e.map((author) => author.value);
    if (e) setInfo({ ...info, authors: mapped });
    else setInfo({ ...info, authors: [] });
  };
  const handleCategories = (e) => {
    const mapped = e.map((categorie) => categorie.value);
    if (e) setInfo({ ...info, categories: mapped });
    else setInfo({ ...info, categories: [] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let authorsCopy = info.authors.map((author) => {
      if (authors.find((element) => element === author))
        return { value: author, created: false };
      else return { value: author, created: true };
    });
    let categoriesCopy = info.categories.map((category) => {
      if (categories.find((element) => element === category))
        return { value: category, created: false };
      else return { value: category, created: true };
    });
    setIsPending(true);
    dispatch(
      asyncCreateBook({
        ...info,
        authors: authorsCopy,
        categories: categoriesCopy,
        publishedDate: `${info.publishedDate.getFullYear()}-${(
          info.publishedDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${info.publishedDate
          .getDate()
          .toString()
          .padStart(2, "0")}`,
      })
    ).then(() => {
      setIsPending(false);
      setInfo(infoInitialState);
      setIsValid(isValidInitialState);
      setCount(countInitialState);
    });
  };
  const handleButton = () => {
    if (isPending)
      return (
        <p className="buttons" id={s.waiting}>
          Submitting...
        </p>
      );
    else if (isAllowed) return <button className="buttons">Submit</button>;
    else
      return (
        <p className="buttons" id={s.waiting}>
          Submit
        </p>
      );
  };
  const handleImage = async (e) => {
    e.preventDefault();
    const result = await uploadFileBookImage(e.target.files[0], random);
    setInfo({ ...info, image: result });
  };
  return (
    <div id={s.pleaseWork}>
      <div id={s.toCenter}>
        <button className={s.buttonBack} onClick={goBack}>
          {/* <IoIosArrowBack id={s.arrow} /> */}
          Back
        </button>
        <h1 id={s.title}>Create book</h1>
        <div id={s.card}>
          <form onSubmit={handleSubmit}>
            <h1 className={s.hiddenTitle}>Create book</h1>
            <div className={s.creationCardDisplay}>
              <div className={s.inline}>
                <label className={s.fillTitle}>Title: </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={info.title}
                  className={`${s.input} ${
                    isValid.title && isValid.title.length && count.title
                      ? s.danger
                      : s.nejDanger
                  }`}
                  onChange={(e) =>
                    setInfo({ ...info, title: e.target.value }) ||
                    setCount({ ...count, title: 1 })
                  }
                ></input>
                <p
                  className={
                    isValid.title && isValid.title !== " "
                      ? s.errorMessage
                      : s.noErrorMessage
                  }
                >
                  {isValid.title}
                </p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Price: </label>
                <input
                  type="text"
                  placeholder="Price"
                  value={info.price}
                  className={`${s.input} ${
                    isValid.price && isValid.price.length && count.price
                      ? s.danger
                      : s.nejDanger
                  }`}
                  onChange={(e) =>
                    setInfo({ ...info, price: e.target.value }) ||
                    setCount({ ...count, price: 1 })
                  }
                ></input>
                <p
                  className={
                    isValid.price && isValid.price !== " "
                      ? s.errorMessage
                      : s.noErrorMessage
                  }
                >
                  {isValid.price}
                </p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Book cover: </label>
                <div id={s.testIMG} title="Upload Image">
                  <label id={s.customFileUpload}>
                    <TiCamera id={s.camera} />
                    <input
                      type="file"
                      id={s.formContainer}
                      onChange={handleImage}
                    />
                  </label>
                  <img src={info.image} alt="" />
                  <div
                    id={
                      !info.image.length ? s.enterSomething : s.doNotDisplayme
                    }
                  >
                    <p>Enter an image</p>
                  </div>
                </div>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Publisher: </label>
                <input
                  type="text"
                  placeholder="Publisher"
                  value={info.publisher}
                  className={`${s.input} ${
                    isValid.publisher &&
                    isValid.publisher.length &&
                    count.publisher
                      ? s.danger
                      : s.nejDanger
                  }`}
                  onChange={(e) =>
                    setInfo({ ...info, publisher: e.target.value }) ||
                    setCount({ ...count, publisher: 1 })
                  }
                ></input>
                <p
                  className={
                    isValid.publisher && isValid.publisher !== " "
                      ? s.errorMessage
                      : s.noErrorMessage
                  }
                >
                  {isValid.publisher}
                </p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Page count: </label>
                <input
                  type="text"
                  placeholder="Page count"
                  value={info.pageCount}
                  className={`${s.input} ${
                    isValid.pageCount &&
                    isValid.pageCount.length &&
                    count.pageCount
                      ? s.danger
                      : s.nejDanger
                  }`}
                  onChange={(e) =>
                    setInfo({ ...info, pageCount: e.target.value }) ||
                    setCount({ ...count, pageCount: 1 })
                  }
                ></input>
                <p
                  className={
                    isValid.pageCount && isValid.pageCount !== " "
                      ? s.errorMessage
                      : s.noErrorMessage
                  }
                >
                  {isValid.pageCount}
                </p>
              </div>
            </div>
            <div id={s.bottomButton}> {handleButton()} </div>
          </form>
        </div>
        <div id={s.card2}>
          <h1 className={s.hiddenTitle}>Aditional info</h1>
          <div className={s.creationCardDisplay}>
            <div className={s.inline}>
              <label className={s.fillTitle}>Description: </label>
              <textarea
                type="text"
                placeholder="Description"
                value={info.description}
                className={`${s.textarea} ${
                  isValid.description &&
                  isValid.description.length &&
                  count.description
                    ? s.danger
                    : s.nejDanger
                }`}
                onChange={(e) =>
                  setInfo({ ...info, description: e.target.value }) ||
                  setCount({ ...count, description: 1 })
                }
              ></textarea>
              <p
                className={
                  isValid.description && isValid.description !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.description}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Authors: </label>
              <CreatableSelect
                isClearable
                isMulti
                name="authors"
                options={authorsOptions ? authorsOptions : defaultOptions}
                styles={customStylesAuthors}
                onChange={(e) =>
                  handleAuthors(e) || setCount({ ...count, authors: 1 })
                }
              />
              <p
                className={
                  isValid.authors && isValid.authors !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.authors}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Categories: </label>
              <CreatableSelect
                isClearable
                isMulti
                name="categories"
                options={caterogiesOptions ? caterogiesOptions : defaultOptions}
                styles={customStylesCategories}
                onChange={(e) =>
                  handleCategories(e) || setCount({ ...count, categories: 1 })
                }
              />
              {/* // onChange={e =>
              //   setInfo({ ...info, categories: e.target.value }) ||
              //   setCount({ ...count, categories: 1 }) */}
              <p
                className={
                  isValid.categories && isValid.categories !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.categories}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Published date: </label>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  clearable
                  // orientation="landscape"
                  border="none"
                  id={s.customInput}
                  ampm={false}
                  InputProps={{ disableUnderline: true, classes: inputClasses }}
                  className="dateTimeModalPicker"
                  placeholder="DD/MM/AAAA"
                  invalidDateMessage=""
                  format="dd/MM/yyyy"
                  minDate={new Date("1000-01-01")}
                  maxDate={new Date()}
                  disableFuture
                  value={info.publishedDate}
                  onChange={(date) =>
                    setInfo({ ...info, publishedDate: date }) ||
                    setCount({ ...count, publishedDate: 1 })
                  }
                />
              </MuiPickersUtilsProvider>
              <p
                className={
                  isValid.publishedDate && isValid.publishedDate !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.publishedDate}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Language: </label>
              <Select
                isClearable={true}
                name="language"
                menuColor="red"
                options={languageOptions}
                styles={customStylesLanguage}
                onChange={(e) =>
                  handleLanguage(e) || setCount({ ...count, language: 1 })
                }
              />
              <p
                className={
                  isValid.language && isValid.language !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {" "}
                {isValid.language}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
