import React, {
  Component
} from 'react';
import FooterMain from './FooterMain/FooterMain';
import MainBlock from './MainBlock/MainBlock';

class App extends Component {
  render() {
    return ( <
      div className = "all-blocks" >
      <
      MainBlock / >
      <
      FooterMain / >
      <
      /div>
    );
  }
}

export default App;