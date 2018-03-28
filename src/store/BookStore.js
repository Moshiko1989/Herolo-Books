// Extentions
import { computed, observable, action, useStrict } from 'mobx';
// Services
import BookService from '../services/BookService';
// My Validation functions
import { required, date, exists } from '../validations';


useStrict(true)

class BookObservableStore {
    // State
    @observable books = null;
    @observable fixedBooks = null;
    @observable currBook = null;
    @observable formsInputsProps = [
        {
            txt: 'Title',
            validation: [required, exists]
        },
        {
            txt: 'Authors',
            validation: [required]
        },
        {
            txt: 'Date',
            validation: [required, date]
        },
    ]
    @observable newId = 'x';

    // Observing functions
    @computed get booksGetter() {
        return this.books;
    }

    @computed get fixedBooksGetter() {
        return this.fixedBooks;
    }

    @computed get bookGetter() {
        return this.currBook;
    }

    @computed get formsInputsPropsGetter() {
        return this.formsInputsProps;
    }

    // Changing State syncronously
    @action _setBooks = books => {
        this.books = books;
    }

    @action _setFixedBooks = fixedBooks => {
        this.fixedBooks = fixedBooks;
    }

    @action _setCurrBook = book => {
        this.currBook = book;
    }


    @action _deleteBook = bookId => {
        let book = this.fixedBooks.find(book => book.id === bookId);
        let bookIdx = this.fixedBooksGetter.indexOf(book);
        this.fixedBooks.splice(bookIdx, 1);
    }

    @action _addBook = book => {
        this.fixedBooks.push(book);
        this.newId += 'x';
    }

    @action _editBook = bookId => {
        let book = this.fixedBooks.find(book => book.id === bookId);
        let idx = this.fixedBooks.indexOf(book);
        this.fixedBooks[idx] = this.currBook;
    }

    @action _clearCurrBook = () => this.currBook = null;

    // Accesses from components & pages
    loadBooks = query => {
        return BookService.getBooks(query)
            .then(booksHead => {
                let books = booksHead.data.items
                
                if (!books) return {};
                this._setBooks(books)

                let fixedBooks = books.map(book => {
                    let authors = book.volumeInfo.authors ?
                    book.volumeInfo.authors.toString() :
                    'unknown';

                    return {
                        authors,
                        date: book.volumeInfo.publishedDate,
                        title: book.volumeInfo.title,
                        id: book.id,
                        originalBook: book
                    }
                })
                this._setFixedBooks(fixedBooks)
            })
    }

    deleteBook = bookId => {
        this._deleteBook(bookId);
    }

    addBook = book => {
        book.id = this.newId;
        this._addBook(book);
        this.clearCurrBook();
    }

    editBook = bookId => {
        this._editBook(bookId);
    }

    setCurrBook = book => {
        this._setCurrBook(book);
    }

    clearCurrBook = () => {
        this._clearCurrBook();
    }
}


const BookStore = new BookObservableStore();
export default BookStore