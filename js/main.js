class GridOfPages {
    constructor(pages) {
        this.pages = pages;
    }
    
    init() {
        let numPages = this.pages;

        function getCoordinatesNumberPage(page) {
            let row, col;
            // Функция возвращает объект с ключами: номер страницы, столбец и строка. Координаты начинаются с 1
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
                pageNumber: page,
                row: row,
                col: col
            };
        }

        function createPageHTML(pageObj) {

        }
        
        for (let i = 1; i <= this.pages; i++) {
            1111111111111111111111111111111111111111111111111111111111111111111111111
        }
    }
}

let grid = new GridOfPages(24);
