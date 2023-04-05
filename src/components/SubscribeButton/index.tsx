
import React from 'react';

import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ priceId }) => {
  return (
    <button
        type='button'
        className={styles.subscribeButton}
    >
        Subscrive now
    </button>
  )
}

export default SubscribeButton;