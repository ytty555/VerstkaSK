import React, { Component } from 'react';
import './css/style.css';

function PagePair(props) {
    return (
      <div className="page-pair">
        <img className="page-pair-background" src={require('./img/pair.svg')} alt="Изображение разворота полос" />
        <div className="page page_pos_left page_color page_delegated page_make-up page_photo">
          <div className="page__el-background"></div>
          <div className="page__el-color"></div>
          <div className="page__el-number">{props.leftPage}</div>
          <button className="page__el-make-up"></button>
          <button className="page__el-photo"></button>
          <button className="page__el-delegated"></button>
        </div>
        <div className="page page_pos_right page_color page_delegated page_make-up page_photo">
          <div className="page__el-background"></div>
          <div className="page__el-color"></div>
          <div className="page__el-number">{props.rightPage}</div>
          <button className="page__el-make-up"></button>
          <button className="page__el-photo"></button>
          <button className="page__el-delegated"></button>
        </div>
      </div>
    );
}
class MainBlock extends Component {
  renderPagePair(leftP, rightP) {
    return <PagePair leftPage={leftP} rightPage={rightP}/>
  }

  render() {
    return (
      <main className="main-block">
        <section className="page-section">
          <h1 className="visually-hidden">Раскладка полос</h1>
          <div className="page-grid-container">
            {this.renderPagePair('02', '03')}
       
          </div>
        </section>
      </main>
    );
  }
}

export default MainBlock;
