import "dotenv/config";
const isProd = process.env.APP_VARIANT === "production";

export default ({ config }) => ({
  ...config,
  name: isProd ? "BillingApp" : "BillingApp-Dev",
  slug: "billing",
  version: "1.0.0",
  orientation: "portrait",

  icon: "./assets/images/hudwater.png",  // APP ICON

  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.hammad2000.billing",
  },

  android: {
    package: "com.hammad2000.billing",
    adaptiveIcon: {
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
    },
    usesCleartextTraffic: true,
  },

  web: {
    bundler: "metro",
    favicon: "./assets/images/favicon.png",
  },

  plugins: [
    "expo-router",
    ["expo-splash-screen", {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    }],
  ],

  extra: {
    BASE_URL: "https://billing-backend-two.vercel.app",
    eas: {
      projectId: "a3eb0a71-c6d6-4452-a961-ce182c5f0e6e",
    },
  },
});
