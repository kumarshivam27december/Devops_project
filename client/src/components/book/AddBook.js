import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bookImagePlaceholder } from "../../helper/image.js";

function AddBook(props) {
  const history = useHistory();

  const [newBook, setNewBook] = useState({
    bookName: "",
    author: "",
    bookDes: "",
    genre: "",
  });

  const [image, setImage] = useState({}); // To hold new image

  const onBookInputChange = (event) => {
    setNewBook({ ...newBook, [event.target.id]: event.target.value });
  };

  const uploadImage = (event) => {
    if (event.target.files.length !== 0) {
      setImage({
        preview: URL.createObjectURL(event.target.files[0]), // Link for image preview
        file: event.target.files[0], // File to upload to db
      });
    }
  };

  const submitAddBookForm = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", newBook.bookName);
    formData.append("author", newBook.author);
    formData.append("description", newBook.bookDes);
    formData.append("genre", newBook.genre);
    formData.append("image", image.file);
    formData.append("userId", props.auth.user.id);

    axios
      .post("http://localhost:4000/books/add", formData)
      .then((res) => {
        history.replace(`/users/profile/${props.auth.user.id}`);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <style>{`
        .form-wrapper {
          background-color: #f1f1f1;  /* Non-white background for the whole form */
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .form-input {
          background-color: #ffffff; /* Keep input fields white */
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 0.75rem;
          color: #333;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          border-color: #66afe9;
          outline: none;
          box-shadow: 0 0 4px rgba(102, 175, 233, 0.6);
        }

        .floating-label {
          position: relative;
          top: -2.5rem;
          left: 0.75rem;
          color: #888;
          font-size: 0.85rem;
          pointer-events: none;
        }

        .error-message {
          color: #ff4d4f;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          display: block;
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
          margin-bottom: 1rem;
        }

        .gradient-background {
          background: linear-gradient(to right, #0077FF, #084698);
        }

        .user-form-label {
          font-size: 1rem;
          color: #333;
        }
      `}</style>

      <div className="form-wrapper gradient-background">
        <div className="preview-image-wrapper">
          <img
            src={image.preview ? image.preview : bookImagePlaceholder}
            alt="book-preview"
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        </div>

        <Form onSubmit={submitAddBookForm}>
          <Form.Row>
            <Form.Group className="form-input" as={Col}>
              <Form.Label className="user-form-label">Name</Form.Label>
              <Form.Control
                id="bookName"
                type="text"
                value={newBook.bookName}
                placeholder="An Awesome Book!"
                onChange={onBookInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="form-input" as={Col}>
              <Form.Label className="user-form-label">Author</Form.Label>
              <Form.Control
                id="author"
                type="text"
                value={newBook.author}
                placeholder="John Doe"
                onChange={onBookInputChange}
                required
              />
            </Form.Group>
          </Form.Row>

          <Form.Group className="form-input">
            <Form.Label className="user-form-label">Description</Form.Label>
            <Form.Control
              id="bookDes"
              style={{ resize: "none" }}
              as="textarea"
              rows="5"
              value={newBook.bookDes}
              placeholder="This is a book about awesome books!"
              onChange={onBookInputChange}
              required
            />
          </Form.Group>

          <Form.Row>
            <Form.Group className="form-input" as={Col}>
              <Form.Label className="user-form-label">Genre</Form.Label>
              <Form.Control
                id="genre"
                as="select"
                value={newBook.genre}
                onChange={onBookInputChange}
                required
              >
                <option>Choose...</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Thriller</option>
                <option>Business</option>
                <option>Science</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="form-input" as={Col} controlId="book-image">
              <Form.Label className="user-form-label">Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={uploadImage}
                encType="multipart/form-data"
                required
              />
            </Form.Group>
          </Form.Row>

          <div className="submit-form-btn-wrapper">
            <Button className="submit-form-btn" variant="primary" size="lg" type="submit">
              Upload Book
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AddBook);
