import Notes from "./Notes";
import { Link } from "react-router-dom";
export const Home = (props) => {
  const { showAlert, isLoggedIn } = props;

  return (
    <div>
      <div className="home">
        <div className="h1 container">
          <h1>Organize your life and your work.</h1>
        </div>

        <div className="pg container">
          <p>
            With your notes, tasks, and schedule all in one place, you can
            remember everything and accomplish any project.
          </p>
        </div>
        {!isLoggedIn && (
          <div className="container flex">
            <Link
              className=" btn btn-primary signup"
              to="/signup"
              role="button"
            >
              Sign up for free
            </Link>

            <p style={{ fontSize: "1.1rem" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "rgb(0 168 45)", textDecoration: "none" }}
              >
                Log in
              </Link>
            </p>
          </div>
        )}
      </div>
      <Notes showAlert={showAlert} />
    </div>
  );
};
