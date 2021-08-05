import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Header from "../MobileHeader/Header";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
    border: "1px solid #d8c5a6",
    opacity: "1 !important",
    backgroundColor: "white !important",
    fontFamily: "Domine !important",
    fontWeight: "600 !important",
  },
  listbox: {
    backgroundColor: "white",
    width: 300,
    margin: 0,
    padding: 0,
    height: 57,
    overflow: "hidden",
    maxHeight: 200,
    border: "1px solid #d8c5a6",
    fontFamily: "Domine !important",
  },
  inputRoot: {
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
  customTextField: {
    "& input::placeholder": {
      color: "black !important",
      fontFamily: "Domine !important",
      fontWeight: "600 !important",
    },
  },
});

class ConfirmDetailsEdit extends React.Component {
  constructor(props) {
    super(props);
    //set background color
    document.body.style = "background: #F7F3F2 ";
    this.state = {
      //fetch user details from from props
      userData: props.userData,
      //used to record error message
      error: {
        email: "",
        first_name: "",
        last_name: "",
        phonenumber: "",
        working_with: {
          id: 1,
          name: "",
        },
        dob: "",
        address: {
          street: "",
          zipcode: "",
          city: "",
          state: "",
        },
      },
      // used to validate and enable button to move to next screen
      errorArr: [true, true, true, true, true, true, true, true, true],
      //working with value
      value: {
        id: props.userData["working_with"].id,
        DisplayName: props.userData["working_with"].name,
      },
    };
  }

  // used to handle change in case of change input
  handleChange = (e) => {
    let type = e.target.id;
    let value = e.target.value;
    let form = this.state.userData;
    let error = this.state.error;
    let errorArr = this.state.errorArr;

    // firstname
    if (type === "first_name") {
      if (value !== "") {
        error[type] = "";
        errorArr[0] = true;
      } else {
        error[type] = "First Name is mandatory";
        errorArr[0] = false;
      }
      form[type] = value;
    }

    // lastname
    if (type === "last_name") {
      if (value !== "") {
        error[type] = "";
        errorArr[1] = true;
      } else {
        error[type] = "Last Name is mandatory";
        errorArr[1] = false;
      }
      form[type] = value;
    }

    // address street
    if (type === "street") {
      if (value !== "") {
        error["address"][type] = "";
        errorArr[2] = true;
      } else {
        error["address"][type] = "Street is mandatory";
        errorArr[2] = false;
      }
      form["address"][type] = value;
    }

    // address zipcode
    if (type === "zipcode") {
      if (value !== "") {
        error["address"][type] = "";
        errorArr[3] = true;
      } else {
        error["address"][type] = "Zip is mandatory";
        errorArr[3] = false;
      }
      form["address"][type] = value
        .split("")
        .filter((item) => item.match(/[0-9\\-]/i))
        .join("");
    }

    // address city
    if (type === "city") {
      if (value !== "") {
        error["address"][type] = "";
        errorArr[4] = true;
      } else {
        error["address"][type] = "City is mandatory";
        errorArr[4] = false;
      }
      form["address"][type] = value;
    }

    // address state
    if (type === "state") {
      if (value !== "") {
        error["address"][type] = "";
        errorArr[5] = true;
      } else {
        error["address"][type] = "State is mandatory";
        errorArr[5] = false;
      }
      form["address"][type] = value;
    }

    // cellno
    if (type === "phonenumber") {
      if (value !== "") {
        error[type] = "";
        if (value.length === 12) {
          errorArr[6] = true;
        } else {
          error[type] = "Invalid Cell Number";
          errorArr[6] = false;
        }
      } else {
        error[type] = "Cell Number is mandatory";
        errorArr[6] = false;
      }

      form[type] = maskingPhoneNumber(
        value
          .split("")
          .filter((item) => item.match(/[0-9\\-]/i))
          .join("")
      );
    }

    // workingwith
    if (type === "working_with") {
      if (value !== "") {
        error[type] = "";
        errorArr[7] = true;
      } else {
        error[type] = "Working With is mandatory";
        errorArr[7] = false;
      }
      this.props.apiGetWorkingWithDropDownData(value);
      form[type] = { id: 1, name: value };
    }

    // email id
    if (type === "email") {
      if (value !== "") {
        let regex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

        if (regex.test(value)) {
          error[type] = "";
          errorArr[8] = true;
        } else {
          error[type] = "Invalid Email ID";
          errorArr[8] = false;
        }
      } else {
        error[type] = "Email ID is mandatory";
        errorArr[8] = false;
      }
      form[type] = value;
    }

    // enable /disable button to move to next screen
    this.validateToMoveToNextScreen();

    this.setState({ userData: form, error: error, errorArr: errorArr });
  };

