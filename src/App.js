import  React, { Component } from 'react';
import  './App.css';
import  Visa from './visa.png'

class App extends Component {
  constructor(props) {
     super(props);
     this.state = {
       "count" : 1, 
       "cardNumber" : null,
       "cardMonth"  : null,
       "cardYear"   : null,
       "cardCvc"    : null,
       "visaCard"   : false,
       "masterCard" : false,
       "total"      : "£123"
      };

     let activatepay      = false; 
     let error            = false;
     var cardNumberCheck  = false;
     var cardMonthCheck   = false;
     var cardYearCheck    = false;
     var cardCvcCheck     = false;

  } 

  handlePayButton = (context, checker) => { 

    if(context && this.isNumber(context.replace(/\s/g, ''))){
        switch(checker) {
            case "cardNumber":
                this.cardNumberCheck  = true
                break;
            case "cardMonth":
                this.cardMonthCheck   = true
                break;
            case "cardYear":
                this.cardYearCheck    = true
                break;
            default:
                this.cardNumberCheck  = false;
                this.cardMonthCheck   = false;
                this.cardYearCheck    = false;
        }
     }else{
          this.cardNumberCheck = false;
          this.cardMonthCheck = false;
          this.cardYearCheck = false;
     }
     if(this.cardNumberCheck && this.cardMonthCheck && this.cardYearCheck){
       this.activatepay = true;
     }else{
       this.activatepay = false;
     }
  }
  
  handlePayment = (event) => {
    this.disableInput("card-number");
    this.disableInput("month");
    this.disableInput("year");
    this.disableInput("cvc");
    document.getElementById("pay-btn").innerHTML = "Payment in process ..";
  }

  selectPaymethod = (event) => {
    if(event.target.id === "visaCard") {
       document.getElementById(event.target.id).classList.add('selected-class')
       document.getElementById("masterCard").classList.remove('selected-class')
    }else {
      document.getElementById(event.target.id).classList.add('selected-class')
      document.getElementById("visaCard").classList.remove('selected-class')
    }
  }

  disableInput = ($input) =>{
    document.getElementById($input).disabled = true;
    document.getElementById($input).classList.add('input-disabled')
  }

  validateCardNumber = (event) =>{
    this.setState({"cardNumber" : document.getElementById("card-number").value});
  }
  validateMonth = (event) => {
    this.setState({"cardMonth"  : document.getElementById("month").value});
  } 
  validateYear = (event) => {
    this.setState({"cardYear"   : document.getElementById("year").value});
  }
  validateCvc = (event) =>{
    this.setState({"cardCvc"    : document.getElementById("cvc").value});
  }
 isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  componentDidUpdate(){  
    this.handlePayButton(this.state.cardNumber, "cardNumber")
    this.handlePayButton(this.state.cardMonth, "cardMonth")
    this.handlePayButton(this.state.cardYear, "cardYear")
 
    if(this.activatepay){
        document.getElementById('pay-btn').removeAttribute('disabled')
        document.getElementById('pay-btn').classList.remove('input-disabled');
    }else{
        this.disableInput("pay-btn");
    }
  }

  render() {
    return (
        <div className="wrapper">
            <div className="col-md-12 col-sm-12" id="error-label"></div>
            <div className="col-md-12 col-sm-12 margin-bottom">
              <input type="text" className="form-control" 
                onKeyUp={this.validateCardNumber} id="card-number" placeholder="Card Number" />
            </div>
            <div className="col-md-3 col-sm-6 margin-bottom" >
              <input type="text" id="month" className="form-control" 
                onKeyUp={this.validateMonth}  placeholder="Month"/>
            </div>
            <div className="col-md-3 col-sm-6 margin-bottom" >
              <input type="text" id="year" className="form-control" 
                onKeyUp={this.validateYear}  placeholder="Year"/>
            </div>
            <div className="col-md-3 col-sm-6 margin-bottom" >
              <input type="text" className="form-control"   id="cvc"
                onKeyUp={this.validateCvc} placeholder="CW/CVC"/>
            </div>
            <div className="col-md-3 col-sm-6 margin-bottom" >
                  <div className="cc-selector">
                    <label className="drinkcard-cc visa" id="visaCard"
                      onClick={this.selectPaymethod} ></label>
                    <label className="drinkcard-cc mastercard"  id="masterCard"
                      onClick={this.selectPaymethod} ></label>
                </div>
            </div>
            <div className="col-md-12 col-sm-12   margin-bottom">
              <div className="col-md-12 col-sm-12 total-amount-display">
                  <div className="pull-left">Total</div>
                  <div className="pull-right">{this.state.total}</div>  
              </div>
                 
            </div>
            <div className="col-md-12 col-sm-12 margin-bottom" onClick={this.handlePayment}>
              <button className="payment-btn input-disabled" 
                id="pay-btn" disabled>PROCEED TO SECURE PAYMENT</button>
            </div>
        </div>
    );
  }
}
export default App;
