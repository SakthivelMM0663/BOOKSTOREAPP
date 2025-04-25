const cds = require('@sap/cds');


module.exports = cds.service.impl((srv)=>{

srv.before('CREATE','Books',async (req)=>{
 // Get the bookname from the request
 //Check whether that book name is present already in the books table or not
 //If present, then throw error
 //If not present then create

    let currentBookName = req.data.book_name;

    let dataPresent = await SELECT.from('amazon_Books').where({book_name:currentBookName});

    if(dataPresent.length>0){
        req.reject(500,'Book is already present in db');
    }

   
});

srv.after('CREATE','Books',async (data,req)=>{
console.log("Entered After");
  payloadForLogs = {
    "log_message":`Book with name ${data.book_name} created Successfully`
 }

 let bookLogs = await INSERT.into('amazon_Logs').entries(payloadForLogs);
 console.log(bookLogs)
})


srv.on('CREATE','BooksAndAuthors',async (req)=>{
  console.log("Entered");
  let data = req.data.book_id;
  let dataFromBTP = await SELECT.from('amazon_Books').where({book_id:data});

  let res = {
    book_id : dataFromBTP[0].BOOK_ID,
    book_name : dataFromBTP[0].BOOK_NAME,
    AuthorName : "Sakthivel"
  }
  
  req.reply(res);
})
});