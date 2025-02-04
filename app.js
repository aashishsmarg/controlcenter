import * as imports from  './utils/imports.js'
import routes from './routes/routes.js'  

const __dirname = imports.dirname(imports.fileURLToPath(import.meta.url));
const app = imports.express()
app.use(imports.express.json())
app.use(imports.express.urlencoded({extended : true}))
app.use(imports.express.static(imports.path.join(__dirname,'public')))


app.use(imports.session({
  secret : process.env.session_secret_key,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}))
app.use(imports.express.static(__dirname))
app.use(imports.flash())
app.use(imports.flashMiddleware); 
app.use(imports.cookieParser()); 
app.set('view engine','jade')
app.set('views',imports.path.join(__dirname,'views'))
const port =  process.env.port || 3000
// configurations for securtiy , I something gives error like in some integration and others in production , comment below lines
app.use(imports.cors())
// app.use(imports.helmet.contentSecurityPolicy({directives: {
//   defaultSrc: ["'self'"],
//   frameSrc: ["'self'", process.env.IFrameURL],
//   imgSrc: ["'self'", "*" , "data:"],
//   scriptSrc: ["'self'", "'unsafe-inline'"],  
//   scriptSrcAttr: ["'self'", "'unsafe-inline'"]
// },
// }));
app.use(imports.securtiyMiddleware)
// app.use(imports.devSession.adminSession)
// app.use(imports.devSession.userSession)
app.use('/',routes)
// app.listen(port,er=>er ? console.log(er) : console.log(`server running at http://localhost:${port}`))
const options = {
    key: imports.fs.readFileSync(imports.path.join(`/smargtechnologies.in/privkey1.pem`)),
    cert: imports.fs.readFileSync(imports.path.join(`/smargtechnologies.in/fullchain1.pem`))
  };
  imports.https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS server running on https://localhost:${port}`);
  });