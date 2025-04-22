import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import Browse from "./components/layout/Browse";
import AddBook from "./components/book/AddBook";
import Header from "./components/layout/Header";
import BookInfo from "./components/layout/BookInfo";
import EditBook from "./components/book/EditBook";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UserProfile from "./components/user/UserProfile";
import EditProfile from "./components/user/EditProfile";
import PrivateRoute from "./components/private-route/PrivateRoute";
import NotFound404 from "./components/layout/NotFound404";
import Forbidden from "./components/layout/Forbidden";

if (window.localStorage.jwtToken) {
  const token = window.localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }

}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Container>
            <Switch>
              <Route exact path="/" component={Browse}/>
              <PrivateRoute exact path="/books/add" component={AddBook}/>
              <Route exact path="/books/:id" component={BookInfo}/>
              <PrivateRoute exact path="/books/edit/:id" component={EditBook}/>
              <Route exact path="/users/register" component={Register}/>
              <Route exact path="/users/login" component={Login}/>
              <PrivateRoute exact path="/users/profile/edit" component={EditProfile}/>
              <Route exact path="/users/profile/:id" component={UserProfile}/>
              <Route exact path="/forbidden" component={Forbidden} />
              <Route component={NotFound404} />
            </Switch>
        </Container>
    </Router>
  </Provider>
  );
}

export default App;
