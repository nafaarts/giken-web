module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/shipment",
        permanent: true,
      },
    ];
  },
};
