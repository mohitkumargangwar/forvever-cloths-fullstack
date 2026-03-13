import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";

import rabbitHeroImg from "../../assets/rabbitHeroImg.webp";
import winterImg from "../../assets/winter.jpg";
import diwaliImg from "../../assets/diwali.webp";

function Hero() {
  const slides = [
    { src: rabbitHeroImg, alt: "Featured look" },
    { src: winterImg, alt: "Winter collection" },
    // { src: diwaliImg, alt: "Diwali collection" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
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
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 md:from-black/50 md:to-black/75 flex items-center justify-center">
                <motion.div 
                  className="text-center text-white px-4 sm:px-6 py-8 sm:py-10 max-w-4xl w-full"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <motion.h1 
                    className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter uppercase mb-3 sm:mb-4 leading-tight"
                    variants={itemVariants}
                  >
                    Vacation <br /> Ready
                  </motion.h1>
                  <motion.p 
                    className="text-xs sm:text-sm md:text-base lg:text-lg tracking-tighter mb-5 sm:mb-6 text-gray-100 leading-relaxed"
                    variants={itemVariants}
                  >
                    Explore our vacation-ready outfits with fast worldwide shipping.
                  </motion.p>
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/collections/all"
                      className="inline-block bg-white text-black px-4 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base lg:text-lg font-semibold border border-white hover:bg-transparent hover:text-white transition duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
                    >
                      Shop Now
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </section>
  );
}

export default Hero;