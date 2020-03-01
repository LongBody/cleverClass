controller.register = async function(registerInfo) {
    let email = registerInfo.email
    let password = registerInfo.password
    let displayName = registerInfo.name
    let data = {
        displayName: displayName,
        email: email,
        photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'
    }
    view.setText('register-success', '')
    view.setText('register-error', '')
    view.disable('register-btn')

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        await firebase.firestore().collection('users').add(data)
        await firebase.auth().currentUser.sendEmailVerification()

        await view.setText('register-success', 'An verification email has been sended to your email address!')
        alert("Register Successfully:An verification email has been sended to your email address!")
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        await firebase.auth().currentUser.updateProfile({
            displayName: displayName
        })


    } catch (err) {
        view.setText('register-error', err.message)
    }
    await view.showTap('sign up')


    view.enable('register-btn')

}

controller.logIn = async function(logInInfo) {
    let email = logInInfo.email
    let password = logInInfo.password

    try {
        let result = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (!result.user || !result.user.emailVerified) {
            throw new Error('User must verify email!')
        }
        $('body').css('padding-right', '0px')

    } catch (err) {
        view.setText('log-in-error', err.message)
    }
}