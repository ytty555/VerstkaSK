class GridOfPages {
    constructor(pages) {
        this.pages = pages;
    }
    
    init() {
        let numPages = this.pages;

        function getCoordinatesNumberPage(page) {
            let row, col;
            // Функция возвращает объект с ключами-координатами: столбец и строка. Координаты начинаются с 1
            if (page % 2) {
                col = 2;
                row = (page + 1) / 2;
            } else {
                col = 1;
                if (page == numPages) {
                    row = 1;
                } else {
                    row = (page + 2) / 2;
                }
            }
            return {
                row: row,
                col: col
            };
        }

        // Модуль функций для создания элементов DataView
        function createElementsDataView() {
            let createRow = function(rowNumber) {
                let div = document.createElement('div');
                div.className = 'row';
                div.dataset.rowNumber = rowNumber;
                return div;
            };
            
            let createPagePair = function() {
                let div = document.createElement('div');
                div.className = 'b-page-pair col-xs-4';
                return div;
            };

            let createPage = function(isColor, orientation, isVerstkaDone = false, isFotoDone = false) {
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

            let createHeader = function() {
                let div = document.createElement('div');
                div.className = 'b-page-header';
                return div;
            };
            
            let createFooter = function() {
                let div = document.createElement('div');
                div.className = 'b-page-footer';
                return div;
            };
            
            let createHeaderFoto = function() {
                let div = document.createElement('div');
                div.className = 'b-page-header__foto';
                return div;
            };
            
            let createHeaderVerstka = function() {
                let div = document.createElement('div');
                div.className = 'b-page-header__verstka';
                return div;
            };
            
            let createHeaderNumberFon = function() {
                let div = document.createElement('div');
                div.className = 'b-page-header__number-fon';
                return div;
            };
            
            let createHeaderNumberNum = function(num) {
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

        function drawPagesSheet() {
            const containerDataView = document.querySelector('section.b-data-view');
            let el = createElementsDataView();
            for (let i = 1; i <= numPages; i++) {
                let currentRow = containerDataView.appendChild(el.createRow(i));
                let currentPagePair = currentRow.appendChild(el.createPagePair());
                
                // Левая Page
                let currentPageLeft = currentPagePair.appendChild(el.createPage(true, 'left'));
                {
                    let curentPageHeader = currentPageLeft.appendChild(el.createHeader());
                    {
                        curentPageHeader.appendChild(el.createHeaderVerstka());
                        curentPageHeader.appendChild(el.createHeaderFoto());
                        let currentNumFon = curentPageHeader.appendChild(el.createHeaderNumberFon());
                        {
                            currentNumFon.appendChild(el.createHeaderNumberNum(88));
                        }
                    }
                    currentPageLeft.appendChild(el.createFooter());
                } // конец левой Page
                
                // Правая Page
                let currentPageRight = currentPagePair.appendChild(el.createPage(false, 'right'));
                {
                    let curentPageHeader = currentPageRight.appendChild(el.createHeader());
                    {
                        curentPageHeader.appendChild(el.createHeaderVerstka());
                        curentPageHeader.appendChild(el.createHeaderFoto());
                        let currentNumFon = curentPageHeader.appendChild(el.createHeaderNumberFon());
                        {
                            currentNumFon.appendChild(el.createHeaderNumberNum(88));
                        }
                    }
                    currentPageRight.appendChild(el.createFooter());
                } // конец правой Page

            } // конец цикла for

        }

        drawPagesSheet();    
    }
}

let grid = new GridOfPages(12);
grid.init();
