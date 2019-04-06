import React from 'react';
import { getGenres } from "../services/genreService";
import {saveMovie} from "../services/movieService";
import Joi from 'joi-browser';
import Form from './common/form';

class MovieForm extends Form {

    state = {
        data: {
            title: "", 
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        errors: {},
        genres: []
    };

    async componentDidMount() {
        const {data: genres} = await getGenres();
        this.setState({ genres });
    }

    schema = {
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

    doSumbit = e => {
        console.log("#Title: " + this.state.data.title);
        console.log("#Genre: " + this.state.data.genreId);
        console.log("#NumberInStock: " + this.state.data.numberInStock);
        console.log("#Rate: " + this.state.data.dailyRentalRate);
        saveMovie(this.state.data);
        console.log("Submitted:");
    };

    render() {
        const { match, history } = this.props;
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
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
