const express = require('express')

const router = express.Router();

const bookController = require('../controllers/book');

router.get('/',bookController.getHome);

router.get('/library',bookController.getBooks);

router.get('/addbook',bookController.getAddbook);

router.post('/addbook',bookController.postAddbook);

router.get('/update/:bookId',bookController.GetUpdate)

router.use('/update', (req,res,next)=> {
    req.method = 'PUT'
    next()
})

router.put('/update',bookController.PutUpdate)

router.delete('/library/:bookId',bookController.DeleteBook);    


module.exports = router;