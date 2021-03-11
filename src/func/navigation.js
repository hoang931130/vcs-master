/* Custom navigation handler */
import * as React from 'react';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

/**
 * Go to any page.
 * Ref. https://reactnavigation.org/docs/navigating-without-navigation-prop
 */
export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  }
  else {
    // Navigation not mounted, resend after 3 secs.
    setTimeout(function() {
      navigationRef.current.navigate(name, params);
    }, 3000);
  }
}
