function navbarEvent() {
    let userName = firebase.auth().currentUser.providerData[0].displayName
        // Get the displayName of user in firebase
    let displayName = document.getElementById('displayName')
    $("#avatarName").html(userName)

    $("#home").click(function() {
        view.showComponents("personal")
    })

    displayName.innerHTML = userName

    var user = firebase.auth().currentUser;


    let fastChat = document.getElementById('fastChat')
    fastChat.onclick = fastChatHandlerClick

    function fastChatHandlerClick() {
        view.showComponents('chats')
    }

    let eLesson = document.getElementById("e-lesson")
    eLesson.onclick = eLessonHandlerClick

    function eLessonHandlerClick() {
        view.showComponents('lesson')
    }



    // Sign out account
    $("#log-out").click(async function() {

        firebase.auth().signOut()

    })


    $("#account-setting").click(function() {
            view.showComponents('account')
        }

    )


    async function readURL(input) {
        await controller.loadListUserStatus();
        let id = model.currentUserId

        if (input.files && input.files[0]) {
            console.log(input.files[0])
            let file = input.files[0]

            let link = await upload(file)
            console.log(link)

            await user.updateProfile({
                photoURL: link
            }).then(async function() {
                view.showComponents("account")
                console.log("success")

            }).catch(function(error) {
                console.log(error)
            });
            await firebase.firestore().collection('users').doc(id).update({
                photoURL: link

            })

        }
    }
    let photoURL = firebase.auth().currentUser.providerData[0].photoURL

    if (!photoURL) photoURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'

    $("#dropdownMenuButton").attr("src", photoURL)
    $("#avatar").attr("src", photoURL)
        // function upload avatar

    async function upload(file) {
        let fileName = file.name;
        let filePath = `photoURL/${fileName}`;
        let fileRef = firebase.storage().ref().child(filePath)

        await fileRef.put(file)
        let photoURL = getFileURl(fileRef)
        return photoURL

    }

    function getFileURl(fileRef) {
        return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}?alt=media`

    }


    $("#files").change(function() {
        readURL(this);
    })




}



async function navbarEventForChats() {
    let userName = firebase.auth().currentUser.providerData[0].displayName
        // Get the displayName of user in firebase
    await controller.loadListUserStatus();
    infoUsers = model.listUserStatus
    console.log(infoUsers)

    let arrayName = [];

    arrayName = infoUsers.map(user => {
        return user.displayName;
    })


    console.log(arrayName)


    let displayName = document.getElementById('displayName')
    $("#form-search").css("display", "block");
    $("#avatarName").html(userName)




    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function(e) {
            closeAllLists(e.target);
        });
    }


    var countries = arrayName
    console.log(countries)

    /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
    autocomplete(document.getElementById("myInput"), countries);



    let html
    let photo, UserAddress, UserBirthday
    let nameUser
    let showNameSearch = document.getElementById("showNameSearch")
    showNameSearch.innerHTML = ""
    $("#form-search-click").click(function() {
        let nameInput = $("#myInput").val();

        infoUsers.map(user => {
            if (nameInput === user.displayName) {
                photo = user.photoURL
                nameUser = user.displayName
                UserAddress = user.address
                if (UserAddress === undefined) {
                    UserAddress = "Don't have update their information"
                }
                UserBirthday = user.birthday
                if (UserBirthday === undefined) {
                    UserBirthday = "Don't have update their information"
                }


                html = `
                    <div id="personal">
                    <div class="info-personal">
                    <img class="avatar-user-search" src="${photo}" >
                     <span class="user-name-search">${nameUser}</span>
                     <p class="information-user mt-3 ml-1"><i class="fas fa-home" style="font-size:25px"></i> <span class="card-show-info-user" >${UserBirthday}</span></p>
                     <p class="information-user ml-1" ><i class="fas fa-birthday-cake" style="font-size:25px"></i><span class="card-show-info-user" >${UserAddress}</span></p>
                    </div>
                  
                    </div>
            `
            }
            showNameSearch.innerHTML = html
        })

    })





    $("#home").click(function() {
        view.showComponents("personal")
    })

    displayName.innerHTML = userName

    var user = firebase.auth().currentUser;


    let fastChat = document.getElementById('fastChat')
    fastChat.onclick = fastChatHandlerClick

    function fastChatHandlerClick() {
        view.showComponents('chats')
    }

    let eLesson = document.getElementById("e-lesson")
    eLesson.onclick = eLessonHandlerClick

    function eLessonHandlerClick() {
        view.showComponents('lesson')
    }


    // Sign out account
    $("#log-out").click(async function() {

        firebase.auth().signOut()

    })


    $("#account-setting").click(function() {
            view.showComponents('account')
        }

    )


    async function readURL(input) {
        await controller.loadListUserStatus();
        let id = model.currentUserId

        if (input.files && input.files[0]) {
            console.log(input.files[0])
            let file = input.files[0]

            let link = await upload(file)
            console.log(link)

            await user.updateProfile({
                photoURL: link
            }).then(async function() {
                view.showComponents("account")
                console.log("success")

            }).catch(function(error) {
                console.log(error)
            });
            await firebase.firestore().collection('users').doc(id).update({
                photoURL: link

            })

        }
    }
    let photoURL = firebase.auth().currentUser.providerData[0].photoURL

    if (!photoURL) photoURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'

    $("#dropdownMenuButton").attr("src", photoURL)
    $("#avatar").attr("src", photoURL)
        // function upload avatar

    async function upload(file) {
        let fileName = file.name;
        let filePath = `photoURL/${fileName}`;
        let fileRef = firebase.storage().ref().child(filePath)

        await fileRef.put(file)
        let photoURL = getFileURl(fileRef)
        return photoURL

    }

    function getFileURl(fileRef) {
        return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(fileRef.fullPath)}?alt=media`

    }


    $("#files").change(function() {
        readURL(this);
    })




}