import "dotenv/config";
const isProd = process.env.APP_VARIANT === "production";

export default ({ config }) => ({
  ...config,
  name: isProd ? "BillingApp" : "BillingApp-Dev",
  slug: "HUDWater",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/hudwater.png",
  scheme: "billing",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/hudwater.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
    dark: {
      backgroundColor: "#000000",
    },
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
      backgroundColor: "#E6F4FE",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },

    usesCleartextTraffic: true,
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "white",
        borderRadius: "100%",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    BASE_URL: isProd
      ? "https://billing-backend-two.vercel.app"
      : "https://billing-backend-two.vercel.app",
    eas: {
      projectId: "a3eb0a71-c6d6-4452-a961-ce182c5f0e6e",
    },
  },
});
