import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome'

import './css/dropdown.css';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      headerTitle: this.props.headerTitle,
    };
  };

  componentDidUpdate() {
    const { listOpen } = this.state;

    setTimeout(() => {
      if (listOpen) {
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
      listOpen: false,
    });
  }

  toggleList = () => {
    if (this.props.disabled) return;

    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  selectItem = (selectedItem) => {
    this.setState({
      headerTitle: selectedItem.title,
    });
    this.props.onSelect(selectedItem);
  }

  render(){
    const{ list, disabled } = this.props
    const{ listOpen, headerTitle } = this.state
    return(
      <div className="dd-wrapper">
        <div className={`dd-header ${disabled ? 'disabled' : ''}`} onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
            {listOpen
              ? <FontAwesome name="angle-up"/>
              : <FontAwesome name="angle-down"/>
            }
        </div>
        {listOpen && <ul className="dd-list">
          {list.map((item) => (
            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item)} >{item.title}</li>
          ))}
        </ul>}
      </div>
    )
  }
};

Dropdown.propTypes = {
  list: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  headerTitle: PropTypes.string,
};

Dropdown.defaultProps = {
  list: [],
  disabled: false,
  headerTitle: 'Select Location',
};

export default Dropdown;