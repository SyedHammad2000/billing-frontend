// export const BASE_URL = "https://billing-backend-two.vercel.app";

import Constants from "expo-constants";

// Use optional chaining and fallback
export const BASE_URL = Constants.expoConfig?.extra?.BASE_URL ?? "http://localhost:5000";
console.log("Using API base URL:", BASE_URL);