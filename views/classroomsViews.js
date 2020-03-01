view.showListClassrooms = function() {
    console.log("dfkdng")
    if (model.classrooms) {
        let classrooms = model.classrooms
        let classList = document.getElementById('classList')
        let html = classList.innerHTML
        for (let classroom of classrooms) {
            let { decription, teacher, id: classroomId } = classroom
            let courseName = decription.courseName
            html += `<div id="${classroomId}" class="class-item">
            <div class="class-item-content">
                ${courseName}
                <p>Giáo viên: ${teacher}</p>
            </div>
            </div>`
        }
        classList.innerHTML = html

        for (let classroom of classrooms) {
            let classroomId = classroom.id
            let classroomCard = document.getElementById(classroomId)
            classroomCard.onclick = function() {
                model.saveCurrentClassroom(classroom)
                view.showComponents('classroom')
            }
        }

    }
}
view.showListClassroomsAsideLeft = function() {
    if (model.classrooms) {
        let html = ``
        for (let classroom of model.classrooms) {
            let classroomId = classroom.id
            let courseName = classroom.decription.courseName
            html += `<li id="${classroomId}">${courseName}</li>`
        }
        document.getElementById('my-class-list').innerHTML = html

        for (let classroom of model.classrooms) {
            let classroomId = classroom.id
            let classroomCard = document.getElementById(classroomId)
            classroomCard.onclick = function() {
                model.saveCurrentClassroom(classroom)
                view.showCurrentClassroom()
            }
        }
    }

}
view.showCurrentClassroom = function() {

    if (model.currentClassroom) {
        let { decription, teacher, members, lessons } = model.currentClassroom
        let { courseName, courseTarget, courseTime } = decription
        let { start: courseTimeStart, end: courseTimeEnd, numberOfLesson } = courseTime
        let numberOfStudent = members.length - 1

        //display decription
        document.getElementById('courseName').innerText = courseName
        document.getElementById('courseTarget').innerText = courseTarget
        document.getElementById('teacher').innerText = 'Giáo viên: ' + teacher
        document.getElementById('students').innerText = 'Học viên: ' + numberOfStudent + ' người'
        document.getElementById('time').innerHTML = `
            <h3>Thời gian (${numberOfLesson} buổi):</h3>
            <ul>
                <li>Ngày bắt đầu: ${courseTimeStart}</li>
                <li>Ngày kết thúc: ${courseTimeEnd}</li>
            </ul>
        `
            //display lesson
        let lessonsHTML = ""
        let index = 1
        for (let lesson of lessons) {
            lessonsHTML += `
                <li class="learn-outline-item">
                    Bài ${index}: ${lesson.lessonName}
                </li>
                `
            index++
        }
        document.getElementById('lessons').innerHTML = lessonsHTML
    }
}
view.loadEditInfoClassroomForm = function(editInfoForm) {
    let decription = model.currentClassroom.decription
    editInfoForm.targetCourse.value = decription.courseTarget
    editInfoForm.numberLesson.value = decription.courseTime.numberOfLesson
    editInfoForm.timeStart.value = decription.courseTime.start
    editInfoForm.timeEnd.value = decription.courseTime.end
}