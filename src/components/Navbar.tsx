import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

interface NavbarProps {
  uploadedImage?: File | null | undefined;
  showAvatar: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ uploadedImage, showAvatar }) => {
  
  return (
    <div>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200  drop-shadow-md">
        <div className="max-w-[1628px] flex items-center justify-between mx-auto py-2 max-sm:p-2">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse w-[141px]">
            <div className="w-[64px] h-[64px] rounded-full bg-black text-white flex items-center justify-center">
              LOGO
            </div>
          </Link>
          <div className="flex items-center justify-center">
            <Link to="/" className="text-[#2A4B6A] text-xl dark:text-blue-500 underline underline-offset-4 font-semibold text-center">
              Home
            </Link>
          </div> 
          <div className="flex order-2 lg:order-1 space-x-3 rtl:space-x-reverse w-[141px]">
            {showAvatar && uploadedImage ? (
              <div className="w-[64px] h-[64px] rounded-full bg-black text-white flex items-center justify-center">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={URL.createObjectURL(uploadedImage)}
                  alt="User Avatar"
                />
              </div>
            ) : (
              <Link
                to="/signIn"
                type="button"
                className="flex items-center justify-center w-[141px] h-[48px] text-white bg-[#2A4B6A] font-medium rounded-full text-xl text-center drop-shadow-md"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  uploadedImage: PropTypes.oneOfType([PropTypes.instanceOf(File), PropTypes.oneOf([null, undefined])]),
  showAvatar: PropTypes.bool.isRequired,
};

export default Navbar;