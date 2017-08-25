import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import Book from './Book'

class Dashboard extends Component {
    constructor(){
        super();
    }

    render(){
        const { allBooks } = this.props
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <BookShelf title="Currently Reading" moveBookToShelf={this.props.moveBookToShelf} books={allBooks} shelf="currentlyReading" />
                    <BookShelf title="Want To Read" moveBookToShelf={this.props.moveBookToShelf} books={allBooks} shelf="wantToRead" />
                    <BookShelf title="Read" moveBookToShelf={this.props.moveBookToShelf} books={allBooks} shelf="read" />
                </div>
                </div>
                <div className="open-search">
                <Link to="/search" />
                </div>
            </div>
        )
    }
}

export default Dashboard