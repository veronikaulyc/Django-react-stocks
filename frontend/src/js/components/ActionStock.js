import React from 'react';
import SkyLight from 'react-skylight';


class ActionStock extends React.Component {
  state ={
    action : 1,
  };

  actionStock = (e,action) => {
    console.log('buying or selling');
    e.preventDefault();
    this.setState({ action });
    this.animated.show();
  };

  newTradeRecord = () => {
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
      <div className="grid-edit modal-edit">
          <button className="closeButton" onClick={() => this.newTradeRecord()}>
              Save and Close
          </button>
      </div>
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

export default ActionStock;
