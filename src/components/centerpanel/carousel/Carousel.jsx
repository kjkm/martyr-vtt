import { forwardRef, useEffect, useRef } from "react";
import "./Carousel.css";

const Carousel = forwardRef(({ children, onScrollEnd }, ref) => {
  const internalRef = useRef(null);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        if (internalRef.current) {
          const slideWidth = internalRef.current.clientWidth;
          const newActiveSlide = Math.round(internalRef.current.scrollLeft / slideWidth);
          if (onScrollEnd) {
            onScrollEnd(newActiveSlide);
          }
        }
      }, 50); 
    };

    const carouselElement = internalRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", handleScroll);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [onScrollEnd]);

  return (
    <div className="Carousel" ref={(el) => {
      internalRef.current = el;
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    }}>
      {children.map((child, index) => (
        <div className="Carousel-slide" key={index}>
          {child}
        </div>
      ))}
    </div>
  );
});

export default Carousel;
