import React from "react";
import { Link } from "react-router-dom";

class Banner extends React.Component {
  render() {
    return (
      <>
        <section className="container p-0">
          <section className="banner-blk">
            <section className="row d-flex flex-row m-0 justify-content-center align-items-center banner-bg">
              <aside className="jumbotron p-0 text-center">
                <h1>
                 Join the 
                  <br /> Scout &amp; Cellar Family
                </h1>
                <p>
                  <Link
                    className="btn btn-primary me-2 get-start"
                    to="/consultant"
                    role="button"
                    title="GET STARTED"
                  >
                    GET STARTED
                  </Link>
                  <a
                    className="btn btn-secondary ms-2"
                    href="/#"
                    role="button"
                    title="LEARN MORE"
                  >
                    LEARN MORE
                  </a>
                </p>
              </aside>
            </section>
            <p className="bdes text-center">
            At Scout &amp; Cellar™ we believe each bottle of Clean-Crafted ™ wine is an experiential lesson in history, geography, and science, rolled into one elevating experience of joy. If you enjoy it, you will have just as much fun sharing a bottle, and the experience, with your friends. Thankfully, marketing wine isn’t just about knowing wine; it's about knowing your friends and choosing to join this community on the journey to discover the unknown good.
            </p>
          </section>
        </section>
      </>
    );
  }
}

export default Banner;
