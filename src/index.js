import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import GridModal from './Modals/GridModal.js';
import Game from './Game.js';
import './index.css';

  
  class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.toggleModals = {
          gridModalClicked: false,
        };

        this.state = {
            gameHasStarted: false,
            gridNumber: this.props.intialGridNumber,
            showWarningInputMessage: false,
            inputValue: '',
            showingOverlay: false,
            focusModal: false,
        };

        Object.assign(this.state, this.toggleModals);
    }

    componentDidUpdate (prevProps, prevState) {

      if (this.state.gridModalClicked === false && prevState.gridModalClicked === true) {
        this.setState({
          inputValue: '',
        })
      }
    };

    setStartOfGame = () => this.setState({ gameHasStarted: !this.state.gameHasStarted});

    closeEveryModal = () => {
      Object.keys(this.toggleModals).forEach(k => {
        
        this.setState(() => ({
         [k]: false,
         showingOverlay: false,
         focusModal: false,
       }));
  
      });
    };

    handleModal = (ev, modalTitle ) => {

      if (modalTitle === 'overlay') {
        
        this.closeEveryModal();

      } else {

        this.setState({
          [modalTitle]: !this.state[modalTitle],
          showingOverlay: !this.state.showingOverlay,
          focusModal: !this.state.focusModal,
        });

      }
    };

    closeModalWithSuccessBtn = (ev, modalTitle) => {

      this.setState({
        gameHasStarted: false,
        gridNumber: this.state.inputValue,
      });
      this.handleModal(ev, modalTitle);

    };

    handleChange = (ev, modal) => {

      const { gridNumber, showWarningInputMessage, gameHasStarted } = this.state;
      const targetValue = +ev.target.value;

      this.setState({ 
        inputValue: targetValue || '',
       });

      if (!targetValue || targetValue === gridNumber ) return;
      
      if (targetValue < 3 || targetValue > 7) {
        
        this.setState({
          showWarningInputMessage: true,
        })

        return;
      } else if (showWarningInputMessage) {
        this.setState({
          showWarningInputMessage: false,
        })
      }

      if (gameHasStarted && targetValue !== gridNumber) {
        this.handleModal(ev, modal);

        return;
      }

      this.setState({ gridNumber: targetValue});
    }

    render() {
        const { 
          gridNumber,
          showWarningInputMessage, 
          gridModalClicked,
          showingOverlay,
          focusModal,
          inputValue,
          gameHasStarted,
        } = this.state;

      return (
        <div className='main-container'>
          <div onClick={(ev) => this.handleModal(ev, 'overlay')}className={(showingOverlay) ? 'overlay' : ''}></div>
          <Game 
          gridNumber={gridNumber}
          gameHasStarted={gameHasStarted}
          setStartOfGame={this.setStartOfGame}
           />
          <div className="input-squares-container">
            <input 
              className="input-squares"
              type="number"
              min='0'
              step='1' 
              onChange={(ev) => this.handleChange(ev, 'gridModalClicked')}
              value={inputValue} 
              placeholder={this.state.gridNumber}/>
              <span className={`danger-span ${(showWarningInputMessage) ? '' : 'hide'}`}>Numbers are allowed from 3 to 7</span>
              <GridModal 
              modalState={gridModalClicked}
              handleModal={this.handleModal}
              successAction={this.closeModalWithSuccessBtn}
              focusModal={focusModal}
              />
          </div>
        </div>
      );
    }
  }

  App.propTypes = {
    initialGridNumber: PropTypes.number,
  };
  
  
  // ========================================
  // Read about control components and pure components and react terms
  // Chequear código antes de subir a GitHub
  // Dataset en html
  // Ejercicios React
  // 
  
  ReactDOM.render(
    <App intialGridNumber={3}/>,
    document.getElementById('root')
  );