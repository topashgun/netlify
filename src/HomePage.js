import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./HomePage.css";
import "./Assets/css/style.scss";
import "./Assets/css/responsive.scss";
import React from "react";
import Header from "./HomePageComponents/Header";
import Home from "./HomePageComponents/Home";
import Footer from "./HomePageComponents/Footer";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <section className="wrapper">
          <Header />
          <Home />
          <Footer />
        </section>
      </>
    );
  }
}

export default HomePage;
