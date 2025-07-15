import React, { useEffect } from "react";
import imgShow from "../../../public/images/showImg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import swiper1 from "../../../public/images/swiper1.jpg";
import swiper2 from "../../../public/images/swiper2.jpg";
import swiper3 from "../../../public/images/swiper3.jpeg";
import swiper4 from "../../../public/images/swiper4.jpg";
import swiper5 from "../../../public/images/swiper5.jpeg";
import "./ShowRoom.css"
import { ImCheckboxChecked } from "react-icons/im";

const ShowRoom = () => {

       useEffect(()=>{
         window.scrollTo(0,0);
       },[]);

  return (
    <>
      <div className="showroom-container">
        <div className="showroom-section">
          <div className="showroom-header-img">
            <img src={imgShow} alt="showImg.jpg" />
          </div>
          <div className="showroom-populated">
            <div className="showroom-populated-title">
              <div className="populated-liner">
                <h2>News from us</h2>
              </div>
              <div className="showroom-populated-conatiner-info">
                <p><ImCheckboxChecked />&nbsp;
                   Recently, an internal installment service was introduced in
                  the <strong>NaturaWood</strong> store chain.
                </p>
                <br />
                <p><ImCheckboxChecked />&nbsp;
                  Internal installments give you the chance to purchase your
                  desired furniture in installments.
                </p>
                <br />
                <p><ImCheckboxChecked />&nbsp;
                  The main thing is that with domestic installments, you will
                  also benefit from current discounts.
                </p>
                <br />
                <p><ImCheckboxChecked />&nbsp;
                  <strong >NaturaWood</strong> is the first and only furniture
                  store in Georgia that offers internal installment payments to
                  its loyal customers.
                </p>
              </div>
              <Swiper
                slidesPerView={"auto"}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={swiper1} alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={swiper2} alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={swiper4} alt="Slide 4" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={swiper5} alt="Slide 5" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowRoom;
