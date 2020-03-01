components.personal = `<div class="container-fluied">
<header>
    <div class="banner"></div>
</header>
<section class="my-class-wrapper">
    <div class="my-class-contain ">
        <div class="my-class-title ">Lớp học của bạn</div>
        <div id="classList" class="d-flex flex-wrap flex-row justify-content-sm-between class-list">
            <div id="add-class" class="add-class d-flex align-items-center justify-content-around">
                <div style="text-align: center;">
                    <i class="fas fa-plus"></i> <br>
                    Thêm lớp học
                </div>
            </div>
        </div>
    </div>
    
</section>
</div>`

components.createClassForm = `<section class="create-class-form-wrapper d-flex justify-content-between">
<form class="create-class-form" id="create-class-form">
    <div class="mb-2">
        <span id="closeForm" style="cursor :pointer" aria-hidden="true">&times;</span>
        <span>Tạo lớp học mới</span>
    </div>
    <h1 for="className">Tên lớp học</h1>
    <div class="form-group">
        <input type="text" class="form-control"  name="nameClass" placeholder="Nhập tên lớp học của bạn">
        <small class="form-text text-muted">Tên lớp là bắt buộc</small>
        <div id="course-name-error" class="message-error"></div>
    </div>

    <h1 for="target">Mục tiêu khóa học</h1>
    <div class="form-group">
    <input type="text" class="form-control" id="target" name="targetCourse" placeholder="Nhập mục tiêu khóa học của bạn">
    </div>

    <h1>Thời gian học</h1>
    <div>
        <div class="form-group">
            <label for="lesson">Số buổi học</label>
            <input type="number" class="form-control" id="target" name="numberLesson" placeholder="Nhập số buổi học của khóa">
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
    <button id="form-add-class-btn" type="submit" class="btn btn-primary">Tạo lớp</button>
</form>
<div class="aside-right">

</div>
</section>`