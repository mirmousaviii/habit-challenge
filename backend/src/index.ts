import app from "@core/app";
import { config } from "@core/config";
import { setupSwagger } from "swagger/swagger";

const PORT = config.port;

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  console.log(`API documentation is available at http://localhost:${PORT}/api-docs`);
  console.log(`API is available at http://localhost:${PORT}/api/v1`);
});
