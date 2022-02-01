import React from 'react';
import Footer from './Footer';
import Header from './Header';
import List from './Conference';
import toast, { Toaster } from 'react-hot-toast';
import { useHMSNotifications } from '@100mslive/react-sdk';
import DemoModal from './DemoModal';

// import MobileView from './mobile';

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
      toast('RECONNECTING');
    }
    if (notification.type === 'RECONNECTED') {
      toast('RECONNECTED');
    }
    if (notification.type === 'ERROR') {
      toast(`[ERROR] ${notification.data.code} ${notification.data}`);
    }
  }, [notification]);

  return (
    <Toaster
      position="bottom-left"
      toastOptions={{
        style: {
          background: 'var(--accents-8)',
          color: 'var(--accents-1)'
        }
      }}
    />
  );
};
