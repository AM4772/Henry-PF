import React, {useState, useEffect} from 'react'
import s from '../Contact/Contact.module.sass'

export default function CreateBook() {
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
    authors: "",
    categories: "",
    publisher: "",
    publishedDate: "",
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
  const [count, setCount] = useState(countInitialState);
  const [info, setInfo] = useState(infoInitialState);
  const [isValid, setIsValid] = useState(isValidInitialState);
  const [isAllowed, setIsAllowed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    var imageCheck = new RegExp(/(https?:\/\/.*\.(?:png|jpg|svg))/);
    const isValidCopy = { ...isValid };
    // Title
    if (!info.title.length) isValidCopy.title = ' ';
    else if (info.title.length < 6 || info.title.length > 50) isValidCopy.title = 'Title is invalid';
    else delete isValidCopy.title;
    // Description
    if (!info.description.length) isValidCopy.description = ' ';
    else if (info.description.length < 16 || info.description.length > 120) isValidCopy.description = 'Description must contain between 16-120 characters';
    else delete isValidCopy.description;
    // Price
    if (!info.price.length) isValidCopy.price = ' ';
    else if (isNaN(info.price)) isValidCopy.price = 'Price must be a number .-.';
    else if (info.price > 150 || info.price < 1) isValidCopy.price = 'Price must be between 1$ - 150$';
    else delete isValidCopy.price;
    // Image
    if (!info.image.length) isValidCopy.image = " ";
    else if (!imageCheck.test(info.image)) isValidCopy.image = "Image url is unvalid";
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
    if (!info.publishedDate.length) isValidCopy.publishedDate = " ";
    else delete isValidCopy.publishedDate;
    // PageCount
    if (!info.pageCount.length) isValidCopy.pageCount = " ";
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
  const handleSubmit = async e => {
    e.preventDefault();
  };
  const handleButton = () => {
    if (isPending) return <p className='buttons' id={s.waiting}>Submitting...</p>;
    else if (isAllowed) return <button className='buttons'>Submit</button>;
    else return <p className='buttons' id={s.waiting}>Submit</p>;
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
                  className={`${s.input} ${isValid.title && isValid.title.length && count.title ? s.danger : null}`}
                  onChange={e => setInfo({...info, title: e.target.value})}></input>
                  <p className={isValid.title && isValid.title !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.title}</p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Description: </label>
                <input
                  type="text"
                  placeholder="Description"
                  value={info.description}
                  className={`${s.input} ${isValid.description && isValid.description.length && count.description ? s.danger : null}`}
                  onChange={e => setInfo({...info, description: e.target.value})}></input>
                  <p className={isValid.description && isValid.description !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.description}</p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Price: </label>
                <input
                  type="text"
                  placeholder="Price"
                  value={info.price}
                  className={`${s.input} ${isValid.price && isValid.price.length && count.price ? s.danger : null}`}
                  onChange={e => setInfo({...info, price: e.target.value})}></input>
                  <p className={isValid.price && isValid.price !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.price}</p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Image: </label>
                <input
                  type="text"
                  placeholder="Image"
                  value={info.image}
                  className={`${s.input} ${isValid.image && isValid.image.length && count.image ? s.danger : null}`}
                  onChange={e => setInfo({...info, image: e.target.value})}></input>
                  <p className={isValid.image && isValid.image !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.image}</p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Authors: </label>
                <input
                  type="text"
                  placeholder="Authors"
                  value={info.authors}
                  className={`${s.input} ${isValid.authors && isValid.authors.length && count.authors ? s.danger : null}`}
                  onChange={e => setInfo({...info, authors: e.target.value})}></input>
                  <p className={isValid.authors && isValid.authors !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.authors}</p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Categories: </label>
                <input
                  type="text"
                  placeholder="Categories"
                  value={info.categories}
                  className={`${s.input} ${isValid.categories && isValid.categories.length && count.categories ? s.danger : null}`}
                  onChange={e => setInfo({...info, categories: e.target.value})}></input>
                  <p className={isValid.categories && isValid.categories !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.categories}</p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Publisher: </label>
                <input
                  type="text"
                  placeholder="Publisher"
                  value={info.publisher}
                  className={`${s.input} ${isValid.publisher && isValid.publisher.length && count.publisher ? s.danger : null}`}
                  onChange={e => setInfo({...info, publisher: e.target.value})}></input>
                  <p className={isValid.publisher && isValid.publisher !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.publisher}</p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Published date: </label>
                <input
                  type="text"
                  placeholder="Published date"
                  value={info.publishedDate}
                  className={`${s.input} ${isValid.publishedDate && isValid.publishedDate.length && count.publishedDate ? s.danger : null}`}
                  onChange={e => setInfo({...info, publishedDate: e.target.value})}></input>
                  <p className={isValid.publishedDate && isValid.publishedDate !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.publishedDate}</p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Page count: </label>
                <input
                  type="text"
                  placeholder="Page count"
                  value={info.pageCount}
                  className={`${s.input} ${isValid.pageCount && isValid.pageCount.length && count.pageCount ? s.danger : null}`}
                  onChange={e => setInfo({...info, pageCount: e.target.value})}></input>
                  <p className={isValid.pageCount && isValid.pageCount !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.pageCount}</p>
              </div>
              <div className={s.inline}>
                <label className={s.fillTitle}>Language: </label>
                <input
                  type="text"
                  placeholder="Language"
                  value={info.language}
                  className={`${s.input} ${isValid.language && isValid.language.length && count.language ? s.danger : null}`}
                  onChange={e => setInfo({...info, language: e.target.value})}></input>
                  <p className={isValid.language && isValid.language !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.language}</p>
              </div>
            </div>
          <div id={s.bottomButton}> {handleButton()} </div>
        </form>
      </div>
    </div>
  )
}
