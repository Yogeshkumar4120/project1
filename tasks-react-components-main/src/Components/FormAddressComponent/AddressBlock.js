import React, { Component } from "react";
import { Grid, Input } from "semantic-ui-react";

import classes from "./AddressBlock.module.css";

class AddressBlock extends Component {

  // API auth token
  auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYW1hbmd1cHRhOXluQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6Ilg3VFZUQmpqdG41V1ZzNkx1bEVuQTlvLTFTSmktSzJod0haUG5mQk8tNnlzOXRIN3BldElBSjFsZE80c0VYWERHM3cifSwiZXhwIjoxNjA1NjIxNzE5fQ.oHKlRY89wv_r_Ynk558qKCLTzKOTwbovjKFl2WK0K7I";

  // Initial state
  initialState = {
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phoneCode: '',
    phoneNumber: '',
    addressLineOneError: "",
    addressLineTwoError: "",
    cityError: "",
    stateError: "",
    zipcodeError: "",
    countryError: "",
    phoneError: "",
    countries: [],
    states: [],
    cities: [],
    town="",
  }

  // State variable
  state = { ...this.initialState };

  async componentDidMount() {
    // console.log(Object.keys(this.props))

    // Setting countries on DOM render
    if (this.props.location || this.props.phone) {
      let countries = await this.getCountries()
      this.setState({ countries })
    }

  }



  // Fetching countries through API
  getCountries = async () => {
    const response = await fetch("https://www.universal-tutorial.com/api/countries/", {
      "method": "GET",
      "headers": {
        "Authorization": `Bearer ${this.auth_token}`,
        "Accept": "application/json"
      }
    })
    const data = await response.json();
    return data;
  }

  // Fetching states through API
  getStates = async (country) => {
    const response = await fetch(`https://www.universal-tutorial.com/api/states/${country}`, {
      "method": "GET",
      "headers": {
        "Authorization": `Bearer ${this.auth_token}`,
        "Accept": "application/json"
      }
    });
    const data = await response.json();
    return data;
  }

  // Fetching cities through API
  getCities = async (country) => {
    const response = await fetch(`https://www.universal-tutorial.com/api/cities/${country}`, {
      "method": "GET",
      "headers": {
        "Authorization": `Bearer ${this.auth_token}`,
        "Accept": "application/json"
      }
    });
    const data = await response.json();
    return data;
  }

  // On country change
  handleStates = async (country) => {
    if (country === "") {
      this.setState({ states: [], cities: [], state: "", city: "" });
    } else {
      let states = await this.getStates(country)
      // console.log(states)
      this.setState({ state: '', states, city: '', cities: [] })
    }
  }

  // On state change
  handleCities = async (state) => {
    if (state === "") {
      this.setState({ cities: [], state: "", city: "" });
    } else {
      let cities = await this.getCities(state)
      this.setState({ cities })
    }
  }

