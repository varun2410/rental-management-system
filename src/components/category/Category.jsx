import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import FontAwesome from 'react-fontawesome'

import './css/category.css'

const ELEMENT_PER_LINE = 4;

const getAllCategories = (data, state) => {
  if (!state) return [];
  const { selectedLocation, selectedBranch } = state;
  const locationData = data.locations.find(location => location.dealers_id === selectedLocation.id);
  let categories = [];
  if (!selectedBranch) {
    locationData.branches.forEach(branch => categories = categories.concat(branch.categories));
  } else {
    const branchData = locationData.branches.find(branch => branch.branch_id === selectedBranch.id);
    categories = categories.concat(branchData.categories);
  }

  return categories;
}

class Category extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.history.location?.state?.selectedLocation || !Object.keys(this.props.history.location?.state?.selectedLocation)) {
      this.props.history.push('/');
    }

    // this.onCategorySelect = this.onCategorySelect.bind(this);
  }

  onCategorySelect = (category) => {
    console.log(this.props);
    this.props.history.push('/sub-category', {
      ...this.props.history.location.state,
      selectedCategory: category.name,
    });
  }

  render() {
    const allCategories = getAllCategories(this.props.data, this.props.history.location.state);
    const totalEmptySpacesToRender = new Array(ELEMENT_PER_LINE - (allCategories.length % ELEMENT_PER_LINE)).fill(Math.random());
    return (
      <div>
        <div className="empty-space"></div>
        <div className="heading" data-text="Let's Choose">
          Equipment Catalog
        </div>
        <hr className="hr" />
        <div className="catalog-display">
          { allCategories.map(category => (
              <div className="category-wrapper" onClick={() => this.onCategorySelect(category)}>
                <img
                  src={`${window.location.origin}/category/${category.image}`}
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

Category.propTypes = {
  data: PropTypes.any.isRequired,
};

export default withRouter(Category);