  // to handle change in date
  handleDate = (e) => {
    let type = e.target.id;
    let value = e.target.value;
    let userData = this.state.userData;
    let dob = userData.dob;
    let error = this.state.error;

    dob[type] = value;
    let date1 = new Date();
    let date2 = new Date(dob.year, dob.month, dob.day);
    let yearsDiff = date1.getFullYear() - date2.getFullYear();

    // avoid users below 19 years
    if (yearsDiff < 21) {
      error["dob"] = "you have to be older than 21 Years";
      this.props.setrightFooterButtonDisabled(true);
    } else if (yearsDiff === 21) {
      let month = date1.getMonth() - date2.getMonth();
      let day = date1.getDate() - date2.getDate();

      if (month === 0) {
        if (day > 0) {
          error["dob"] = "";
          this.validateToMoveToNextScreen();
        } else {
          error["dob"] = "you have to be older than 21 Years";
          this.props.setrightFooterButtonDisabled(true);
        }
      } else if (month > 0) {
        error["dob"] = "";
        this.validateToMoveToNextScreen();
      } else {
        error["dob"] = "you have to be older than 21 Years";
        this.props.setrightFooterButtonDisabled(true);
      }
    } else {
      error["dob"] = "";
      this.validateToMoveToNextScreen();
    }

    if (
      moment(
        new Date(userData.dob.year, userData.dob.month, userData.dob.day)
      ).format("MM/DD/YYYY") === "Invalid date"
    ) {
      error["dob"] = "Invalid Date";
      this.props.setrightFooterButtonDisabled(true);
    } else {
      this.validateToMoveToNextScreen();
    }

    this.setState({ userData: userData });
  };

  validateToMoveToNextScreen = () => {
    let errorArr = this.state.errorArr;
    let userData = this.state.userData;
    let date = moment(
      new Date(userData.dob.year, userData.dob.month, userData.dob.day)
    ).format("MM/DD/YYYY");
    // enable /disable button to move to next screen
    this.props.setrightFooterButtonDisabled(
      !(
        errorArr[0] &&
        errorArr[1] &&
        errorArr[2] &&
        errorArr[3] &&
        errorArr[4] &&
        errorArr[5] &&
        errorArr[6] &&
        errorArr[7] &&
        errorArr[8] &&
        date !== "Invalid date"
      )
    );
  };

  // change footer button name when component is removed
  componentWillUnmount = () => {
    this.props.setUserData(this.state.userData);
  };

  componentDidMount = () => {
    let userData = this.props.userData;
    let errorArr = this.state.errorArr;
    if (userData["first_name"] === "") {
      errorArr[0] = false;
    } else {
      errorArr[0] = true;
    }
    if (userData["last_name"] === "") {
      errorArr[1] = false;
    } else {
      errorArr[1] = true;
    }
    if (userData["street"] === "") {
      errorArr[2] = false;
    } else {
      errorArr[2] = true;
    }
    if (userData["zipcode"] === "") {
      errorArr[3] = false;
    } else {
      errorArr[3] = true;
    }
    if (userData["city"] === "") {
      errorArr[4] = false;
    } else {
      errorArr[4] = true;
    }
    if (userData["state"] === "") {
      errorArr[5] = false;
    } else {
      errorArr[5] = true;
    }
    if (userData["phonenumber"] === "") {
      errorArr[6] = false;
    } else {
      errorArr[6] = true;
      userData["phonenumber"] = maskingPhoneNumber(userData["phonenumber"]);
    }
    if (userData["working_with"].name === "") {
      errorArr[7] = false;
    } else {
      errorArr[7] = true;
    }
    if (userData["email"] === "") {
      errorArr[8] = false;
    } else {
      errorArr[8] = true;
    }

    //to check if date is NaN (Not a Number)
    // eslint-disable-next-line
    if (userData.dob.day !== userData.dob.day) {
      userData["dob"] = {
        day: "DD",
        month: "MM",
        year: "YYYY",
      };
    }
    this.setState({ errorArr, userData });
  };

