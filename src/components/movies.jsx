import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { toast } from "react-toastify";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { sort } from "../utils/sort";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "../components/moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    currentGenre: null,
    sortColumn: {path: 'title', order: 'asc'}
  };

  async componentDidMount() {
    const {data: genresData} = await getGenres();
    const {data: moviesData} = await getMovies();
    const genres = [{_id : '', name : 'All movies'},  ...genresData];
    this.setState({ movies: moviesData, genres: genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id); //Optimistic delete
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      console.log("Exception when deleting...");
      if (ex.response && ex.response.status == 404)
        toast.error('This movie has already been deleted.');
      this.setState({ originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page }); // This causes a new rendering
  };

  handleGenreSelect = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleAdd = movie => {
    this.state.movies.push(movie);
  }

  handleSort = sortColumn => {
    this.setState({sortColumn});
  }

  handleNewMovie = () => {
    this.props.history.push({
        pathname: '/movies/new'
      }
    );
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      currentGenre
    } = this.state;
    const filtered = currentGenre && currentGenre._id
    ? allMovies.filter(m => m.genre._id === currentGenre._id)
    : allMovies;
    const sorted = sort(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return {totalCount: filtered.length, data: movies};
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      genres,
      currentGenre
    } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genres={genres}
            onItemSelect={this.handleGenreSelect}
            currentGenre={currentGenre}
          />
        </div>
        <div>
          <button onClick={this.handleNewMovie} className="btn btn-primary">
            New Movie
          </button>
          <p>There are {totalCount} movies in the database </p>
          <MoviesTable 
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
