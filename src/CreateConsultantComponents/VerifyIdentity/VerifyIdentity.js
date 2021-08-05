import React from "react";
import Header from "../MobileHeader/Header";
import Agreement from "../Agreement/Agreement";
// import axios from "axios";
// import * as API from "../configuration/apiconfig";
import "./VerifyIdentity.css";

class VerifyIdentity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //four digit OTP
      otp: {
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: "",
      },
      // error for 4 digit OTP
      error: {
        otp1: true,
        otp2: true,
        otp3: true,
        otp4: true,
        otp5: true,
        otp6: true,
      },
      // 3 minute timer for resend OTP
      timer: {
        minute: "03",
        second: "00",
      },
      timerId: 0,
      timeOut: true,
      //get user email id
      userEmail: props.userData.email,
      // resend email text will be displayed when true
      resendEmail: false,
      // agreement Screen will be displayed when true
      agreementScreen: true,
    };
  }

  // move to Agreement screen if OTP is valid
  checkOTP = () => {
    let otp = this.state.otp;
    if (
      otp["otp1"] !== "" &&
      otp["otp2"] !== "" &&
      otp["otp3"] !== "" &&
      otp["otp4"] !== "" &&
      otp["otp5"] !== "" &&
      otp["otp6"] !== ""
    ) {
      // let data = {
      //   email: this.props.userData.email,
      //   otp:
      //     otp["otp1"] +
      //     otp["otp2"] +
      //     otp["otp3"] +
      //     otp["otp4"] +
      //     otp["otp5"] +
      //     otp["otp6"],
      // };
      //   API.callEndpoint("POST", "Bearer", "/api/v1/users/verifyOTP", data)
      //     .then((response) => {
      //       try {
      //         this.setState({ agreementScreen: true });
      //         this.props.setDisplayFooter(true);
      //         this.props.setUserData(this.props.userData);
      //         this.props.setrightFooterButtonDisabled(true);
      //         this.props.setButtonName("CONTINUE");
      //       } catch (e) {
      //         console.log("Error in /verifyOTP");
      //         return false;
      //       }
      //     })
      //     .catch((error) => {
      //       console.log("Error in /verifyOTP");
      //       return false;
      //     });
    }
  };

  // to display masked version of email address for resend email screen
  maskEmail = (email) => {
    let id = email.substring(0, email.indexOf("@"));
    return (
      id.substr(0, 2) +
      "XXXX" +
      id.substr(id.length - 2, 2) +
      email.substr(email.indexOf("@"))
    );
  };

  //this method is called to resend OTP and reset the timer to 3 minutes
  resendCode = () => {
    let timer = this.state.timer;
    timer["second"] = "00";
    timer["minute"] = "03";
    let otp = this.state.otp;
    otp["otp1"] = "";
    otp["otp2"] = "";
    otp["otp3"] = "";
    otp["otp4"] = "";
    otp["otp5"] = "";
    otp["otp6"] = "";
    this.setState({ timeOut: true, timer, otp, resendEmail: true });
    this.runTimer();
  };

  // run Timer starts the timer when component is mounted or when resend email is called.
  //it count downs form 3 minutes to 0 and then enables resend email button when it reaches 0
  runTimer = () => {
    const timerId = setInterval(() => {
      let timer = this.state.timer;
      if (timer["second"] === "00") {
        timer["second"] = 60;
        timer["minute"] = "0" + (timer["minute"] - 1);
      }
      timer["second"] = timer["second"] - 1;
      if (timer["second"] < 10) {
        timer["second"] = "0" + timer["second"];
      }
      if (timer["minute"] === "00" && timer["second"] === "00") {
        clearInterval(this.state.timerId);
        this.setState({ timeOut: false });
      }
      this.setState({ timer });
    }, 1000);
    this.setState({ timerId });
  };

  // handle change to update otp to state variables
  handleChange = (e) => {
    let type = e.target.id;
    let value = e.target.value;
    let otp = this.state.otp;
    let error = this.state.error;
    let regex = new RegExp("^\\d+$");

    if (value !== "") {
      error[type] = false;
      if (!regex.test(value)) {
        value = "";
      } else if (type !== "otp6") {
        document
          .querySelector(`input[name=otp${parseInt(type.slice(3, 4)) + 1}]`)
          .focus();
      }
    } else {
      error[type] = true;
    }

    otp[type] = value.slice(-1);

    this.setState({ otp, error });
    this.checkOTP();
  };

  // loads when component is mounted
  // 1. removes the footer
  // 2. starts the timer
  componentDidMount = () => {
    //temporary move to agreement screen // should be removed in the future
    this.props.setButtonName("CONTINUE");
    this.props.setrightFooterButtonDisabled(true);
    //   this.props.setDisplayFooter(false);
    //   this.runTimer();

    //   let data = {
    //     email: this.props.userData.email,
    //   };

    //   API.callEndpoint(
    //     "POST",
    //     "Bearer",
    //     "/api/v1/users/initiateVerification",
    //     data
    //   )
    //     .then((response) => {
    //       try {
    //         console.log(response);
    //       } catch (e) {
    //         console.log("Error in /initiateVerfication");
    //         return false;
    //       }
    //     })
    //     .catch((error) => {
    //       console.log("Error in /initiateVerfication");
    //       return false;
    //     });
  };

  render() {
    const { otp, timer } = this.state;
    return (
      <React.Fragment>
        {!this.state.agreementScreen ? (
          <>
            {/* Header displayed in  mobile view */}
            {window.innerWidth <= 550 ? (
              <Header step={2} agreement={false} />
            ) : null}
            <div
              className={
                window.innerWidth >= 550
                  ? "componentMargin "
                  : "mobileComponent"
              }
            >
              <span className="head1">VERIFY YOUR EMAIL</span>
              <div className="staticText3">
                Please provide below, the 4-digit one-time pass code sent to the
                email ID on your account.
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-8 offset-md-1 verifyDivOffset">
                  <div className="row">
                    <div className="col-lg-8">
                      {/* 4 Digit  OTP  */}
                      <div className="otpContainer">
                        <div className="row">
                          {/* OTP Digit 1 */}
                          <input
                            type="text"
                            value={otp.otp1}
                            className={
                              otp.otp1.length === 1
                                ? "form-control otpInput1"
                                : "form-control otpInput"
                            }
                            id="otp1"
                            name="otp1"
                            autoComplete="off"
                            onChange={this.handleChange}
                          />
                          {/* OTP Digit 2 */}
                          <input
                            type="text"
                            value={otp.otp2}
                            className={
                              otp.otp2.length === 1
                                ? "form-control otpInput1 otpLeftMargin"
                                : "form-control otpInput otpLeftMargin"
                            }
                            id="otp2"
                            name="otp2"
                            autoComplete="off"
                            onChange={this.handleChange}
                          />
                          {/* OTP Digit 3 */}
                          <input
                            type="text"
                            value={otp.otp3}
                            className={
                              otp.otp3.length === 1
                                ? "form-control otpInput1 otpLeftMargin"
                                : "form-control otpInput otpLeftMargin"
                            }
                            id="otp3"
                            name="otp3"
                            autoComplete="off"
                            onChange={this.handleChange}
                          />
                          {/* OTP Digit 4 */}
                          <input
                            type="text"
                            value={otp.otp4}
                            className={
                              otp.otp4.length === 1
                                ? "form-control otpInput1 otpLeftMargin"
                                : "form-control otpInput otpLeftMargin"
                            }
                            id="otp4"
                            name="otp4"
                            autoComplete="off"
                            onChange={this.handleChange}
                          />
                          {/* OTP Digit 5 */}
                          <input
                            type="text"
                            value={otp.otp5}
                            className={
                              otp.otp5.length === 1
                                ? "form-control otpInput1 otpLeftMargin"
                                : "form-control otpInput otpLeftMargin"
                            }
                            id="otp5"
                            name="otp5"
                            autoComplete="off"
                            onChange={this.handleChange}
                          />
                          {/* OTP Digit 6 */}
                          <input
                            type="text"
                            value={otp.otp6}
                            className={
                              otp.otp6.length === 1
                                ? "form-control otpInput1 otpLeftMargin"
                                : "form-control otpInput otpLeftMargin"
                            }
                            id="otp6"
                            name="otp6"
                            autoComplete="off"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Resend Email  */}
                  {this.state.resendEmail ? (
                    <div className="resendTextArea">
                      Code sent again to <br />
                      <b>{this.maskEmail(this.state.userEmail)}</b>
                    </div>
                  ) : null}
                  <div className="row">
                    {this.state.timeOut ? (
                      <div className="otpSubText">
                        If you haven’t received the code, you may request it in
                      </div>
                    ) : (
                      <div className="otpSubText">
                        If you haven’t received the code, you may request it
                        now.
                      </div>
                    )}
                  </div>
                  {/* Timer  */}
                  <div className="row">
                    <div className="col-lg-5 ">
                      {this.state.timeOut ? (
                        <div className="timer">
                          {timer.minute} : {timer.second}
                        </div>
                      ) : (
                        <div className="resendEmail" onClick={this.resendCode}>
                          RESEND CODE
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // if OTP is correct, then Agreement screen is loaded
          <Agreement
            userData={this.props.userData}
            setUserData={this.props.setUserData}
            setrightFooterButtonDisabled={
              this.props.setrightFooterButtonDisabled
            }
            currentAgreement={this.props.currentAgreement}
            setCurrentAgreement={this.props.setCurrentAgreement}
            handleBackButton={this.props.handleBackButton}
            handleClickRight={this.props.handleClickRight}
          />
        )}
      </React.Fragment>
    );
  }
}

export default VerifyIdentity;
