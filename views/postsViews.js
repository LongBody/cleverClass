view.showListPosts = async function() {
    let showListPost = document.getElementById("show-list-post")
    let photoCurrentUserCmt = firebase.auth().currentUser.providerData[0].photoURL;
    showListPost.innerHTML = ''
    let posts = model.listPosts
    infoUsers = model.listUserStatus;
    let photo;
    let name;
    let html;
    let idCollapse;


    // console.log(posts)

    if (posts) {

        for (let post of posts) {
            // console.log(post)
            let { id: postId, emailPost, image, content, createAt, like } = post
            console.log(like)
                // console.log(image)
                // console.log(content)

            for (let infoUser of infoUsers) {

                let { displayName, photoURL, email } = infoUser;
                // console.log(emailPost)
                // console.log(email)
                // console.log(createAt)


                if (emailPost === email) {
                    photo = photoURL
                    name = displayName


                }
                if (!image) {
                    classNameImg = "visibleClass"

                } else {
                    classNameImg = "img-fluid mt-4"
                    idCollapse = image

                }

                if (!content) {
                    classNameContent = "visibleClass"
                } else {
                    classNameContent = ""
                    idCollapse = content
                }
                html = `
           
<div class="card shadow post-view" >
<div class="info-view-post">
<div class="nav-post d-flex">
<img src="${photo}" class="card-img-top-post-view" alt="..." >
<div>
<div class="nav-name">${name}</div>
<span class="time-post">${moment(createAt).fromNow()}</span>
</div>
</div>

</div>
<div class="card-body">
<div class="${classNameContent}" >${content}</div>
<img class="${classNameImg}" src="${image}">

<div class="mt-3">
<hr/>
<button type="button" class="btn btn-light" onclick="toggleLike(this)" data-isLike="false" id="${postId}"> <i class="far fa-thumbs-up thumbUp"></i> Like</button>
<button type="button" class="btn btn-light" data-toggle="collapse" data-target="#${idCollapse}" aria-expanded="false" aria-controls="${idCollapse}">  <i class="fas fa-comments"></i> Comment</button>
</div>

<div class="comment-post mt-3 collapse" id="${idCollapse}">
<hr/>
<img class="avatar-user-cmt mt-1 mr-1" src="${photoCurrentUserCmt}" >
<form class="form-group card form-add-comment">
  <input type="text"
    class="form-control form-add-comment-post" name="" id="" aria-describedby="helpId" placeholder="Write a comment...">
</form>

</div>


<div class="sub-comment collapse" id="${idCollapse}">
<img class="avatar-user-cmt mt-1 mr-1" src="${photo}" >
<span><a href="#">${name}</a> <span>Tao khong biet dau nhe</span></span>
</div>



</div>
</div>

            `

            }

            $("#loader").css("display", "none")

            showListPost.innerHTML += html


        }



        showListPost.scrollTop = showListPost.scrollHeight
    }

    // thumbUp();

    // function thumbUp() {



    //     var like = false;

    //     $("#like-btn-" + postId).click(function() {
    //         if (like === false) {
    //             like = true;
    //             console.log(like)
    //             $(".fa-thumbs-up").css("color", "blue")

    //         } else {
    //             like = false
    //             console.log(like)
    //             $(".fa-thumbs-up").removeAttr('style');
    //         }
    //     })

    // }


}



view.showNewPosts = function(post) {
    let photoCurrentUserCmt = firebase.auth().currentUser.providerData[0].photoURL;
    let showListPost = document.getElementById("show-new-post")
    infoUsers = model.listUserStatus;
    let photo;
    let name;
    let html;
    let collapse;
    // console.log(posts)
    // console.log(post)

    showListPost.innerHTML = ""
    if (post) {

        let { emailPost, image, content, createAt } = post
        // console.log(image)
        // console.log(content)

        for (let infoUser of infoUsers) {

            let { displayName, photoURL, email } = infoUser;
            // console.log(emailPost)
            // console.log(email)
            // console.log(createAt)

            if (emailPost === email) {
                photo = photoURL
                name = displayName


            }
            if (!image) {
                classNameImg = "visibleClass"
            } else {
                classNameImg = "img-fluid mt-4"
                idCollapse = image
            }

            if (!content) {
                classNameContent = "visibleClass"
            } else {
                classNameContent = ""
                idCollapse = content
            }



            html = `
            <div class="card shadow post-view">
    <div class="info-view-post">
        <div class="nav-post d-flex">
            <img src="${photo}" class="card-img-top-post-view" alt="...">
            <div>
                <div class="nav-name">${name}</div>
                <span class="time-post">${moment(createAt).fromNow()}</span>
            </div>
        </div>

    </div>
    <div class="card-body">
        <div class="${classNameContent}">${content}</div>
        <img class="${classNameImg}" src="${image}">

        <div class="mt-3">
            <hr/>
            <button type="button" class="btn btn-light">  <i class="far fa-thumbs-up"></i> Like</button>
            <button type="button" class="btn btn-light" data-toggle="collapse" data-target="#${idCollapse}" aria-expanded="false" aria-controls="${idCollapse}">  <i class="fas fa-comments"></i> Comment</button>
        </div>

        <div class="comment-post mt-3 collapse" id="${idCollapse}">
            <hr/>
            <img class="avatar-user-cmt mt-1 mr-1" src="${photoCurrentUserCmt}">
            <form class="form-group card form-add-comment">
                <input type="text" class="form-control form-add-comment-post" name="" id="" aria-describedby="helpId" placeholder="Write a comment...">
            </form>

        </div>
    </div>
</div>

            `

        }
        showListPost.innerHTML += html




        showListPost.scrollTop -= showListPost.scrollHeight
    }

}

async function toggleLike(button, like) {
    var like;
    var posts = model.listPosts;
    posts.map(post => {
        if (button.id === post.id) {
            like = post.like
        }
    })


    let isLike = button.getElementsByClassName("thumbUp")
    console.log(like)

    if (button.getAttribute("data-isLike") == 'true') {
        isLike[0].style.color = "black"
        button.setAttribute("data-isLike", 'false')
            // await firebase.firestore().collection('posts').doc(button.id).update({
            //     like: like
            // })
            // console.log(like)
    } else {
        button.setAttribute("data-isLike", 'true')
        isLike[0].style.color = "blue"


        // await firebase.firestore().collection('posts').doc(button.id).update({
        //     like: like + 1


        // })
        // console.log(like)
    }
}