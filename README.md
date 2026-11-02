# Truth Sentinel — Mobile (Fake News Shield)

Mobile-ready version of [truth-sentinel](https://github.com/susmitha801/truth-sentinel):
a fake-news detection app packaged for Android with Capacitor 8.

- **Web app**: TanStack Start + React 19 + Vite, Tailwind 4, shadcn-style UI, Supabase history
- **Backend**: FastAPI heuristic classifier (`backend/main.py`)
- **Native**: Capacitor 8 Android project in `android/` (appId `com.fakenewsshield.app`)

## Requirements

- Node.js 20+ (tested on v24), Python 3.11+
- Android SDK (platform-tools, platform `android-34`+, build-tools) with `ANDROID_HOME` set
- JDK 21

## 1. Web + backend dev servers

```bash
npm install
npm run dev                 # Vite dev server → http://localhost:8080

cd backend
python -m venv venv
venv/Scripts/pip install -r requirements.txt    # Windows
# source venv/bin/activate && pip install -r requirements.txt   # macOS/Linux
venv/Scripts/python -m uvicorn main:app --port 8000             # Windows
```

The app works without the backend too — it falls back to an in-app heuristic
analyzer — but the badge shows "Backend Online" only when port 8000 responds.

## 2. Run on a USB-connected Android phone

Enable **Developer options → USB debugging** on the phone, connect via USB, then:

```bash
# Forward device localhost → host localhost over USB
adb reverse tcp:8080 tcp:8080
adb reverse tcp:8000 tcp:8000

# Install + launch (rebuild first if config/assets changed)
cd android && ./gradlew assembleDebug && cd ..
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.fakenewsshield.app/.MainActivity
```

`adb reverse` mappings reset on reboot/replug — re-run the two commands if the
app shows "web page not available".

## 3. Run on an emulator

Create an AVD with a recent system image (API 34+ — Tailwind v4 needs a modern
WebView), boot it, then:

```bash
# In capacitor.config.ts, switch server.url to http://10.0.2.2:8080
npx cap sync android
cd android && ./gradlew assembleDebug && cd ..
adb -e install -r android/app/build/outputs/apk/debug/app-debug.apk
adb -e shell am start -n com.fakenewsshield.app/.MainActivity
```

Note: `10.0.2.2` is the emulator's alias for the host machine's localhost. The
backend `localhost:8000` call will fall back to in-app analysis on an emulator
unless you also forward or reconfigure `BACKEND_URL` in `src/lib/analyzer.ts`.

## 4. Standalone build (no dev server)

```bash
npm run build                          # produces .output/public
# remove the `server` block in capacitor.config.ts (or point url: at a deployed site)
npx cap sync android
cd android && ./gradlew assembleDebug
```

## Re-syncing after web changes

```bash
npm run mobile      # = npm run build && npx cap sync android
```
