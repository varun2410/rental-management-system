import React from 'react';
import {
  Link
} from "react-router-dom";
import { withRouter } from "react-router";

import HeaderDropdown from '../dropdown/HeaderDropdown';
import './css/header.css';

class Header extends React.Component {
  onLocationSelect = (selectedLocation) => {
    this.props.history.push('/category', {
      selectedLocation: {
        id: selectedLocation.dealers_id,
      },
    });
  }

  onBranchSelect = (selectedLocation, selectedBranch) => {
    this.props.history.push('/category', {
      selectedLocation: {
        id: selectedLocation.dealers_id,
      },
      selectedBranch: {
        id: selectedBranch.dealers_id,
      },
    });
  }

  render() {
    return (
      <header className='header'>
        <div className='brand'><Link to="/">Rental Management System</Link></div>
        <HeaderDropdown
          data={this.props.data.locations}
          onSelectLocation={this.onLocationSelect}
          onSelectBranch={this.onBranchSelect}
        />
      </header>
    )
  }
};

export default withRouter(Header);
