import React from 'react'
import catImg from "../../../public/images/catImg-1.jpg"
import catChair from "../../../public/images/catChair.webp"
import catBed from "../../../public/images/catBed.jpg"
import catChild from "../../../public/images/catChild.avif"
import catTable from "../../../public/images/catTable.jpg"
import { useNavigate } from 'react-router-dom';
import "./Categories.css"

 const categories = [
  { name: "entrance", label: "Entrance", image: catImg },
  { name: "chair", label: "Chair", image: catChair },
  { name: "beds", label: "Bed", image: catBed },
  { name: "table", label: "Table", image: catTable },
  { name: "child", label: "Child", image: catChild },
];


const Categories = () => {

  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };


  return (
    <>
    <section className="elementor__categories">
      <div className="elementor__cat__category">
        <div className="cat__wrapper">
           <div className="cat__head">
             <h1>Categories</h1>
           </div>
           <ul className="cat__content">
              {
                categories.map((cat)=> (
                  <li key={cat.name} className='cat-wd-inner' onClick={()=> handleClick(cat.name)}>
                    <div className="cat-wd-img">
                       <img src={cat.image} alt={cat.label} />
                    </div>
                     <div className="cat-label">
                        <span>{cat.label}</span>
                     </div>
                  </li>
                ))
              }
           </ul>
        </div>
      </div>
    </section>
    </>
  )
}

export default Categories