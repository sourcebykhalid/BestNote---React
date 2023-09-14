import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    a.update2();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <p>
        This is about {a.state.name} and his role is {a.state.role}
      </p>
    </div>
  );
};

export default About;
