import React from 'react';
import CategoriesSelect from './CategoriesSelect';

class AddStockForm extends React.Component {
  state ={
    showToolTip : false,
  };
  createStock(event){
    event.preventDefault();
    const category = {
      categoryKey: this.category.value,
      percentage: 100};
    let currency;
    if (isNaN(this.name.value)) {
      if (!this.name.value.toUpperCase().indexOf('CASH') === -1) {
        currency = Object.keys(currencies)[0];
      }
      else {
        currency = this.name.value.toUpperCase().split('-')[1] || Object.keys(currencies)[0];
      }
    }
    else {
      currency = Object.keys(currencies)[1];
    }
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
    return(
      <div>
        <form ref={(input) => this.stockForm = input} className="grid-edit stock-edit" onSubmit={(e) => this.createStock(e)}>
          <input ref={(input) => this.name = input} type="text" placeholder="Stock Name" required
              onFocus={() => this.setState({showToolTip : true})} onBlur={() => this.setState({showToolTip : false})}/>
          <input ref={(input) => this.amount = input} type="number" placeholder="Stock Amount" required/>
          <select ref={(input) => this.category = input} required placeholder="Select category">
            {Object.keys(this.props.categories).map(this.props.renderCategories)}
          </select>
      <CategoriesSelect
        stock={(this.name) ? this.name.value : "Need to be defined"}
        categories={this.props.categories}
        renderCategories={this.props.renderCategories} />
      <button type="submit">+ Add Stock</button>
      </form>
      { toolTip }

      </div>
    )
  }

}


export default AddStockForm;
