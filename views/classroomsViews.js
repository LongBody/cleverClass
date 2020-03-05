view.showListClassrooms = function() {
    console.log("dfkdng")
    if (model.classrooms) {
        let classrooms = model.classrooms
        let classList = document.getElementById('classList')
        let html = classList.innerHTML
        for (let classroom of classrooms) {
            let { decription, teacher, id: classroomId } = classroom
            let courseName = decription.courseName
            html += `
            <div class="class-item">
                <span id="delete${classroomId}" class="deleteClassroom close" style="cursor :pointer" aria-hidden="true">&times;</span>
                <div id="${classroomId}" class="class-item-content">
                    ${courseName}
                    <p>Giáo viên: ${teacher}</p>
                </div>
            </div>`
        }
        classList.innerHTML = html

        for (let classroom of classrooms) {
            let classroomId = classroom.id
            let classroomCard = document.getElementById(classroomId)
            let deleteClassroom = document.getElementById(`delete${classroomId}`)
            classroomCard.onclick = async function() {
                await model.saveCurrentClassroom(classroom)
                view.showComponents('classroom')
            }

            deleteClassroom.onclick = function() {
                console.log('onclick')
                controller.deleteClassroom(classroomId)
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
                <li id="lesson-${index}" class="learn-outline-item d-flex">
                    <span>Bài ${index}: </span>
                    <span id="lessonName${index}" class="lesson-name mr-auto"> ${lesson.lessonName}</span>
                    <i class="edit-lesson fas fa-pencil-alt p-2" data-toggle="modal" data-target="#editClassModal"></i>
                    <i class="delete-lesson far fa-trash-alt" data-toggle="modal" data-target="#deleteClassModal"></i>
                </li>
                `
            index++
        }
        document.getElementById('lessons').innerHTML = lessonsHTML
        let deleteLessonBtn = document.getElementById('delete-lesson-btn')
        let editLessonBtn = document.getElementById('edit-lesson-btn')
        for (let i = 1; i < index; i++){

            let editLesson = document.querySelector(`#lesson-${i} > .edit-lesson`)
            editLesson.onclick = function(){
                let lessonName = document.querySelector(`#lesson-${i} > .lesson-name`)
                let editLessonNameInput = document.getElementById('editLessonNameInput')
                editLessonNameInput.value = lessonName.innerText
                editLessonBtn.onclick = function(){
                    controller.editLesson(editLessonNameInput.value, lessonName.id)
                    $('#editClassModal').modal('hide')
                }
            }

            let deleteLesson =  document.querySelector(`#lesson-${i} > .delete-lesson`)
            deleteLesson.onclick = function(){
                let lesson = document.querySelector(`#lesson-${i}`)
                deleteLessonBtn.onclick = function(){
                    controller.deleteLesson(lesson.id)
                    $('#deleteClassModal').modal('hide')
                }
            }
        }
        
        
    }
}

view.loadEditInfoClassroomForm = function(editInfoForm) {
    let decription = model.currentClassroom.decription
    editInfoForm.targetCourse.value = decription.courseTarget
    editInfoForm.numberLesson.value = decription.courseTime.numberOfLesson
    editInfoForm.timeStart.value = decription.courseTime.start
    editInfoForm.timeEnd.value = decription.courseTime.end
}

function deleteLessonClickHandler(lessonId){
    console.log(lessonId.innerHTML)
}