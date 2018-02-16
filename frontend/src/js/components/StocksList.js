import React from 'react';
import DefineNewStock from './DefineNewStock';
import StockHeader from './StockHeader';
import NewTradeRecord from './NewTradeRecord';
import { isEmpty, today_calculated } from './helpers';

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
   const today = today_calculated();
   const updated = (this.props.stocks[key].update_date == today);
   const ratio = this.exchangeRatioByName(`${stockCurrencyName}to${userCurrencyName}`);
   return [price * ratio, updated];
 };

  renderStocksList = (key) => {
    const stock = this.props.stocks[key];
    if (stock) {
      //display categories
      let stockCategory =  "";
      stock.categories.forEach((catKey) => {
        stockCategory+=`${this.props.categories[catKey.category].category_name}; `});
      stockCategory = stockCategory.slice(0, -2);
      const stockCategoryShort =  (stockCategory.length >12) ?  stockCategory.substring(0,11)+'...' : stockCategory;
      //display price
      const stockPrice = this.calculateStockPrice(key)[0].toFixed(2);
      const updated = this.calculateStockPrice(key)[1];
      //display amount
      const stockAmount = 0;
    return(
      <div className="grid-edit stock-edit" key={key}>
        <input type="text" name="stock_name" value={stock.stock_name} placeholder="Stock Name"
          onChange={(e) => this.handleChange(e, key)}
          />
          <span>
             {stockAmount}
             <NewTradeRecord
                 stockName={stock.stock_name}
                 stockPrice={stockPrice}
                 stockAmount={stockAmount}
                 categories={stockCategory}
                 addStockAction={this.props.addStockAction}
             />
          </span>
          <span>
            {stockCategoryShort}
            <button>
            <i className="fa fa-pie-chart" aria-hidden="true"></i>
            </button>
          </span>
          <span className={(!updated) ? "red" : "black"}>{stockPrice}</span>
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
