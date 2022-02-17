import React from 'react';
import Footer from './Footer';
import Header from './Header';
import List from './Conference';
import toast, { Toaster } from 'react-hot-toast';
import { useHMSNotifications } from '@100mslive/react-sdk';
import DemoModal from './DemoModal';

/**
 * Live Video/Audio component
 */
const Live = () => {
  return (
    <div className="flex justify-center items-center relative flex-col h-full">
      <Notification />
      <Header />
      <List />
      <Footer />
      {process.env.NEXT_PUBLIC_LIVE_DEMO === 'true' ? <DemoModal /> : null}
    </div>
  );
};

export default Live;

const Notification = () => {
  const notification = useHMSNotifications();
  React.useEffect(() => {
    if (!notification) {
      return;
    }
    if (notification.type === 'RECONNECTING') {
      toast.error(
        'You are offline for now. while we try to reconnect, please check your internet connection.'
      );
    }
    if (notification.type === 'RECONNECTED') {
      toast.success('You are now connected.');
    }
    if (notification.type === 'ERROR') {
      toast.error(`Error: ${notification.data.message}`);
    }
  }, [notification]);

  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        style: {
          background: 'var(--accents-7)',
          color: 'var(--accents-1)'
        }
      }}
    />
  );
};
