import React from "react";

const Navbar = () => {
    const handleGithub=()=>{
        // alert('hi')
        window.location.href="http://github.com"
    }
    const handleFaceBook=()=>{
      window.location.href="http://facebook.com"
    }
    const handleLinkedIn=()=>{
      window.location.href="http://linkedin.com"
    }
  return (
    <>
      <nav className="bg-slate-900 text-white ">
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
          <div div className="logo font-bold text-xl">
            <span className="text-green-500"> &lt;</span>
            Pas
            <span className="text-green-500">Store/&gt;</span>
          </div>
          {/* <ul>
            <li className="flex gap-4">
              <a className="hover:font-bold" href="#">
                Home
              </a>
              <a className="hover:font-bold" href="#">
                About
              </a>
              <a className="hover:font-bold" href="#">
                Contact Us
              </a>
            </li>
          </ul> */}
          <div className="flex">
          <button onClick={handleGithub} className=" cursor-pointer ">
            <img className="invert  w-12 px-1" src="/github.svg" alt="github Logo" />
          </button>
          <button className="cursor-pointer" onClick={handleFaceBook}>
            <img className=" w-12 px-1" src="/facebook.svg" alt="Facebook Logo" />
          </button>
          <button className="cursor-pointer" onClick={handleLinkedIn}>
            <img className="w-12 px-1" src="/linkedin.svg" alt="LinkedIn Logo" />
          </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
