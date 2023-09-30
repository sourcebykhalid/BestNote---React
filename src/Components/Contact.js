import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = (props) => {
  const form = useRef();

  const submitted = () => {
    props.showAlert("Thanks for your feedback!", "success");
  };
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_iyofnyc",
        "template_fseeha1",
        form.current,
        "RKT8DkGvLNcDNxXro"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="container contact ">
      <form ref={form} onSubmit={sendEmail}>
        <div className="heading">
          <h2>Give us your valuable Feedback!</h2>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input name="name" type="text" className="form-control" id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            name="message"
            id="message"
            style={{ height: "100px" }}
          ></textarea>
          <label htmlFor="message">Message!</label>
        </div>
        <button
          type="submit"
          className="btn "
          style={{
            backgroundColor: "#000",
            color: "#f3f3f3",
            marginTop: "12px",
          }}
          onClick={submitted}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
