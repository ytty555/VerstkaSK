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

        function createPagesHTML() {
            // Вычисляем количество строк в таблице Pages
                const allRows = numPages / 4;

            // Создаем <div data-row="??" class="row justify-content-around"> 
            // по количеству строк allRows
            let divViewBlockContainer = document.querySelector('.b-view')
            for (let i = 1; i <= allRows; i++) {
                let divRow = document.createElement('div');
                divRow.className = "row justify-content-around";
                divRow.dataset.row = i;
                divViewBlockContainer.appendChild(divRow);
            }

            // Для каждой строки содаем две колонки с отображением Pages
            let rows = document.querySelectorAll('[data-row]');
            for (let i = 0; i < rows.length; i++) {
                let div_Col_I = document.createElement('div');
                div_Col_I.className = "b-part b-part_partition_1 col-xs-4";
                div_Col_I.setAttribute('part-row', `1-${i+1}`);
                rows[i].appendChild(div_Col_I);
                
                let div_Col_II = document.createElement('div');
                div_Col_II.className = "b-part b-part_partition_2 col-xs-4";
                div_Col_II.setAttribute('part-row', `2-${i+1}`);
                rows[i].appendChild(div_Col_II);

            }

            
        }

        createPagesHTML();
    }
}

let grid = new GridOfPages(24);
grid.init();
