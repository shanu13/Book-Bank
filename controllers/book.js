const Book = require('../models/book');

exports.getHome = (req,res,next) => {
    res.status(200).render('home',{
        pageTitle : 'Book Bank'
    })
}

exports.getBooks = (req,res,next) => {
    Book.fetchAll(books => {
        res.status(200).render('library',{
            pageTitle : 'Library',
            Allbook : books
        })
    })
}

exports.getAddbook = (req,res,next) => {
    res.status(200).render('addbook', {
        pageTitle : 'Add Book',
        update : false
        // csrfToken : req.csrfToken()
    })
}

exports.postAddbook = (req,res,next) => {
    let name = req.body.name;
    name = name.toUpperCase();
    const image = req.files.images;
    const pdf = req.files.pdf

         if(!image){
            res.redirect('/addbook')
            return ;
         }

      const  imageUrl = image[0].path;
      const pdfUrl = pdf[0].path;

         console.log(imageUrl);

     const book = new Book(name, imageUrl,pdfUrl);
      book.save();

    res.status(200).redirect('/library')
       
}

exports.GetUpdate = (req,res,next) => {
    const bookId = req.params.bookId;
    const edit = req.query.edit;
    if(!edit){
        return res.redirect('/library')
    }
    res.status(200).render('addbook',{
        pageTitle : 'Update Book',
        update : true,  
        id: bookId
        
    })
}

exports.PutUpdate = async (req,res,next) => {
    const bookId = req.body.bookId;
    const updateName = req.body.name;
    const updateImage = req.files.images;
    const updatePdf = req.files.pdf;
    const imageUrl = updateImage[0].path;
    const pdfUrl = updatePdf[0].path;
   
    console.log(bookId);
    console.log(updateName);
        Book.update(bookId,updateName,imageUrl,pdfUrl,() => {
            console.log('update success')
            res.redirect('/library');
        });
      
  
}

exports.DeleteBook =  (req,res,next)=>{
    const bookId = req.params.bookId;
    console.log(bookId);
    
        console.log('delete controller')
         Book.Delete(bookId,(result => {
            console.log(result);
            console.log('delete promise')
             res.status(200).json({redirect : '\library'})
         }));
         
    
     
        
       
   
}