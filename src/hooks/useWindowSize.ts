import React, { useEffect, useState } from "react";

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
          //half so that canvas fits properly
          width: window.innerWidth / 2,
          height: window.innerHeight / 2,
        });
        /* 
        let ctx: CanvasRenderingContext2D;

        function clearBackground(ctx: CanvasRenderingContext2D): void {
          console.log(ctx);
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
        clearBackground(ctx!);
         */
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
