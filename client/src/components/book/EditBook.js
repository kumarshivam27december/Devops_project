import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { renderImage } from "../../helper/image.js";
import { useHistory } from 'react-router-dom';

function EditBook(props) {

  const history = useHistory();

  const [oldBook, setOldBook] = useState({
    bookName: "",
    author: "",
    bookDes: "",
    genre: "",
    imageBuffer: [],
    imageType: ""
  });

  const [image, setImage] = useState({});
  const [isNewImage, setIsNewImage] = useState(false);
  const [somethingChanged, setSomethingChanged] = useState(false);

  // GET the old book
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      axios.get(`http://localhost:4000/books/${props.match.params.id}`).then(res => {

        if (res.data.permission) {
          history.replace("/forbidden"); // If user tries to edit books that don't belong to them
        }

        setOldBook({
          bookName: res.data.book.name,
          author: res.data.book.author,
          bookDes: res.data.book.description,
          genre: res.data.book.genre,
          imageBuffer: res.data.book.image.data.data,
          imageType: res.data.book.image.contentType
        });
        
      }).catch(error => {
        console.log(error.response.data);
      });
    }

    return () => isSubscribed = false;

  }, [props.match.params.id, history]);

  const onBookInputChange = (event) => {
    setSomethingChanged(true);
    setOldBook({...oldBook, [event.target.id]: event.target.value});
  }

  const uploadImage = (event) => {
    if (event.target.files.length !== 0) {
      setSomethingChanged(true);
      setImage({
        preview: URL.createObjectURL(event.target.files[0]), // Link for image preview
        file: event.target.files[0] // File for upload
      })
      setIsNewImage(true);
    }
  }

  const submitForm = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", oldBook.bookName);
    formData.append("author", oldBook.author);
    formData.append("description", oldBook.bookDes);
    formData.append("genre", oldBook.genre);
    formData.append("image", image.file);

    axios.put(`http://localhost:4000/books/edit/${props.match.params.id}`, formData).then(res => {
      history.goBack();
    }).catch(error => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <style>{`
        .form-wrapper {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .form-input {
          margin-bottom: 1.5rem;
        }

        .form-input input,
        .form-input select,
        .form-input textarea {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 0.75rem;
          color: #333;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-input input:focus,
        .form-input select:focus,
        .form-input textarea:focus {
          border-color: #66afe9;
          outline: none;
          box-shadow: 0 0 4px rgba(102, 175, 233, 0.6);
        }

        .submit-form-btn-wrapper {
          text-align: center;
          margin-top: 1.5rem;
        }

        .submit-form-btn {
          background-color: #5cdb95;
          border: none;
          padding: 0.6rem 1.5rem;
          font-size: 1rem;
          color: #fff;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        .submit-form-btn:hover {
          background-color: #45b97c;
        }

        .preview-image-wrapper {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .preview-image-wrapper img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        .gradient-background {
          background: linear-gradient(to right, #0077FF, #084698);
        }
      `}</style>

      <div className="form-wrapper gradient-background">
        <div className="preview-image-wrapper">
          {/* Preview new image or render the Buffer data of old image */}
          <img src={isNewImage ? image.preview : renderImage(oldBook.imageBuffer, oldBook.imageType)} alt="book-preview"/>
        </div>

        <Form onSubmit={submitForm}>

          <Form.Row>
            <Form.Group className="form-input" as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control id="bookName" type="text" value={oldBook.bookName} placeholder="An Awesome Book!" onChange={onBookInputChange} required/>
            </Form.Group>

            <Form.Group className="form-input" as={Col}>
              <Form.Label>Author</Form.Label>
              <Form.Control id="author" type="text" value={oldBook.author} placeholder="John Doe" onChange={onBookInputChange} required/>
            </Form.Group>
          </Form.Row>

          <Form.Group className="form-input">
            <Form.Label>Description</Form.Label>
            <Form.Control id="bookDes" style={{resize: "none"}} as="textarea" rows="5" value={oldBook.bookDes} placeholder="This is a book about awesome books!" onChange={onBookInputChange} required/>
          </Form.Group>

          <Form.Row>

            <Form.Group className="form-input" as={Col}>
              <Form.Label>Genre</Form.Label>
              <Form.Control id="genre" as="select" value={oldBook.genre} onChange={onBookInputChange} required>
                <option>Choose...</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Thriller</option>
                <option>Business</option>
                <option>Science</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="form-input" as={Col}>
              <Form.Label>Photo</Form.Label>
              <Form.Control type="file" accept="image/*" title=" " onChange={uploadImage} encType="multipart/form-data"  />
            </Form.Group>

          </Form.Row>

          <div className="submit-form-btn-wrapper">
            <Button className="submit-form-btn" variant="primary" size="lg" type="submit" disabled={somethingChanged ? null : "True"}>Save Changes</Button>
          </div>

        </Form>
      </div>
    </>
  )
}

export default EditBook;
