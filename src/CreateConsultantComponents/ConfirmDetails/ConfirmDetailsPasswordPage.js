import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { site_key } from "../../configuration/config";
import "./ConfirmDetails.css";

class ConfirmDetailsPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // password for login
      password: "",
      //forgot passowrd
      email: props.userData.email,
      emailError: props.errorUserData.email,
      recaptchaToken: "",
    };
  }

  //handle change for forgot password flow
  handleForgotPassword = (e) => {
    let type = e.target.id;
    let value = e.target.value;
    let error = this.state.emailError;

    // email
    if (type === "emailAddress") {
      let regex = new RegExp(
        '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      );
      if (regex.test(value)) {
        error = "";
        this.setState({ emailError: error });
        this.checkAndMoveToLogin(error);
      } else {
        error = "Please enter a valid email address";
        this.props.setrightFooterButtonDisabled(true);
      }
      this.setState({
        emailError: error,
        email: value,
      });
      let userData = this.props.userData;
      userData["email"] = value;
      this.props.setUserData(userData);
      let errorUserData = this.props.errorUserData;
      errorUserData["email"] = error;
      this.props.setErrorUserData(errorUserData);
      this.setState({ emailError: error });
    }
  };

  // handle change to record password and validate
  handleChange = (e) => {
    let type = e.target.id;
    let value = e.target.value.trim();
    let error = this.props.errorUserData.password;

    // password
    if (type === "password") {
      let regex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$");
      if (regex.test(value)) {
        error = "";
        this.props.setrightFooterButtonDisabled(false);
        let userData = this.props.userData;
        userData["password"] = value;
        this.props.setUserData(userData);
      } else {
        error =
          "Password length must be at least with one letter, one Uppercase letter and one digit ";
        this.props.setrightFooterButtonDisabled(true);
      }
    }

    this.setState({ password: value });
    let errorUserData = this.props.errorUserData;
    errorUserData["password"] = error;
    this.props.setErrorUserData(errorUserData);
  };

  componentDidMount = () => {
    let errorUserData = this.props.errorUserData;
    errorUserData["password"] = "";
    this.props.setErrorUserData(errorUserData);
  };

  onChangeReCaptcha = (recaptchaToken) => {
    if (recaptchaToken === null) {
      recaptchaToken = "";
    }
    this.setState({ recaptchaToken });
    this.checkAndMoveToLogin(this.props.errorUserData.email);
  };

  checkAndMoveToLogin = (errorEmail) => {
    if (this.state.recaptchaToken.length > 0 && errorEmail === "") {
      this.props.setrightFooterButtonDisabled(false);
    } else {
      this.props.setrightFooterButtonDisabled(true);
    }
  };

  render() {
    const { password, email, emailError } = this.state;
    const { errorUserData } = this.props;

    return (
      <React.Fragment>
        <div
          className={
            window.innerWidth >= 550 ? "componentMargin2 " : "mobileComponent"
          }
        >
          <span className="head2">Hey, there!</span>

          <div className="staticText1">
            Welcome {this.props.userData.first_name !== "" ? "back!" : null}
          </div>

          <div className="staticText2">
            We are excited to have you as a member of the Scout &amp; Cellar
            Family.
          </div>

          {/* input to accept Password  */}
          <div className="password1 form-group">
            <label className="passwordLabel" htmlFor="password">
              PASSWORD
            </label>
            <div className="InputMargin">
              <input
                style={{ width: "40%" }}
                type="password"
                autoComplete="off"
                value={password}
                className={
                  errorUserData.password && errorUserData.password.length > 0
                    ? "form-control Red"
                    : "form-control Input"
                }
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={this.handleChange}
                disabled={this.props.displayForgotPassword}
              />

              {/* error message incase for incorrect password */}
              {errorUserData.password && errorUserData.password.length > 0 ? (
                <span className="errorMes">
                  {errorUserData.password}
                  <br />
                </span>
              ) : null}
            </div>
            <span className="SubText">Forgot Your Password? &nbsp;</span>
            {/* link to forgot password */}
            <span
              className="passwordForgotLink"
              onClick={() => {
                this.props.setForgotPassword();
                this.setState({
                  password: "",
                });
                let userData = this.props.userData;
                userData["password"] = "";
                this.props.setUserData(userData);
                let errorUserData = this.props.errorUserData;
                errorUserData["password"] = "";
                this.props.setErrorUserData(errorUserData);
                this.props.setButtonName("CONTINUE ");
                this.props.setrightFooterButtonDisabled(true);
              }}
            >
              Let's Find it
            </span>
          </div>
          {/* forgot password flow */}
          {this.props.displayForgotPassword ? (
            <>
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-5">
                  <div className="forgotPassowordContainer">
                    <span className="head2">FORGOT YOUR PASSWORD?</span>
                    <div className="forgotpasswordText1">
                      Enter your email to be sent a link to reset your password.
                    </div>
                    <div className="email1 form-group">
                      <label className="emailLabel" htmlFor="emailAddress">
                        EMAIL
                      </label>
                      {/* input to accept email address */}
                      <div className="InputMargin">
                        <input
                          type="text"
                          value={email}
                          className={
                            emailError.length > 0
                              ? "form-control Red"
                              : "form-control Input"
                          }
                          id="emailAddress"
                          name="emailAddress"
                          placeholder="Enter email address"
                          autoComplete="off"
                          onChange={this.handleForgotPassword}
                        />
                        {/* error handling of email field */}

                        {emailError.length > 0 ? (
                          <span className="errorMes">
                            {emailError}
                            <br />
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <ReCAPTCHA
                      data-size="compact"
                      className="ReCAPTCHA"
                      sitekey={site_key}
                      onChange={this.onChangeReCaptcha}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default ConfirmDetailsPasswordPage;
