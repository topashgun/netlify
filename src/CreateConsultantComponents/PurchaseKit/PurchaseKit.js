import React from "react";
import Header from "../MobileHeader/Header";
import Checkbox from "@material-ui/core/Checkbox";
import "./PurchaseKit.css";

class PurchaseKit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //form details
      form: {
        cardHolderName: "",
        cardNumber: "",
        cardDate: "",
        cardCVV: "",
        street: "",
        zipCode: "",
        city: "",
        state: "",
      },
      //error messages
      error: {
        cardHolderName: "",
        cardNumber: "",
        cardDate: "",
        cardCVV: "",
        street: "",
        zipCode: "",
        city: "",
        state: "",
      },
      // checked for billing address / shipping address
      checked: true,
      // purchase kit details
      purchaseKitDetails: props.purchaseKitDetails,
    };
  }

  //send data to home component
  sendDataToHomeComponent = () => {
    let cardinfo = this.props.cardinfo;
    let addresschange = this.props.addresschange;
    let billingAddress = this.props.billingAddress;
    let form = this.state.form;

    cardinfo["cardnumber"] = form.cardNumber;
    cardinfo["expiryMonth"] = form.cardDate.slice(0, 2);
    cardinfo["expiryYear"] = form.cardDate.slice(3);
    cardinfo["expiryFullYear"] = "20" + form.cardDate.slice(3);
    cardinfo["cvv"] = form.cardCVV;
    cardinfo["nameoncard"] = form.cardHolderName;

    addresschange = this.state.checked;

    billingAddress["city"] = form.city;
    billingAddress["zipcode"] = form.zipCode;
    billingAddress["state"] = form.state;
    billingAddress["country"] = "US";
    billingAddress["street"] = form.street;

    this.props.setCardDetails(cardinfo, addresschange, billingAddress);
  };

  // enable /disable footer button to move to next screen
  enableDone = (checked = this.state.checked) => {
    let form = this.state.form;
    let error = this.state.error;

    if (
      form["cardHolderName"] !== "" &&
      form["cardNumber"] !== "" &&
      form["cardDate"] !== "" &&
      form["cardCVV"] !== "" &&
      (checked ||
        (form["street"] !== "" &&
          form["zipCode"] !== "" &&
          form["city"] !== "" &&
          form["state"] !== "")) &&
      error["cardHolderName"] === "" &&
      error["cardNumber"] === "" &&
      error["cardDate"] === "" &&
      error["cardCVV"] === "" &&
      error["street"] === "" &&
      error["zipCode"] === "" &&
      error["city"] === "" &&
      error["state"] === ""
    ) {
      this.props.setrightFooterButtonDisabled(false);
    } else {
      this.props.setrightFooterButtonDisabled(true);
    }
  };

  // handle change to update input details in form state variables
  handleChange = (e) => {
    let form = this.state.form;
    let error = this.state.error;
    let id = e.target.id;
    let value = e.target.value;

    //card holder name
    if (id === "cardHolderName") {
      if (value !== "") {
        error[id] = "";
      } else {
        error[id] = "Card Holder Name is Mandatory";
      }
    }

    //card number
    if (id === "cardNumber") {
      if (value !== "") {
        if (value.length >= 13 && value.length <= 19) {
          error[id] = "";
        } else {
          error[id] = "Enter a valid Card Number";
        }
      } else {
        error[id] = "Card Number is Mandatory";
      }
      value = value
        .split("")
        .filter((item) => item.match(/[0-9]/i))
        .join("");
    }

    //card date
    if (id === "cardDate") {
      if (value !== "") {
        //month validation
        if (
          parseInt(value.slice(0, 2)) > 0 &&
          parseInt(value.slice(0, 2)) < 13
        ) {
          //year validation if (year is greater than current year)
          if (
            value.length === 5 &&
            parseInt(value.slice(3)) >
              parseInt(new Date().getFullYear().toString().substr(-2))
          ) {
            error[id] = "";
          } //year validation if (year is equal to current year)
          else if (
            value.length === 5 &&
            parseInt(value.slice(3)) ===
              parseInt(new Date().getFullYear().toString().substr(-2))
          ) {
            if (
              parseInt(value.slice(0, 2)) >=
              parseInt(new Date().getMonth().toString().substr(-2)) + 1
            ) {
              error[id] = "";
            } else {
              error[id] = "Please enter a valid Month";
            }
          } else {
            error[id] = "Please enter a valid year";
          }
        } else {
          error[id] = "Please enter a valid Month";
        }
      } else {
        error[id] = "MM/YY is Mandatory";
      }
      value = maskingMMYY(
        value
          .split("")
          .filter((item) => item.match(/[0-9]/i))
          .join("")
      );
    }

    //card CVV
    if (id === "cardCVV") {
      if (value !== "") {
        error[id] = "";
      } else {
        error[id] = "CVV is Mandatory";
      }
      value = value
        .split("")
        .filter((item) => item.match(/[0-9]/i))
        .join("");
    }

    if (id === "street") {
      if (value !== "") {
        error[id] = "";
      } else {
        error[id] = "Street is Mandatory";
      }
    }

    //zip code
    if (id === "zipCode") {
      if (value !== "") {
        error[id] = "";
      } else {
        error[id] = "Zip Code is Mandatory";
      }
      value = value
        .split("")
        .filter((item) => item.match(/[0-9]/i))
        .join("");
    }

    //city
    if (id === "city") {
      if (value !== "") {
        error[id] = "";
      } else {
        error[id] = "City is Mandatory";
      }
    }

    //state
    if (id === "state") {
      if (value !== "") {
        error[id] = "";
      } else {
        error[id] = "State is Mandatory";
      }
    }

    form[id] = value;
    this.setState({ form, error });
    this.sendDataToHomeComponent();
    this.enableDone();
  };

  componentDidMount = async () => {
    if (this.props.purchaseKitDetails.total === 0) {
      await this.props.apiCartDetails();
    }
  };

  render() {
    const { form, error, checked, purchaseKitDetails } = this.state;

    return (
      <React.Fragment>
        {/* Header for mobile view  */}
        {window.innerWidth <= 550 ? (
          <Header
            step={3}
            agreement={false}
            handleBackButton={this.props.handleBackButton}
          />
        ) : null}
        <div
          className={
            window.innerWidth >= 550
              ? checked
                ? "purchaseComponentMargin1"
                : "purchaseComponentMargin2 "
              : "PKmobileComponent"
          }
        >
          <span className="head1">PURCHASE KIT</span>
          <div className="row">
            <div className="col-lg-12 col-md-11 mobileTotalPanel">
              {/* total panel to display price details */}
              <div className="totalPanel">
                <div className="row">
                  <div className="col-lg-4 offset-lg-1 col-md-4 offset-md-1 col-xs-1 mobileTotalTitle">
                    <div className="subTotalText">SubTotal</div>
                    <div className="totalText">Shipping</div>
                    <div className="totalText">Sales Tax</div>
                    <div className="totalText">Discount</div>
                  </div>
                  <div className="col-lg-3 offset-lg-3 col-md-3 offset-md-3 col-xs-3 mobileTotalValue">
                    <div className="subTotalMoney">
                      ${addTrailingZeros(purchaseKitDetails.subtotal)}
                    </div>
                    <div className="totalMoney">
                      ${addTrailingZeros(purchaseKitDetails.shipping)}
                    </div>
                    <div className="totalMoney">
                      ${addTrailingZeros(purchaseKitDetails.salestax)}
                    </div>
                    <div className="totalMoney">
                      -${addTrailingZeros(purchaseKitDetails.discount)}
                    </div>
                  </div>
                  <div className="col-lg-1"></div>
                </div>
              </div>
              <div className="totalResultPanel">
                <div className="row">
                  <div className="col-lg-4 offset-lg-1 col-md-4 offset-md-1 col-xs-1 mobileTotalTitle">
                    <div className="ResultText">Total</div>
                  </div>
                  <div className="col-lg-3 offset-lg-3 col-md-3 offset-md-3 col-xs-3 mobileTotalValue">
                    <div className="ResultMoney">
                      ${addTrailingZeros(purchaseKitDetails.total)}
                    </div>
                  </div>
                  <div className="col-lg-1"></div>
                </div>
              </div>
              {/* subtext to to be displayed below total panel */}
              <div className="totalSubText">
                Depending on where your BBK is going, additional taxes and fees
                may apply. These rates are determined by shipping address
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="paymentHead">PAYMENT DETAILS</div>
                <div className="row">
                  <div className="col-lg-5 ">
                    {/* Card Holder name */}
                    <div className="form-group">
                      <div className="purchaseInputMargin">
                        <span
                          className="purchasehead3"
                          htmlFor="cardHolderName"
                        >
                          CARD HOLDER NAME
                        </span>
                        <input
                          type="text"
                          value={form["cardHolderName"]}
                          className={
                            error.cardHolderName.length > 0
                              ? "form-control purchaseRed"
                              : "form-control purchaseInput"
                          }
                          id="cardHolderName"
                          name="cardHolderName"
                          placeholder="Enter Card Holder Name"
                          autoComplete="off"
                          onChange={this.handleChange}
                        />

                        {error.cardHolderName.length > 0 ? (
                          <span className="errorMes">
                            {error.cardHolderName}
                            <br />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 ">
                    {/* Card Number */}
                    <div className="form-group">
                      <div className="purchaseInputMargin1">
                        <span className="purchasehead3" htmlFor="cardNumber">
                          CARD NUMBER
                        </span>
                        <input
                          type="text"
                          value={form["cardNumber"]}
                          className={
                            error.cardNumber.length > 0
                              ? "form-control purchaseRed"
                              : "form-control purchaseInput"
                          }
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="Enter Card Number"
                          autoComplete="off"
                          onChange={this.handleChange}
                          maxLength="19"
                        />

                        {error.cardNumber.length > 0 ? (
                          <span className="errorMes">
                            {error.cardNumber}
                            <br />
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2 col-md-5 mobileMMYY">
                    {/* Month and year of card */}
                    <div className="form-group">
                      <span className="purchasehead3" htmlFor="cardDate">
                        MM/YY
                      </span>
                      <input
                        type="text"
                        value={form["cardDate"]}
                        className={
                          error.cardDate.length > 0
                            ? "form-control purchaseRed1"
                            : "form-control purchaseInput1"
                        }
                        id="cardDate"
                        name="cardDate"
                        autoComplete="off"
                        placeholder="Enter MM/YY"
                        onChange={this.handleChange}
                        maxLength="5"
                      />

                      {error.cardDate.length > 0 ? (
                        <span className="errorMes">
                          {error.cardDate}
                          <br />
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4 mobileCVV">
                    {/* CVV of card */}
                    <div className="form-group">
                      <span className="purchasehead4" htmlFor="cardCVV">
                        CVV
                      </span>
                      <input
                        type="text"
                        value={form["cardCVV"]}
                        className={
                          error.cardCVV.length > 0
                            ? "form-control purchaseRed2"
                            : "form-control purchaseInput2"
                        }
                        id="cardCVV"
                        name="cardCVV"
                        autoComplete="off"
                        placeholder="Enter CVV"
                        onChange={this.handleChange}
                        maxLength="4"
                      />

                      {error.cardCVV.length > 0 ? (
                        <span
                          className="errorMes"
                          style={{ marginLeft: "48px" }}
                        >
                          {error.cardCVV}
                          <br />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {/* Check box to accept Billing Address or Shipping Address */}
              <div className="col-lg-12 billingAddressoffset">
                <div className="billingHead"> BILLING ADDRESS</div>
                <div className="acceptBillingAddress">
                  <Checkbox
                    checked={checked}
                    onChange={() => {
                      this.enableDone(!checked);
                      this.setState({ checked: !checked });
                    }}
                    className="PKcheckBoxAccept"
                    style={{
                      color: "#DCBA80",
                    }}
                  />
                  <span className="billingText">Same as shipping address.</span>
                </div>
                {/* The Below part will be displayed if billing address is same as Shipping address */}
                {!checked ? (
                  <>
                    <div className="row">
                      <div className="col-lg-5">
                        {/* Street */}
                        <div className="form-group">
                          <div className="purchaseInputMargin">
                            <span className="purchasehead3" htmlFor="street">
                              STREET
                            </span>
                            <input
                              type="text"
                              value={form["street"]}
                              className={
                                error.street.length > 0
                                  ? "form-control purchaseRed"
                                  : "form-control purchaseInput"
                              }
                              id="street"
                              name="street"
                              placeholder="Enter Street"
                              autoComplete="off"
                              onChange={this.handleChange}
                            />

                            {error.street.length > 0 ? (
                              <span className="errorMes">
                                {error.street}
                                <br />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        {/* Zip code */}
                        <div className="form-group">
                          <div className="purchaseInputMargin">
                            <span className="purchasehead3" htmlFor="zipCode">
                              ZIP CODE
                            </span>
                            <input
                              type="text"
                              value={form["zipCode"]}
                              className={
                                error.zipCode.length > 0
                                  ? "form-control purchaseRed"
                                  : "form-control purchaseInput"
                              }
                              id="zipCode"
                              name="zipCode"
                              placeholder="Enter ZIP Code"
                              autoComplete="off"
                              onChange={this.handleChange}
                              maxLength="6"
                            />

                            {error.zipCode.length > 0 ? (
                              <span className="errorMes">
                                {error.zipCode}
                                <br />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-5">
                        {/* City */}
                        <div className="form-group">
                          <div className="purchaseInputMargin">
                            <span className="purchasehead3" htmlFor="city">
                              CITY
                            </span>
                            <input
                              type="text"
                              value={form["city"]}
                              className={
                                error.city.length > 0
                                  ? "form-control purchaseRed"
                                  : "form-control purchaseInput"
                              }
                              id="city"
                              name="city"
                              placeholder="Enter City"
                              autoComplete="off"
                              onChange={this.handleChange}
                            />

                            {error.city.length > 0 ? (
                              <span className="errorMes">
                                {error.city}
                                <br />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        {/* State */}
                        <div className="form-group">
                          <div className="purchaseInputMargin">
                            <span className="purchasehead3" htmlFor="state">
                              STATE
                            </span>
                            <input
                              type="text"
                              value={form["state"]}
                              className={
                                error.state.length > 0
                                  ? "form-control purchaseRed"
                                  : "form-control purchaseInput"
                              }
                              id="state"
                              name="state"
                              placeholder="Enter State"
                              autoComplete="off"
                              onChange={this.handleChange}
                            />

                            {error.state.length > 0 ? (
                              <span className="errorMes">
                                {error.state}
                                <br />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PurchaseKit;

// additional function to add "/" to MM/YY
const maskingMMYY = (value) => {
  value = value
    .split("")
    .filter((item) => item !== "/")
    .join("");

  if (value.length > 2 && value.length <= 4) {
    value =
      value.split("").splice(0, 2).join("") +
      "/" +
      value.split("").splice(2, 2).join("");
  }
  return value;
};

const addTrailingZeros = (num) => {
  let out = parseFloat(num);
  return out.toFixed(2);
};
