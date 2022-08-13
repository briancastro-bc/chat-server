import express, { Application } from "express";
import * as http from 'http';

import sio from './io';

async function main(): Promise<void> {

  const app: Application = express();
  const port: number | string = process.env.PORT || 4001;

  const httpServer = http.createServer(app);

  sio.attach(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
      credentials: true,
    },
    cookie: {
      name: "sio_session"
    }
  });

  httpServer.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}

main()
  .then(() => console.log("Startup server"))
  .catch((err: any) => console.error('ERROR:: ',err));