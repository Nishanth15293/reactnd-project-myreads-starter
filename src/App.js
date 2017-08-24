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
  

  render() {
    return (
      <div className="app">
        <Route exact path="/" 
          render={(history)=> (
            <Dashboard  allBooks={this.state.allBooks} />
          )}
        />
        <Route exact path="/search" 
          render={(history)=> (
            <SearchPage   allBooks={this.state.allBooks} />
          )}
        />

      </div>
    )
  }
}

export default BooksApp