  // Handle input change
  handleChange = (event) => {
    // Modifying state value on input change
    // console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };

  // Form validation
  validateForm = () => {
    // console.log("Form validation");
    // Regex variable
    let re = '';

    // Declaring variables
    let addressLineOneError = '',
      addressLineTwoError = '',
      cityError = '',
      stateError = '',
      countryError = '',
      zipcodeError = '',
      phoneError = '';
      let towncodeError='';
    // Address Line 1 validation
    if (this.props.address) {
      if (this.state.addressLineOne) {
        re = /^[a-zA-Z0-9\s.,'-]{10,}$/;
        if (!re.test(this.state.addressLineOne)) {
          addressLineOneError = "Minimum length is 10 characters. Special characters not allowed";
        }
      } else {
        addressLineOneError = "Required"
      }
    }

    // Address Line 2 validation
    if (this.props.address) {
      if (this.state.addressLineTwo) {
        re = /^[a-zA-Z0-9\s.,'-]{0,}$/;
        if (!re.test(this.state.addressLineTwo)) {
          addressLineTwoError = "Invalid characters";
        }
      }
    }

      // Town validation
    if (this.props.town) {
      if (this.state.town) {
        re = /^[a-zA-Z0-9\s.,'-]{0,}$/;
        if (!re.test(this.state.town)) {
         towncodeError = "Invalid characters";
        }
      }
    }

    // City validation
    if (this.props.location) {
      if (this.state.cities.length !== 0) {
        // console.log(this.state.cities.length)
        if (!this.state.city) {
          cityError = "Required"
        }
      }
    }

    // State validation
    if (this.props.location) {
      if (this.state.states.length !== 0) {
        if (!this.state.state) {
          stateError = "Required"
        }
      }
    }

    // Country validation
    if (this.props.location) {
      if (this.state.country) {
        re = /^[a-zA-Z]{1,}$/;
        if (!re.test(this.state.country)) {
          countryError = "Select country from the options only";
        }
      } else {
        countryError = "Required"
      }
    }

    // Zipcode validation
    if (this.props.zipcode) {
      if (this.state.zipcode) {
        re = /^[\d-]{5,}$/;
        if (!re.test(this.state.zipcode)) {
          zipcodeError = "Minimum length should be 5 characters. Only numbers are allowed."
        }
      } else {
        zipcodeError = "Required"
      }
    }

    // Phone Number validation
    if (this.props.phone) {
      if (this.state.phoneNumber) {
        re = /^[\d]{4,15}$/;
        if (!re.test(this.state.phoneNumber)) {
          phoneError = "Length is incorrect. Only numbers are allowed."
        }
      } else {
        phoneError = "Phone number is required."
      }
    }

    // Phone code validation
    if (this.props.phone) {
      if (!this.state.phoneCode) {
        phoneError = "Phone code is required"
      }
    }

    if (this.props.phone) {
      if (!this.state.phoneCode && !this.state.phoneNumber) {
        phoneError = "Required"
      }
    }

    let checkError = !addressLineOneError && !addressLineTwoError && !cityError && !stateError && !zipcodeError && !countryError && !phoneError && !towncodeError
    // console.log('addressLineOneError', addressLineOneError, 'addressLineTwoError', addressLineTwoError, 'cityError', cityError, 'stateError', stateError, 'zipcodeError', zipcodeError, 'countryError', countryError, 'phoneError', phoneError)
    if (checkError) {
      return true;
    } else {
      // Updating state variables for error values
      this.setState({ addressLineOneError, addressLineTwoError, cityError, stateError, zipcodeError, countryError, phoneError,towncodeError })
      return false;
    }

  };

  // Error span
  errorSpan = (error) => {
    return error && <span className={classes.error}>{error}</span>;
  };

  // On blur event input handle
  validateInput = event => {
    const fieldName = event.target.name;
    const value = event.target.value;
    let errorMsg = '';

    let re = '';

    switch (fieldName) {
      case 'addressLineOne':
        if (this.state.addressLineOne) {
          re = /^[a-zA-Z0-9\s.,'-]{10,}$/;
          if (!re.test(this.state.addressLineOne)) {
            errorMsg = "Minimum length is 10 characters. Special characters not allowed.";
          }
        } else {
          errorMsg = "Required"
        }
        break;
      case 'addressLineTwo':
        if (this.state.addressLineTwo) {
          re = /^[a-zA-Z0-9\s.,'-]{0,}$/;
          if (!re.test(this.state.addressLineTwo)) {
            errorMsg = "Invalid characters";
          }
        }
        break;

         case 'town':
        if (this.state.town) {
          re = /^[a-zA-Z0-9\s.,'-]{0,}$/;
          if (!re.test(this.state.town)) {
            errorMsg = "Invalid characters";
          }
        }
        break;

      case 'city':
        if (this.state.cities.length !== 0) {
          if (!this.state.city) {
            errorMsg = "Required"
          }
        }
        break;
      case 'state':
        if (this.state.states.length !== 0) {
          if (!this.state.state) {
            errorMsg = "Required"
          }
        }
        break;
      case 'zipcode':
        if (this.state.zipcode) {
          re = /^[\d-]{5,}$/;
          if (!re.test(this.state.zipcode)) {
            errorMsg = "Minimum length should be 5 characters. Only numbers are allowed."
          }
        } else {
          errorMsg = "Required"
        }
        break;
      case 'country':
        if (this.state.country) {
          re = /^[a-zA-Z]{2,}$/;
          if (!re.test(this.state.country)) {
            errorMsg = "Select country from the options only";
          }
        } else {
          errorMsg = "Required"
        }
        break;
      case 'phoneCode':
        // Phone code validation
        if (!this.state.phoneCode) {
          errorMsg = "Phone code is required"
        }
        break;
      case 'phoneNumber':
        if (this.state.phoneNumber) {
          re = /^[\d]{4,15}$/;
          if (!re.test(this.state.phoneNumber)) {
            errorMsg = "Length is incorrect. Only numbers are allowed."
          }
        } else {
          errorMsg = "Phone number is required."
        }
        break;
      default:
        break;
    }
    if (fieldName === "phoneCode" || fieldName === "phoneNumber") {
      this.setState({ 'phoneError': errorMsg });
    } else {
      this.setState({ [fieldName + 'Error']: errorMsg });
    }
    if (!errorMsg) {
      this.setState({ [fieldName]: value });
    }
  }

  // On form submission
  onSubmit = () => {
    // e.preventDefault();
    const isValid = this.validateForm();
    // console.log(isValid)
    if (isValid) {
      const { addressLineOne, addressLineTwo, city, state, zipcode, country, phoneCode, phoneNumber } = this.state;
      let formData = {};
      if (this.props.address) {
        formData["addressLineOne"] = addressLineOne;
        formData["addressLineTwo"] = addressLineTwo;
      }
      if (this.props.location) {
        formData['country'] = country;
        formData['state'] = state;
        formData['city'] = city;
      }
      if (this.props.zipcode) {
        formData['zipcode'] = zipcode;
      }
      if (this.props.phone) {
        formData['phone'] = phoneCode + phoneNumber;
      }
      // console.log(formData)
      // console.log(formData);
      // POST data here
      this.setState({ ...this.initialState, countries: this.state.countries })
      return formData;
    } else {
      return false;
    }
  };

  render() {
    const { addressLineOne, addressLineOneError, addressLineTwo, addressLineTwoError, city, cityError, state, stateError, zipcode, zipcodeError, country, countryError, phoneCode, phoneNumber, phoneError } = this.state;

    const addressLines = this.props.address ? (
      <React.Fragment>
        <span>Address</span>
        <div className="required field">
          <label>Street Address</label>
          <div className="ui input">
            <input
              className={addressLineOneError ? classes.error : null}
              type="text"
              placeholder="Street Address"
              name="addressLineOne"
              onChange={this.handleChange}
              onBlur={this.validateInput}
              value={addressLineOne}
            />
          </div>
          {this.errorSpan(addressLineOneError)}
        </div>
        <div className="field">
          <label>Address Line 2</label>
          <div className="ui input">
            <input
              className={addressLineTwoError ? classes.error : null}
              type="text"
              placeholder="Address Line 2"
              name="addressLineTwo"
              onChange={this.handleChange}
              onBlur={this.validateInput}
              value={addressLineTwo}
            />
          </div>
          {this.errorSpan(addressLineTwoError)}
        </div>
      </React.Fragment>
    ) : null;

    const location = this.props.location ? (
      <div className="three fields">
        <div className="required field">
          <label>Country</label>
          <div className="ui input">
            <select
              className={countryError ? classes.error : null}
              name="country"
              onChange={(e) => {
                this.handleChange(e);
                this.handleStates(e.target.value);
              }}
              onBlur={this.validateInput}
              value={country}
            >
              <option value="">Select Country</option>
              {this.state.countries.map((country, index) => {
                return <option key={index} value={country.country_name} >{country.country_name}</option>
              })}
            </select>
          </div>
          {this.errorSpan(countryError)}
        </div>
        <div className="required field">
          <label>State</label>
          <div className="ui input">
            <select
              className={stateError ? classes.error : null}
              name="state"
              onChange={(e) => {
                this.handleChange(e);
                this.handleCities(e.target.value);
              }}
              onBlur={this.validateInput}
              value={state}
            >
              <option value="">Select state</option>
              {this.state.states.map((state, index) => {
                return <option key={index} value={state.state_name} >{state.state_name}</option>
              })}
            </select>
          </div>
          {this.errorSpan(stateError)}
        </div>
        <div className="required field">
          <label>State</label>
          <div className="ui input">
            <select
              className={cityError ? classes.error : null}
              name="city"
              onChange={(e) => {
                this.handleChange(e);
              }}
              onBlur={this.validateInput}
              value={city}
            >
              <option value="">Select city</option>
              {this.state.cities.map((city, index) => {
                return <option key={index} value={city.city_name} >{city.city_name}</option>
              })}
            </select>
          </div>
          {this.errorSpan(cityError)}
        </div>
      </div>
    ) : null;

    const zipcodeBlock = this.props.zipcode ? (
      <Grid.Column>
        <div className="required field">
          <label>Zip Code</label>
          <div className="ui input">
            <input
              className={zipcodeError ? classes.error : null}
              type="text"
              placeholder="Zip Code"
              name="zipcode"
              onChange={this.handleChange}
              onBlur={this.validateInput}
              value={zipcode}
            />
          </div>
          {this.errorSpan(zipcodeError)}
        </div>
      </Grid.Column>
    ) : null;

    const phoneBlock = this.props.phone ? (
      <Grid.Column>
        <div className="field">
          <label>Phone</label>
          <div className="ui input">
            <Input
              className={phoneError ? classes.error : null}
              label={
                <select
                  name="phoneCode"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                  onBlur={this.validateInput}
                  value={phoneCode}
                  style={{ width: 'auto' }}
                >
                  <option value="">Select phone code</option>
                  {this.state.countries.map((country, index) => {
                    return <option key={index} value={country.country_phone_code} >{`${country.country_short_name} (+${country.country_phone_code})`}</option>
                  })}
                </select>
              }
              name="phoneNumber"
              labelPosition='left'
              placeholder='Enter phone'
              onBlur={this.validateInput}
              value={phoneNumber}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
          </div>
          {this.errorSpan(phoneError)}
        </div>
      </Grid.Column>
    ) : null;

    const town = this.props.town ? (
      <Grid.Column>
        <div className="required field">
          <label>Town</label>
          <div className="ui input">
            <input
             className={towncodeError ? classes.error : null}
              type="text"
              placeholder="Town"
              name="town"
              onChange={this.handleChange}
              onBlur={this.validateInput}
              value={town}
            />
          </div>
          {this.errorSpan(towncodeError)}
        </div>
      </Grid.Column>
    ) : null;



    return (
      <div
        // onSubmit={this.onSubmit}
        className={`ui form ${classes.AddressBlock}`}
      >
        {addressLines}
        {location}

        <Grid stackable columns={2}>
        {town}
          {zipcodeBlock}
          {phoneBlock}
        </Grid>
      </div>
    );
  }
}

export default AddressBlock;
