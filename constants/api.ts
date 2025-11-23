// export const BASE_URL = "https://billing-backend-two.vercel.app";

import Constants from "expo-constants";

// Use optional chaining and fallback
export const BASE_URL = Constants.expoConfig?.extra?.BASE_URL ?? "https://billing-backend-two.vercel.app";
// console.log("Environment:", process.env.NODE_ENV);
console.log("Using API base URL:", BASE_URL);
console.log("Full expoConfig.extra:", Constants.expoConfig?.extra);