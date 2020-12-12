import React from 'react';
import {
  Link
} from "react-router-dom";

import './css/header.css';

const Header = () => {
	return (
		<header className='header'>
			<div className='brand'><Link to="/">Rental Management System</Link></div>
		</header>
	)
};

export default Header;
