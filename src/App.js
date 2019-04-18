import React, { Component } from 'react';
import './css/style.css';
import HeaderMain from './header';
import FooterMain from './footer';
import ControlPanel from './control';
import MainBlock from './main';

class App extends Component {
  render() {
    return (
      <div className="all-blocks">
        <HeaderMain />
        <ControlPanel />
        <MainBlock />
        <FooterMain />
      </div>
    );
  }
}

export default App;
