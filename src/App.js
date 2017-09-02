import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Dashboard from './Components/Dashboard'
import SearchPage from './Components/SearchPage'


class BooksApp extends React.Component {
  state = {
    showSearchPage: true,
    allBooks: [],
    searchedBooks:[]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books)=> {
        this.setState({allBooks: books})
    })
  }

  moveBookToShelf = (book, shelf)=> {
    const newBook = {...book, shelf };
    const allBooks = this.state.allBooks.filter(v => v.id !== book.id).concat([newBook])

    BooksAPI.update(book, shelf).then((shelves) => {
      this.setState({allBooks});
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" 
          render={(history)=> (
            <Dashboard  allBooks={this.state.allBooks} 
                        moveBookToShelf={this.moveBookToShelf}
            />
          )}
        />
        <Route exact path="/search" 
          render={(history)=> (
            <SearchPage   searchedBooks={this.state.searchedBooks} 
                          moveBookToShelf={this.moveBookToShelf}
                          myBooks={this.state.allBooks}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
