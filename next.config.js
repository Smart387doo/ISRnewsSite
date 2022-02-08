module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['static.klix.ba', 'www.vecernji.ba', 'cdn.oslobodjenje.ba', 'ba.n1info.com', 'index.ba'],
  },
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
};
