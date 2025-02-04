$(function () {
    var table = document.getElementById("example8");
    if (table) {
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].childNodes[2].onclick = function () {
                tableTexteg8(this);
            };
        }
    }
    function tableTexteg8(tableRow) {
        document.getElementById("vehicleanpr_img").src = tableRow.childNodes[0].src;
    }
    $('select[name="sitefiltervehicleanpr"]').change(function () {
        var vehicleTypeDetails = $('select[name="vehicleTypeFilter"]').val();
        var thissitefilter = $(this).val().split(',')[0];
        if (vehicleTypeDetails == "4_Wheeler") {
            $("#vehiclelistdata").css("display", "block");
            $("#nodatafound").css("display", "none");
            window.location = '/vehiclelistanpr/data/' + thissitefilter + "?page=1";
        } else {
            var isTWReportingEnable = $(this).val().split(',')[2];
            // alert(isTWReportingEnable)
            if (isTWReportingEnable == '1') {
                $('#div_content').text("Please Generate Report");
                $('#generateReport').prop('disabled', false);
            } else {
                $('#div_content').text("Feature not support, Please contact at support@smargtech.com");
                $('#generateReport').prop('disabled', true);
            }
            $("#nodatafound").css("display", "block");
        }
    });
    $('select[name="vehicleTypeFilter"]').change(function () {
        var siteFilterValue = $('select[name="sitefiltervehicleanpr"]').val();
        var thissitefilter = siteFilterValue.split(',')[0];
        var vehicleTypeDetails = $(this).val()
        if (vehicleTypeDetails == "4_Wheeler") {
            $("#vehiclelistdata").css("display", "block");
            $("#nodatafound").css("display", "none");
            window.location = '/vehiclelistanpr/data/' + thissitefilter + "?page=1";
        } else {
            // alert("2 wheeler dropdown selected");
            $("#vehiclelistdata").css("display", "none");
            var isTWReportingEnable = siteFilterValue.split(',')[2];
            // alert(isTWReportingEnable)
            if (isTWReportingEnable == "1") {
                $('#div_content').text("Please Generate Report");
                $('#generateReport').prop('disabled', false);
            } else {
                $('#div_content').text("Feature not support, Please contact at support@smargtech.com");
                $('#generateReport').prop('disabled', true);
            }
            $("#nodatafound").css("display", "block");
        }
    });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchdata = urlParams.get('searchdata');
    const ordertypeanpr = urlParams.get('ordertypeanpr');
    const sortdataanpr = urlParams.get('sortdataanpr');
    const searchanpr = urlParams.get('searchanpr');
    if (sortdataanpr == "null" || sortdataanpr == null || sortdataanpr == "undefined" || sortdataanpr == undefined || sortdataanpr == "") {
        $('#DateTime .sort-orderdown').css("color", "black");
    } else {
        if (ordertypeanpr == 'des') {
            $('#' + sortdataanpr + ' .sort-orderdown').css("color", "black");
        } else if (ordertypeanpr == 'asc') {
            $('#' + sortdataanpr + ' .sort-orderup').css("color", "black");
        }
    }
    $("#txt-searchapnr").on("keydown", function search(e) {
        if (e.keyCode == 13) {
            var sortinganpr;
            var orderinganpr;
            if (sortdataanpr == null || sortdataanpr == '' | sortdataanpr == '*' || sortdataanpr == undefined || sortdataanpr == 'undefined') {
                sortinganpr = "DateTime";
                orderinganpr = "des";
            } else {
                sortinganpr = sortdataanpr;
                orderinganpr = ordertypeanpr;
            }
            var $thissitefilterid = $('select[name="sitefiltervehicleanpr"]').val().split(',');
            var thissitefilter = $thissitefilterid[0];
            var isimage = $thissitefilterid[1];
            var searchField = $(this).val();
            window.location = '/vehiclelistanpr/data/' + thissitefilter + '/?page=1&searchanpr=' + searchField + "&sortdataanpr=" + sortinganpr + "&ordertypeanpr=" + orderinganpr;
        }
    });
});
function download_parked_vehicle_report(a) {
    var nameArr = a.split(',');
    var newStr = a.split(", ").slice(1).join(", ");
    var sccauth_token = nameArr[0];
    var site_id = nameArr[1];
    var frmdt = $('#datepicker3data').val();
    var tdt = $('#datepicker4data').val();
    var newfromdate = frmdt.split("-").reverse().join("-");
    var newtodate = tdt.split("-").reverse().join("-");
    var vehicleTypeDetails = $('select[name="vehicleTypeFilter"]').val();
    console.log("vehicleTypeDetails 0080088  ====== ", vehicleTypeDetails)
    var velclelistanpr = $('select[name="sitefiltervehicleanpr"]').val().split(',');;
    var thissitefilter = velclelistanpr[0];
    $("#close-button").click();
    //alert("Report is generating in some time, please do not refresh or reload the page!!!");
    $('#waitmodel').modal('show');
    setTimeout(function () {
        $('#waitmodel').modal('hide');
    }, 4000);
    if (vehicleTypeDetails == "4_Wheeler") {
        console.log("Generate 4W report")
        $.ajax({
            url: "/vehiclelistanpr/data2/" + sccauth_token + "/" + site_id + "/" + frmdt + "/" + tdt + '',
            success: function (data) {
                // alert("4W repot generate successfull")
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log("Status: " + textStatus); alert("Error: " + errorThrown); alert("request == "+JSON.stringify(XMLHttpRequest));
            }
        });
    } else {
        console.log("Generate 2W report")
        $.ajax({
            url: "/vehiclelistanpr/twData/" + sccauth_token + "/" + site_id + "/" + frmdt + "/" + tdt + '',
            success: function (data) {
                // alert("2W repot generate successfull")
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log("Status: " + textStatus); alert("Error: " + errorThrown); alert("request == "+JSON.stringify(XMLHttpRequest));
            }
        });
    }
}
