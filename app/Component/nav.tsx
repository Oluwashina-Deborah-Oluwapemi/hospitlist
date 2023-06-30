import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth'; // Import the 'auth' module explicitly
import firebaseConfig from '@/firebaseConfig';



const NavigationBar = () => {


  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="block h-8 w-auto mr-2"></div>
            <span className="text-white text-xl font-semibold">CareFinder</span>
          </div>
          <div>
            <div
              className="inline-block px-4 py-2 bg-orange-500 text-white font-semibold hover:bg-orange-600"
             // onClick={handleGoogleSignIn} // Call the handleGoogleSignIn function on button click
>
              Login with Google
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
