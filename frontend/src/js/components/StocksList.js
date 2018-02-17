import React from 'react';
import DefineNewStock from './DefineNewStock';
import StockHeader from './StockHeader';
import NewTradeRecord from './NewTradeRecord';
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
      const stockPrice = this.props.calculateStockPrice(key)[0].toFixed(2);
      const updated = this.props.calculateStockPrice(key)[1];
      //display amount
      const stockAmount = this.props.calculateStockAmount(key);
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
                 stockKey={key}
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
          <span>{this.props.calculateStockValue(key).toFixed(2)}</span>
          <span>{this.props.calculateStockPercentage(key, this.props.total).toFixed(2)}</span>
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
          Total: {this.props.total.toFixed(2)}
        {defineNewStock}
      </div>
      )
    }
}

export default StocksList;
