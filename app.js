const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
// const csrf = require('csurf')
// const cookieParser = require('cookie-parser');
// const csrfProtection = csrf({cookie : true});

const filestorage = multer.diskStorage({
    destination : (req,file,cb)=> {
        if(file.fieldname === 'images'){
            cb(null,'./images')
        }else {
            cb(null,'./pdf')
        }
    },
    filename : (req,file,cb) =>  {
        cb(null,file.fieldname + Date.now() + '-' + file.originalname)
    }
})


const filefilter = (req,file,cb) => {
    if(file.fieldname === 'images'){
        if(file.mimetype === 'image/jpg' || 
           file.mimetype === 'image/jpeg' ||
           file.mimetype === 'image/png'
        ){
            cb(null,true)
        }else {
            cb(null,false)
        } 
       }else{
            if(file.mimetype === 'application/pdf'){
                cb(null, true)
            } else {
                cb(null,false)
            }
        }
    }

const app = express();
const bookroutes = require('./routes/book');

app.set('view engine', 'ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended : false}));

app.use(multer (
    {
        storage : filestorage,
        fileFilter : filefilter
    }
).fields([
    {
        name : 'images',
        maxCount : 1
    },
    {
        name : 'pdf',
        maxCount : 1
    }
   ]
  )
);

app.use(express.static(path.join(__dirname,'public/')));
app.use('/images', express.static('images'));
app.use('/pdf', express.static('pdf'));

// app.use(cookieParser());
// app.use(csrfProtection);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });



// app.use((req,res,next) => {
//     res.locals.csrfToken =  req.csrfToken();
//     next();
// })

app.use('/',bookroutes);

app.listen(3000,()=> {
    console.log('connected');
})