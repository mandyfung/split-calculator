import React from 'react';
import logo from './logo.svg';
import './App.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {paid1: '', paid2:'', message:''};

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) {
    this.setState({paid1: event.target.value});
  }

  handleChange2(event) {
    this.setState({paid2: event.target.value});
  }

  handleSubmit(event) {
    const pay1 = this.state.paid1;
    const pay2 = this.state.paid2;
    const total = parseFloat(pay1) + parseFloat(pay2);
    const numOfPeople = 2;
    const perPerson = total / numOfPeople;
    const person1 = perPerson - pay1;
    const person2 = perPerson - pay2;

    let message = "";
    if (person1 > 0) {
        message += "Person one needs to pay $" + person1 + " to person two";
    }
    if (person2 > 0) {
        message += "Person two needs to pay $" + person2 + " to person one";
    }

    this.setState({message: message});
    event.preventDefault();
  }

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label>
                Paid 1:
                <input type="number" value={this.state.paid1} onChange={this.handleChange1} />
            </label>
            <label>
                Paid 2:
                <input type="number" value={this.state.paid2} onChange={this.handleChange2} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <div>Who pays who: <span>{this.state.message}</span></div>
      </div>
    );
  }
}

export default Form;
