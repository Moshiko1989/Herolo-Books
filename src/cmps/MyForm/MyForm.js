// Extenions
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';
// React Vlidation components
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
// My Validation functions
import { required, date, exists } from '../../validations';
// Style
import './MyForm.css';

@inject('BookStore')
@observer
export class MyForm extends Component {
    state = {
        bookDetails: this.props.BookStore.bookGetter || {}
    }

    onInputchange = ev => {
        let field = ev.target.name;
        let fieldValue = ev.target.value;
        let bookDetails = {
            ...this.state.bookDetails,
            [field]: fieldValue
        }
        this.setState({ bookDetails });
        this.props.BookStore.setCurrBook(bookDetails)
    }

    render() {
        let bookDetails = this.state.bookDetails
        return (
            <Form className="my-form">
                <div>
                    <h1>Title:</h1>
                    <Input
                        className="my-input"
                        placeholder="Title"
                        type="text"
                        value={bookDetails.title}
                        name="title"
                        validations={[required, exists]}
                        onChange={this.onInputchange}
                    />
                </div>
                <div>
                    <h1>Author(s):</h1>
                    <Input
                        className="my-input"
                        placeholder="Author"
                        type="text"
                        value={bookDetails.authors}
                        name="authors"
                        validations={[required]}
                        onChange={this.onInputchange}
                    />
                </div>
                <div>
                    <h1>Date:</h1>
                    <Input
                        className="my-input"
                        placeholder="Date"
                        type="text"
                        value={bookDetails.date}
                        name="date"
                        validations={[required, date]}
                        onChange={this.onInputchange}
                    />
                </div>
            </Form>
        )
    }
}