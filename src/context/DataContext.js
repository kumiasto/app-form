import React, { useState, createContext } from "react";

export const DataContext = createContext();

const DataContextProvider = (props) => {
  const [data, setData] = useState();

  return (
    <DataContext.Provider value={{ data, setData }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
