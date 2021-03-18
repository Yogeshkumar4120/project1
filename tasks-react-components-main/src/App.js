import React from "react";
import './App.css';
import AddressBlock from './Components/FormAddressComponent/AddressBlock';
import NameBlock from './Components/FormNameComponent/NameBlock';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.addressBlockRef = React.createRef();
    this.nameBlockRef = React.createRef();
  }

  nameValidate = () => {
    return this.nameBlockRef.current.onSubmit();
  }

  addressValidate = () => {
    return this.addressBlockRef.current.onSubmit();
  }
  onSubmit = (e) => {
    e.preventDefault();
    // const nameValidCheck = this.nameValidate();
    // if(nameValidCheck){
    //   console.log(nameValidCheck)
    // }
    const addressValidCheck = this.addressValidate();
    if (addressValidCheck) {
        console.log(addressValidCheck)
      }

    /* const nameValidCheck = this.nameValidate();
    const addressValidCheck = this.addressValidate();
    if(nameValidCheck && addressValidCheck){
      const formData = {...nameValidCheck, ...addressValidCheck}
      console.log(formData);
    } */
  }

  render() {
    return (
      <div>
        {/* <NameBlock /> */}
        <form onSubmit={this.onSubmit}>
          <NameBlock ref={this.nameBlockRef} />
          {/* <AddressBlock ref={this.addressBlockRef} address location phone zipcode /> */}
          <button type="submit" className="ui button btn btn-theme">
            Submit
        </button>
        </form>
      </div>
    );
  }
}

export default App;