  render() {
    const { userData, error, value } = this.state;
    const { classes, working_with_arr } = this.props;
    return (
      <React.Fragment>
        {/* display header for mobile view */}
        {window.innerWidth <= 550 ? (
          <Header
            step={0}
            agreement={false}
            handleBackButton={this.props.handleBackButton}
          />
        ) : null}
        <div
          className={
            window.innerWidth >= 550 ? "componentMargin4 " : "CEmobileComponent"
          }
        >
          {/* static text to be displayed */}
          <span className="head1">
            GOOD MOVE
            {this.props.userData.first_name !== "" ? (
              <>, {userData.first_name.toUpperCase()}!</>
            ) : null}
          </span>
          <div className="staticText3">
            We love it when our customers become consultants. We have most of
            your details on file.
          </div>
          <div className="staticText4">
            Take a quick look at the details below, then we’ll move forward
          </div>
          {/* edit name and date of birth */}
          <div className="row edit-margin">
            <div className="col-lg-2 col-md-3">
              <div className="form-group">
                <span className="head3" htmlFor="first_name">
                  FIRST NAME
                </span>
                <div className="edit-InputMargin">
                  <input
                    type="text"
                    autoComplete="off"
                    value={userData["first_name"]}
                    className={
                      error.first_name.length > 0
                        ? "form-control edit-Red"
                        : "form-control edit-Input"
                    }
                    id="first_name"
                    name="first_name"
                    placeholder="Enter first name"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {error.first_name.length > 0 ? (
                <>
                  <div className="errorMes">{error.first_name}</div>
                  <br />
                </>
              ) : null}
            </div>

            {/* Last name  */}
            <div className="col-lg-2 offset-lg-1  edit-marginLeft">
              <div className="form-group">
                <span className="head3" htmlFor="last_name">
                  LAST NAME
                </span>
                <div className="edit-InputMargin">
                  <input
                    type="text"
                    autoComplete="off"
                    value={userData["last_name"]}
                    className={
                      error.last_name.length > 0
                        ? "form-control edit-Red"
                        : "form-control edit-Input"
                    }
                    id="last_name"
                    name="last_name"
                    placeholder="Enter last name"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {error.last_name.length > 0 ? (
                <>
                  <div className="errorMes">{error.last_name}</div>
                  <br />
                </>
              ) : null}
            </div>
            {/* date of bith  */}
            <div className="col-lg-4 offset-lg-1 col-md-5 edit-marginLeft">
              <span className="head3">DATE OF BIRTH</span>

              <div className="row">
                <div className="col-lg-1 col-md-5 col-xs-1 mobileDate">
                  <div className="form-group">
                    <div className="edit-InputMargin">
                      <select
                        className={
                          error.dob.length > 0
                            ? "form-control edit-month-red"
                            : "form-control edit-month"
                        }
                        value={this.state.userData.dob.month}
                        id="month"
                        name="month"
                        onChange={this.handleDate}
                      >
                        <option value={"MM"} key={"MM"}>
                          MM
                        </option>
                        {moment.monthsShort().map((month, index) => (
                          <option value={index} key={index}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 offset-lg-2 col-md-5 col-xs-1 mobileDate">
                  <div className="form-group">
                    <div className="edit-InputMargin">
                      <select
                        className={
                          error.dob.length > 0
                            ? "form-control edit-day-red"
                            : "form-control edit-day"
                        }
                        value={this.state.userData.dob.day}
                        id="day"
                        name="day"
                        onChange={this.handleDate}
                      >
                        options.push(
                        <option value={"DD"} key={"DD"}>
                          DD
                        </option>
                        );
                        {(() => {
                          const options = [];
                          for (
                            let i = 1;
                            i <=
                            [
                              31,
                              (this.state.userData.dob.year % 4 === 0 &&
                                this.state.userData.dob.year % 100 !== 0) ||
                              this.state.userData.dob.year % 400 === 0
                                ? 29
                                : 28,
                              31,
                              30,
                              31,
                              30,
                              31,
                              31,
                              30,
                              31,
                              30,
                              31,
                            ][this.state.userData.dob.month];
                            i++
                          ) {
                            options.push(
                              <option value={i} key={"DD"}>
                                {i}
                              </option>
                            );
                          }
                          return options;
                        })()}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2  col-md-2 col-xs-1 mobileDate">
                  <div className="form-group">
                    <div className="edit-InputMargin">
                      <select
                        className={
                          error.dob.length > 0
                            ? "form-control edit-year-red"
                            : "form-control edit-year"
                        }
                        value={this.state.userData.dob.year}
                        id="year"
                        name="year"
                        onChange={this.handleDate}
                      >
                        options.push(
                        <option value={"YYYY"} key={"YYYY"}>
                          YYYY
                        </option>
                        );
                        {(() => {
                          const options = [];
                          for (
                            let i = 1970;
                            i <= new Date().getFullYear() - 21;
                            i++
                          ) {
                            options.push(
                              <option value={i} key={"YYYY"}>
                                {i}
                              </option>
                            );
                          }
                          return options;
                        })()}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {error.dob.length > 0 ? (
                <>
                  <div className="errorMes">{error.dob}</div>
                  <br />
                </>
              ) : null}
            </div>
          </div>
          {/* Email id */}
          <div className="row">
            <div className="col-lg-2 ">
              <div className="form-group">
                <span className="head3" htmlFor="email">
                  EMAIL ID
                </span>
                <div className="edit-InputMargin">
                  <input
                    type="text"
                    autoComplete="off"
                    value={userData["email"]}
                    className={
                      error.email.length > 0
                        ? "form-control edit-Red"
                        : "form-control edit-Input"
                    }
                    id="email"
                    name="email"
                    placeholder="Enter Email ID"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {error.email.length > 0 ? (
                <>
                  <div className="errorMes">{error.email}</div>
                  <br />
                </>
              ) : null}
            </div>
          </div>

          <div className="staticText5">SHIPPING ADDRESS</div>
          {/* edit address */}
          <div className="row edit-margin">
            <div className="col-lg-2 ">
              <div className="form-group">
                <span className="head3" htmlFor="street">
                  STREET
                </span>
                <div className="edit-InputMargin">
                  <input
                    type="text"
                    autoComplete="off"
                    value={userData["address"]["street"]}
                    className={
                      error.address.street.length > 0
                        ? "form-control edit-Red"
                        : "form-control edit-Input"
                    }
                    id="street"
                    name="street"
                    placeholder="Enter street"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {error.address.street.length > 0 ? (
                <>
                  <div className="errorMes">{error.address.street}</div>
                  <br />
                </>
              ) : null}
            </div>

            {/* Zipcode */}
            <div className="col-lg-2 offset-lg-1 edit-marginLeft">
              <div className="form-group">
                <span className="head3" htmlFor="zipcode">
                  ZIPCODE
                </span>
                <div className="edit-InputMargin">
                  <input
                    type="text"
                    autoComplete="off"
                    value={userData["address"]["zipcode"]}
                    className={
                      error.address.zipcode.length > 0
                        ? "form-control edit-Red"
                        : "form-control edit-Input"
                    }
                    id="zipcode"
                    name="zipcode"
                    placeholder="Enter zipcode"
                    onChange={this.handleChange}
                    maxLength="6"
                  />
                </div>
              </div>

              {error.address.zipcode.length > 0 ? (
                <>
                  <div className="errorMes">{error.address.zipcode}</div>
                  <br />
                </>
              ) : null}
            </div>

            {/* city */}
            <div className="col-lg-2 offset-lg-1 edit-marginLeft">
              <div className="form-group">
                <span className="head3" htmlFor="city">
                  CITY
                </span>
                <div className="edit-InputMargin">
                  <input
                    type="text"
                    autoComplete="off"
                    value={userData["address"]["city"]}
                    className={
                      error.address.city.length > 0
                        ? "form-control edit-Red"
                        : "form-control edit-Input"
                    }
                    id="city"
                    name="city"
                    placeholder="Enter city"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {error.address.city.length > 0 ? (
                <>
                  <div className="errorMes">{error.address.city}</div>
                  <br />
                </>
              ) : null}
            </div>
          </div>
          {/* address second row */}
          {/* state */}
          <div className="row edit-margin bottomMargin">
            <div className="col-lg-2 ">
              <div className="form-group">
                <span className="head3" htmlFor="state">
                  STATE
                </span>
                <div className="edit-InputMargin">
                  <input
                    type="text"
                    autoComplete="off"
                    value={userData["address"]["state"]}
                    className={
                      error.address.state.length > 0
                        ? "form-control edit-Red"
                        : "form-control edit-Input"
                    }
                    id="state"
                    name="state"
                    placeholder="Enter state"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {error.address.state.length > 0 ? (
                <>
                  <div className="errorMes">{error.address.state}</div>
                  <br />
                </>
              ) : null}
            </div>

            {/* cell number */}
            <div className="col-lg-2 offset-lg-1 edit-marginLeft">
              <div className="form-group">
                <span className="head3" htmlFor="phonenumber">
                  CELL NUMBER
                </span>
                <div className="edit-InputMargin">
                  <input
                    type="text"
                    autoComplete="off"
                    value={userData["phonenumber"]}
                    className={
                      error.phonenumber.length > 0
                        ? "form-control edit-Red"
                        : "form-control edit-Input"
                    }
                    id="phonenumber"
                    name="phonenumber"
                    placeholder="Enter cell number"
                    onChange={this.handleChange}
                    maxLength="12"
                  />
                </div>
              </div>
              {error.phonenumber.length > 0 ? (
                <>
                  <div className="errorMes">{error.phonenumber}</div>
                  <br />
                </>
              ) : null}
            </div>

            {/* working with */}
            <div className="col-lg-2 offset-lg-1 edit-marginLeft">
              <div className="form-group">
                <span className="head3" htmlFor="working_with">
                  WORKING WITH
                </span>
                <div className="edit-InputMargin">
                  <Autocomplete
                    className={
                      error.working_with.length > 0
                        ? "form-control edit-Red"
                        : "form-control edit-Input"
                    }
                    value={value}
                    onChange={(event, newValue) => {
                      let userData = this.state.userData;
                      if (newValue !== null) {
                        userData["working_with"] = {
                          id: newValue["PersonID"],
                          name: newValue["DisplayName"],
                        };
                      }
                      this.setState({ value: newValue, userData });
                    }}
                    inputValue={this.state.userData["working_with"].name}
                    onInputChange={(event, newInputValue) => {
                      let e = {
                        target: {
                          id: "working_with",
                          value: newInputValue,
                        },
                      };
                      this.handleChange(e);
                    }}
                    id="controllable-states-demo"
                    options={working_with_arr}
                    getOptionLabel={(option) => {
                      if (option.DisplayName !== null) {
                        return option.DisplayName;
                      } else {
                        return "";
                      }
                    }}
                    style={{ width: 290 }}
                    classes={{
                      paper: classes.paper,
                      inputRoot: classes.inputRoot,
                      root: classes.listbox,
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        classes={{ root: classes.customTextField }}
                        placeholder="Enter working with"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
              </div>
              {error.working_with.length > 0 ? (
                <>
                  <div className="errorMes">{error.working_with}</div>
                  <br />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// to add styles and props type for material UI design used
ConfirmDetailsEdit.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ConfirmDetailsEdit);

// additional function to add hypen "-" to the phone number
const maskingPhoneNumber = (value) => {
  value = value
    .split("")
    .filter((item) => item !== "-")
    .join("");

  if (value.length > 3 && value.length <= 6) {
    value =
      value.split("").splice(0, 3).join("") +
      "-" +
      value.split("").splice(3).join("");
  } else if (value.length >= 7) {
    value =
      value.split("").splice(0, 3).join("") +
      "-" +
      value.split("").splice(3, 3).join("") +
      "-" +
      value.split("").splice(6).join("");
  }

  return value;
};
