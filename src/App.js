import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Policy from "./pages/Policy";
import Summary from "./pages/Summary";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { pink, teal } from "@material-ui/core/colors";
import DataContextProvider from "./context/DataContext";

const App = () => {
  const [value, setValue] = useState("XYZ");

  const theme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: pink,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <DataContextProvider>
          <Route
            path="/"
            exact
            render={(props) => (
              <Home {...props} value={value} setValue={setValue} />
            )}
          />
          <Route
            path="/formularz"
            exact
            render={(props) => <Form {...props} value={value} />}
          />
          <Route
            path="/formularz/podsumowanie"
            render={(props) => <Summary {...props} value={value} />}
          />
          <Route exact path="/polityka-prywatnosci" component={Policy} />
        </DataContextProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
