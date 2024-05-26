import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import Job from "./Job";
import Company from "./Company"
import "./Carousel.css"

const Carousel = ({ components }) => {
    //components is an array of components
    const [items, setItems] = useState([])
    const [activeIndex, setActiveIndex] = useState(0)
    const location = useLocation();
    const path = location.pathname.substring(1).split('/');

    useEffect(() => {
        const carouselComp = []
        let idx = 0
        let x = path[0] === "companies" && !path[1] ? 4 : 6
        while (idx < components.length) {
            const newArr = []
            for (let i = 0; i < x; i++) {
                newArr.push(components[idx])
                idx++
            }
            carouselComp.push(newArr)
        }
        setItems(carouselComp)
    }, [components])

    const handleNext = () => {
        setActiveIndex(activeIndex + 1)
    }

    const handlePrevious = () => {
        setActiveIndex(activeIndex - 1)
    }

    return (
        <div className="Carousel">
            <div className="Carousel-items">
                {items[activeIndex]}
                <p className="Carousel-pagecount">Page {activeIndex + 1} of {items.length}</p>
            </div>
            <div className="Carousel-buttons">

                <div className="Carousel-previous">
                    {activeIndex === 0 ? "" :
                        <i className="fa-solid fa-angle-left" onClick={handlePrevious}></i>
                    }
                </div>

                <div className="Carousel-next">
                    {activeIndex === items.length - 1 ? "" :
                        <i className="fa-solid fa-angle-right" onClick={handleNext}></i>
                    }
                </div>

            </div>


        </div>
    )
}

export default Carousel
