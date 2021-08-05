import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import { IoCheckmarkCircleSharp, IoAlertCircle } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
} from "../../Assets/PaymentConfirmationSVG";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./PaymentConfirmation.css";

// styles for material ui
const styles = (theme) => ({
  step: {
    fontColor: "black",
    "& $completed": {
      color: "#4BA380",
    },
    "& $active": {
      color: "#4BA380",
    },
  },

  alternativeLabel: {},
  active: {},
  completed: {},
  disabled: {},
});

// custom connector for stepper
const GreenStepConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 30px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#4BA380",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#4BA380",
    },
  },
  line: {
    borderColor: "#EF7070",
    borderTopWidth: 1,
    borderRadius: 1,
  },
})(StepConnector);

// stepper icon (complete and incomplete)
const disabledIcon = (props) => {
  const { completed } = props;

  if (completed) {
    return (
      <IoCheckmarkCircleSharp
        style={{
          color: "#4BA380",
          width: "2em",
          height: "2em",
          marginLeft: "-3px",
        }}
      />
    );
  } else {
    return (
      <IoAlertCircle
        style={{
          color: "#EF7070",
          width: "2em",
          height: "2em",
          marginLeft: "-3px",
        }}
      />
    );
  }
};

class PaymentConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // receive propd for user data
      userData: props.userData,
      // active step for stepper (default value 4 since all steps are complete)
      activeStep: props.confirmation ? 4 : 3,
    };
  }

  //stepper title content
  getSteps = () => {
    return [
      "Confirm Details",
      "Business Details",
      "Verify Identity",
      "Purchase Kit",
      "Documentation",
    ];
  };

  render() {
    //const { userData } = this.state;
    const { classes, userData, confirmation, consultant_number } = this.props;
    const steps = this.getSteps();
    const { activeStep, rippleRef1, rippleRef2, rippleRef3 } = this.state;
    return (
      <React.Fragment>
        <div style={{ background: "#E8E0DD", overflow: "hidden" }}>
          <div
            className={
              window.innerWidth >= 550
                ? "PCcomponentMargin "
                : "PCmobileComponent"
            }
          >
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
              {/* header for mobile view  */}
              {window.innerWidth <= 550 ? (
                <>
                  <ArrowBackIosIcon
                    className="arrowIcon1"
                    onClick={() => {
                      this.props.moveBackToLastScreen(3, "DONE");
                    }}
                  />
                  <span
                    className="signOutStyle"
                    onClick={() => {
                      this.props.moveBackToLastScreen(0, "NEXT");
                    }}
                  >
                    SIGNOUT <Icon4 />
                  </span>
                </>
              ) : null}
              <div className="paymentConfirmationHead">
                HEY, {userData.first_name.toUpperCase()}!
              </div>
              {confirmation ? (
                <>
                  <div className="paymentConfirmationSuccess">
                    Congratulations, welcome to Scout &amp; Cellar!
                  </div>
                  <div className=" mobileHead1">
                    <div className="customURLAssigned">
                      scoutandcellar.com/{userData.url}
                    </div>
                  </div>
                  <div className=" paymentConfirmationHead2">
                    IS NOW RESERVED!
                  </div>

                  <hr
                    style={{
                      background: "white",
                      color: "white",
                      width: "60%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />

                  <div className="pcHead3">Consultant Number</div>

                  <div className="pcConsultantNumber"> {consultant_number}</div>
                </>
              ) : (
                <>
                  <div className="paymentConfirmationFaliure">
                    ENROLMENT FAILURE!
                  </div>
                  <h6 className="payment-confirmation-error-message">
                    {this.props.consultant_error}
                  </h6>
                </>
              )}
            </div>
          </div>
          {!confirmation ? (
            <>
              <div
                className="retryPaymentButton"
                onClick={() => {
                  this.props.moveBackToLastScreen(3, "DONE");
                }}
              >
                RETRY PAYMENT
              </div>
            </>
          ) : null}
        </div>
        <div className="pcHead4">
          COMPLETE ALL THE STEPS TO FINISH YOUR ENROLLMENT
        </div>
        <div className=" stepperMdMarginLeft">
          {/* Stepper */}
          <Stepper
            connector={<GreenStepConnector />}
            activeStep={activeStep}
            style={{
              background: "transparent",
              width: "70vw",
              marginTop: "1em",
              marginBottom: "1em",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            orientation={window.innerWidth <= 768 ? "vertical" : "horizontal"}
          >
            {steps.map((label, index) => {
              return (
                <Step
                  key={label}
                  classes={{
                    root: classes.step,
                    completed: classes.completed,
                    active: classes.active,
                  }}
                >
                  <StepLabel StepIconComponent={disabledIcon}>
                    {label !== "Documentation" ? (
                      !confirmation && label === "Purchase Kit" ? (
                        <div className="fontOswald2">{label}</div>
                      ) : (
                        <div className="fontOswald1">{label}</div>
                      )
                    ) : (
                      <div className="fontOswald2">{label}</div>
                    )}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        {/* Footer  */}
        {confirmation ? (
          <div className="pcFooter">
            <div className="pcFooterHead">LET'S GET GOING</div>
            <div className="row pcFooterLeftMargin">
              {/* card 1 */}
              <div
                className="col-lg-3  pcFooterCard"
                onMouseDown={this.onRippleStart1}
                onMouseUp={this.onRippleStop1}
              >
                <TouchRipple ref={rippleRef1} center={false} />
                <div className="row">
                  <div className="pcFooterMainIcon">
                    <Icon1 />
                  </div>
                  <div className="pcFooterText">
                    Access your consultant Account
                  </div>
                  <IoIosArrowForward className="pcFooterNextIcon" />
                </div>
              </div>

              {/* card 2 */}
              <div
                className="col-lg-3 pcFooterCard"
                onMouseDown={this.onRippleStart2}
                onMouseUp={this.onRippleStop2}
              >
                <TouchRipple ref={rippleRef2} center={false} />
                <div className="row">
                  <div className="pcFooterMainIcon2">
                    <Icon2 />
                  </div>
                  <div className="pcFooterText1">
                    Download Vine App for Consultant
                  </div>
                  <IoIosArrowForward className="pcFooterNextIcon" />
                </div>
              </div>

              {/* card 3 */}
              <div
                className="col-lg-3 pcCardMarginLeft pcFooterCard"
                onMouseDown={this.onRippleStart3}
                onMouseUp={this.onRippleStop3}
              >
                <TouchRipple ref={rippleRef3} center={false} />
                <div className="row">
                  <div className="pcFooterMainIcon">
                    <Icon3 />
                  </div>
                  <div className="pcFooterText2">Get Started Videos</div>
                  <IoIosArrowForward className="pcFooterNextIcon" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

//  styles and prop type for material ui
PaymentConfirmation.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(PaymentConfirmation);
