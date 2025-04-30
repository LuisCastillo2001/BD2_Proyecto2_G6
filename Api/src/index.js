const express = require('express');
const app = express();
const routes = require('./routes/routes');
const { connectDB } = require('./db/mongo');

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
