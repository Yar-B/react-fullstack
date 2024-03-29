const express = require('express')
const userRouter = require('./routes/item.routes')
const cors = require('cors')
const PORT = 3001
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', userRouter)

app.listen(PORT, () => console.log('server started on port ' + PORT))
