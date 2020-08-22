import React, { useState, useRef, useEffect } from "react";
import "./CourseChapters.css";

const CourseChapters = (props) => {
  const [active, setActive] = useState(false);
  const [plus, setPlus] = useState (true);
  const [minus, setMinus] = useState (false);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toogleActive = () => {
    setActive(!active);
    setPlus(!plus);
    setMinus(!minus)
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: "14px",
    paddingLeft: "50px",
  };

  return (
    <React.Fragment>
      <div className="accordion-section">
        <a className="accordion-title" onClick={toogleActive}>
          <span className="accordion-icon">
            {plus && <img id="plus" height="50px" src="/assets/plus.svg" />}
            {minus && <img id="minus" height="50px" src="/assets/minus.svg" /> }
          </span>
          <span style={{width: "100%"}}>
          <p className="lecture" style={titleStyle}>{props.lecture}</p>
          <span className="title" style={titleStyle}>{props.title}</span>
          <span style={{float: "right"}}>{props.duration}</span>
          </span>
        </a>

        <div ref={contentRef} className="accordion-content">
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CourseChapters;
