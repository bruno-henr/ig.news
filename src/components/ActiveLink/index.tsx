import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, cloneElement } from "react";

interface IActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

const ActiveLink: React.FC<IActiveLinkProps> = ({
  children,
  activeClassName,
  ...rest
}) => {

  console.log('teste activeClassName', activeClassName)
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : "";

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
};

export default ActiveLink;
