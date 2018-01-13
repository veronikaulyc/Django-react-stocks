import React from 'react';

class UserCurrency extends React.Component {

  render(){
    return(
      <div className="grid-edit currency-edit">
      <span className="heading">Your currency:</span>
      <select name="currency" onChange={(e) => this.props.updateCurrency(e)}
        value={this.props.currency}>
        {Object.keys(this.props.currency_names).map((key) =>
           {return (<option value={key} key={key}> {this.props.currency_names[key]}</option>)
        })}
      </select>
      </div>
    )
  }
}

export default UserCurrency;
