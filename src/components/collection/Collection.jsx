import React from 'react'
import image1 from "../../../public/images/collectıon1.jpg";
import image2 from "../../../public/images/collectıon2.webp";
import image3 from "../../../public/images/collectıon3.webp";
import image4 from "../../../public/images/collectıon4.jpg";
import image5 from "../../../public/images/collectıon5.jpg";
import "./Collection.css"

const Collection = () => {

   const images = [
       {image: image1, label:"Sofa"},
       {image: image2, label:"Desktop"},
       {image: image3, label:"Bed"},
       {image: image4, label:"Sofa"},
       {image: image5, label:"Chair"},
    ];

  return (
    <>
       <section className="collection-section">
          <div className="collection-sec-container">
             <div className="collection-content">
                <div className="collection-header">
                     <h1>Model Collections</h1>
                </div>
                <div className="collection__content__inner">
                   {
                     images.map((img)=>(
                       <div className="content-image" data-label={img.label}>
                          <img src={img.image} alt={img.label} />
                       </div> 
                     ))
                   }
                </div>
              </div>   
           </div>                
        </section>
    </>
  )
}

export default Collection