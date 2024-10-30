import dotenv from "dotenv";
dotenv.config(); // Load variables from .env

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEST_PUBLIC_API_URL: process.env.NEST_PUBLIC_API_URL, // Explicitly load your variables
    PORT: process.env.PORT, // Load PORT if needed elsewhere in the app
  },
};

export default nextConfig;
