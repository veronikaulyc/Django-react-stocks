import React from 'react';

class StockHeader extends React.Component {
  render(){
    return (
      <div className="grid-edit stock-edit">
        <span className="heading">Name</span>
        <span className="heading">Amount</span>
        <span className="heading">
          Categories
          <span className="icon-heading">
          <i className="fa fa-pie-chart" aria-hidden="true"></i>
          </span>
        </span>
        <span className="heading">Price</span>
        <span className="heading">Value</span>
        <span className="heading">% of Total </span>
        
      </div>
    )}
}
export default StockHeader;
