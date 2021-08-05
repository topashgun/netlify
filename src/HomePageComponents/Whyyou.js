import React from "react";
import Whyyou1 from "../Assets/images/whyyou1.png";
import Whyyou2 from "../Assets/images/whyyou2.png";
import Whyyou3 from "../Assets/images/whyyou3.png";
import consultProfile from "../Assets/images/Hear.png";

class Whyyou extends React.Component {
  render() {
    return (
      <>
        <section className="whyyou-blk text-center">
          <section className="consult-rgt-dts">
            <figure className="consult-img">
              <img src={consultProfile} className="img-fluid" alt="consult-profile" />
              <p>
                <sup className="topqt">‘</sup>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
                enim ad minim veniam, quis nostrud exerci tation ullam corper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                <sup className="btmqt">’</sup>
              </p>
              <h5>
                Courtney Bono<span>Senior Consultant, StarBucks</span>
              </h5>
            </figure>
          </section>
          <section className="container p-0">
            <h2 className="text-uppercase">Why you?</h2>
            <section className="row d-flex flex-row m-0 justify-content-center align-items-center">
              <aside className="col-lg-8 col-md-10 col-12 p-0 whyyou-list">
                <aside className="col-lg-4 col-md-4 col-12 p-0 align-items-center">
                  <figure className="whyimg1">
                    <aside className="whyimg">
                      <img src={Whyyou1} alt="You love wine!" className="img-fluid" />
                    </aside>
                    <figcaption>You love wine!</figcaption>
                  </figure>
                </aside>
                <aside className="col-lg-4 col-md-4 col-12 p-0">
                  <figure className="whyimg2">
                    <aside className="whyimg">
                      <img src={Whyyou2} alt="You and your friends already buy wine!" className="img-fluid" />
                    </aside>
                    <figcaption>You and your friends already buy wine!</figcaption>
                  </figure>
                </aside>
                <aside className="col-lg-4 col-md-4 col-12 p-0">
                  <figure className="whyimg3">
                    <aside className="whyimg">
                      <img
                        src={Whyyou3}
                        alt="Grow your network, and your net worth, doing something you
                      love!"
                        className="img-fluid"
                      />
                    </aside>
                    <figcaption>Grow your network, and your net worth, doing something you love!</figcaption>
                  </figure>
                </aside>
              </aside>
            </section>
          </section>
        </section>
      </>
    );
  }
}

export default Whyyou;
