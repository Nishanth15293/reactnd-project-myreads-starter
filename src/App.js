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
    const { allBooks } = this.state
    var bookIndex = allBooks.findIndex((el, index)=>{
      return el.id === book.id
    });

    if(bookIndex === -1){
      const newBook = Object.assign({}, book);
      newBook.shelf = shelf;
      allBooks.push(newBook);
    }else{
      allBooks[bookIndex] = book;
      allBooks[bookIndex].shelf = shelf;
    }

    BooksAPI.update(book, shelf).then((shelves) => {
      // this.setState({allBooks: allBooks.push(book)});
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
