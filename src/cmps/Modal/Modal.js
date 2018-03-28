// Extentions
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// Styles 
import './Modal.css';

const ESC_KEY_CODE = 27;

@inject('ModalStore')
@observer
export class Modal extends Component {
  closeModal = (ev) => {
    if (!ev.keyCode || ev.keyCode === ESC_KEY_CODE) {
      this.props.ModalStore.toggleDisplay();
      this.clearCurrItemFromState()
    }
  }

  clearCurrItemFromState = () => {
    this.props.clearCurrItemFromState()
  }

  isDisableBtn = () => {
    return (
      this.props.isDelete ?
        false :
        this.props.ModalStore.disabledGetter
    )
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
    } else console.log('somthing went wrong...')

    let isDisabled = this.isDisableBtn()

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