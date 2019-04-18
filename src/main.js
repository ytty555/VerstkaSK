import React, { Component } from 'react';
import './css/style.css';

{/* <div className="page page_pos_left page_color page_delegated page_make-up page_photo"> */}
function ElMakeUp(props) {
  return (
    <button className="page__el-make-up"></button>
  );
}

function ElPhoto(props) {
  let classN = 'page__el-photo';

  if (props.value) {
    classN += ' page_photo';
  }

  return (
    <button className="page__el-photo"></button>
  );
}

function ElDelegated(props) {
  return (
    <button className="page__el-delegated"></button>
  );
}

function Page(props) {
  let classN ='page ' + props.pos + ' ' + props.color;
  return (
    <div className={classN}>
      <div className="page__el-background"></div>
      <div className="page__el-color"></div>
      <div className="page__el-number">{props.pageNum}</div>
      <ElMakeUp value={props.makeup} />
      <ElPhoto value={props.photo}/>
      <ElDelegated value={props.delegated}/>
      
    </div>
  );
}

function PagePair(props) {
  return (
    <div className="page-pair">
      <img className="page-pair-background" src={require('./img/pair.svg')} alt="Изображение разворота полос" />
      <Page pageNum={props.leftPage} pos='page_pos_left' color='page_color' delegated='page_delegated' makeup='' photo={1} />
      <Page pageNum={props.rightPage} pos='page_pos_right' color='' delegated='' makeup='page_make-up' />
    </div>
  );
}
class MainBlock extends Component {
  renderPagePair(leftP, rightP) {
    return <PagePair leftPage={leftP} rightPage={rightP} />
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
