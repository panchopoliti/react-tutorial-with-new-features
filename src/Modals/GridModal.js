import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.js';
import './Modals.css';

class GridModal extends Component {

  closeModal = (ev) => this.props.handleModal(ev, 'gridModalClicked');

  closeSuccessModal = (ev) => this.props.successAction(ev, 'gridModalClicked');

  render() {

    const { modalState, focusModal } = this.props;

    return (
        <Modal modalState={modalState}
             title='¿Está seguro que desea empezar una nueva partida?'
             closeSuccessModal={this.closeSuccessModal}
             closeModal={this.closeModal}
             focusDiv={focusModal}
             >  
            <div className={'buttonsInModalContainer'}>
                <div className={'alertButton buttonsInModal'} onClick={this.closeModal}>Cancelar</div>
                <div className={'successButton buttonsInModal'} onClick={this.closeSuccessModal}>Aceptar</div>
            </div>
        </Modal>
    )
  }
}

GridModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  successAction: PropTypes.func,
  focusModal: PropTypes.bool,
};

export default GridModal;