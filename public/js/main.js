// *******************************ADMIN******************************** //
// Greating
var h = new Date().getHours();
var greeting;
if (h < 12) {
    greeting = "Good Morning";
} else if (h < 18) {
    greeting = "Good Afternoon";
} else {
    greeting = "Good Evening";
}
$("#greeting").text(greeting);

// Print
$("#export").click(function () {
    window.location.href = "http://localhost:8000/user/print";
});
$(".print").click(function () {
    $("#printDateText").text($("#printDateSelect").val());
    window.print();
});
$(".revisi").keyup(function (event) {
    $("#noRevisi").text(event.target.value);
});

// Off-Canvas
try {
    (function ($) {
        "use strict";
        $(function () {
            $('[data-bs-toggle="offcanvas"]').on("click", function () {
                $(".sidebar-offcanvas").toggleClass("active");
            });
        });
    })(jQuery);
} catch (error) {}

try {
    // Data Tables
    $(document).ready(function () {
        $(".datatables").DataTable({
            responsive: true,
            scrollX: true,
            order: [[0, "asc"]],
        });

        $(".datatablesActivity").DataTable({
            responsive: true,
            scrollX: true,
            order: [[2, "desc"]],
        });

        $(".datatablesExportExcel").DataTable({
            responsive: true,
            scrollX: true,
            order: [[4, "asc"]],
            dom: "Bfrtip",
            buttons: [
                {
                    extend: "excel",
                    text: "Export to Excel",
                    title: "Training Realization - Individual Training Plan",
                    className: "btn-warning fw-bold btn-sm",
                },
            ],
        });

        $(".datatablesExport").DataTable({
            responsive: true,
            scrollX: true,
            dom: "Bfrtip",
            ordering: false,
            columnDefs: [{ orderable: false, targets: 0 }],
            buttons: [
                {
                    extend: "excel",
                    text: "Export to Excel",
                    title: "Audit Trail - Individual Training Plan",
                    className: "btn-warning fw-bold btn-sm rounded-pill",
                },
                {
                    extend: "pdf",
                    text: "Export to PDF",
                    title: "Audit Trail - Individual Training Plan",
                    className: "btn-warning fw-bold btn-sm mx-2 rounded-pill",
                },
            ],
        });
    });

    function checkbox() {
        console.log($("#count").val());
        if ($(".check-item:checked").length == 0) {
            $(".submit").prop("disabled", true);
            $("#checkAll").prop("checked", false);
            $("#labelCheck").text("Checked");
        } else if ($(".check-item:checked").length > 0) {
            $(".submit").prop("disabled", false);
            $("#checkAll").prop("checked", true);
            $("#labelCheck").text("Unchecked");
        } else {
            $(".submit").prop("disabled", false);
        }
    }

    $("#checkAll").click(function () {
        if ($("#checkAll").prop("checked")) {
            $(".check-item").prop("checked", true);
            $("#labelCheck").text("Unchecked");
        } else {
            $(".check-item").prop("checked", false);
            $("#labelCheck").text("Checked");
        }
        checkbox();
    });

    $(".check-item").change(function () {
        checkbox();
    });
} catch (error) {}

// Action Fullfilment
$(".idAction").click(function () {
    var id = $(this).data("id");
    $("#idAction").val(id);
});

// input date
try {
    let inputDate = document.getElementById("date");
    let today = new Date().toISOString().split("T")[0];
    inputDate.value = today;
} catch (error) {}

// Delete Training Modal
$(".delete").click(function () {
    var id = $(this).data("id");
    $("#id").val(id);
});

// Add Year PDF
$("#btnPdf").click(function () {
    $("#pdfYear").val(sessionStorage.getItem("selected"));
});

//Add Video
$("#addVideo").click(function () {
    $("#videoId").val($("#video").data("id") ?? null);
    if ($("#videoId").val()) {
        $("#text-header-video").text("Update Video");
    }
});

//Add Photo Profile
$("#photoProfile").click(function () {
    $(".photos").attr("src", $(".photoProfile").attr("src"));
});

// Just Null A Value
$("#addTraining").click(function () {
    $("#text-header").text("Add Course");
    $("#text-submit").text("Add Course");
    $("#idCourse").val(null);
    $("#title").val(null);
    $("#title").prop("readonly", false);
    $("#target").val(null);
    $("#duration").val(null);
});

$("#addEmployee").click(function () {
    $("#text-header").text("Add Employee");
    $("#text-submit").text("Add Employee");
    $("#employeeId").val(null);
    $("#employeeName").val(null);
    $("#email").val(null);
    $("#jobTitle").val(null);
    $("#jobLevel").val(null);
    $("#report").val(null);
    $("#organization").val(null);
    $("#employmentId").val(null);
});

