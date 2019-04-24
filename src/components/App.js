import React, { Component } from 'react';
import HeaderMain from './HeaderMain';
import FooterMain from './FooterMain';
import ControlPanel from './ControlPanel';
import MainBlock from './MainBlock';

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
