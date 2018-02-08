import React from 'react';
import SkyLight from 'react-skylight';


class NewTradeRecord extends React.Component {
  state = {
    action : 1,
  };

  actionStock = (e,action) => {
    console.log('buying or selling');
    e.preventDefault();
    this.setState({ action });
    this.animated.show();
  };

  newRecord = () => {
    this.animated.hide();
  };

  render(){
    const dialogStyles = {
      zIndex: 5000
    };
    const modal = <SkyLight hideOnOverlayClicked ref={ref => this.animated = ref}
      title="Enter Amount to Buy or Sell"
      transitionDuration={500}
      dialogStyles={dialogStyles}
      >
      <div className="grid-edit stock-edit">
        <span className="heading">Name</span>
        <span className="heading">Current Amount</span>
        <span className="heading">Categories</span>
        <span className="heading">Action</span>
        <span className="heading">Amount</span>
        <span className="heading">Price</span>
        <span className="heading">Value</span>
        <span className="heading">Date </span>
      </div>
      <form ref={(input) => this.stockForm = input} className="grid-edit stock-edit" onSubmit={(e) => this.newRecord(e)}>
       <span>{this.props.stockName}</span>
        <span>{this.props.stockAmount}</span>
       <select ref={(input) => this.action = input} required >
        <option value="1">Buy</option>
        <option value="-1">Sell</option>
       </select>
      <input ref={(input) => this.amount = input} type="number" placeholder="Stock Amount" required/>
      <input ref={(input) => this.price = input} type="number" placeholder="Stock Price" />
      <span>Value</span>
      <input ref={(input) => this.date = input} type="date" placeholder="Action Date" />


      <div className="grid-edit modal-edit">
          <button type="submit" className="closeButton" onClick={() => this.newRecord()}>
              Save and Close
          </button>
      </div>
        </form>
      </SkyLight>
    return (
      <span>
      <button onClick={(e) =>this.actionStock(e,1)}>
          B
      </button>
      <button disabled={this.props.stockAmount==0} onClick={(e) =>this.actionStock(e,-1)}>
          S
      </button>
      </span>
    )
  }

};

export default NewTradeRecord;
