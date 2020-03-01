components.chats = `
<section>

<div class="container-fluid" style="display:flex">
  


    <div id="social-media" class="social-media ">
  <div class="aside-left-chat">
    <div class="card shadow card-info" style="width: 18rem;">
    <h5 class="card-title text-center">My Profile</h5>
    <div class="avatar-social">
    <img class="card-img-top" id="photoURL" src="" alt="Card image cap">
    </div> 
    <div class="card-body"> 
      <hr/>
      <p class="information-user"><i class="fas fa-user-edit information-user"></i><span class="card-show-info-user" id="name"></span></p>
      <p class="information-user"><i class="fas fa-home"></i> <span class="card-show-info-user" id="address"></span></p>
      <p class="information-user"><i class="fas fa-birthday-cake"></i><span class="card-show-info-user" id="birthday"></span></p>
    </div>
     </div>


     <div class="card shadow card-conversation" style="width: 18rem;">
     <div class="list-conversation" id="list-conversation">

     </div>  
      </div>

      <div class="card card-interested" style="width: 18rem;">
      <div class="card-body">
        <strong><p class="card-title">Interested</p></strong>
        <span class="interested">Mind class</span>
        <span class="interested">javascript</span>
        <span class="interested">Wuhan News</span> 
        <span class="interested">nodejs video</span> 
      </div>
    </div>


     </div> 
     
     <div class="card shadow card-social-post">
     <div class="post-input">

     <div class="card-body ">
     <strong><p class="card-title">Create Posts<p></strong>
     <form class="form-group" id="form-add-new-post">
     <input type="text" class="form-control" name="post" id="" aria-describedby="emailHelpId" placeholder="What's on your mind...">
     <div class="upload-image">
     <button type="submit" class="btn btn-primary mt-2 post-btn" id="post-btn">Post</button>

     <div id="">
       <button type="button" class="close buttonCloseImage" style="display:none" id="buttonCloseImage" >
          <span aria-hidden="true">&times;</span>
        </button>
        <img id="blah" class="previewImage ml-3" src="#" alt="your image" />
     </div>
   


     <i class="fas fa-images ml-3 mt-1" for="image" onclick="document.getElementById('image').click()"></i>
     <input type="file" id="image" class="form-control" name="imagePost" placeholder="Image" style="visibility:hidden">
  
    
     </div> 
   </form>
     </div>

     
   </div>

   <div class="loader" id="loader"></div>


   <div id="show-new-post">
   


</div>

   <div id="show-list-post">
   


</div>


   
   
     
     
     
     
     </div>
    </div>



    <div id="state-friend" class="state-friend card">
    <h6 class="contact">Contact Users</h6>
    <hr/>
    <div class="user" id="list-user-status"></div>
 
   <button class="btn btn-primary message-btn" type="button" data-toggle="collapse" data-target="#collapseMessage" aria-expanded="false" aria-controls="collapseMessage">
   <i class="fab fa-facebook-messenger"></i> Messenger
 </button>

    </div>


    <div class="chat-container collapse" id="collapseMessage">  
    <div class="current-conversation shadow">
        <div class="dropdown">
            <i class="fas fa-cog setting dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
            <div class="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" data-toggle="modal" data-target="#createGroup"> <i class="fas fa-users"></i> Create New Group</a>
                <a class="dropdown-item" data-toggle="modal" data-target="#exampleModal"> <i class="fas fa-user-plus"></i> Add People</a>
                <a class="dropdown-item" data-toggle="modal" data-target="#memberModal"> <i class="fas fa-user-alt"></i> Member</a>
                <a class="dropdown-item" href="#" id="leave-conversation-btn"> <i class="fas fa-sign-out-alt"></i> Leave Group</a>
            </div>
            <div class="dropdown-divider"></div>

        </div>


        <div id="list-message" class="list-message"> </div>
        <form id="form-add-message" class="form-add-message">
            <input type="text" class="form-control" name="message" placeholder="Enter your message...">
            <!-- <span class="emoji-show" id="emoji-show"><i class="fas fa-smile-beam"></i></span>
        <span class="thumb-up" id="laugh-show"><i class="fas fa-thumbs-up"></i></span> -->
            <button type="submit" class="btn btn-primary" id="form-add-message-btn">Send</button>
        </form>

    </div>
</div>

   

</div>





<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Add People</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form id="form-add-email">
    <div class="form-group">
      <input type="text" name="emailAdd" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter a Friend Email">
      <div id="friend-email-error" class="message-error"></div>
      <div id="add-friend-success" class="message-success"></div>
      </div>
    <button type="submit" class="btn btn-primary"  id="add-conversation-btn">ADD</button>
    
  </form>
    </div>
    
  </div>
</div>
</div>
 </div>

 

<div class="modal fade" id="createGroup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Create New Group</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    
    <form class="form-add-conversation" id="form-add-conversation">
    <div class="form-group">
      <input type="text " name="title"  class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Conversation Title">
      <div id="title-error" class="message-error"></div>
      </div>
    <div class="form-group">
      <input type="email " name="friendEmail" class="form-control" id="exampleInputPassword1" placeholder="Enter a Friend Email">
      <div id="friend-email-error" class="message-error"></div>
      <button type="submit" class="btn btn-primary id="form-add-conversation-btn" >ADD</button>
  </form>

    </div>
    
  </div>
</div>
</div>
 </div>



 <div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Members</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    
<div id="listMemberConversation"></div>

    </div>
    
  </div>
</div>
</div>
 </div>

</section>



`

components.lesson = `<section class="home">
<div class="container-fluid">
    <div class="row">
        <div class="video-watch">
            <video controls id="video-watch" width="1274px" height="740px" src="https://firebasestorage.googleapis.com/v0/b/mindx-c72f4.appspot.com/o/Web%20Chat%20-%20Google%20Chrome%202020-01-14%2015-09-34.mp4?alt=media&token=13bf05fa-4672-4332-aee3-361e6c6aca6a">
    Your browser does not support the video tag.
  </video>

            <div>
                <h5>Last Friday Night</h5>
            </div>
            <div class="views">
                9,000,000 views
                <span class="dot">•</span>
                <span>Nov 30,2019</span>
                <div class="iconVideo">
                    <span> <i class="far fa-thumbs-up"></i>50k</span>
                    <span> <i class="far fa-thumbs-down"></i>2k</span>
                    <span class="far"> FeedBack</span>

                </div>
            </div>
            <hr/>

            <div class="info">
                <img src="https://yt3.ggpht.com/-HRUb9tEICPI/AAAAAAAAAAI/AAAAAAAAAAA/0WHwD4cHfrY/s108-c-k-c0x00ffffff-no-rj-mo/photo.jpg" style="width:40px; border-radius: 50%;border: solid 1px;">

                <span class="far">LongBody</span>
                <button type="button" class="btn btn-primary follow">Follow</button>
            </div>

        </div>
        <div class="list-video  overflow-list-video">
            <div class="card">
                <div id="videoNext">
                    <video controls width="150px" id="idVideoNext" height="100px" src="https://firebasestorage.googleapis.com/v0/b/mindx-c72f4.appspot.com/o/cleverClass%20-%20Google%20Chrome%202020-02-10%2020-06-35.mp4?alt=media&token=667178a6-97ad-4288-9ce9-feb8584091f8"
                        preload="metadata"></video>
                    <div class="info-video-of-list">
                        <span class="name-of-video">Như Một Người Dưng Remix - Nguyễn Thạc Bảo Ngọc</span>
                        <p class="name-of-admin">LongBody</p>
                    </div>
                </div>
             

            </div>
        </div>
    </div>
</div>
</section>`