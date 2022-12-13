/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ['natuprime.saleor.cloud','flowbite.com']
  }
}

module.exports = nextConfig
