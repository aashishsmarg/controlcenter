//var exec = require('child_process').exec;
var reportRedirect = "https://smargtech.in:3004/"
var kibanaurl = "https://smargtech.in:32635/app/kibana#/";
var kibanaurl2 = "https://smargtech.in:32635/app/dashboards#/";
// var reportRedirect = "http://60.254.111.54:3000/"
// var kibanaurl = "http://60.254.111.54:32635/app/kibana#/";
// var kibanaurl2 = "http://60.254.111.54:32635/app/dashboards#/";
var $thisdatefilter = '';
//var kibanaurl = "https://smargtech.in:32635/app/kibana#/";
// var reportRedirect="http://44.235.236.183:3004/" 
// var kibanaurl = "http://44.235.236.183:5602/app/kibana#/";
//var kibanaurl = "http://178.128.249.67:32635/app/kibana#/";
//var reportRedirect = "http://178.128.249.67:3002/"
$(function () {
    $(".dropdowncolor").select2({
        minimumResultsForSearch: -1
    });
    $('#datepicker1').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    $('#datepicker2').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    $('#datepicker3').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    $('#datepicker4').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    $('#datepicker5,#datepicker7,#datepicker9,#datepicker11').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    $('#datepicker6,#datepicker8,#datepicker10,#datepicker12').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    $('#from').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    $('#to').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    $('#fromov').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    $('#toov').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');
    var table = document.getElementById("example4");
    if (table) {
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].childNodes[2].onclick = function () {
                tableText(this);
            };
        }
    }
    function tableText(tableRow) {
        //   var name = tableRow.childNodes[1].innerHTML;
        var image1 = tableRow.childNodes[0].src;
        //var image2 = tableRow.childNodes[1].src;
        var image2 = ''
        document.getElementById("violationimage1").src = image1;
        document.getElementById("violationimage2").src = image2;
    }
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
    $('#example1').DataTable()
    $('#example2').DataTable({
        'paging': true,
        'lengthChange': false,
        'searching': false,
        'ordering': true,
        'info': true,
        'autoWidth': true,
        "bSort": true,
        "scrollY": "52vh",
        "scrollCollapse": true
    });
    $('#example4').DataTable({
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
    //kibanaurl=kibanaurl2
    //var sit_id = document.getElementById('sit_id');
    $thisdatefilter = $('select[name="datefilter"]').val();
    var url = window.location.pathname
    $thissitefilterdata = $('select[name="sitefilter"]').val();
    if ($thissitefilterdata == 'null' || $thissitefilterdata == undefined || $thissitefilterdata == '$thissitefilterdata') {
        $thissitefilter = '';
        var analyticsversion = '';
        var vehicledashboardversion = '';
    } else {
        var retailarray = $thissitefilterdata.split(',');
        $thissitefilter = retailarray[0];
        var analyticsversion = retailarray[1];
        var start_time = retailarray[2];
        var end_time = retailarray[3];
        var vehicledashboardversion = retailarray[4]
        var today = new Date();
        var date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
        function yesterday(interval) {
            let d = new Date();
            d.setDate(d.getDate() - interval);
            return d.toISOString().split('T')[0];
        };
    }
    function datefi($thisdatefilter, start_time, end_time) {
        if (url == "/dashboard") {
            var sitid = document.getElementById('sit_id');
            var sitid = sitid.innerText;
            // if (sitid == "1") {
            // } else {
            //     start_time = "06:00:00"
            //     end_time = "03:00:00"
            // }
        }
        if ($thisdatefilter == "today") {
            $thisdatefilter = "from:'" + yesterday(0) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
            var starttime = start_time.slice(0, 2);
            var endti = end_time.slice(0, 2);
            console.log(starttime)
            console.log(endti)
            if (endti - starttime <= 0) {
                console.log(endti - starttime)
                $thisdatefilter = "from:'" + yesterday(0) + "T" + start_time + "Z',to:'" + yesterday(-1) + "T" + end_time + "Z'";
                console.log($thisdatefilter)
            }
        }
        if ($thisdatefilter == "yesterday") {
            $thisdatefilter = "from:'" + yesterday(1) + "T" + start_time + "Z',to:'" + yesterday(1) + "T" + end_time + "Z'";
            var starttime = start_time.slice(0, 2);
            var endti = end_time.slice(0, 2);
            if (endti - starttime <= 0) {
                $thisdatefilter = "from:'" + yesterday(1) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
            }
        }
        if ($thisdatefilter == "week") {
            $thisdatefilter = "from:'" + yesterday(7) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
            var starttime = start_time.slice(0, 2);
            var endti = end_time.slice(0, 2);
            if (endti - starttime <= 0) {
                $thisdatefilter = "from:'" + yesterday(7) + "T" + start_time + "Z',to:'" + yesterday(-1) + "T" + end_time + "Z'";
            }
        }
        if ($thisdatefilter == "thismonth") {
            $thisdatefilter = "from:'" + yesterday(30) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
            var starttime = start_time.slice(0, 2);
            var endti = end_time.slice(0, 2);
            if (endti - starttime <= 0) {
                $thisdatefilter = "from:'" + yesterday(30) + "T" + start_time + "Z',to:'" + yesterday(-1) + "T" + end_time + "Z'";
            }
        }
        if ($thisdatefilter == "3month") {
            $thisdatefilter = "from:'" + yesterday(90) + "T" + start_time + "Z',to:'" + yesterday(0) + "T" + end_time + "Z'";
            var starttime = start_time.slice(0, 2);
            var endti = end_time.slice(0, 2);
            if (endti - starttime <= 0) {
                $thisdatefilter = "from:'" + yesterday(90) + "T" + start_time + "Z',to:'" + yesterday(-1) + "T" + end_time + "Z'";
            }
        }
        if ($thisdatefilter == "6month") {
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
    $thisdatefilter = datefi($thisdatefilter, start_time, end_time);
    if (url == "/footfalltrend") {
        alert("$thisdatefilter" + $thisdatefilter);
        //$("#zonebucket").attr("src", kibanaurl + "visualize/edit/6bdfa510-5e7b-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:0),time:("+ $thisdatefilter + "))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:NotificationType,negate:!f,params:(query:'7'),type:phrase),query:(match_phrase:(NotificationType:'7'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:OverAllCount.keyword,negate:!f,params:(query:Person),type:phrase),query:(match_phrase:(OverAllCount.keyword:Person))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:isViolation,negate:!f,params:(query:'0'),type:phrase),query:(match_phrase:(isViolation:'0'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Direction.keyword,negate:!f,params:(query:IN),type:phrase),query:(match_phrase:(Direction.keyword:IN)))),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'2',params:(field:Zone.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:segment,type:terms),(enabled:!t,id:'3',params:(field:DateTime,ranges:!((from:now-1w%2Fw,to:now),(from:now-2w%2Fw,to:now-1w%2Fw))),schema:group,type:date_range)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:Count),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:Count),type:value))),title:zone_bucket,type:histogram))");
        if (analyticsversion == 'v1.0.0') {
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/0fc02d50-d672-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.0,viewMode:view)&hide-filter-bar=true");
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
        } else if (analyticsversion == 'v1.0.1' || analyticsversion == 'v1.1.0') {
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/73867b20-78e1-11eb-9090-8fcb9b0c766e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.1,viewMode:view)&hide-filter-bar=true");
        } else if (analyticsversion == 'v1.2.0') {
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/96fb49a0-ce6d-11eb-bcee-1f847a63e7e4?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
        } else if (analyticsversion == 'v1.2.1') {
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/a7cfccd0-1452-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
        } else if (analyticsversion == 'v1.2.2') {
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/07e819a0-4e7e-11ec-be91-8311423b8dce?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
        } else if (analyticsversion == 'v0.0.0') {
            $("#rtailanalytics").css("display", "none");
            $("#retadivnew").css("visibility", "visible");
            $("#retadivnew").css("display", "block");
        }
    }
    /**Vehcile dashboard configs */
    var url = window.location.pathname
    if (url == "/vehicleanalytics") {
        if (vehicledashboardversion == 'v1.0.0') {
            $("#vehicdivnew").css("visibility", "hidden");
            $("#vehicdivnew").css("display", "hidden");
            $("#vehicanalytics").attr("src", kibanaurl + "dashboard/ec8ad6f0-56a4-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.1.0,viewMode:view)&hide-filter-bar=true");
        } else if (vehicledashboardversion == 'v1.2.0') {
            $("#vehicdivnew").css("visibility", "hidden");
            $("#vehicdivnew").css("display", "hidden");
            $("#vehicanalytics").attr("src", kibanaurl + "dashboard/02630880-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
        } else if (vehicledashboardversion == 'v1.2.1') {
            $("#vehicdivnew").css("visibility", "hidden");
            $("#vehicdivnew").css("display", "hidden");
            $("#vehicanalytics").attr("src", kibanaurl + "dashboard/185f3cd0-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
        } else if (vehicledashboardversion == 'v1.2.2') {
            $("#vehicdivnew").css("visibility", "hidden");
            $("#vehicdivnew").css("display", "hidden");
            $("#vehicanalytics").attr("src", kibanaurl + "dashboard/477b2c90-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
        } else if (vehicledashboardversion == 'v0.0.0') {
            $("#vehicanalytics").css("display", "none");
            $("#vehicdivnew").css("display", "block");
            $("#vehicdivnew").css("visibility", "visible");
        }
    }
    // if (url == "/tractionanalysis") 
    // {
    // }
    $eventfilter = $('select[name="eventfilter"]').val();
    if (window.location.href.indexOf("tractionanalysis") != -1) {
        $eventfilter = $('select[name="eventfilter"]').val();
        if ($eventfilter == 0) {
            $(".reportdisable *").attr("disabled", "disabled").off('click');
            $(".reportdisable").css('pointer-events', 'none');
        }
        console.log("  $thisdatefilter ==  " + $thisdatefilter + "  $thissitefilter  = " + $thissitefilter + "   $eventfilter =     " + $eventfilter);
        traction_analytics_dashboard($thisdatefilter, $thissitefilter, $eventfilter, 0)
        // window.location = '/tractionanalysis/data/' + $thissitefilter;
    }
    if (window.location.href.indexOf("screentrends") != -1) {
        console.log("  $thisdatefilter ==  " + $thisdatefilter + "  $thissitefilter  = " + $thissitefilter);
        if (vehicledashboardversion == 'v0.0.0') {
            $("#adanalytics").css("display", "none");
            $("#screentrendivnew").css("display", "block");
            $("#screentrendivnew").css("visibility", "visible");
        }
        else {
            screen_trend_dashboard($thisdatefilter, $thissitefilter)
        }
    }
    if (window.location.href.indexOf("addashboard") != -1) {
        console.log("  $thisdatefilter ==  " + $thisdatefilter + "  $thissitefilter  = " + $thissitefilter);
        if (vehicledashboardversion == 'v0.0.0') {
            $("#addashboard").css("display", "none");
            $("#adddivnew").css("display", "block");
            $("#adddivnew").css("visibility", "visible");
        }
        else {
            advertisment_dashboard($thisdatefilter, $thissitefilter)
        }
    }
    if (window.location.href.indexOf("offeranalytics") != -1) {
        console.log("  $thisdatefilter ==  " + $thisdatefilter + "  $thissitefilter  = " + $thissitefilter);
        if (vehicledashboardversion == 'v0.0.0') {
            $("#offeranalytics").css("display", "none");
            $("#offerdivnew").css("display", "block");
            $("#offerdivnew").css("visibility", "visible");
        }
        else {
            offer_trend_dashboard($thisdatefilter, $thissitefilter)
        }
    }
    alert("$thisdatefilter" + $thisdatefilter);
    $("#violationdata").attr("src", kibanaurl + "dashboard/d886ff60-d6d7-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:ViolationData,viewMode:view)&hide-filter-bar=true");
    //$("#dashboarddata").attr("src", kibanaurl + "dashboard/a1b4c920-d657-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(from:now-5y,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'Total%20Data',viewMode:view)&hide-filter-bar=true");
    var url = window.location.pathname
    if (url == "/dashboard") {
        var siteValuesArray = Array.from(document.getElementById("sitef").options).map(e => e.value);
        var sitid = document.getElementById('sit_id');
        var sitid = sitid.innerText;
        if (sitid == "1") {
            $("#dashboarddata").attr("src", kibanaurl + "dashboard/a1b4c920-d657-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'Total%20Data',viewMode:view)&hide-filter-bar=true");
        } else {
            siteIdAr = ""
            siteMatch = ''
            for (i = 0; i < siteValuesArray.length; i++) {
                siteMatch = siteMatch + "(match_phrase:(SiteId:'" + siteValuesArray[i].split(',')[0] + "'))"
                siteIdAr = siteIdAr + "'" + siteValuesArray[i].split(',')[0] + "'";
                if (i + 1 != siteValuesArray.length) {
                    siteIdAr = siteIdAr + ","
                    siteMatch = siteMatch + ","
                }
            }
            $("#dashboarddata").attr("src", kibanaurl + "dashboard/355ff920-112f-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:!(" + siteIdAr + "),type:phrases),query:(bool:(minimum_should_match:1,should:!(" + siteMatch + "))))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:Sitedata_Dashboard,viewMode:view)&hide-filter-bar=true");
            //$("#dashboarddata").attr("src", kibanaurl + "dashboard/355ff920-112f-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter +"))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:Sitedata_Dashboard,viewMode:view)&hide-filter-bar=true");
        }
    }
    $("#systemhealth").attr("src", kibanaurl + "dashboard/5fa17450-4fdf-11eb-8956-c7a4b2510cdb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'System%20Health%20Graph',viewMode:view)&hide-filter-bar=true");
    //$("#systemhealth").attr("src", kibanaurl +  "dashboard/5fa17450-4fdf-11eb-8956-c7a4b2510cdb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'System%20Health%20Graph',viewMode:view)&hide-filter-bar=true");
    $('select[name="datefilter"]').change(function () {
        $thisdatefilter = $(this).val();
        if ($thisdatefilter == "custom") { } else {
            localStorage.removeItem("custo");
            $("#frto").css("display", "none");
            $("#tdo").css("display", "none");
            var url = window.location.pathname
            $thisdatefilter = $(this).val();
            var sit_id = document.getElementById('sitef').selectedOptions[0].value;
            var retailarray1 = sit_id.split(',');
            $thissitefilter = retailarray1[0];
            analyticsversion = retailarray1[1];
            var strt_time = retailarray1[2];
            var ed_time = retailarray1[3];
            $thisdatefilter = datefi($thisdatefilter, strt_time, ed_time);
            //}
            var url = window.location.pathname
            if (url == "/footfalltrend") {
                //$("#zonebucket").attr("src", kibanaurl + "visualize/edit/6bdfa510-5e7b-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:0),time:("+ $thisdatefilter + "))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:NotificationType,negate:!f,params:(query:'7'),type:phrase),query:(match_phrase:(NotificationType:'7'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:OverAllCount.keyword,negate:!f,params:(query:Person),type:phrase),query:(match_phrase:(OverAllCount.keyword:Person))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:isViolation,negate:!f,params:(query:'0'),type:phrase),query:(match_phrase:(isViolation:'0'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Direction.keyword,negate:!f,params:(query:IN),type:phrase),query:(match_phrase:(Direction.keyword:IN)))),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'2',params:(field:Zone.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:segment,type:terms),(enabled:!t,id:'3',params:(field:DateTime,ranges:!((from:now-1w%2Fw,to:now),(from:now-2w%2Fw,to:now-1w%2Fw))),schema:group,type:date_range)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:Count),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:Count),type:value))),title:zone_bucket,type:histogram))");
                if (analyticsversion == 'v1.0.0') {
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/0fc02d50-d672-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.0,viewMode:view)&hide-filter-bar=true");
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                } else if (analyticsversion == 'v1.0.1' || analyticsversion == 'v1.1.0') {
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/73867b20-78e1-11eb-9090-8fcb9b0c766e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.1,viewMode:view)&hide-filter-bar=true");
                } else if (analyticsversion == 'v1.2.0') {
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/96fb49a0-ce6d-11eb-bcee-1f847a63e7e4?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
                } else if (analyticsverzsion == 'v1.2.1') {
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/a7cfccd0-1452-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
                } else if (analyticsversion == 'v1.2.2') {
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/07e819a0-4e7e-11ec-be91-8311423b8dce?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
                } else if (analyticsversion == 'v0.0.0') {
                    $("#rtailanalytics").css("display", "none");
                    $("#retadivnew").css("display", "block");
                    $("#retadivnew").css("visibility", "visible");
                }
            }
            /**Vehcile dashboard configs */
            var url = window.location.pathname
            if (url == "/vehicleanalytics") {
                if (vehicledashboardversion == 'v1.0.0') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/ec8ad6f0-56a4-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.1.0,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v1.2.0') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/02630880-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v1.2.1') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/185f3cd0-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v1.2.2') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/477b2c90-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v0.0.0') {
                    $("#vehicanalytics").css("display", "none");
                    $("#vehicdivnew").css("display", "block");
                    $("#vehicdivnew").css("visibility", "visible");
                }
            }
            var url = window.location.pathname
            if (url == "/vehicleanalytics") {
                if (vehicledashboardversion == 'v1.0.0') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/ec8ad6f0-56a4-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.1.0,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v1.2.0') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/02630880-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v1.2.1') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/185f3cd0-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v1.2.2') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/477b2c90-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v0.0.0') {
                    $("#vehicanalytics").css("display", "none");
                    $("#vehicdivnew").css("display", "block");
                    $("#vehicdivnew").css("visibility", "visible");
                }
            }
            $eventfilter = $('select[name="eventfilter"]').val();
            if (window.location.href.indexOf("tractionanalysis") != -1) {
                $eventfilter = $('select[name="eventfilter"]').val();
                if ($eventfilter == 0) {
                    $(".reportdisable *").attr("disabled", "disabled").off('click');
                    $(".reportdisable").css('pointer-events', 'none');
                }
                traction_analytics_dashboard($thisdatefilter, $thissitefilter, $eventfilter, 0)
                // window.location = '/tractionanalysis/data/' + $thissitefilter;       
            }
            if (window.location.href.indexOf("screentrends") != -1) {
                console.log("  $thisdatefilter ==  " + $thisdatefilter + "  $thissitefilter  = " + $thissitefilter);
                if (vehicledashboardversion == 'v0.0.0') {
                    $("#adanalytics").css("display", "none");
                    $("#screentrendivnew").css("display", "block");
                    $("#screentrendivnew").css("visibility", "visible");
                }
                else {
                    screen_trend_dashboard($thisdatefilter, $thissitefilter)
                }
            }
            if (window.location.href.indexOf("offeranalytics") != -1) {
                console.log("  $thisdatefilter ==  " + $thisdatefilter + "  $thissitefilter  = " + $thissitefilter);
                if (vehicledashboardversion == 'v0.0.0') {
                    $("#offeranalytics").css("display", "none");
                    $("#offerdivnew").css("display", "block");
                    $("#offerdivnew").css("visibility", "visible");
                }
                else {
                    offer_trend_dashboard($thisdatefilter, $thissitefilter)
                }
            }
            $("#violationdata").attr("src", kibanaurl + "dashboard/d886ff60-d6d7-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:ViolationData,viewMode:view)&hide-filter-bar=true");
            var url = window.location.pathname
            if (url == "/dashboard") {
                var siteValuesArray = Array.from(document.getElementById("sitef").options).map(e => e.value);
                var sitid = document.getElementById('sit_id');
                var sitid = sitid.innerText;
                if (sitid == "1") {
                    $("#dashboarddata").attr("src", kibanaurl + "dashboard/a1b4c920-d657-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'Total%20Data',viewMode:view)&hide-filter-bar=true");
                } else {
                    siteIdAr = ""
                    siteMatch = ''
                    for (i = 0; i < siteValuesArray.length; i++) {
                        siteMatch = siteMatch + "(match_phrase:(SiteId:'" + siteValuesArray[i].split(',')[0] + "'))"
                        siteIdAr = siteIdAr + "'" + siteValuesArray[i].split(',')[0] + "'";
                        if (i + 1 != siteValuesArray.length) {
                            siteIdAr = siteIdAr + ","
                            siteMatch = siteMatch + ","
                        }
                    }
                    $("#dashboarddata").attr("src", kibanaurl + "dashboard/355ff920-112f-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:!(" + siteIdAr + "),type:phrases),query:(bool:(minimum_should_match:1,should:!(" + siteMatch + "))))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:Sitedata_Dashboard,viewMode:view)&hide-filter-bar=true");
                    //$("#dashboarddata").attr("src", kibanaurl + "dashboard/355ff920-112f-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter +"))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:Sitedata_Dashboard,viewMode:view)&hide-filter-bar=true");
                }
            }
            $("#systemhealth").attr("src", kibanaurl + "dashboard/5fa17450-4fdf-11eb-8956-c7a4b2510cdb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'System%20Health%20Graph',viewMode:view)&hide-filter-bar=true");
            //$("#systemhealth").attr("src", kibanaurl + "dashboard/5fa17450-4fdf-11eb-8956-c7a4b2510cdb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'System%20Health%20Graph',viewMode:view)&hide-filter-bar=true");
        }
    });
    $('select[name="sitefilter"]').change(function () {
        var retailarray1 = $(this).val().split(',');
        $thissitefilter = retailarray1[0];
        analyticsversion = retailarray1[1];
        var strt_time = retailarray1[2];
        var ed_time = retailarray1[3];
        var vehicledashboardversion = retailarray1[4]
        $("#rtailanalytics").css("display", "block");
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
        $("#vehicanalytics").css("display", "block");
        $("#vehicdivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
        $("#adanalytics").css("display", "block");
        $("#screentrendivnew").css("display", "hidden");
        $("#screentrendivnew").css("visibility", "hidden");
        $("#addashboard").css("display", "block");
        $("#adddivnew").css("display", "hidden");
        $("#adddivnew").css("visibility", "hidden");
        $("#offeranalytics").css("display", "block");
        $("#offerdivnew").css("display", "hidden");
        $("#offerdivnew").css("visibility", "hidden");
        $fromd = localStorage.getItem("custo")
        // if ($fromd != null) {
        //     var url = window.location.pathname
        //     if (url == "/footfalltrend") {
        //         grapretail()
        //     }
        //     if (url == "/overalltrend") {
        //         graphoverall()
        //     }
        //     if (url == "/monitoring") {
        //         systemhealth()
        //     }
        //     if (url == "/vehicleanalytics") {
        //         grapvehicle()
        //     }
        // } 
        if ($fromd != null) {
            var url = window.location.pathname
            if (url == "/footfalltrend") {
                retail_analytics_dashboard()
            }
            if (url == "/violationtrend") {
                violation_trend_dashboard()
            }
            if (url == "/monitoring") {
                systemhealth()
            }
            if (url == "/vehicleanalytics") {
                vehicle_analytics_dashboard()
            }
        }
        else {
            $tdatefilter = $('select[name="datefilter"]').val();
            $thisdatefilter = datefi($tdatefilter, strt_time, ed_time);
            var url = window.location.pathname
            if (url == "/footfalltrend") {
                //$("#zonebucket").attr("src", kibanaurl + "visualize/edit/6bdfa510-5e7b-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:0),time:("+ $thisdatefilter + "))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:NotificationType,negate:!f,params:(query:'7'),type:phrase),query:(match_phrase:(NotificationType:'7'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:OverAllCount.keyword,negate:!f,params:(query:Person),type:phrase),query:(match_phrase:(OverAllCount.keyword:Person))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:isViolation,negate:!f,params:(query:'0'),type:phrase),query:(match_phrase:(isViolation:'0'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Direction.keyword,negate:!f,params:(query:IN),type:phrase),query:(match_phrase:(Direction.keyword:IN)))),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'2',params:(field:Zone.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:segment,type:terms),(enabled:!t,id:'3',params:(field:DateTime,ranges:!((from:now-1w%2Fw,to:now),(from:now-2w%2Fw,to:now-1w%2Fw))),schema:group,type:date_range)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:Count),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:Count),type:value))),title:zone_bucket,type:histogram))");
                if (analyticsversion == 'v1.0.0') {
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/0fc02d50-d672-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.0,viewMode:view)&hide-filter-bar=true");
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                } else if (analyticsversion == 'v1.0.1' || analyticsversion == 'v1.1.0') {
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/73867b20-78e1-11eb-9090-8fcb9b0c766e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.1,viewMode:view)&hide-filter-bar=true");
                } else if (analyticsversion == 'v1.2.0') {
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/96fb49a0-ce6d-11eb-bcee-1f847a63e7e4?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
                } else if (analyticsversion == 'v1.2.1') {
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/a7cfccd0-1452-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
                } else if (analyticsversion == 'v1.2.2') {
                    $("#retadivnew").css("visibility", "hidden");
                    $("#retadivnew").css("display", "hidden");
                    $("#rtailanalytics").attr("src", kibanaurl + "dashboard/07e819a0-4e7e-11ec-be91-8311423b8dce?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
                } else if (analyticsversion == 'v0.0.0') {
                    $("#rtailanalytics").css("display", "none");
                    $("#retadivnew").css("display", "block");
                    $("#retadivnew").css("visibility", "visible");
                }
            }
            /**Vehcile dashboard configs */
            if (url == "/vehicleanalytics") {
                if (vehicledashboardversion == 'v1.0.0') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/ec8ad6f0-56a4-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.1.0,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v1.2.0') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/02630880-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v1.2.1') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/185f3cd0-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v1.2.2') {
                    $("#vehicdivnew").css("visibility", "hidden");
                    $("#vehicdivnew").css("display", "hidden");
                    $("#vehicanalytics").attr("src", kibanaurl + "dashboard/477b2c90-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
                } else if (vehicledashboardversion == 'v0.0.0') {
                    $("#vehicanalytics").css("display", "none");
                    $("#vehicdivnew").css("display", "block");
                    $("#vehicdivnew").css("visibility", "visible");
                }
            }
            $eventfilter = $('select[name="eventfilter"]').val();
            if (window.location.href.indexOf("tractionanalysis") != -1) {
                $eventfilter = $('select[name="eventfilter"]').val();
                if ($eventfilter == 0) {
                    $(".reportdisable *").attr("disabled", "disabled").off('click');
                    $(".reportdisable").css('pointer-events', 'none');
                }
                traction_analytics_dashboard($thisdatefilter, $thissitefilter, $eventfilter, 1)
                // window.location = '/tractionanalysis/data/' + $thissitefilter;
            }
            if (window.location.href.indexOf("screentrends") != -1) {
                console.log("  $thisdatefilter ==  " + $thisdatefilter + "  $thissitefilter  = " + $thissitefilter);
                if (vehicledashboardversion == 'v0.0.0') {
                    $("#adanalytics").css("display", "none");
                    $("#screentrendivnew").css("display", "block");
                    $("#screentrendivnew").css("visibility", "visible");
                }
                else {
                    screen_trend_dashboard($thisdatefilter, $thissitefilter)
                }
            }
            if (window.location.href.indexOf("addashboard") != -1) {
                console.log("  $thisdatefilter ==  " + $thisdatefilter + "  $thissitefilter  = " + $thissitefilter);
                if (vehicledashboardversion == 'v0.0.0') {
                    $("#addashboard").css("display", "none");
                    $("#adddivnew").css("display", "block");
                    $("#adddivnew").css("visibility", "visible");
                }
                else {
                    advertisment_dashboard($thisdatefilter, $thissitefilter)
                }
            }
            if (window.location.href.indexOf("offeranalytics") != -1) {
                console.log("  $thisdatefilter ==  " + $thisdatefilter + "  $thissitefilter  = " + $thissitefilter);
                if (vehicledashboardversion == 'v0.0.0') {
                    $("#offeranalytics").css("display", "none");
                    $("#offerdivnew").css("display", "block");
                    $("#offerdivnew").css("visibility", "visible");
                }
                else {
                    offer_trend_dashboard($thisdatefilter, $thissitefilter)
                }
            }
            $("#violationdata").attr("src", kibanaurl + "dashboard/d886ff60-d6d7-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:ViolationData,viewMode:view)&hide-filter-bar=true");
            var url = window.location.pathname
            if (url == "/dashboard") {
                var sitid = document.getElementById('sit_id');
                var sitid = sitid.innerText;
                if (sitid == "1") {
                    $("#dashboarddata").attr("src", kibanaurl + "dashboard/a1b4c920-d657-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'Total%20Data',viewMode:view)&hide-filter-bar=true");
                } else {
                    siteIdAr = ""
                    siteMatch = ''
                    for (i = 0; i < siteValuesArray.length; i++) {
                        siteMatch = siteMatch + "(match_phrase:(SiteId:'" + siteValuesArray[i].split(',')[0] + "'))"
                        siteIdAr = siteIdAr + "'" + siteValuesArray[i].split(',')[0] + "'";
                        if (i + 1 != siteValuesArray.length) {
                            siteIdAr = siteIdAr + ","
                            siteMatch = siteMatch + ","
                        }
                    }
                    $("#dashboarddata").attr("src", kibanaurl + "dashboard/355ff920-112f-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:!(" + siteIdAr + "),type:phrases),query:(bool:(minimum_should_match:1,should:!(" + siteMatch + "))))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:Sitedata_Dashboard,viewMode:view)&hide-filter-bar=true");
                    // $("#dashboarddata").attr("src", kibanaurl + "dashboard/355ff920-112f-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter +"))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:Sitedata_Dashboard,viewMode:view)&hide-filter-bar=true");
                }
            }
            $("#systemhealth").attr("src", kibanaurl + "dashboard/5fa17450-4fdf-11eb-8956-c7a4b2510cdb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'System%20Health%20Graph',viewMode:view)&hide-filter-bar=true");
            //$("#systemhealth").attr("src", kibanaurl + "dashboard/5fa17450-4fdf-11eb-8956-c7a4b2510cdb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'System%20Health%20Graph',viewMode:view)&hide-filter-bar=true");
        }
    });
    $('select[name="eventfilter"]').change(function () {
        $sitefilterdata = $('select[name="sitefilter"]').val().split(',');
        $sitefilter = $sitefilterdata[0];
        $tdatefilter = $thisdatefilter;
        $eventfilter = $('select[name="eventfilter"]').val();
        console.log("$sitefilter    =    " + $sitefilter);
        console.log("$tdatefilter   =    " + $tdatefilter);
        console.log("$eventfilter   =    " + $eventfilter);
        traction_analytics_dashboard($tdatefilter, $sitefilter, $eventfilter, 0);
    });
    $('select[name="sitefilteroverview"]').change(function () {
        $thissitefilteroverview = $(this).val();
        var catID = $thissitefilteroverview;
        window.location = '/overview/data/' + catID;
    });
    $('select[name="sitefilterviolation"]').change(function () {
        $thissitefilteroverview = $(this).val();
        var catID = $thissitefilteroverview;
        window.location = '/violations/data/' + catID + "?page=1";
    });
    $('select[name="sitefiltervehicleanpr"]').change(function () {
        //  alert($(this).val());
        var velclelistanpr = $(this).val().split(',');;
        var thissitefilter = velclelistanpr[0];
        var isimage = velclelistanpr[1];
        window.location = '/vehiclelistanpr/data/' + thissitefilter + "?page=1";
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
    /*if (searchanpr == null || searchanpr == 'null' || searchanpr == '' | searchanpr == '*' || searchanpr == undefined || searchanpr == 'undefined') {
        document.getElementById("txt-searchapnr").value = '';
    } else {
        document.getElementById("txt-searchapnr").value = searchanpr;
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
            //  alert(searchField);
            window.location = '/vehiclelistanpr/data/' + thissitefilter + '/?page=1&searchanpr=' + searchField + "&sortdataanpr=" + sortinganpr + "&ordertypeanpr=" + orderinganpr;
        }
    });*/
    $('.starttimepicker').timepicker({
        pickDate: false,
        pickTime: true,
        defaultTime: 'current',
        minuteStep: 1,
        defaultTime: '00:00:00',
        showSeconds: true,
        pick12HourFormat: false,
        use24hours: true,
        showMeridian: false,
        // format: 'hh:mm',
        secondStep: 1,
        stepMinute: 1
    })
    $('.endtimepicker').timepicker({
        pickDate: false,
        pickTime: true,
        defaultTime: 'current',
        minuteStep: 1,
        defaultTime: '00:00:00',
        showSeconds: true,
        pick12HourFormat: false,
        use24hours: true,
        showMeridian: false,
        // format: 'hh:mm',
        secondStep: 1,
        stepMinute: 1
    })
    $('#my_modal').on('show.bs.modal', function (e) {
        var bookId = $(e.relatedTarget).data('book-id');
        $(e.currentTarget).find('input[name="resid"]').val(bookId);
    });
    $('#my_modal_reject').on('show.bs.modal', function (e) {
        var bookId = $(e.relatedTarget).data('book-id');
        $(e.currentTarget).find('input[name="rejid"]').val(bookId);
    });
    $(".datefilter").on("change", function () {
        $modal = $('#custom');
        if ($(this).val() === 'custom') {
            localStorage.setItem("custo", $(this).val())
            $modal.modal('show');
            $('.datefilter').val("");
        }
    });
    $('#delete-model').on('show.bs.modal', function (e) {
        var deleteid = $(e.relatedTarget).data('delete-id');
        $(e.currentTarget).find('input[name="delid"]').val(deleteid);
    });
    $(document).ready(function () {
        var domain = "https://smargtech.in:3004"
        if (window.location.href.indexOf("cameragroups") != -1) {
            var url = domain + "/cameragroups"
        } else if (window.location.href.indexOf("cameras") != -1) {
            var url = domain + "/cameras"
        } else if (window.location.href.indexOf("sites") != -1) {
            var url = domain + "/sites"
        } else if (window.location.href.indexOf("violations") != -1) {
            var url = domain + "/violations"
        } else if (window.location.href.indexOf("addashboard") != -1) {
            var url = domain + "/addashboard"
        } else if (window.location.href.indexOf("dashboard") != -1) {
            var url = domain + "/dashboard"
        } else if (window.location.href.indexOf("overview") != -1) {
            var url = domain + "/overview"
        } else if (window.location.href.indexOf("footfalltrend") != -1) {
            var url = domain + "/footfalltrend"
        } else if (window.location.href.indexOf("screentrends") != -1) {
            var url = domain + "/screentrends"
        } else {
            var url = window.location;
        }
        $('ul.sidebar-menu a').filter(function () {
            return this.href == url;
        }).parent().addClass('active');
        // for treeview
        $('ul.treeview-menu a').filter(function () {
            return this.href == url;
        }).parentsUntil(".sidebar-menu > .treeview-menu").addClass('active');
    });
    $(document).ready(function () {
        var domain1 = "http://localhost:3003"
        if (window.location.href.indexOf("cameragroups") != -1) {
            var url = domain1 + "/cameragroups"
        } else if (window.location.href.indexOf("cameras") != -1) {
            var url = domain1 + "/cameras"
        } else if (window.location.href.indexOf("sites") != -1) {
            var url = domain1 + "/sites"
        } else if (window.location.href.indexOf("violations") != -1) {
            var url = domain1 + "/violations"
        } else if (window.location.href.indexOf("dashboard") != -1) {
            var url = domain1 + "/dashboard"
        } else if (window.location.href.indexOf("overview") != -1) {
            var url = domain1 + "/overview"
        } else if (window.location.href.indexOf("footfalltrend") != -1) {
            var url = domain1 + "/footfalltrend"
        } else {
            var url = window.location;
        }
        $('ul.sidebar-menu a').filter(function () {
            return this.href == url;
        }).parent().addClass('active');
        // for treeview
        $('ul.treeview-menu a').filter(function () {
            return this.href == url;
        }).parentsUntil(".sidebar-menu > .treeview-menu").addClass('active');
    });
    if (window.location.href.indexOf("cameragroups") != -1) {
        var url = "/cameragroups"
        // $('li').removeClass('active');
        $('#cameragroups').addClass('active');
    }
    if (searchanpr == null || searchanpr == 'null' || searchanpr == '' | searchanpr == '*' || searchanpr == undefined || searchanpr == 'undefined') {
        document.getElementById("txt-searchapnr").value = '';
    } else {
        document.getElementById("txt-searchapnr").value = searchanpr;
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
            //  alert(searchField);
            window.location = '/vehiclelistanpr/data/' + thissitefilter + '/?page=1&searchanpr=' + searchField + "&sortdataanpr=" + sortinganpr + "&ordertypeanpr=" + orderinganpr;
        }
    });
    if (window.location.href.indexOf("tracking") != -1) {
        var e_siteid = $('#e_siteid').val();
        var e_dateflt = $('#e_dateflt').val();
        var e_eventflt = $('#e_eventflt').val();
        getevent_tractingraph(e_siteid, e_dateflt, e_eventflt)
        // window.location = '/tractionanalysis/data/' + $thissitefilter;
    }
});
function event_tracking_page() {
    $sitefilterdata = $('select[name="sitefilter"]').val().split(',');
    var siteid = $sitefilterdata[0];
    var dateval = $thisdatefilter;
    // var dateval = $('select[name="datefilter"]').val();
    $eventfiltertxt = $("#events_d option:selected").text();
    var evname = $eventfiltertxt.replace(/\s+/, "");
    window.open(
        '/tracking/data/' + siteid + "/" + dateval + "/" + evname,
        '_blank' // <- This is what makes it open in a new window.
    );
}
function event_dashboard() {
    $eventfilter = $('select[name="eventfilter"]').val();
    $thisdatefilter = $thisdatefilter;
    $sitefilterdata = $('select[name="sitefilter"]').val().split(',');
    $sitefilter = $sitefilterdata[0];
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#from").datepicker().val();
    var todate = $("#to").datepicker().val();
    var sit_id = $('select[name="sitefilter"]').val();
    var eventarray1 = sit_id.split(',');
    $thissitefilter = eventarray1[0];
    analyticsversion = eventarray1[1];
    var strt_time = eventarray1[2];
    var ed_time = eventarray1[3];
    var starttime = strt_time.slice(0, 2);
    var endti = ed_time.slice(0, 2);
    if (starttime - endti < 0) {
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + todate + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = todate + " " + ed_time;
    } else {
        $todat = new Date(todate)
        $todat = $todat.setDate($todat.getDate() + 1)
        $todat = new Date($todat)
        $todat = $todat.toISOString().split('T')[0]
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + $todat + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = $todat + " " + ed_time;
    }
    var datefroto = datefroto.toString();
    $("#closer").click();
    traction_analytics_dashboard(datefroto, $thissitefilter, $eventfilter, 0)
}
function eso_dashboard(page) {
    $eventfilter = $('select[name="eventfilter"]').val();
    $thisdatefilter = $thisdatefilter;
    $sitefilterdata = $('select[name="sitefilter"]').val().split(',');
    $sitefilter = $sitefilterdata[0];
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#from").datepicker().val();
    var todate = $("#to").datepicker().val();
    var sit_id = $('select[name="sitefilter"]').val();
    var eventarray1 = sit_id.split(',');
    $thissitefilter = eventarray1[0];
    analyticsversion = eventarray1[1];
    var strt_time = eventarray1[2];
    var ed_time = eventarray1[3];
    var starttime = strt_time.slice(0, 2);
    var endti = ed_time.slice(0, 2);
    if (starttime - endti < 0) {
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + todate + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = todate + " " + ed_time;
    } else {
        $todat = new Date(todate)
        $todat = $todat.setDate($todat.getDate() + 1)
        $todat = new Date($todat)
        $todat = $todat.toISOString().split('T')[0]
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + $todat + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = $todat + " " + ed_time;
    }
    var datefroto = datefroto.toString();
    if (page == "traction") {
        $("#closer").click();
        traction_analytics_dashboard(datefroto, $thissitefilter, $eventfilter, 0);
    }
    else if (page == "offer") {
        $("#closer").click();
        offer_trend_dashboard(datefroto, $thissitefilter)
    }
    else if (page == "screen") {
        $("#closer").click();
        screen_trend_dashboard(datefroto, $thissitefilter)
    }
}
function traction_analytics_dashboard($thisdatefilter, $thissitefilter, $eventfilter, redirection) {
    $eventfiltertxt = $("#events_d option:selected").text();
    $eventfilter_name = $eventfiltertxt.replace(/\s+/, "");
    if (redirection == 0) {
        // $("#tractionanalytics").attr("src", kibanaurl2 + "view/fc2f0730-13cc-11ed-8dd3-75dad63ca715?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Event.keyword,negate:!f,params:!('" + $eventfilter_name + "','No%20Event'),type:phrases),query:(bool:(minimum_should_match:1,should:!((match_phrase:(Event.keyword:'" + $eventfilter_name + "')),(match_phrase:(Event.keyword:'No%20Event'))))))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:13,i:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',w:15,x:0,y:0),id:'4c8ab9a0-13bd-11ed-8dd3-75dad63ca715',panelIndex:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:13,i:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',w:33,x:15,y:0),id:c5d5b490-13c7-11ed-8dd3-75dad63ca715,panelIndex:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(legendOpen:!t)),gridData:(h:14,i:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',w:24,x:0,y:13),id:'22f988d0-13c4-11ed-8dd3-75dad63ca715',panelIndex:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(legendOpen:!t)),gridData:(h:14,i:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,w:24,x:24,y:13),id:'763f96b0-13c4-11ed-8dd3-75dad63ca715',panelIndex:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:!n),gridData:(h:12,i:'63af69ca-09f0-4079-b847-ed0b8193e372',w:48,x:0,y:27),id:deed1950-13cc-11ed-8dd3-75dad63ca715,panelIndex:'63af69ca-09f0-4079-b847-ed0b8193e372',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:14,i:'25bef554-028d-485f-8d67-ea52201cee82',w:48,x:0,y:39),id:b2611cd0-1488-11ed-bd3b-c3402d8c57d8,panelIndex:'25bef554-028d-485f-8d67-ea52201cee82',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Traction_Analysis,viewMode:view)&hide-filter-bar=true");
        $("#tractionanalytics").attr("src", kibanaurl2 + "view/fc2f0730-13cc-11ed-8dd3-75dad63ca715?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Event.keyword,negate:!f,params:!('" + $eventfilter_name + "','No%20Event'),type:phrases),query:(bool:(minimum_should_match:1,should:!((match_phrase:(Event.keyword:'" + $eventfilter_name + "')),(match_phrase:(Event.keyword:'No%20Event'))))))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',w:15,x:0,y:0),id:'4c8ab9a0-13bd-11ed-8dd3-75dad63ca715',panelIndex:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',title:'Total%20Participant',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',w:33,x:15,y:0),id:c5d5b490-13c7-11ed-8dd3-75dad63ca715,panelIndex:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',title:'Zone%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:14,i:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',w:24,x:0,y:13),id:'22f988d0-13c4-11ed-8dd3-75dad63ca715',panelIndex:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',title:'Gender%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:14,i:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,w:24,x:24,y:13),id:'763f96b0-13c4-11ed-8dd3-75dad63ca715',panelIndex:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,title:'Age%20Group%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:!n),gridData:(h:12,i:'63af69ca-09f0-4079-b847-ed0b8193e372',w:48,x:0,y:27),id:deed1950-13cc-11ed-8dd3-75dad63ca715,panelIndex:'63af69ca-09f0-4079-b847-ed0b8193e372',title:'Event%20Peak%20Time%20Analysis',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'25bef554-028d-485f-8d67-ea52201cee82',w:48,x:0,y:39),id:b2611cd0-1488-11ed-bd3b-c3402d8c57d8,panelIndex:'25bef554-028d-485f-8d67-ea52201cee82',title:'Event%20Participants%20Ratio',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Traction_Analysis,viewMode:view)&hide-filter-bar=true");
    } else if (redirection == 1) {
        window.location = '/tractionanalysis/data/' + $thissitefilter;
    }
}
function screen_trend_dashboard($thisdatefilter, $thissitefilter) {
    $("#screentrendivnew").css("visibility", "hidden");
    $("#screentrendivnew").css("display", "hidden");
    $("#adanalytics").attr("src", kibanaurl2 + "view/69a9e600-2510-11ed-884e-69ba52e53abb?embed=true&_g=(filters:!(),query:(language:kuery,query:''),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:12,i:e549a31f-9aa0-48de-b789-0282e39b83b3,w:10,x:0,y:0),id:a62b2350-1e08-11ed-93c9-010b4e29d7f3,panelIndex:e549a31f-9aa0-48de-b789-0282e39b83b3,title:'Total%20Person%20Count',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:12,i:d99656ec-c745-453d-a8e9-67882779c6fc,w:14,x:10,y:0),id:'7fbf5040-1f81-11ed-93c9-010b4e29d7f3',panelIndex:d99656ec-c745-453d-a8e9-67882779c6fc,title:'Screen-wise%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,table:!n,vis:(legendOpen:!t)),gridData:(h:12,i:'98a3ca4b-e742-4239-ac50-dac5ed968464',w:24,x:24,y:0),id:'48aa7e80-1e0b-11ed-93c9-010b4e29d7f3',panelIndex:'98a3ca4b-e742-4239-ac50-dac5ed968464',title:'Gender-wise%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:12,i:dbf374f1-51bb-47c8-bd4a-53af5fbdecca,w:24,x:0,y:12),id:'8084dea0-21fc-11ed-884e-69ba52e53abb',panelIndex:dbf374f1-51bb-47c8-bd4a-53af5fbdecca,title:'Screens%20View%20Time%20(In%20second)',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:12,i:b9b76c4c-1a43-4879-914e-a6c3e8595806,w:24,x:24,y:12),id:cdaf90c0-237e-11ed-884e-69ba52e53abb,panelIndex:b9b76c4c-1a43-4879-914e-a6c3e8595806,title:'Time%20Bucket-wise%20Views%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:a5a05c7d-d2ae-4543-acb0-35802c611603,w:15,x:0,y:24),id:e7a0a500-2054-11ed-93c9-010b4e29d7f3,panelIndex:a5a05c7d-d2ae-4543-acb0-35802c611603,title:'Zone-wise%20Screen%20Views'," +
        "type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'89eacf14-09e2-48dc-bb06-11c2e1318a1d',w:33,x:15,y:24),id:c8402040-1e0c-11ed-93c9-010b4e29d7f3,panelIndex:'89eacf14-09e2-48dc-bb06-11c2e1318a1d',title:'Zone-wise%20Views%20Trend',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'0b87f9da-698d-4076-afda-022ebebcc0ed',w:30,x:0,y:39),id:e03d5230-2442-11ed-884e-69ba52e53abb,panelIndex:'0b87f9da-698d-4076-afda-022ebebcc0ed',title:'Total%20Person%20vs%20Face%20vs%20Gaze',type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:15,i:'9711fa46-591e-400c-8ac6-950c529181f7',w:18,x:30,y:39),id:'86b5e140-1e35-11ed-93c9-010b4e29d7f3',panelIndex:'9711fa46-591e-400c-8ac6-950c529181f7',title:'Zone-wise%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(hidePanelTitles:!f,vis:!n),gridData:(h:14,i:'1c23ed3b-17c2-429e-9dfb-e9e4c885b2cd',w:48,x:0,y:54),id:d4746820-277c-11ed-884e-69ba52e53abb,panelIndex:'1c23ed3b-17c2-429e-9dfb-e9e4c885b2cd',title:'Peak%20Time%20Analysis%20',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Screen%20Trends%20Dashboard',viewMode:view)&hide-filter-bar=true");
}
function advertisment_dashboard($thisdatefilter, $thissitefilter) {
    $("#adddivnew").css("visibility", "hidden");
    $("#adddivnew").css("display", "hidden");
    $("#addashboard").attr("src", kibanaurl2 + "view/e490deb0-250f-11ed-884e-69ba52e53abb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(from:now-1y%2Fd,to:now%2Fd))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:11,i:ee1d6ac6-6821-4d99-875c-e53d9446c461,w:19,x:0,y:0),id:'85705180-1fac-11ed-93c9-010b4e29d7f3',panelIndex:ee1d6ac6-6821-4d99-875c-e53d9446c461,title:'Screen%20Views%20Summary%20',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:11,i:'018c856a-f901-4f18-ad49-a6fa65309a9f',w:29,x:19,y:0),id:e7681140-1f82-11ed-93c9-010b4e29d7f3,panelIndex:'018c856a-f901-4f18-ad49-a6fa65309a9f',title:'Screen%20Views%20Comparison%20(4%20Day)',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'3afe83fc-001e-47dd-b518-b32eeb2e81bf',w:24,x:0,y:11),id:'72ab2f50-1f8b-11ed-93c9-010b4e29d7f3',panelIndex:'3afe83fc-001e-47dd-b518-b32eeb2e81bf',title:'Month-wise%20Screen%20Views',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:ee036987-2e09-4b95-9df5-d866f703d93b,w:24,x:24,y:11),id:a2bfeed0-275e-11ed-884e-69ba52e53abb,panelIndex:ee036987-2e09-4b95-9df5-d866f703d93b,title:'Month-wise%20Offer%20Views',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Ad%20Dashboard',viewMode:view)&hide-filter-bar=true");
    // $("#addashboard").attr("src", kibanaurl2 + "view/e490deb0-250f-11ed-884e-69ba52e53abb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(from:now-1y%2Fd,to:now%2Fd))&_a=(description:'',,filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:11,i:ee1d6ac6-6821-4d99-875c-e53d9446c461,w:19,x:0,y:0),id:'85705180-1fac-11ed-93c9-010b4e29d7f3',panelIndex:ee1d6ac6-6821-4d99-875c-e53d9446c461,title:'Screen%20Views%20Summary%20',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:11,i:'018c856a-f901-4f18-ad49-a6fa65309a9f',w:29,x:19,y:0),id:e7681140-1f82-11ed-93c9-010b4e29d7f3,panelIndex:'018c856a-f901-4f18-ad49-a6fa65309a9f',title:'Screen%20Views%20Comparison%20(4%20Day)',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'3afe83fc-001e-47dd-b518-b32eeb2e81bf',w:24,x:0,y:11),id:'72ab2f50-1f8b-11ed-93c9-010b4e29d7f3',panelIndex:'3afe83fc-001e-47dd-b518-b32eeb2e81bf',title:'Month-wise%20Screen%20Views',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:ee036987-2e09-4b95-9df5-d866f703d93b,w:24,x:24,y:11),id:a2bfeed0-275e-11ed-884e-69ba52e53abb,panelIndex:ee036987-2e09-4b95-9df5-d866f703d93b,title:'Month-wise%20Offer%20Views',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Ad%20Dashboard',viewMode:edit)&hide-filter-bar=true");
}
function offer_trend_dashboard($thisdatefilter, $thissitefilter) {
    $("#offerdivnew").css("visibility", "hidden");
    $("#offerdivnew").css("display", "hidden");
    $("#offeranalytics").attr("src", kibanaurl2 + "view/d742f9f0-2375-11ed-884e-69ba52e53abb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'762d6628-0b15-4ab3-b952-e4e98455eaec',w:10,x:0,y:0),id:'2fa0fd80-2219-11ed-884e-69ba52e53abb',panelIndex:'762d6628-0b15-4ab3-b952-e4e98455eaec',title:'Total%20View%20Count',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:14,i:'0b68962b-8cdb-41c1-907c-cae717f55f7d',w:22,x:26,y:0),id:a13e3be0-23b0-11ed-884e-69ba52e53abb,panelIndex:'0b68962b-8cdb-41c1-907c-cae717f55f7d',type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:14,i:'4af8a619-267c-4c33-b298-adfe7e0d72d1',w:16,x:10,y:0),id:d6d5f880-243f-11ed-884e-69ba52e53abb,panelIndex:'4af8a619-267c-4c33-b298-adfe7e0d72d1',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'7985316e-72b7-4832-b7d1-376fb55ca7b2',w:20,x:27,y:14),id:'566d4730-23ad-11ed-884e-69ba52e53abb',panelIndex:'7985316e-72b7-4832-b7d1-376fb55ca7b2',title:'Average%20Offer%20View%20Time',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(legendOpen:!f)),gridData:(h:13,i:f8930aa1-c98e-41d9-a04b-a5fc233bd465,w:27,x:0,y:14),id:e4f0c1d0-2376-11ed-884e-69ba52e53abb,panelIndex:f8930aa1-c98e-41d9-a04b-a5fc233bd465,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:!n),gridData:(h:16,i:'44670afa-3067-4f4e-adf2-55cdb5d01e5e',w:48,x:0,y:27),id:'3ee5e730-237a-11ed-884e-69ba52e53abb',panelIndex:'44670afa-3067-4f4e-adf2-55cdb5d01e5e',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(params:(sort:(columnIndex:0,direction:asc)))),gridData:(h:15,i:a2e3e17b-86c0-415a-ae64-ca20a9ef1f05,w:48,x:0,y:43),id:'7f69d9f0-2376-11ed-884e-69ba52e53abb',panelIndex:a2e3e17b-86c0-415a-ae64-ca20a9ef1f05,type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Offer_Dashboard,viewMode:view)&hide-filter-bar=true");
}
function getevent_tractingraph(e_siteid, e_dateflt, e_eventflt) {
}
var username = localStorage.getItem("username");
var password = localStorage.getItem("password");
console.log('username====' + username);
console.log('password===' + password);
if (username != undefined || username != null || username != '' || password != undefined || password != null || password != '') {
    document.getElementById("username").value = username;
    document.getElementById("password").value = password;
} else {
    document.getElementById("username").value = '';
    document.getElementById("password").value = '';
}
function logoutbuttonclick() {
    localStorage.removeItem("authtokenurl");
    localStorage.removeItem("useridurl");
    localStorage.removeItem("isadmin");
}
function signinbuttonclick() {
    var v_email = $('input[name=username]').val();
    var v_pass = $('input[name=txtPassword]').val();
    // $('#remember_me').click(function() {
    var remember = document.getElementById("remember_me");
    if (remember.checked) {
        // if ($('#remember_me').is(':checked')) {
        localStorage.setItem("username", v_email);
        localStorage.setItem("password", v_pass);
    } else {
        localStorage.setItem("username", '');
        localStorage.setItem("password", '');
    }
}
function download_violation_list_report(a) {
    var nameArr = a.split(',');
    var newStr = a.split(", ").slice(1).join(", ");
    var sccauth_token = nameArr[0];
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
function download_parked_vehicle_report(a) {
    var nameArr = a.split(',');
    console.log("Inside Timefilter   ====== ")
    var newStr = a.split(", ").slice(1).join(", ");
    var sccauth_token = nameArr[0];
    var site_id = nameArr[1];
    var frmdt = $('#datepicker3data').val();
    var tdt = $('#datepicker4data').val();
    var newfromdate = frmdt.split("-").reverse().join("-");
    var newtodate = tdt.split("-").reverse().join("-");
    var velclelistanpr = $('select[name="sitefiltervehicleanpr"]').val().split(',');;
    var thissitefilter = velclelistanpr[0];
    $("#close-button").click();
    //alert("Report is generating in some time, please do not refresh or reload the page!!!");
    $('#waitmodel').modal('show');
    $("#loadingscrollervioltn").css("display", "block");
    $("#sidebarspinner").css("display", "block");
    $("#headerspinner").css("display", "block");
    $("#navspinner").css("display", "block");
    $.ajax({
        url: "/vehiclelistanpr/data2/" + sccauth_token + "/" + site_id + "/" + frmdt + "/" + tdt + '',
        success: function (data) {
            if (data) {
                console.log(JSON.stringify(data));
                msgFromServer = data.text;
                if (msgFromServer == "success") {
                    newSiteName = data.sitename.split(" ").join("-");
                    window.open(reportRedirect + "report/Smarg_" + newSiteName + "_Vehicles_Report_" + newfromdate + "_" + newtodate + ".xls");
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
            else {
                alert("no data");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus); alert("Error: " + errorThrown); alert("request == " + JSON.stringify(XMLHttpRequest));
        },
        timeout: 800000 //in millisecond
    });
}
function download_footfall_analytics_report(a) {
    var nameArr = a.split(',');
    var newStr = a.split(", ").slice(1).join(", ");
    var sccauth_token = nameArr[0];
    var site_id = nameArr[1];
    var fromdate = $("#datepicker1").datepicker().val();
    var todate = $("#datepicker2").datepicker().val();
    var newfromdate = fromdate.split("-").reverse().join("-");
    var newtodate = todate.split("-").reverse().join("-");
    var catID = $thissitefilter;
    var msgFromServer;
    $("#close-button").click();
    //alert("Report is generating in some time, please do not refresh or reload the page!!!");
    $('#waitmodel').modal('show');
    $("#loadingscroller").css("display", "block");
    $("#sidebarspinner").css("display", "block");
    $("#headerspinner").css("display", "block");
    $("#navspinner").css("display", "block");
    $.get("/footfalltrend/data/" + catID + "/" + fromdate + "/" + todate + '', function (data) {
        if (data) {
            msgFromServer = data.text;
            if (msgFromServer == "success") {
                newSiteName = data.sitename.split(" ").join("-");
                window.open(reportRedirect + "report/Smarg_" + newSiteName + "_Footfall_Reports_" + newfromdate + "_" + newtodate + ".xls");
                $("#loadingscroller").css("display", "none");
                $("#sidebarspinner").css("display", "none");
                $("#headerspinner").css("display", "none");
                $("#navspinner").css("display", "none");
                $('#waitmodel').modal('hide');
            } else if (msgFromServer == "error") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller").css("display", "none");
                $("#sidebarspinner").css("display", "none");
                $("#headerspinner").css("display", "none");
                $("#navspinner").css("display", "none");
            } else if (msgFromServer == "undefined") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller").css("display", "none");
                $("#sidebarspinner").css("display", "none");
                $("#headerspinner").css("display", "none");
                $("#navspinner").css("display", "none");
            }
        }
    });
}
function download_violation_analytics_report(a) {
    var nameArr = a.split(',');
    var newStr = a.split(", ").slice(1).join(", ");
    var sccauth_token = nameArr[0];
    var site_id = nameArr[1];
    var fromdate = $("#datepicker1").datepicker().val();
    var todate = $("#datepicker2").datepicker().val();
    var newfromdate = fromdate.split("-").reverse().join("-");
    var newtodate = todate.split("-").reverse().join("-");
    var catID = $thissitefilter;
    var msgFromServer;
    $("#close-button").click();
    //alert("Report is generating in some time, please do not refresh or reload the page!!!");
    $('#waitmodel').modal('show');
    $("#loadingscrollervioltn").css("display", "block");
    $("#sidebarspinner").css("display", "block");
    $("#headerspinner").css("display", "block");
    $("#navspinner").css("display", "block");
    $.get("/violationtrend/data/" + catID + "/" + fromdate + "/" + todate + '', function (data) {
        if (data) {
            msgFromServer = data.text;
            if (msgFromServer == "success") {
                newSiteName = data.sitename.split(" ").join("-");
                window.open(reportRedirect + "report/Smarg_" + newSiteName + "_Violation_Analytics_Reports_" + newfromdate + "_" + newtodate + ".xls");
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
function download_traction_analytics_report(a) {
    var nameArr = a.split(',');
    var newStr = a.split(", ").slice(1).join(", ");
    // var sccauth_token = nameArr[0];
    var site_id = nameArr[1];
    var fromdate = $("#datepicker5").datepicker().val();
    var todate = $("#datepicker6").datepicker().val();
    var newfromdate = fromdate.split("-").reverse().join("-");
    var newtodate = todate.split("-").reverse().join("-");
    // var catID = $thissitefilter;
    $("#close-button").click();
    //alert("Report is generating in some time, please do not refresh or reload the page!!!");
    $('#waitmodel').modal('show');
    $("#loadingscroller_ta").css("display", "block");
    $("#sidebarspinner").css("display", "block");
    $("#headerspinner").css("display", "block");
    $("#navspinner").css("display", "block");
    $eventfilter = $('select[name="eventfilter"]').val();
    $eventfiltertxt = $("#events_d option:selected").text();
    $eventfilter_name = $eventfiltertxt.replace(/\s+/, "")
    $.get("/tractionanalysis/reportdata/" + site_id + "/" + fromdate + "/" + todate + "/" + $eventfilter_name + '', function (data) {
        if (data) {
            msgFromServer = data.text;
            if (msgFromServer == "success") {
                newSiteName = data.sitename.split(" ").join("-");
                window.open(reportRedirect + "report/Smarg_" + newSiteName + "_Event_Reports_" + newfromdate + "_" + newtodate + ".xls");
                $("#loadingscroller_ta").css("display", "none");
                $("#sidebarspinner").css("display", "none");
                $("#headerspinner").css("display", "none");
                $("#navspinner").css("display", "none");
                $('#waitmodel').modal('hide');
            } else if (msgFromServer == "error") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller_ta").css("display", "none");
                $("#sidebarspinner").css("display", "none");
                $("#headerspinner").css("display", "none");
                $("#navspinner").css("display", "none");
            } else if (msgFromServer == "undefined") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller_ta").css("display", "none");
                $("#sidebarspinner").css("display", "none");
                $("#headerspinner").css("display", "none");
                $("#navspinner").css("display", "none");
            }
        }
    });
}
function graphdashboard(a) {
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#from").datepicker().val();
    var todate = $("#to").datepicker().val();
    var sit_id = document.getElementById('sitef').selectedOptions[0].value;
    var retailarray1 = sit_id.split(',');
    $thissitefilter = retailarray1[0];
    analyticsversion = retailarray1[1];
    var strt_time = retailarray1[2];
    var ed_time = retailarray1[3];
    var url = window.location.pathname
    console.log(ed_time)
    var starttime = strt_time.slice(0, 2);
    var endti = ed_time.slice(0, 2);
    if (starttime - endti <= 0) {
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + todate + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = todate + " " + ed_time;
    } else {
        $todat = new Date(todate)
        $todat = $todat.setDate($todat.getDate() + 1)
        $todat = new Date($todat)
        $todat = $todat.toISOString().split('T')[0]
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + $todat + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = $todat + " " + ed_time;
    }
    $("#close-button").click();
    var datefroto = datefroto.toString();
    if (url == "/dashboard") {
        var siteValuesArray = Array.from(document.getElementById("sitef").options).map(e => e.value);
        if (a == "1") {
            $("#dashboarddata").attr("src", kibanaurl + "dashboard/a1b4c920-d657-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'Total%20Data',viewMode:view)&hide-filter-bar=true");
        } else {
            siteIdAr = ""
            siteMatch = ''
            for (i = 0; i < siteValuesArray.length; i++) {
                siteMatch = siteMatch + "(match_phrase:(SiteId:'" + siteValuesArray[i].split(',')[0] + "'))"
                siteIdAr = siteIdAr + "'" + siteValuesArray[i].split(',')[0] + "'";
                if (i + 1 != siteValuesArray.length) {
                    siteIdAr = siteIdAr + ","
                    siteMatch = siteMatch + ","
                }
            }
            $("#dashboarddata").attr("src", kibanaurl + "dashboard/355ff920-112f-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:!(" + siteIdAr + "),type:phrases),query:(bool:(minimum_should_match:1,should:!(" + siteMatch + "))))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:Sitedata_Dashboard,viewMode:view)&hide-filter-bar=true");
        }
    }
}
function retail_analytics_dashboard() {
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#from").datepicker().val();
    var todate = $("#to").datepicker().val();
    var sit_id = $('select[name="sitefilter"]').val();
    var retailarray1 = sit_id.split(',');
    $thissitefilter = retailarray1[0];
    analyticsversion = retailarray1[1];
    var strt_time = retailarray1[2];
    var ed_time = retailarray1[3];
    var starttime = strt_time.slice(0, 2);
    var endti = ed_time.slice(0, 2);
    if (starttime - endti < 0) {
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + todate + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = todate + " " + ed_time;
    } else {
        $todat = new Date(todate)
        $todat = $todat.setDate($todat.getDate() + 1)
        $todat = new Date($todat)
        $todat = $todat.toISOString().split('T')[0]
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + $todat + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = $todat + " " + ed_time;
    }
    var datefroto = datefroto.toString();
    var url = window.location.pathname
    if (url == "/footfalltrend") {
        //$("#zonebucket").attr("src", kibanaurl + "visualize/edit/6bdfa510-5e7b-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:0),time:("+ $thisdatefilter + "))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:NotificationType,negate:!f,params:(query:'7'),type:phrase),query:(match_phrase:(NotificationType:'7'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:OverAllCount.keyword,negate:!f,params:(query:Person),type:phrase),query:(match_phrase:(OverAllCount.keyword:Person))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:isViolation,negate:!f,params:(query:'0'),type:phrase),query:(match_phrase:(isViolation:'0'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Direction.keyword,negate:!f,params:(query:IN),type:phrase),query:(match_phrase:(Direction.keyword:IN)))),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'2',params:(field:Zone.keyword,missingBucket:!f,missingBucketLabel:Missing,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:5),schema:segment,type:terms),(enabled:!t,id:'3',params:(field:DateTime,ranges:!((from:now-1w%2Fw,to:now),(from:now-2w%2Fw,to:now-1w%2Fw))),schema:group,type:date_range)),params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,seriesParams:!((data:(id:'1',label:Count),drawLinesBetweenPoints:!t,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:0,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(mode:normal,type:linear),show:!t,style:(),title:(text:Count),type:value))),title:zone_bucket,type:histogram))");
        if (analyticsversion == 'v1.0.0') {
            $("#closer").click();
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/0fc02d50-d672-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.0,viewMode:view)&hide-filter-bar=true");
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
        } else if (analyticsversion == 'v1.0.1' || analyticsversion == 'v1.1.0') {
            $("#closer").click();
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/73867b20-78e1-11eb-9090-8fcb9b0c766e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.1,viewMode:view)&hide-filter-bar=true");
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
        } else if (analyticsversion == 'v1.2.0') {
            $("#closer").click();
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/96fb49a0-ce6d-11eb-bcee-1f847a63e7e4?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
        } else if (analyticsversion == 'v1.2.1') {
            $("#closer").click();
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/a7cfccd0-1452-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
        } else if (analyticsversion == 'v1.2.2') {
            $("#closer").click();
            $("#rtailanalytics").attr("src", kibanaurl + "dashboard/07e819a0-4e7e-11ec-be91-8311423b8dce?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
            $("#retadivnew").css("visibility", "hidden");
            $("#retadivnew").css("display", "hidden");
        } else if (analyticsversion == 'v0.0.0') {
            $("#rtailanalytics").css("display", "none");
            $("#retadivnew").css("visibility", "visible");
            $("#retadivnew").css("display", "block");
        }
    }
}
function download_screen_trend_report(a) {
    var nameArr = a.split(',');
    var site_id = nameArr[1];
    var fromdate = $("#datepicker7").datepicker().val();
    var todate = $("#datepicker8").datepicker().val();
    var newfromdate = fromdate.split("-").reverse().join("-");
    var newtodate = todate.split("-").reverse().join("-");
    $("#close-button").click();
    $('#waitmodel').modal('show');
    $("#loadingscroller_st,#sidebarspinner,#headerspinner,#navspinner").css("display", "block");
    $eventfilter = $('select[name="eventfilter"]').val();
    $eventfiltertxt = $("#events_d option:selected").text();
    $eventfilter_name = $eventfiltertxt.replace(/\s+/, "")
    $.get("/screentrends/reportdata/" + site_id + "/" + fromdate + "/" + todate + "/" + $eventfilter_name + '', function (data) {
        if (data) {
            msgFromServer = data.text;
            if (msgFromServer == "success") {
                newSiteName = data.sitename.split(" ").join("-");
                window.open(reportRedirect + "report/Smarg_" + newSiteName + "_Event_Reports_" + newfromdate + "_" + newtodate + ".xls");
                $('#waitmodel').modal('hide');
            } else if (msgFromServer == "error") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller_st,#sidebarspinner,#headerspinner,#navspinner").css("display", "none");
            } else if (msgFromServer == "undefined") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller_st,#sidebarspinner,#headerspinner,#navspinner").css("display", "none");
            }
        }
    });
}
function download_ad_dashboard_report(a) {
    var nameArr = a.split(',');
    var site_id = nameArr[1];
    var fromdate = $("#datepicker9").datepicker().val();
    var todate = $("#datepicker10").datepicker().val();
    var newfromdate = fromdate.split("-").reverse().join("-");
    var newtodate = todate.split("-").reverse().join("-");
    $("#close-button").click();
    $('#waitmodel').modal('show');
    $("#loadingscroller_adsh,#sidebarspinner,#headerspinner,#navspinner").css("display", "block");
    $eventfilter = $('select[name="eventfilter"]').val();
    $eventfiltertxt = $("#events_d option:selected").text();
    $eventfilter_name = $eventfiltertxt.replace(/\s+/, "")
    $.get("/addashboard/reportdata/" + site_id + "/" + fromdate + "/" + todate + "/" + $eventfilter_name + '', function (data) {
        if (data) {
            msgFromServer = data.text;
            if (msgFromServer == "success") {
                newSiteName = data.sitename.split(" ").join("-");
                window.open(reportRedirect + "report/Smarg_" + newSiteName + "_Event_Reports_" + newfromdate + "_" + newtodate + ".xls");
                $('#waitmodel').modal('hide');
            } else if (msgFromServer == "error") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller_adsh,#sidebarspinner,#headerspinner,#navspinner").css("display", "none");
            } else if (msgFromServer == "undefined") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller_adsh,#sidebarspinner,#headerspinner,#navspinner").css("display", "none");
            }
        }
    });
}
function download_offers_trend_report(a) {
    var nameArr = a.split(',');
    var site_id = nameArr[1];
    var fromdate = $("#datepicker11").datepicker().val();
    var todate = $("#datepicker12").datepicker().val();
    var newfromdate = fromdate.split("-").reverse().join("-");
    var newtodate = todate.split("-").reverse().join("-");
    $("#close-button").click();
    $('#waitmodel').modal('show');
    $("#loadingscroller_oft,#sidebarspinner,#headerspinner,#navspinner").css("display", "block");
    $eventfilter = $('select[name="eventfilter"]').val();
    $eventfiltertxt = $("#events_d option:selected").text();
    $eventfilter_name = $eventfiltertxt.replace(/\s+/, "")
    $.get("/offeranalytics/reportdata/" + site_id + "/" + fromdate + "/" + todate + "/" + $eventfilter_name + '', function (data) {
        if (data) {
            msgFromServer = data.text;
            if (msgFromServer == "success") {
                newSiteName = data.sitename.split(" ").join("-");
                window.open(reportRedirect + "report/Smarg_" + newSiteName + "_Event_Reports_" + newfromdate + "_" + newtodate + ".xls");
                $('#waitmodel').modal('hide');
            } else if (msgFromServer == "error") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller_oft,#sidebarspinner,#headerspinner,#navspinner").css("display", "none");
            } else if (msgFromServer == "undefined") {
                $('#waitmodel').modal('hide');
                $('#alertwarn').modal('show');
                $("#loadingscroller_oft,#sidebarspinner,#headerspinner,#navspinner").css("display", "none");
            }
        }
    });
}
function vehicle_analytics_dashboard() {
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#from").datepicker().val();
    var todate = $("#to").datepicker().val();
    var sit_id = $('select[name="sitefilter"]').val();
    var retailarray1 = sit_id.split(',');
    $thissitefilter = retailarray1[0];
    analyticsversion = retailarray1[1];
    var strt_time = retailarray1[2];
    var ed_time = retailarray1[3];
    var vehicledashboardversion = retailarray1[4];
    var starttime = strt_time.slice(0, 2);
    var endti = ed_time.slice(0, 2);
    if (starttime - endti < 0) {
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + todate + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = todate + " " + ed_time;
    } else {
        $todat = new Date(todate)
        $todat = $todat.setDate($todat.getDate() + 1)
        $todat = new Date($todat)
        $todat = $todat.toISOString().split('T')[0]
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + $todat + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = $todat + " " + ed_time;
    }
    var datefroto = datefroto.toString();
    var url = window.location.pathname
    if (url == "/vehicleanalytics") {
        if (vehicledashboardversion == 'v1.0.0') {
            $("#closer").click();
            $("#vehicdivnew").css("visibility", "hidden");
            $("#vehicdivnew").css("display", "hidden");
            $("#vehicanalytics").attr("src", kibanaurl + "dashboard/ec8ad6f0-56a4-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.1.0,viewMode:view)&hide-filter-bar=true");
        } else if (vehicledashboardversion == 'v1.2.0') {
            $("#closer").click();
            $("#vehicdivnew").css("visibility", "hidden");
            $("#vehicdivnew").css("display", "hidden");
            $("#vehicanalytics").attr("src", kibanaurl + "dashboard/02630880-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
        } else if (vehicledashboardversion == 'v1.2.1') {
            $("#closer").click();
            $("#vehicdivnew").css("visibility", "hidden");
            $("#vehicdivnew").css("display", "hidden");
            $("#vehicanalytics").attr("src", kibanaurl + "dashboard/185f3cd0-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
        } else if (vehicledashboardversion == 'v1.2.2') {
            $("#closer").click();
            $("#vehicdivnew").css("visibility", "hidden");
            $("#vehicdivnew").css("display", "hidden");
            $("#vehicanalytics").attr("src", kibanaurl + "dashboard/477b2c90-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
        } else if (vehicledashboardversion == 'v0.0.0') {
            $("#closer").click();
            $("#vehicanalytics").css("display", "none");
            $("#vehicdivnew").css("display", "block");
            $("#vehicdivnew").css("visibility", "visible");
        }
    }
}
function violation_trend_dashboard() {
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#fromov").datepicker().val();
    var todate = $("#toov").datepicker().val();
    var sit_id = $('select[name="sitefilter"]').val();
    var retailarray1 = sit_id.split(',');
    $thissitefilter = retailarray1[0];
    analyticsversion = retailarray1[1];
    var strt_time = retailarray1[2];
    var ed_time = retailarray1[3];
    var starttime = strt_time.slice(0, 2);
    var endti = ed_time.slice(0, 2);
    if (starttime - endti < 0) {
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + todate + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = todate + " " + ed_time;
    } else {
        $todat = new Date(todate)
        $todat = $todat.setDate($todat.getDate() + 1)
        $todat = new Date($todat)
        $todat = $todat.toISOString().split('T')[0]
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + $todat + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = $todat + " " + ed_time;
    }
    var datefroto = datefroto.toString();
    $("#closer").click();
    $("#violationdata").attr("src", kibanaurl + "dashboard/d886ff60-d6d7-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:ViolationData,viewMode:view)&hide-filter-bar=true");
}
function systemhealth() {
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#from").datepicker().val();
    var todate = $("#to").datepicker().val();
    var sit_id = $('select[name="sitefilter"]').val();
    var retailarray1 = sit_id.split(',');
    $thissitefilter = retailarray1[0];
    analyticsversion = retailarray1[1];
    var strt_time = retailarray1[2];
    var ed_time = retailarray1[3];
    var starttime = strt_time.slice(0, 2);
    var endti = ed_time.slice(0, 2);
    if (starttime - endti < 0) {
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + todate + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = todate + " " + ed_time;
    } else {
        $todat = new Date(todate)
        $todat = $todat.setDate($todat.getDate() + 1)
        $todat = new Date($todat)
        $todat = $todat.toISOString().split('T')[0]
        var datefroto = "from:'" + fromdate + "T" + strt_time + "Z',to:'" + $todat + "T" + ed_time + "Z'";
        document.getElementById("fromd").innerHTML = fromdate + " " + strt_time;
        document.getElementById("tod").innerHTML = $todat + " " + ed_time;
    }
    var datefroto = datefroto.toString();
    $("#closer").click();
    $("#systemhealth").attr("src", kibanaurl + "dashboard/5fa17450-4fdf-11eb-8956-c7a4b2510cdb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefroto + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:'System%20Health%20Graph',viewMode:view)&hide-filter-bar=true");
}
