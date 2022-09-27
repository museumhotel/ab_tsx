import Link from "next/link";
import { ScriptProps } from "next/script";
import { type } from "os";
import React, { AnchorHTMLAttributes, PropsWithChildren } from "react";
import styled, { StyledComponent } from "styled-components";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

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

interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  children?: React.ReactNode;
  className?: string;
  route?: any;
  params?: any;
}

const CustomLink: React.FC<LinkProps> = ({ children, to, ...attributes }) => {
  return (
    <Link
      route={attributes.route}
      params={attributes.params}
      href={to}
      passHref
    >
      <StyledLink className={attributes.className}>{children}</StyledLink>
    </Link>
  );
};

export default CustomLink;

/* export default ({ route, params, href, children, className }) => (
  <Link route={route} params={params} href={href} passHref>
    <StyledLink className={className}>{children}</StyledLink>
  </Link>
); */
