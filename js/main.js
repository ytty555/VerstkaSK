class GridOfPages {
    constructor(pages) {
        this.pages = pages;
        this.pairs = this.pages / 2; // Пары полос: правая полоса (нечетная) и левая полоса (четная)
        this.pagesInOnePart = this.pairs / 2; // Количество полос в правой или левой части отображения
    }

    init() {
        let numPages = this.pages;
        let numPairs = this.pairs;
        let numPagesInOnePart = this.pagesInOnePart;


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

        function drawRow(container, rowNumber, pagesNumbersInRow) {
            const elL = createElementsDataView();
            const elR = createElementsDataView();

            let currentRow = container.appendChild(elL.createRow(rowNumber));
            // -------------------------Левая половина всех полос -------------------------
            drawPagePair(elL, currentRow, pagesNumbersInRow[0]);

            // -------------------------Правая половина всех полос -------------------------
            drawPagePair(elR, currentRow, pagesNumbersInRow[1]);
        }

        function drawPagePair(elementObj, currentRow, pagesNumbers) {
            let currentPagePair = currentRow.appendChild(elementObj.createPagePair());
            // Левая полоса (четная) в развороте
            drawPage(elementObj, currentPagePair, pagesNumbers[0], false, 'left', false, false);
            // Правая полоса (не четная) в развороте
            drawPage(elementObj, currentPagePair, pagesNumbers[1], false, 'right', false, false);
        }

        function drawPage(elementObj, currentPagePair, numberPage, color, orientation, verstkaDone, fotoDone) {
            let currentPageLeft = currentPagePair.appendChild(elementObj.createPage(color, orientation, verstkaDone, fotoDone));

            let curentPageHeader = currentPageLeft.appendChild(elementObj.createHeader()); {
                curentPageHeader.appendChild(elementObj.createHeaderVerstka());
                curentPageHeader.appendChild(elementObj.createHeaderFoto());
                let currentNumFon = curentPageHeader.appendChild(elementObj.createHeaderNumberFon()); {
                    currentNumFon.appendChild(elementObj.createHeaderNumberNum(numberPage));
                }
            }
            currentPageLeft.appendChild(elementObj.createFooter());
        }

        function getPagesNumbersInRow(numPages, row) {
            let pagesNumbersInRow = [['02','03'], ['12','13']];
            let pageLpartL, pageRpartL; 
            let pageLpartR, pageRpartR;

            function twoDigitsString(num) {
                return num < 10 ? '0' + num : '' + num;  
            }
            // Левая часть строки -----------------------------------------
            // Левая полоса разворота в левой части строки
            pageLpartL = (2 * row - 2) === 0 ? numPages : (2 * row - 2);
            // Правая полоса разворота в левой части строки
            pageRpartL = 2 * row - 1;
            // ------------------------------------------------------------

            // Правая часть строки -----------------------------------------
            // Левая полоса разворота в правой части строки
            pageLpartR = (2 * row - 2) + (numPages / 2);
            // Правая полоса разворота в правой части строки
            pageRpartR = (2 * row - 1) + (numPages / 2);
            // ------------------------------------------------------------

            return pagesNumbersInRow;
        }

        function drawPagesSheet() {
            const containerDataView = document.querySelector('section.b-data-view');
            for (let i = 1; i <= numPagesInOnePart; i++) {
                let pagesNumbersInRow = getPagesNumbersInRow(numPages, i);
                drawRow(containerDataView, i, pagesNumbersInRow);

            } // конец цикла for

        }

        drawPagesSheet();
    }
}


let grid = new GridOfPages(24);
grid.init();