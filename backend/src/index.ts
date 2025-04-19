import app from "./core/app";
import { config } from "./core/config";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
