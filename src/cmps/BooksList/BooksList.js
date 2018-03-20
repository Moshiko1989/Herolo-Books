// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// Components 
import { Loader } from '../Loader/Loader';
import { Book } from '../Book/Book';
import { MyForm } from '../MyForm/MyForm';
// Styles 
import './BooksList.css'

@inject('BookStore', 'ModalStore')
@observer
export class BooksList extends Component {
    componentDidMount() {
        this.props.BookStore.loadBooks().then(() => this.render())
    }

    deleteBook = bookId => {
        this.props.ModalStore.toggleDisplay(
            {
                content:
                'Are you sure you want to delete this book?',
                confirm:
                'delete',
                onSubmit:
                () => {
                    this.props.BookStore.deleteBook(bookId);
                    //this.renderList();
                    this.render();
                }
            })
    }

    addBook = book => {
        this.props.ModalStore.toggleDisplay(
            {
                content:
                <MyForm />,
                confirm:
                'Add new',
                onSubmit:
                () => {
                    this.props.BookStore.addBook(this.props.BookStore.bookGetter);
                    // this.renderList();
                    this.render();
                }
            })
    }

    render() {
        if (this.props.BookStore.fixedBooksGetter) {
            let list = this.props.BookStore.fixedBooksGetter.map(book => {
                return <Book book={book} key={book.id} deleteBook={this.deleteBook} addBook={this.addBook} />
            })
            return (
                <div className="book-list">
                    <button className="add-new" onClick={this.addBook}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                    <ul >
                        {list}
                    </ul>
                </div>
            )
        }
        return <Loader />
    }
}

