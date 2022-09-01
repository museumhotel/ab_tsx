import { useEffect, useRef, useState } from "react";
import { draw } from "../components/Canvas";
import useWindowSize from "./useWindowSize";

export function useCanvasDraw() {
  const size = useWindowSize(); //unable to call custom hook here
  const canvasWidth = size.width * 0.5;
  const canvasHeight = size.height * 0.5;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvasObj = canvasRef.current;
      const ctx = canvasObj.getContext("2d")!;
      //clear canvas before rendering coords held in state
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      //draw the coords held in state
      coordinates.forEach((coordinate) => {
        draw(ctx, coordinate);
      });
    }
  });
  return [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight];
}
