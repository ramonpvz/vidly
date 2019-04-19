import React, { Component } from 'react';
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from '../components/common/like';
import Table from './common/table';

class MoviesTable extends Component {

    columns = [
        { 
            key:"",
            path: 'title', 
            label: 'Title', 
            content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        },
        { key:"", path: 'genre.name', label: 'Genre'},
        { key:"", path: 'numberInStock', label: 'Stock'},
        { key:"", path: 'dailyRentalRate', label: 'Rate'},
        {
            key: "like", 
            content: movie => (
                <Like liked={movie.liked} onLikeToggle={() => this.props.onLike(movie)} />
            )
        }
    ]

    deleteCol = {
        key: "delete",
        content: movie => (
            <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger sm">Delete</button>
        )
    }

    constructor() {
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin && this.columns.filter(c => { return c.key == "delete"}).length == 0) {
            this.columns.push(this.deleteCol);
        }
    }

    render() {
        const { movies, onSort, sortColumn } = this.props;
        return (
            <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={movies} />
        );
    }
}
 
export default MoviesTable;