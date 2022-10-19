import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

const StyledCanvas = styled.canvas`
  grid-area: canvas;
`;

interface CanvasProps {
  width: number;
  height: number;
  children?: React.ReactNode;
}

//type to help keep track of mouse pos in state
type Coordinate = {
  x: number;
  y: number;
};

//type for determining size of rects
type MaxRectDimensions = {
  maxWidth: number;
  maxHeight: number;
};

/* let frameAndText = {
  //frame
  x: 50,
  y: 50,
  velX: 5,
  velY: 2,
  width: 50,
  height: 50,
  lineWidth: 5,
  //text
  //text: "Art \nBoyz.",
  color: "black",
  draw() {
    ctx.beginPath()
    ctx.strokeRect(this.x, this.y, this.width, this.height)

  }
} */

const Canvas = ({ width, height, children }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //set state to track mouse pos and whether drawing or not
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  const [isMouseOnCanvas, setIsMouseOnCanvas] = useState(false);
  const [maxFrameSize, setMaxFrameSize] = useState<
    MaxRectDimensions | undefined
  >(undefined);
  const [framePosition, setFramePosition] = useState<Coordinate | undefined>(
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

  const prepareCanvas = useCallback((e: MouseEvent) => {
    //maximum possible rect sizes given canvas size
    const maxDimensions = getRectDimensionBoundaries(e);
    const randomCoordinates = getRandomisedCoordinates(e);

    if (maxDimensions) {
      setIsMouseOnCanvas(true);
      setMaxFrameSize(maxDimensions);
      setFramePosition(randomCoordinates);
      //console.log(maxDimensions);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener("mouseenter", prepareCanvas);
    return () => {
      canvas.removeEventListener("mouseenter", prepareCanvas);
    };
  }, [prepareCanvas]);

  useEffect(() => {
    if (!canvasRef.current) {
      return; //if no canvasref- return
    }
    //add event listener if there's valid ref to canvas
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      //remove listener on unmount
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]); //startdraw fnc in useEffect dependency array

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return; //return early if canvasRef null
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const getRandomisedCoordinates = (e: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: e.pageX - Math.random() * canvas.offsetLeft,
      y: e.pageY - Math.random() * canvas.offsetTop,
    };
  };

  const getRectDimensionBoundaries = (
    e: MouseEvent
  ): MaxRectDimensions | undefined => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      maxWidth: canvas.width / 2,
      maxHeight: canvas.height / 2,
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

  const drawRects = useCallback(
    (e: MouseEvent) => {
      if (isMouseOnCanvas) {
        //const maxFrameSizeParam = getRectDimensionBoundaries(e)
        //need to get sizes as well as positions based on mouse locations
        const newFramePosition = getRandomisedCoordinates(e);
        if (maxFrameSize && framePosition && newFramePosition) {
          drawRandomRects(framePosition, newFramePosition, maxFrameSize);
          setFramePosition(newFramePosition);
        }
      }
    },
    [isMouseOnCanvas, maxFrameSize, framePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", drawRects);
    return () => {
      canvas.removeEventListener("mousemove", drawRects);
    };
  }, [drawRects]);

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

  /*  
  const drawRandomFrameRects = (
    maxSizes: MaxRectDimensions,
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx = canvas.getContext("2d");

    //draw rects
    function drawRect(rectPos: Coordinate, rectDim: MaxRectDimensions) {
      let xPos = rectPos.x;
      let yPos = rectPos.y;
      let width = rectDim.maxWidth;
      let height = rectDim.maxHeight;

        if (ctx) {
          ctx.beginPath();
          ctx.strokeRect(xPos, yPos, width, height)
          ctx.strokeStyle = "darkred";
          ctx.stroke()
        }
      
    }
  }
 */

  const drawRandomRects = (
    prevPositions: Coordinate,
    newPositions: Coordinate,
    rectDimensions: MaxRectDimensions
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    //Finally invoke canvas api methods on 2d ctx
    const ctx = canvas.getContext("2d");

    if (ctx) {
      let animate = () => {
        requestAnimationFrame(draw);
        ctx.clearRect(0, 0, size.width, size.height);

        /* for (let i = 0; i <= rectContainer.length; i++) {
          rectContainer[i].update();
        } */
      };

      //animate();

      let draw = () => {
        let x = prevPositions.x;
        let y = prevPositions.y;
        let newX = newPositions.x;
        let newY = newPositions.y;
        let width = Math.random() * rectDimensions.maxWidth;
        let height = Math.random() * rectDimensions.maxHeight;
        //let width = (Math.random() * size.width) / 4;
        //let height = (Math.random() * size.height) / 4;

        if (newX + x > rectDimensions.maxWidth || newX - x < 0) {
          newX = -newX;
        }
        if (newY + y > rectDimensions.maxHeight || newY - y < 0) {
          newY = -newY;
        }
        x += newX;
        y += newY;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = "darkred";
        ctx.lineWidth = 5;
        ctx.stroke();

        requestAnimationFrame(animate);
      };

      draw();
    }
  };
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

  const stopDrawingRects = useCallback(() => {
    setIsMouseOnCanvas(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mouseleave", stopDrawingRects);
    return () => {
      canvas.removeEventListener("mouseleave", stopDrawingRects);
    };
  }, [stopDrawingRects]);

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

  //allocate comp size based on custom hook optimised for nextjs ssr
  let size = useWindowSize();

  return (
    <StyledCanvas
      ref={canvasRef}
      height={size.height}
      width={size.width}
    ></StyledCanvas>
  );
};

export default Canvas;
