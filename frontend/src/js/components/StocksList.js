import React from 'react';
import AddStockForm from './AddStockForm';
import StockHeader from './StockHeader';
import { isEmpty } from './helpers';
//import CSSTransitionGroup from 'react-addons-css-transition-group';
import CategoriesSelect from './CategoriesSelect';

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

  const addStockForm = (!isEmpty(this.props.categories)) ?
    <AddStockForm
      addStock={this.props.addStock}
      categories={this.props.categories}
      renderCategories={this.renderCategories}
/> : '';
  return(
      <div>
        <h2>Stocks List</h2>
        <StockHeader />
        {addStockForm}
      </div>
      )
    }
}

export default StocksList;
