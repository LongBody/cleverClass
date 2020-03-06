const view = {
    currentScreen: null
}
view.showComponents = async function(screenName) {
    view.currentScreen = screenName

    switch (screenName) {
        case 'home':
            {

                let myWeb = document.getElementById('my-web')
                myWeb.innerHTML = components.home

                let form = document.getElementById('register-form')
                form.onsubmit = registerFormSubmitHandler

                let loginForm = document.getElementById('log-in-form')
                loginForm.onsubmit = formSubmitHandler

                // let forgetPassword = document.getElementById("form-forget-password")
                // forgetPassword.onclick = forgetPasswordHandler

                var provider = new firebase.auth.GoogleAuthProvider();
                let googleSignIn = document.getElementById('google-sign-in')
                googleSignIn.onclick = googleSignInHandler

                var providerFacebook = new firebase.auth.FacebookAuthProvider();
                let facebookSignIn = document.getElementById('facebook-sign-in')
                facebookSignIn.onclick = facebookSignInHandler



                // register account 
                function registerFormSubmitHandler(e) {
                    e.preventDefault() // chan su kien form submit mac dinh
                        // get data
                    let registerInfo = {
                            name: form.name.value.trim(),
                            email: form.email.value.trim().toLowerCase(),
                            password: form.password.value,
                            confirmPassword: form.confirmPassword.value
                        }
                        // validate data
                    let validateResult = [
                            view.validate('username-error', [registerInfo.name, 'Misssing Name!']),
                            view.validate('register-email-error', [registerInfo.email, 'Missing email!']),
                            view.validate('register-password-error', [
                                registerInfo.password, 'Missing password!',
                                registerInfo.password.length >= 6, 'Password length must greater than or equals 6'
                            ]),
                            view.validate('confirm-password-error', [
                                registerInfo.confirmPassword, 'Missing confirm password!',
                                registerInfo.confirmPassword == registerInfo.password, 'Password and confirm password not match!'
                            ])
                        ]
                        // submit data
                    if (view.allPassed(validateResult)) {
                        controller.register(registerInfo)
                    }
                }

                // login account

                function formSubmitHandler(e) {
                    e.preventDefault()

                    let logInInfo = {
                        email: loginForm.email.value,
                        password: loginForm.password.value

                    }
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();

                    let validateLoginResult = [
                        view.validate('email-error', [logInInfo.email, 'Missing email!']),
                        view.validate('password-error', [
                            logInInfo.password, 'Missing password!',
                            logInInfo.password.length >= 6, 'Password length must greater than or equals 6!'
                        ])
                    ]

                    if (view.allPassed(validateLoginResult)) {
                        controller.logIn(logInInfo)
                    }

                }

                // sign in with google 
                async function googleSignInHandler() {

                    await firebase.auth().signInWithPopup(provider).then(async function(result) {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;
                        let uid = user.providerData[0].uid
                        console.log(uid)
                        console.log(user.providerData[0].email)
                        await controller.loadListUserStatus();
                        console.log(model.listUserStatus)
                        let dataUser = model.listUserStatus

                        dataUser.map(user => async function(user) {
                                if (user.email == user.providerData[0].email) break;
                                else {
                                    let data = {
                                        displayName: user.providerData[0].displayName,
                                        email: user.providerData[0].email,
                                        photoURL: user.providerData[0].photoURL,
                                        providerId: 'google'
                                    }
                                    await firebase.firestore().collection('users').add(data)

                                }
                            })
                            // console.log(user.providerData[0])
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();


                        admin.auth().updateUser(uid, {
                                email: user.providerData[0].email,
                                emailVerified: true,
                            })
                            .then(function(userRecord) {
                                // See the UserRecord reference doc for the contents of userRecord.
                                console.log('Successfully created new user:', userRecord.uid);
                            })
                            .catch(function(error) {
                                console.log('Error creating new user:', error);
                            });

                        await view.showComponents('personal')


                        // ...
                    }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    });
                }

                // async function forgetPasswordHandler(e) {
                //     e.preventDefault()
                //     let email = forgetPassword.forgetPassword.value
                //     var auth = firebase.auth();

                //     auth.sendPasswordResetEmail(email).then(function() {
                //         alert("Check your email to reset your password")
                //     }).catch(function(error) {
                //         alert(error)
                //     });
                // }

                // sign in with facebook

                firebase.auth().useDeviceLanguage();

                function facebookSignInHandler() {

                    firebase.auth().signInWithPopup(providerFacebook).then(async function(result) {
                        $('body').css('padding-right', '0px')

                        view.showComponents('personal')

                        console.log(result)

                    }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;

                        // ...
                    })
                }



                break
            }

        case 'personal':
            {
                let myWeb = document.getElementById('my-web')
                myWeb.innerHTML = components.navbar + components.personal

                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();



                navbarEvent();

                await controller.loadClassroom()

                view.showListClassrooms();


                //Làm chức năng thêm lớp học
                let addClass = document.getElementById('add-class')
                addClass.onclick = linkClickHandler

                //Xóa lớp học


                let fastChat = document.getElementById('fastChat')
                fastChat.onclick = fastChatHandlerClick

                function linkClickHandler() {
                    view.showComponents('createClassForm')
                }

                function fastChatHandlerClick() {
                    view.showComponents('chats')
                }



                break
            }

        case 'classroom':
            {
                let myWeb = document.getElementById('my-web')
                myWeb.innerHTML = components.navbar + components.classroom

                $("#my-home").click(function() {
                    view.showComponents('personal')
                })

                navbarEvent();

                // console.log(window.location.protocol)
                // console.log(window.location.hostname)

                window.history.back()

                // view.showCurrentClassroom()
                // view.showListClassroomsAsideLeft()

                // thêm thành viên
                let addMember = document.getElementById('add-member')
                addMember.onclick = addMemberClickHandler

                // thêm bài học
                let addLesson = document.getElementById('add-lesson')
                addLesson.onclick = addLessonClickHandler

                // chỉnh sửa thông tin lớp học
                let editInfoForm = document.getElementById('edit-info-form')
                view.loadEditInfoClassroomForm(editInfoForm)
                let editInfoFormBtn = document.getElementById('edit-info-classroom-btn')
                editInfoFormBtn.onclick = editInfoFormSubmitHandler

                // thay đổi giáo viên
                let changeTeacher = document.getElementById('change-teacher')
                changeTeacher.onclick = changeTeacherClickHandler

                controller.setupDatabaseClassroomChange()
                view.showCurrentClassroom()
                view.showListClassroomsAsideLeft()

                function addMemberClickHandler() {
                    let addMemberForm = document.getElementById('add-member-form')
                    if (addMemberForm.style.display == 'none' || addMemberForm.style.display == '') {
                        addMemberForm.style.display = 'block'
                        addMemberForm.onsubmit = async function(e) {
                            e.preventDefault()
                            let userName = addMemberForm.userName.value
                            let userNameExists = await controller.validateUserNameExists(userName)
                            let userNameAdded = await controller.validateUserNameAdded(userName)
                            let result = view.validate('add-member-error', [userName, 'Vui lòng nhập tên', userNameExists, 'Người dùng không tồn tại', userNameAdded, 'Người dùng này đã là thành viên lớp'])
                            if (result) {
                                await controller.addMember(userName)
                                addMemberForm.userName.value = ""
                                alert("Thêm thành viên thành công")
                                view.setText('add-lesson-error', '')
                            }
                        }
                    } else {
                        view.setText('add-lesson-error', '')
                        addMemberForm.style.display = 'none'
                    }

                }

                function addLessonClickHandler() {
                    let addLessonForm = document.getElementById('add-lesson-form')

                    if (addLessonForm.style.display == 'none' || addLessonForm.style.display == '') {
                        addLessonForm.style.display = 'block'
                        addLessonForm.onsubmit = async function(e) {
                            e.preventDefault()
                            let lesson = addLessonForm.lessonName.value.trim()
                            let result = view.validate('add-lesson-error', [lesson, 'Vui lòng nhập tên bài học'])
                            if (result) {
                                await controller.addLesson(lesson)
                                addLessonForm.lessonName.value = ""
                                view.setText('add-lesson-error', '')
                                alert('Thêm bài học thành công')
                            }
                        }
                    } else {
                        view.setText('add-lesson-error', '')
                        addLessonForm.style.display = 'none'
                    }
                }

                function editInfoFormSubmitHandler(e) {
                    e.preventDefault()
                    let courseTarget = editInfoForm.targetCourse.value.trim()
                    let numberOfLesson = editInfoForm.numberLesson.value.trim()
                    let start = editInfoForm.timeStart.value.trim()
                    let end = editInfoForm.timeEnd.value.trim()
                    let courseTime = { end: end, numberOfLesson: numberOfLesson, start: start }
                    let courseName = model.currentClassroom.decription.courseName
                    let decription = { courseName, courseTarget, courseTime }
                    controller.updateInfoClassroom(decription)
                }

                function changeTeacherClickHandler(e) {
                    let changeTeacherForm = document.getElementById('change-teacher-form')

                    if (changeTeacherForm.style.display == 'none' || changeTeacherForm.style.display == '') {
                        changeTeacherForm.style.display = 'block'
                        changeTeacherForm.onsubmit = async function(e) {
                            e.preventDefault()
                            let userName = changeTeacherForm.userName.value.trim()
                            let userNameExists = await controller.validateUserNameExists(userName)

                            let result = view.validate('change-teacher-error', [userName, 'Vui lòng nhập tên', userNameExists, 'Người dùng không tồn tại'])
                            if (result) {
                                await controller.changeTeacher(userName)
                                changeTeacherForm.userName.value = ""
                                alert("Thêm thành viên thành công")
                                view.setText('add-lesson-error', '')
                                changeTeacherForm.value = ""
                                view.setText('change-teacher-error', '')
                            }
                        }
                    } else {
                        view.setText('change-teacher-error', '')
                        changeTeacherForm.style.display = 'none'
                    }
                }

                break;
            }

        case 'lesson':
            {
                let myWeb = document.getElementById('my-web')
                myWeb.innerHTML = components.navbar + components.lesson

                navbarEvent();

                listLesson();

                currentVideo();

                break;
            }

        case 'chats':
            {

                let myWeb = document.getElementById('my-web')
                myWeb.innerHTML = components.navbar + components.chats



                let formAddMessage = document.getElementById('form-add-message')
                formAddMessage.onsubmit = formAddMessageSubmit


                let formAddConversation = document.getElementById('form-add-conversation')
                formAddConversation.onsubmit = formAddConversationSubmit

                let leaveConversation = document.getElementById("leave-conversation-btn")
                leaveConversation.onclick = leaveConversationHandler

                let formAddEmail = document.getElementById('form-add-email')
                formAddEmail.onsubmit = addEmailConversationHandler

                let formAddNewPost = document.getElementById("form-add-new-post");
                formAddNewPost.onsubmit = formAddNewPostHandler

                navbarEventForChats();

                controller.setupDatabaseChange();
                controller.setupPostChange();
                await controller.loadListUserStatus();
                await controller.listPost();
                await controller.setupData();
                let dataUser = model.dataUser
                console.log(model.listPosts)

                await getDataCurrentUserInnnerHtml(dataUser);


                view.showListStatus()

                await controller.loadConversations() // load all conversations and save to model

                view.showCurrentConversation() // read data from model and display to screen
                await view.showListPosts();
                view.showListConversation()

                // await controller.loadNewPost() // load all conversations and save to model
                // console.log(model.conversations)
                // console.log(model.listUserStatus)

                function readURL(input) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = async function(e) {
                            await $('#blah').attr('src', e.target.result).css("display", "block").width(80).height(50)
                            $("#buttonCloseImage").css("display", "block")
                            $("#buttonCloseImage").click(function() {
                                $('#blah').css("display", "none")
                                $('#buttonCloseImage').css("display", "none")
                            })

                        }

                        reader.readAsDataURL(input.files[0]);
                    }
                }
                $("#image").change(function() {
                    readURL(this);
                });

                async function formAddNewPostHandler(e) {
                    e.preventDefault();
                    view.disable('post-btn')
                    let content = formAddNewPost.post.value;
                    let image = formAddNewPost.imagePost.files[0]
                    console.log(content)
                    let imageURL;
                    if (image) {
                        imageURL = await uploadPostImage(image)
                    } else
                        imageURL = ""


                    console.log(imageURL)


                    let postContent = {
                        content: content,
                        image: imageURL
                    }
                    console.log(postContent)

                    await controller.addNewPost(postContent)
                    formAddNewPost.post.value = ''
                    $('#blah').css("display", "none")
                    $('#buttonCloseImage').css("display", "none")
                    view.enable('post-btn')

                }

                async function formAddMessageSubmit(e) {
                    e.preventDefault()
                    let content = formAddMessage.message.value.trim()



                    if (model.currentConversation && content) {

                        view.disable('form-add-message-btn')
                        let message = {
                            content: content,
                            owner: firebase.auth().currentUser.email,
                            createAt: moment().subtract(new Date().toISOString()).calendar()
                        }
                        await controller.updateNewMessage(model.currentConversation.id, message)
                        formAddMessage.message.value = ''
                        view.enable('form-add-message-btn')


                    }
                }
                $("#chat-fullscreen").css("display", "block")

                $("#chat-fullscreen").click(function() {
                    view.showComponents('fullScreenChat')
                })



                async function formAddConversationSubmit(e) {
                    e.preventDefault();

                    let title = formAddConversation.title.value;
                    let friendEmail = formAddConversation.friendEmail.value.trim().toLowerCase();
                    let currentEmail = firebase.auth().currentUser.email;
                    let friendEmailExists = await controller.validateEmailExists(friendEmail)
                    console.log(title)
                    console.log(friendEmail)
                    console.log(friendEmailExists)

                    let validateResult = [
                        view.validate('title-error', [
                            title, 'Missing tittle'
                        ]),

                        view.validate('friend-email-error-conversation', [
                            friendEmail, 'Missing friendEmail',
                            friendEmailExists, 'Friend email do not exists',
                            friendEmail != currentEmail, `Please enter an other person's email `
                        ])

                    ]
                    if (view.allPassed(validateResult)) {
                        let conversation = {
                            users: [currentEmail, friendEmail],
                            messages: [],
                            title: title,
                            createAt: new Date().toISOString()
                        }
                        console.log(conversation)
                        await controller.addConversation(conversation)
                        console.log('added new conversation')

                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        await view.showComponents("chats")

                        formAddConversation.title.value = ""
                        formAddConversation.friendEmail.value = ""
                    }
                    view.enable('form-add-conversation-btn')

                }

                let currentEmail = firebase.auth().currentUser.email
                let currentId = model.currentConversation.id

                async function leaveConversationHandler() {
                    await firebase.firestore().collection('conversations').doc(currentId).update({
                        users: firebase.firestore.FieldValue.arrayRemove(currentEmail),
                    })
                    await location.reload();



                }


                async function addEmailConversationHandler(e) {
                    e.preventDefault();
                    let friendEmail = formAddEmail.emailAdd.value.trim().toLowerCase()

                    let friendEmailExists = await controller.validateEmailExists(friendEmail)
                    let currentEmail = firebase.auth().currentUser.email;

                    let validateResult = [
                        view.validate('friend-email-error', [
                            friendEmail, 'Missing friendEmail',
                            friendEmailExists, 'Friend email do not exists',
                            friendEmail != currentEmail, `Please enter an other person's email `
                        ])


                    ]

                    if (view.allPassed(validateResult)) {

                        await firebase.firestore().collection('conversations').doc(currentId).update({
                            users: firebase.firestore.FieldValue.arrayUnion(friendEmail),
                        })

                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        await view.showComponents("chats")
                    }


                    $(document).ready(function() {
                        $('#form-search').keyup(function() {

                            // Search text
                            var text = $(this).val();
                            console.log(text)

                            // Hide all content class element
                            $('.personal').hide();

                            // Search and show
                            $('.personal:contains("' + text + '")').show();

                        });
                    });







                }

                break
            }

        case 'loading':
            {

                let myWeb = document.getElementById('my-web')
                myWeb.innerHTML = components.loading

                break
            }

        case 'createClassForm':
            {
                let myWeb = document.getElementById('my-web')
                myWeb.innerHTML = components.createClassForm

                let closeBtn = document.getElementById('closeForm')
                closeBtn.onclick = buttonCloseHandler

                let createClassForm = document.getElementById('create-class-form')
                createClassForm.onsubmit = createClassFormHandler

                function buttonCloseHandler() {
                    view.showComponents('personal')
                }
                async function createClassFormHandler(e) {
                    e.preventDefault()
                    view.disable('form-add-class-btn')

                    let courseName = createClassForm.nameClass.value.trim()
                    let courseTarget = createClassForm.targetCourse.value.trim()
                    let owner = await firebase.auth().currentUser.providerData[0].displayName
                    let numberOfLesson = createClassForm.numberLesson.value.trim()
                    let start = createClassForm.timeStart.value.trim()
                    let end = createClassForm.timeEnd.value.trim()
                    let validateResult = [view.validate('course-name-error', [courseName, '* Vui lòng điền tên lớp học'])]
                    if (view.allPassed(validateResult)) {

                        let courseTime = { end: end, numberOfLesson: numberOfLesson, start: start }

                        let decription = { courseName: courseName, courseTarget: courseTarget, courseTime: courseTime }
                        let classroom = {
                            decription: decription,
                            lessons: [],
                            members: [owner],
                            teacher: owner
                        }
                        await controller.addClassroom(classroom)
                        controller.setupDatabaseClassroomChange()
                        view.showComponents('personal')
                    } else {
                        view.enable('form-add-class-btn')
                    }
                }

                break;
            }

        case 'account':
            {
                let myWeb = document.getElementById('my-web')
                myWeb.innerHTML = components.navbar + components.account

                navbarEvent();

                var currentEmail = firebase.auth().currentUser.email;
                let userName = firebase.auth().currentUser.providerData[0].displayName

                // set data for displayName and email of account setting
                $("#name").val(userName)

                await controller.loadListUserStatus();
                await controller.setupData();
                let dataUser = model.dataUser

                await getDataCurrentUser(dataUser)

                let id = model.currentUserId
                console.log(id)


                // let data = await controller.setupStatus();
                // console.log(data)

                let deleteForEmail = document.getElementById("delete-for-email")
                deleteForEmail.innerHTML = `Email :` + currentEmail


                let changeInfo = document.getElementById("change-info-form")
                changeInfo.onsubmit = changeInfoHandler

                let deleteAccount = document.getElementById("delete-account")
                deleteAccount.onsubmit = deleteAccountHandler

                let formChangeNameOrEmail = document.getElementById("change-info-email-name");
                formChangeNameOrEmail.onsubmit = formChangeNameOrEmailHandler

                function changeInfoHandler(e) {
                    e.preventDefault()

                    // get data
                    let passwordInfo = {
                            oldPassword: changeInfo.oldPassword.value,
                            newPassword: changeInfo.newPassword.value,
                            confirmPassword: changeInfo.confirmPassword.value
                        }
                        // validate data
                    let validateResult = [
                            view.validate('new-password-error', [
                                passwordInfo.newPassword, 'Missing password!',
                                passwordInfo.newPassword.length >= 6, 'Password length must greater than or equals 6'
                            ]),
                            view.validate('confirm-password-error', [
                                passwordInfo.confirmPassword, 'Missing confirm password!',
                                passwordInfo.confirmPassword == passwordInfo.newPassword, 'Password and confirm password not match!'
                            ])
                        ]
                        // submit data
                    if (view.allPassed(validateResult)) {
                        controller.changePassword(passwordInfo)
                    }
                }



                async function deleteAccountHandler(e) {
                    e.preventDefault()
                    let credential = deleteAccount.password.value
                    console.log(credential)


                    view.disable('delete-account-btn')


                    await controller.deleteAccount(credential)
                    view.enable('delete-account-btn')
                }

                async function formChangeNameOrEmailHandler(e) {
                    e.preventDefault();
                    let info = {
                        newName: formChangeNameOrEmail.newName.value,
                        newBirthday: formChangeNameOrEmail.newBirthday.value,
                        newAddress: formChangeNameOrEmail.newAddress.value,
                    }
                    let validateResult = [
                        view.validate('new-name-error', [info.newName, 'Missing the name!']),
                        view.validate('new-birthday-error', [info.newBirthday, 'Missing the name!']),
                        view.validate('new-address-error', [info.newAddress, 'Missing the name!']),
                    ]
                    if (view.allPassed(validateResult)) {
                        await controller.changeInfo(info)
                        await firebase.firestore().collection('users').doc(id).update({
                            displayName: info.newName,
                            birthday: info.newBirthday,
                            address: info.newAddress

                        })
                    }
                    view.showComponents('personal')

                }



                break;
            }
        case 'fullScreenChat':
            {
                let myWeb = document.getElementById('my-web')
                myWeb.innerHTML = components.navbar + components.fullScreenChat

                navbarEvent();

                let formAddMessage = document.getElementById('form-add-message')
                formAddMessage.onsubmit = formAddMessageSubmit


                let formAddConversation = document.getElementById('form-add-conversation')
                formAddConversation.onsubmit = formAddConversationSubmit

                let leaveConversation = document.getElementById("leave-conversation-btn")
                leaveConversation.onclick = leaveConversationHandler

                let formAddEmail = document.getElementById('form-add-email')
                formAddEmail.onsubmit = addEmailConversationHandler



                navbarEventForChats();

                controller.setupDatabaseChangeFull();
                controller.setupPostChange();
                await controller.loadListUserStatus();

                await controller.setupData();
                let dataUser = model.dataUser
                console.log(model.listPosts)

                await getDataCurrentUserInnnerHtml(dataUser);




                await controller.loadConversations() // load all conversations and save to model

                view.showCurrentConversationFullScreen() // read data from model and display to screen

                view.showListConversation()

                // await controller.loadNewPost() // load all conversations and save to model
                // console.log(model.conversations)
                // console.log(model.listUserStatus)











                function readURL(input) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();

                        reader.onload = async function(e) {
                            await $('#blah').attr('src', e.target.result).css("display", "block").width(80).height(50)
                            $("#buttonCloseImage").css("display", "block")
                            $("#buttonCloseImage").click(function() {
                                $('#blah').css("display", "none")
                                $('#buttonCloseImage').css("display", "none")
                            })

                        }

                        reader.readAsDataURL(input.files[0]);
                    }
                }
                $("#image").change(function() {
                    readURL(this);
                });

                async function formAddNewPostHandler(e) {
                    e.preventDefault();
                    view.disable('post-btn')
                    let content = formAddNewPost.post.value;
                    let image = formAddNewPost.imagePost.files[0]
                    console.log(content)
                    let imageURL;
                    if (image) {
                        imageURL = await uploadPostImage(image)
                    } else
                        imageURL = ""


                    console.log(imageURL)


                    let postContent = {
                        content: content,
                        image: imageURL
                    }
                    console.log(postContent)

                    await controller.addNewPost(postContent)
                    formAddNewPost.post.value = ''
                    $('#blah').css("display", "none")
                    $('#buttonCloseImage').css("display", "none")
                    view.enable('post-btn')

                }

                async function formAddMessageSubmit(e) {
                    e.preventDefault()
                    let content = formAddMessage.message.value.trim()



                    if (model.currentConversation && content) {

                        view.disable('form-add-message-btn')
                        let message = {
                            content: content,
                            owner: firebase.auth().currentUser.email,
                            createAt: moment().subtract(new Date().toISOString()).calendar()
                        }
                        await controller.updateNewMessage(model.currentConversation.id, message)
                        formAddMessage.message.value = ''
                        view.enable('form-add-message-btn')


                    }
                }



                async function formAddConversationSubmit(e) {
                    e.preventDefault();

                    let title = formAddConversation.title.value;
                    let friendEmail = formAddConversation.friendEmail.value.trim().toLowerCase();
                    let currentEmail = firebase.auth().currentUser.email;
                    let friendEmailExists = await controller.validateEmailExists(friendEmail)

                    let validateResult = [
                        view.validate('title-error', [
                            title, 'Missing tittle'
                        ]),

                        view.validate('friend-email-error', [
                            friendEmail, 'Missing friendEmail',
                            friendEmailExists, 'Friend email do not exists',
                            friendEmail != currentEmail, `Please enter an other person's email `
                        ])

                    ]
                    if (view.allPassed(validateResult)) {
                        let conversation = {
                            users: [currentEmail, friendEmail],
                            messages: [],
                            title: title,
                            createAt: new Date().toISOString()
                        }
                        console.log(conversation)
                        await controller.addConversation(conversation)
                        console.log('added new conversation')

                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        await view.showComponents("chats")

                        formAddConversation.title.value = ""
                        formAddConversation.friendEmail.value = ""
                    }

                }



                let currentEmail = firebase.auth().currentUser.email
                let currentId = model.currentConversation.id

                async function leaveConversationHandler() {
                    await firebase.firestore().collection('conversations').doc(currentId).update({
                        users: firebase.firestore.FieldValue.arrayRemove(currentEmail),
                    })
                    await location.reload();



                }

                $("#backToVsocial").click(function() {

                    view.showComponents("chats")
                })



                async function addEmailConversationHandler(e) {
                    e.preventDefault();
                    let friendEmail = formAddEmail.emailAdd.value.trim().toLowerCase()

                    let friendEmailExists = await controller.validateEmailExists(friendEmail)
                    let currentEmail = firebase.auth().currentUser.email;

                    let validateResult = [
                        view.validate('friend-email-error', [
                            friendEmail, 'Missing friendEmail',
                            friendEmailExists, 'Friend email do not exists',
                            friendEmail != currentEmail, `Please enter an other person's email `
                        ])


                    ]

                    if (view.allPassed(validateResult)) {

                        await firebase.firestore().collection('conversations').doc(currentId).update({
                            users: firebase.firestore.FieldValue.arrayUnion(friendEmail),
                        })

                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        await view.showComponents("chats")
                    }


                }





            }
    }
}