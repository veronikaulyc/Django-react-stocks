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
  currency: 2,
  prices: {},
  exchangeRates: {},
};

componentWillMount(){
  this.getCategories();
  this.fetchCurrency();
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

// Stocks
addStock = (stock) => {
  console.log('Adding stock', stock);
}


    render(){
        return(
            <div>
                <Header tagline="Stocks Advisor"/>
                <div className="stocks-main">
                    <StocksList
                        categories={this.state.categories}
                        addStock={this.addStock}
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
