components.classroom = `<div class="d-flex">
<section class="aside-left">
   

    <div class="nav flex-container">
        <div class="" style="flex-grow: 2; border-right: solid 1px rgb(184, 182, 182);">
            <a href="#" id="my-home" class="my-home">
                <i class="fas fa-home"></i>
                <span>Trang chủ</span>
            </a>
        </div>
        <div class="pl-3" style="flex-grow: 1">
            <i class="fas fa-cog"></i>
        </div>
    </div>

    <div class="my-class-list-wrapper">
        <div class="title">
            Lớp học của bạn
        </div>
        <ul class="my-class-list" id="my-class-list">
         
        </ul>
    </div>
    <div class="current-class-wrapper">
        <div>
            <span id="add-member">
                <i class="fas fa-user-plus"></i>
                <span>Thêm thành viên</span>
            </span>
            <form class="form-edit" id="add-member-form"  >
                <input class="add-input" name="userName" placeholder="Nhập tên người dùng"></input>
                <div id="add-member-error" class="message-error"></div>
            </form>
        </div>
        <div>
            <span id="add-lesson">
                <i class="fas fa-plus-square"></i>
                <span>Thêm bài học</span>
            </span>
            <form class="form-edit" id="add-lesson-form"  >
                <input class="add-input" name="lessonName" placeholder="Nhập tên bài học"></input>
                <div id="add-lesson-error" class="message-error"></div>
            </form>
        </div>
        <div>
            <span id="change-teacher">
                <i class="fas fa-exchange-alt"></i>
                <span>Thay đổi giảng viên</span>
            </span>
            <form class="form-edit" id="change-teacher-form"  >
                <input class="add-input" name="userName" placeholder="Nhập tên người dùng"></input>
                <div id="change-teacher-error" class="message-error"></div>
            </form>
        </div>
        <div>
            <span data-toggle="modal" data-target="#staticBackdrop">
                <i class="fas fa-edit"></i>
                <span>Chỉnh sửa thông tin lớp học</span>
            </span>
        </div>
    </div>
</section>

<section class="class-current pl-3" style="flex-grow: 1;" id="classCurrent">
    <div class="d-flex p-2">
        <div class="mr-auto class-name" id="courseName"></div>
    </div>
        
    <div class="classroom-info p-3">
        <h2 class="courses-detail-title">
            <span>Thông tin lớp học:</span>
        </h2>
        <h3>Mục tiêu khóa học:</h3>
        <ul>
            <li id="courseTarget"></li>
        </ul>
        <h3>Thành viên</h3>
        <ul>
            <li id="teacher">Giáo viên: </li>
            <li id="students">Học viên: người</li>
        </ul>
        <div id="time"></div>
    </div>

    <div class="classroom-lesson p-3">
        <h2 class="courses-detail-title">
            <span>Nội dung khóa học</span>
        </h2>
        <ul class="learn-outline" id="lessons">
            <li class="learn-outline-item">
            </li>
        </ul>
    </div>

    <div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Chỉnh sửa thông tin</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="edit-info-form">
                <div class="modal-body">
                    <h1 for="target">Mục tiêu khóa học</h1>
                    <div class="form-group">
                        <input type="text" class="form-control" id="target" name="targetCourse"
                            placeholder="Nhập mục tiêu khóa học của bạn">
                    </div>

                    <h1>Thời gian học</h1>
                    <div>
                        <div class="form-group">
                            <label for="lesson">Số buổi học</label>
                            <input type="number" class="form-control" id="target" name="numberLesson"
                                placeholder="Nhập số buổi học của khóa">
                            <div id="number-lesson-error" class="message-error"></div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col">
                                <label for="timeStart">Thời gian bắt đầu</label>
                                <input type="date" class="form-control" name="timeStart" id="timeStart">
                            </div>
                            <div class="form-group col">
                                <label for="timeEnd">Thời gian kết thúc</label>
                                <input type="date" class="form-control" name="timeEnd" id="timeEnd">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="edit-info-classroom-btn" type="submit" class="btn btn-primary"
                        data-dismiss="modal">Cập
                        Nhật</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</section>
</div>`