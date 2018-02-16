export function isEmpty(obj) {
  for(let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

export function today_calculated(){
  const now = new Date;
  let month = (now.getMonth() + 1);
  let day = now.getDate();
  if (month < 10) {
      month = "0" + month;
    }
  if (day < 10) {
        day = "0" + day;
    }
  const today = now.getFullYear() + '-' + month + '-' + day;
  return today;
}

export const defaultStocks = {
  stock1: {
    name: "AAPL",
    amount: 100,
    category: "category1",
    currency: "USD"
  },
  stock2: {
    name: "VTI",
    amount: 100,
    category: "category2",
    currency: "USD"
  }
};
export const defaultCategories = {
  category1: {
    name: "tech",
    percentage: 50
  },
  category2: {
    name: "USA",
    percentage: 50
  }
};
