module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.socialverseapp.com/:path*',
      },
    ];
  },
};
