import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Alex",
    role: "Data Scientist",
  };

  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "Mike",
        role: "Developer",
      });
    }, 2000);
  };
  const update2 = () => {
    setTimeout(() => {
      setState({
        name: "Jack",
        role: "Business Analyst",
      });
    }, 3000);
  };

  return (
    <NoteContext.Provider value={{ state, update, update2 }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
