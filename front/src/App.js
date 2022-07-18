import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

import classes from "./App.module.css"
//import factory from "./contactsData/ethereum/factory";



function App() {

  return (
    <div className={classes.app }>
      
    <React.Fragment>
      <Header />
      <Body />
      <Footer />
    </React.Fragment>
     </div>
  );
}

export default App;
