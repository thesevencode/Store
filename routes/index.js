module.exports = async function (app) {

    const clientRoutes = require('../routes/client')

    
    app.use('/api/client', await clientRoutes())
}