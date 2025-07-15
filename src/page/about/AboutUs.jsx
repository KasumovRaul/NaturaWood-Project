import React, { useEffect } from 'react'
import imgBanner from "../../../public/images/Sixinch-1-e1614795015128.jpg"
import aboutImg from "../../../public/images/r.png" 
import "./AboutUs.css"
import CountUp from 'react-countup';


const AboutUs = () => {

   useEffect(()=>{
      window.scrollTo(0,0)
   },[]);

  return (
    <>
       <div className="about">
          <div className="about-container">
              <div className="about-banner-header">
                  <div className="about-banner-image">
                     <img src={imgBanner} alt="about"/>  
                   </div>  
                   <div className="about-banner-title">
                      <p>About Us</p> 
                     </div>                   
              </div>
              <div className="about-content">
                  <div className="about-name">
                      <h1>NaturaWood Georgia</h1>
                  </div>
                  <div className="about-content-image">
                     <img src={aboutImg} alt="aboutImg" />
                  </div>
                  <div className="about-content-title">
                     <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum aliquid,
                             libero iusto vero provident tempore accusamus saepe inventore nulla quaerat 
                             aut eos beatae dolorem, minima natus perspiciatis, fugit placeat voluptatem tempora.
                              Sed molestiae repudiandae voluptates, sapiente numquam voluptate deserunt quibusdam 
                              nostrum ea perferendis quasi ipsum aperiam expedita nam quis, asperiores,
                               natus assumenda! Deserunt magnam obcaecati aperiam minima cum! Unde fugit magni,
                                inventore quaerat reprehenderit saepe eligendi nostrum soluta! Sapiente nostrum 
                                aliquam praesentium ab odio cumque iure! Minima numquam adipisci aut earum ratione 
                                tempore saepe perspiciatis deserunt quod officiis, ea 
                            praesentium ipsum expedita repellendus dolor corporis quis nobis aperiam! Soluta, dolorem.</span>
                  </div>
               </div>
                  <div className="about-stats">
                      <div className="about-stats-header">
                         <h1>We work on all aspects of planning</h1>   
                     </div>
                     <div className="stat-content">
                     <div className="stat-box">
                        <h2><CountUp start={0} end={2225} duration={5}/>+</h2>
                        <p>Company Partnership</p>
                     </div>
                        <div className="stat-box">
                            <h2>
                             <CountUp start={0} end={157} duration={5} />+
                            </h2>
                             <p>Number of Stores</p>
                             </div>
                             <div className="stat-box">
                              <h2>
                              <CountUp start={0} end={769} duration={5} />+
                             </h2>
                              <p>Projects</p>
                             </div>
                             </div>
                      </div>
          </div>
       </div>
    </>
  )
}

export default AboutUs