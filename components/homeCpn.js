components.home = `<div>
<header class="header-wrapper darken-pseudo">
    <nav class="navbar navbar-expand-sm">
        <a class="navbar-brand" href="#"
            style="font-family: 'Megrim', cursive; font-size: 30px; font-weight: 800; color: white;">
            <!-- <img src="../images/clever_class-removebg-preview.png" style="width:100px;"> -->
            Clever Class
        </a>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item login">
                <button class="btn btn-light mr-1" type="button"  data-toggle="modal" data-target="#form-modal"
                    onclick="showTap('sign in')">Đăng nhập</button>
            </li>

            <li class="nav-item emphasize">
                <button id="register-link" class=" btn btn-info" type="button" data-toggle="modal"
                    data-target="#form-modal" onclick="showTap('sign up')">Đăng kí</button>
            </li>
        </ul>
    </nav>

    <div class="introduce text-white ml-5">
        <h3 class="mt-5 font-weight-bold">Tạo lớp học chưa bao giờ dễ dàng đến thế</h3>
        <p> Clever Class cho phép tạo, quản lý lớp học, tương tác với các thành viên trên nền tảng free</p> 
        <button type="button" class="btn btn-info mt-1"  data-toggle="modal" data-target="#form-modal"
        onclick="showTap('sign in')">Bắt đầu ngay</button>
    </div>
</header>

<section style="margin-bottom: 70px;">
    <div class="question">
        <h2 class="text-center mb-3">Tại sao bạn nên chọn Clever Class?</h2>
    </div>

    <div class="container">
        <div class="row ">
            <div class="slogan-item col col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <!-- <img src="../images/easy.png" alt=""> -->
                <i class="far fa-check-square"></i>
                <h3>Làm việc cực dễ dàng</h3>
                <p>Với giao diện đơn giản, thông minh, Clever Class sẽ giúp bạn tạo và quản lý lớp học chỉ bằng
                    cái click chuột. </p>
            </div>
            <div class="slogan-item col col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <!-- <img src="../images/connect.png" alt=""> -->
                <i class="fas fa-globe"></i>
                <h3>Tương tác tốt giữa thành viên</h3>
                <p>Clever Class cung cấp các tính năng hội thoại, ô chat cá nhân để nâng cao khả năng trải
                    nghiệm.</p>
            </div>
            <div class="slogan-item col col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <!-- <img src="../images/binoculars-yellow.png" alt=""> -->
                <i class="fas fa-binoculars"></i>
                <h3>Quản lý, theo dõi học viên</h3>
                <p>Với bảng xếp hạng hoạt tích cực, bạn có thể dễ dàng nắm được tình hình thái độ học viên trong
                    suốt khóa học.</p>
            </div>
        </div>
    </div>
</section>

<footer class="container-fuild ">
    <div class="get-start-content container">
        <h3>Tạo lớp ngay bây giờ</h3>
        <p>Đăng kí để trở thành thành viên của Clever Class ngay thôi nào!</p>
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#form-modal"
        onclick="showTap('sign in')">Bắt đầu - Miễn phí</button>
    </div>
    <div class="row" style="margin-top: 100px;">
        <div class="col col-xs-6 col-sm-6 col-md-3 col-lg-3">
            <h6>Về chúng tôi</h6>
            <div>Trịnh Trang <br>
                Nguyễn Trung Phúc <br>
                Nguyễn Thành Long <br>
                Mai Thanh Tùng <br>
            </div>
        </div>
        <div class="col col-xs-6 col-sm-6 col-md-3 col-lg-3">
            <h6>Góp ý - Mọi góp ý xin gửi về</h6>
            <div>
                Email: cleverclass@gmail.com <br>
                Sdt: 0978 333 333
            </div>
        </div>
    </div>
</footer>
</div>
<div class="modal" id="form-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div id="sign-in">
                    <div class="modal-content sign-in-content">
                        <div class="header-div"
                            style="height: 50px; background: rgb(12, 60, 96); border-radius: 4px 4px 0 0;">
                        </div>
                        <div class="modal-header ">
                            <a class="modal-title" id="exampleModalLabel" onclick="showTap('sign in')"
                                style="border-bottom: solid 2px rgb(12, 60, 96);">Đăng
                                Nhập</a>
                            <a class="modal-title" id="exampleModalLabel" onclick="showTap('sign up')">Đăng Kí</a>
                        </div>
                        <div class="modal-body">
                            <form id="log-in-form">
                                <div class="input-wrapper">
                                    <i class="fas fa-envelope"></i>
                                    <input type="email" class="email" name="email" placeholder="Email">
                                </div>
                                <div id="email-error" class="message-error"></div>

                                <div class="input-wrapper">
                                    <i class="fas fa-lock"></i>
                                    <input type="password" class="password" name="password" placeholder="Password">
                                </div>
                                <div id="password-error" class="message-error"></div>

                                <div id="log-in-error" class="message-error"></div>

                                <button id="login-btn" type="submit" class="btn" >Đăng nhập</button>
                                <div class="text-center" style="font-size: 13px; margin: 25px 0 10px 0;">Hoặc sử dụng</div>

                                <div class="d-flex flex-row justify-content-center">
                                    <button type="button" class="shadow card google-sign-in" id="google-sign-in" ><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg " class="text-sign">Sign in with Google</button>
                                </div>
                                <div class="d-flex flex-row justify-content-center mt-2">
                                    <button type="button" class="shadow card facebook-sign-in" id="facebook-sign-in" ><i class="fab fa-facebook-square"></i>Sign in with Facebook</button>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                        <a href="#"><small id="emailHelpId" class="form-text text-muted">Forget Password</small></a>
                       </div>
                    </div>
                </div>

                <div id="sign-up">
                    <div class="modal-content sign-up-content">
                        <div class="header-div"
                            style="height: 50px; background-color: rgb(12, 60, 96); border-radius: 4px 4px 0 0;">
                        </div>
                        <div class="modal-header">
                            <a class="modal-title" id="exampleModalLabel" onclick="showTap('sign in')">Đăng
                                Nhập</a>
                            <a class="modal-title" id="exampleModalLabel" onclick="showTap('sign up')"
                                style="border-bottom: solid 2px rgb(12, 60, 96)">Đăng Kí</a>
                        </div>
                        <div class="modal-body register-form">
                            <form id="register-form">
                                <div class="input-wrapper">
                                    <i class="fas fa-user"></i>
                                    <input type="text" class="username" name="name" placeholder="Họ và tên">
                                </div>
                                <div id="username-error" class="message-error"></div>

                                <div class="input-wrapper">
                                    <i class="fas fa-envelope"></i>
                                    <input type="email" class="email" name="email" placeholder="Email">
                                </div>
                                <div id="register-email-error" class="message-error"></div>

                                <div class="input-wrapper">
                                    <i class="fas fa-lock"></i>
                                    <input type="password" class="password" name="password" placeholder="Mật khẩu">
                                </div>
                                <div id="register-password-error" class="message-error"></div>

                                <div class="input-wrapper">
                                    <i class="fas fa-lock"></i>
                                    <input type="password" class="cf-password" name="confirmPassword"
                                        placeholder="Nhập lại mật khẩu">
                                </div>
                                <div id="confirm-password-error" class="message-error"></div>
                                <div id="register-error" class="message-error"></div>
                                <div id="register-success" class="message-success"></div>

                                <button id="register-btn" type="submit" class="btn">Đăng kí</button>
                                <div class="text-center" style="font-size: 13px; margin: 25px 0 10px 0;">Hoặc sử dụng</div>

                                <div class="d-flex flex-row justify-content-center">
                                    <button type="button" class="shadow card google-sign-in" id="google-sign-in" ><img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg " class="text-sign">Sign in with Google</button>
                                </div>
                                <div class="d-flex flex-row justify-content-center mt-2">
                                    <button type="button" class="shadow card facebook-sign-in" id="facebook-sign-in" ><i class="fab fa-facebook-square"></i>Sign in with Facebook</button>
                                </div>
                                
                        </div>
                        <div class="modal-footer">
                     <a href="#"><small id="emailHelpId" class="form-text text-muted">Forget Password</small></a>
                    </div>
                </div>
            </div>
        </div>
`