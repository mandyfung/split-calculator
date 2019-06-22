import React from 'react';
import './App.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.errorMessage = "";
        this.state = {
            people: [{name:"", amount:""}],
            messages: [],
            error: ""
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
        let people = [...this.state.people];
        people[currentIndex] = {...people[currentIndex], [name]: value};
        this.setState({ people: people });
    };

    validateFields = () => {
        const validFields = this.state.people.every(person => person.name !== "" && person.amount !== "");
        if (!validFields) {
            this.setState({ error: "Please fill in every field." });
        } else {
            this.errorMessage = "";
            this.setState({ error: "" })
        }
    };

    calculateOwedAmounts = () => {
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
            const roundedAmount = owingAmount.toFixed(2);
            return { name: person.name, amount: roundedAmount };
        });

        let messages = [];
        amountOwing.forEach((owing, idx) => {
            if (owing.amount > 0) {
                const renderedMessage = <div key={idx}>{owing.name + " owes $" + owing.amount}</div>;
                messages.push(renderedMessage);
            }
        });

        if (this.errorMessage === "") {
            this.setState({
                messages: messages
            });
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        this.validateFields();
        this.calculateOwedAmounts();
    };

    clearForm = () => {
        this.setState({
            people: [{name:"", amount:""}],
            messages: []
        })
    };

    render() {
        return (
            <div className="container">
                <div className="controls">
                    <button className="common-button" onClick={this.addPerson}>Add</button>
                    <button className="common-button" onClick={this.clearForm}>Clear</button>
                </div>
                <div className={this.state.error !== "" ? "validation-msg" : ""}>{this.state.error}</div>
                <form className="calc-form" onSubmit={this.handleSubmit}>
                    {this.state.people.map((person, idx) => (
                        <div className="entry" key={idx}>
                            <input className="entry-input" placeholder="Name" type="text" name="name" value={person.name} onChange={this.handlePersonChange(idx)} />
                            <input className="entry-input" placeholder="Amount" type="number" name="amount" value={person.amount} onChange={this.handlePersonChange(idx)} />
                            <button className="remove-person" onClick={this.removePerson(idx)}>X</button>
                        </div>
                    ))}
                    <input className="submit-button" type="submit" value="Submit"/>
                </form>

                <div className={this.state.messages.length !== 0 ? "result" : ""}>{this.state.messages}</div>
            </div>
        );
    }
}

export default Form;
