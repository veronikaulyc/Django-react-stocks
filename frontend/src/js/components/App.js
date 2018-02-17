import React, { Component } from "react";
import Header from './Header';
import StocksList from './StocksList';
import Categories from './Categories';
import UserCurrency from './UserCurrency';
import axios from 'axios';
import { today_calculated } from './helpers';

class App extends Component {
  constructor(){
  super();
  this.prices = {};
  this.notification = "";
  this.categoriesTotal = {};
  this.userTotal = null;
}

state = {
  uid: 1,
  stocks: {},
  categories: {},
  currency_names: {},
  currency: 1,
  exchangeRates: {},
  chosenCategories: {}
};

componentWillMount(){
  this.getCategories();
  this.fetchCurrency();
  this.getExchangeRates();
  this.getStocks();
}
//categories
getCategories = () => {
  axios.post('/api/categories', {user: this.state.uid})
  .then((response) => {
    const categories = {};
    response.data.forEach(cat =>{
      categories[cat.pk] = cat.fields;
    });
    this.setState({ categories });
})
.catch((error) => {
  console.log(error);
});
};

addCategory = (category) => {
   category['user'] = this.state.uid;
   axios.post('/api/newcategory/', category)
    .then( (response) => {
      const categories = {...this.state.categories };
      categories[response.data] = category;
      this.setState({ categories });
  })
  .catch((error) => {
    console.log(error);
  });
  };

  updateCategory = (key, updatedCategory) => {
    const uid = this.state.uid;
    axios.put(`/api/category/${key}`,updatedCategory)
    const categories = {...this.state.categories};
    categories[key] = updatedCategory;
    this.setState({ categories });
  };

  removeCategory = (key) => {
    axios.delete(`/api/category/${key}`)
    const categories = {...this.state.categories};
    delete categories[key];
    this.setState({ categories });
  };

