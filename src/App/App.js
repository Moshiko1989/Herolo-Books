// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// Components
import { BooksList } from '../cmps/BooksList/BooksList';
import { Modal } from '../cmps/Modal/Modal';
import { Header } from '../cmps/Header/Header';
// Styles
import './App.css';
import 'bulma/css/bulma.css';
import logo from '../assets/BookLogo.png';

const logoInfo = {
  logo,
  alt: 'book logo'
}

@inject('BookStore', 'ModalStore')
@observer
class App extends Component {

  searchBooks = ev => {
    ev.preventDefault()
    let query = '';
    for (var child in ev.target.children) {
      if (ev.target.children[child].className !== 'search-bar') continue;
      query = ev.target.children[child].value;
      this.props.BookStore.loadBooks(query);
    }
  }

  render() {
    let modalProps = this.props.ModalStore.modalProps
    return (
      <div className="App" ref="App">
        <Header logoInfo={logoInfo} onSearch={this.searchBooks} />
        <Modal
          {...modalProps}
          clearCurrItemFromState={this.props.BookStore.clearCurrBook}
        />
        <BooksList />
      </div >
    )
  }
}

export default App;