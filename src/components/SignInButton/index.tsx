import React from 'react';
import { signIn, useSession, signOut } from 'next-auth/react'

import styles from './styles.module.scss'
//icon
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
//

export const SignInButton: React.FC = () => {
    const session = useSession().data;
    console.log('session', session);
    const isUserLoggedIn = session;

  return isUserLoggedIn ? (
    <button 
        type='button'
        className={styles.signInButton}
        onClick={() => signOut()}
    >
        <FaGithub color='#04d361' /> 
        {session.user?.name}
        <FiX color='#737380' className={styles.closeIcon} />
    </button>
  ) : (
    <button 
        type='button'
        className={styles.signInButton}
        onClick={() => signIn('github')}
    >
        <FaGithub color='#eba417' /> 
        Sign in with github
    </button>
  )
}