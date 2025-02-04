$(function () {
    footfalltrend("false");
});

function footfalltrend(isdatef_is_custom) {
    if (isdatef_is_custom == "true") {
        retail_analytics_dashboard();
    }
    else if (isdatef_is_custom == "false") {
        sitefilter();
        $thisdatefilter = datefilter();
        if ($thisdatefilter == "custom") { }
        else {
            footfall_graph_display($thissitefilter, $thisdatefilter);
        }
    }
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
$('select[name="datefilter"]').change(function () {
    footfalltrend("false");
});
$('select[name="sitefilter"]').change(function () {
    sitefilter();
    var datef_val = $('select[name="datefilter"]').val();
    if (datef_val == "custom") {
        $(".modal-dialog").css("display", "none");
        footfalltrend("true");
    }
    else {
        footfalltrend("false");
    }

});
function retail_analytics_dashboard() {
    $(".frmtodivdata").css("display", "block");
    localStorage.setItem("datefilter", "custom");
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
    footfall_graph_display($thissitefilter, datefroto);
}
function footfall_graph_display(sitefilter, datefilter) {
    if ($analyticsversion == 'v1.0.0') {
        $("#rtailanalytics").attr("src", kibanaurl + "dashboard/0fc02d50-d672-11ea-87e5-4d6ee0d1a9d8?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.0,viewMode:view)&hide-filter-bar=true");
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
    } else if ($analyticsversion == 'v1.0.1' || $analyticsversion == 'v1.1.0') {
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
        $("#rtailanalytics").attr("src", kibanaurl + "dashboard/73867b20-78e1-11eb-9090-8fcb9b0c766e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'99100900-5641-11eb-a709-8bd2707228a9',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.0.1,viewMode:view)&hide-filter-bar=true");
    } else if ($analyticsversion == 'v1.2.0') {
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
        $("#rtailanalytics").attr("src", kibanaurl + "dashboard/96fb49a0-ce6d-11eb-bcee-1f847a63e7e4?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
    } else if ($analyticsversion == 'v1.2.1') {
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
        $("#rtailanalytics").attr("src", kibanaurl + "dashboard/a7cfccd0-1452-11ec-ba6e-e39eaf95505e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
    } else if ($analyticsversion == 'v1.2.2') {
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
        $("#rtailanalytics").attr("src", kibanaurl + "dashboard/07e819a0-4e7e-11ec-be91-8311423b8dce?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:RetailAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
    } else if ($analyticsversion == 'v1.3.0') {
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
        
        //$("#rtailanalytics").attr("src", kibanaurl2 + "view/3fad9250-78a9-11ee-806f-772dba864a79?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'ac85e640-4274-11ee-b3e3-77d199b200e2',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:20,i:'29590af9-0dd2-4894-a18c-2ad58c42d0b3',w:22,x:0,y:0),id:d96ba5d0-c73b-11ea-9f88-0f8f75dba7ad,panelIndex:'29590af9-0dd2-4894-a18c-2ad58c42d0b3',title:'Zone%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:7,i:'48ac95ea-1752-41f5-8c6d-7ec3b87d3da2',w:13,x:22,y:0),id:'38c9beb0-d496-11ea-8317-cfe8154f1f1a',panelIndex:'48ac95ea-1752-41f5-8c6d-7ec3b87d3da2',title:'Total%20Person%20IN%20Count',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:7,i:e312b38f-f64d-403a-96f2-11e7dbe77083,w:13,x:35,y:0),id:'27195ef0-4e7f-11ec-be91-8311423b8dce',panelIndex:e312b38f-f64d-403a-96f2-11e7dbe77083,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:dfe3f54b-634e-4f72-9435-f716806f11a1,w:13,x:22,y:7),id:fb558600-c73d-11ea-9f88-0f8f75dba7ad,panelIndex:dfe3f54b-634e-4f72-9435-f716806f11a1,title:'Age%20Group%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:13,i:aaecf6da-3c3c-4b1e-b494-701f51a8dcc8,w:13,x:35,y:7),id:'91a9b720-c73e-11ea-9f88-0f8f75dba7ad',panelIndex:aaecf6da-3c3c-4b1e-b494-701f51a8dcc8,title:'Gender%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'6435a2e3-4ccc-43ae-9941-4fa8c9a86b1e',w:22,x:0,y:20),id:a6f1c490-5f1f-11ec-aa53-272aef46cf4f,panelIndex:'6435a2e3-4ccc-43ae-9941-4fa8c9a86b1e',title:'Zone%20Wise%20Gender%20Trend',type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'15cfff4e-c104-4f5f-80f4-22d265dda21f',w:26,x:22,y:20),id:ad149e40-616a-11ec-aa53-272aef46cf4f,panelIndex:'15cfff4e-c104-4f5f-80f4-22d265dda21f',title:'Zone%20Wise%20Time%20Trend',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,savedVis:(data:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'2',params:(field:DressColorGroup.keyword,missingBucket:!t,missingBucketLabel:Other,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:15),schema:segment,type:terms)),searchSource:(filter:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ac85e640-4274-11ee-b3e3-77d199b200e2,key:SiteId,negate:!f,params:(query:118),type:phrase),query:(match_phrase:(SiteId:118))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ac85e640-4274-11ee-b3e3-77d199b200e2,key:Direction.keyword,negate:!f,params:(query:IN),type:phrase),query:(match_phrase:(Direction.keyword:IN))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ac85e640-4274-11ee-b3e3-77d199b200e2,key:NotificationType,negate:!f,params:(query:7),type:phrase),query:(match_phrase:(NotificationType:7)))),index:ac85e640-4274-11ee-b3e3-77d199b200e2,query:(language:kuery,query:''))),description:'',id:'',params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),detailedTooltip:!t,grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,maxLegendLines:5,orderBucketsBySum:!f,palette:(name:kibana_palette,type:palette),radiusRatio:0,seriesParams:!((circlesRadius:1,data:(id:'1',label:Count),drawLinesBetweenPoints:!t,interpolate:linear,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),truncateLegend:!t,type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:75,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(defaultYExtents:!f,mode:normal,setYExtents:!f,type:linear),show:!t,style:(),title:(text:''),type:value))),title:'',type:histogram,uiState:()),table:!n,vis:(colors:(Black:%233F2B5B,Blue:%230A437C,Pink:%23D683CE,Red:%23E24D42,White:%23DEDAF7))),gridData:(h:15,i:a51753ed-85bf-47bb-91e1-184db75d3f1d,w:48,x:0,y:34),panelIndex:a51753ed-85bf-47bb-91e1-184db75d3f1d,title:'Dress%20Color',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:!n),gridData:(h:15,i:'70d6c481-d4ec-41d1-b189-f7f8794810b5',w:48,x:0,y:49),id:e56af3d0-10a6-11ec-ba19-d18646159b91,panelIndex:'70d6c481-d4ec-41d1-b189-f7f8794810b5',title:'Peak%20Time%20Analysis',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:e12e9909-5c2c-4d81-9902-cdcd082a29ac,w:24,x:0,y:64),id:'2e910820-4419-11eb-87f8-0117038135d8',panelIndex:e12e9909-5c2c-4d81-9902-cdcd082a29ac,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:bad68676-0d07-440f-840c-49393791957f,w:24,x:24,y:64),id:'2a708da0-4a5f-11eb-bee4-db2ec99898a4',panelIndex:bad68676-0d07-440f-840c-49393791957f,type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:RetailAnalytics_v1.3.0,viewMode:view)&hide-filter-bar=true");
        
        //$("#rtailanalytics").attr("src", kibanaurl2 + "view/3fad9250-78a9-11ee-806f-772dba864a79?_g=(refreshInterval:(pause:!t,value:60000),time:("+ datefilter + "))&hide-filter-bar=true");
        
        //$("#rtailanalytics").attr("src", kibanaurl2 + "view/3825f7a0-f636-4338-98f6-5bedade4620d?_g=(filters:!((meta:(field:SiteId,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "),viewMode:view)&hide-filter-bar=true");
        
        //$("#rtailanalytics").attr("src", kibanaurl2 + "view/3fad9250-78a9-11ee-806f-772dba864a79?_g=(filters:!(('$state':(store:globalState),meta:(alias:!n,disabled:!f,field:SiteId,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!t,options:(hidePanelTitles:!f,useMargins:!t),refreshInterval:(pause:!f,value:30000),time:("+ datefilter +"),viewMode:view)&hide-filter-bar=true");
    
        $("#rtailanalytics").attr("src", kibanaurl2 + "view/3fad9250-78a9-11ee-806f-772dba864a79?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:RetailAnalytics_v1.3.0,viewMode:view)&hide-filter-bar=true");
    
    }else if ($analyticsversion == 'v1.3.1') {
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
        $("#rtailanalytics").attr("src", kibanaurl2 + "view/ca6fb670-6778-11ef-909e-0dfe087a0b39?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'ac85e640-4274-11ee-b3e3-77d199b200e2',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:20,i:'29590af9-0dd2-4894-a18c-2ad58c42d0b3',w:22,x:0,y:0),id:d96ba5d0-c73b-11ea-9f88-0f8f75dba7ad,panelIndex:'29590af9-0dd2-4894-a18c-2ad58c42d0b3',title:'Zone%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:7,i:'48ac95ea-1752-41f5-8c6d-7ec3b87d3da2',w:13,x:22,y:0),id:'38c9beb0-d496-11ea-8317-cfe8154f1f1a',panelIndex:'48ac95ea-1752-41f5-8c6d-7ec3b87d3da2',title:'Total%20Person%20IN%20Count',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:7,i:e312b38f-f64d-403a-96f2-11e7dbe77083,w:13,x:35,y:0),id:'27195ef0-4e7f-11ec-be91-8311423b8dce',panelIndex:e312b38f-f64d-403a-96f2-11e7dbe77083,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:13,i:dfe3f54b-634e-4f72-9435-f716806f11a1,w:13,x:22,y:7),id:fb558600-c73d-11ea-9f88-0f8f75dba7ad,panelIndex:dfe3f54b-634e-4f72-9435-f716806f11a1,title:'Age%20Group%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:13,i:aaecf6da-3c3c-4b1e-b494-701f51a8dcc8,w:13,x:35,y:7),id:'91a9b720-c73e-11ea-9f88-0f8f75dba7ad',panelIndex:aaecf6da-3c3c-4b1e-b494-701f51a8dcc8,title:'Gender%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'6435a2e3-4ccc-43ae-9941-4fa8c9a86b1e',w:22,x:0,y:20),id:a6f1c490-5f1f-11ec-aa53-272aef46cf4f,panelIndex:'6435a2e3-4ccc-43ae-9941-4fa8c9a86b1e',title:'Zone%20Wise%20Gender%20Trend',type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'15cfff4e-c104-4f5f-80f4-22d265dda21f',w:26,x:22,y:20),id:ad149e40-616a-11ec-aa53-272aef46cf4f,panelIndex:'15cfff4e-c104-4f5f-80f4-22d265dda21f',title:'Zone%20Wise%20Time%20Trend',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,savedVis:(data:(aggs:!((enabled:!t,id:'1',params:(),schema:metric,type:count),(enabled:!t,id:'2',params:(field:DressColorGroup.keyword,missingBucket:!t,missingBucketLabel:Other,order:desc,orderBy:'1',otherBucket:!f,otherBucketLabel:Other,size:15),schema:segment,type:terms)),searchSource:(filter:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ac85e640-4274-11ee-b3e3-77d199b200e2,key:SiteId,negate:!f,params:(query:118),type:phrase),query:(match_phrase:(SiteId:118))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ac85e640-4274-11ee-b3e3-77d199b200e2,key:Direction.keyword,negate:!f,params:(query:IN),type:phrase),query:(match_phrase:(Direction.keyword:IN))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ac85e640-4274-11ee-b3e3-77d199b200e2,key:NotificationType,negate:!f,params:(query:7),type:phrase),query:(match_phrase:(NotificationType:7)))),index:ac85e640-4274-11ee-b3e3-77d199b200e2,query:(language:kuery,query:''))),description:'',id:'',params:(addLegend:!t,addTimeMarker:!f,addTooltip:!t,categoryAxes:!((id:CategoryAxis-1,labels:(filter:!t,show:!t,truncate:100),position:bottom,scale:(type:linear),show:!t,style:(),title:(),type:category)),detailedTooltip:!t,grid:(categoryLines:!f),labels:(show:!f),legendPosition:right,maxLegendLines:5,orderBucketsBySum:!f,palette:(name:kibana_palette,type:palette),radiusRatio:0,seriesParams:!((circlesRadius:1,data:(id:'1',label:Count),drawLinesBetweenPoints:!t,interpolate:linear,lineWidth:2,mode:stacked,show:!t,showCircles:!t,type:histogram,valueAxis:ValueAxis-1)),thresholdLine:(color:%23E7664C,show:!f,style:full,value:10,width:1),times:!(),truncateLegend:!t,type:histogram,valueAxes:!((id:ValueAxis-1,labels:(filter:!f,rotate:75,show:!t,truncate:100),name:LeftAxis-1,position:left,scale:(defaultYExtents:!f,mode:normal,setYExtents:!f,type:linear),show:!t,style:(),title:(text:''),type:value))),title:'',type:histogram,uiState:()),table:!n,vis:(colors:(Black:%233F2B5B,Blue:%230A437C,Pink:%23D683CE,Red:%23E24D42,White:%23DEDAF7))),gridData:(h:15,i:a51753ed-85bf-47bb-91e1-184db75d3f1d,w:48,x:0,y:34),panelIndex:a51753ed-85bf-47bb-91e1-184db75d3f1d,title:'Dress%20Color',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:!n),gridData:(h:15,i:'70d6c481-d4ec-41d1-b189-f7f8794810b5',w:48,x:0,y:49),id:e56af3d0-10a6-11ec-ba19-d18646159b91,panelIndex:'70d6c481-d4ec-41d1-b189-f7f8794810b5',title:'Peak%20Time%20Analysis',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:e12e9909-5c2c-4d81-9902-cdcd082a29ac,w:24,x:0,y:64),id:'2e910820-4419-11eb-87f8-0117038135d8',panelIndex:e12e9909-5c2c-4d81-9902-cdcd082a29ac,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:bad68676-0d07-440f-840c-49393791957f,w:24,x:24,y:64),id:'2a708da0-4a5f-11eb-bee4-db2ec99898a4',panelIndex:bad68676-0d07-440f-840c-49393791957f,type:visualization,version:'7.17.3'),(embeddableConfig:(hidePanelTitles:!f),gridData:(h:15,i:'03efaedf-a9dd-4ba0-a921-7ba32a7dcfc1',w:48,x:0,y:79),id:f8b06e60-6207-11ef-909e-0dfe087a0b39,panelIndex:'03efaedf-a9dd-4ba0-a921-7ba32a7dcfc1',title:'Person%20Density',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:RetailAnalytics_v1.3.1,viewMode:view)&hide-filter-bar=false");
        }
    else if ($analyticsversion == 'v0.0.0') {
        $("#rtailanalytics").css("display", "none");
        $("#retadivnew").css("visibility", "visible");
        $("#retadivnew").css("display", "block");
    }
}
;
