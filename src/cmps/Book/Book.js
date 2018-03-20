// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// Components 
import { MyForm } from '../MyForm/MyForm';
// Styles 
import './Book.css'

@inject('BookStore', 'ModalStore')
@observer
export class Book extends Component {
    state = {
        bookHtml: null,
    }

    componentDidMount() {
        this.renderBook(this.props.book)
    }

    renderBook = book => {
        let smallImgSrc;
        if (book.originalBook) {
            smallImgSrc = book.originalBook.volumeInfo.imageLinks.smallThumbnail;
        }
        let authors = book.authors
        let date = new Date(book.date)
        let title;
        if (book.title) {
            title = book.title.replace(/[^0-9a-zA-Z ]+/g, '').toLowerCase();
        }
        let bookHtml = (
            <li className="book">
                <div className="book-txt">
                    <div className="author-container">
                        <h1>Author: <span>{authors}</span></h1>
                    </div>
                    <div className="date-container">
                        <h1>Date: <span>{date.toDateString()}</span></h1>
                    </div>
                    <div className="title-container">
                        <h1>Title: <span className='book-title'>{title}</span></h1>
                    </div>
                </div>
                <div className="img-container">
                    <img src={smallImgSrc} alt="Book Thumbnail" />
                </div>
                <div className="btns-container">
                    <button onClick={this.editBook}>
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </button>
                    <button onClick={this.deleteBook}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </li>
        )
        this.setState({ bookHtml })
    }

    deleteBook = () => {
        this.props.deleteBook(this.props.book.id)
    }

    editBook = editedBook => {
        this.props.BookStore.setCurrBook(this.props.book);
        this.props.ModalStore.toggleDisplay(
            {
                content:
                <MyForm />,
                confirm:
                'Save changes',
                onSubmit:
                () => {
                    this.props.BookStore.editBook(this.props.BookStore.bookGetter.id);
                    this.renderBook(this.props.BookStore.bookGetter);
                }
            })
    }

    render() {
        return this.state.bookHtml;
    }
}

