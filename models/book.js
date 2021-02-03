const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data','books.json')

   const findByid = async (bookId) => {
       let bookIndex;
   getBooksfromFile((books) => {
           bookIndex = books.findIndex(book => {
               return book.id == bookId;
           });
       })
    return bookIndex;
}

const getBooksfromFile = (callback) => {
    fs.readFile(p,(err,data)=> {
        if(err){
            callback([]);
        }
        else{
            callback(JSON.parse(data))
        }
    })

}

module.exports = class Book {
   constructor(name,imageUrl,pdfUrl){
       this.id = Date.now();
       this.name = name;
       this.imageUrl = imageUrl;
       this.pdfUrl = pdfUrl;
   }  

   save() {
       getBooksfromFile(books => {
           books.push(this)
           fs.writeFile(p,JSON.stringify(books),err=> {
               console.log(err);
           })
       })
   }

   static  Delete(bookId,cb){
       
       getBooksfromFile(books => {
            new Promise((resolve,reject) => {
                console.log('models', bookId)
               console.log('Deleteing');
                const updatedbooks =  books.filter(book => {
                   return book.id != bookId;
               })
               if(updatedbooks){
                resolve(updatedbooks);
               }else{
                   reject('unable to delete');
               }
               
           })
            .then(books => {
                console.log('delete writing')
                fs.writeFile(p,JSON.stringify(books), (err)=> {
                    if(!err){
                        console.log(err);
                    }
              })
           })
           .then(result => {
            cb(result);
           })
           .catch(err => console.log(err));
           
       })
       return;
   }


   static  update(bookId,name,imageUrl,pdfUrl,cb) {
       let bookIndex;
       
        getBooksfromFile(async (books) => {
            return new Promise((resolve, reject) => {
                bookIndex = books.findIndex(book => book.id == bookId);
                resolve(bookIndex);
            })
            .then(index => {
                console.log(books[index].name)
                books[index].name = name.toString();
                books[index].imageUrl = imageUrl.toString()
                books[index].pdfUrl = pdfUrl.toString()

                return books
            })
            .then(books => {
                fs.writeFile(p,JSON.stringify(books), (err)=> {
                    if(!err){
                        console.log(err);
                    }
                })
            })
            .then( () => cb())
            .catch(err => console.log(err));
        }); 
   }

   static fetchAll(callback){
      getBooksfromFile(callback);    
  }

}