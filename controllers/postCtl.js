controller.listPost = async function() {

    let result = await firebase
        .firestore()
        .collection('posts')
        .get()

    let posts = transformDocs(result.docs)

    model.saveListPosts(posts)


}
controller.addNewPost = async function(postContent) {
    let content = postContent.content;
    let image = postContent.image;
    let currentEmail = firebase.auth().currentUser.email


    let data = {
        content: content,
        image: image,
        emailPost: currentEmail,
        createAt: new Date().toISOString()
    }

    await firebase.firestore().collection('posts').add(data)


}
controller.setupPostChange = function() {
    let currentEmail = firebase.auth().currentUser.email
    let isFirstRun = true

    firebase.firestore().collection('posts').where('emailPost', '==', currentEmail).onSnapshot(function(snapshot) {
        if (isFirstRun) {
            isFirstRun = false
            return
        }
        let docChanges = snapshot.docChanges()
        console.log(docChanges)
        for (docChange of docChanges) {
            console.log(docChanges)
            console.log(docChange.type)

            if (docChange.type === "added") {
                let postChange = transformDoc(docChange.doc)
                console.log(postChange)
                model.saveListPosts(postChange)
                view.showNewPosts(postChange)
            }
        }

    })
}




async function uploadPostImage(file) {
    let fileName = file.name;
    console.log(fileName)
    let filePath = `postImage/${fileName}`;
    let fileRef = firebase.storage().ref().child(filePath)

    await fileRef.put(file)
    let photoURL = getFileURl(fileRef)
    return photoURL

}


function getFileURl(fileRef) {
    return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}?alt=media`

}