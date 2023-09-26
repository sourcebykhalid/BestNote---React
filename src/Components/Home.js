import { useState } from "react";
import Notes from "./Notes";
import { Link } from "react-router-dom";
export const Home = (props) => {
  const { showAlert } = props;
  const [isLoggedIn] = useState(false);
  return (
    <div>
      <div className="home">
        <div className="h1 organise container">
          <h1>Organize your life, and your work with BestNote...</h1>
        </div>

        <div className="pg container">
          <p style={{ color: "#525453" }}>
            With your notes, tasks, and schedule all in &emsp;&emsp; &emsp;
            &emsp; &nbsp; place, you can remember everything and accomplish any
            project.
          </p>
        </div>
        {isLoggedIn ? (
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
        ) : null}

        <div className="images">
          <div className="image1">ONE</div>
          <div className="image2">Notes</div>
          <div className="image3">Tasks</div>
          <div className="image4">Schedule</div>
        </div>
      </div>
      <Notes showAlert={showAlert} />
    </div>
  );
};
