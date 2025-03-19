const express = require('express');
const app = express();
const { NotFound, globalError } = require('./config/init')


const connectDB = require('./db/connection')
connectDB()

app.use(express.json({ limit: "50mb" }));
app.timeout = 120000;
const cors = require('cors')
const { createProxyMiddleware } = require("http-proxy-middleware");


const config = require('./config/index')

app.use(
    "/mongo",
    createProxyMiddleware({
      target:config.MONGODB_URI, 
      changeOrigin: true,
      pathRewrite: { "^/mongo": "" },
      secure: true,
    })
  );
  

app.use(cors())
app.get('/',(req,res)=>{
    res.send("Welcome in Ai fetness coach ")
})
// const swaggerUi = require('swagger-ui-express');
// const combinedSwaggerDoc = require('./swagger/index');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwaggerDoc));


const authRouter = require('./api/routes/auth')
const exerciseRouter = require('./api/routes/exercises.route')
const profileRouter = require('./api/routes/profile')
const aiPlanRouter = require('./api/routes/aiRecommendation')
const chatRoutr = require('./api/routes/chat.route')



app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/ai', aiPlanRouter)
app.use('/exercises', exerciseRouter)
app.use('/chat', chatRoutr)

app.use(NotFound);

app.use(globalError);


module.exports = app;


