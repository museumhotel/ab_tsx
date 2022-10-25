import { useEffect, useRef } from "react";
import styled from "styled-components";
import useOnScreen from "../hooks/useOnScreen";
import useWindowSize from "../hooks/useWindowSize";

const StyledCanvas = styled.canvas`
  grid-area: canvas;
`;

interface Point2D {
  x: number;
  y: number;
}

interface CanvasProps {
  width: number;
  height: number;
  children?: React.ReactNode;
}

function getRandomNumber(min: number, max: number) {
  return Math.random() * (Math.floor(max) - Math.floor(min)) + Math.floor(min);
}

interface Props {
  cursorPosition: Point2D;
  onCursorPositionChanged: (position: Point2D) => void;
}

export default function AnimatedCanvas({
  width,
  height,
  children,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let size = useWindowSize();

  //const cursorPositionRef = useRef<Point2D>(cursorPosition);
  const lastRenderTimeRef = useRef<number>(Date.now());
  const randomRectRef = useRef<number>(0);

  const animationFrameRequestRef = useRef<number | null>(null);

  const isOnScreen = useOnScreen(canvasRef);

  if (isOnScreen) {
    //console.log({ isOnScreen });
  }

  //animation frames
  useEffect(() => {
    lastRenderTimeRef.current = Date.now();
    animationFrameRequestRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animationFrameRequestRef.current != null) {
        cancelAnimationFrame(animationFrameRequestRef.current);
      }
    };
  }, [!isOnScreen]); //run animation if canvas is showing

  //track the cursor positions and rerender on change
  /* useEffect(() => {
    cursorPositionRef.current = cursorPosition;
  }, [cursorPosition]); */

  function renderFrame(): void {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx != null) {
      const timeNow = Date.now();
      const deltaTime = timeNow - lastRenderTimeRef.current;
      clearBackground(ctx);
      drawMovingRandomRect(ctx, deltaTime);
      lastRenderTimeRef.current = timeNow;
    }
    animationFrameRequestRef.current = requestAnimationFrame(renderFrame); //call funciton recursively
  }

  function clearBackground(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, size.width, size.height);
  }

  function drawMovingRandomRect(
    ctx: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    randomRectRef.current += deltaTime * 0.0025;

    if (randomRectRef.current > 2 * Math.PI) {
      randomRectRef.current -= 2 * Math.PI;
    }

    //variables for the dimensions of the canvas context
    const fullCanvasWidth = size.width;
    const fullCanvasHeight = size.height;

    //half dimensions for the canvas to be used in context of offsets for animation and positions of graphics
    const canvasWidthHalved = size.width / 2;
    const canvasHeightHalved = size.height / 2;

    //variables for declaring the full dimensions of shapes/ equates to half dimensions of canvas- will determine max dimensions when randomising params
    let fullShapeWidth = canvasWidthHalved;
    let fullShapeHeight = canvasHeightHalved;

    //variables for half dimensions of the shapes/ quarter dimenions of the canvas
    let shapeWidthHalved = fullShapeWidth / 2;
    let shapeHeightHalved = fullShapeHeight / 2;

    //variables to hold shape dimensions randomised
    let shapeWidth = getRandomNumber(
      shapeWidthHalved / 2,
      shapeWidthHalved / 1.5
    );
    let shapeHeight = getRandomNumber(
      shapeHeightHalved * 1.5,
      shapeHeightHalved * 1.75
    );

    //offset positions for the animations
    let xOffset = canvasWidthHalved * Math.sin(randomRectRef.current); //1 red
    let yOffset = canvasHeightHalved * Math.sin(randomRectRef.current); //2 blue

    let xOffset2 = fullCanvasWidth * Math.cos(randomRectRef.current / 2); //3 green
    let yOffset2 = fullCanvasHeight * Math.cos(randomRectRef.current / 2); //4 orange

    let logoText = "Art \nBoyz.";
    let textSize = 25;
    let txtSizeHalved = textSize / 2;
    let strokeWidth = 10;

    //let animateText = () => {
    ctx.font = `${textSize}px sans-serif`;
    let txtX = xOffset;
    let txtY = canvasHeightHalved;
    //let splitTxt1 = rectText.frame1.split("\n")
    let splitTxt1 = logoText.split("\n");
    let splitTxt2 = logoText.split("\n");
    let splitTxt3 = logoText.split("\n");
    let splitTxt4 = logoText.split("\n");

    for (let i = 0; i < splitTxt1.length; i++) {
      ctx.fillText(
        splitTxt1[i],
        txtX + txtSizeHalved,
        txtY +
          shapeHeight / 1.25 +
          i * (strokeWidth + (1.25 * canvasHeightHalved) / 4.5)
      );
    }

    //console.log(splitTxt1);
    //for (let i = 0; i<splitTxt1.length; i++) {}
    //};

    //animateText();
    //ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "darkred";
    /* if (xOffset < fullCanvasWidth) {
      xOffset += canvasWidthHalved / 4;
      shapeWidthHalved = shapeWidth;
      shapeHeightHalved = shapeHeight;
    } */
    ctx.strokeRect(
      xOffset,
      canvasHeightHalved,
      shapeWidth,
      //shapeWidthHalved,
      shapeHeight
      //shapeHeightHalved
    );

    ctx.restore();
    /* if (yOffset < fullCanvasHeight) {
      yOffset += canvasHeightHalved / 4;
      shapeWidthHalved = shapeWidth;
      shapeHeightHalved = shapeHeight;
    } */
    ctx.strokeStyle = "darkblue";
    ctx.strokeRect(
      canvasWidthHalved,
      yOffset,
      shapeWidthHalved,
      shapeHeightHalved
    );
    ctx.save();
    ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(
      xOffset2,
      fullCanvasHeight / 8,
      shapeWidthHalved,
      shapeHeightHalved
    );
    ctx.restore();
    ctx.strokeStyle = "darkorange";
    ctx.strokeRect(
      fullCanvasWidth / 8,
      yOffset2,
      shapeWidthHalved,
      shapeHeightHalved
    );
    ctx.lineWidth = strokeWidth;
  }

  return (
    <StyledCanvas
      ref={canvasRef}
      width={size.width}
      height={size.height}
    ></StyledCanvas>
  );
}
