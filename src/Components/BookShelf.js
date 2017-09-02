import React, { Component } from 'react';
import Book from './Book'
class BookShelf extends Component {

    state = {
        books : []
    }

    render(){
        const {books, title} = this.props
        // const filteredBooks = books.filter((book)=>{
        //     return book.shelf === this.props.shelf
        // })
        const filteredBooks = books.filter(book => book.shelf === this.props.shelf);
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {filteredBooks.map((book)=>(
                            <div key={book.id}>
                                <Book book={book} moveBookToShelf={this.props.moveBookToShelf}/>
                            </div> 
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf