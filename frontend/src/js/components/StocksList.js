import React from 'react';
import DefineNewStock from './DefineNewStock';
import StockHeader from './StockHeader';
import ActionStock from './ActionStock';
import { isEmpty } from './helpers';
//import CSSTransitionGroup from 'react-addons-css-transition-group';


class StocksList extends React.Component {

  handleChange = (e,key) => {
      const stock = this.props.stocks[key];
      const updatedStock = {
        ...stock,
        [e.target.name]: e.target.value
     }
  this.props.updateStock(key, updatedStock);
};
exchangeRatioByName = (name) => {
  let ratio = 0;
  Object.keys(this.props.exchangeRates).forEach((key) => {
    if (this.props.exchangeRates[key].currency_name == name){
      ratio = this.props.exchangeRates[key].currency_ratio;
    }
  });
  return ratio;
}

 calculateStockPrice = (key) => {
   let stockPrice;
   const stockCurrencyName = this.props.currency_names[this.props.stocks[key].stock_currency];
   const userCurrencyName = this.props.currency_names[this.props.currency];
   const price = this.props.stocks[key].stock_price;
   const today = new Date();
   console.log('today', today);
   const updated = (this.props.stocks[key].update_date == today);
   console.log('updated', updated);
   const ratio = this.exchangeRatioByName(`${stockCurrencyName}to${userCurrencyName}`)
   if (this.props.stocks[key].stock_currency == 1){
     stockPrice = price * ratio / 100;
   }
   else {
     stockPrice = price * ratio;
   }
   return stockPrice;
 };

  renderStocksList = (key) => {
    const stock = this.props.stocks[key];
    if (stock) {
      //display categories
      let stockCategory =  "";
      stock.categories.forEach((catKey) => {
        stockCategory+=`${this.props.categories[catKey.category].category_name}; `});
      stockCategory = stockCategory.slice(0, -2);
      if (stockCategory.length >12) { stockCategory = stockCategory.substring(0,11)+'...' }
      //display price
      const stockPrice = this.calculateStockPrice(key).toFixed(2);
      //display amount
      const stockAmount = 0;
    return(
      <div className="grid-edit stock-edit" key={key}>
        <input type="text" name="stock_name" value={stock.stock_name} placeholder="Stock Name"
          onChange={(e) => this.handleChange(e, key)}
          />
          <span>
             {stockAmount}
             <ActionStock
                 stockKey={key}
                 stockName={stock.stock_name}
                 stockPrice={stockPrice}
                 stockAmount={stockAmount}
             />
          </span>
          <span>
            {stockCategory}
            <button>
            <i className="fa fa-pie-chart" aria-hidden="true"></i>
            </button>
          </span>
          <span>{stockPrice}</span>
          <span>0</span>
          <span>0</span>
        <button className="deleteButton" onClick={() => this.props.removeStock(key)}> &times;</button>
      </div>
    )}
    else {return;}
  };

  renderCategories = (key) => {
  const category = this.props.categories[key];
  if ( category) {
    return (
      <option key={key} value={key}>
       {category.category_name}
      </option>
    )
}
else {return;}
};

render(){
  const stocksList = (this.props.stocks) ? Object.keys(this.props.stocks).map(this.renderStocksList) : '';
  const defineNewStock = (!isEmpty(this.props.categories)) ?
    <DefineNewStock
      addStock={this.props.addStock}
      categories={this.props.categories}
      renderCategories={this.renderCategories}
      chosenCategories={this.props.chosenCategories}
      chooseCategory={this.props.chooseCategory}
      removeChosenCategory={this.props.removeChosenCategory}
      updateChosenCategory={this.props.updateChosenCategory}
/> : '';
  return(
      <div>
        <h2>Stocks List</h2>
        <StockHeader />
        { stocksList }
        {defineNewStock}
      </div>
      )
    }
}

export default StocksList;
