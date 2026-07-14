import { app } from "../api/app";

const PORT = 3000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
