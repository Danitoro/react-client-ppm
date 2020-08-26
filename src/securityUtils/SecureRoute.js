import React, { Component } from 'react'
import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux" 
import PropTypes from "prop-types"

{/*this import allow us to connect to our state for knowing wether or not an user is logged in*/}

//This method is for redirecting to login if the user has not a valid token which means wether or not the person is authenticated, 
//if true: load the component if not redirect to login, for example somebody is trying to access to /dashboard without authentication user process done previously 
const SecuredRoute = ({component:Component, security, ...otherProps}) => (
    <Route 
    {...otherProps} 
        render = {props => 
            security.validToken === true?(
                <Component {...props}/>
            ) : (
            <Redirect to="/login"/>
            )
        }
    />
);

SecuredRoute.propTypes = {
    security: PropTypes.object.isRequired   
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps)(SecuredRoute)
