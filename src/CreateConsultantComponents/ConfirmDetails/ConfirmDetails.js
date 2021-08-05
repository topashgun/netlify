import React from "react";
import "./ConfirmDetails.css";
import ConfirmDetailsPasswordPage from "./ConfirmDetailsPasswordPage";
import ConfirmDetailsDisplay from "./ConfirmDetailsDisplay";
import ConfirmDetailsEdit from "./ConfirmDetailsEdit";

class ConfirmDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //to get user email address
      form: {
        emailAddress: "",
      },
    };
  }

  // to handle change in email input and validate email
  handleChange = (e) => {
    let type = e.target.id;
    let value = e.target.value;
    let form = this.state.form;
    let error = this.props.errorUserData;

    // email
    if (type === "emailAddress") {
      let regex = new RegExp(
        '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      );
      if (regex.test(value)) {
        this.props.setUserData({ email: value });
        error["email"] = "";
        this.props.setErrorUserData(error);
        this.props.setrightFooterButtonDisabled(false);
        let userData = this.props.userData;
        userData["email"] = value;
        this.props.setUserData(userData);
      } else {
        error["email"] = "Please enter a valid email address";
        this.props.setErrorUserData(error);
        this.props.setrightFooterButtonDisabled(true);
      }
    }
    form[type] = value;
    this.setState({ form: form });
  };

  render() {
    const { form } = this.state;
    const { rightFooterButtonName, userData, errorUserData, setErrorUserData } =
      this.props;
    return (
      <React.Fragment>
        {rightFooterButtonName === "NEXT" ? (
          <div
            className={
              window.innerWidth >= 550 ? "componentMargin1 " : "mobileComponent"
            }
          >
            <span className="head1">BECOME A CONSULTANT</span>
            <div className="email1 form-group">
              <label className="emailLabel" htmlFor="emailAddress">
                EMAIL ADDRESS
              </label>
              {/* input to accept email address */}
              <div className="InputMargin">
                <input
                  type="text"
                  value={form["emailAddress"]}
                  className={
                    errorUserData.email.length
                      ? "form-control Red"
                      : "form-control Input"
                  }
                  id="emailAddress"
                  name="emailAddress"
                  placeholder="Enter email address"
                  autoComplete="off"
                  onChange={this.handleChange}
                 
                />
                {/* error handling of email field */}

                {errorUserData.email.length ? (
                  <span className="errorMes">
                    {errorUserData.email}
                    <br />
                  </span>
                ) : null}
              </div>
              {/* Static text dispayed at the bottom of email field */}
              <div className="SubText">
                The email you already use or want to use with Scout &amp;
                Cellar.
              </div>
            </div>
          </div>
        ) : rightFooterButtonName === "LOG IN" ||
          rightFooterButtonName === "CONTINUE " ? (
          // to display the password page of cnfirm details
          <ConfirmDetailsPasswordPage
            userData={userData}
            setUserData={this.props.setUserData}
            setButtonName={this.props.setButtonName}
            setrightFooterButtonDisabled={
              this.props.setrightFooterButtonDisabled
            }
            errorUserData={errorUserData}
            setErrorUserData={setErrorUserData}
            displayForgotPassword={this.props.displayForgotPassword}
            setForgotPassword={this.props.setForgotPassword}
            handleBackButton={this.props.handleBackButton}
           
          />
        ) : rightFooterButtonName === "LOOKS GOOD" ? (
          //to display confirm details page
          <ConfirmDetailsDisplay
            userData={userData}
            setrightFooterButtonDisabled={
              this.props.setrightFooterButtonDisabled
            }
            handleBackButton={this.props.handleBackButton}
           
          />
        ) : (
          //to display editable version  of confirm details page
          <ConfirmDetailsEdit
            userData={userData}
            setrightFooterButtonDisabled={
              this.props.setrightFooterButtonDisabled
            }
            setUserData={this.props.setUserData}
            setButtonName={this.props.setButtonName}
            handleBackButton={this.props.handleBackButton}
          
            apiGetWorkingWithDropDownData={
              this.props.apiGetWorkingWithDropDownData
            }
            working_with_arr={this.props.working_with_arr}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ConfirmDetails;
