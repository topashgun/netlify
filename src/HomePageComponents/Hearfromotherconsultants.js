import Hear from "../Assets/images/Hear.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
var settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 1500,
  fade: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
class Hearfromotherconsultants extends React.Component {
  render() {
    return (
      <>
        <section className="hearfrom text-center d-xl-none">
          <section className="container p-0">
            <h2 className="text-uppercase">Hear from other Consultants</h2>
            <section className="row d-flex flex-row m-0 justify-content-center align-items-center">
              <Slider {...settings}>
                <section className="hearfrom-slide">
                  <aside className="col-lg-4 col-md-4 col-12 hearfrom-img d-inline-block align-top">
                    <img src={Hear} alt="" className="img-fluid" />
                  </aside>
                  <aside className="col-lg-8 col-md-8 col-12 hearfrom-cont d-inline-block align-top">
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                      consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                      nulla facilisi.
                    </p>
                    <h3>
                      - Courtney Bono
                      <br />
                      <span>Senior Consultant, StarBucks</span>
                    </h3>
                  </aside>
                </section>
                <section className="hearfrom-slide">
                  <aside className="col-lg-4 col-md-4 col-12 hearfrom-img d-inline-block align-top">
                    <img src={Hear} alt="" className="img-fluid" />
                  </aside>
                  <aside className="col-lg-8 col-md-8 col-12 hearfrom-cont d-inline-block align-top">
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                      consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                      nulla facilisi.
                    </p>
                    <h3>
                      - Courtney Bono
                      <br />
                      <span>Senior Consultant, StarBucks</span>
                    </h3>
                  </aside>
                </section>
                <section className="hearfrom-slide">
                  <aside className="col-lg-4 col-md-4 col-12 hearfrom-img d-inline-block align-top">
                    <img src={Hear} alt="" className="img-fluid" />
                  </aside>
                  <aside className="col-lg-8 col-md-8 col-12 hearfrom-cont d-inline-block align-top">
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
                      consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                      nulla facilisi.
                    </p>
                    <h3>
                      - Courtney Bono
                      <br />
                      <span>Senior Consultant, StarBucks</span>
                    </h3>
                  </aside>
                </section>
              </Slider>
            </section>
          </section>
        </section>
      </>
    );
  }
}

export default Hearfromotherconsultants;
