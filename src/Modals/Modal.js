import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modals.css';

const noop = () => {};

class Modal extends Component {
  
  constructor(props) {
    super(props); 

    this.divToFocus = null;

    this.setDivFocus = element => {
      this.divToFocus = element;
    };

    this.focusDiv = () => {
      this.divToFocus.focus();
    };
  }

  componentDidUpdate() {

    if (this.props.focusDiv) {

      this.focusDiv();

    }
  }

  closeModalOnKeyPress = (ev, title) => {
    switch (ev.which) {
      case 27: //ESC
        return this.props.closeModal(ev, title);
      case 13: //ENTER
        return this.props.closeSuccessModal(ev, title);
      default:
        noop();
    };

  };

  render() {

    const { modalState, children, title } = this.props;

    return (
      <div ref={this.setDivFocus}
           tabIndex={1} 
           className={`globalAlert ${(modalState) ? '' : 'hide'}`}
           onKeyDown={(ev) => this.closeModalOnKeyPress(ev)}>
        <div className='modalContainer'>
          <div className='modalTextContainer'>
            <span className='modalTitle'>{title}</span>
          </div>
          {children}
        </div>
      </div>
      );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  modalState: PropTypes.bool.isRequired,
  closeSuccessModal: PropTypes.func,
  closeModal: PropTypes.func,
  focusDiv: PropTypes.bool,
};

export default Modal;