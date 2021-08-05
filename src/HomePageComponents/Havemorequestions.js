import React from "react";
import consultProfile from "../Assets/images/Hear.png";
class Havemorequestions extends React.Component {
  render() {
    return (
      <>
        <section className="havemore position-relative">
          <section className="consult-rgt-dts">
            <figure className="consult-img">
              <img src={consultProfile} className="img-fluid" alt=""/>
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
            <h2 className="text-uppercase text-center">Have more questions?</h2>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    What does Clean-Crafted<sup>™</sup>mean?
                  </button>
                </h3>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    The short answer: wines that are grown naturally—without the use of synthetic pesticides—and bottled consciously—without added sugars or non-organic chemicals to modify texture,
                    flavor, color or aroma. The result is wine that is natural, delicious and provides an all-around better wine experience —just like nature intended!
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    How do I purchase? Do I have to go to a tasting?
                  </button>
                </h3>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    The short answer: wines that are grown naturally—without the use of synthetic pesticides—and bottled consciously—without added sugars or non-organic chemicals to modify texture,
                    flavor, color or aroma. The result is wine that is natural, delicious and provides an all-around better wine experience —just like nature intended!
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    What does Clean-Crafted<sup>™</sup>mean?
                  </button>
                </h3>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    The short answer: wines that are grown naturally—without the use of synthetic pesticides—and bottled consciously—without added sugars or non-organic chemicals to modify texture,
                    flavor, color or aroma. The result is wine that is natural, delicious and provides an all-around better wine experience —just like nature intended!
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingFour">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Why should I partner with an Independent Consultant instead of just ordering Scout &amp; Cellar Clean-Crafted Wine online?
                  </button>
                </h3>
                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    The short answer: wines that are grown naturally—without the use of synthetic pesticides—and bottled consciously—without added sugars or non-organic chemicals to modify texture,
                    flavor, color or aroma. The result is wine that is natural, delicious and provides an all-around better wine experience —just like nature intended!
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingFive">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    How can I find a Consultant in my area?
                  </button>
                </h3>
                <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    The short answer: wines that are grown naturally—without the use of synthetic pesticides—and bottled consciously—without added sugars or non-organic chemicals to modify texture,
                    flavor, color or aroma. The result is wine that is natural, delicious and provides an all-around better wine experience —just like nature intended!
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header" id="headingSix">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                    How do I manage my account, change my membership options, and/or update payment information?
                  </button>
                </h3>
                <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    The short answer: wines that are grown naturally—without the use of synthetic pesticides—and bottled consciously—without added sugars or non-organic chemicals to modify texture,
                    flavor, color or aroma. The result is wine that is natural, delicious and provides an all-around better wine experience —just like nature intended!
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </>
    );
  }
}

export default Havemorequestions;
