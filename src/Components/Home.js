import React, { useState, useEffect } from "react";
// import Notes from "./Notes";
import Lottie from "lottie-react";
import animationData from "./Animation.json";
import Notesanimation from "./Animation2.json";
import Typewriter from "typewriter-effect";
// import "./Apps.js";
import { Link } from "react-router-dom";
export const Home = (props) => {
  // const { showAlert } = props;
  const [isLoggedIn, setIsLoggedIn] = useState([]);
  useEffect(() => {
    // Check the login status when the component mounts
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
      console.log("true");
    } else {
      setIsLoggedIn(false);
      console.log("false");
    }
  }, []);

  return (
    <div>
      <div className="home container  ">
        <div className="h1 organise container " style={{ color: "#000000" }}>
          <h1 style={{ textAlign: "center", color: "#000", fontWeight: "800" }}>
            Welcome to BestNote App
          </h1>
          <h1 style={{ textAlign: "center", marginTop: "15px" }}>
            Organize your life, and your work With{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("the Note Making app...")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("BestNote...")
                    .start();
                }}
              />
            </span>
          </h1>
        </div>
        <div className="pg container">
          <p style={{ color: "#525453" }}>
            With your notes, tasks, and schedule all in &emsp;&emsp; &emsp;
            &nbsp; one place, you can remember everything and accomplish any
            project.
          </p>
          {!isLoggedIn && (
            <div className="container condition">
              <Link
                className=" btn btn-primary signup"
                to="/signup"
                role="button"
              >
                Sign up for free
              </Link>
              <p style={{ fontSize: "1.1rem" }}>
                Already have an account?
                <Link to="/login" style={{ color: "rgb(0 168 45)" }}>
                  Log in
                </Link>
              </p>
            </div>
          )}
        </div>

        <div className="images">
          <Lottie
            animationData={Notesanimation}
            style={{ width: "100px", marginLeft: "83px" }}
          />
          <Lottie className="image2" animationData={animationData} />

          <div className="image3">Tasks</div>
          <div className="image4">Schedule</div>
        </div>
      </div>
      <div>
        <Lottie className="lottie" animationData={animationData} />
      </div>
      <div className="footer sticky-bottom ">
        <h4>Copyright @ cc 2023</h4>
      </div>
    </div>
    // <Notes showAlert={showAlert} />
  );
};
