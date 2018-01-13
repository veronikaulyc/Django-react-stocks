import React from 'react';
import SkyLight from 'react-skylight';

class CategoriesSelect extends React.Component {
  state = {
    chosenCategories : this.props.chosenCategories
  }

  addCategoryForm(event){
    event.preventDefault();
    const chosenCategories = {...this.state.chosenCategories};
    chosenCategories[this.category.value] = parseFloat(this.percentage.value);
    this.setState({ chosenCategories });
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
    const category = this.state.chosenCategories[key];
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


  render(){
    const Categories = (this.state.chosenCategories) ? Object.keys(this.state.chosenCategories).map(this.renderChosenCategories) : '';
    const dialogStyles = {
      zIndex: 5000
    };
    const modal = <SkyLight hideOnOverlayClicked ref={ref => this.animated = ref}
      title="Add Categories to the Stock"
      transitionDuration={500}
      dialogStyles={dialogStyles}
      >
    Stock Name: {this.props.stock}
    <div className="grid-edit modal-edit">
      <span className="heading">Category Name </span>
      <span className="heading">Category Percentage </span>
    </div>
    {Categories}
    <div className="grid-edit modal-edit" ref={(input) => this.categoryForm = input}>
      <select ref={(input) => this.category = input} name="category" required>
        {Object.keys(this.props.categories).map(this.props.renderCategories)}
      </select>
      <input type="number" name="percentage"  placeholder="%" ref={(input) => this.percentage = input}
      />
      <button onClick={(e) => this.addCategoryForm(e)}>+ Add categories</button>
    </div>
      <div className="grid-edit modal-edit"><button className="closeButton" onClick={() => console.log('close')}> Save and Close </button></div>
        </SkyLight>
    return (
      <div>
        <button className="addCategory" onClick={(e) => {e.preventDefault(); this.animated.show()}}>
          <i className="fa fa-pie-chart" aria-hidden="true"></i>
        </button>
        { modal }
      </div>
    )
  }
}

export default CategoriesSelect;
