import { useEffect, useRef } from "react";
import Carousel from "./carousel/Carousel";
import "./CenterPanel.css";

function CenterPanel({ children, activeSlide, onSlideChange }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.clientWidth;
      carouselRef.current.scrollLeft = slideWidth * activeSlide;
    }
  }, [activeSlide]);

  return (
    <div className="CenterPanel">
      <Carousel onScrollEnd={onSlideChange} ref={carouselRef}>
        {children}
      </Carousel>
    </div>
  );
}

export default CenterPanel;