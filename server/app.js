const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb' }));

const port = 8080;
app.listen(port, () => {
  console.log(`server start at port ${port}`);
});