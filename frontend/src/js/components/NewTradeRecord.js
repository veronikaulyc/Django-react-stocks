import React from 'react';

class NewTradeRecord extends React.Component {

  addTradeRecord(event){
    event.preventDefault();

    const timestamp = Date.now();
    const action = {
      stock: this.props.stock,
      amount: parseFloat(this.amount.value),
      date: this.date.value ,
      action: parseInt(this.action.value)
    }
    console.log('new action', action);
    this.props.addAction(action);
    this.stockForm.reset();
  }

  render(){

    return(
      <div>
      <div className="grid-edit stock-edit">
        <span className="heading">Name</span>
        <span className="heading">Current Amount</span>
        <span className="heading">Action</span>
        <span className="heading">Amount</span>
        <span className="heading">Price</span>
        <span className="heading">Value</span>
        <span className="heading">Date </span>

      </div>
        <form ref={(input) => this.stockForm = input} className="grid-edit stock-edit" onSubmit={(e) => this.addTradeRecord(e)}>
         <span>{{this.props.stock}}</span>
          <span>{{this.props.currentAmount}}</span>
         <select ref={(input) => this.action = input} required >
          <option value="1">Buy</option>
          <option value="-1">Sell</option>
         </select>
        <input ref={(input) => this.amount = input} type="number" placeholder="Stock Amount" required/>
        <input ref={(input) => this.price = input} type="number" placeholder="Stock Price" required/>
        <span>Value</span>
        <input ref={(input) => this.date = input} type="date" placeholder="Action Date" required/>

      <button type="submit">Submit</button>
      </form>


      </div>
    )
  }

}


export default NewTradeRecord;
