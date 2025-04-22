import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, withRouter, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

function Register(props) {
  let history = useHistory();

  const [registerForm, setRegisterForm] = useState({
    emailRegister: "",
    usernameRegister: "",
    passwordRegister: "",
    confirmPasswordRegister: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.error) {
      setErrors(props.error);
    }
    if (props.auth.isAuthenticated) {
      history.push("/")
    }
  }, [props.error, props.auth.isAuthenticated, history]);

  const onRegisterInputChange = (event) => {
    setRegisterForm({ ...registerForm, [event.target.id]: event.target.value });
  };

  const submitRegisterForm = (event) => {
    event.preventDefault();

    const registerFormData = {
      email: registerForm.emailRegister,
      username: registerForm.usernameRegister,
      password: registerForm.passwordRegister,
      password2: registerForm.confirmPasswordRegister,
    };

    props.registerUser(registerFormData, history);
  };

  return (
    <>
      <style>{`
        .user-form-wrapper {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .user-form-input {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 0.75rem;
          color: #333;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .user-form-input:focus {
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

        .form-btn-wrapper {
          text-align: center;
          margin-top: 1.5rem;
        }

        .user-form-btn {
          background-color: #5cdb95;
          border: none;
          padding: 0.6rem 1.5rem;
          font-size: 1rem;
          color: #fff;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        .user-form-btn:hover {
          background-color: #45b97c;
        }

        .small-link {
          color: #1890ff;
          text-decoration: none;
        }

        .small-link:hover {
          text-decoration: underline;
        }

        .gradient-background {
          background: linear-gradient(to right, #0077FF, #084698);
        }

        .gradient-button {
          background: linear-gradient(to right, #0077FF, #084698);
        }
      `}</style>

      <div className="user-form-wrapper gradient-background">
        <Form noValidate onSubmit={submitRegisterForm}>
          <h4><b>Register</b> below!</h4>
          <p>Already have an account? <Link className="small-link" to={"/users/login"}>Login</Link> </p>
          <Form.Group>
            <Form.Control id="emailRegister" className="user-form-input" type="text" placeholder=" " value={registerForm.emailRegister} error={errors.email} onChange={onRegisterInputChange} autoComplete="off"/>
            <span className="floating-label">Email</span>
            <span className="error-message">{errors.email}</span>
          </Form.Group>
          <Form.Group>
            <Form.Control id="usernameRegister" className="user-form-input" type="text" placeholder=" " value={registerForm.usernameRegister} error={errors.username} onChange={onRegisterInputChange} autoComplete="off"/>
            <span className="floating-label">Username</span>
            <span className="error-message">{errors.username}</span>
          </Form.Group>
          <Form.Group>
            <Form.Control id="passwordRegister" className="user-form-input" type="password" placeholder=" " value={registerForm.passwordRegister} error={errors.password} onChange={onRegisterInputChange}/>
            <span className="floating-label">Password</span>
            <span className="error-message">{errors.password}</span>
          </Form.Group>
          <Form.Group>
            <Form.Control id="confirmPasswordRegister" className="user-form-input" type="password" placeholder=" " value={registerForm.confirmPasswordRegister} error={errors.password2} onChange={onRegisterInputChange}/>
            <span className="floating-label">Confirm Password</span>
            <span className="error-message">{errors.password2}</span>
          </Form.Group>
          <div className="form-btn-wrapper">
            <Button className="user-form-btn gradient-button" variant="success" type="submit">Sign up</Button>
          </div>
        </Form>
      </div>
    </>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (registerFormData, history) => dispatch(registerUser(registerFormData, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
