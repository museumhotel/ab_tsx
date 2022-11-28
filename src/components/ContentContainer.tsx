import { useRouter } from "next/router";
import { useRef } from "react";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

interface ContainerProps {
  children?: React.ReactNode;
}

const StyledMainDiv = styled.div`
  grid-area: canvas;
  font-size: 2.5rem;
  border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAA3dJREFUeF7tnNFygzAMBOn/f3Q7eSs242WRDUl7fRVI8uokG5L0a9u27839fTWXz76/9d9mV41Hq7X+d/5eyVsHATooSYD2cKzAolDo+elAqaVX22nGtXabD81k629XgKOWLznctq16f4A2BAJ0MpAAlT1GwGjGVWeYTLcbQRTf+r99l7cHdVswAmDjk7+h/Y5zqF1QgEJJ/z1QUshqO7WcLRD5szNft/xqYOSfAASoPJYFqAT25xW69Fw24VGUWpwUTfbSy5AzA3hqgAD1L5xJAdTi1k7xrH2qgI7aaWqAKJTr2wKvzjjyRwW+O/6wo64kQwC4JPsryF+ASqIBCudOybP71JU2qTMnFZODLejbtbxt4er1dqxZwN37UFPN17UUkPxVAZFCZ+enOsZWL0DhnB6gfT+RwocdduWNPbUcvRu4UkQaIyO7BVTKL0Dre0K3KdEmQeqgipJCyH/VTvHJruJHoTcolI4JpEhV0Rsupg6k9aoUjxRKAQJ0gDhA+cttUWhD4PGWp4pQy9sFULzVdpvv8FRwZZcP0H2JdzwClD9DU5t0gC4ASs/eNMOogvbZn+JZe3VGUryu5QN0T4AKMBTI0QZTcnjih2S0qZEirJ3WYzssQKECtwO1Ae9WICnWKrQ0As+0fIBSyX7ZA7R/lo9CQUC3tzwFJMF/+kig9dEb/Z39ypMSHdSpQO+2aQUoEZhsj0KfBlqNryp48AXcany6n/Ir7eo0/yi5IzslTPYrMc09Nj7tAcPYMzYISpjsBs6Va238AJXnUBJRGSg5oHMmJUgzivzTmLL5k8qtonf+zpxDacEB2jzL2wqXKnjiC7vVfEjRUWhDgDrm7YBSwtZOiqAZS4CqHUPx1Ug7mqEW2OoFBaiVZHN9dYYqRR3kWhJIFNoTnQ60KDD8P0lV/7Rga6/m030uTy1mA1ZbjuJZYLQnUDyyBygRkvYAlcDo8g4o3UD26sigEWH9U4svtdNiCObLbhdM50o6aFNOS4HRf6gIUP5ZjdoEA3QB0GrLrm5h8k8KsiOERsZw5Jx5H0ozixZsF0TxaMHUdSQg8h+gk98VBOjTQEny1k4tT/5oBNDIoRk71f7E2ya7gAAFAgHaAKIWtbss+ft4hVYXQPfTsYVm4uqZXCrwjHMoKZIAUAHI/+wREqByJNkCqo6KQnu8JYX+AAySuCwrwz/OAAAAAElFTkSuQmCC")
    28 / 28px / 0 round;
  border-width: 12px;
  border-style: solid;
  border-image-repeat: stretch repeat;
  width: 100%;
  height: 100%;
`;

export function ContentContainer({ children }: ContainerProps) {
  const router = useRouter();
  let size = useWindowSize();
  //const divRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <StyledMainDiv>{children}</StyledMainDiv>
    </>
  );
}
