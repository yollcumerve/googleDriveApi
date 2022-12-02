const app = require('express')();
const PORT = 8080 || process.env.PORT


app.listen(PORT, () => {
    console.log('---------------')
    console.log(`Backend running on port :${PORT}`)
    console.log('---------------')
})