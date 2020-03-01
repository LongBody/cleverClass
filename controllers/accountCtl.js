controller.changePassword = async function(passwordInfo) {
    let oldPassword = passwordInfo.oldPassword;
    let newPassword = passwordInfo.newPassword;
    var user = firebase.auth().currentUser;

    view.setText('password-success', '')
    view.setText('password-error', '')
    view.setText('old-password-error', '')

    view.disable('change-password-btn')

    var user = firebase.auth().currentUser;
    var credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
    );

    await user.reauthenticateWithCredential(credentials).then(async function() {


        await user.updatePassword(newPassword).then(function() {
            view.setText('password-success', 'You have successfully changed the password')
        }).catch(function(error) {
            view.setText('password-error', error.message)
        });


    }).catch(function(error) {
        view.setText("old-password-error", "Password is wrong")
    });
    view.enable('change-password-btn')









}

controller.changeInfo = async function(info) {

    let newName = info.newName;
    view.disable('save-btn')
    await firebase.auth().currentUser.updateProfile({
        displayName: newName,
    })

    view.enable('save-btn')
}



controller.deleteAccount = async function(credential) {

    console.log(credential)

    var user = firebase.auth().currentUser;
    var credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        credential
    );

    await user.reauthenticateWithCredential(credentials).then(async function() {

        await user.delete().then(function() {
            view.showComponents("personal")
        }).catch(function(error) {

        });

    }).catch(function(error) {
        view.setText("delete-account-error", error.message)
    });




}

controller.setupStatus = async function() {

    let result = await firebase
        .firestore()
        .collection('users')
        .get()

    let statusUser = transformDocs(result.docs)

    return statusUser

}

controller.setupData = async function() {

    let result = await firebase
        .firestore()
        .collection('users')
        .get()

    let statusUser = transformDocs(result.docs)

    model.saveDataUser(statusUser)


}