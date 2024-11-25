import { useEffect, useRef } from "react";
import Carousel from "./carousel/Carousel";
import "./CenterPanel.css";

function CenterPanel({ children, activeSlide }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * activeSlide,
        behavior: "smooth",
      });
    }
  }, [activeSlide]);

  return (
    <div className="CenterPanel">
      <Carousel ref={carouselRef}>{children}</Carousel>
    </div>
  );
}

export default CenterPanel;
