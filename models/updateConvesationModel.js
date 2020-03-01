model.updateConversation = function(conversation) {
    if (model.currentConversation && model.currentConversation.id == conversation.id) {
        model.saveCurrentConversation(conversation)
    }
    let existedIndex = model.conversations.findIndex(function(element) {
        return element.id == conversation.id
    })
    if (existedIndex >= 0) {
        model.conversations[existedIndex] = conversation
            // model.conversation.splice(existedIndex,1,conversation)
    } else {
        model.conversations.push(conversation)
    }
}

model.updatePost = function(conversation) {

    model.saveListPosts(conversation)
    console.log(model.listPosts)

    // let existedIndex = model.saveListPosts.findIndex(function(element) {
    //     return element.id == conversation.id
    // })
    // if (existedIndex >= 0) {
    //     model.saveListPosts[existedIndex] = conversation
    //         // model.conversation.splice(existedIndex,1,conversation)
    // } else {
    //     model.saveListPosts.push(conversation)
    // }

}