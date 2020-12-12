import React from 'react';
import './css/headerDropdown.css';

class Branches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    }
  }

  toggleHidden = () => {
    this.setState({
      isHovered: !this.state.isHovered
    })
  }

  render() {
    const { branch, location } = this.props;
    return (
      <div
        className='singleModule'
        onMouseEnter={this.toggleHidden}
        onMouseLeave={this.toggleHidden}
        onClick={() => this.props.onSelectBranch(location, branch)}
      >
        {branch.name}
      </div>
    )
  }
}

class LocationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  toggleHidden = () => {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  render() {
    const { location } = this.props;
    return (
      <div
        className='locationItem'
        onMouseEnter={this.toggleHidden}
        onMouseLeave={this.toggleHidden}
        onClick={() => this.props.onSelectLocation(location)}
      >
        {location.name}
        <div className={`branches ${this.state.isVisible ? 'visible': ''}`}>
          {location.branches.map(branch => (
            <Branches
              branch={branch}
              location={location}
              onSelectBranch={this.props.onSelectBranch}
            />
          ))}
        </div>
      </div>
    )
  }
}

class HeaderDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.state = {
      isVisible: false
    }
  }

  toggleHidden () {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  componentDidUpdate() {
    const { isVisible } = this.state;

    setTimeout(() => {
      if (isVisible) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  close = () => {
    this.setState({
      isVisible: false,
    });
  }

  render() {
    const data = this.props.data;
    return (
      <div className='headerDropdownWrapper' onClick={this.toggleHidden}>
        <div className='dropdown-title'>
          Select Location
        </div>
        <div className={`headerDropDown ${this.state.isVisible ? 'visible': ''}`}>
          {data.map(location => (
            <LocationsList
              location={location}
              onSelectLocation={this.props.onSelectLocation}
              onSelectBranch={this.props.onSelectBranch}
            />
          ))
          }
        </div>
      </div>
    )
  }
}

export default HeaderDropdown;
