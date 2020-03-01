controller.facebookSignIn = async function(uid) {


    await admin.auth().updateUser(uid, {
            emailVerified: true,
        })
        .then(async function(userRecord) {
            console.log("ok");
        })
        .catch(function(error) {
            console.log(error);
        });

}