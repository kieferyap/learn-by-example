/* eslint-disable no-restricted-globals */
/// <reference lib="webworker" />
export default null
declare let self: ServiceWorkerGlobalScope

// Import the Workbox library
import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST);

// Service Worker: Push notifications
self.addEventListener('push', (event: PushEvent) => {
  console.log('event.data:', event.data);
  console.log('event.data.text():', event.data?.text());

  // Optional: Ensure event data is present
  const message = event.data?.text() || 'Default notification message';

  const options: NotificationOptions = {
    body: message,
    // You can add more options like icon and badge if needed:
    // icon: 'icon_url',
    // badge: 'badge_url',
  };

  event.waitUntil(
    self.registration.showNotification('Learn By Example', options)
  );
});