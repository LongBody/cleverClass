async function getDataCurrentUser(data) {
    let currentEmail = firebase.auth().currentUser.email
    let dataUser;
    data.map(user => {
        if (currentEmail === user.email)
            dataUser = user
    })
    console.log(dataUser)

    let { displayName, birthday, address, photoURL } = dataUser
    $("#name").val(displayName)
    $("#birthday").val(birthday)
    $("#address").val(address)
}

async function getDataCurrentUserInnnerHtml(data) {
    let currentEmail = firebase.auth().currentUser.email
    let dataUser;
    data.map(user => {
        if (currentEmail === user.email)
            dataUser = user
    })
    console.log(dataUser)

    let { displayName, birthday, address, photoURL } = dataUser
    if (!photoURL) photoURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png'
    $("#name").html(displayName)
    $("#birthday").html(birthday)
    $("#address").html(address)
    $("#photoURL").attr("src", photoURL)
}