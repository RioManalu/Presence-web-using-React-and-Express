const express = require('express');
const cors = require('cors');


const sequelize = require('./config/dbConfig')
sequelize.sync().then( () => console.log('Database ready'))


// buat endpoint
const userEndPoint = require('./routes/users')
const absensiEndPoint = require('./routes/absensi')


const app = express();
app.use(express.json());
app.use(cors());


// panggil endpoint
app.use('/api/v1/users', userEndPoint)
app.use('/api/v1/absensi', absensiEndPoint)



// jalanin servernya di port 3001
app.listen(3001, ()=> {
    console.log('Server is running on port 3001');
});
