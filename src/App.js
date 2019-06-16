import React from 'react';
import logo from './logo.svg';
import './App.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [{name:"", amount:""}],
            message: ''
        };
    }

    addPerson = () => {
        this.setState({
            people: this.state.people.concat([{
                name: "",
                amount: ""
            }])
        })
    };

    removePerson = currentIndex => () => {
        this.setState({
            people: this.state.people.filter((person, personIndex) => currentIndex !== personIndex)
        });
    };

    handlePersonChange = currentIndex => personEvent => {
        const { name, value } = personEvent.target;
        let people = [... this.state.people];
        people[currentIndex] = {... people[currentIndex], [name]: value};
        this.setState({ people: people });
    };

    handleSubmit = event => {
        const people = this.state.people;
        const parsedAmount =  people.map(person => {
            const amount = parseFloat(person.amount);
            if (isNaN(amount)) {
                return {name: person.name, amount: 0};
            }
            return {name: person.name, amount: amount};
        });
        const total = parsedAmount.map(person => person.amount).reduce((total, currentValue) => total + currentValue);
        const numOfPeople = people.length;
        const perPerson = total / numOfPeople;
        const amountOwing = parsedAmount.map(person => {
            const owingAmount = perPerson - person.amount;
            return {name:person.name, amount:owingAmount};
        });

        let message = "";
        amountOwing.forEach(owing => {
            console.log(owing);
            if (owing.amount > 0) {
                message += "Person " + owing.name + " needs to pay $" + owing.amount;
            }
        });

        this.setState({
            message: message
        });
        event.preventDefault();
    };

    render() {
        return ( <div>
            <form onSubmit={this.handleSubmit}>
            {this.state.people.map((person, idx) => (
                <div key={idx}>
                    <label>
                        Paid {idx}:
                        <input type="text" name="name" value={person.name} onChange={this.handlePersonChange(idx)} />
                        <input type="number" name="amount" value={person.amount} onChange={this.handlePersonChange(idx)} />
                        <button onClick={this.removePerson(idx)}>Remove person</button>
                    </label>
                </div>
            ))}
            <button onClick={this.addPerson}>Add person</button>
            <input type="submit" value="Submit" />
            </form>

            <div>Who pays who: <span>{this.state.message}</span></div>
        </div>
        );
    }
}

export default Form;
