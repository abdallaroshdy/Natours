const mongoose = require('mongoose');

const dotEnv = require('dotenv');

dotEnv.config();

const app = require('./app');



// console.log('kWFHuhsdKWMMC');

// const w = 0
// w = 90

app.listen(process.env.PORT, () => {
  console.log('server run successfully');
});

mongoose.connect(process.env.DB).then(() => {
  console.log('DataBase Connected successfully');
});
