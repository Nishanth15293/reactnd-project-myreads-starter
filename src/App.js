import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Components/Book'
import Dashboard from './Components/Dashboard'
import SearchPage from './Components/SearchPage'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    allBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books)=> {
        console.log(books);
        this.setState({allBooks: books})
    })
  }

  moveBookToShelf = (book, shelf)=> {
    const { allBooks } = this.state
    BooksAPI.update(book, shelf).then((shelves) => {
      // this.setState({allBooks: allBooks.push(book)});
      var bookIndex = allBooks.findIndex((el, index)=>{
        return el.id == book.id
      });

      if(bookIndex == -1){

      }else{
        allBooks[bookIndex] = book;
      }

      this.setState({allBooks});
    })
  }

  onSearch = (query, maxResults)=> {
    BooksAPI.search(query, 20).then((books)=> {
      this.setState({allBooks: books});
    })
  }
  

  render() {
    return (
      <div className="app">
        <Route exact path="/" 
          render={(history)=> (
            <Dashboard  allBooks={this.state.allBooks} moveBookToShelf={this.moveBookToShelf}/>
          )}
        />
        <Route exact path="/search" 
          render={(history)=> (
            <SearchPage   allBooks={this.state.allBooks} 
                          moveBookToShelf={this.moveBookToShelf}
                          onSearch={this.onSearch} />
          )}
        />

      </div>
    )
  }
}

export default BooksApp
