import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EarthImage from '../images/earth.png';
import ReactCurvedText from 'react-curved-text'; 

const AroundTheWorld = () => {
  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(350);
  const [cx, setCx] = useState(175);
  const [cy, setCy] = useState(180);
  const [rx, setRx] = useState(120);
  const [ry, setRy] = useState(120);
  const [startOffset, setStartOffset] = useState(0);
  const [text, setText] = useState("around the woooorld");
  const [fontSize, setFontSize] = useState(36);
  const [textPathFill, setTextPathFill] = useState();
  const [dy, setDy] = useState(0);
  const [fill, setFill] = useState();
  const textProps = fontSize ? { style: { fontSize: fontSize, fontFamily: 'wotfard', fill: 'rgb(94, 113, 129)'} } : null;
  const textPathProps = textPathFill ? { fill: textPathFill } : null;
  const tspanProps = dy ? { dy: dy } : null;
  const ellipseProps = fill ? { style: `fill: ${fill}` } : null;

  return (
     <div className='flex flex-wrap justify-center'>
        <div className="centered-content" style={{ position: 'relative'}}>
          <ReactCurvedText
            width={width}
            height={height}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            startOffset={startOffset}
            reversed={true}
            text={text}
            textProps={textProps}
            textPathProps={textPathProps}
            tspanProps={tspanProps}
            ellipseProps={ellipseProps}
            svgProps={{ className: "rotating-curved-text" }}
          />
          <img src={EarthImage} alt="Earth" className="earth-image" style={{ position: 'absolute', top: 75, 
              left: 75, width: '200px', opacity: '60%' }}/>
      </div>
    </div>
  );
};

export default AroundTheWorld;
