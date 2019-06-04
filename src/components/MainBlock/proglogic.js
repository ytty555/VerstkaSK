const commonPagesColorScheme = {
  "24": {
    "01": true,
    "02": true,
    "03": true,
    "04": true,
    "05": false,
    "06": false,
    "07": false,
    "08": false,
    "09": true,
    "10": true,
    "11": true,
    "12": true,
    "13": true,
    "14": true,
    "15": true,
    "16": true,
    "17": false,
    "18": false,
    "19": false,
    "20": false,
    "21": true,
    "22": true,
    "23": true,
    "24": true
  },
  "28": {
    "01": true,
    "02": true,
    "03": true,
    "04": true,
    "05": false,
    "06": false,
    "07": false,
    "08": false,
    "09": false,
    "10": false,
    "11": true,
    "12": true,
    "13": true,
    "14": true,
    "15": true,
    "16": true,
    "17": true,
    "18": true,
    "19": false,
    "20": false,
    "21": false,
    "22": false,
    "23": false,
    "24": false,
    "25": true,
    "26": true,
    "27": true,
    "28": true
  },
  "32": {
    "01": true,
    "02": true,
    "03": true,
    "04": true,
    "05": false,
    "06": false,
    "07": false,
    "08": false,
    "09": false,
    "10": false,
    "11": false,
    "12": false,
    "13": true,
    "14": true,
    "15": true,
    "16": true,
    "17": true,
    "18": true,
    "19": true,
    "20": true,
    "21": false,
    "22": false,
    "23": false,
    "24": false,
    "25": false,
    "26": false,
    "27": false,
    "28": false,
    "29": true,
    "30": true,
    "31": true,
    "32": true
  }
};

// Проверяет цветная ли это полоса согласно цветовой раскладке commonPagesColorScheme
export const isColorPage = (pageQuantity, pageNum) =>
  commonPagesColorScheme[pageQuantity][pageNum];

// Переводит число в струку из двух символов
export const toTwo = num => (num < 10 ? "0" + String(num) : String(num));

// Возвращает номера полос разворота в виде массива номеров полос (левая и правая)
// Массив из номеров полос: левая полоса и правая
export const numForPair = (pageQuantity, pairNumber) => {
  let res = [null, null];

  if (pairNumber === 1) {
    res[0] = toTwo(pageQuantity);
    res[1] = toTwo(pairNumber);
  } else {
    res[0] = toTwo(pairNumber * 2 - 2);
    res[1] = toTwo(pairNumber * 2 - 1);
  }
  return res;
};

// Возвращает сводную информацию по полосам из state
export const getPageInfo = (pagesQuantity, currState) => {
  let pagesDelegated = 0;
  let pagesMakeUp = 0;
  let pagesPhoto = 0;
  let res = {};

  if (!pagesQuantity) {
    res.pagesQuantity = 0;
    res.pagesDelegated = 0;
    res.pagesMakeUp = 0;
    res.pagesPhoto = 0;
    return res;
  }

  for (let pair in currState) {
    if (pair === "[object Object]") break;
    for (let page in currState[pair]) {
      const currPage = currState[pair][page];
      pagesDelegated += currPage.pageDelegated ? 1 : 0;
      pagesMakeUp += currPage.pageMakeup ? 1 : 0;
      pagesPhoto += currPage.pagePhoto ? 1 : 0;
    }
  }

  res.pagesQuantity = pagesQuantity;
  res.pagesDelegated = pagesDelegated;
  res.pagesMakeUp = pagesMakeUp;
  res.pagesPhoto = pagesPhoto;

  return res;
};

// Первичное заполнение состояния
export const getPagesState = pagesQuantity => {
  if (!pagesQuantity) {
    return {};
  }
  const pairs = pagesQuantity / 2;
  let resObj = {};
  (() => {
    for (let i = 1; i <= pairs; i++) {
      const keyObj = toTwo(i);
      const numPair = numForPair(pagesQuantity, i);
      const currPair = {
        left: {
          pageId: numPair[0],
          pageColor: isColorPage(pagesQuantity, numPair[0]),
          pageMakeup: false,
          pagePhoto: false,
          pageDelegated: false
        },
        right: {
          pageId: numPair[1],
          pageColor: isColorPage(pagesQuantity, numPair[1]),
          pageMakeup: false,
          pagePhoto: false,
          pageDelegated: false
        }
      };
      resObj[keyObj] = currPair;
    }
  })();
  return Object.assign({}, resObj);
};
