import React, { Component } from "react";
import Header from './Header';
import StocksList from './StocksList';
import Categories from './Categories';
import UserCurrency from './UserCurrency';
import axios from 'axios';

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

addStockAction = (amount, price, date, stockName) => {
  axios.post('/api/newstock', {
    stock_name: stockName,
    amount: amount,
    purchase_price: price,
    purchase_date: date,
    user: this.state.uid
  });
};

    render(){
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
                          categoriesTotal={this.categoriesTotal}
                          userTotal={this.userTotal}
                       />
                   </div>
             </div>
        </div>
        )
    }
}

export default App;
