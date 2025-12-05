/** @type {import('next').NextConfig} */
const nextConfig = {
 // Configuration pour Docker (standalone build)
 output: 'standalone',

 // Support des images externes
 images: {
   remotePatterns: [
     {
       protocol: 'http',
       hostname: 'localhost',
       port: '3001',
       pathname: '/**',
     },
     {
       protocol: 'https',
       hostname: 'votre-api-domain.com',
       pathname: '/**',
     },
   ],
 },

 // Proxy API (équivalent de votre config next)
 async rewrites() {
   return [
     {
       source: '/api/:path*',
       destination: 'http://localhost:3001/api/:path*',
     },
   ];
 },

 // Variables d'environnement publiques
 env: {
   CUSTOM_KEY: process.env.CUSTOM_KEY,
 },

 // Optimisations
 compress: true,
 poweredByHeader: false,

 // Support expérimental (optionnel)
 experimental: {
   optimizePackageImports: ['lucide-react'],
 },
};

module.exports = nextConfig;