import { useContext } from "react";
import Layout from "../components/Layout";
import Card from "@material-ui/core/Card";
import { CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const useStyles = makeStyles({
  root: {
    minHeight: 200,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  icon: {
    fontSize: "4rem",
    color: "#009688",
    marginBottom: "3vh",
  },
  header: {
    fontWeight: "700",
    marginBottom: "1vh",
  },
  link: {
    fontWeight: "700",
    color: "#009688",

    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const Summary = ({ value }) => {
  const classes = useStyles();
  const { data } = useContext(DataContext);

  console.log(data); // user data

  return (
    <Layout>
      <Card className={classes.root}>
        <CardContent className={classes.wrapper}>
          <CheckCircle className={classes.icon} />
          <Typography className={classes.header} variant="body1" component="h2">
            Twoje zgłoszenie do oddziału {value} zostało wysłane!
          </Typography>
          <Typography variant="body2" component="h2">
            Wróć do wyboru{" "}
            <Link className={classes.link} to="/">
              oddziału.
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Summary;
