import React from "react";
import Community from "../Assets/images/ic-community.svg";
import Personal from "../Assets/images/ic-personal.svg";
import Portal from "../Assets/images/ic-portal.svg";
import Videos from "../Assets/images/ic-videos.svg";
import { Amp } from "../Assets/SandCAmp";

class Partnersinsuccess extends React.Component {
  render() {
    return (
      <>
        <section className="partners text-center">
          <section className="container p-0">
            <h2 className="text-uppercase">Partners in Success</h2>
            <p className="text-center">
              “We are committed to helping you succeed in your business, and we
              offer a variety of tools to help you do just that.”
            </p>
            <section className="row d-flex flex-row m-0 justify-content-center align-items-start position-relative">
              <section className="youus d-flex justify-content-center align-items-center">
                <Amp className="amp-fill" />
              </section>
              <aside className="col-lg-6 col-md-6 col-12 gray-box p-0">
                <h3>The Scout &amp; Cellar Community</h3>
                <p>
                  The Scout &amp; Cellar Consultant Community is always here to
                  help you with your business. We offer a set of resources to
                  help you connect with the Scout &amp; Cellar community. Never
                  hesitate to reach out to your mentor, or our Support team when
                  problems or questions arise. We are always here to support and
                  cheer you on!
                </p>
                <span className="ic-gray-box">
                  <img src={Community} alt="" className="img-fluid" />
                </span>
              </aside>
              <aside className="col-lg-6 col-md-6 col-12 gray-box p-0">
                <h3>Your Personal Website</h3>
                <p>
                  When you sign up to be a Scout &amp; Cellar Consultant you
                  receive access to your own Personal Website which can be used
                  in all of your marketing efforts. The Personal Website acts as
                  a digital storefront for your business where your
                  Clean-Crafted™ wine orders will be collected.
                
                </p>
                <span className="ic-gray-box">
                  <img src={Personal} alt="" className="img-fluid" />
                </span>
              </aside>
              <aside className="col-lg-6 col-md-6 col-12 gray-box p-0">
                <h3>Business Tools</h3>
                <p>
                  We provide all of the tools you need to build your business
                  successfully. The Cellar is your Consultant Portal where you
                  can access everything you need for your business. Use The
                  Cellar to track your orders, Customers, earnings and more. We
                  also offer a business building mobile app called The Vine to
                  help you connect with your Customers and market Clean-Crafted™
                  wine to them, all from the palm of your hand.
                </p>
                <span className="ic-gray-box position-bottom">
                  <img src={Portal} alt="" className="img-fluid" />
                </span>
              </aside>
              <aside className="col-lg-6 col-md-6 col-12 gray-box p-0">
                <h3>Education</h3>
                <p>
                  We are constantly providing educational opportunities for you
                  to learn and grow. From weekly webinars to monthly tastings,
                  there is never a shortage of opportunities to learn. We also
                  provide education videos in The Cellar for you to access
                  whenever you would like!
                  
                </p>
                <span className="ic-gray-box position-bottom">
                  <img src={Videos} alt="" className="img-fluid" />
                </span>
              </aside>
            </section>
            <a
              className="btn btn-primary"
              href="/#"
              role="button"
              title="LET'S BEGIN"
            >
              Let’s Begin
            </a>
          </section>
        </section>
      </>
    );
  }
}

export default Partnersinsuccess;
