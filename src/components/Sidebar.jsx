import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open z-50">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
