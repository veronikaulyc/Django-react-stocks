import React, { Component } from "react";
import Header from './Header';
import Categories from './Categories';
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
  prices: {},
  exchangeRates: {},
};

componentWillMount(){
  axios.get('/api/categories')
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
}


addCategory = (category) => {
   console.log ('Adding category', category);
   category['user'] = this.state.uid;
   axios.post('/api/categories/', category)
    .then(function (response) {
      console.log(response.data)
      console.log('success');
      const categories = {...this.state.categories };
      categories[response.data] = category;
      this.setState({ categories });
  })
  .catch(function (error) {
    console.log(error);
  });


  };

  updateCategory = (key, updatedCategory) => {
    console.log ('Updating category', key, updatedCategory);
    const uid = this.state.uid;
    //const userData = {...this.state.userData};
    //userData[uid].categories[key] = updatedCategory;
    //this.setState({ userData });
  };

  removeCategory = (key) => {
    console.log ('Removing category', key);
    const uid = this.state.uid;
    //const userData = {...this.state.userData};
    //userData[uid].categories[key] = null;
    //this.setState({ userData });
  };

    render(){
        return(
            <div>
            <Header tagline="Stocks Advisor"/>
            <div className="stocks-main">
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
        )
    }
}

export default App;
