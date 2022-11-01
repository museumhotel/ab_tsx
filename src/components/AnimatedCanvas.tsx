import { center, flip, rect, star, vertices } from "@thi.ng/geom";
import { compFill, defHatchPen, fuzzyPoly } from "@thi.ng/geom-fuzz";
import { draw } from "@thi.ng/hiccup-canvas/draw";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useOnScreen from "../hooks/useOnScreen";
import useWindowSize from "../hooks/useWindowSize";

const StyledCanvas = styled.canvas`
  grid-area: canvas;
  font-family: "Boom4Real";
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

  const isOnScreen = useOnScreen(canvasRef!);

  //const [deltaTimeCount, setDeltaTimeCount] = useState<number>(0);

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
    const ctx = canvasRef.current!.getContext("2d");
    if (ctx != null) {
      const timeNow = Date.now();
      const deltaTime = timeNow - lastRenderTimeRef.current;
      clearBackground(ctx);
      lastRenderTimeRef.current = timeNow;

      if (isOnScreen) {
        drawMovingRects(ctx, deltaTime);
      }
    }
    animationFrameRequestRef.current = requestAnimationFrame(renderFrame); //call function recursively
  }

  function clearBackground(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, size.width, size.height);
  }

  function drawMovingRects(
    ctx: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    if (!canvasRef.current) {
      return;
    }
    randomRectRef.current += deltaTime * 0.0005;

    var colourDeterminant: number = Math.floor(getRandomNumber(0, 5));

    if (randomRectRef.current > (2 * Math.PI) / 2) {
      randomRectRef.current -= (2 * Math.PI) / 2;
      //colourDeterminant = Math.floor(getRandomNumber(0, 5));
      console.log(colourDeterminant);
    }
    //console.log(Math.floor((randomRectRef.current * 360) / 100));
    let deltaTimeRef = Math.floor((randomRectRef.current * 360) / 100);
    let deltaTimeRaw = randomRectRef.current;

    //variables for the dimensions of the canvas context
    const fullCanvasWidth = size.width;
    const fullCanvasHeight = size.height;
    //console.log({ fullCanvasWidth, fullCanvasHeight });

    //half dimensions for the canvas to be used in context of offsets for animation and positions of graphics
    const canvasWidthHalved = fullCanvasWidth / 2;
    const canvasHeightHalved = fullCanvasHeight / 2;

    //variables for declaring the full dimensions of shapes/ equates to half dimensions of canvas- will determine max dimensions when randomising params
    /* let fullShapeWidth = canvasWidthHalved;
    let fullShapeHeight = canvasHeightHalved; */
    let fullShapeWidth = canvasWidthHalved;
    let fullShapeHeight = canvasHeightHalved;

    /* 
    mobileS: 320, //20em 160 x 330.5 canvasW= 240
    mobileL: 425, //26.5625em 212.5 x 330.5 canvasW= 318.75
    tabletS: 768, //48em 384 x 330.5 canvasW= 576
    tabletL: 960, //60em 480 x 330.5 canvasW= 720
    laptop: 1024, //64em 512 x 330.5 canvasW= 768
    desktopM: 1440, //90em 720 x 388.5 canvasW= 1080
    desktopL: 2560, //160em 1280 x 734 canvasW= 1920
    */
    //console.log(fullCanvasWidth);

    if (fullCanvasWidth > 0 && fullCanvasWidth <= 240) {
      //size.width = size.width * 1.5;
      //animationFrameRequestRef.current = requestAnimationFrame(renderFrame);
      //renderFrame();
      //fullShapeWidth = canvasWidthHalved * 1.0125;
      //fullShapeWidth = canvasWidthHalved * 1.0125;
      fullShapeHeight = canvasHeightHalved / 1.5;
      fullShapeHeight = canvasHeightHalved / 1.5;
    }

    if (fullCanvasWidth >= 241 && fullCanvasWidth <= 318.75) {
      fullShapeWidth = canvasWidthHalved / 1.25;
      fullShapeHeight = canvasHeightHalved / 1.25;
    }

    if (fullCanvasWidth >= 318.76 && fullCanvasWidth <= 720) {
      fullShapeWidth = canvasWidthHalved / 1.25;
      fullShapeHeight = canvasHeightHalved / 1.25;
    }

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
    let xOffset = canvasWidthHalved / Math.tan(randomRectRef.current); //1 red
    let yOffset = canvasHeightHalved / Math.sin(randomRectRef.current); //2 blue

    let xOffset2 =
      fullCanvasWidth *
      Math.sin((randomRectRef.current * shapeWidthHalved) / 16); //3 green
    let yOffset2 =
      fullCanvasHeight *
      Math.tanh((randomRectRef.current * fullShapeHeight) / 512); //4 orange
    /* let xOffset2 =
      fullCanvasWidth *
      Math.cos((randomRectRef.current * shapeWidthHalved) / 32); //3 green
    let yOffset2 =
      fullCanvasHeight *
      Math.cos((randomRectRef.current * shapeHeightHalved) / 32); //4 orange */
    /*let xOffset2 = canvasWidthHalved * Math.cos(randomRectRef.current % 4); //3 green
    let yOffset2 = canvasHeightHalved * Math.cos(randomRectRef.current % 4); //4 orange*/

    let logoText = "ART \nBOYZ.";
    let textSize = 12.5;
    let txtSizeHalved = textSize / 2;
    let strokeWidth = 2.5;

    ctx.font = `${textSize}px "Boom4Real"`; //add font
    let txtX = 0;
    let txtY = 0;

    //let animateText = () => {

    //console.log(splitTxt1);
    //};

    let shearX = 0;
    let shearY = 0;

    //animateText();
    //ctx.beginPath();
    ctx.save();
    let splitTxt1 = logoText.split("\n");
    txtX = xOffset;
    txtY = canvasHeightHalved;

    let logo1 = vertices(rect([shapeWidthHalved, shapeHeightHalved]), 4);

    //constrain to absolute & positive intergers only
    let logo1XValueTracker = Math.floor(Math.abs(xOffset / 360) * 100);
    let logo1VariableColour = `hsl(0, ${getRandomNumber(
      0,
      10
    )}%, ${logo1XValueTracker}%)`;
    let logo1ShadowColor = `hsl(0, 100%, ${getRandomNumber(10, 30)}%)`;
    //ctx.shadowColor = logo1ShadowColor;
    //ctx.shadowColor = "rgba(54, 0, 0, 0.8)";
    //ctx.shadowBlur = logo1XValueTracker / 4;
    //console.log(logo1XValueTracker);

    /* if (logo1Tracker > 90.0) {
      logo1Shadow = "cyan";
      //logo1Tracker = fullCanvasWidth + 1;
    }
    if (logo1Tracker < 60.0) {
      logo1Shadow = "pink";
    } */

    //shearX = -0.05;
    shearX = 0.0075;
    //shearY = 0.0075;

    draw(
      ctx,
      center(
        fuzzyPoly(
          logo1,
          {
            //translate: [xOffset, canvasHeightHalved + shapeHeightHalved / 2],
            //translate: [canvasWidthHalved, canvasHeightHalved / 2],
            //rotate: fullCanvasHeight / 2,
            transform: [
              1,
              shearY,
              shearX,
              1,
              xOffset + canvasWidthHalved / 2.5,
              canvasHeightHalved / 2,
            ],
            //stroke: "darkred",
            stroke: logo1VariableColour,
          },
          {
            jitter: 2.5,
            curveScale: 0.0125,
            fill: defHatchPen("#e1e1e1", "v", 1, 6.25),
          }
        )
      )
    );

    txtX = shapeWidthHalved;
    for (let i = 0; i < splitTxt1.length; i++) {
      ctx.fillText(
        splitTxt1[i],
        xOffset + shapeWidthHalved / 2.5,
        txtY +
          shapeHeight / -1.25 +
          i * (strokeWidth + (1.25 * canvasHeightHalved) / 6.75)
      );
    }

    /* ctx.strokeRect(
      xOffset,
      canvasHeightHalved,
      shapeWidth,
      //shapeWidthHalved,
      shapeHeight
      //shapeHeightHalved
    ); */
    /* for (let i = 0; i < splitTxt1.length; i++) {
      ctx.fillText(
        splitTxt1[i],
        txtX - shapeWidthHalved / 4.5,
        txtY +
          shapeHeight / 2 +
          i * (strokeWidth + (1.25 * canvasHeightHalved) / 4.75)
      );
    } */

    ctx.restore();
    ctx.save();
    let splitTxt2 = logoText.split("\n");

    let logo2 = vertices(rect([shapeWidthHalved, shapeHeightHalved]), 4);

    let logo2YValueTracker = Math.floor(Math.abs((yOffset / 180) * 50));

    /* let logo2VariableColour = `hsl(240, 
        ${getRandomNumber(0, 12.5)}%, ${logo2YValueTracker / 2}%)`;

    let logo2ShadowColor = `hsl(0, ${getRandomNumber(0, 10)}%, ${
      logo2YValueTracker * 2
    }%)`; */
    let logo2VariableColour = `hsl(240, 
        ${getRandomNumber(0, 5)}%, ${logo2YValueTracker}%)`;

    let logo2ShadowColor = `hsl(0, ${getRandomNumber(0, 10)}%, ${
      logo2YValueTracker / 1.5
    }%)`;

    //ctx.shadowColor = logo2ShadowColor;

    //ctx.shadowBlur = logo2YValueTracker;

    shearY = -0.0075;
    draw(
      ctx,
      center(
        fuzzyPoly(
          logo2,
          {
            //translate: [canvasWidthHalved + shapeWidthHalved / 2, yOffset],
            transform: [
              1,
              shearY,
              shearX,
              1,
              canvasWidthHalved,
              (yOffset + shapeHeight) / 1.5,
            ],
            //stroke: "darkblue",
            stroke: logo2ShadowColor,
          },
          {
            //jitter: 2.5,
            curveScale: 0.0125,
            fill: defHatchPen(logo2VariableColour, "h", 1, 5),
          }
        )
      )
    );
    txtX = canvasWidthHalved / 1.75;
    txtY = yOffset;
    for (let i = 0; i < splitTxt2.length; i++) {
      ctx.fillText(
        splitTxt2[i],
        txtX + shapeWidthHalved / getRandomNumber(2.75, 4),
        txtY +
          shapeHeight / 4.75 +
          i * (strokeWidth + (1.25 * canvasHeightHalved) / 8.75)
      );
    }

    /* ctx.strokeStyle = "darkblue";
    ctx.strokeRect(
      canvasWidthHalved,
      yOffset,
      shapeWidthHalved,
      shapeHeightHalved
    ); */

    ctx.restore();
    ctx.save();
    let splitTxt3 = logoText.split("\n");

    let logo3 = vertices(rect([shapeWidthHalved, shapeHeightHalved]), 4);

    var logo3XValueTracker = Math.floor(Math.abs((xOffset2 / 360) * 100) * 4);
    let logo3YValueTracker = Math.floor(Math.abs((yOffset2 / 360) * 100) * 4);

    let logo3VariableColour = `hsl(${logo3YValueTracker}, 
        ${logo3XValueTracker}%, ${getRandomNumber(90, 100)}%)`;

    let logo3ShadowColor = `hsl(0, ${getRandomNumber(
      0,
      2.5
    )}%, ${logo3XValueTracker}%)`;

    function randomColourPicker() {
      let hueRange = 0;
    }

    let colourFamily: number = 0;
    let colourFamilyHSL: string;
    //console.log(deltaTimeRaw);

    if (Math.floor(deltaTimeRaw) > (2 * Math.PI) / 2) {
      //randomRectRef.current -= (2 * Math.PI) / 2;
      //console.log(colourDeterminant);
    }

    /* 
    switch (colourDeterminant) {
      case 0:
        colourFamilyHSL = `hsl(252, 
              ${logo3XValueTracker}%, ${getRandomNumber(0, 50)}%)`; //purples
        break;
      case 1:
        colourFamilyHSL = `hsl(180, 
              ${logo3XValueTracker}%, ${getRandomNumber(0, 50)}%)`; //cyans
        break;
      case 2:
        colourFamilyHSL = `hsl(${getRandomNumber(30, 35)}, 
              ${logo3XValueTracker}%, ${getRandomNumber(0, 50)}%)`; //oranges
        break;
      case 3:
        colourFamilyHSL = `hsl(90, 
              ${logo3XValueTracker}%, ${getRandomNumber(0, 50)}%)`; //greens
        break;
      default:
        colourFamilyHSL = `hsl(${getRandomNumber(30, 35)}, 
        ${logo3XValueTracker}%, ${getRandomNumber(50, 75)}%)`; //oranges
    }

    switch (deltaTimeRef) {
      case 0:
        logo3ShadowColor = colourFamilyHSL;
        break;
      case 3:
        logo3ShadowColor = colourFamilyHSL;
        break;
      case 6:
        logo3ShadowColor = colourFamilyHSL;
        break;
      case 9:
        logo3ShadowColor = colourFamilyHSL;
        break;
      //default:
      //logo3ShadowColor = `#d5d5d5`;
    } */

    //let colourDeterminant: number = Math.floor(getRandomNumber(0, 5));

    //console.log(colourDeterminant);

    if (deltaTimeRef == 0) {
      switch (colourDeterminant) {
        case 0:
          logo3ShadowColor = `hsl(252, 
                ${logo3XValueTracker}%, ${getRandomNumber(0, 50)}%)`; //purples
          break;
        case 1:
          logo3ShadowColor = `hsl(180, 
                    ${logo3XValueTracker}%, ${getRandomNumber(0, 50)}%)`; //cyans
          break;
      }
      //logo3ShadowColor = `#303030`;
    }
    if (deltaTimeRef == 3) {
      switch (colourDeterminant) {
        case 2:
          logo3ShadowColor = `hsl(${getRandomNumber(30, 35)}, 
                    ${logo3XValueTracker}%, ${getRandomNumber(0, 50)}%)`; //oranges
          break;
        case 3:
          logo3ShadowColor = `hsl(90, 
                    ${logo3XValueTracker}%, ${getRandomNumber(50, 75)}%)`; //greens
          break;
        /* case 0:
          logo3ShadowColor = `#b7ff00`;
          break;
        case 1:
          logo3ShadowColor = `#303030`;
          break;
        case 2:
          logo3ShadowColor = `#c48eb3`;
        case 3:
          logo3ShadowColor = `#0041a3`;
          break; */
      }
      //logo3ShadowColor = `#b7ff00`;
    }
    if (deltaTimeRef == 6) {
      logo3ShadowColor = `#d30f0f`;
    }
    if (deltaTimeRef == 9) {
      logo3ShadowColor = `#2b00ff`;
    }

    if (logo3XValueTracker >= 0 && logo3XValueTracker <= 32) {
      //logo3ShadowColor = `#b7ff00`;
      //let hueRange = 0
      //let hue
      //logo3ShadowColor = `hsl()`;
    }
    //console.log(logo3XValueTracker);

    //ctx.shadowColor = logo3ShadowColor;

    //ctx.shadowBlur = logo3XValueTracker / 2;

    shearX = 0.00125;
    shearY = -0.125;

    draw(
      ctx,
      center(
        fuzzyPoly(
          logo3,
          {
            rotate: logo3XValueTracker * 0.05,
            //translate: [canvasWidthHalved, canvasHeightHalved],
            transform: [
              1,
              shearY,
              shearX,
              1,
              logo3XValueTracker,
              logo3YValueTracker,
              //+ shapeHeightHalved / 2,
            ],
            /*  translate: [
                xOffset2,
                ((canvasHeightHalved / 20) * 2) ^ +shapeHeightHalved,
              ],  */
            //stroke: "darkgreen",
            stroke: logo3ShadowColor,
            //stroke: "black",
          },
          {
            jitter: 2.5,
            curveScale: 0.05,
            fill: compFill(
              defHatchPen(logo3VariableColour, "d", 1, 8.5),
              defHatchPen(logo3VariableColour, "d", 2, 4)
            ),
          }
        )
      )
    );

    //txtX = logo3XValueTracker;
    //txtY = logo3YValueTracker;
    txtX = xOffset2;
    txtY = yOffset2;

    for (let i = 0; i < splitTxt3.length; i++) {
      ctx.fillText(
        splitTxt3[i],
        txtX - shapeWidth / 2,
        //+ xOffset2,
        //- shapeWidth / getRandomNumber(4, 4.5),
        txtY + shapeHeight / 2 + i * (strokeWidth + 1.25 + shapeHeight / 8)
      );
    }

    /* ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(
      xOffset2,
      fullCanvasHeight / 8,
      shapeWidthHalved,
      shapeHeightHalved
    ); */
    ctx.restore();
    ctx.save();
    ctx.restore();
    /* ctx.strokeStyle = "darkorange";
    ctx.strokeRect(
      fullCanvasWidth / 8,
      yOffset2,
      shapeWidthHalved,
      shapeHeightHalved
    ); */
    ctx.lineWidth = strokeWidth;

    //let splitTxt1 = rectText.frame1.split("\n")
    let splitTxt4 = logoText.split("\n");
  }

  return (
    <StyledCanvas
      ref={canvasRef}
      width={size.width}
      height={size.height}
    ></StyledCanvas>
  );
}
