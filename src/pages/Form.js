import { Button, TextField, Typography } from "@material-ui/core";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    marginTop: "3vh",
  },
  input: {
    marginTop: "3vh",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: ".8rem",
    fontWeight: "700",
  },
  departmentName: {
    color: "#009688",
    fontWeight: "700",
  },
  button: {
    margin: "3vh auto",
  },
});

const Form = ({ value }) => {
  const API_ENDPOINT = "https://baconipsum.com/api/?type=all-meat&paras=1";

  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [contentErr, setContentErr] = useState(false);
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [secondsErr, setSecondsErr] = useState(false);
  const { setData } = useContext(DataContext);
  const history = useHistory();
  const timeErr = 2000;
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/gi;

  useEffect(() => {
    async function getData() {
      const res = await fetch(API_ENDPOINT);
      const data = await res.json();

      return data;
    }
    getData().then((data) => setPlaceholder(data));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(new Date().getSeconds());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  function handleValidation() {
    let nameErr = false;
    let emailErr = false;
    let contentErr = false;
    let secErr = false;

    if (name === "") {
      setNameErr(true);
      setTimeout(() => {
        setNameErr(null);
      }, timeErr);
    } else {
      nameErr = true;
    }

    if (!email.match(emailRegex)) {
      setEmailErr(true);
      setTimeout(() => {
        setEmailErr(false);
      }, timeErr);
    } else {
      emailErr = true;
    }

    if (content === "") {
      setContentErr(true);
      setTimeout(() => {
        setContentErr(false);
      }, 2000);
    } else {
      contentErr = true;
    }

    if ((seconds > 10 && seconds < 19) || (seconds > 30 && seconds < 39) ||(seconds > 50 && seconds < 59)) {
      setSecondsErr(true);
      setTimeout(() => {
        setSecondsErr(false);
      }, 2000);
    } else {
      secErr = true;
    }

    return nameErr && emailErr && contentErr && secErr;
  }

  function handleSubmit() {
    if (handleValidation()) {
      const data = {
        name,
        email,
        content,
      };
      
      setData(data);
      history.push("/formularz/podsumowanie");
    }
  }

  return (
    <Layout>
      <Typography variant="h5" component="h2">
        Zgłoszenie do oddziału{" "}
        <span className={classes.departmentName}>{value}</span>
      </Typography>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          id="outlined-basic"
          label="Imię i nazwisko"
          variant="outlined"
          required
          className={classes.input}
        />
        {nameErr ? (
          <span className={classes.error}>Pole nie może być puste</span>
        ) : null}
        <TextField
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
          className={classes.input}
        />
        {emailErr ? (
          <span className={classes.error}>Niepoprawny adres email</span>
        ) : null}

        <TextField
          onChange={(e) => {
            setContent(e.target.value);
          }}
          variant="outlined"
          placeholder={placeholder}
          multiline={true}
          rows="8"
          className={classes.content}
          color="textSecondary"
          maxLength="5000"
          className={classes.input}
        ></TextField>
        {contentErr ? (
          <span className={classes.error}>Pole nie może być puste</span>
        ) : null}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Wyślij
        </Button>
        {secondsErr ? (
          <span className={classes.error}>
            Nie możesz wysłać formularza o tej godzinie.
          </span>
        ) : null}
      </form>
    </Layout>
  );
};

export default Form;
