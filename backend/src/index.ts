import app from "./app.ts";
import config from "./utils/config.ts";


const PORT = config.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});