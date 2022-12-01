import { useRouter } from "next/router";
import { FC, useRef } from "react";
import styled, { css } from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

export interface ContainerProps {
  //page: string;
  about?: string;
  music?: string;
  socials?: boolean;
  children?: React.ReactNode;
}

const aboutPageBorderImgUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAA3dJREFUeF7tnNFygzAMBOn/f3Q7eSs242WRDUl7fRVI8uokG5L0a9u27839fTWXz76/9d9mV41Hq7X+d/5eyVsHATooSYD2cKzAolDo+elAqaVX22nGtXabD81k629XgKOWLznctq16f4A2BAJ0MpAAlT1GwGjGVWeYTLcbQRTf+r99l7cHdVswAmDjk7+h/Y5zqF1QgEJJ/z1QUshqO7WcLRD5szNft/xqYOSfAASoPJYFqAT25xW69Fw24VGUWpwUTfbSy5AzA3hqgAD1L5xJAdTi1k7xrH2qgI7aaWqAKJTr2wKvzjjyRwW+O/6wo64kQwC4JPsryF+ASqIBCudOybP71JU2qTMnFZODLejbtbxt4er1dqxZwN37UFPN17UUkPxVAZFCZ+enOsZWL0DhnB6gfT+RwocdduWNPbUcvRu4UkQaIyO7BVTKL0Dre0K3KdEmQeqgipJCyH/VTvHJruJHoTcolI4JpEhV0Rsupg6k9aoUjxRKAQJ0gDhA+cttUWhD4PGWp4pQy9sFULzVdpvv8FRwZZcP0H2JdzwClD9DU5t0gC4ASs/eNMOogvbZn+JZe3VGUryu5QN0T4AKMBTI0QZTcnjih2S0qZEirJ3WYzssQKECtwO1Ae9WICnWKrQ0As+0fIBSyX7ZA7R/lo9CQUC3tzwFJMF/+kig9dEb/Z39ypMSHdSpQO+2aQUoEZhsj0KfBlqNryp48AXcany6n/Ir7eo0/yi5IzslTPYrMc09Nj7tAcPYMzYISpjsBs6Va238AJXnUBJRGSg5oHMmJUgzivzTmLL5k8qtonf+zpxDacEB2jzL2wqXKnjiC7vVfEjRUWhDgDrm7YBSwtZOiqAZS4CqHUPx1Ug7mqEW2OoFBaiVZHN9dYYqRR3kWhJIFNoTnQ60KDD8P0lV/7Rga6/m030uTy1mA1ZbjuJZYLQnUDyyBygRkvYAlcDo8g4o3UD26sigEWH9U4svtdNiCObLbhdM50o6aFNOS4HRf6gIUP5ZjdoEA3QB0GrLrm5h8k8KsiOERsZw5Jx5H0ozixZsF0TxaMHUdSQg8h+gk98VBOjTQEny1k4tT/5oBNDIoRk71f7E2ya7gAAFAgHaAKIWtbss+ft4hVYXQPfTsYVm4uqZXCrwjHMoKZIAUAHI/+wREqByJNkCqo6KQnu8JYX+AAySuCwrwz/OAAAAAElFTkSuQmCC";
const musicPageBorderImgUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAAz5JREFUeF7tm+1u7CAMRLPv/9CtqkpVIRGHyZgUdef+u+LD5jA2hk1fR/2/j27KV/f/vp08UMdT/769t2/5R5PTYq/aA/QOtcGYAA3QhoAd8tYEx3HQeDWnqQqntPWof1/OkMFewARI7U/zqe3qIaPOP9zwAD2OAIWybDuFlu7YxYHnphj1DCV7tF6y14y/CnkyoLariqEcTAtU7dF6yF6ArrzJRaF8KNkKlSagzhM5lEJObb/hUt2QirJJ9cYt3Gm86k9p/wAtxfmdP6isWH3qqiG9vULdPdptQ6hscjdwKDB6WJiBHaC/KAXoOeWRgqNQsZAvB0ohTKquPjTIH/XQpPnU9TX2rwZXGyQHKU+TPwFKBLv2AIWcJfIsr5NpgyiihuMrCvvqnEnAXSBqnUr+nHIoOUg5KkC7OjRAW8lQyA8Vm5Dnwl4OeWnAG3RWIxbr0DdgNlxigBYrIEB3A1pd9tAOW6doMbyZ6YhP0z7zq+eM0d99AvThq2IUKko0CgVg6oMr8d9doSQI+6YUoCQR8S4foAEqEDh3tUPesn4xmOq2anvqfEv9W3FALHVYpff0hgfo+XNGa88CdAFQKwkfxQ5Z8rgeXL2+8h/perdXqLySa4BW0rzxuSYJJgo1N0i62Mw83+1eBhEvCnk3ZcnvoQE63rIAXfn+m5D3yz5UKOUkOgXV8f+q/50vRwJ0IIEALY6PAF0A1J3SLatW14m0PvKf/Gvmd4var8nIIXVBT+do8j9AaQe79gAVgVH3cqAkaUoLq8dXpwAC2NuT1jdzygfoWOMNnwDlq2cUCklzechbOWOibHIXQClHPXSov2Wv4m89CRi104ZaC7zxE4hlL0DPeg1QMWc+HvJkcHU7pQi3XfWfTvnyu7zqIPV3gdF4sk85fTjeyheqZ5P9CYjbPunGT7cotCPmisYGKk1w8W0TjX90gRPfXrmKP/1IZ+WMAG3fg+/UofT6E4XCgyslcenbn4kQJHu0YbThFJG0nmH7jEItAxd0KIeW5rSClCRtYIDy1TNAoWwiQBSRcmFfHXJ/mtN2DHk6JKpzIm0AKUwdT/7T+vEu7zrsnqIqEFowhXCAEkExhwbozkA/Ab6ocDzmRMZYAAAAAElFTkSuQmCC";

type BorderProps = {
  about: boolean;
  music: boolean;
  socials: boolean;
};

/* let StyledMainDiv = styled.div`
  grid-area: canvas;
  font-size: 2.5rem;
  border-image: url(${({ props }) =>
      props.page == "About" ? aboutPageBorderImgUrl : null})
    28 / 28px / 0 round;
  border-width: 12px;
  border-style: solid;
  border-image-repeat: stretch repeat;
  width: 100%;
  height: 100%;
`; */

let StyledMainDiv = styled.div<ContainerProps>`
  grid-area: canvas;
  font-size: 2.5rem;
  border-image: url(${(props) =>
      props.about === "true"
        ? aboutPageBorderImgUrl
        : 0 || props.music === "true"
        ? musicPageBorderImgUrl
        : 0})
    //props.page == "About" ? aboutPageBorderImgUrl : 0})
    28 / 28px / 0 round;
  border-width: 12px;
  border-style: solid;
  border-image-repeat: stretch repeat;
  width: 100%;
  height: 100%;
`;

export let ContentContainer: FC<ContainerProps> = ({
  about = "false",
  music = "false",
  socials = false,
  children,
  ...props
}) => {
  const router = useRouter();

  return (
    <>
      <StyledMainDiv about={about} music={music}>
        {children}
      </StyledMainDiv>
    </>
  );
};

/* 
export function ContentContainers({
  about,
  music,
  socials,
  children,
}: ContainerProps) {
  let size = useWindowSize();
  //const divRef = useRef<HTMLDivElement | null>(null);
  //${router.pathname == "/about" ? aboutPageBorderImgUrl : null};

  return <></>;
}
 */
