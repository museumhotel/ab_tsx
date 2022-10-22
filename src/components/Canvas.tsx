import {
  aabb,
  center,
  flip,
  rect,
  rectFromCentroid,
  vertices,
} from "@thi.ng/geom";
import { defHatchPen, fuzzyPoly } from "@thi.ng/geom-fuzz";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import { draw } from "@thi.ng/hiccup-canvas/draw";
import type { Vec } from "@thi.ng/vectors";

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

function getRandomNumber(min: number, max: number) {
  return Math.random() * (Math.floor(max) - Math.floor(min)) + Math.floor(min);
}

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
    const frameCoordinates = getFrameCoordinates(e);

    if (maxDimensions) {
      setIsMouseOnCanvas(true);
      setMaxFrameSize(maxDimensions);
      setFramePosition(frameCoordinates);
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

  const getFrameCoordinates = (e: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    console.log(canvas.width, canvas.height);
    return {
      x: e.offsetX,
      y: e.offsetY,
      //x: getRandomNumber(e.pageX, canvas.height),
      //Math.random() * canvas.width,
      //y: getRandomNumber(e.pageY, canvas.width),
      //x: e.pageX - Math.random() * canvas.offsetLeft,
      //y: e.pageY - Math.random() * canvas.offsetTop,
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
        const newFramePosition = getFrameCoordinates(e);
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
    const ctx = canvas.getContext("2d");

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
    let frameCount = 0;

    let width = rectDimensions.maxWidth / 2;
    let height = rectDimensions.maxHeight / 2;

    if (ctx) {
      let animate = () => {
        requestAnimationFrame(() => {
          drawVRect();
        });
        ctx.clearRect(0, 0, size.width, size.height);
        frameCount++;
      };

      animate();

      let drawVRect = () => {
        let x = prevPositions.x;
        let y = prevPositions.y;
        let newX = newPositions.x;
        let newY = newPositions.y;
        /* let width = getRandomNumber(
          rectDimensions.maxWidth / 2,
          rectDimensions.maxWidth
        );
        let height = getRandomNumber(
          rectDimensions.maxHeight / 2,
          rectDimensions.maxHeight
        ); */

        //draw(ctx, fuzzyPoly(shape, { fill: "darkred", jitter: 5 }));

        let centralVec = {
          [0]: size.width,
          [1]: size.height,
          [2]: 0,
        };
        //let aabbvec = aabb([width, height])
        let aabbvec: Vec = [0, 0, 0];
        let centeredRect = rectFromCentroid(aabbvec, 4);
        const shape = vertices(rect([width, height]), 4);
        fuzzyPoly(
          shape,
          {
            translate: [
              size.width * Math.sin(frameCount * 0.05) + 10,
              size.height / 2 - y,
            ],
            stroke: "darkred",
          },
          { jitter: 5 }
        );

        let translateX = size.width * Math.sin(frameCount * 0.025) * 1.75;

        if (translateX > size.width) {
          translateX = size.width / 2 - x / 4;
          width = getRandomNumber(
            rectDimensions.maxWidth / 2.5,
            rectDimensions.maxWidth
          );
          height = getRandomNumber(
            rectDimensions.maxHeight / 2.5,
            rectDimensions.maxHeight
          );
        }
        if (translateX == 0) {
          translateX = size.width / 2;
          width = getRandomNumber(
            rectDimensions.maxWidth / 2.5,
            rectDimensions.maxWidth
          );
          height = getRandomNumber(
            rectDimensions.maxHeight / 2.5,
            rectDimensions.maxHeight
          );
        }
        draw(
          ctx,
          center(
            fuzzyPoly(
              shape,
              {
                translate: [
                  translateX,
                  size.height / 2 - y / 4, //4 keeps frame always in canvas
                ],
                strokeWidth: 20,
                stroke: "#8B0000",
              },
              {
                //size: 10,
                jitter: 0.25,
                curveScale: 0.05,
                //fill: defHatchPen("#8B0000", "d", 1, 2),
                //jitter: 0.125
              }
            )
          )
        );

        ctx.beginPath();
        /* ctx.rect(
          size.width * Math.sin(frameCount * 0.05) + 10,
          size.height / 2 - y / 2,
          width,
          height
        ); */
        ctx.strokeStyle = "darkred";
        ctx.lineWidth = 5; //control thi.ng lib polygon thickness through regular canvas api
        ctx.stroke();

        requestAnimationFrame(() => {
          animate();
        });
      };

      //drawVRect();
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
