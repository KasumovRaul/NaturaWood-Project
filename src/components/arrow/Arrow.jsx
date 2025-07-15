import React, { useEffect, useState } from 'react';
import { FaCircleArrowUp } from "react-icons/fa6";
import "./Arrow.css";

const Arrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(()=>{
    const handleScroll = () =>{
    const scrolledY = window.scrollY;
    const windowHeight = window.innerHeight;
    setIsVisible(scrolledY > windowHeight);
  };

   window.addEventListener("scroll", handleScroll);
   return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  const scrollToTop = () =>{
    window.scrollTo({ top:0, behavior: "smooth"});
  };
 

  return (
    <>
     {
      isVisible && (
        <div className="arrows" onClick={scrollToTop}>
           <div className="arrow-content">
               <span><FaCircleArrowUp /></span>
           </div>
        </div>
      )
     }
    </>
  );
};

export default Arrow;
