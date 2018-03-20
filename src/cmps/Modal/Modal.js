import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './Modal.css';

@inject('BookStore', 'ModalStore')
@observer
export class Modal extends Component {
  closeModal = (ev) => {
    if (!ev.keyCode || ev.keyCode === 27) {
      this.props.ModalStore.toggleDisplay();
      this.props.BookStore.clearCurrBook();
    }
  }

  submitForm = ev => {
    this.props.onSubmit();
    this.closeModal(ev);
  }

  render() {
    let display = this.props.ModalStore.displayGetter;
    
    if (display === 'block') {
      document.addEventListener('keyup', this.closeModal);
    } else if (display === 'none') {
      document.removeEventListener('keyup', this.closeModal);
    }

    let isDisabled = this.props.ModalStore.disabledGetter
    return (
      <div className="modal modal-component" ref="modal" style={{ display }}>
        <div className="modal-background" onClick={this.closeModal}></div>
        <div className='modal-card'>
          <header className="modal-card-head">
            <p className="modal-card-title"></p>
            <button className="delete" aria-label="close" onClick={this.closeModal}></button>
          </header>
          <section className="modal-card-body">
            {this.props.content}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" disabled={isDisabled} onClick={this.submitForm}>{this.props.confirm}</button>
            <button className="button cancel" onClick={this.closeModal}>Cancel</button>
          </footer>
        </div>
      </div>
    )
  }
}