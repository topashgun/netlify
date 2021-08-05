import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import "./Home.css";
import ConfirmDetails from "../ConfirmDetails/ConfirmDetails";
import BusinessDetails from "../BusinessDetails/BusinessDetails";
import Footer from "../Footer/Footer";
import VerifyIdentity from "../VerifyIdentity/VerifyIdentity";
import PurchaseKit from "../PurchaseKit/PurchaseKit";
import PaymentConfirmation from "../PaymentConfirmation/PaymentConfirmation";
import StepConnector from "@material-ui/core/StepConnector";
import { Logo } from "../../Assets/HeaderSVG";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import * as API from "../../configuration/apiconfig";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { algoliaURL } from "../../configuration/config";
import moment from "moment";
require("typeface-oswald");
require("typeface-domine");

//style for stepper
const styles = (theme) => ({
  step: {
    fill: "#f2efed",
    border: "1px solid black",
    borderRadius: "50%",

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

  step2: {
    "& $active": {
      fill: "#241F20 !important",
      border: "0px solid #241F20",
      borderRadius: "0%",
    },
  },

  step3: {
    fill: "#f2efed",
    border: "2px solid white",
    borderRadius: "50%",
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
    borderColor: "black",
    borderTopWidth: 1,
    borderRadius: 1,
  },
})(StepConnector);

//mobile stepper connector
const MobileStepConnector = withStyles({
  active: {
    "& $line": {
      borderColor: "black",
    },
  },
  line: {
    borderColor: "white",
    borderTopWidth: 1,
    borderRadius: 2,
  },
})(StepConnector);

class Home extends React.Component {
  constructor() {
    super();
    //background color
    document.body.style = "background: #F7F3F2";
    this.state = {
      //active step for stepper and to display appropriate screen
      activeStep: 0,
      //label for footer right side button
      rightFooterButtonName: "NEXT",
      // footer right side button (disable/enable)
      rightFooterButtonDisabled: true,
      //get userdata by making axios call
      userData: {
        accessToken: "",
        refreshToken: "",
        id: "",
        email: "",
        phonenumber: "",
        address: "",
        working_with: {
          id: 1,
          name: "",
        },
        url: "",
        ssn: "",
        doing_business: "Individual",
        isemail_verified: false,
        first_name: "",
        last_name: "",
        customer: false,
        consultant: false,
        dateofbirth: "",
        screen: 0,
        street: "",
        zipcode: "",
        city: "",
        state: "",
        indepedent_agreement: false,
        policy_procedures: false,
        cart_id: "",
        dob: {
          year: 1970,
          month: 0,
          day: 1,
        },
      },
      // userData Error
      errorUserData: {
        email: "",
        ssn: "",
        password: "",
      },
      //to check if url is available
      checkURLAvailability: false,
      //current agreement displayed
      currentAgreement: false,
      //purchase kit details
      purchaseKitDetails: {
        subtotal: 0,
        shipping: 0,
        salestax: 0,
        discount: 0,
        total: 0,
      },
      //purchase kit card info
      cardinfo: {
        cardnumber: "",
        expiryMonth: "",
        expiryYear: "",
        expiryFullYear: "",
        cvv: "",
        nameoncard: "",
      },
      //address change
      addresschange: false,
      //billing address
      billingAddress: {
        city: "",
        zipcode: 0,
        state: "",
        country: "",
        street: "",
      },

      // state variable to (enable/disable) footer
      displayFooter: true,
      //display loader
      load: false,
      //display forgot password
      displayForgotPassword: false,
      //confirmation screen
      confirmation: false,
      //alogoliya hits
      working_with_arr: [],
      //consultant_id
      consultant_number: 0,
      //consulatnt payment error
      consultant_error: "",
    };
  }
  handleKeypress = (e) => {
    if (e.key === "Enter") {
      this.handleClickRight();
    }
  };
  // to handle right footer button changes
  handleClickRight = async () => {
    let userData = this.state.userData;
    if (!this.state.rightFooterButtonDisabled) {
      if (this.state.rightFooterButtonName === "NEXT") {
        //call API to verify email (API CALL IN Home)
        this.apiVerifyEmail();
      } else if (this.state.rightFooterButtonName === "CONTINUE ") {
        // api call forgot password
        this.apiForgotPassword();
      } else if (this.state.rightFooterButtonName === "LOG IN") {
        //call API to Login (API CALL IN Home)
        this.apiLogin();
      } else if (this.state.rightFooterButtonName === "LOOKS GOOD") {
        // call API to Update screen id and move to next screen
        let data = {
          id: this.state.userData.id,
          screen: 1,
        };
        this.apiUpdateScreen(data, "PROCEED");
      } else if (this.state.rightFooterButtonName === "SAVE AND PROCEED") {
        //call API to update data (API CALL IN Home)
        this.apiUpdateUserData();
      } else if (this.state.rightFooterButtonName === "PROCEED") {
        // call API to Update screen id and move to next screen
        let data = {
          id: this.state.userData.id,
          screen: 2,
          ssn: this.state.userData.ssn,
          url: this.state.userData.url,
          doing_business: this.state.userData.doing_business,
        };
        this.apiUpdateScreen(data, "");
      } else if (this.state.rightFooterButtonName === "CONTINUE") {
        // call API to Update screen id ,agreement accepted and move to next screen
        let data = {
          id: this.state.userData.id,
          screen: 3,
          indepedent_agreement: true,
          policy_procedures: true,
        };
        this.apiUpdateScreen(data, "DONE");
        userData["indepedent_agreement"] = true;
        userData["policy_procedures"] = true;
        this.setUserData(userData);
        this.setrightFooterButtonDisabled(true);
      } else if (this.state.rightFooterButtonName === "DONE") {
        this.apiCreateConsultant();
      }
    }
  };

  //*********************************************************** API Calls Starts Here*********************************************************/

  // API to Verify Email (landing page)
  apiVerifyEmail = async () => {
    this.setState({ load: true, rightFooterButtonDisabled: true });
    let userData = this.state.userData;
    let errorUserData = this.state.errorUserData;
    let data = { email: userData["email"] };
    await API.callEndpoint("POST", "Basic", "/api/v1/users/verifyEmail", data)
      .then((response) => {
        try {
          if (response.data.is_emailValid) {
            errorUserData["email"] = "";
            this.setState({
              load: false,
              rightFooterButtonName: "LOG IN",
              rightFooterButtonDisabled: true,
              errorUserData: errorUserData,
            });
          }
        } catch (e) {
          console.log("Error in /verifyEmail1");
          console.log(e);
          errorUserData["email"] = "Invalid Email";
          this.setState({
            load: false,
            errorUserData: errorUserData,
          });
        }
      })
      .catch((error) => {
        console.log("Error in /verifyEmail2");
        console.log(error);
        if (
          error.error ===
          "This email address is in use for an existing Consultant Account."
        ) {
          error.error =
            "This email address is already in use for an existing Consultant Account. Please login into https:// team.scoutandcellar.com/ Account/Login";
        }
        errorUserData["email"] = error.error;
        this.setState({
          load: false,
          errorUserData: errorUserData,
        });
      });
  };

  // API to Login
  apiLogin = async () => {
    this.setState({ load: true, rightFooterButtonDisabled: true });
    let userData = this.state.userData;
    let errorUserData = this.state.errorUserData;
    let activeStep = this.state.activeStep;

    await API.getAccessToken(userData.email, userData.password, false)
      .then((response) => {
        try {
          userData = response.data;
          //update date in required format
          let Date = moment(userData["dateofbirth"], "YYYY/MM/DD");
          userData["dob"] = {
            day: Date.date(),
            month: 1 + Date.month(),
            year: Date.year(),
          };
          //update address to required format
          userData["address"] = {
            street: userData["street"],
            zipcode: userData["zipcode"],
            city: userData["city"],
            state: userData["state"],
          };
          let buttonName = "";
          let buttonDisable = false;
          if (userData.first_name === "") {
            buttonName = "SAVE AND PROCEED";
            buttonDisable = true;
          } else {
            buttonName = "LOOKS GOOD";
            buttonDisable = false;
          }
          activeStep = userData.screen;
          if (activeStep === 1) {
            buttonDisable = true;
            buttonName = "PROCEED";
          } else if (activeStep === 2) {
            buttonDisable = true;
            buttonName = "CONTINUE";
          } else if (activeStep === 3) {
            buttonDisable = true;
            buttonName = "DONE";
          } else if (activeStep === 4) {
            buttonDisable = false;
          }
          if (userData.doing_business === "") {
            userData["doing_business"] = "Individual";
          }
          //update state with user data
          this.setState({
            load: false,
            rightFooterButtonName: buttonName,
            rightFooterButtonDisabled: buttonDisable,
            userData,
            activeStep,
          });
        } catch (e) {
          console.log("Error in /Login1");
          console.log(e);
          //update state with user data
          this.setState({
            load: false,
          });
        }
      })
      .catch((error) => {
        console.log("Error in /Login2");
        console.log(error);
        errorUserData["password"] = error.error;
        //update state with user data
        this.setState({
          load: false,
          errorUserData,
        });
      });
  };

  // API to update user data
  apiUpdateUserData = async () => {
    this.setState({ load: true, rightFooterButtonDisabled: true });
    let data = {};
    let userData = this.state.userData;

    //user details
    data["id"] = userData["id"];
    data["first_name"] = userData["first_name"];
    data["last_name"] = userData["last_name"];
    data["working_with"] = userData["working_with"];
    data["phonenumber"] = userData["phonenumber"];

    //Change Address to required format
    data["street"] = userData["address"]["street"];
    data["zipcode"] = userData["address"]["zipcode"];
    data["city"] = userData["address"]["city"];
    data["state"] = userData["address"]["state"];
    data["country"] = "US";

    //Change date to required format
    data["dateofbirth"] = moment()
      .year(userData["dob"]["year"])
      .month(userData["dob"]["month"] - 1)
      .date(userData["dob"]["day"])
      .format("YYYY-MM-DD");

    // phone number remove hypen
    data["phonenumber"] = userData["phonenumber"]
      .split("")
      .filter((item) => item !== "-")
      .join("");

    await API.callEndpoint("PATCH", "Bearer", "/api/v1/users/update", data)
      .then((response) => {
        try {
          userData = response.data;
          //update date in required format
          let Date = moment(userData["dateofbirth"], "YYYY/MM/DD");
          userData["dob"] = {
            day: Date.date(),
            month: 1 + Date.month(),
            year: Date.year(),
          };

          //update address to required format
          userData["address"] = {
            street: userData["street"],
            zipcode: userData["zipcode"],
            city: userData["city"],
            state: userData["state"],
          };

          this.setState({
            load: false,
            rightFooterButtonName: "LOOKS GOOD",
            rightFooterButtonDisabled: false,
            userData,
          });
        } catch (e) {
          console.log("Error in /Update");
          console.log(e);
          this.setState({
            load: false,
          });
        }
      })
      .catch((error) => {
        console.log("Error in /update");
        console.log(error);
        this.setState({
          load: false,
        });
      });
  };

  // Api to update which screen the user has completed ,
  //screen represented by screen id + data collected in that screen
  apiUpdateScreen = async (data, buttonName) => {
    this.setState({ load: true, rightFooterButtonDisabled: true });
    let errorUserData = this.state.errorUserData;
    let rightFooterButtonDisabled = true;
    await API.callEndpoint("PATCH", "Bearer", "/api/v1/users/update", data)
      .then(async (response) => {
        errorUserData["ssn"] = "";
        if (this.state.rightFooterButtonName === "LOOKS GOOD") {
          await this.apiGetCartId();
        } else if (this.state.rightFooterButtonName === "CONTINUE") {
          await this.apiCartDetails();
        }
        this.setState({
          load: false,
          rightFooterButtonName: buttonName,
          rightFooterButtonDisabled: rightFooterButtonDisabled,
          activeStep: data.screen,
          errorUserData,
        });
      })
      .catch((error) => {
        console.log("Error in /update");
        console.log(error);
        if (error.error === "Please enter valid ssn") {
          errorUserData["ssn"] = "Invalid SSN";
        }
        this.setState({
          load: false,
        });
      });
  };

  // API to verify URL
  apiVerifyURL = async (customURL) => {
    let data = {
      url: customURL,
    };
    return await API.callEndpoint(
      "POST",
      "Bearer",
      "/api/v1/users/verifyUrl",
      data
    )
      .then((response) => {
        try {
          if (response.data.validText) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.log("Error in /VerifyURL1");
          return false;
        }
      })
      .catch((error) => {
        console.log("Error in /VerifyURL2");
        return false;
      });
  };

  //API to get cart id
  apiGetCartId = async () => {
    this.setState({ load: true });
    let userData = this.state.userData;

    await API.callEndpoint("POST", "Bearer", "/api/v1/users/createCart")
      .then((response) => {
        try {
          userData["cart_id"] = response.data.cartId;
          this.setState({
            load: false,
            userData,
          });
        } catch (e) {
          console.log("Error in /CreateCart");
          console.log(e);
          this.setState({
            load: false,
          });
        }
      })
      .catch((error) => {
        console.log("Error in /CreateCart");
        console.log(error);
        this.setState({
          load: false,
        });
      });
  };

  //API get card details
  apiCartDetails = async () => {
    this.setState({ load: true });
    let cartId = this.state.userData.cart_id;
    this.setState({ load: true });
    let purchaseKitDetails = this.state.purchaseKitDetails;
    let data = {
      id: this.state.userData.id,
      ssn: this.state.userData.ssn,
    };
    await API.callEndpoint(
      "GET",
      "Bearer",
      "/api/v1/users/viewCart?cartid=" + cartId,
      data
    )
      .then((response) => {
        try {
          purchaseKitDetails["subtotal"] = response.data.OrderLines[0].Subtotal;
          purchaseKitDetails["shipping"] =
            response.data.OrderLines[0].ShippingTax;
          purchaseKitDetails["salestax"] = response.data.OrderLines[0].ItemTax;
          purchaseKitDetails["discount"] =
            response.data.OrderLines[0].Discounts;
          purchaseKitDetails["total"] = response.data.OrderLines[0].LineTotal;

          this.setState({
            load: false,
            cartId,
            purchaseKitDetails,
          });
        } catch (e) {
          console.log("Error in /get cart details");
          console.log(e);
          this.setState({
            load: false,
            activeStep: 2,
            rightFooterButtonName: "CONTINUE",
            rightFooterButtonDisabled: false,
          });
        }
      })
      .catch((error) => {
        console.log("Error in /get cart details");
        console.log(error);
        this.setState({
          load: false,
          activeStep: 2,
          rightFooterButtonName: "CONTINUE",
          rightFooterButtonDisabled: false,
        });
      });
  };

  // api to create a consultant
  apiCreateConsultant = async () => {
    this.setState({ load: true, rightFooterButtonDisabled: true });
    let address = this.state.billingAddress;
    let userData = this.state.userData;
    if (this.state.addresschange) {
      address["city"] = userData.address.city;
      address["zipcode"] = userData.address.zipcode;
      address["state"] = userData.address.state;
      address["country"] = "US";
      address["street"] = userData.address.street;
    }
    let data = {
      addresschange: this.state.addresschange,
      address,
      cardinfo: this.state.cardinfo,
    };

    await API.callEndpoint(
      "POST",
      "Bearer",
      "/api/v1/users/createConsultant",
      data
    )
      .then((response) => {
        try {
          let consultant_number = 0;
          if (response.data.consultant_number !== null) {
            consultant_number = response.data.consultant_number;
          }
          this.setState({
            load: false,
            activeStep: 4,
            displayFooter: false,
            confirmation: true,
            consultant_number,
          });
        } catch (e) {
          console.log("Error in /createConsultant");
          console.log(e);
          this.setState({
            load: false,
            activeStep: 4,
            displayFooter: false,
            confirmation: false,
            consultant_error: e.error,
          });
        }
      })
      .catch((error) => {
        console.log("Error in /createConsultant");
        console.log(error);
        this.setState({
          load: false,
          activeStep: 4,
          displayFooter: false,
          confirmation: false,
          consultant_error: error.error,
        });
      });
  };

  //api for forgot password
  apiForgotPassword = async () => {
    this.setState({ load: true });
    let errorUserData = this.state.errorUserData;
    let data = {
      email: this.state.userData.email,
    };
    await API.callEndpoint(
      "POST",
      "Basic",
      "/api/v1/users/forgotpassword",
      data
    )
      .then((response) => {
        try {
          this.setState({
            load: false,
            rightFooterButtonName: "LOG IN",
            rightFooterButtonDisabled: true,
            displayForgotPassword: false,
          });
        } catch (e) {
          console.log("Error in /forgotpassword");
          console.log(e);
          errorUserData["password"] = e.error;
          this.setState({
            load: false,
            rightFooterButtonName: "LOG IN",
            rightFooterButtonDisabled: true,
            displayForgotPassword: false,
            errorUserData,
          });
        }
      })
      .catch((error) => {
        console.log("Error in /forgotpassword");
        console.log(error);
        errorUserData["password"] = error.error;
        this.setState({
          load: false,
          rightFooterButtonName: "LOG IN",
          rightFooterButtonDisabled: true,
          displayForgotPassword: false,
          errorUserData,
        });
      });
  };

  //api to get "working with" drop down
  apiGetWorkingWithDropDownData = async (searchWord) => {
    let data = {
      requests: [
        {
          indexName: "prod_consultants",
          params: `query=${searchWord}&page=0&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&facets=%5B%5D&tagFilters=`,
        },
      ],
    };
    await axios
      .post(algoliaURL, data)
      .then((res) => {
        try {
          this.setState({ working_with_arr: res.data.results[0].hits });
        } catch (e) {
          console.log(e);
          this.setState({ working_with_arr: [] });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ working_with_arr: [] });
      });
  };

  //*********************************************************** API Calls Ends Here*********************************************************/

  //method to set card and address details
  setCardDetails = (cardinfo, addresschange, billingAddress) => {
    this.setState({ cardinfo, addresschange, billingAddress });
  };

  // method to (ennable/disable) footer
  setDisplayFooter = (value) => {
    this.setState({ displayFooter: value });
  };

  //setCheckURLAvailability
  setCheckURLAvailability = (value) => {
    this.setState({ checkURLAvailability: value });
  };

  //stepper
  getMobileSteps = () => {
    return ["Your Details", "Business Details", "Review Terms", "Purchase Kit"];
  };

  //stepper title content
  getSteps = () => {
    return [
      "CONFIRM DETAILS",
      "BUSINESS DETAILS",
      "REVIEW TERMS",
      "PURCHASE KIT",
    ];
  };

  //stepper content to be displayed based on current active step
  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          // confirm details display screen
          <ConfirmDetails
            rightFooterButtonName={this.state.rightFooterButtonName}
            setrightFooterButtonDisabled={this.setrightFooterButtonDisabled}
            userData={this.state.userData}
            errorUserData={this.state.errorUserData}
            setUserData={this.setUserData}
            setButtonName={this.setButtonName}
            setErrorUserData={this.setErrorUserData}
            displayForgotPassword={this.state.displayForgotPassword}
            setForgotPassword={this.setForgotPassword}
            handleBackButton={this.handleBackButton}
            apiGetWorkingWithDropDownData={this.apiGetWorkingWithDropDownData}
            working_with_arr={this.state.working_with_arr}
          />
        );
      case 1:
        return (
          // Business details screen
          <BusinessDetails
            rightFooterButtonName={this.state.rightFooterButtonName}
            setrightFooterButtonDisabled={this.setrightFooterButtonDisabled}
            userData={this.state.userData}
            setUserData={this.setUserData}
            setButtonName={this.setButtonName}
            apiVerifyURL={this.apiVerifyURL}
            errorUserData={this.state.errorUserData}
            setErrorUserData={this.setErrorUserData}
            checkURLAvailability={this.state.checkURLAvailability}
            setCheckURLAvailability={this.setCheckURLAvailability}
            handleBackButton={this.handleBackButton}
          />
        );
      case 2:
        return (
          //verify email screen
          <VerifyIdentity
            rightFooterButtonName={this.state.rightFooterButtonName}
            setrightFooterButtonDisabled={this.setrightFooterButtonDisabled}
            userData={this.state.userData}
            setUserData={this.setUserData}
            setButtonName={this.setButtonName}
            setDisplayFooter={this.setDisplayFooter}
            errorUserData={this.state.errorUserData}
            setErrorUserData={this.setErrorUserData}
            currentAgreement={this.state.currentAgreement}
            setCurrentAgreement={this.setCurrentAgreement}
            handleBackButton={this.handleBackButton}
          />
        );
      case 3:
        return (
          //Purchase kit screen
          <PurchaseKit
            rightFooterButtonName={this.state.rightFooterButtonName}
            setrightFooterButtonDisabled={this.setrightFooterButtonDisabled}
            userData={this.state.userData}
            setUserData={this.setUserData}
            setButtonName={this.setButtonName}
            purchaseKitDetails={this.state.purchaseKitDetails}
            apiCartDetails={this.apiCartDetails}
            cardinfo={this.state.cardinfo}
            addresschange={this.state.addresschange}
            billingAddress={this.state.billingAddress}
            setCardDetails={this.setCardDetails}
            handleBackButton={this.handleBackButton}
          />
        );
      default:
        //default screen
        return "Unknown step";
    }
  }
  //set confirmation
  setConfirmation = (value) => {
    this.setState({ confirmation: value });
  };

  //set display forgot password
  setForgotPassword = () => {
    this.setState({ displayForgotPassword: true });
  };
  //set current agreement
  setCurrentAgreement = () => {
    this.setState({ currentAgreement: !this.state.currentAgreement });
  };

  //method to move to next screen
  moveToNextScreen = () => {
    this.handleNext();
  };

  // method to set user data
  setUserData = (data) => {
    this.setState({
      userData: data,
    });
  };

  // method to set error
  setErrorUserData = (data) => {
    this.setState({
      errorUserData: data,
    });
  };

  //set button name
  setButtonName = (button) => {
    this.setState({
      rightFooterButtonName: button,
    });
  };

  // method to enable/disable right footer button
  setrightFooterButtonDisabled = (value) => {
    this.setState({ rightFooterButtonDisabled: value });
  };

  // to move to next screen
  handleNext = () => {
    const { activeStep } = this.state;

    this.setState({
      activeStep: activeStep + 1,
    });
  };

  //move back to last screen
  moveBackToLastScreen = (activeStep, button) => {
    this.setState({
      activeStep: activeStep,
      rightFooterButtonName: button,
      rightFooterButtonDisabled: true,
      displayFooter: true,
    });
  };

  // header Back button
  handleBackButton = () => {
    let rightButton = this.state.rightFooterButtonName;
    switch (rightButton) {
      case "NEXT":
        this.props.history.push("/");
        break;
      case "LOG IN":
        this.setState({
          rightFooterButtonName: "NEXT",
          displayForgotPassword: false,
          rightFooterButtonDisabled: false,
        });
        break;
      case "CONTINUE ":
        this.setState({
          rightFooterButtonName: "NEXT",
          displayForgotPassword: false,
          rightFooterButtonDisabled: false,
        });
        break;
      case "LOOKS GOOD":
        this.setState({
          rightFooterButtonName: "NEXT",
          rightFooterButtonDisabled: true,
        });
        break;

      case "PROCEED":
        this.setState({
          rightFooterButtonName: "LOOKS GOOD",
          rightFooterButtonDisabled: false,
          activeStep: 0,
        });
        break;
      case "CONTINUE":
        this.setState({
          rightFooterButtonName: "PROCEED",
          rightFooterButtonDisabled: false,
          activeStep: 1,
        });
        break;
      case "DONE":
        this.setState({
          rightFooterButtonName: "CONTINUE",
          rightFooterButtonDisabled: true,
          activeStep: 2,
        });
        break;
      case "SAVE AND PROCEED":
        if (!this.state.rightFooterButtonDisabled) {
          this.apiUpdateUserData();
          break;
        } else {
          this.setState({
            rightFooterButtonName: "NEXT",
            rightFooterButtonDisabled: false,
          });
          break;
        }

      default:
        this.setState({ rightFooterButtonName: "NEXT" });
        break;
    }
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const mobileStep = this.getMobileSteps();
    const { activeStep, load, rightFooterButtonName } = this.state;

    return (
      <div tabIndex="0" onKeyDown={this.handleKeypress}>
        {load ? (
          <CircularProgress color="black" size={80} className="loader" />
        ) : null}
        {/* If active step is less than 4 appropriate step page is dispayed , 
        if active step is 4  - payment confirmation page is displayed */}
        {activeStep < 4 ? (
          <>
            <div className="container-fluid">
              <div className="row headerMarginTop">
                {window.innerWidth >= 550 ||
                rightFooterButtonName === "NEXT" ||
                rightFooterButtonName === "LOG IN" ||
                rightFooterButtonName === "CONTINUE " ? (
                  <>
                    <div className="col-xl-2 col-lg-1 col-md-1 col-1">
                      <div
                        className="arrowIcon3"
                        onClick={this.handleBackButton}
                      >
                        <ArrowBackIosIcon />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-2 col-md-11 col-11">
                      <div className="LogoIcon">
                        <a href="https://scoutandcellar.com/">
                          <Logo />
                        </a>
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="col-xl-8 col-lg-9 col-md-12 col-12 stepperMarginTop">
                  {/* stepper */}
                  <Stepper
                    activeStep={activeStep}
                    connector={<GreenStepConnector />}
                    orientation={"horizontal"}
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
                            <span className="fontOswald">{label}</span>
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </div>
              </div>
            </div>

            <div className="container-fluid HomeContainer">
              <div className="row">
                <div className="col-xl-10 offset-xl-2 col-lg-11 offset-lg-1">
                  {window.innerWidth >= 550 ? (
                    <>
                      {/* to display content based on active step */}
                      <div style={{ marginTop: "4em" }}>
                        <Typography className={classes.instructions}>
                          {this.getStepContent(activeStep)}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* enter email */}
                      <div className="mobileMargin">
                        <Typography className={classes.instructions}>
                          {this.getStepContent(activeStep)}
                        </Typography>
                      </div>
                      {/* Stepper */}
                      {this.state.rightFooterButtonName === "NEXT" ? (
                        <div className="btm-list-blk">
                          <div className="btm-list-inner">
                            <div className="mobileStepHead">
                              WHAT HAPPENS NEXT?
                            </div>
                            {/* stepper for mobile view  */}
                            <Stepper
                              connector={<MobileStepConnector />}
                              activeStep={0}
                              style={{ background: "#e8e0dd" }}
                              className="mobileStep"
                              orientation={
                                window.innerWidth >= 550
                                  ? "horizontal"
                                  : "vertical"
                              }
                            >
                              {mobileStep.map((label, index) => {
                                return (
                                  <Step
                                    key={label}
                                    classes={{
                                      root: classes.step2,
                                      completed: classes.completed,
                                      active: classes.active,
                                    }}
                                  >
                                    <StepLabel
                                      StepIconProps={{
                                        classes: {
                                          root: classes.step3,
                                          completed: classes.completed,
                                          active: classes.active,
                                          disabled: classes.disabled,
                                          text: classes.textStep,
                                        },
                                      }}
                                    >
                                      <span className="fontOswald1">
                                        {label}
                                      </span>
                                    </StepLabel>
                                  </Step>
                                );
                              })}
                            </Stepper>
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}

                  {/* end of first page */}
                </div>
              </div>
            </div>
            {/* Global Footer for all screens  */}
            <Footer
              rightFooterButtonName={this.state.rightFooterButtonName}
              rightFooterButtonDisabled={this.state.rightFooterButtonDisabled}
              moveToNextScreen={this.moveToNextScreen}
              userData={this.state.userData}
              setUserData={this.setUserData}
              setButtonName={this.setButtonName}
              setrightFooterButtonDisabled={this.setrightFooterButtonDisabled}
              displayFooter={this.state.displayFooter}
              setDisplayFooter={this.setDisplayFooter}
              apiVerifyEmail={this.apiVerifyEmail}
              apiLogin={this.apiLogin}
              apiUpdateUserData={this.apiUpdateUserData}
              apiUpdateScreen={this.apiUpdateScreen}
              currentAgreement={this.state.currentAgreement}
              setCurrentAgreement={this.setCurrentAgreement}
              apiCreateConsultant={this.apiCreateConsultant}
              apiForgotPassword={this.apiForgotPassword}
            />
          </>
        ) : (
          // once all steps are completed Payement confirmation screen is displayed
          <PaymentConfirmation
            userData={this.state.userData}
            setUserData={this.setUserData}
            setButtonName={this.setButtonName}
            confirmation={this.state.confirmation}
            setConfirmation={this.setConfirmation}
            moveBackToLastScreen={this.moveBackToLastScreen}
            consultant_number={this.state.consultant_number}
            consultant_error={this.state.consultant_error}
          />
        )}
      </div>
    );
  }
}
// to add styles and props type for material UI design used
Home.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Home);
