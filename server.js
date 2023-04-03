const express = require('express')
const cors = require('cors');
const app = express()
app.use(express.json());
app.use(cors())
const port = 3500
app.use(express.urlencoded({ extended: true }));
const { router } = require('./Routes/AllRoute');
const Db = require('./Db/db')
app.use('/api/v1/', router)
Db()
app.listen(port, () => {
  console.log(`Example app listening on port ${port} `)
}) 