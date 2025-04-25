namespace amazon;


entity Books{
    key book_id : String;
        book_name : String;
}

entity Authors{
    key author_id : String;
        author_name : String;
}

entity Logs{
    key log_id : String;
    log_message : String;
}