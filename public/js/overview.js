$(function () {
    $('#example2').DataTable({
        'paging': true,
        'lengthChange': false,
        'searching': false,
        'ordering': true,
        'info': true,
        'autoWidth': true,
        "bSort": true,
        // scrollCollapse: true,
        // scrollY: '656px',
        pageLength: 6

        // "scrollY": "40%",
        // "scrollCollapse": true
    });
});
$('select[name="sitefilter"]').change(function () {
    $thissitefilteroverview = $(this).val();
    var siteid = $thissitefilteroverview;
    window.location = '/overview/data/' + siteid;
});
$(function () {
    $(document).on("click", ".vehicleanpr", function () {
        tableTexteg8(this);
    });
    $(document).on("click", ".vehicleanpr2", function () {
        tableTexteg9(this);
    });
    var table = document.getElementById("example2");
    
    if (table) {
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].childNodes[5].onclick = function () {
                console.log("row data", table);
                tableTexteg8(this);
            };
            table.rows[i].childNodes[6].onclick = function () {
                tableTexteg9(this);
            };
        }
    }
    function tableTexteg8(tableRow) {
        console.log(tableRow.childNodes[0].src)
        document.getElementById("overview_img").src = tableRow.childNodes[0].src;
    }
    function tableTexteg9(tableRow) {
        console.log(tableRow.childNodes[0].src)
        document.getElementById("overview_img2").src = tableRow.childNodes[0].src;
    }
});
