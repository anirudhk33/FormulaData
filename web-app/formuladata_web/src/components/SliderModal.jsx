// src/components/SliderModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderModal = ({ images, isOpen, onRequestClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setCurrentSlide(current),
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Slider Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)", // Semi-transparent black overlay
        },
        content: {
          background: "black", // Black background for the modal content
          maxWidth: "500px",
          maxHeight: "600px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "8px",
          color: "white", // White text color for the modal content
        },
      }}
    >
      <Slider {...settings} initialSlide={currentSlide}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
      {/* <div className="flex justify-between mt-4">
        <button
          onClick={goToPrevSlide}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Prev
        </button>
        <button
          onClick={goToNextSlide}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div> */}
    </Modal>
  );
};

export default SliderModal;
