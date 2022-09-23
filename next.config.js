const path = require('path')

const searchParams = new URLSearchParams({
  client_id: process.env.SPOTIFY_CLIENT_ID,
  redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  scope: ["user-top-read", "user-library-read"].join("%20"),
  response_type: "code",
  show_dialog: "true"
})

const nextConfig = {
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
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
