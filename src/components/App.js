import React, { Component } from 'react';
import FooterMain from './FooterMain/FooterMain';
import ControlPanel from './ControlPanel/ControlPanel';
import MainBlock from './MainBlock/MainBlock';

class App extends Component {
  render() {
    return (
      <div className="all-blocks">
        <ControlPanel />
        <MainBlock />
        <FooterMain />
      </div>
    );
  }
}

export default App;
