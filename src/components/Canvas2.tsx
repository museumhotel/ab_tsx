import styled from "styled-components";
import { useCanvasDraw } from "../hooks/useCanvasDraw";

//scaling constants
const SCALE = 0.1;
const OFFSET = 80;

interface ICoordinates {
  x: number;
  y: number;
}

export function draw(ctx: CanvasRenderingContext2D, location: ICoordinates) {
  console.log("drawing 1 sec");

  ctx.strokeStyle = "hsl(150, 5%, 50%)";
  ctx.strokeRect(0, 0, 250, 250);
  ctx.shadowColor = "blue";
  ctx.shadowBlur = 15;
  ctx.save();
  ctx.scale(SCALE, SCALE);
  ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  ctx.rotate((225 * Math.PI) / 180);
  ctx.strokeRect(50, 50, 250, 250);
  ctx.restore();
}

const StyledCanvas = styled.canvas`
  grid-area: canvas;
`;

export const Canvas: React.FC = () => {
  const [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight] =
    useCanvasDraw();

  const handleCanvasClick = (event: MouseEvent) => {
    //on each click get current mouse location
    const currentCoord = { x: event.clientX, y: event.clientY };
    //add newest mouse loc to array in state
    setCoordinates([...coordinates, currentCoord]);
  };

  return (
    <>
      <StyledCanvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleCanvasClick}
      ></StyledCanvas>
    </>
  );
};
