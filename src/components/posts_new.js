import React, {Component} from 'react'
import { Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {createPost} from "../actions/index";

class PostsNew extends Component {
    renderField(field) {
        const {meta: {touched, error} }  = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    type="text"
                    className="form-control"
                    {...field.input}/>
                <div className="text-help">
                    {touched ? error : ''}
                </div>

            </div>
        )
    }

    onSubmit(values) {

        this.props.createPost(values, () => {
            this.props.history.push('/')
        })
    }

    render() {
        const { handleSubmit} = this.props

    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
                label = "Title for Post"
                name="title"
                component={this.renderField}
            />
            <Field
                label = "Categories"
                name="categories"
                component={this.renderField}
            />
            <Field
                label = "Post Content"
                name="content"
                component={this.renderField}
            />
            <button type="submit" className="btn btn-primary"> Submit</button>
            <Link to='/' className="btn btn-danger" >Cancel </Link>
        </form>
    )
}
}

function validate(values) {
    const error = {}
    //Validate the input from 'values'


    //if errors has any properties, redux form assumes form is invalid
    if (!values.title || values.title.length < 3) {
        error.title = "Enter a title"
    }

    if(!values.categories) {
        error.categories = "Enter some categories"
    }

    if(!values.content) {
        error.content = "Enter some content please"
    }
    return error
}

export default reduxForm({
    validate,
    form : 'PostsNewForm'
})(
    connect(null,{ createPost })(PostsNew)
)

