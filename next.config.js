const path = require('path')

const searchParams = new URLSearchParams({
  client_id: process.env.SPOTIFY_CLIENT_ID,
  redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  scope: ["user-top-read", "user-library-read", "user-read-recently-played"].join("%20"),
  response_type: "code",
  show_dialog: "true"
})

const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/spotify',
        destination: `https://accounts.spotify.com/authorize?${searchParams.toString()}`,
        permanent: false,
        basePath: false
      },
      {
        source: '/privacy-policy',
        destination: `/privacypolicy.html`,
        permanent: false,
        basePath: false
      },
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
