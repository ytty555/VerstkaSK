import React, { Component } from "react";

class ChoosePages extends Component {
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
                id="24"
              />
              <label htmlFor="24" className="choose-pages__lable"><span>24</span> полосы</label>
            </li>
            <li className="choose-pages">
              <input
                name="pages"
                type="radio"
                className="choose-pages__radio"
                id="28"
              />
              <label htmlFor="28" className="choose-pages__lable"><span>28</span> полос</label>
            </li>
            <li className="choose-pages">
              <input
                name="pages"
                type="radio"
                className="choose-pages__radio"
                id="32"
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