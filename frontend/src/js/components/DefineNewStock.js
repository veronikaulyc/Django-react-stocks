import React from 'react';
import SkyLight from 'react-skylight';


class DefineNewStock extends React.Component {
  state ={
    showToolTip : false,
  };
  chosenCategories = {};
  addCategoryForm(event){
    event.preventDefault();
    const timestamp = Date.now();
    this.chosenCategories[`c${timestamp}`] = {category_name: this.category.value,
    category_percentage: this.percentage.value };
    this.category.value = "";
    this.percentage.value = "";

  }

  handleChange = (e,key) => {
    const chosenCategories = {...this.state.chosenCategories};
    console.log('key', e.target.name);
    console.log('value', e.target.value);
    //chosenCategories[e.target.name] = e.target.value;
    this.setState({ chosenCategories });;

  };

  removeChosenCategory = (e, key) => {
    const chosenCategories = {...this.state.chosenCategories};
    delete chosenCategories[key];
    this.setState({ chosenCategories });
  };

  renderChosenCategories = (key) => {
    const category = this.chosenCategories[key];
    if (category) {
    return(
      <div className="grid-edit modal-edit" key={key}>
        <select name="category" value={key}
          onChange={(e) => this.handleChange(e, key)}>
          {Object.keys(this.props.categories).map(this.props.renderCategories)}
        </select>
        <input type="number" name="percentage" value={category} placeholder="%"
          onChange={(e) => this.handleChange(e, key)}/>
        <button className="deleteButton" onClick={() => this.removeChosenCategory(key)}> &times;</button>
      </div>
    )}
    else {return;}
  };

  createStock(event){
    event.preventDefault();
    const category = {
      categoryKey: this.category.value,
      percentage: 100};

    const timestamp = Date.now()
    const stock = {
      name: this.name.value,
      categories: {[timestamp]: category},
      amount: parseFloat(this.amount.value),
      currency: currency ,
    }
    console.log('new stock', stock);
    this.props.addStock(stock);
    this.stockForm.reset();
  }

  render(){
    const toolTip = (this.state.showToolTip) ? <div className="tooltip">`Enter stock symbol, e.g. AAPL. If you want to add cash,
    enter 'CASH-' and its currency, e.g. CASH-USD.`</div> : null;
    const dialogStyles = {
      zIndex: 5000
    };
    const modal = <SkyLight hideOnOverlayClicked ref={ref => this.animated = ref}
      title="Enter Stock Name and Define its Categories"
      transitionDuration={500}
      dialogStyles={dialogStyles}
      >
      <input ref={(input) => this.name = input} type="text" placeholder="Stock Name" required
          onFocus={() => this.setState({showToolTip : true})} onBlur={() => this.setState({showToolTip : false})}/>
    <div className="grid-edit modal-edit">
      <span className="heading">Category Name </span>
      <span className="heading">Category Percentage </span>
    </div>
    <div className="grid-edit modal-edit" ref={(input) => this.categoryForm = input}>
      <select ref={(input) => this.category = input} name="category" required>
        {Object.keys(this.props.categories).map(this.props.renderCategories)}
      </select>
      <input type="number" name="percentage"  placeholder="%" ref={(input) => this.percentage = input}
      />
      <button onClick={(e) => this.addCategoryForm(e)}>+ Add categories</button>
    </div>
     { toolTip }
      <div className="grid-edit modal-edit"><button className="closeButton" onClick={() => console.log('close')}> Save and Close </button></div>
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
