import React, { Component } from "react";

class ChoosePages extends Component {
  constructor(props) {
    super(props);
    this.state = { checkedPagesQuantity: '' };
  }

  handleChangeChoosePages(event) {
    this.setState({ checkedPagesQuantity: event.target.value })
  }


  getChecked(num) {
    const checkedObj = {
      choose24: false,
      choose28: false,
      choose32: false,
    }
    if (num === '24') {
      checkedObj.choose24 = true;
      checkedObj.choose28 = false;
      checkedObj.choose32 = false;
    } else if (num === '28') {
      checkedObj.choose24 = false;
      checkedObj.choose28 = true;
      checkedObj.choose32 = false;
    } else if (num === '32') {
      checkedObj.choose24 = false;
      checkedObj.choose28 = false;
      checkedObj.choose32 = true;
    } else {
      checkedObj.choose24 = false;
      checkedObj.choose28 = false;
      checkedObj.choose32 = false;
    }
    return checkedObj;
  }

  render() {
    return (
      <React.Fragment>
        <fieldset className="choose-pages-fieldset">
          <legend>Количество полос</legend>
          <ul>
            <li className="choose-pages">
              <input
                name="pages"
                type="radio"
                className="choose-pages__radio"
                value="24"
                id="24"
                checked={this.getChecked(this.state.checkedPagesQuantity).choose24}
                onChange={this.handleChangeChoosePages}
              />
              <label htmlFor="24" className="choose-pages__lable"><span>24</span> полосы</label>
            </li>
            <li className="choose-pages">
              <input
                name="pages"
                type="radio"
                className="choose-pages__radio"
                value="28"
                id="28"
                checked={this.getChecked(this.state.checkedPagesQuantity).choose28}
                onChange={this.handleChangeChoosePages}
              />
              <label htmlFor="28" className="choose-pages__lable"><span>28</span> полос</label>
            </li>
            <li className="choose-pages">
              <input
                name="pages"
                type="radio"
                className="choose-pages__radio"
                value="32"
                id="32"
                checked={this.getChecked(this.state.checkedPagesQuantity).choose32}
                onChange={this.handleChangeChoosePages}
              />
              <label htmlFor="32" className="choose-pages__lable"><span>32</span> полосы</label>
            </li>
          </ul>
          <button onClick={this.props.handleNewPagesField} className="choose-pages__button">
            Создать раскладку
            </button>
        </fieldset>
      </React.Fragment>
    )
  }
}

export default ChoosePages;