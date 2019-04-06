import React from 'react';
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie, updateMovie} from "../services/movieService";
import Joi from 'joi-browser';
import Form from './common/form';

class MovieForm extends Form {

    state = {
        data: {
            _id: "",
            title: "", 
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        errors: {},
        genres: []
    };

    async populateGenres() {
        const {data: genres} = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id;
            if (movieId === "new") return;
            
            const {data: movie} = await getMovie(movieId);
            this.setState({ data: this.mapToViewModel(movie) });
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
            genreId: movie.genre._id
        }
    }

    schema = {
        _id: Joi.string()
            .optional()
            .allow(''),
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Number in Stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .max(10)
            .label("Daily Rental Rate")
    };

    doSumbit = async () => {
        await saveMovie(this.state.data);
        this.props.history.push("/movies");
    };

    render() {
        const { match, history } = this.props;
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("_id", "_id", "hidden")}
                    {this.renderInput("title", "Title")}
                    {this.renderSelect("genreId", "Genre", this.state.genres) }
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;
