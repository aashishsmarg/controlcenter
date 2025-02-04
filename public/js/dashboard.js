$(function () {
    //var password =localStorage.setItem("username", v_email);
    getdashgraph();

});






// button.addEventListener("click", printMessage)


function getdashgraph() {
    $thisdatefilter = datefilter();
    if ($thisdatefilter == "custom") { }
    else {
        var sitid = document.getElementById('sit_id');
        var sitid = sitid.innerText;
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
        }
    }
}
$('select[name="datefilter"]').change(function () {
    getdashgraph();
});
function graphdashboard(a) {
    localStorage.setItem("datefilter", "custom");
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
console.log("dshjgcsku")
var b
console.log(b)