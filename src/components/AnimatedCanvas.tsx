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
    //position.y = size.height /2
    let width = size.width / 2;
    let height = size.height / 2;
    let xOffset = Math.sin(randomRectRef.current + size.width) * size.width;
    let yOffset = height * Math.cos(randomRectRef.current / 2);
    //let yPos = position.y
    //if statement to handle when rect is off screen to bring it back
    //xOffset + 10;

    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "darkred";
    ctx.strokeRect(xOffset, size.height / 2, width / 2, height / 2);
    ctx.restore();
    ctx.strokeStyle = "darkblue";
    ctx.strokeRect(size.width / 2, yOffset, width / 2, height / 2);
    ctx.lineWidth = 5;
  }

  return (
    <StyledCanvas
      ref={canvasRef}
      width={size.width}
      height={size.height}
    ></StyledCanvas>
  );
}
