import React, { useState } from 'react';
import './index.css';
import AddAImage from '../AddAImage';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  return (<div>
    <AddAImage show={showAddImageModal} setShow={setShowAddImageModal} />
    <nav className="navbar">
      <div className="navbar-logo">Dilip <FavoriteBorderOutlinedIcon /> Raksha</div>
      <ul className={`navbar-links ${open ? 'active' : ''}`}>
        <li onClick={() => setShowAddImageModal(true)}>Upload A New Image</li>
        <li>Change PlayList</li>
      </ul>
      <button className="navbar-toggle" onClick={() => setOpen(!open)}>☰</button>
    </nav>
  </div>)
};

export default NavBar;