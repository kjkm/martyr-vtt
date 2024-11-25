import { forwardRef } from "react";
import "./Carousel.css";

const Carousel = forwardRef(({ children }, ref) => {
  return (
    <div className="Carousel" ref={ref}>
      {children.map((child, index) => (
        <div className="Carousel-slide" key={index}>
          {child}
        </div>
      ))}
    </div>
  );
});

export default Carousel;
