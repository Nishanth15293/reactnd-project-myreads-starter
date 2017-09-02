import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
class SearchPage extends Component {

    state = {
        searchedBooks : [],
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() });
        if(query.length === 0){
            this.setState({searchedBooks: []});
        }else{
            this.onSearch(query, 20);
        }
    }

    onSearch = (query, maxResults)=> {
        const { myBooks } = this.props;
        BooksAPI.search(query, 20).then((books)=> {
            if(books && books.length > 1){
                // you first iterate over all books, and store the result at searchedBooks
                const searchedBooks = books.map((book)=> {
                    // lets check if the book already exists
                    const existingBook = myBooks.find(v => v.id === book.id);
                    // if the book exists, lets use the current shelf. otherwise lets set the shelf to "none"
                    book.shelf = !!existingBook ? existingBook.shelf : 'none';
                    // return the mutated (or not) book to "map()"
                    return book;
                })
                // another powerful feature from ES6, shortcut variables
                this.setState({ searchedBooks });
            }
        
        })
      }

    render(){
        const {query} = this.state;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" />
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                        
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchedBooks.length > 0 && this.state.searchedBooks.map((book)=>{
                            return(
                                <div key={book.id}>
                                    <Book book={book} moveBookToShelf={this.props.moveBookToShelf} />
                                </div> 
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage