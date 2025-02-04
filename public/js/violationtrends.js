$(function () {
    violationtrends("false");
 });
 
 function violationtrends(isdatef_is_custom)
 {
    if(isdatef_is_custom == "true")
    {
        violation_trends_dashboard();
    }
    else if(isdatef_is_custom == "false")
    {
        sitefilter();
        $thisdatefilter = datefilter();
        if($thisdatefilter == "custom") {}
        else{
            violationtreds_graph_display($thissitefilter,$thisdatefilter);
     }
    }
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
$('select[name="datefilter"]').change(function () {
    violationtrends("false");
});
$('select[name="sitefilter"]').change(function () {
    sitefilter();
    var datef_val = $('select[name="datefilter"]').val();
    if(datef_val == "custom")
    {
        violationtrends("true");
    }
    else{
        violationtrends("false");
    }
   
});
function violation_trend_dashboard() {
    
    $(".frmtodivdata").css("display","block")
    localStorage.setItem("datefilter","custom");
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#from").datepicker().val();
    var todate = $("#to").datepicker().val();
    var sit_id = $('select[name="sitefilter"]').val();
    var retailarray1 = sit_id.split(',');
    $thissitefilter = retailarray1[0];
    $analyticsversion = retailarray1[1];
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
violationtreds_graph_display($thissitefilter,datefroto);
}
function violationtreds_graph_display(sitefilter,datefilter)
{
    //$("#violationdata").attr("src", kibanaurl + "dashboard/d886ff60-d6d7-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'3d8de210-d3c8-11ea-8317-cfe8154f1f1a',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:ViolationData,viewMode:view)&hide-filter-bar=true");
    $("#violationdata").attr("src", kibanaurl2 + "view/60655370-cc61-11ec-833a-c19ae5f55874?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:15,i:'80a27c2e-2de9-44a1-86bc-b044d2642dea',w:24,x:0,y:0),id:'9f1ba140-d4a2-11ea-8317-cfe8154f1f1a',panelIndex:'80a27c2e-2de9-44a1-86bc-b044d2642dea',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:'52a58008-5d35-4e25-a98d-d52df64eacb3',w:24,x:24,y:0),id:b63f7b70-c756-11ea-9f88-0f8f75dba7ad,panelIndex:'52a58008-5d35-4e25-a98d-d52df64eacb3',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:d3256640-ccdf-4dfc-8b93-cea56b4058f4,w:24,x:0,y:15),id:'631e6330-d6d7-11ea-87e5-4d6ee0d1a9d8',panelIndex:d3256640-ccdf-4dfc-8b93-cea56b4058f4,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:'5030137e-18e1-4403-99c4-f33da840e1b4',w:24,x:24,y:15),id:cd194af0-f99d-11ea-a1ba-8d417a588659,panelIndex:'5030137e-18e1-4403-99c4-f33da840e1b4',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:AlertsData,viewMode:view)&hide-filter-bar=true");
    //$("#violationdata").attr("src", kibanaurl2 + "view/60655370-cc61-11ec-833a-c19ae5f55874?_g=(refreshInterval:(pause!f,value:30000),time:(" + datefilter + "))&show-time-filter=true" );
    //$("#violationdata").attr("src", kibanaurl2 + "view/60655370-cc61-11ec-833a-c19ae5f55874?_g=(filters:!(('$state':(store:globalState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:" + sitefilter + "),type:phrase),query:(match_phrase:(SiteId:" + sitefilter + ")))),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(filters:!(('$state':(store:globalState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:" + sitefilter + "),type:phrase),query:(match_phrase:(SiteId:" + sitefilter + ")))))");

}
