import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
class SearchPage extends Component {
    constructor(){
        super();
    }

    state = {
        allBooks : [],
        searchedBooks: [],
        query: ''
    }

    // componentDidMount() {
    //     BooksAPI.getAll().then((books)=> {
    //         console.log(books);
    //         this.setState({books: books})
    //     })
    // }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    render(){
        const {query} = this.state;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                <Link to="/" className="close-search" />
                <div className="search-books-input-wrapper">
                    {/* 
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                    
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    
                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.props.allBooks.map((book)=>{
                            return(
                                <div key={book.id}>
                                    <Book book={book}/>
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