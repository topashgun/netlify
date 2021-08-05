import React from "react";
import Header from "../MobileHeader/Header";
import axios from "axios";
import Checkbox from "@material-ui/core/Checkbox";
import "./Agreement.css";
import fileDownload from "js-file-download";
import { FiDownload } from "react-icons/fi";

class Agreement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used to indicate the current policy selected
      currentButton: this.props.currentAgreement,
      //used to record if user accepted the agreement
      checkbox1: false,
      checkbox2: false,
      scrollReachEnd: false,
    };
  }
  // policy text data  (Policy and Procedures)
  PolicyAgreement = () => {
    return (
      <div>
        <div className="agreementTitle">Policy and Procedures</div>
        <br />
        <div className="agreementData">
          As a Scout &amp; Cellar Consultant (referred herein as an “Independent
          Consultant” or “Consultant”) of Wine Retriever LLC dba Scout &amp;
          Cellar (collectively referred to as “Scout &amp; Cellar” or the
          “Company”), I understand and agree that our relationship will be
          governed by the terms and conditions herein as follows:
          <br />
          <br />
          1. Definition of this Agreement. As an Independent Consultant, I
          understand that I must comply with the terms and conditions set forth
          in this Agreement, including the Scout &amp; Cellar Policies &amp;
          Procedures (the “Policies &amp; Procedures”) and the Scout &amp;
          Cellar Compensation Plan, which are both incorporated into and made a
          part of this Agreement. As used herein, the term “Agreement” refers to
          these three documents collectively. I understand that I am solely
          responsible for the means and methods by which I promote and market
          and educate consumers regarding Scout &amp; Cellar products, subject
          to my compliance with the Agreement. I further understand that this
          Agreement requires integrity, honesty and responsibility in my
          behavior and actions with the Company, Scout &amp; Cellar Members, and
          my fellow Consultants.
          <br />
          <br /> 2. Definition of this Agreement. As an Independent Consultant,
          I understand that I must comply with the terms and conditions set
          forth in this Agreement, including the Scout &amp; Cellar Policies
          &amp; Procedures (the “Policies &amp; Procedures”) and the Scout &amp;
          Cellar Compensation Plan, which are both incorporated into and made a
          part of this Agreement. As used herein, the term “Agreement” refers to
          these three documents collectively. I understand that I am solely
          responsible for the means and methods by which I promote and market
          and educate consumers regarding Scout &amp; Cellar products, subject
          to my compliance with the Agreement. I further understand that this
          Agreement requires integrity, honesty and responsibility in my
          behavior and actions with the Company, Scout &amp; Cellar Members, and
          my fellow Consultants in my behavior and actions with the Company,
          Scout &amp; Cellar Members, and my fellow Consultants.
        </div>
      </div>
    );
  };
  // policy text data  (IndependentAgreement)
  IndependentAgreement = () => {
    return (
      <div>
        <div className="agreementTitle">Independent Consultant Agreement</div>
        <br />
        <div className="agreementData">
          As a Scout &amp; Cellar Consultant (referred herein as an “Independent
          Consultant” or “Consultant”) of Wine Retriever LLC dba Scout &amp;
          Cellar (collectively referred to as “Scout &amp; Cellar” or the
          “Company”), I understand and agree that our relationship will be
          governed by the terms and conditions herein as follows: <br /> <br />
          1. Definition of this Agreement. As an Independent Consultant, I
          understand that I must comply with the terms and conditions set forth
          in this Agreement, including the Scout &amp; Cellar Policies &amp;
          Procedures (the “Policies &amp; Procedures”) and the Scout &amp;
          Cellar Compensation Plan, which are both incorporated into and made a
          part of this Agreement. As used herein, the term “Agreement” refers to
          these three documents collectively. I understand that I am solely
          responsible for the means and methods by which I promote and market
          and educate consumers regarding Scout &amp; Cellar products, subject
          to my compliance with the Agreement. I further understand that this
          Agreement requires integrity, honesty and responsibility in my
          behavior and actions with the Company, Scout &amp; Cellar Members, and
          my fellow Consultants. <br /> <br /> 2. Definition of this Agreement.
          As an Independent Consultant, I understand that I must comply with the
          terms and conditions set forth in this Agreement, including the Scout
          &amp; Cellar Policies &amp; Procedures (the “Policies &amp;
          Procedures”) and the Scout &amp; Cellar Compensation Plan, which are
          both incorporated into and made a part of this Agreement. As used
          herein, the term “Agreement” refers to these three documents
          collectively. I understand that I am solely responsible for the means
          and methods by which I promote and market and educate consumers
          regarding Scout &amp; Cellar products, subject to my compliance with
          the Agreement. I further understand that this Agreement requires
          integrity, honesty and responsibility in my behavior and actions with
          the Company, Scout &amp; Cellar Members, and my fellow Consultants
        </div>
      </div>
    );
  };
  // method to download  the required text file from backend
  downloadFile = async () => {
    await axios
      .get(
        !this.state.currentButton
          ? "../sampledata/Independent Consultant Agreement.txt"
          : "../sampledata/Policy and Procedures Agreement.txt",
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        !this.state.currentButton
          ? fileDownload(res.data, "Independent Consultant Agreement.txt")
          : fileDownload(res.data, "Policy and Procedures Agreement.txt");
      });
  };

  handleScroll = (e) => {
    if (
      Math.abs(
        e.target.scrollTop + e.target.clientHeight - e.target.scrollHeight
      ) > 10
    ) {
      this.setState({ scrollReachEnd: false });
    } else {
      this.setState({ scrollReachEnd: true });
    }
  };

  //to see is user has accepted the agreement
  handleChangecheckbox = (e) => {
    let checkbox1 = this.state.checkbox1;
    let checkbox2 = this.state.checkbox2;
    let userData = this.props.userData;

    if (e.target.id === "checkbox1") {
      checkbox1 = !checkbox1;
      userData["indepedent_agreement"] = !checkbox1;
    } else {
      checkbox2 = !checkbox2;
      userData["policy_procedures"] = !checkbox2;
    }

    this.props.setUserData(userData);
    this.props.setrightFooterButtonDisabled(!(checkbox1 && checkbox2));
    this.setState({ checkbox1, checkbox2 });
  };

  // toggle which policy nneds to be displayed
  toggleButton = (toggle) => {
    this.setState({ currentButton: toggle });
    this.props.setCurrentAgreement(toggle);
  };

  componentDidMount = () => {
    this.props.setrightFooterButtonDisabled(true);
  };

  render() {
    const { currentButton, checkbox1, checkbox2, scrollReachEnd } = this.state;
    return (
      <React.Fragment>
        {/* Header for mobile view */}
        {window.innerWidth <= 550 ? (
          <Header
            step={2}
            agreement={true}
            handleBackButton={this.props.handleBackButton}
          />
        ) : null}
        <div
          className={
            window.innerWidth >= 550
              ? "AGcomponentMargin "
              : "AGmobileComponent"
          }
        >
          <div className="mobileAgreementLeftMargin">
            <span className="AGhead1">LET’S MAKE THIS OFFICIAL!</span>
            {/* buttons to select the requested policy */}
            <div className="row">
              <div className="col-lg-3 col-md-6 mobileAgreementButtonWidth">
                <div
                  className={
                    currentButton
                      ? "agreementButton1 agreementButtonNotActive1"
                      : "agreementButton1 "
                  }
                  onClick={() => this.toggleButton(false)}
                >
                  Independent <br /> Consultant Agreement
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mobileAgreementButtonWidth">
                <div
                  className={
                    !currentButton
                      ? "agreementButton2 agreementButtonNotActive2"
                      : "agreementButton2 "
                  }
                  onClick={() => this.toggleButton(true)}
                >
                  Policy and Procedures
                </div>
              </div>
            </div>

            <div className="col-lg-6 ">
              <div className="downloadButton" onClick={this.downloadFile}>
                <FiDownload style={{ marginTop: "-0.3em" }} /> &nbsp; DOWNLOAD
                AGREEMENT
              </div>
            </div>
            {/* to display selected policy data */}
            <div className="col-lg-6 ">
              <div className="agreementPolicy" onScroll={this.handleScroll}>
                {!currentButton
                  ? this.IndependentAgreement()
                  : this.PolicyAgreement()}
              </div>
            </div>
            {/* check Box to accept agreement */}
            <div className="col-lg-8 ">
              <div className="acceptAgreement">
                {scrollReachEnd ? (
                  <>
                    {!currentButton ? (
                      <>
                        <Checkbox
                          id="checkbox1"
                          name="checkbox1"
                          checked={checkbox1}
                          onChange={this.handleChangecheckbox}
                          className="checkBoxAccept"
                          style={{
                            color: "#DCBA80",
                          }}
                        />
                        {window.innerWidth >= 550 ? (
                          <span
                            id="checkbox1"
                            className="checkboxText mobileAcceptCheckBox"
                            onClick={this.handleChangecheckbox}
                          >
                            I have read and accepted Independent Consultant
                            Agreement.
                          </span>
                        ) : (
                          <div
                            id="checkbox1"
                            className="checkboxText mobileAcceptCheckBox mobileAcceptCheckBox1"
                            onClick={this.handleChangecheckbox}
                          >
                            I have read and accepted Independent Consultant
                            Agreement.
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <Checkbox
                          id="checkbox2"
                          name="checkbox2"
                          checked={checkbox2}
                          onChange={this.handleChangecheckbox}
                          className="checkBoxAccept"
                          style={{
                            color: "#DCBA80",
                          }}
                        />
                        <span
                          id="checkbox2"
                          className="checkboxText mobileAcceptCheckBox"
                          onClick={this.handleChangecheckbox}
                        >
                          I have read and accepted Policy and Procedures.
                        </span>
                      </>
                    )}
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

export default Agreement;
