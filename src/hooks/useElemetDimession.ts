import { useState, useEffect, useRef } from "react";
export const useElementDimensions = () => {
    const [elementDimensions, setElementDimensions] = useState(new Map());
    const elementRefs = useRef(new Map());
  
    useEffect(() => {
      const updateDimensions = () => {
        const newDimensions = new Map();
        elementRefs.current.forEach((el, index) => {
          if (el) {
            newDimensions.set(index, { width: el.clientWidth, height: el.clientHeight });
          }
        });
        setElementDimensions(newDimensions);
      };
  
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }, []);
  
    return { elementRefs, elementDimensions };
  };