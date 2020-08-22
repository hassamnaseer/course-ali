import React, { useEffect, useState } from "react";
import "./ContactPage.css";
import Header from "../Header/Header";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdbreact";
import axios from "axios";
import Constants from "../../configurations/Constants";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { contact_us_button } from "../../analytics/analytics"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const ContactPage = () => {
  let URL = Constants.BASE_URL;
  const [nameInput, setName] = useState("");
  const [emailInput, setEmail] = useState("");
  const [messageInput, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const classes = useStyles();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleClick = () => {
    if (nameInput !== "" && emailInput !== "" && messageInput !== "" && messageInput.length >= 10) {
      setOpenSuccess(true);
    } else {
      setOpenError(true);
    }
    
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleNameInput = (event) => {
    setName(event.target.value);
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageInput = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      nameInput !== "" &&
      emailInput !== "" &&
      messageInput !== "" &&
      messageInput.length >= 10
    ) {
      const data = {
        name: nameInput,
        email: emailInput,
        message: messageInput,
      };

      axios.post(URL + "/more/enquiry", data).then((res) => {
        setSuccess(res.data.body);
        console.log(res.data.body);
        setName("");
        setEmail("");
        setMessage("");
      });
    }
  };

  return (
    <div>
      <Header />
      <MDBContainer>
        <MDBRow>
          <MDBCol className="form-body" sm="8" md="6" lg="5" xl="5">
            <form onSubmit={handleSubmit}>
              <p className="h3 text-center mb-4">Get In Touch</p>
              <p className="h6 text-center mb-4 form-text">
                We're here for you, and we're wearing our thinking caps. Feel
                free to contact us regarding your queries.
              </p>
              <label htmlFor="defaultFormContactNameEx" className="grey-text">
                Name...
              </label>
              <input
                type="text"
                id="defaultFormContactNameEx"
                className="form-control"
                onChange={handleNameInput}
                value={nameInput}
              />
              <br />
              <label htmlFor="defaultFormContactEmailEx" className="grey-text">
                Email...
              </label>
              <input
                type="email"
                id="defaultFormContactEmailEx"
                className="form-control"
                onChange={handleEmailInput}
                value={emailInput}
              />
              <br />
              <label
                htmlFor="defaultFormContactMessageEx"
                className="grey-text"
              >
                Message... (10 character minimum)
              </label>
              <textarea
                type="text"
                id="defaultFormContactMessageEx"
                className="form-control"
                rows="5"
                onChange={handleMessageInput}
                value={messageInput}
              />
              <div className="text-center mt-4">
                <MDBBtn
                  className="form-btn btn1"
                  onClick={() => {handleClick(); contact_us_button();}}
                  type="submit"
                >
                  Send
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>

        <div className={classes.root}>
          <Snackbar open={openSuccess} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {success}
            </Alert>
          </Snackbar>
          <Snackbar open={openError} autoHideDuration={8000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Please provide valid data in fields
            </Alert>
          </Snackbar>
        </div>
      </MDBContainer>
    </div>
  );
};

export default ContactPage;
