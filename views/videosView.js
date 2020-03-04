async function listLesson() {
    var listLesson = document.getElementById("list-video")
    listLesson.innerHTML = ""
    let html;
    var videos = await firebase.storage().ref('video/').listAll()
    let items = videos.items;
    for (let item of items) {
        let name = item.name
            // console.log(item)
            // item.getDownloadURL().then(async function(url) {
            //     // console.log(url)
            //     html = `
            //         <div class="d-flex video-click">
            //             <video controls id="video-watch" class="video-watch" src="${url}">
            //                 Your browser does not support the video tag.
            //             </video>
            //             <span class="mt-3 title-video">${name.replace(".mp4","")}</span>

        //         </div>`
        //         // name.replace(/.mp4/g, "");
        let url = await item.getDownloadURL();
        html = `
                 <div class="d-flex video-click">
                     <video controls  id="video-watch" class="video-watch" src="${url}">
                         Your browser does not support the video tag.
                     </video>
                     <span class="mt-3 title-video name">${name.replace(".mp4","")}</span>
          
                 </div>`
        $("#loader").css("display", "none")
        listLesson.innerHTML += html
            // })
    }

    let videosClick = document.getElementsByClassName("video-click");
    for (let videoClick of videosClick) {
        videoClick.onclick = function() {
            // let videoURL = this.querySelector("video").getAttribute("src");
            let videoURL = $(this).children("video").attr("src");
            let name = $(this).children(".name").html()
            console.log(name);
            $("#video-watch").attr("src", videoURL)
            $("#avatar-lesson").html(name)
        }
    }
}

async function currentVideo() {

    let userName = firebase.auth().currentUser.providerData[0].displayName
    let photoURL = firebase.auth().currentUser.providerData[0].photoURL
    var videos = await firebase.storage().ref('video/').listAll()
    let items = videos.items;

    var currentVideo = document.getElementById("currentVideo")
    currentVideo.innerHTML = ""
    let number = Math.ceil(Math.random() * 5)

    items[number].getDownloadURL().then(async function(url) {

        let name = items[number].name
        html = `
                <div >
                    <video controls autoplay id="video-watch" class="video-watching" src="${url}">
                        Your browser does not support the video tag.
                    </video>
                    <div class="mt-3 title-video-watching"  id="avatar-lesson">${name.replace(".mp4","")}</div>

                    <div class="mt-2">
                    <img class="avatar-lesson "src="${photoURL}"><span  class="ml-2 userNameVideo">${userName}</span>
                    </div>
            
                </div>`
            // name.replace(/.mp4/g, "");
        currentVideo.innerHTML += html
    })


}