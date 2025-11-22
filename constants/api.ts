export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://192.168.100.3:5000"
    : "https://billing-backend-two.vercel.app";
