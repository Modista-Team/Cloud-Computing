import Hapi from "@hapi/hapi";

//routes
import routes from "./routes.js";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.state('token', {
    ttl: null, // Session cookie
    isSecure: process.env.NODE_ENV === 'production',
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false,
    strictHeader: true
  });

  await server.start();

  server.route(routes);
  console.log(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
