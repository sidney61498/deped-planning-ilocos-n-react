import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    onChange(e) {
        console.log(e.target.name);
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="login">
                <div className="container">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">DepEd</h1>
                        <p className="lead text-center">
                            Ilocos Norte - Planning
                        </p>
                        <div className="card">
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <TextFieldGroup
                                        placeholder="Username"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChange}
                                        error={errors.username}
                                    />
                                    <TextFieldGroup
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        error={errors.password}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary btn-block mt-4"
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);
