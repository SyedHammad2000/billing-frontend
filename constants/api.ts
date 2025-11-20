
// export const BASE_URL =
//     "https://billing-jebemjmz.deployra.app" ||
//     "http://localhost:3000";
export const BASE_URL =
    process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "billing-backend-two.vercel.app";
