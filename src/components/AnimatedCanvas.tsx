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
  /* border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAA3dJREFUeF7tnNFygzAMBOn/f3Q7eSs242WRDUl7fRVI8uokG5L0a9u27839fTWXz76/9d9mV41Hq7X+d/5eyVsHATooSYD2cKzAolDo+elAqaVX22nGtXabD81k629XgKOWLznctq16f4A2BAJ0MpAAlT1GwGjGVWeYTLcbQRTf+r99l7cHdVswAmDjk7+h/Y5zqF1QgEJJ/z1QUshqO7WcLRD5szNft/xqYOSfAASoPJYFqAT25xW69Fw24VGUWpwUTfbSy5AzA3hqgAD1L5xJAdTi1k7xrH2qgI7aaWqAKJTr2wKvzjjyRwW+O/6wo64kQwC4JPsryF+ASqIBCudOybP71JU2qTMnFZODLejbtbxt4er1dqxZwN37UFPN17UUkPxVAZFCZ+enOsZWL0DhnB6gfT+RwocdduWNPbUcvRu4UkQaIyO7BVTKL0Dre0K3KdEmQeqgipJCyH/VTvHJruJHoTcolI4JpEhV0Rsupg6k9aoUjxRKAQJ0gDhA+cttUWhD4PGWp4pQy9sFULzVdpvv8FRwZZcP0H2JdzwClD9DU5t0gC4ASs/eNMOogvbZn+JZe3VGUryu5QN0T4AKMBTI0QZTcnjih2S0qZEirJ3WYzssQKECtwO1Ae9WICnWKrQ0As+0fIBSyX7ZA7R/lo9CQUC3tzwFJMF/+kig9dEb/Z39ypMSHdSpQO+2aQUoEZhsj0KfBlqNryp48AXcany6n/Ir7eo0/yi5IzslTPYrMc09Nj7tAcPYMzYISpjsBs6Va238AJXnUBJRGSg5oHMmJUgzivzTmLL5k8qtonf+zpxDacEB2jzL2wqXKnjiC7vVfEjRUWhDgDrm7YBSwtZOiqAZS4CqHUPx1Ug7mqEW2OoFBaiVZHN9dYYqRR3kWhJIFNoTnQ60KDD8P0lV/7Rga6/m030uTy1mA1ZbjuJZYLQnUDyyBygRkvYAlcDo8g4o3UD26sigEWH9U4svtdNiCObLbhdM50o6aFNOS4HRf6gIUP5ZjdoEA3QB0GrLrm5h8k8KsiOERsZw5Jx5H0ozixZsF0TxaMHUdSQg8h+gk98VBOjTQEny1k4tT/5oBNDIoRk71f7E2ya7gAAFAgHaAKIWtbss+ft4hVYXQPfTsYVm4uqZXCrwjHMoKZIAUAHI/+wREqByJNkCqo6KQnu8JYX+AAySuCwrwz/OAAAAAElFTkSuQmCC")
    28 / 28px / 0 round; */
  /* border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAArpJREFUeF7tnMFywyAMRJ3//+hmempNMjyvtYCdbK8CCT0JIfCkj23bfjbt79EMd89v9bera+3ReM07ncdO/+9i3EDIAQoIAQrQhnCAikCSoSIwNcNoi46WU4BJLq3vXQ29GzBymICRnPTv5AFKOF8P7W7CBegEoGSCSkI7X22DaD5tQVo/zVfbyOl9aIBCiJOhHUAzbkpfn6GUgaPlVEOpRtLdn+ZTAnTnX/GUD1DzTStAA/SPwJl6QX0c1ajVclp/uQ9VHaQFqfpmj6f1B6gYkQAVgdHw5UDVLXCmLhOElXIpAEecD9B9OPH5jqIfoAFKOSLJ7Vue7sZHyobkweLBEkDHtY4MLuZRNk/+dUvgmewig2WPFisg/wJUDFAZqKrgTFaLPt13uOM99L7eD1h5gJqhBugEoGSCvimp82n8reQzvno6et/bQA1Qc6gCdABQUkl96uj5pL8qt76mHWnSA7T/fLeTBmj9RxsB2tSIy2/5aomo1kR1foCqxGB8gAaomYBZ3fAMJQOfdpcnf6Wr87u2iQwEaGeLBOiEPjQZ2i/S3cvQkZuS+Qz4bHUBao5vgAaomYBZXTI0QM0EzOqSoQFqJmBWd+QjHV01q1l+tffT0noC9DVDA9S8awP06kBX10w1Q9TxLX96DJLfQ2lBJFcThPSRnICoh2SAwmfgAC0CUjOaMpx2HL6HqilPNcXtoFrTR9vvAj/Sh6oRG+0Q6Sc5+VOaH6ALGnuKqLolSR9lSFVetY9bngyQXK3B7gCoh4xqXwqg2mK8gxug/6gEqPj/Qbdt62Z4gA4Aqm7Zah+q2qOgU41z11g8lFQHA7SDdEUfqgYwGdoEkNoUastuD5QAkIMEqCpXM9xdovCUp6JO8iogdX6AqsRgfIB+O1DV/9U1ldarZjSdIdP7UHJwtjxAzcQD9M5An551VDyyakOMAAAAAElFTkSuQmCC")
    28 / 28px / 0 round; */
  border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAAw9JREFUeF7tmlFyrDAMBMn9D/1S+crDUO7tlQxLZfIrS8itsSzIfm3b9m9zf1/D8m7/Mf6Y3fg8Wu9253ns4v8k0w2ENkAFIUABOhAOUAkkCpXArMLoiK62U4HJrvI766FPA0YbJmBkp/g7e4ASzuOlPRVcgF4AlB5BLWH0t2MQ+dMRpPzJ346Rl8+hAQoljkIngK54U/rzCiUFrrZTD6UeSe/+5E8CmPp/4i0foM1vWgEaoL8E3ukXNMdRj7L27udRvPIcevcG6fkEgPzpkqJLVsWPQrctQJVkjotJ8cuPvH0AqZ7irfa39VAFoOR/Hk4A7JhD8Sinqn+ADgQCtBnI44HascMeqe741PMoP/KfFpT61dnD6YGUMNmr8Vf7ByhVEFqSmlOj0OY5tePznRTAxy2nS06NhQHaPGcHaIC2t4zlR54yVrfeSbB3LkLKqWKnMYvsu2df8V9P1dQrZN70JWBkD9Di3Dk9YVGo/DHYdvwgfVAonRQl+ZNgVX/Kr2qn/MgeoKuPPFVYVSgKJZzcYyhCtSAUv2qn/Mi+/MirBKo0GvwpX7IH6NN6qKpog8KqIShfskehVyuUPhbkXX5yJs5eowJ0D6x85AM0QEv3EimQ7Pi1iXpkt71Eo8GZgJE9QFff8lSB1fYGkZVCVPcXha5W6FjeasXIvySnBc401YyPxC/2AeqqFKDAKwp1gsLV7UApoJ07cQfyUrDxqutLd8Ar//UMUFGiAD3CikKFgF5Z2g707iNuN2TX05hI0HFsooTITgnQBqoFrOZHl7Ie7CkhsgfofwTu+MEtFYjsVvFU8OUKpQToCFggFhDFJzvtr+T/ythECVR7YIAOBAIUeigpMkd+Qqjj9+7Vpl7qWSd7o3zsiaL8dvYA5V8XBij0rChUNvXbjzwlQPupVtzGt2MWrbeX7DTfO+ZQW0Dq89TjAhTmXAJkCxCFDgQ+XqG2J1IP7LbblmEVaPd/mEOpwmTvBkbxApQISXuASmC0/HFAaUPUk6z/6vW2ANRDL59DVwOy8QPUEoP1AfpkoN8j7qg8PTSO/QAAAABJRU5ErkJggg==")
    28 / 28px / 0 stretch;
  border-width: 12px;
  border-style: solid;
  border-image-repeat: stretch repeat;
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
    randomRectRef.current += deltaTime * 0.00025;

    if (randomRectRef.current > (2 * Math.PI) / 2) {
      randomRectRef.current -= (2 * Math.PI) / 2;
    }
    //console.log(randomRectRef);

    //console.log(Math.floor((randomRectRef.current * 360) / 100));
    let deltaTimeRef = Math.floor((randomRectRef.current * 360) / 100);
    let deltaTimeRaw = randomRectRef.current;

    //variables for the dimensions of the canvas context
    const fullCanvasWidth = size.width;
    const fullCanvasHeight = size.height;
    //console.log({ fullCanvasWidth, fullCanvasHeight });

    let logoText = "ART \nBOYZ.";
    let textSize = 12.5;
    let txtSizeHalved = textSize / 2;
    let strokeWidth = 2.5;

    ctx.font = `${textSize}px "Boom4Real"`; //add font
    let txtXL1 = 0;
    let txtYL1 = 0;
    let txtXL2 = 0;
    let txtYL2 = 0;
    let txtXL3 = 0;
    let txtYL3 = 0;

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
      fullShapeHeight = canvasHeightHalved / 1.75;
      fullShapeHeight = canvasHeightHalved / 1.75;
    }

    if (fullCanvasWidth >= 241 && fullCanvasWidth <= 318.75) {
      fullShapeWidth = canvasWidthHalved / 1.5;
      fullShapeHeight = canvasHeightHalved / 1.5;
    }

    if (fullCanvasWidth >= 318.76 && fullCanvasWidth <= 576.9) {
      fullShapeWidth = canvasWidthHalved / 1.25;
      fullShapeHeight = canvasHeightHalved / 1.25;
    }

    if (fullCanvasWidth >= 577 && fullCanvasWidth <= 768) {
      //randomRectRef.current += deltaTime * 0.25;
      fullShapeWidth = canvasWidthHalved / 1.125;
      fullShapeHeight = canvasHeightHalved / 1.25;
      //      txtYL1 = canvasHeightHalved * 1.125;

      //txtyl1 breaks at not 642
    }

    if (fullCanvasWidth >= 769 && fullCanvasWidth <= 1080) {
      fullShapeWidth = canvasWidthHalved / 1.075;
      fullShapeHeight = canvasHeightHalved / 1.075;
    }

    if (fullCanvasWidth >= 1081 && fullCanvasWidth <= 1920) {
      /* fullShapeWidth = canvasWidthHalved / 1.025;
      fullShapeHeight = canvasHeightHalved / 1.025; */
      fullShapeWidth = canvasWidthHalved / 1.05;
      fullShapeHeight = canvasHeightHalved / 1.05;
    }

    if (fullCanvasWidth >= 1921) {
      fullShapeWidth = canvasWidthHalved / 0.075;
      fullShapeHeight = canvasHeightHalved / 0.075;
    }

    //variables for half dimensions of the shapes/ quarter dimenions of the canvas
    let shapeWidthHalved = fullShapeWidth / 2;
    let shapeHeightHalved = fullShapeHeight / 2;

    //variables to hold shape dimensions randomised
    /* let shapeWidth = getRandomNumber(
      shapeWidthHalved / 2,
      shapeWidthHalved / 1.5
    );
    let shapeHeight = getRandomNumber(
      shapeHeightHalved * 1.5,
      shapeHeightHalved * 1.75
    ); */

    //variables to hold shape dimensions randomised
    let shapeWidth = getRandomNumber(250 / 2, 250 / 1.5);
    let shapeHeight = getRandomNumber(250 / 2, 250 / 1.5);

    //offset positions for the animations
    /* let xOffset = canvasWidthHalved / Math.tan(randomRectRef.current); //1 red
    let yOffset = canvasHeightHalved / Math.sin(randomRectRef.current); //2 blue 
    */
    let xOffset = Math.floor(
      fullCanvasWidth * Math.tan(randomRectRef.current * 2)
    ); //1 red
    let yOffset = fullCanvasHeight * Math.tan(randomRectRef.current); //2 blue

    //shape restarts movement from left at 0 but sometimes 0 is skipped and 1 logged instead implement something for each new movement
    if (xOffset === 0 || xOffset === 1 || xOffset === 2) {
      //console.log(xOffset);
    }

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

    //let animateText = () => {

    //console.log(splitTxt1);
    //};

    let shearX = 0;
    let shearY = 0;

    //animateText();
    //ctx.beginPath();
    ctx.save();
    let splitTxt1 = logoText.split("\n");
    txtXL1 = xOffset;
    txtYL1 = canvasHeightHalved;

    if (fullCanvasWidth >= 318.75 && fullCanvasWidth <= 768) {
      txtYL1 = canvasHeightHalved * 1.125;
    }

    if (fullCanvasWidth >= 768 && fullCanvasWidth <= 1080) {
      txtYL1 = canvasHeightHalved * 1.25;
    }

    if (fullCanvasWidth >= 1080 && fullCanvasWidth <= 1920) {
      txtYL1 = canvasHeightHalved * 1.25;
      //txtXL1 = fullCanvasWidth / 2;
    }

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
    /* 
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

    txtXL1 = shapeWidthHalved;
    for (let i = 0; i < splitTxt1.length; i++) {
      ctx.fillText(
        splitTxt1[i],
        xOffset + shapeWidthHalved / 2.5,
        txtYL1 +
          shapeHeight / -1.25 +
          i * (strokeWidth + (1.25 * canvasHeightHalved) / 6.75)
      );
    } */

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
    /*ctx.save();
    let splitTxt2 = logoText.split("\n");

    let logo2 = vertices(rect([shapeWidthHalved, shapeHeightHalved]), 4);

    let logo2YValueTracker = Math.floor(Math.abs((yOffset / 360) * 100));

     let logo2VariableColour = `hsl(240, 
        ${getRandomNumber(0, 12.5)}%, ${logo2YValueTracker / 2}%)`;

    let logo2ShadowColor = `hsl(0, ${getRandomNumber(0, 10)}%, ${
      logo2YValueTracker * 2
    }%)`; 
    //console.log(logo2YValueTracker);
    let logo2VariableColour = `hsl(${logo2YValueTracker / 100}%, 
      100%, ${logo2YValueTracker}%)`;

    let logo2ShadowColor = `hsl(0, ${getRandomNumber(0, 10)}%, ${
      logo2YValueTracker / 1.75
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
            //fill: defHatchPen(logo1VariableColour, "h", 0.5, 6.25),
            fill: defHatchPen("#e1e1e1", "h", 0.5, 6.25),
          }
        )
      )
    );
    txtXL2 = canvasWidthHalved / 1.75;
    txtYL2 = yOffset;
    for (let i = 0; i < splitTxt2.length; i++) {
      ctx.fillText(
        splitTxt2[i],
        txtXL2 + shapeWidthHalved / getRandomNumber(2.75, 4),
        txtYL2 +
          shapeHeight / 4.75 +
          i * (strokeWidth + (1.25 * canvasHeightHalved) / 8.75)
      );
    }*/

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

    let logo3 = vertices(rect([shapeWidth, shapeHeight]), 4);

    let logo3XValueTracker = Math.floor(Math.abs((xOffset2 / 360) * 100) * 4);
    let logo3YValueTracker = Math.floor(Math.abs((yOffset2 / 360) * 100) * 4);

    let logo3VariableColour = `hsl(${logo3YValueTracker}, 
        ${logo3XValueTracker}%, ${getRandomNumber(90, 100)}%)`;

    let logo3ShadowColor = `hsl(0, ${getRandomNumber(
      0,
      2.5
    )}%, ${logo3XValueTracker}%)`;

    let colourFamily: number = 0;
    let colourFamilyHSL: string;
    let colourDeterminant: number = Math.floor(getRandomNumber(0, 5));

    //console.log(deltaTimeRaw);

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
      //logo3ShadowColor = `#303030`;

      logo3ShadowColor = `hsl( ${getRandomNumber(345, 360)}, 
                ${logo3XValueTracker}%, ${getRandomNumber(0, 100)}%)`; //360reds
      ctx.shadowColor = logo3ShadowColor;
      ctx.shadowBlur = logo3XValueTracker;
    }
    if (deltaTimeRef == 3) {
      //logo3ShadowColor = `#b7ff00`;

      logo3ShadowColor = `hsl(${getRandomNumber(90, 100)}, 
                    ${logo3XValueTracker}%, ${getRandomNumber(0, 100)}%)`; //greens
      ctx.shadowColor = logo3ShadowColor;
      ctx.shadowBlur = logo3XValueTracker;
    }
    if (deltaTimeRef == 6) {
      //logo3ShadowColor = `#d30f0f`;
      logo3ShadowColor = `hsl(${getRandomNumber(225, 240)}, 
                    ${logo3XValueTracker}%, ${getRandomNumber(0, 100)}%)`; //blues
      ctx.shadowColor = logo3ShadowColor;
      ctx.shadowBlur = logo3XValueTracker;
    }
    if (deltaTimeRef == 9) {
      //logo3ShadowColor = `#2b00ff`;
      logo3ShadowColor = `hsl(${getRandomNumber(0, 360)}, 
                    ${logo3XValueTracker}%, ${getRandomNumber(0, 100)}%)`; //rainbow
      ctx.shadowColor = logo3ShadowColor;
      ctx.shadowBlur = logo3XValueTracker;
    }

    //console.log(logo3XValueTracker);

    //ctx.shadowColor = logo3ShadowColor;

    //ctx.shadowBlur = logo3XValueTracker;

    shearX = 0.00125;
    shearY = -0.0125;

    draw(
      ctx,
      center(
        fuzzyPoly(
          logo3,
          {
            //rotate: logo3XValueTracker * 2,
            //translate: [canvasWidthHalved, canvasHeightHalved],
            transform: [
              1,
              shearY,
              shearX,
              1,
              /* logo3XValueTracker,
              logo3YValueTracker, */
              canvasWidthHalved,
              //xOffset,
              canvasHeightHalved,
              //yOffset,
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
              defHatchPen(logo3ShadowColor, "d", 1, 8.5),
              defHatchPen(logo3VariableColour, "d", 2, 4)
            ),
          }
        )
      )
    );

    //txtX = logo3XValueTracker;
    //txtY = logo3YValueTracker;
    //txtXL3 = xOffset;
    txtXL3 = canvasWidthHalved;
    txtYL3 = canvasHeightHalved;

    for (let i = 0; i < splitTxt3.length; i++) {
      ctx.fillText(
        splitTxt3[i],
        txtXL3 - shapeWidth / 2,
        //+ xOffset2,
        //- shapeWidth / getRandomNumber(4, 4.5),
        txtYL3 + shapeHeight / 2.25 + i * (strokeWidth + 1.25 + shapeHeight / 8)
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
