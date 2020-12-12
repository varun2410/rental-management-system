import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import FontAwesome from 'react-fontawesome'

import './css/category.css'

const ELEMENT_PER_LINE = 4;

const getAllSubCategories = (data, state) => {
  if (!state) return [];
  const { selectedLocation, selectedBranch, selectedCategory } = state;
  const locationData = data.locations.find(location => location.dealers_id === selectedLocation.id);
  let categories = [];
  if (!selectedBranch) {
    locationData.branches.forEach(branch => categories = categories.concat(branch.categories));
  } else {
    const branchData = locationData.branches.find(branch => branch.branch_id === selectedBranch.id);
    categories = categories.concat(branchData.categories);
  }

  const subCategories = categories.find(category => category.name === selectedCategory);

  return subCategories.subcategories;
}

class SubCategory extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.history.location?.state?.selectedCategory
      || !this.props.history.location?.state?.selectedLocation
      || !Object.keys(this.props.history.location?.state?.selectedLocation)
    ) {
      this.props.history.push('/');
    }
  }

  onCategorySelect = (category) => {
    this.props.history.push('/category', {
      ...this.props.history.location.state,
    });
  }

  render() {
    const allSubCategories = getAllSubCategories(this.props.data, this.props.history.location.state);
    const totalEmptySpacesToRender = new Array(ELEMENT_PER_LINE - (allSubCategories.length % ELEMENT_PER_LINE)).fill(Math.random());
    console.log(totalEmptySpacesToRender);
    return (
      <div>
        <div className="sub-category-heading">
          <span className="link-to-category" onClick={this.onCategorySelect}>Equipment Catalog</span> / {this.props.history.location.state.selectedCategory}
        </div>
        <div className="catalog-display">
          { allSubCategories.map(category => (
              <div className="category-wrapper">
                <img
                  src={`${window.location.origin}/category/subcategory/${category.image}`}
                  alt={category.name}
                  className="category-image"
                />
                <span className="category-title-wrapper">
                  <span className="category-title">{category.name}</span>
                  <span className="category-title-right-arrow"><FontAwesome name="caret-right" /></span>
                </span>
              </div>
            ))
          }
          {/* Render Empty Spaces */}
          { totalEmptySpacesToRender.map(() => (<div className="empty-category-wrapper" />)) }
        </div>
      </div>
    );
  }
};

SubCategory.propTypes = {
  data: PropTypes.any.isRequired,
};

export default withRouter(SubCategory);
