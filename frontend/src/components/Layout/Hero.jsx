import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import rabbitHeroImg from "../../assets/rabbitHeroImg.webp";
import winterImg from "../../assets/winter.jpg";
import diwaliImg from "../../assets/diwali.webp";

function Hero() {
  const slides = [
    { src: rabbitHeroImg, alt: "Featured look" },
    { src: winterImg, alt: "Winter collection" },
    // { src: diwaliImg, alt: "Diwali collection" },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-[280px] sm:h-[350px] md:h-[500px] lg:h-[700px] xl:h-[800px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.alt}>
            <div className="relative w-full h-full">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 md:bg-black/65 flex items-center justify-center">
                <div className="text-center text-white px-4 sm:px-6 py-8 sm:py-10 max-w-4xl w-full">
                  <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tighter uppercase mb-3 sm:mb-4 leading-tight">
                    Vacation <br /> Ready
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg tracking-tighter mb-5 sm:mb-6 text-gray-100 leading-relaxed">
                    Explore our vacation-ready outfits with fast worldwide shipping.
                  </p>
                  <Link
                    to="/collections/all"
                    className="inline-block bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-sm text-sm sm:text-base lg:text-lg font-medium border border-transparent hover:bg-transparent hover:text-white hover:border-white transition duration-300 shadow-lg"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Hero;