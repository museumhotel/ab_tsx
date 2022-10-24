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

    let strokeWidth = 10;
    let width = size.width / 2;
    let height = size.height / 2;
    let xOffset = width * Math.sin(randomRectRef.current); //1 red
    let yOffset = height * Math.sin(randomRectRef.current); //2 blue

    let xOffset2 = size.width * Math.cos(randomRectRef.current / 2); //3 green
    let yOffset2 = size.height * Math.cos(randomRectRef.current / 2); //4 orange

    let rectText = ["Art \nBoyz.", "Art \nBoyz.", "Art \nBoyz.", "Art \nBoyz."];
    let textSize = 25;

    //let animateText = () => {
    ctx.font = `${textSize}px sans-serif`;
    //ctx.font = `50px sans-serif`;
    let txtX = xOffset;
    let txtY = size.height / 2;
    //let splitTxt1 = rectText.frame1.split("\n")
    let splitTxt1 = rectText[0].split("\n");

    for (let i = 0; i < splitTxt1.length; i++) {
      ctx.fillText(
        splitTxt1[i],
        txtX + textSize,
        txtY + height / 2.5 + i * (strokeWidth + 2 + height / 4.5)
      );
    }

    //console.log(splitTxt1);
    //for (let i = 0; i<splitTxt1.length; i++) {}
    //};

    //animateText();
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "darkred";
    ctx.strokeRect(xOffset, size.height / 2, width / 2, height / 2);
    ctx.restore();
    ctx.strokeStyle = "darkblue";
    ctx.strokeRect(size.width / 2, yOffset, width / 2, height / 2);
    ctx.save();
    ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(xOffset2, size.height / 8, width / 2, height / 2);
    ctx.restore();
    ctx.strokeStyle = "darkorange";
    ctx.strokeRect(size.width / 8, yOffset2, width / 2, height / 2);
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
