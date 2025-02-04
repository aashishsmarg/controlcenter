



$thisdatefilter = '';
$thissitefilter = '';
$thisVehicleTypefilter = '';
var start_time = '';
var end_time = '';
$analyticsversion = '';
$vehicledashboardversion= '';
$two_w_vehicledashboardversion= '';

$thisdatefilter = $('select[name="datefilter"]').val(); /* date String value like Today, yester Etc, */

// On Page Load Function 
$(function () {
   sitefilter();
});



// Fetch Site Value 
function sitefilter()
{

    // var sit_id = document.getElementById('sitef').selectedOptions[0].value;
    var sit_id = $('select[name="sitefilter"]').val();
    // alert("sit_id"+sit_id);
    var retailarray1 = sit_id.split(',');3
    $thissitefilter = retailarray1[0];
    $analyticsversion = retailarray1[1];
    start_time = retailarray1[2];
    end_time = retailarray1[3];
    $vehicledashboardversion = retailarray1[4]
    $two_w_vehicledashboardversion = retailarray1[5]
}




// Fetch Date Formate Value 
function yesterday(interval) {
    let d = new Date();
    d.setDate(d.getDate() - interval);
    return d.toISOString().split('T')[0];
};



function vehicelTypefilter() {

    $thisVehicleTypefilter = $('select[name="vehicleTypeFilter"]').val();
    // alert("thisVehicleTypefilter  ====  "+$thisVehicleTypefilter);
    return $thisVehicleTypefilter
    //alert($thisVehicleTypefilter)

}

// Fetch From-To Date String  Value 
function datefilter() {
    $thisdatefilter = $('select[name="datefilter"]').val();
    if($thisdatefilter == "custom")
    {
        $modal = $('#custom');
        $modal.modal('show');
        return "custom";
    }
    else
    {
	$(".frmtodivdata").css("display","none");
        if ($thisdatefilter == "today") {
        localStorage.setItem("datefilter","today");
        $thisdatefilter = "from:'" + yesterday(0) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
        var starttime = start_time.slice(0, 2);
        var endti = end_time.slice(0, 2);
        if (endti - starttime <= 0) {
            $thisdatefilter = "from:'" + yesterday(0) + "T" + start_time + "Z',to:'" + yesterday(-1) + "T" + end_time + "Z'";
        }
    }
    if ($thisdatefilter == "yesterday") {
        localStorage.setItem("datefilter","yesterday");
        $thisdatefilter = "from:'" + yesterday(1) + "T" + start_time + "Z',to:'" + yesterday(1) + "T" + end_time + "Z'";
        var starttime = start_time.slice(0, 2);
        var endti = end_time.slice(0, 2);
        if (endti - starttime <= 0) {
            $thisdatefilter = "from:'" + yesterday(1) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
        }
    }
    if ($thisdatefilter == "week") {
        localStorage.setItem("datefilter","week");
        $thisdatefilter = "from:'" + yesterday(7) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
        var starttime = start_time.slice(0, 2);
        var endti = end_time.slice(0, 2);
        if (endti - starttime <= 0) {
            $thisdatefilter = "from:'" + yesterday(7) + "T" + start_time + "Z',to:'" + yesterday(-1) + "T" + end_time + "Z'";
        }
    }
    if ($thisdatefilter == "thismonth") {
        localStorage.setItem("datefilter","thismonth");
        $thisdatefilter = "from:'" + yesterday(30) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
        var starttime = start_time.slice(0, 2);
        var endti = end_time.slice(0, 2);
        if (endti - starttime <= 0) {
            $thisdatefilter = "from:'" + yesterday(30) + "T" + start_time + "Z',to:'" + yesterday(-1) + "T" + end_time + "Z'";
        }
    }
    if ($thisdatefilter == "3month") {
        localStorage.setItem("datefilter","3month");
        $thisdatefilter = "from:'" + yesterday(90) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
        var starttime = start_time.slice(0, 2);
        var endti = end_time.slice(0, 2);
        if (endti - starttime <= 0) {
            $thisdatefilter = "from:'" + yesterday(90) + "T" + start_time + "Z',to:'" + yesterday(-1) + "T" + end_time + "Z'";
        }
    }
    if ($thisdatefilter == "6month") {
        localStorage.setItem("datefilter","6month");
        $thisdatefilter = "from:'" + yesterday(180) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
        var starttime = start_time.slice(0, 2);
        var endti = end_time.slice(0, 2);
        if (endti - starttime <= 0) {
            $thisdatefilter = "from:'" + yesterday(180) + "T" + start_time + "Z',to:'" + yesterday(-1) + "T" + end_time + "Z'";
        } else {
            return $thisdatefilter
        }
    }
    return $thisdatefilter
}
}


function formatecustomdate()
{
    
}


function canclebtnclick()
{
    var datefilter_val = localStorage.getItem("datefilter");
    $(".datefilter").val(datefilter_val);
    $('.datefilter').trigger('change');
}

