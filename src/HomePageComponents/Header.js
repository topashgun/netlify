import React from "react";
import Logo from "../Assets/images/logo.png";
import Back from "../Assets/images/ic-back.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <section className="container p-0">
          <section className="row d-flex flex-row m-0 justify-content-start align-items-md-start align-items-center">
            <aside className="col-lg-1 col-md-1 col-2 p-0 pt-3 back-btn">
              <img src={Back} width="15" alt="BACK" />
            </aside>
            <aside className="col-lg-3 col-md-3 col-10 p-0 sc-logo">
              <img
                src={Logo}
                className="img-fluid"
                alt="Scout&amp;Cellar-WineConsultant"
              />
            </aside>
            <aside className="col-lg-8 col-md-8 col-6 p-0 pt-2 d-md-block">
              <Link
                className="btn btn-primary"
                to="/consultant"
                role="button"
                title="GET STARTED"
              >
                GET STARTED<i className="ic-arrow">&nbsp;</i>
              </Link>
            </aside>
          </section>
        </section>
      </header>
    </>
  );
};

export default Header;
