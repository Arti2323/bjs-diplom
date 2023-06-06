const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, response => {
        if (response.success) {
            // console.log(data)
            // console.log(response)
            // console.log(response.success)
            location.reload();
            return
        } else {
            console.log(response.error);
            userForm.setLoginErrorMessage(response.error);
        }
    })
}

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
            return
        } else {
            console.log(response.error);
            userForm.setRegisterErrorMessage(response.error); 
        }
    })
}
