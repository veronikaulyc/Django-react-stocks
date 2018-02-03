import React from 'react';
import SkyLight from 'react-skylight';


class DefineNewStock extends React.Component {
  state ={
    showToolTip : false,
  };

  handleChoiceChange = (e,key) => {
    const category = this.props.chosenCategories[key];
    const updatedChosenCategory = {
      ...category,
      [e.target.name]: e.target.value
    };
    this.props.updateChosenCategory(key, updatedChosenCategory);
  };

  addChosenCategory(event){
    event.preventDefault();
    const category = {
      category_name: this.categoryName.value,
      category_percentage: parseFloat(this.categoryPercentage.value),
    };
    this.props.chooseCategory(category);
    this.categoryName.value = "";
    this.categoryPercentage.value = "";

  };

  renderChosenCategories = (key) => {
    const category = this.props.chosenCategories[key];
    if (category) {
    return(
      <div className="grid-edit modal-edit" key={key}>
        <select name="category_name" value={category.category_name}
          onChange={(e) => this.handleChoiceChange(e, key)}>
          {Object.keys(this.props.categories).map(this.props.renderCategories)}
        </select>
        <input type="number" min="0" max="100" name="category_percentage" value={category.category_percentage} placeholder="%"
          onChange={(e) => this.handleChoiceChange(e, key)}/>
        <button className="deleteButton" onClick={() => this.props.removeChosenCategory(key)}> &times;</button>
      </div>
    )}
    else {return;}
  };
 checkSum = () => {
   let sum = 0;
   Object.keys(this.props.chosenCategories).forEach(key => {
     sum += parseFloat(this.props.chosenCategories[key].category_percentage);
   });
   return sum;
 };
 createStock = () => {
   const stockName = this.stockName.value;
   this.props.addStock(stockName);
   this.animated.hide();
 };

  render(){
    const toolTip = (this.state.showToolTip) ?
       <div className="tooltip">
          `Enter stock symbol, e.g. AAPL. If you want to add cash, enter 'CASH-' and its currency, e.g. CASH-USD.`
        </div> : "";
    const Categories = (this.props.chosenCategories) ? Object.keys(this.props.chosenCategories).map(this.renderChosenCategories) : '';
    let warning ="";
    if (this.checkSum() > 100) {
      warning = <div className="notification">
          "Your total sum of categories percentage is larger than 100%";
      </div>
    }
    else if (this.checkSum() < 100){
      warning = <div className="notification">
          "Your total sum of categories percentage is less than 100%";
      </div>
    };
    const dialogStyles = {
      zIndex: 5000
    };
    const modal = <SkyLight hideOnOverlayClicked ref={ref => this.animated = ref}
      title="Enter Stock Name and Define its Categories"
      transitionDuration={500}
      dialogStyles={dialogStyles}
      >
      <input ref={(input) => this.stockName = input} type="text" placeholder="Stock Name" required
          onFocus={() => this.setState({showToolTip : true})} onBlur={() => this.setState({showToolTip : false})}/>
      { toolTip }
     <div className="grid-edit modal-edit">
         <span className="heading">Category Name </span>
         <span className="heading">Category Percentage </span>
    </div>
    { Categories }
    { warning }
    <div className="grid-edit modal-edit" ref={(input) => this.chosenCategoryForm = input}>
      <select ref={(input) => this.categoryName = input} name="name" required>
        {Object.keys(this.props.categories).map(this.props.renderCategories)}
      </select>
      <input type="number" min="0" max="100" name="percentage"  defaultValue="100" placeholder="%" ref={(input) => this.categoryPercentage = input}
      />
      <button onClick={(e) => this.addChosenCategory(e)}>+ Add categories</button>
    </div>

    <div className="grid-edit modal-edit">
        <button className="closeButton" disabled={this.checkSum()!=100 || this.stockName.value ==""} onClick={() => this.createStock()}>
            Save and Close
        </button>
    </div>
    </SkyLight>
    return(
      <div>
      <button className="addCategory" onClick={(e) => {e.preventDefault(); this.animated.show()}}>
       Define New Stock
      </button>
        { modal }

      </div>
    )
  }

}


export default DefineNewStock;
