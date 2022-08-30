import { useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0, //can't be undefined so set to 0 and server and client renders'll match
  });

  useEffect(() => {
    //evaluates to !undefined on client when there's window obj
    if (typeof window !== "undefined") {
      //as we have window, handle window resize
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      //listen for window resize evt
      window.addEventListener("resize", handleResize);
      //invoke handler to update state with height & width
      handleResize();

      //cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); //empty the deps array
  return windowSize;
}

export default useWindowSize;
