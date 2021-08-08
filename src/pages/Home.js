import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router";
import Layout from "../components/Layout";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles({
  header: {
    marginBottom: "3vh",
    fontSize: "1rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "30vh",
  },
  button: {
    margin: "3vh auto",
  },
  link: {
    color: "#fff",
  },
});

const Home = ({ value, setValue }) => {
  const classes = useStyles();
  const history = useHistory();

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleClick() {
    history.push("/formularz");
  }

  return (
    <Layout>
      <Container className={classes.container}>
        <FormControl component="fieldset">
          <FormLabel className={classes.header} component="legend">
            Wybierz oddział do którego chcesz wysłać zgłoszenie:
          </FormLabel>
          <RadioGroup
            aria-label="department"
            name="department"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="XYZ"
              control={<Radio color="primary" />}
              label="XYZ Warszawa, Poland"
            />
            <FormControlLabel
              value="ABC"
              control={<Radio color="primary" />}
              label="ABC Kraków, Poland"
            />
            <FormControlLabel
              value="RNQ"
              control={<Radio color="primary" />}
              label="RNQ Berlin, Germany"
            />
          </RadioGroup>
        </FormControl>
        <Button
          onClick={handleClick}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Dalej
        </Button>
      </Container>
    </Layout>
  );
};

export default Home;
