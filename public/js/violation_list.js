$(function () {
    $('#my_modal').on('show.bs.modal', function (e) {
        var bookId = $(e.relatedTarget).data('book-id');
        $(e.currentTarget).find('input[name="resid"]').val(bookId);
    });
    $('#my_modal_reject').on('show.bs.modal', function (e) {
        var bookId = $(e.relatedTarget).data('book-id');
        $(e.currentTarget).find('input[name="rejid"]').val(bookId);
    });
    console.log("hello")
    $('.showvideomodal').on('click', function () {
        console.log($(this).attr('data-book-id'))
        videourl = $(this).attr('data-book-id')
        $('#modalvideotag').attr('src', videourl)
    })
    $('#example8').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': false,
        'ordering': false,
        'info': false,
        'autoWidth': true,
        "bSort": true,
        "scrollY": "60vh",
        "scrollCollapse": true
    })
    var table = document.getElementById("example8");
    if (table) {
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].childNodes[2].onclick = function () {
                tableText(this);
            };
        }
    }
    function tableText(tableRow) {
        console.log("*****************")
        //   var name = tableRow.childNodes[1].innerHTML;
        var image1 = tableRow.childNodes[0].src;
        //var image2 = tableRow.childNodes[1].src;
        var image2 = ''
        document.getElementById("violationimage1").src = image1;
        document.getElementById("violationimage2").src = image2;
    }
});
$('select[name="sitefilterviolation"]').change(function () {
    $thissitefilteroverview = $(this).val();
    var catID = $thissitefilteroverview;
    window.location = '/violations/data/' + catID + "?page=1";
});
function download_violation_list_report(a) {
    var nameArr = a.split(',');
    var newStr = a.split(", ").slice(1).join(", ");
    var sccauth_token = nameArr[0];
    var site_id = nameArr[1];
    var site_id = nameArr[1];
    var fromdate = $("#datepicker1").datepicker().val();
    var todate = $("#datepicker2").datepicker().val();
    var newfromdate = fromdate.split("-").reverse().join("-");
    var newtodate = todate.split("-").reverse().join("-");
    $("#close-button").click();
    //alert("Report is generating in some time, please do not refresh or reload the page!!!");
    $('#waitmodel').modal('show');
    $("#loadingscrollervioltn").css("display", "block");
    $("#sidebarspinner").css("display", "block");
    $("#headerspinner").css("display", "block");
    $("#navspinner").css("display", "block");
    $.get("/violations/data2/" + sccauth_token + "/" + site_id + "/" + fromdate + "/" + todate + '', function (data) {
        if (data) {
            msgFromServer = data.text;
            if (msgFromServer == "success") {
                newSiteName = data.sitename.split(" ").join("-");
                window.open(reportRedirect + "report/Smarg_" + newSiteName + "_Violation_Reports_" + newfromdate + "_" + newtodate + ".xls");
                $("#loadingscrollervioltn").css("display", "none");
                $("#sidebarspinner").css("display", "none");
                $("#headerspinner").css("display", "none");
                $("#navspinner").css("display", "none");
                $('#waitmodel').modal('hide');
            } else if (msgFromServer == "error") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscrollervioltn").css("display", "none");
                $("#sidebarspinner").css("display", "none");
                $("#headerspinner").css("display", "none");
                $("#navspinner").css("display", "none");
            } else if (msgFromServer == "undefined") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscrollervioltn").css("display", "none");
                $("#sidebarspinner").css("display", "none");
                $("#headerspinner").css("display", "none");
                $("#navspinner").css("display", "none");
            }
        }
    });
}
