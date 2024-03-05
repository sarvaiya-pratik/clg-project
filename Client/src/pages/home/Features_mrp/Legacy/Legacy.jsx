import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./styles.css";


function Legacy() {
    const sliderImages = [
        {
            url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcTdUmK6fRPfPQIMyOxUOjiTnR2VYizvkkWUxLhGoVJNobm5Id3fpRhsIGtPj3H06ujPb4&usqp=CAU",
        },
        {
            url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcQduUpBWhSdgkWqqIrSmw5MMU697Xlx3SCjlB4eZSv0Q&s",
        },
        {
            url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcTnzApyh1ZmbXLBUg_iFRio23hzRyAJfwBRfnVozXdEnu-NK4jFt2_gsYujKf-CbT6Cr_A&usqp=CAU",
        },
        {
            url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcTDnfOIY9gjVyoT4ulMp55roiV5KefqaDByUc0HdD8p3tdpXuwxTaXjhLdyUFeQzZ2ZwE&usqp=CAU",
        },
        {
            url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcR3IVlvufXIDZXxq0O8SVqwU2HeO6y7as0OXJl-YT55BA&s",
        },
        {
            url: "https://encryptedtbn0.gstatic.com/images?q=tbn:ANd9GcQs_7aafRRY4vEbWz2wydowaogMmGI7mRVG6MQfZVtKDFXUGqt5iF-Mu0AYMQBEeznPkU&usqp=CAU",
        },
        {
            url: "https://smartslider3.com/wpcontent/uploads/2019/01/photo_slideshow.jpg",
        },
    ];

    const [activeImageNum, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        let interval;

        if (autoPlay) {
            interval = setInterval(() => {
                nextSlide();
            }, 3000); // Adjust the time interval as needed
        }

        return () => clearInterval(interval);
    }, [autoPlay, activeImageNum]);

    const nextSlide = () => {
        setCurrent((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
    };

    const handleDotClick = (index) => {
        setCurrent(index);
    };

    const toggleAutoPlay = () => {
        setAutoPlay((prev) => !prev);
    };

    return (
        <div id="lagacy">
            <h2>Creating the image slider from scratch in ReactJS</h2>
            <section className="image-slider">
                <div className="left" onClick={prevSlide}>
                    <ArrowBackIosIcon />
                </div>
                <div className="right" onClick={nextSlide}>
                    <ArrowForwardIosIcon />
                </div>
                <div className="auto-play-toggle" onClick={toggleAutoPlay}>
                    {autoPlay ? "Pause" : "Play"}
                </div>
                <div className="slider-container">
                    {sliderImages.map((currentSlide, ind) => (
                        <div
                            className={
                                ind === activeImageNum ? "currentSlide active" : "currentSlide"
                            }
                            key={ind}
                        >
                            {ind === activeImageNum && (
                                <>
                                    <img src={currentSlide.url} alt={`Slide ${ind}`} className="image" />
                                    <div className="caption">{`Image ${ind + 1} Caption`}</div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className="indicator-dots">
                    {sliderImages.map((_, index) => (
                        <span
                            key={index}
                            className={index === activeImageNum ? "dot active" : "dot"}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
                <div className="slide-counter">{`${activeImageNum + 1} / ${sliderImages.length}`}</div>
            </section>
        </div>
    );
}


export default Legacy;
