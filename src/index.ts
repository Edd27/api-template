import "./config/env";
import { server } from "./config/http";

function bootstrap() {
  const PORT = process.env.PORT || 3000;

  server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}

bootstrap();
