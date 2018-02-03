import React from 'react';
import DefineNewStock from './DefineNewStock';
import StockHeader from './StockHeader';
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
      const stockCategory =  "";
    return(
      <div className="grid-edit stock-edit" key={key}>
        <input type="text" name="stock_name" value={stock.stock_name} placeholder="Stock Name"
          onChange={(e) => this.handleChange(e, key)}/>
          <input type="number" name="amount" value="0"
          onChange={(e) => this.handleChange(e, key)} placeholder="Stock Amount"/>
          <span>
            {stockCategory}
            D...
          </span>
          <span>0</span>
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
