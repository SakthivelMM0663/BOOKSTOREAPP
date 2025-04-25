using {amazon as my} from '../db/data-model';


service AmazonWebServices{
    entity Books as projection on my.Books;
    entity Authors as projection on my.Authors;
    entity Logs as projection on my.Logs;


    @cds.persistence.skip
    entity BooksAndAuthors{
        key book_id : String;
            book_name : String;
            AuthorName : String;
    }
}

