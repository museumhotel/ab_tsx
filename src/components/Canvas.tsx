import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

const StyledCanvas = styled.canvas`
  grid-area: canvas;
`;

interface CanvasProps {
  width: number;
  height: number;
}

//type to help keep track of mouse pos in state
type Coordinate = {
  x: number;
  y: number;
};

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //set state to track mouse pos and whether drawing or not
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  //wrap fnction in useCallback to to use in useEffect dependency array
  const startPaint = useCallback((event: MouseEvent) => {
    //obtain current mouse coords in state and set drawing state var to true
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return; //if canvasref is null- return
    }
    //add event listener if there's valid ref to canvas
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      //remove listener on unmount
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]); //startdraw fnc in the useEffect dependency array

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return; //return early if canvasRef returns null
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  //paint checks if we're painting
  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event); //then gets new mouse coords
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition); //if have prev mouse coords and new mouse coords, paint will draw a line from the old to new coords from the 2d canvas rendering ctx
          setMousePosition(newMousePosition); //then updates the coordinates
        }
      }
    },
    [isPainting, mousePosition]
  );

  //similar to mousedown event, do same for mousemove event to register when the mouse moves so shapes can be drawn after triggering paint function callback from the dep array
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    return () => {
      canvas.removeEventListener("mousemove", paint);
    };
  }, [paint]);

  //initialised from the usecallback hook if (isPainting)
  const drawLine = (
    previousMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      //Make sure canvasRef isn't null
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    //Finally invoke canvas api methods on 2d ctx
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.strokeStyle = "crimson";
      ctx.lineJoin = "bevel";
      ctx.lineWidth = 5;

      ctx.beginPath();
      //the path contains the originalmouse positions in the state array on the x and y axes
      ctx.moveTo(previousMousePosition.x, previousMousePosition.y);
      //a line is drawn to all the new mouse positions in its state array on both axes
      ctx.lineTo(newMousePosition.x, newMousePosition.y);
      ctx.closePath();
      ctx.stroke();
    }
  };

  //exitPaint sets isPainting to false
  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  //stop drawing when user releases the mouse or moves the mouse out of canvas area
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      //then remove the event listeners
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  return <StyledCanvas ref={canvasRef} height={height} width={width} />;
};

//allocate comp size based on custom hook optimised for nextjs ssr
let size = useWindowSize();
Canvas.defaultProps = {
  width: size.width,
  height: size.height,
};

export default Canvas;
