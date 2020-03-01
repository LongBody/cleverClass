// change passsword
function changeInfoHandler(e) {
    e.preventDefault()

    // get data
    let passwordInfo = {
            oldPassword: changeInfo.oldPassword.value,
            newPassword: changeInfo.newPassword.value,
            confirmPassword: changeInfo.confirmPassword.value
        }
        // validate data
    let validateResult = [
            view.validate('new-password-error', [
                passwordInfo.newPassword, 'Missing password!',
                passwordInfo.newPassword.length >= 6, 'Password length must greater than or equals 6'
            ]),
            view.validate('confirm-password-error', [
                passwordInfo.confirmPassword, 'Missing confirm password!',
                passwordInfo.confirmPassword == passwordInfo.newPassword, 'Password and confirm password not match!'
            ])
        ]
        // submit data
    if (view.allPassed(validateResult)) {
        controller.changePassword(passwordInfo)
    }
}