  //currency
  fetchCurrency = () => {
    axios.get('/api/currency')
    .then((response) => {
     const currency_names = response.data;
     this.setState ({ currency_names});
    })
    .catch((error) => {
        console.log(error);
      });
    axios.post('/api/usercurrency', {user_uid: this.state.uid})
    .then((response) => {
      if (response.data) {
           const currency = response.data;
           this.setState({ currency });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  };
  updateCurrency = (event) => {
    const user = this.state.uid;
    const currency = event.target.value;
    axios.put('/api/usercurrency', {user_uid: this.state.uid, user_currency: currency})
    this.setState({ currency });
};
getExchangeRates = () => {
  axios.get('/api/exchangerates')
  .then((response) => {
    if (response.data) {
         const exchangeRates = {};
         response.data.forEach(rate =>{
           exchangeRates[rate.pk] = rate.fields;
         });
         this.setState({ exchangeRates });
    }
  })
  .catch((error) => {
    console.log(error);
  });
};
//Chosen Categories
 chooseCategory = (category) => {
   const chosenCategories = {...this.state.chosenCategories };
   const timestamp = Date.now();
   chosenCategories[`c${timestamp}`] = category;
   this.setState({ chosenCategories });
 };
 removeChosenCategory = (key) => {
   const chosenCategories = {...this.state.chosenCategories};
   delete chosenCategories[key];
   this.setState({ chosenCategories });
 };
 updateChosenCategory = (key, updatedCategory) => {
   const chosenCategories = {...this.state.chosenCategories};
   chosenCategories[key] = updatedCategory;
   this.setState({ chosenCategories });
 };

// Stocks
addStock = (stock) => {
  axios.post('/api/newstock', {
    stock_name: stock,
    categories: {...this.state.chosenCategories},
    user: this.state.uid
  });
  const chosenCategories = {};
  this.setState({ chosenCategories });
  this.getStocks();
};

getStocks = () => {
  axios.post('/api/stocks', {user: this.state.uid})
  .then((response) => {
    const stocks = response.data;
    this.setState({ stocks });
})
.catch((error) => {
  console.log(error);
});
};

updateStock = (key, updatedStock) => {
  console.log(updatedStock);
};

removeStock = (key) => {
  console.log('do you really want to remove');
};

exchangeRatioByName = (name) => {
  let ratio = 0;
  Object.keys(this.state.exchangeRates).forEach((key) => {
    if (this.state.exchangeRates[key].currency_name == name){
      ratio = this.state.exchangeRates[key].currency_ratio;
    }
  });
  return ratio;
}

calculate_stock_ratio = (key) => {
  const stockCurrencyName = this.state.currency_names[this.state.stocks[key].stock_currency];
  const userCurrencyName = this.state.currency_names[this.state.currency];
  return this.exchangeRatioByName(`${stockCurrencyName}to${userCurrencyName}`);
}

 calculateStockPrice = (key) => {

   const price = this.state.stocks[key].stock_price;
   const updated = (this.state.stocks[key].update_date == today_calculated());
   const ratio = this.calculate_stock_ratio(key);
   return [price * ratio, updated];
 };

 calculateStockAmount = (key) => {
   const stock = this.state.stocks[key];
   let amount = 0;
   stock.purchases.forEach(purchase => amount += parseInt(purchase.amount));
   return amount;
 };

 calculateStockValue = (key) => {
   const stockPrice = this.calculateStockPrice(key)[0];
   return stockPrice * this.calculateStockAmount(key);
 };

 calculateTotal = () => {
   let total = 0;
   Object.keys(this.state.stocks).forEach((key) => {
     total += this.calculateStockValue(key);
   });
   return total;
 };

 calculateStockPercentage = (key, total) => {
   return (total != 0) ? 100 * this.calculateStockValue(key) / total : 0;
 };

 calculateCategoryValue = (categoryKey) => {
   let categoryValue = 0;
   Object.keys(this.state.stocks).forEach((stockKey) => {
      this.state.stocks[stockKey].categories.forEach((cat) => {
          if (cat.category == categoryKey) {
             categoryValue += cat.percentage * this.calculateStockValue(stockKey) / 100;
       }
     });
   });
   return categoryValue;
 };

 calculateCategoryPercentage = (categoryKey, total) => {
   return (total != 0) ? 100 * this.calculateCategoryValue(categoryKey) / total : 0;
 }

addStockAction = (amount, price, date, stockName, stockKey) => {
  const ratio = this.calculate_stock_ratio(key);
  const originalPrice = price / ratio;
  axios.post('/api/newstock', {
    stock_name: stockName,
    amount: amount,
    purchase_price: originalPrice,
    purchase_date: date,
    user: this.state.uid
  });
};

    render(){
      const total = this.calculateTotal();
        return(
            <div>
                <Header tagline="Stocks Advisor"/>
                <div className="stocks-main">
                    <StocksList
                        currency={this.state.currency}
                        categories={this.state.categories}
                        stocks={this.state.stocks}
                        addStock={this.addStock}
                        chosenCategories={this.state.chosenCategories}
                        chooseCategory={this.chooseCategory}
                        removeChosenCategory={this.removeChosenCategory}
                        updateChosenCategory={this.updateChosenCategory}
                        updateStock={this.updateStock}
                        removeStock={this.removeStock}
                        exchangeRates={this.state.exchangeRates}
                        currency_names={this.state.currency_names}
                        addStockAction={this.addStockAction}
                        calculateStockPrice={this.calculateStockPrice}
                        calculateStockAmount={this.calculateStockAmount}
                        calculateStockValue = {this.calculateStockValue}
                        total = {total}
                        calculateStockPercentage = {this.calculateStockPercentage}
                    />
                   <div>
                       <UserCurrency
                           updateCurrency={this.updateCurrency}
                           currency={this.state.currency}
                           currency_names={this.state.currency_names}
                        />
                      <Categories
                          stocks={this.state.stocks}
                          categories={this.state.categories}
                          addCategory={this.addCategory}
                          removeCategory={this.removeCategory}
                          updateCategory={this.updateCategory}
                          total={total}
                          calculateCategoryValue={this.calculateCategoryValue}
                          calculateCategoryPercentage={this.calculateCategoryPercentage}
                       />
                   </div>
             </div>
        </div>
        )
    }
}

export default App;
