import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { isEmpty } from './helpers';

class Categories extends Component {
  handleChange = (e,key) => {
    const category = this.props.categories[key];
    const updatedCategory = {
      ...category,
      [e.target.name]: e.target.value
    }
    this.props.updateCategory(key, updatedCategory);
  };

  createCategory(event){
    event.preventDefault();

    const category = {
      category_name: this.name.value,
      category_percentage: parseFloat(this.percentage.value),
    };
    this.props.addCategory(category);
    this.categoryForm.reset();
  }

  isCategoryStock = (categoryKey) => {
    let isFound = false;
    if (this.props.stocks) {
    Object.keys(this.props.stocks).forEach((key) => {
      const stock = this.props.stocks[key];
      stock.categories.forEach((cat) => {
          if (parseInt(cat.category) === parseInt(categoryKey)) {
            isFound = true;
            return isFound;
          }
        });
      });
    }
    return isFound;
  };

  totalPercentage = () => {
    let total = 0;
    Object.keys(this.props.categories).forEach((key) => {
      total += this.props.categories[key].category_percentage;
    });
    return total;
  };

  renderCategoryStock = (stockKey,categoryKey) => {
      const stock = this.props.stocks[stockKey];
      let stockList = "";
      if (stock){
        stock.categories.forEach((cat) =>{
          if (parseInt(cat.category) === parseInt(categoryKey)){
            stockList =
              <option value={stockKey} key={`${stockKey}${categoryKey}`}>
                { stock.stock_name }
              </option>;
          }
        });
    }
    return stockList;
  };

  renderCategoriesList = (key) => {
    const category = this.props.categories[key];
    if (category) {
      const categoryValue = this.props.calculateCategoryValue(key);
      const categoryPercentage = this.props.calculateCategoryPercentage(key, this.props.total);
      const stocksList = (this.props.stocks) ? Object.keys(this.props.stocks).map(stockKey => this.renderCategoryStock(stockKey, key)) : "";
    return(
      <div className="grid-edit category-edit" key={key}>
        <input type="text" name="category_name" value={category.category_name} placeholder="Category Name"
          onChange={(e) => this.handleChange(e, key)} required/>
          <input type="number" min="0" max="100" name="category_percentage" value={category.category_percentage}
          onChange={(e) => this.handleChange(e, key)} placeholder="Desirable %"/>
          <span>{categoryValue.toFixed(2)}</span>
          <span>{categoryPercentage.toFixed(2)}%</span>
          <select name="favStock" value={category.favStock} onChange={(e) => this.handleChange(e, key)}>
            { stocksList }
          </select>
        <button className="deleteButton" onClick={() => this.props.removeCategory(key)}
            disabled={this.isCategoryStock(key)}> &times;</button>
      </div>
    )
  }
    else {return "";}
  };


  render(){

    const categories = (this.props.categories) ? Object.keys(this.props.categories).map(this.renderCategoriesList) : null;
    return (
      <div>
        <h2>Categories</h2>
        <div className="grid-edit category-edit">
          <span className="heading">Category Name</span>
          <span className="heading">Desirable %</span>
          <span className="heading">Category Value</span>
          <span className="heading">Current %</span>
          <span className="heading">Favourite stock </span>
        </div>
       <div>{categories}</div>
       <div>
       <span>Total percentage </span>
       <span>{this.totalPercentage()} </span>
       </div>
      <form ref={(input) => this.categoryForm = input} className="grid-edit category-edit" onSubmit={(e) => this.createCategory(e)}>
        <input ref={(input) => this.name = input} type="text" placeholder="Category Name" required/>
        <input ref={(input) => this.percentage = input} type="number" min="0" max="100" placeholder="Desirable %" required/>
        <button type="submit">+ Add Category</button>
      </form>
      </div>
    )
  }
}

export default Categories;
