import app from "./app";
import { connect } from "./database";
const port = 3001;
connect();
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
