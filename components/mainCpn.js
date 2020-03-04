const components = {}

components.navbar = `
<nav class="navbar navbar-expand-sm navbar-light bg-light">
    <a class="navbar-brand" href="#"> <img src="./images/clever-class.png" style="width:50px;"></a>
    <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active"  id="home">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" id="fastChat">Vsocial</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="#" id="e-lesson">E-lesson</a>
        </li>
    
         
        </ul>

        <form autocomplete="off" action="/action_page.php" class="mr-4 mt-2" id="form-search" style="display:none">
        <div class=" autocomplete md-form active-cyan-2  d-flex">
        <input class="form-control mr-1" id="myInput" type="text" placeholder="Search Users" name="myCountry"  aria-label="Search"> 
        <button type="button" class="btn btn-info mr-2" id="form-search-click" data-toggle="modal" data-target="#nameSearch">Search</button> 
      </div>
   
      </form>

      <div class="modal fade" id="nameSearch" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="showNameSearch">
        
      </div>
    </div>
  </div>
</div>


        <i class="fas fa-bell notify mr-4"><span class="numberOfNotify">3</span></i>
        <div class="dropdown">

  <img class="dropdown-toggle img-fluid" style="width:40px;height:40px; border-radius:50%;border: solid 1px;"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
 
  <span id="displayName"></span>
  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#" id="account-setting">Account</a>
    <a class="dropdown-item" href="#">Setting</a>
    <div class="dropdown-divider"></div>
    <div class="logOut" id="log-out">
      <a class="dropdown-item" href="#" >Log Out <i class="fas fa-sign-out-alt"></i></a>
   
    </div>
  
  </div>
</div>
      
    </div>
</nav>`

components.loading = `
<div class="show-loading">
<div class="loading">
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>

</div></div>
`

components.account = `
<section style="width:100%">
    <div class="change-info-form">
        <div class="form-header d-flex">
            <div class="header-notes">
                <h1>Account Settings</h1>
                <p class="notes">Perfect setting account to show your personality</p>
            </div>

        </div>

        <div class="form-body">
            <div class="d-flex change-avatar">
                <img class="img-fluid mr-3" src="#" style="width:80px; border-radius:50%;
                -moz-border-radius:50%;
                -webkit-border-radius:50%;;border: solid 1px;" id="avatar">
                <div class="ava-notes mr-4">
                    <h5 id="avatarName"></h5>
                    <p class="notes">Accounting is a new Skill.</p>
                </div>
                <label for="files" class="btn btn-secondary align-self-baseline btn-md">Upload</label>
                <input id="files" style="visibility:hidden;" type="file">
            </div>
            <div class="change-personal-info">
                <form id="change-info-email-name">
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="fullName">Display name</label>
                            <input type="text" class="form-control" id="name" name="newName" placeholder="Display name">
                            <div id="new-name-error" class="message-error"></div>
                        </div>

                        <div class="form-group col-md-4">
                        <label for="email">Your birthday</label>
                        <input type="text" class="form-control" id="birthday" name="newBirthday" placeholder="DD/MM/YY">
                        <div id="new-birthday-error" class="message-error"></div>
                    </div>

                        <div class="form-group col-md-4">
                            <label for="email">Your address</label>
                            <input type="text" class="form-control" id="address" name="newAddress" placeholder="Your address">
                            <div id="new-address-error" class="message-error"></div>
                        </div>

                       

                        <button class="btn btn-success btn-md align-self-center ml-auto" id="save-btn" type="submit">Save</button>

                </form>
                <div id="save-success" class="message-success"></div>
                </div>
            </div>

            <form id="change-info-form">
                <div class="change-password">
                    <h5>Change Password</h5>

                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="old-password">Old Password</label>
                            <input type="password" class="form-control" id="old-password" name="oldPassword">
                            <div id="old-password-error" class="message-error"></div>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="new-password">New Password</label>
                            <input type="password" class="form-control" id="new-password" name="newPassword">
                            <div id="new-password-error" class="message-error"></div>
                        </div>


                        <div class="form-group col-md-4">
                            <label for="confirm-password">Confirm</label>
                            <input type="password" class="form-control" id="confirm-password" name="confirmPassword">
                            <div id="confirm-password-error" class="message-error"></div>
                        </div>



                        <div class="form-group col-md-1 align-self-end">
                            <button class="btn btn-primary" type="submit" id="change-password-btn">Change</button>
                        </div>
                        <div id="password-error" class="message-error"></div>
                        <div id="password-success" class="message-success"></div>
                    </div>
                </div>
            </form>
        </div>

        <div class="form-footer">
            <h5>Your Account</h5>
            <p class="notes">Do you want to delete your account ? <br>
                <button type="button" class="btn btn-danger mt-1" data-toggle="modal" data-target="#exampleModal">
    Delete
  </button>
            </p>
        </div>

        <!-- Modal -->
        <form id="delete-account">
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"> Do you really want to delete your account ?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
                        </div>
                        <div class="modal-body">
                                <label for="password" id="delete-for-email"> </label>
                                <input type="password" class="form-control" name="password" id="password" aria-describedby="emailHelpId" placeholder="YourPassword...">   
                                <div id="delete-account-error" class="message-error"></div>
                                <div id="delete-account-success" class="message-success"></div>                       
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-delete" id="delete-account-btn">Delete</button>
                            <button type="button" class=" btn btn-cancel" data-dismiss="modal">Cancel</button>
                        </div>
                     
                    </div>
                </div>
            </div>

        </form>
    </div>

</section>
`