// Ajax
$(".update").click(function () {
    var id = $(this).data("id");
    $("#text-header").text("Update Course");
    $("#text-submit").text("Update Course");
    $("#idCourse").val(id);
    $.ajax({
        url: "http://localhost:8000/api/course/getCourseById/" + id,
        method: "GET",
        dataType: "json",
    }).done(function (data) {
        $("#title").val(data.title);
        $("#title").prop("readonly", true);
        $("#targetInformation").val(
            data.target
                .toLowerCase()
                .replace(/karyawan level (\d{1,2}-\d{1,2}|\d{1,2})/g, "")
                .trim()
        );
        if (data.level == 1) $("#1").prop("selected", true);
        if (data.level == 2) $("#2").prop("selected", true);
        if (data.level == 3) $("#3").prop("selected", true);
        if (data.level == 4) $("#4").prop("selected", true);
        if (data.level == 5) $("#5").prop("selected", true);
        $("#duration").val(data.duration);
        if (data.refresh == 2) {
            $("#refreshment").prop("checked", true);
        } else {
            $("#refreshment").prop("checked", false);
        }
    });
});

$(".approveModal").click(function () {
    var id = $(this).data("id");
    $.ajax({
        url: "http://localhost:8000/api/approve/getApproveDetail/" + id,
        method: "GET",
        dataType: "json",
        beforeSend: function () {
            $("#preload").show();
            $("#table-approve").hide();
        },
    }).done(function (data) {
        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date0 = new Date(data.date[0]);
        let date1 = new Date(data.date[1]);
        let date2 = new Date(data.date[2]);
        let date3 = new Date(data.date[3]);
        $("#preload").hide();
        $("#table-approve").show();
        $("#approve1").text(data.name[0]);
        $("#date1").text(
            !isNaN(date0)
                ? date0.getDate() +
                      "-" +
                      monthNames[date0.getMonth()] +
                      "-" +
                      date0.getFullYear() +
                      " " +
                      date0.getHours().toString().padStart(2, "0") +
                      ":" +
                      date0.getMinutes().toString().padStart(2, "0") +
                      ":" +
                      date0.getSeconds().toString().padStart(2, "0")
                : "N/A"
        );
        $("#approve2").text(data.name[1]);
        $("#date2").text(
            !isNaN(date1)
                ? date1.getDate() +
                      "-" +
                      monthNames[date1.getMonth()] +
                      "-" +
                      date1.getFullYear() +
                      " " +
                      date1.getHours().toString().padStart(2, "0") +
                      ":" +
                      date1.getMinutes().toString().padStart(2, "0") +
                      ":" +
                      date1.getSeconds().toString().padStart(2, "0")
                : "N/A"
        );
        $("#approve3").text(data.name[2]);
        $("#date3").text(
            !isNaN(date2)
                ? date2.getDate() +
                      "-" +
                      monthNames[date2.getMonth()] +
                      "-" +
                      date2.getFullYear() +
                      " " +
                      date2.getHours().toString().padStart(2, "0") +
                      ":" +
                      date2.getMinutes().toString().padStart(2, "0") +
                      ":" +
                      date2.getSeconds().toString().padStart(2, "0")
                : "N/A"
        );
        $("#approve4").text(data.name[3]);
        $("#date4").text(
            !isNaN(date3)
                ? date3.getDate() +
                      "-" +
                      monthNames[date3.getMonth()] +
                      "-" +
                      date3.getFullYear() +
                      " " +
                      date3.getHours().toString().padStart(2, "0") +
                      ":" +
                      date3.getMinutes().toString().padStart(2, "0") +
                      ":" +
                      date3.getSeconds().toString().padStart(2, "0")
                : "N/A"
        );
    });
});

$(".activeDeactiveSwitch").click(function () {
    var id = $(this).data("id");
    if (!$(this).prop("checked")) {
        $.ajax({
            url: "http://localhost:8000/api/course/deactive/" + id,
            method: "GET",
        }).done(function () {
            $(this).prop("checked", false);
        });
    } else {
        $.ajax({
            url: "http://localhost:8000/api/course/active/" + id,
            method: "GET",
        }).done(function () {
            $(this).prop("checked", true);
        });
    }
});

// disable button
$(".form").submit(function (e) {
    $(".submitForm").prop("disabled", true);
});
$(".submitButton").click(function () {
    $(this).hide();
});
$(".submitButtonTraining").click(function () {
    $(".submitButtonTraining").hide();
});

$(".idAction").click(function () {
    $(".submitButtonTraining").prop("disabled", true);
    $("#note").keyup(function () {
        if ($("#note").val()) {
            $(".submitButtonTraining").prop("disabled", false);
        } else {
            $(".submitButtonTraining").prop("disabled", true);
        }
    });
});

//Null value
$("#employee").click(function () {
    $(this).val("");
});

$("#employee").change(function () {
    $("#activity").val("ALL");
    $("#startTime").val(null);
    $("#endTime").val(null);
    $("#startDate").val(null);
    $("#endDate").val(null);
});

// notification
setTimeout(function () {
    $("#successNotification").hide();
}, 1400);

// Text print year
$("#textYear").text(sessionStorage.getItem("selected"));

//Store to Local Storage
$("#searchYear").click(function () {
    sessionStorage.setItem("selected", $("#year").val());
});

var url = window.location.href.indexOf("?year=20") !== -1;
if (!url) {
    sessionStorage.clear();
}

if ($("#textYear").text() == "") $("#textYear").text(new Date().getFullYear() + 1);

savedYear = sessionStorage.getItem("selected");
$("#year").val(savedYear || "Year");
