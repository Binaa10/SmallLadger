# microladger (Expo + Expo Router)

A React Native mobile app scaffolded with Expo (TypeScript) and Expo Router, dark theme by default, with basic screens (Splash, Onboarding, Login, Dashboard) and reusable UI components.

## Prerequisites

- Node.js LTS
- Expo CLI (installed automatically via `npx`)

## Install & Run (Windows PowerShell)

```powershell
# Install dependencies (aligns versions for Expo)
npx expo install

# Start the dev server
npm run start

# Optional platform targets
npm run android
npm run ios
npm run web
```

If `npx expo install` prompts to fix versions, accept the changes.

## Screens

- Splash → Onboarding → (auth)/Login → (app)/Dashboard

## Assets

- Place your app icons at `assets/` (icon.png, splash.png, adaptive-icon.png) and update `app.config.ts` if desired.

## Notes

- This scaffold uses `react-native-gesture-handler` and `react-native-reanimated`. Babel plugin is configured. Ensure you fully restart Metro after first install.
- File-based routing via `expo-router`. See `app/` for route files.
