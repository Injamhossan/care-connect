/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co.com" },
    ],
  },
};

export default nextConfig;
