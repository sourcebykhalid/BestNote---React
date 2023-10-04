import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = (props) => {
  const form = useRef();

  const [submitted, setSubmitted] = useState(false);
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
          setSubmitted(true);
          setTimeout(() => {
            setSubmitted(false);
          }, 4000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="container contact ">
      {submitted ? (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{
              fontSize: "1.6rem",
              fontWeight: "800",
              marginLeft: "12px",
            }}
          >
            <div className="alert feedback" role="alert">
              Thanks for your feedback!
            </div>
          </div>
        </div>
      ) : (
        <form ref={form} onSubmit={sendEmail} style={{ zIndex: "0" }}>
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
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
