// Extentions
import React, { Component } from 'react';
import { observer } from 'mobx-react';
// Styles 
import './Book.css';

@observer
export class Book extends Component {
    state = {
        bookHtml: null,
    }

    componentDidMount() {
        this.renderBook(this.props.book)
    }

    deleteBook = () => {
        this.props.deleteBook(this.props.book.id)
    }

    editBook = () => {
        let book = this.props.book;
        this.props.editBook(book);
    }

    getValidImgSrc = book => {
        const generalBookUrl = 'https://image.flaticon.com/icons/png/128/166/166088.png';
        if (book.originalBook) {
            if (book.originalBook.volumeInfo) {
                if (book.originalBook.volumeInfo.imageLinks) {
                    if (book.originalBook.volumeInfo.imageLinks.smallThumbnail) {
                        return book.originalBook.volumeInfo.imageLinks.smallThumbnail;
                    }
                }
            }
        }
        return generalBookUrl;
    }

    getFormatedTitle = book => {
        if (book.title) {
            return book.title.replace(/[^0-9a-zA-Zא-ת ]+/g, '').toLowerCase();
        }
    }

    renderBook = book => {
        let smallImgSrc = this.getValidImgSrc(book);
        let authors = book.authors
        let date = new Date(book.date)
        let title = this.getFormatedTitle(book);

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

    render() {
        return this.state.bookHtml;
    }
}

