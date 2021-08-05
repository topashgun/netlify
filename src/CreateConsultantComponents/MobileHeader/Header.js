import React from "react";
import PropTypes from "prop-types";
import "./Header.css";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import StepConnector from "@material-ui/core/StepConnector";
require("typeface-oswald");

const styles = (theme) => ({
  // step: {
  //   fontColor: "grey",
  //   fill: "#f2efed",


  //   "& $completed": {
  //     color: "#4BA380",
  //     border: "0px solid white",
  //     borderRadius: "0%",
  //   },
  //   "& $active": {
  //     fill: "#DCBA80",
  //     border: "0px solid white",
  //     borderRadius: "0%",
  //   },
  // },

  step: {
    fill: "#f2efed",

    "& $completed": {
      color: "#4BA380",
      border: "0px solid white",
      borderRadius: "0%",
    },
    "& $active": {
      color: "#DCBA80",
      border: "0px solid white",
      borderRadius: "0%",
    },
  },
  step1: {
    "& $completed": {
      fill: "#4BA380",
      border: "0px solid white",
      borderRadius: "0%",
    },
    "& $active": {
      border: "0px solid white",
      borderRadius: "0%",
      fill: "#DCBA80",
    },
  },


  alternativeLabel: {},
  active: {},
  completed: {},
  disabled: {},
});

//style for stepper connector
const GreenStepConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 30px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "black",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#4BA380",
    },
  },
  line: {
    borderColor: "white",
    borderTopWidth: 1,
    borderRadius: 1,
  },
})(StepConnector);

// this header is displayed only on mobile view
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //get current active step from props
      activeStep: props.step,
    };
  }

  // title for each step
  getSteps = () => {
    return [
      "CONFIRM DETAILS",
      "BUSINESS DETAILS",
      "REVIEW TERMS",
      "PURCHASE KIT",
    ];
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <div
          className={
            this.props.agreement ? "mobileHeaderHeight1" : "mobileHeaderHeight"
          }
        >
          {/* arrow icon (back button) */}
          <ArrowBackIosIcon
            className="arrowIcon"
            onClick={this.props.handleBackButton}
          />
          <div className="mobileStepperOveflow">
            {!this.props.agreement ? (
              // stepper
              <Stepper
                connector={<GreenStepConnector />}
                activeStep={activeStep}
                style={{ background: "#E8E0DD" }}
                orientation="horizontal"
                className={
                  activeStep < 1
                    ? "mobileHead"
                    : activeStep === 1
                    ? "bdmobileHead "
                    : "pkmobileHead"
                }
              >
                {steps.map((label, index) => {
                  return (
                    <Step
                      key={label}
                      classes={{
                        root: classes.step1,
                        completed: classes.completed,
                        active: classes.active,
                      }}
                    >
                      <StepLabel
                        StepIconProps={{
                          classes: {
                            root: classes.step,
                            completed: classes.completed,
                            active: classes.active,
                            disabled: classes.disabled,
                          },
                        }}
                      >
                        <div className="head-stepper-font">{label}</div>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            ) : (
              // to be displayed on agreement screen (Mobile view only)
              <div className="AgreementHeader">
                ALMOST THERE - SIGN PAPERWORK
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Header);
