const commonPagesColorScheme = {
  "24": {
    "01": true,
    "02": true,
    "03": true,
    "04": true,
    "05": true,
    "06": true,
    "07": true,
    "08": true,
    "09": true,
    "10": true,
    "11": true,
    "12": true,
    "13": true,
    "14": true,
    "15": true,
    "16": true,
    "17": true,
    "18": true,
    "19": true,
    "20": true,
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
    "10": true,
    "11": true,
    "12": true,
    "13": true,
    "14": true,
    "15": true,
    "16": true,
    "17": true,
    "18": true,
    "19": true,
    "20": true,
    "21": true,
    "22": true,
    "23": true,
    "24": true,
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
    "05": true,
    "06": true,
    "07": true,
    "08": true,
    "09": true,
    "10": true,
    "11": true,
    "12": true,
    "13": true,
    "14": true,
    "15": true,
    "16": true,
    "17": true,
    "18": true,
    "19": true,
    "20": true,
    "21": true,
    "22": true,
    "23": true,
    "24": true,
    "25": true,
    "26": true,
    "27": true,
    "28": true,
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

// Возвращает количество полос в номере
export const getPageQuantity = () => 28;

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
export const getPageInfo = currState => {
  let pagesDelegated = 0;
  let pagesMakeUp = 0;
  let pagesPhoto = 0;
  let res = {};

  for (let pair in currState) {
    if (pair === "[object Object]") break;
    for (let page in currState[pair]) {
      const currPage = currState[pair][page];
      pagesDelegated += currPage.pageDelegated ? 1 : 0;
      pagesMakeUp += currPage.pageMakeup ? 1 : 0;
      pagesPhoto += currPage.pagePhoto ? 1 : 0;
    }
  }

  res.pagesQuantity = getPageQuantity();
  res.pagesDelegated = pagesDelegated;
  res.pagesMakeUp = pagesMakeUp;
  res.pagesPhoto = pagesPhoto;

  return res;
};

// Первичное заполнение состояния
export const generateStateArray = pageQuantity => {
  const pairs = pageQuantity / 2;
  let resArr = {};
  (() => {
    for (let i = 1; i <= pairs; i++) {
      const keyObj = toTwo(i);
      const numPair = numForPair(pageQuantity, i);
      const currPair = {
        left: {
          pageId: numPair[0],
          pageColor: isColorPage(pageQuantity, numPair[0]),
          pageMakeup: false,
          pagePhoto: false,
          pageDelegated: false
        },
        right: {
          pageId: numPair[1],
          pageColor: isColorPage(pageQuantity, numPair[1]),
          pageMakeup: false,
          pagePhoto: false,
          pageDelegated: false
        }
      };
      resArr[keyObj] = currPair;
    }
  })();
  return resArr;
};
