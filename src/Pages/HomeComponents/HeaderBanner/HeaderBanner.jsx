import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import './styles.css'
import 'animate.css';
import img1 from "../../../assets/images/banner1.webp";
import img2 from "../../../assets/images/banner2.webp";
import img3 from "../../../assets/images/banner3.webp";
import { Link } from "react-router-dom";


function HeaderBanner() {
  return (
    <div className="max-h-[600px]">
      <div className="relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide className="w-[20px] ">
            <img className="overflow-hidden md:max-h-[600px]" src={img1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="w-[20px] ">
            <img className="overflow-hidden md:max-h-[600px]" src={img2} alt="" />
          </SwiperSlide>
          <SwiperSlide className="w-[20px] ">
            <img className="overflow-hidden md:max-h-[600px]" src={img3} alt="" />
          </SwiperSlide>
        </Swiper>
        <div className="absolute top-0 bg-[#111111a2] z-10 w-full min-h-full">
          {/* This div is use for a overlay on background image */}
        </div>

        <div className="px-6 lg:px-0 w-full md:space-y-4 text-center z-20 absolute top-[45%] left-1/2 text-white -translate-x-1/2 -translate-y-1/2">
          <h1 className="animate__animated animate__fadeInDown text-2xl lg:text-5xl lg:font-black font-bold pt-4">Join as a donor</h1>
          <p className="animate__animated animate__fadeInDown md:text-xl pt-4 pb-2 lg:pb-6"> Donate blood, save lives. Be a hero today!</p>
          <Link to='/donate'>
            <button className="bg-[#FF204E] md:text-xl font-semibold btn text-white border-none hover:bg-red-600 px-12">Search Donors</button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default HeaderBanner;
