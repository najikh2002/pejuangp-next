/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'www.notion.so', 'avatars.githubusercontent.com', 'prod-files-secure.s3.us-west-2.amazonaws.com'],
},
};

export default nextConfig;
