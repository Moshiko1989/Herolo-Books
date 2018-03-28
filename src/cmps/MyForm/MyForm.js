// Extenions
import React, { Component } from 'react'
import { observer } from 'mobx-react';
// React Vlidation components
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
// Styles
import './MyForm.css';

@observer
export class MyForm extends Component {
    state = {
        formDetails: {...this.props.formDetails},
        InputsProps: this.props.InputsProps
    }

    onInputchange = ev => {
        let field = ev.target.name;
        let fieldValue = ev.target.value;
        let formDetails = {
            ...this.state.formDetails,
            [field]: fieldValue
        }
        this.setState({ formDetails });
        this.setCurrFormDetails(formDetails)
    }

    setCurrFormDetails = formDetails => {
        this.props.setCurrFormDetails(formDetails);
    }

    render() {
        let formDetails = this.state.formDetails;
        let InputsProps = this.state.InputsProps
        let Inputs = InputsProps.map((input, idx) => {
            let txtToLower = input.txt.toLowerCase();
            let txt = input.txt;
            let validation = Array.from(input.validation);
            return (
                <div key={idx}>
                    <h1>{txt}:</h1>
                    <Input
                        className="my-input"
                        type="text"
                        onChange={this.onInputchange}
                        placeholder={txt}
                        name={txtToLower}
                        value={formDetails[txtToLower]}
                        validations={validation}
                    />
                </div>
            )
        })

        return (
            <Form className="my-form">
                {Inputs}
            </Form>
        )
    }
}