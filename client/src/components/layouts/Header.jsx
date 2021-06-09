import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";
import "../../assets/header-styles/header.css";
import axios from "axios";
let user =''
class Header extends Component {
  constructor() {
    super();
    this.state = {
      deleteAccount: false,
    };
  }
componentDidMount(){
  let token = localStorage.getItem("auth-token");
  if (token !== null && token!=="" ) {
   if(localStorage.getItem("auth-token")=="admin")
{
      //logged in
      axios.get("/api/admin", {
        headers: { "x-auth-token": token },
      })
    
     .then(res =>   user =  res.data.user)
}
else {
        //logged in
        axios.get("/api/users", {
          headers: { "x-auth-token": token },
        })
       .then(res =>   user =  res.data.user)
      }
  }
}
  OnLogout = (dispatch) => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("userId");
    console.log("Logged out!");

    dispatch({
      type: "LOGGED_OUT",
    });
  };

  getInfo = (todos) => {
    let completed = 0;
    todos.forEach((todoItem) => {
      if (todoItem.finished) completed++;
    });
    return completed;
  };

  render() {
    const { branding } = this.props;

    return (
      <Consumer>
        {(value) => {
          let { dispatch, token, todos } = value;

          if (token === undefined) token = "";
          if (user === undefined) user = "";
          if (todos === undefined) todos = [];

          // getting token from localstorage for removing delay
          const localToken = localStorage.getItem("auth-token");

          return (
            <>
              <nav className="myNavBar navbar sticky-top navbar-expand-lg navbar-light">
                <Link to="/" className="navbar-brand text-light block mx-4">
                  <span
                    style={{
                      fontStyle: "italic",
                      display: "block",
                    }}
                  >
                    {branding}
                  </span>
                </Link>

                <button
                  className="hamIcon navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavAltMarkup"
                  style={{
                    position: "fixed",
                    right: "10px",
                    top: "10px",
                  }}
                >
                  <i className="fa fa-bars"></i>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarNavAltMarkup"
                >
                  <div className="navbar-nav">
                    {/* about  */}
                    <li className="nav-item ">
                      <Link
                        to="/about"
                        className="nav-link text-light "
                        style={{ cursor: "pointer", fontSize: 16 }}
                      >
                        About
                      </Link>
                    </li>
                    {/* logout */}
                    {localToken ? (
                      <>
                        <li className="nav-item ">
                          <span
                            onClick={this.OnLogout.bind(this, dispatch)}
                            className="nav-link text-light mb-2"
                            style={{ cursor: "pointer", fontSize: 16 }}
                          >
                            Logout
                          </span>
                        </li>
                        {user && user.role !== "admin" ? (
                          <li className="nav-item ">
                            <Link
                              to="/profile"
                              className="nav-link text-light "
                              style={{ cursor: "pointer", fontSize: 16 }}
                            >
                              {user!= null && user.name}
                            </Link>
                          </li>
                        ) : (
                          <li className="nav-item ">
                            <div
                              className="nav-link text-light "
                              style={{ fontSize: 16 }}
                            >
                              {user!= null && user.name}
                            </div>
                          </li>
                        )}
                      </>
                    ) : (
                      // signup or sign in
                      <>
                        <li className="nav-item ">
                          <Link
                            to="/signup"
                            className="nav-link text-light "
                            style={{ cursor: "pointer", fontSize: 16 }}
                          >
                            SignUp
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            to="/login"
                            className="nav-link text-light "
                            style={{ cursor: "pointer", fontSize: 16 }}
                          >
                            Login
                          </Link>
                        </li>
                      </>
                    )}
                    <li>
                      <Link
                        to="/contactUs"
                        className="nav-link text-light "
                        style={{ cursor: "pointer", fontSize: 16 }}
                      >
                        Contact Us
                      </Link>
                    </li>
                  </div>
                </div>
              </nav>
            </>
          );
        }}
      </Consumer>
    );
  }
}

export default Header;
