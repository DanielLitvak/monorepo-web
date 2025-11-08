import { useRegisterSW } from 'virtual:pwa-register/preact';
import { useEffect } from 'preact/hooks';

export function usePWA() {
  const { needRefresh: [needRefresh, setNeedRefresh], offlineReady: [offlineReady, setOfflineReady], updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (registration) {
        console.log('SW Registered:', registration);
        // Check if service worker is already installed
        if (registration.installing) {
          console.log('SW Installing...');
        } else if (registration.waiting) {
          console.log('SW Waiting...');
        } else if (registration.active) {
          console.log('SW Active');
        }
      }
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
    onOfflineReady() {
      console.log('@ Offline ready callback triggered - setting offlineReady to true');
      // setOfflineReady(true);
    },
    onNeedRefresh() {
      console.log('Need refresh')
    },
  })

  // Debug: Log offlineReady state changes
  useEffect(() => {
    console.log('offlineReady state changed:', offlineReady);
  }, [offlineReady]);

  return {
    needRefresh,
    offlineReady,
    setNeedRefresh,
    setOfflineReady,
    updateServiceWorker,
  }
}

