import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled.a`
  text-decoration: none;
  &:-webkit-any-link,
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  color: white;
`;

export default ({ route, params, href, children, className }) => (
  <Link route={route} params={params} href={href} passHref>
    <StyledLink className={className}>{children}</StyledLink>
  </Link>
);
