import React from 'react';
import SkyLight from 'react-skylight';
import { today_calculated } from './helpers';


class NewTradeRecord extends React.Component {
  state = {
    action : 1,
    value : 0
  };


  actionStock = (e,action) => {
    e.preventDefault();
    this.setState({ action });
  };

  newRecord = () => {
    const amount = this.amount.value * this.state.action;
    const price = this.price. value;
    const date = this.date.value;

    this.props.addStockAction(amount, price, date, this.props.stockName, this.props.stockKey);
    this.amount.value = 0;
    this.price.value = this.props.stockPrice;
    this.date.value = today_calculated();
    this.animated.hide();
  };

  calculate_value = ()  => {
    const value = (this.amount.value && this.price.value) ?
    -this.state.action * parseFloat(this.amount.value) * parseFloat(this.price.value) : 0;
    this.setState({ value });
  };

  render(){
    const dialogStyles = {
      zIndex: 5000
    };
    const action = (this.state.action == 1) ? "Buy": "Sell";
    const modal = <SkyLight hideOnOverlayClicked ref={ref => this.animated = ref}
      title="Enter Amount to Buy or Sell"
      transitionDuration={500}
      dialogStyles={dialogStyles}
      >
      <div className="grid-edit stock-edit">
        <span className="heading">Name</span>
        <span className="heading">Current Amount</span>
        <span className="heading">Categories</span>
        </div>
        <div className="grid-edit stock-edit">
            <span>{this.props.stockName}</span>
            <span>{this.props.stockAmount}</span>
            <span>{this.props.categories}</span>
        </div>
        <div className="grid-edit stock-edit">
        <span className="heading">Action</span>
        <span className="heading">Amount</span>
        <span className="heading">Price</span>
        <span className="heading">Value</span>
        <span className="heading">Date </span>
        </div>
        <form ref={(input) => this.stockForm = input} className="grid-edit stock-edit" onSubmit={(e) => this.newRecord(e)}>
            <span className="heading">{action}</span>
            <input ref={(input) => this.amount = input} type="number" placeholder="Stock Amount"
               defaultValue="0" onChange={this.calculate_value} required/>
            <input ref={(input) => this.price = input} type="number" placeholder="Stock Price"
            defaultValue={this.props.stockPrice} onChange={this.calculate_value}/>
            <span>{this.state.value}</span>
            <input ref={(input) => this.date = input} type="date" placeholder="Action Date"
            defaultValue={today_calculated()}/>
        </form>

      <div className="grid-edit modal-edit">
          <button type="submit" className="closeButton" onClick={() => this.newRecord()}>
              Save and Close
          </button>
      </div>

      </SkyLight>
    return (
      <span>
      <button onClick={(e) =>{
        e.preventDefault();
        this.animated.show();
        this.actionStock(e,1)}}>
          B
      </button>
      <button disabled={this.props.stockAmount==0} onClick={(e) => {
        e.preventDefault();
        this.animated.show();
        this.actionStock(e,-1)}}>
          S
      </button>
      { modal }
      </span>
    )
  }

};

export default NewTradeRecord;
