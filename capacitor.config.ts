import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fakenewsshield.app',
  appName: 'Fake News Shield',
  webDir: '.output/public',
  server: {
    // Dev mode: the app loads the local Vite dev server. On a USB-connected
    // phone this works via `adb reverse tcp:8080 tcp:8080` (and tcp:8000 for
    // the FastAPI backend). On an emulator use http://10.0.2.2:8080 instead.
    // For a standalone install, build the web app and remove `server` — or
    // point it at a deployed site, e.g. https://susmitha801.github.io/truth-sentinel/
    url: 'http://localhost:8080',
    cleartext: true
  }
};

export default config;
