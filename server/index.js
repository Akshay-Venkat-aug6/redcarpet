// Third Party Packages
require('./config/db');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


// Custom Packages
const CredentialsRouter = require('./router/credentialsRouter');
const HomeRouter = require('./router/homeRouter');
const LoanRouter = require('./router/loanRouter');

const PORT = 4000 || process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// set the API link
app.use('/api/', CredentialsRouter);
app.use('/api/', HomeRouter);
app.use('/api/', LoanRouter);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`)
})

module.exports = app