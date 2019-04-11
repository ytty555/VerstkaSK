class GridOfPages {
    constructor(pages) {
        this.pages = pages;
        this.pairs = this.pages / 2; // Пары полос: правая полоса (нечетная) и левая полоса (четная)
        this.pagesInOnePart = this.pairs / 2; // Количество полос в правой или левой части отображения

        // Цветовые раскладки
        this.colorScheme = {
            scheme24: [1, 2, 3, 4, 9, 10, 11, 12, 13, 14, 15, 16, 21, 22, 23, 24],
            scheme28: [1, 2, 3, 4, 11, 12, 13, 14, 15, 16, 17, 18, 25, 26, 27, 28],
            scheme32: [1, 2, 3, 4, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 31, 32],
        };

    }

    init() {
        let numPages = this.pages;
        let numPagesInOnePart = this.pagesInOnePart;
        const colorScheme = this.colorScheme;
        const currentColorScheme = ((numPages === 24) ? colorScheme.scheme24 : (numPages === 28) ? colorScheme.scheme28 : (numPages === 32) ? colorScheme.scheme32 : undefined);


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

            let createPage = function (numPage, isColor, orientation, isVerstkaDone = false, isFotoDone = false) {
                let classNameStr = 'b-page';
                let div = document.createElement('div');

                div.dataset.numpage = numPage;
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
            let leftPageNumber = pagesNumbers[0];
            let rightPageNumber = pagesNumbers[1];
            let leftVerstka = false;
            let rightVerstka = false;
            let leftFoto = false;
            let rightFoto = false;
            let currentStatus = getStatus();
            
            if (currentStatus != -1) {
                for (let i = 1; i < currentStatus.length; i++) {
                    if (currentStatus[i].pageID == leftPageNumber) {
                        leftVerstka = currentStatus[i].verstkaDone;
                        leftFoto = currentStatus[i].fotoDone;
                    } else if (currentStatus[i].pageID == rightPageNumber) {
                        rightVerstka = currentStatus[i].verstkaDone;
                        rightFoto = currentStatus[i].fotoDone;
                    }
                }
            } 

            // Функция определения цветности полосы согласно цветовой схеме colorScheme
            function isColorPage(currentPage) {
                let resNum = parseInt(currentPage);
                return (currentColorScheme.indexOf(resNum) != -1);
            }

            // Левая полоса (четная) в развороте
            drawPage(elementObj, currentPagePair, leftPageNumber, isColorPage(leftPageNumber), 'left', leftVerstka, leftFoto);
            // Правая полоса (не четная) в развороте
            drawPage(elementObj, currentPagePair, rightPageNumber, isColorPage(rightPageNumber), 'right', rightVerstka, rightFoto);
        }

        function drawPage(elementObj, currentPagePair, numberPage, color, orientation, verstkaDone, fotoDone) {
            let currentPageLeft = currentPagePair.appendChild(elementObj.createPage(numberPage, color, orientation, verstkaDone, fotoDone));

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
            let pagesNumbersInRow = [[], []];
            let pageLpartL, pageRpartL;
            let pageLpartR, pageRpartR;

            function twoDigitsString(num) {
                return num < 10 ? '0' + num : '' + num;
            }
            // Левая часть строки -----------------------------------------
            // Левая полоса разворота в левой части строки
            pageLpartL = (2 * row - 2) === 0 ? numPages : (2 * row - 2);
            pagesNumbersInRow[0][0] = twoDigitsString(pageLpartL);
            // Правая полоса разворота в левой части строки
            pageRpartL = 2 * row - 1;
            pagesNumbersInRow[0][1] = twoDigitsString(pageRpartL);
            // ------------------------------------------------------------

            // Правая часть строки -----------------------------------------
            // Левая полоса разворота в правой части строки
            pageLpartR = (2 * row - 2) + (numPages / 2);
            pagesNumbersInRow[1][0] = twoDigitsString(pageLpartR);
            // Правая полоса разворота в правой части строки
            pageRpartR = (2 * row - 1) + (numPages / 2);
            pagesNumbersInRow[1][1] = twoDigitsString(pageRpartR);
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
        this.setEvents();
        this.getInfo();
    }

    setEvents() {
        const btnsVerstkaArr = document.querySelectorAll('.b-page-header__verstka');
        const btnsFotoArr = document.querySelectorAll('.b-page-header__foto');
        

        for (let i = 0; i < btnsVerstkaArr.length; i++) {
            btnsVerstkaArr[i].addEventListener('click', (e) => {
                let pageArr = document.querySelectorAll('.b-page');
                for (let i = 0; i < pageArr.length; i++) {
                    if (pageArr[i].contains(e.target)) {
                        pageArr[i].classList.toggle('b-page_verstka-done');
                        this.getInfo();
                        break;
                    }
                }
            });
        }

        for (let i = 0; i < btnsFotoArr.length; i++) {
            btnsFotoArr[i].addEventListener('click', (e) => {
                let pageArr = document.querySelectorAll('.b-page');
                for (let i = 0; i < pageArr.length; i++) {
                    if (pageArr[i].contains(e.target)) {
                        pageArr[i].classList.toggle('b-page_foto-done');
                        this.getInfo();
                        break;
                    }
                }
            });
        }
    }

    // Вычисляет и выводит на экран информацию о сверстанных полосах, а также записывает 
    // текущий статус в localStorage
    getInfo() {
        const totalNumPages = document.querySelector('.b-info__total-num-page');
        const readyNumPages = document.querySelector('.b-info__ready-num-page');
        const notReadyNumPages = document.querySelector('.b-info__notready-num-page');
        const pagesArr = document.querySelectorAll('.b-page');
        let countReady = 0;
        let countNotReady = 0;
        let countAll = this.pages;

        let statusPagesArr = [this.pages];

        pagesArr.forEach(function (element) {
            let pageObj = {};
            let el = element.classList;
            countReady += (el.contains('b-page_verstka-done') || el.contains('b-page_foto-done')) ? 1 : 0;

            pageObj.pageID = element.dataset.numpage;
            pageObj.verstkaDone = el.contains('b-page_verstka-done');
            pageObj.fotoDone = el.contains('b-page_foto-done');
            statusPagesArr.push(pageObj);

        });

        countNotReady = countAll - countReady;

        totalNumPages.textContent = `Полос в номере: ${this.pages}`;
        readyNumPages.textContent = `Сверстано полос: ${countReady}`;
        notReadyNumPages.textContent = `Осталось сверстать: ${countNotReady}`;

        // Записываем текущее состояние в localStorage
        localStorage.setItem('status_verstka', JSON.stringify(statusPagesArr));
    }
}

class ControlOptions {
    constructor() {

    }

    init() {
        this.setEvents();
    }

    // Функция удаляет все дочерние элементы parentNode
    deleteChildNodes(parentNode) {
        while (parentNode.firstChild) {
            parentNode.removeChild(parentNode.firstChild);
        }
    }

    createPagesSheet(numPages) {
        const parentNode = document.querySelector('.b-data-view');
        this.deleteChildNodes(parentNode);
        
        localStorage.removeItem('status_verstka');

        let grid = new GridOfPages(numPages);
        grid.init();
    }

    getNumPages(InputRadioArr) {
        for (let i = 0; i < InputRadioArr.length; i++) {
            if (InputRadioArr[i].checked) {
                return parseInt(InputRadioArr[i].value);
            }
        }
    }

    setEvents() {
        const btnPagesOptions = document.querySelector('.b-control-panel__btn-pages');
        const inputRadioPages = document.querySelectorAll('.b-control-panel__radio-pages');


        btnPagesOptions.addEventListener('click', () => {
            this.createPagesSheet(this.getNumPages(inputRadioPages));
        });

    }
}

function getStatus() {
    // Если в localStorage есть сохраненная информация о статусе верстки
    if (localStorage.getItem('status_verstka')) {
        let status = localStorage.getItem('status_verstka');
        if (status > '') {
            status = JSON.parse(status);
        }
        return status;
    } else {
        return -1;
    }
}

function startDefault() {
    let status = getStatus();
    let numPages;
    if (status != -1) {
        numPages = status[0];
    } else {
        return;
    }
    let grid = new GridOfPages(numPages);
    grid.init();
}

startDefault();

let ctrlOptions = new ControlOptions();
ctrlOptions.init();
