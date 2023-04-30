import React from "react";

import styles from "./styles.module.scss";
import { useSession, signIn } from "next-auth/react";
import { api } from '../../services/api'
import { getStripeJs } from "@/services/stripe-js";
interface SubscribeButtonProps {
  priceId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ priceId }) => {
  const session = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      signIn('github');
      return 
    }

    // criacao da checkkout session
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;
      console.log('session id', sessionId)

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId })
    } catch (error:any) {
      alert(error.message)
    }
  };

  return (
    <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
      Subscrive now
    </button>
  );
};

export default SubscribeButton;
