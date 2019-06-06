import React from "react";

function CommonInfo(props) {
  const pagesMakeUp = props.pagesInfo.pagesMakeUp;
  const pagesDelegated = props.pagesInfo.pagesDelegated;
  const pagesPhoto = props.pagesInfo.pagesPhoto;
  const { pagesQuantity } = props;
  return (
    <React.Fragment>
      <fieldset className="common-info-fieldset">
        <legend>Обобщая информация</legend>
        <table>
          <tr>
            <td className="control-text">
              Всего полос:
              </td>
            <td className="control-number">
              {pagesQuantity}
            </td>
          </tr>
          <tr>
            <td className="control-text">
              Сверстано:
              </td>
            <td className="control-number">
              {pagesMakeUp + pagesDelegated}
            </td>
          </tr>
          <tr>
            <td className="control-text">
              Не сверстано:
              </td>
            <td className="control-number">
              {pagesQuantity - (pagesMakeUp + pagesDelegated)}
            </td>
          </tr>
          <tr>
            <td className="control-text">
              Фото обработать:
              </td>
            <td className="control-number">
              {pagesMakeUp - pagesPhoto}
            </td>
          </tr>
        </table>
      </fieldset>
    </React.Fragment>
  )
}

export default CommonInfo;