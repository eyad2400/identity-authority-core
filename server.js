const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/person", require("./routes/person.routes"));
app.use("/api/engagement", require("./routes/engagement.routes"));
app.use("/api/staff", require("./routes/staff.routes"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`IAC running on port ${PORT}`);
});
