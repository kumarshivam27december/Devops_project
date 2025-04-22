import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { renderImage, userImagePlaceholder } from "../../helper/image.js";

function EditProfile(props) {
    let history = useHistory();

    const [userInfo, setUserInfo] = useState({
        username: "",
        bio: "",
        imageBuffer: [],
        imageType: ""
    });

    const [image, setImage] = useState({});
    const [somethingChanged, setSomethingChanged] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4000/users/edit/${props.auth.user.id}`).then(res => {
            setUserInfo({
                username: res.data.username,
                bio: res.data.bio,
                imageBuffer: res.data.image.data,
                imageType: res.data.image.contentType
            });
        }).catch(error => {
            console.log(error.response.data);
        });

    }, [props.auth.user.id]);

    const handleChange = (event) => {
        setSomethingChanged(true);
        setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
    }

    const uploadImage = (event) => {
        if (event.target.files.length !== 0) {
            setSomethingChanged(true);
            setImage({
                preview: URL.createObjectURL(event.target.files[0]), // Link for image preview
                file: event.target.files[0] // File to upload to db
            });
        }
    }

    const submitUserProfileForm = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", userInfo.username);
        formData.append("bio", userInfo.bio);
        formData.append("image", image.file);

        axios.put(`http://localhost:4000/users/edit/${props.auth.user.id}`, formData).then(res => {
            console.log(res.data);
            history.push(`${props.auth.user.id}`);
        }).catch(error => {
            console.log(error.response.data);
        });
    }

    return (
        <>
            <style>{`
                .user-profile-form {
                    margin-top: 2rem;
                    background-color: #fff;
                    padding: 2rem;
                    border-radius: 15px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .profile-img-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .profile-image {
                    width: 150px;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 50%;
                    margin-bottom: 1rem;
                }

                .upload-btn-wrapper {
                    text-align: center;
                }

                .upload-btn-wrapper input[type="file"] {
                    display: none;
                }

                .user-profile-body {
                    margin-left: 1rem;
                }

                .user-profile-field h6 {
                    font-size: 1rem;
                    font-weight: bold;
                }

                .user-profile-input {
                    border-radius: 6px;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    width: 100%;
                    font-size: 1rem;
                    background-color: #f9f9f9;
                    color: #333;
                    transition: border-color 0.3s ease;
                }

                .user-profile-input:focus {
                    border-color: #66afe9;
                    outline: none;
                    box-shadow: 0 0 4px rgba(102, 175, 233, 0.6);
                }

                .max-length-tooltip {
                    font-size: 0.8rem;
                    color: #ff4d4f;
                    margin-top: 0.5rem;
                }

                .profile-submit-btn {
                    background-color: #5cdb95;
                    border: none;
                    padding: 0.6rem 1.5rem;
                    font-size: 1rem;
                    color: #fff;
                    border-radius: 6px;
                    transition: background-color 0.3s ease;
                    margin-top: 1.5rem;
                }

                .profile-submit-btn:hover {
                    background-color: #45b97c;
                }
            `}</style>

            <div>
                <Form onSubmit={submitUserProfileForm} className="user-profile-form">
                    <Row>
                        <Col className="profile-img-wrapper" md={4} xs={12}>
                            <Image
                                className="profile-image"
                                roundedCircle
                                src={image.preview ?
                                    image.preview : (userInfo.imageType ? renderImage(userInfo.imageBuffer.data, userInfo.imageType) : userImagePlaceholder)}
                            />
                            <div className="upload-btn-wrapper">
                                <Button variant="link">Upload a photo</Button>
                                <input type="file" accept="image/*" onChange={uploadImage} name="profile-img" title="" />
                            </div>
                        </Col>
                        <Col className="user-profile-body" md={8} xs={12}>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" className="user-profile-field"><h6>Name</h6></Form.Label>
                                <Col sm="10">
                                    <Form.Control id="username" className="user-profile-input" value={userInfo.username} onChange={handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2" className="user-profile-field"><h6>Bio</h6></Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        id="bio"
                                        className="user-profile-input"
                                        as="textarea"
                                        placeholder="About you"
                                        value={userInfo.bio}
                                        maxLength="151"
                                        onChange={handleChange}
                                    />
                                    <div className="max-length-tooltip">{userInfo.bio.length > 150 ? "Cannot exceed 150 characters" : null}</div>
                                </Col>
                            </Form.Group>

                            <Button
                                className="profile-submit-btn"
                                disabled={somethingChanged ? null : "True"}
                                type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(EditProfile);
