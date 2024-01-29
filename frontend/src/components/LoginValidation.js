export default function validation(values) {
    let error = {}; 

    if (values.password === "") {
        error.password = "password should not be empty"; 
    }
    return error; 
}