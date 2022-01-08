const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterInput = (data) => {
    let errors = {}

    //check the email field
    if(isEmpty(data.email)){
        errors.email = 'Email field is required';
    } else if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    //check the password field
    if(isEmpty(data.password)){
        errors.password = 'Password field is required';
    } else if(!Validator.isLength(data.password, {min: 6, max: 150})){
        errors.password = 'Password must be at least 6 characters';
    }

    //check the name field

    if(isEmpty(data.name)){
        errors.name = 'Name field is required';
    } else if(!Validator.isLength(data.name, {min: 2, max: 30})){
        errors.name = 'Name must be at least 2 characters';
    }



    //check the confirm password field
    if(isEmpty(data.confirmPassword)){
        errors.confirmPassword = 'Confirm password field is required';
    } else if(!Validator.equals(data.password, data.confirmPassword)){
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}

module.exports = validateRegisterInput;