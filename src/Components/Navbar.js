/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import noteContext from "../context/notes/noteContext";
// import MyNotes from "./MyNotes";

const Navbar = (props) => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  let location = useLocation();
  const myNotes = () => {
    navigate("/Notes");
  };
  return (
    <nav className="navbar sticky-top navbar-expand ">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            backgroundColor: "#32cd32",
            padding: "10px",
            fontFamily: "Skranji",
            fontWeight: "800",
            borderRadius: "10px",
            boxShadow: " 3px 2px 2px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          BestNote
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={` nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={` nav-link ${
                  location.pathname === "/about"
                }? "active": ""`}
                to="/about"
              >
                Why BestNote?
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={` nav-link ${
                  location.pathname === "/contact"
                }? "active": ""`}
                to="/contact"
              >
                Contact us!
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className=" btn btn-primary mx-2" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary " to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <div className="btns">
              <button onClick={myNotes} className=" btn btn-primary">
                My Notes
              </button>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
