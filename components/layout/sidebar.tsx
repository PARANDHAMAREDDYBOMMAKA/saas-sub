import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-700 text-white w-64 p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-white">
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white">
              Settings
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-white">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
