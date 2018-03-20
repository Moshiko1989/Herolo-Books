import React from 'react';
import ModalStore from './store/ModalStore';
import BookStore from './store/BookStore';

export const required = value => {
  if (!value.toString().trim().length) {
    ModalStore.setDisabled('authors');
    ModalStore.setDisabled('title');
    ModalStore.setDisabled('date');
    return <div className="msg">This field is required</div>;
  } else {
    ModalStore.setEnabled('authors');
    ModalStore.setEnabled('title');
  }
};

export const exists = value => {
  let books = BookStore.fixedBooks;
  let exist = books.find(b => b.title.toLowerCase() === value.toLowerCase());
  
  exist ? ModalStore.setDisabled('exists') : ModalStore.setEnabled('exists');
  return exist ? <div className="msg">This book already exists</div> : null
}

export const date = value => {
  if (new Date(value).toString().includes('Invalid')) {
    ModalStore.setDisabled('date');
    return <div className="msg">"{value}" is not a valid date.</div>;
  } else ModalStore.setEnabled('date');
};
