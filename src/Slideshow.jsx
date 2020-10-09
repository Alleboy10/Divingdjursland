import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Slideshow.css';

function Slideshow () {
    return (
      <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <img src="/img/IMG_20180825_095538 1.jpg" alt="img1"/>
          </div>
          <div className="each-slide">
            <img src="/img/IMG_20190412_205033 1.jpg" alt="img2"/>
          </div>
          <div className="each-slide">
            <img src="img/IMG_20190726_092630 1.jpg" alt="img3"/>
          </div>
        </Slide>
      </div>
    )
}

export default Slideshow;