import { useRouter } from "next/router";
import { FC, useRef } from "react";
import styled, { css } from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

export interface ContainerProps {
  //page: string;
  about?: string;
  music?: string;
  socials?: string;
  children?: React.ReactNode;
}

const aboutPageBorderImgUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAA3dJREFUeF7tnNFygzAMBOn/f3Q7eSs242WRDUl7fRVI8uokG5L0a9u27839fTWXz76/8d9mV41Hq7X+d/5eyVsHATooSYD2cKzAolDo+elAqaVX22nGtXabD81k629XgKOWLznctq16f4A2BAJ0MpAAlT1GwGjGVWeYTLcbQRTf+r99l7cHdVswAmDjk7+h/Y5zqF1QgEJJ/z1QUshqO7WcLRD5szNft/xqYOSfAASoPJYFqAT25xW69Fw24VGUWpwUTfbSy5AzA3hqgAD1L5xJAdTi1k7xrH2qgI7aaWqAKJTr2wKvzjjyRwW+O/6wo64kQwC4JPsryF+ASqIBCudOybP71JU2qTMnFZODLejbtbxt4er1dqxZwN37UFPN17UUkPxVAZFCZ+enOsZWL0DhnB6gfT+RwocdduWNPbUcvRu4UkQaIyO7BVTKL0Dre0K3KdEmQeqgipJCyH/VTvHJruJHoTcolI4JpEhV0Rsupg6k9aoUjxRKAQJ0gDhA+cttUWhD4PGWp4pQy9sFULzVdpvv8FRwZZcP0H2JdzwClD9DU5t0gC4ASs/eNMOogvbZn+JZe3VGUryu5QN0T4AKMBTI0QZTcnjih2S0qZEirJ3WYzssQKECtwO1Ae9WICnWKrQ0As+0fIBSyX7ZA7R/lo9CQUC3tzwFJMF/+kig9dEb/Z39ypMSHdSpQO+2aQUoEZhsj0KfBlqNryp48AXcany6n/Ir7eo0/yi5IzslTPYrMc09Nj7tAcPYMzYISpjsBs6Va238AJXnUBJRGSg5oHMmJUgzivzTmLL5k8qtonf+zpxDacEB2jzL2wqXKnjiC7vVfEjRUWhDgDrm7YBSwtZOiqAZS4CqHUPx1Ug7mqEW2OoFBaiVZHN9dYYqRR3kWhJIFNoTnQ60KDD8P0lV/7Rga6/m030uTy1mA1ZbjuJZYLQnUDyyBygRkvYAlcDo8g4o3UD26sigEWH9U4svtdNiCObLbhdM50o6aFNOS4HRf6gIUP5ZjdoEA3QB0GrLrm5h8k8KsiOERsZw5Jx5H0ozixZsF0TxaMHUdSQg8h+gk98VBOjTQEny1k4tT/5oBNDIoRk71f7E2ya7gAAFAgHaAKIWtbss+ft4hVYXQPfTsYVm4uqZXCrwjHMoKZIAUAHI/+wREqByJNkCqo6KQnu8JYX+AAySuCwrwz/OAAAAAElFTkSuQmCC";

const musicPageBorderImgUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAAz5JREFUeF7tm+1u7CAMRLPv/9CtqkpVIRGHyZgUdef+u+LD5jA2hk1fR/2/j27KV/f/vp08UMdT/769t2/5R5PTYq/aA/QOtcGYAA3QhoAd8tYEx3HQeDWnqQqntPWof1/OkMFewARI7U/zqe3qIaPOP9zwAD2OAIWybDuFlu7YxYHnphj1DCV7tF6y14y/CnkyoLariqEcTAtU7dF6yF6ArrzJRaF8KNkKlSagzhM5lEJObb/hUt2QirJJ9cYt3Gm86k9p/wAtxfmdP6isWH3qqiG9vULdPdptQ6hscjdwKDB6WJiBHaC/KAXoOeWRgqNQsZAvB0ohTKquPjTIH/XQpPnU9TX2rwZXGyQHKU+TPwFKBLv2AIWcJfIsr5NpgyiihuMrCvvqnEnAXSBqnUr+nHIoOUg5KkC7OjRAW8lQyA8Vm5Dnwl4OeWnAG3RWIxbr0DdgNlxigBYrIEB3A1pd9tAOW6doMbyZ6YhP0z7zq+eM0d99AvThq2IUKko0CgVg6oMr8d9doSQI+6YUoCQR8S4foAEqEDh3tUPesn4xmOq2anvqfEv9W3FALHVYpff0hgfo+XNGa88CdAFQKwkfxQ5Z8rgeXL2+8h/perdXqLySa4BW0rzxuSYJJgo1N0i62Mw83+1eBhEvCnk3ZcnvoQE63rIAXfn+m5D3yz5UKOUkOgXV8f+q/50vRwJ0IIEALY6PAF0A1J3SLatW14m0PvKf/Gvmd4var8nIIXVBT+do8j9AaQe79gAVgVH3cqAkaUoLq8dXpwAC2NuT1jdzygfoWOMNnwDlq2cUCklzechbOWOibHIXQClHPXSov2Wv4m89CRi104ZaC7zxE4hlL0DPeg1QMWc+HvJkcHU7pQi3XfWfTvnyu7zqIPV3gdF4sk85fTjeyheqZ5P9CYjbPunGT7cotCPmisYGKk1w8W0TjX90gRPfXrmKP/1IZ+WMAG3fg+/UofT6E4XCgyslcenbn4kQJHu0YbThFJG0nmH7jEItAxd0KIeW5rSClCRtYIDy1TNAoWwiQBSRcmFfHXJ/mtN2DHk6JKpzIm0AKUwdT/7T+vEu7zrsnqIqEFowhXCAEkExhwbozkA/Ab6ocDzmRMZYAAAAAElFTkSuQmCC";

const socialsPageBorderImgUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAAyRJREFUeF7tncF2wyAMBN3//+j29Wjs52Ei4Trp9ioslmERmKTt17Zt31vvzxeko/7G52373tFIPr/iSbAVGKCWGLQP8AC9JKBW8NmSpxpmHdjdfhz9OGDSPz5f1bfrP0C3LUAHi8WhEgiV+McDpQFQjbJx6u/umkn9Xep95RxqgZGDAlQu2QCVB3cCRvGPc6gdELUngBSn/FTjqCTZcyjpOZxD6QEbJ2AUX91fgMrbqzjUWrK4KT7eoXYJV9tbINRfa5zeY2fMQ4LsJkLtA1Qu0QAdCJDrq45+O4fSgClOZUJd2G58vUb92TiN7zJ+5qZSwgn1AVqsgbYm2iU9MYeqSclQceiR9XKganonah4Jtv2tbq/0zjjUCu7e5W3/3e0DtJlogD4NKO3KtKSbx1NOZ49p9pSh70OV5cvD708QoM1MA/TTgNISp3gzj/Z0Vf2Xjp85h9JHCu++SVn9AXrnXUQc6q8H0aFUU6rx9iJYTEjjKaXv+H7oUoGl0Z0/vFRvgPolfznHAfoHQGnVLV1C1HlDvKr/8C7fmnDigrmBQWuK1vHPLHlSXxVE+VfHq/rj0JUHffvaNeOW6ozP9NHZhvSqeIAef9fV3l3oC2brBppRm291e9Kr4nHoAofSjbaFTjO62nHV/KT/Mj7ze0oBup+iAJWWjUMlMGreDpSWONVcEkz56fm74wR4p+eVV88AvZjSAGW/x6HMSLXQQCm7SniSjJ6nOOkb4zZfawmb2SCsQDvAan7bH7W3E7hjGKD1PwQWoHAf2u5QWoIUry4pWjW25lE+0quu8+745kg3gO58ASrXZBwKwB7vUKqJd8fJgOQ40muXOOnR7/IksDtOAwjQgRDtmgEqgf17oOQYqkljnIDSkiY91RJE+S/jr1zfUYe0CwcoEZSvcgEaoPMEZj5GphpIvb17CSD9eA4lQHbTIEFPLwGkP0Ch5tME610+Dt0TKDuUZoiWPAmo5qdzr9VXbb8b78w5lA7KNEDa1Gx+6q8KyOYPUHhVDtBmQO1AuzclykcDsCWD2tv+lP47DvZK0MT/d3JNLUCb7wIC9JOA/gA7HqQ0lDXSTwAAAABJRU5ErkJggg==";

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
  width: 100%;
  height: 100%;
  border-width: 12px;
  border-style: solid;
  border-image: url(${(props) =>
      props.about === "true"
        ? aboutPageBorderImgUrl
        : 0 || props.music === "true"
        ? musicPageBorderImgUrl
        : 0 || props.socials === "true"
        ? socialsPageBorderImgUrl
        : 0})
    28 / 28px / 0 stretch;
  border-image-repeat: stretch repeat;
`;

export let ContentContainer: FC<ContainerProps> = ({
  about = "false",
  music = "false",
  socials = "false",
  children,
  ...props
}) => {
  const router = useRouter();

  return (
    <>
      <StyledMainDiv about={about} music={music} socials={socials}>
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
