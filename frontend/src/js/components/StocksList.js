import React from 'react';
import DefineNewStock from './DefineNewStock';
import StockHeader from './StockHeader';
import { isEmpty } from './helpers';
//import CSSTransitionGroup from 'react-addons-css-transition-group';


class StocksList extends React.Component {

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
        {defineNewStock}
      </div>
      )
    }
}

export default StocksList;
