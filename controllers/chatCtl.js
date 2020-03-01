controller.loadConversations = async function() {
    let currentEmail = firebase.auth().currentUser.email
    let result = await firebase
        .firestore()
        .collection('conversations')
        .where('users', 'array-contains', currentEmail)
        .get()

    let conversations = transformDocs(result.docs)

    model.saveConversations(conversations)
    if (conversations.length) {
        let currentConversation = conversations[0]
        model.saveCurrentConversation(currentConversation)
    }
}

controller.loadNewPost = async function() {
    let currentEmail = firebase.auth().currentUser.email
    let result = await firebase
        .firestore()
        .collection('posts')
        .where('emailPost', 'array-contains', currentEmail)
        .get()

    let posts = transformDocs(result.docs)

    model.saveListPosts(posts)
    if (posts.length) {
        let newPost = posts[0]
        model.saveListJustPost(currentConversation)
    }
}



controller.setupDatabaseChange = function() {
    let currentEmail = firebase.auth().currentUser.email
    let isFirstRun = true

    firebase.firestore().collection('conversations').where('users', 'array-contains', currentEmail).onSnapshot(function(snapshot) {
        if (isFirstRun) {
            isFirstRun = false
            return
        }
        let docChanges = snapshot.docChanges()
        for (docChange of docChanges) {
            if (docChange.type == "modified") {
                let conversationChange = transformDoc(docChange.doc)
                model.updateConversation(conversationChange)
                view.showCurrentConversation()

            }
            if (docChanges.type == 'added') {
                let conversationChange = transformDoc(docChange.doc)
                model.updateConversation(conversationChange)
                view.showListConversation()
            }
        }

    })
}

controller.updateNewMessage = function(conversationId, message) {
    return firebase.firestore().collection('conversations').doc(conversationId).update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    })
}
controller.loadListUserStatus = async function() {
    let currentEmail = firebase.auth().currentUser.email
    let result = await firebase
        .firestore()
        .collection('users')
        .get()

    let listUserStatus = transformDocs(result.docs)
    model.saveListUserStatus(listUserStatus)

    if (listUserStatus.length) {
        listUserStatus.map(user => {
            if (currentEmail === user.email) {
                let currentUserId = user.id
                model.saveCurrentUserId(currentUserId)
            }
        })
    }

}



controller.validateEmailExists = async function(email) {
    try {
        let signInMethod = await firebase.auth().fetchSignInMethodsForEmail(email)
        return signInMethod.length > 0
    } catch (error) {
        return false
    }

}



controller.addConversation = function(conversation) {
    return firebase
        .firestore()
        .collection('conversations')
        .add(conversation)
}