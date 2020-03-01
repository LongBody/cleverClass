model.updateClassroom = function (classroom) {
    console.log('update')
    let existedIndex = model.classrooms.findIndex(function (element) {
        return element.id = classroom.id
    })
    if (existedIndex >= 0) {
        model.classrooms[existedIndex] = classroom
    } else {
        model.classrooms.push(classroom)
    }
    if(model.currentClassroom && model.currentClassroom.id == classroom.id) {
        model.saveCurrentClassroom(classroom)
    }
}