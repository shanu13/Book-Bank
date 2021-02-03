let deleteItems  = document.querySelectorAll('#delete') ;
const updateItem = document.querySelector('#update') 


 deleteItems.forEach(deleteItem => deleteItem.addEventListener('click', (e)=> {
                    console.log('clicked')
                    let url = `http://localhost:3000/library/${deleteItem.dataset.bookid}`
                    console.log(url);
                
                        fetch(url,{
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: null
                            })
                            .then(response => { 
                                return response.json()
                            })
                            .then(data => {
                                console.log(data)
                                window.location.href = data.redirect
                            })  
                            .catch(err => {
                                console.log(err)
                            })
    
            
    })
 )
 

// updateItem.addEventListener('submit',(event)=> {

// })