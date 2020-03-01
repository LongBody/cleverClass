controller.loadClassroom = async function() {
    //get all classes form firebase
    let currentDisplayName = firebase.auth().currentUser.providerData[0].displayName
    let result = await firebase
        .firestore()
        .collection('Classrooms')
        .where('members', 'array-contains', currentDisplayName)
        .get()
    let classes = transformDocs(result.docs)

    //save classes to model
    model.saveClassrooms(classes)
    if (classes.length > 0) {
        model.saveCurrentClassroom(classes[0])
    }
}

controller.addClassroom = function(classroom) {
    console.log('add firebase')
    return firebase
        .firestore()
        .collection('Classrooms')
        .add(classroom)
}

controller.updateInfoClassroom = function(decription) {
    classroomId = model.currentClassroom.id
    return firebase
        .firestore()
        .collection('Classrooms')
        .doc(classroomId)
        .update({ 'decription': decription })
}

controller.addLesson = function(lesson) {
    classroomId = model.currentClassroom.id
    return firebase
        .firestore()
        .collection('Classrooms')
        .doc(classroomId)
        .update({
            lessons: firebase.firestore.FieldValue.arrayUnion({ lessonName: lesson })
        })
}

controller.addMember = function(userName) {
    classroomId = model.currentClassroom.id
    return firebase
        .firestore()
        .collection('Classrooms')
        .doc(classroomId)
        .update({
            members: firebase.firestore.FieldValue.arrayUnion(userName)
        })
}

controller.changeTeacher = function(userName) {
    classroomId = model.currentClassroom.id
    return firebase
        .firestore()
        .collection('Classrooms')
        .doc(classroomId)
        .update({
            teacher: userName
        })
}

controller.setupDatabaseClassroomChange = function() {
    let currentEmail = firebase.auth().currentUser.email
    let isFirstRun = true
    firebase
        .firestore()
        .collection('Classrooms')
        .where('members', 'array-contains', currentEmail)
        .onSnapshot(function(snapshot) {
            if (isFirstRun) {
                isFirstRun = false
                return
            }
            let docChanges = snapshot.docChanges()
            for (let docChange of docChanges) {
                if (docChange.type == 'added') {
                    let classroomChange = transformDoc(docChange.doc)
                    model.updateClassroom(classroomChange)
                }
                if (docChange.type == 'modified') {
                    let classroomChange = transformDoc(docChange.doc)
                    model.updateClassroom(classroomChange)
                    view.showCurrentClassroom()
                }
            }
        })
}

controller.validateUserNameExists = async function(userName) {
    let result = await firebase.firestore().collection('users').where('displayName', '==', userName).get()
    let users = transformDocs(result.docs)
    if (users.length != 0) {
        return true
    } else {
        return false
    }
}

controller.validateUserNameAdded = function(userName) {
    let members = model.currentClassroom.members
    if (members.find(function(member) {
            return member === userName
        })) {
        return false
    }
    return true
}