import React from "react";
import Link from "next/link";

import styles from "./styles.module.scss";
import { SignInButton } from "../SignInButton";
import ActiveLink from "../ActiveLink";

export const Header: React.FC = () => {
  
  
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img src="/images/logo.svg" alt="ig.news" />
          <nav>
            <ActiveLink activeClassName={styles.active} href="/">
              <span>Home</span>
            </ActiveLink>
            <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
              <span>Posts</span>
            </ActiveLink>
          </nav>

          <SignInButton />
        </div>
      </header>
    </>
  );
};
