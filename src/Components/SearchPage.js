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
        this.onSearch(query, 20);
    }

    onSearch = (query, maxResults)=> {
        const { myBooks } = this.props;
        BooksAPI.search(query, 20).then((books)=> {
            if(books && books.length > 1){
                books.map((book)=> {
                    var j=0;
                    for(j; j<myBooks.length; j++){
                        if(book.id === myBooks[j].id){
                            book.shelf = myBooks[j].shelf;
                            break;
                        }
                    }
                })
                this.setState({searchedBooks: books});
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