import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js';
import { languageOptions } from './data.jsx';
import Select from 'react-select';
import s from '../Contact/Contact.module.sass';

export default function CreateBook() {
  const isValidInitialState = {
    title: '',
    description: '',
    price: '',
    image: '',
    authors: '',
    categories: '',
    publisher: '',
    publishedDate: '',
    pageCount: '',
    language: '',
  };
  const infoInitialState = {
    title: '',
    description: '',
    price: '',
    image: '',
    authors: '',
    categories: '',
    publisher: '',
    publishedDate: '',
    pageCount: '',
    language: '',
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
  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });
  const customStyles = {
    control: () => ({
      display: '-webkit-flex',
      backgroundColor: 'white',
      borderRadius: 10,
      color: 'gray',
      fontFamily: 'Roboto',
      fontWeight: '400',
      borderColor: 'none',
      border: isValid.language && isValid.language.length && count.language
      ? 'rgba(255, 0, 0, 0.5960784314) solid 2px'
      : 'none',
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
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: styles => ({
      ...styles,
      ...dot(),
      
      ':focus': {
        border: 'none',
      },
    }),
    placeholder: styles => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };
  const [count, setCount] = useState(countInitialState);
  const [info, setInfo] = useState(infoInitialState);
  const [isValid, setIsValid] = useState(isValidInitialState);
  const [isAllowed, setIsAllowed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    var imageCheck = new RegExp(/(https?:\/\/.*\.(?:png|jpg|svg))/);
    var symbolCheck = new RegExp(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/);
    const isValidCopy = { ...isValid };
    // Title
    if (!info.title.length) isValidCopy.title = ' ';
    else if (info.title.length < 6 || info.title.length > 50)
      isValidCopy.title = 'Title is invalid';
    else delete isValidCopy.title;
    // Description
    if (!info.description.length) isValidCopy.description = ' ';
    else if (info.description.length < 16 || info.description.length > 120)
      isValidCopy.description =
        'Description must contain between 16-120 characters';
    else delete isValidCopy.description;
    // Price
    if (!info.price.length) isValidCopy.price = ' ';
    else if (isNaN(info.price))
      isValidCopy.price = 'Price must be a number .-.';
    else if (info.price > 150 || info.price < 1)
      isValidCopy.price = 'Price must be between 1$ - 150$';
    else delete isValidCopy.price;
    // Image
    if (!info.image.length) isValidCopy.image = ' ';
    else if (!imageCheck.test(info.image))
      isValidCopy.image = 'Image url is unvalid';
    else delete isValidCopy.image;
    // Authors
    if (!info.authors.length) isValidCopy.authors = ' ';
    else if (symbolCheck.test(info.authors))
      isValidCopy.authors = "Authors can't contain symbols";
    else delete isValidCopy.authors;
    // Categories
    if (!info.categories.length) isValidCopy.categories = ' ';
    else delete isValidCopy.categories;
    // Publisher
    if (!info.publisher.length) isValidCopy.publisher = ' ';
    else delete isValidCopy.publisher;
    // PublishedDate
    if (!info.publishedDate.length) isValidCopy.publishedDate = ' ';
    else delete isValidCopy.publishedDate;
    // PageCount
    if (!info.pageCount.length) isValidCopy.pageCount = ' ';
    else delete isValidCopy.pageCount;
    // Language
    if (!info.language.length) isValidCopy.language = ' ';
    else delete isValidCopy.language;
    setIsValid(isValidCopy);
    // Check if its valid
    var size = Object.keys(isValidCopy).length;
    if (!size) setIsAllowed(true);
    else if (size) setIsAllowed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);
  const handleLanguage = e => {
    if (e) setInfo({ ...info, language: e.value })
    else setInfo({ ...info, language: '' })
  }
  const handleSubmit = async e => {
    e.preventDefault();
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
  return (
    <div id={s.toCenter}>
      <div id={s.card}>
        <form onSubmit={handleSubmit}>
          <h1 id={s.register}>Create book</h1>
          <div id={s.creationCardDisplay}>
            <div className={s.inline}>
              <label className={s.fillTitle}>Title: </label>
              <input
                type="text"
                placeholder="Title"
                value={info.title}
                className={`${s.input} ${
                  isValid.title && isValid.title.length && count.title
                    ? s.danger
                    : null
                }`}
                onChange={e =>
                  setInfo({ ...info, title: e.target.value }) ||
                  setCount({ ...count, title: 1 })
                }
              ></input>
              <p
                className={
                  isValid.title && isValid.title !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.title}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Description: </label>
              <input
                type="text"
                placeholder="Description"
                value={info.description}
                className={`${s.input} ${
                  isValid.description &&
                  isValid.description.length &&
                  count.description
                    ? s.danger
                    : null
                }`}
                onChange={e =>
                  setInfo({ ...info, description: e.target.value }) ||
                  setCount({ ...count, description: 1 })
                }
              ></input>
              <p
                className={
                  isValid.description && isValid.description !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.description}
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
                    : null
                }`}
                onChange={e =>
                  setInfo({ ...info, price: e.target.value }) ||
                  setCount({ ...count, price: 1 })
                }
              ></input>
              <p
                className={
                  isValid.price && isValid.price !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.price}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Image: </label>
              <input
                type="text"
                placeholder="Image"
                value={info.image}
                className={`${s.input} ${
                  isValid.image && isValid.image.length && count.image
                    ? s.danger
                    : null
                }`}
                onChange={e =>
                  setInfo({ ...info, image: e.target.value }) ||
                  setCount({ ...count, image: 1 })
                }
              ></input>
              <p
                className={
                  isValid.image && isValid.image !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.image}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Authors: </label>
              <input
                type="text"
                placeholder="Authors"
                value={info.authors}
                className={`${s.input} ${
                  isValid.authors && isValid.authors.length && count.authors
                    ? s.danger
                    : null
                }`}
                onChange={e =>
                  setInfo({ ...info, authors: e.target.value }) ||
                  setCount({ ...count, authors: 1 })
                }
              ></input>
              <p
                className={
                  isValid.authors && isValid.authors !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.authors}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Categories: </label>
              <input
                type="text"
                placeholder="Categories"
                value={info.categories}
                className={`${s.input} ${
                  isValid.categories &&
                  isValid.categories.length &&
                  count.categories
                    ? s.danger
                    : null
                }`}
                onChange={e =>
                  setInfo({ ...info, categories: e.target.value }) ||
                  setCount({ ...count, categories: 1 })
                }
              ></input>
              <p
                className={
                  isValid.categories && isValid.categories !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.categories}
              </p>
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
                    : null
                }`}
                onChange={e =>
                  setInfo({ ...info, publisher: e.target.value }) ||
                  setCount({ ...count, publisher: 1 })
                }
              ></input>
              <p
                className={
                  isValid.publisher && isValid.publisher !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.publisher}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Published date: </label>
              <input
                type="text"
                placeholder="Published date"
                value={info.publishedDate}
                className={`${s.input} ${
                  isValid.publishedDate &&
                  isValid.publishedDate.length &&
                  count.publishedDate
                    ? s.danger
                    : null
                }`}
                onChange={e =>
                  setInfo({ ...info, publishedDate: e.target.value }) ||
                  setCount({ ...count, publishedDate: 1 })
                }
              ></input>
              <p
                className={
                  isValid.publishedDate && isValid.publishedDate !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.publishedDate}
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
                    : null
                }`}
                onChange={e =>
                  setInfo({ ...info, pageCount: e.target.value }) ||
                  setCount({ ...count, pageCount: 1 })
                }
              ></input>
              <p
                className={
                  isValid.pageCount && isValid.pageCount !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.pageCount}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Language: </label>
              <Select
                isClearable={true}
                name="language"
                menuColor="red"
                options={languageOptions}
                styles={customStyles}
                onChange={e =>
                  handleLanguage(e) ||
                  setCount({ ...count, language: 1 })}
                  />
              <p className={isValid.language && isValid.language !== ' '
                    ? s.errorMessage
                    : s.noErrorMessage
                }> {isValid.language} </p>
            </div>
          </div>
          <div id={s.bottomButton}> {handleButton()} </div>
        </form>
      </div>
    </div>
  );
}
