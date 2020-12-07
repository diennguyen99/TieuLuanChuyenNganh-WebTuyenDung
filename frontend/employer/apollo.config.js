module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "ute-recruitment-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
