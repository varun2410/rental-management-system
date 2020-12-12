import React from 'react';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

import Dropdown from '../dropdown/Dropdown';

import './css/homePage.css';

const getLocations = data => (
  data.locations.map(item => ({
    id: item.dealers_id,
    title: item.name,
  }))
);

const getBranch = (data, selectedLocation) => {
  if (!selectedLocation) return [];
  const location = data.locations.find(item => item.dealers_id === selectedLocation.id);

  return location.branches.map(branch => ({
    id: branch.branch_id,
    title: branch.name,
  }));
}

class HomePage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedLocation: null,
      selectedBranch: null,
    };
  }

  onLocationSelect = (selectedLocation) => (
    this.setState({
      selectedLocation,
    })
  )

  onBranchSelect = (selectedBranch) => (
    this.setState({
      selectedBranch,
    })
  )

  onSearch = () => {
    const { selectedBranch, selectedLocation } = this.state;
    this.props.history.push('/category',
      {
        selectedLocation,
        selectedBranch,
      }
    )
  }

  render() {
    const { selectedLocation } = this.state;
    const { data } = this.props;
    return (
      <div className="content">
        <div className="title">
          WELCOME TO THE RENTAL MANAGEMENT SYSTEM
        </div>
        <div className="location-selector-wrapper">
          <div className="dropdown">
            <Dropdown
              list={getLocations(data)}
              onSelect={this.onLocationSelect}
            />
          </div>
          <div className="dropdown">
            <Dropdown
              list={getBranch(data, selectedLocation)}
              onSelect={this.onBranchSelect}
              headerTitle={'Select Branch'}
              disabled={!selectedLocation}
            />
          </div>
          <button
            className={`search-button ${!selectedLocation ? 'disabled' : ''}`}
            onClick={this.onSearch}
            disabled={!selectedLocation}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
};

HomePage.propTypes = {
  data: PropTypes.any.isRequired,
};

export default withRouter(HomePage);
