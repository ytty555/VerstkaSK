class GridOfPages {
    constructor(pages) {
        this.pages = pages;
    }

    init() {
        let numPages = this.pages;

        // function getCoordinatesNumberPage(page) {
        //     let row, col;
        //     // Функция возвращает объект с ключами-координатами: столбец и строка. Координаты начинаются с 1
        //     if (page % 2) {
        //         col = 2;
        //         row = (page + 1) / 2;
        //     } else {
        //         col = 1;
        //         if (page == numPages) {
        //             row = 1;
        //         } else {
        //             row = (page + 2) / 2;
        //         }
        //     }
        //     return {
        //         row: row,
        //         col: col
        //     };
        // }

        // Модуль функций для создания элементов DataView
        function createElementsDataView() {
            let createRow = function (rowNumber) {
                let div = document.createElement('div');
                div.className = 'row';
                div.dataset.rowNumber = rowNumber;
                return div;
            };

            let createPagePair = function () {
                let div = document.createElement('div');
                div.className = 'b-page-pair col-xs-4';
                return div;
            };

            let createPage = function (isColor, orientation, isVerstkaDone = false, isFotoDone = false) {
                let classNameStr = 'b-page';
                let div = document.createElement('div');

                // Добавляем соответствующие классы в строку классов, в зависимости от параметров функции   
                classNameStr += isColor ? ' b-page_color' : '';
                classNameStr += (orientation === 'left') ? ' b-page_orientation_left' : (orientation === 'right') ? ' b-page_orientation_right' : '';
                classNameStr += isVerstkaDone ? ' b-page_verstka-done' : '';
                classNameStr += isFotoDone ? ' b-page_foto-done' : '';

                div.className = classNameStr;
                return div;
            };

            let createHeader = function () {
                let div = document.createElement('div');
                div.className = 'b-page-header';
                return div;
            };

            let createFooter = function () {
                let div = document.createElement('div');
                div.className = 'b-page-footer';
                return div;
            };

            let createHeaderFoto = function () {
                let div = document.createElement('div');
                div.className = 'b-page-header__foto';
                return div;
            };

            let createHeaderVerstka = function () {
                let div = document.createElement('div');
                div.className = 'b-page-header__verstka';
                return div;
            };

            let createHeaderNumberFon = function () {
                let div = document.createElement('div');
                div.className = 'b-page-header__number-fon';
                return div;
            };

            let createHeaderNumberNum = function (num) {
                let div = document.createElement('div');
                div.className = 'b-page-header__number';
                div.innerHTML = num;
                return div;
            };

            return {
                createRow,
                createPagePair,
                createPage,
                createHeader,
                createFooter,
                createHeaderFoto,
                createHeaderVerstka,
                createHeaderNumberFon,
                createHeaderNumberNum,
            };

        }
        
        function drawRow(container, rowNumber) {
            const elL = createElementsDataView();
            const elR = createElementsDataView();
            
            let currentRow = container.appendChild(elL.createRow(rowNumber));
            // -------------------------Левая половина всех полос -------------------------
            drawPagePair(elL, currentRow);
            
            // -------------------------Правая половина всех полос -------------------------
            drawPagePair(elR, currentRow);
        }
        
        function drawPagePair(elementObj, currentRow) {
            let currentPagePair = currentRow.appendChild(elementObj.createPagePair());

            // Левая Page
            let currentPageLeft = currentPagePair.appendChild(elementObj.createPage(true, 'left')); {
                let curentPageHeader = currentPageLeft.appendChild(elementObj.createHeader()); {
                    curentPageHeader.appendChild(elementObj.createHeaderVerstka());
                    curentPageHeader.appendChild(elementObj.createHeaderFoto());
                    let currentNumFon = curentPageHeader.appendChild(elementObj.createHeaderNumberFon()); {
                        currentNumFon.appendChild(elementObj.createHeaderNumberNum(88));
                    }
                }
                currentPageLeft.appendChild(elementObj.createFooter());
            } // конец левой Page

            // Правая Page
            let currentPageRight = currentPagePair.appendChild(elementObj.createPage(false, 'right')); {
                let curentPageHeader = currentPageRight.appendChild(elementObj.createHeader()); {
                    curentPageHeader.appendChild(elementObj.createHeaderVerstka());
                    curentPageHeader.appendChild(elementObj.createHeaderFoto());
                    let currentNumFon = curentPageHeader.appendChild(elementObj.createHeaderNumberFon()); {
                        currentNumFon.appendChild(elementObj.createHeaderNumberNum(88));
                    }
                }
                currentPageRight.appendChild(elementObj.createFooter());
            } // конец правой Page
        }

        function drawPagesSheet() {
            const containerDataView = document.querySelector('section.b-data-view');

            for (let i = 1; i <= numPages; i++) {
                drawRow(containerDataView, i);

            } // конец цикла for

        }

        drawPagesSheet();
    }
}


let grid = new GridOfPages(6);
grid.init();