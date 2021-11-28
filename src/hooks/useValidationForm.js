import React from 'react';

export function useValidationForm() {
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);


  function handleErrors(event) {
    const {name, value} = event.target;
    setErrors({...errors, [name]: event.target.validationMessage});
    setValues({...values, [name]: value});
    setIsValid(event.target.closest('form').checkValidity());
  }
  return {values, setValues, errors, isValid, handleErrors, setIsValid};
}

