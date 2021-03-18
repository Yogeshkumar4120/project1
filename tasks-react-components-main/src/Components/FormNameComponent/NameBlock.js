import React, { Component } from "react";

import classes from "./NameBlock.module.css";

class NameBlock extends Component {

  // Initial state
  initialState = {
    firstName: '',
    middleName: '',
    lastName: '',
    firstNameError: '',
    middleNameError: '',
    lastNameError: '',
  }

  // State variable
  state = { ...this.initialState };

  // Handle input change
  handleChange = (event) => {
    // console.log(event.target.name + ": " + event.target.value);
    // Modifying state value on input change
    this.setState({ [event.target.name]: event.target.value });
  };

  // Form validation
  validateForm = () => {
    // console.log("Form validation");
    // Regex variable
    let re = '';

    let firstNameError = '',
      middleNameError = '',
      lastNameError = '';

    // First name validation
    if (this.state.firstName) {
      re = /^[a-zA-Z. ]{3,}$/;
      if (!re.test(this.state.firstName)) {
        firstNameError = "Minimum length is 3 characters. Special characters not allowed";
      }
    } else {
      firstNameError = "Required"
    }

    // Middle name validation
    if (this.props.middleName && this.state.middleName) {
      re = /^[a-zA-Z. ]{0,}$/;
      if (!re.test(this.state.middleName)) {
        middleNameError = "Special characters not allowed";
      }
    }

    // Last name validation
    if (this.state.lastName) {
      re = /^[a-zA-Z. ]{3,}$/;
      if (!re.test(this.state.lastName)) {
        lastNameError = "Minimum length is 3 characters. Special characters not allowed";
      }
    } else {
      lastNameError = "Required"
    }

    if (!firstNameError && !middleNameError && !lastNameError) {
      return true;
    } else {
      // Updating state variables for error values
      this.setState({ firstNameError, middleNameError, lastNameError })
      return false;
    }

  };

  // Error span
  errorSpan = (error) => {
    return error && <span className={classes.error}>{error}</span>;
  };

  validateInput = event => {
    const fieldName = event.target.name;
    const value = event.target.value;
    let errorMsg = '';

    let re = '';

    switch (fieldName) {
      case 'firstName':
        if (this.state.firstName) {
          re = /^[a-zA-Z. ]{3,}$/;
          if (!re.test(this.state.firstName)) {
            errorMsg = "Minimum length is 3 characters. Special characters not allowed.";
          }
        } else {
          errorMsg = "Required"
        }
        break;
      case 'middleName':
        if (this.state.middleName) {
          re = /^[a-zA-Z. ]{0,}$/;
          if (!re.test(this.state.middleName)) {
            errorMsg = "Special characters not allowed.";
          }
        }
        break;
      case 'lastName':
        if (this.state.lastName) {
          re = /^[a-zA-Z. ]{3,}$/;
          if (!re.test(this.state.lastName)) {
            errorMsg = "Minimum length is 3 characters. Special characters not allowed.";
          }
        } else {
          errorMsg = "Required"
        }
        break;
    }
    this.setState({ [fieldName + 'Error']: errorMsg });
    if (!errorMsg) {
      this.setState({ [fieldName]: value });
    }
  }

  // On form submission
  onSubmit = () => {
    // e.preventDefault();
    const isValid = this.validateForm();
    if (isValid) {
      const { firstName, middleName, lastName } = this.state;
      const formData = { firstName, lastName }
      if(this.props.middleName){
        formData['middleName'] = this.state.middleName;
      }
      // console.log(formData);
      // POST data here
      this.setState(this.initialState)
      return formData;
    } else {
      return false;
    }
  };

  render() {
    const { firstName, firstNameError, middleName, middleNameError, lastName, lastNameError } = this.state;

    const firstNameBlock = (
      <div className="required field">
        <label>First Name</label>
        <div className="ui input">
          <input
            className={firstNameError ? classes.error : null}
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={this.handleChange}
            onBlur={this.validateInput}
            value={firstName}
          />
        </div>
        {this.errorSpan(firstNameError)}
      </div>
    );

    const middleNameBlock = this.props.middleName ? (
      <div className="field">
        <label>Middle Name</label>
        <div className="ui input">
          <input
            className={middleNameError ? classes.error : null}
            type="text"
            placeholder="Middle Name"
            name="middleName"
            onChange={this.handleChange}
            onBlur={this.validateInput}
            value={middleName}
          />
        </div>
        {this.errorSpan(middleNameError)}
      </div>
    ) : null;

    const lastNameBlock = (
      <div className="required field">
        <label>Last Name</label>
        <div className="ui input">
          <input
            className={lastNameError ? classes.error : null}
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={this.handleChange}
            onBlur={this.validateInput}
            value={lastName}
          />
        </div>
        {this.errorSpan(lastNameError)}
      </div>
    );

    return (
      <div
        className={`ui form ${classes.NameBlock}`}
      >
        <div className={this.props.middleName ? 'three fields' : 'two fields'}>
          {firstNameBlock}
          {middleNameBlock}
          {lastNameBlock}
        </div>
      </div>
    );
  }
}

export default NameBlock;
