$(function () {
    traction_analysis(0, "false")
});
function traction_analysis(redirection, isdatef_is_custom) {
    $eventfilter = $('select[name="eventfilter"]').val();
    if ($eventfilter == 0) {
        $(".reportdisable *").attr("disabled", "disabled").off('click');
        $(".reportdisable").css('pointer-events', 'none');
    }
    if (isdatef_is_custom == "true") {
        eso_dashboard();
    }
    else if (isdatef_is_custom == "false") {
        sitefilter();
        $thisdatefilter = datefilter();
        if ($thisdatefilter == "custom") { }
        else {
            traction_graph_display($thissitefilter, $thisdatefilter, redirection);
        }
    }
}
$('select[name="datefilter"]').change(function () {
    $eventfilter = $('select[name="eventfilter"]').val();
    if ($eventfilter == 0) {
        $(".reportdisable *").attr("disabled", "disabled").off('click');
        $(".reportdisable").css('pointer-events', 'none');
    }
    traction_analysis(0, "false");
});
$('select[name="sitefilter"]').change(function () {
    sitefilter();
    var datef_val = $('select[name="datefilter"]').val();
    if (datef_val == "custom") {
        $(".modal-dialog").css("display", "none");
        traction_analysis(1, "true");
    }
    else {
        traction_analysis(1, "false");
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
function traction_graph_display(sitefilter, datefilter, redirection) {
    $eventfiltertxt = $("#events_d option:selected").text();
    $eventfilter_name = $eventfiltertxt.replace(/\s+/, "");
    $eventfilterval = $("#events_d option:selected").val();
    if ($eventfilterval == 0) {
        $eventfilter_name = "nodata";
        if (redirection == 0) {
            // $("#tractionanalytics").attr("src", kibanaurl2 + "view/fc2f0730-13cc-11ed-8dd3-75dad63ca715?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Event.keyword,negate:!f,params:!('" + $eventfilter_name + "','No%20Event'),type:phrases),query:(bool:(minimum_should_match:1,should:!((match_phrase:(Event.keyword:'" + $eventfilter_name + "')),(match_phrase:(Event.keyword:'No%20Event'))))))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:13,i:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',w:15,x:0,y:0),id:'4c8ab9a0-13bd-11ed-8dd3-75dad63ca715',panelIndex:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:13,i:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',w:33,x:15,y:0),id:c5d5b490-13c7-11ed-8dd3-75dad63ca715,panelIndex:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(legendOpen:!t)),gridData:(h:14,i:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',w:24,x:0,y:13),id:'22f988d0-13c4-11ed-8dd3-75dad63ca715',panelIndex:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(legendOpen:!t)),gridData:(h:14,i:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,w:24,x:24,y:13),id:'763f96b0-13c4-11ed-8dd3-75dad63ca715',panelIndex:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:!n),gridData:(h:12,i:'63af69ca-09f0-4079-b847-ed0b8193e372',w:48,x:0,y:27),id:deed1950-13cc-11ed-8dd3-75dad63ca715,panelIndex:'63af69ca-09f0-4079-b847-ed0b8193e372',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:14,i:'25bef554-028d-485f-8d67-ea52201cee82',w:48,x:0,y:39),id:b2611cd0-1488-11ed-bd3b-c3402d8c57d8,panelIndex:'25bef554-028d-485f-8d67-ea52201cee82',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Traction_Analysis,viewMode:view)&hide-filter-bar=true");
            // $("#tractionanalytics").attr("src", kibanaurl2 + "view/fc2f0730-13cc-11ed-8dd3-75dad63ca715?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:"+
            //     +"'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Event.keyword,negate:!f,params:!('" + $eventfilter_name + "','No%20Event'),type:phrases),query:(bool:(minimum_should_match:1,should:!((match_phrase:(Event.keyword:'" + $eventfilter_name + "')),(match_phrase:(Event.keyword:'No%20Event'))))))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',w:15,x:0,y:0),id:'4c8ab9a0-13bd-11ed-8dd3-75dad63ca715',panelIndex:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',title:'Total%20Participant',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',w:33,x:15,y:0),id:c5d5b490-13c7-11ed-8dd3-75dad63ca715,panelIndex:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',title:'Zone%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:14,i:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',w:24,x:0,y:13),id:'22f988d0-13c4-11ed-8dd3-75dad63ca715',panelIndex:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',title:'Gender%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:14,i:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,w:24,x:24,y:13),id:'763f96b0-13c4-11ed-8dd3-75dad63ca715',panelIndex:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,title:'Age%20Group%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:!n),gridData:(h:12,i:'63af69ca-09f0-4079-b847-ed0b8193e372',w:48,x:0,y:27),id:deed1950-13cc-11ed-8dd3-75dad63ca715,panelIndex:'63af69ca-09f0-4079-b847-ed0b8193e372',title:'Event%20Peak%20Time%20Analysis',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'25bef554-028d-485f-8d67-ea52201cee82',w:48,x:0,y:39),id:b2611cd0-1488-11ed-bd3b-c3402d8c57d8,panelIndex:'25bef554-028d-485f-8d67-ea52201cee82',title:'Event%20Participants%20Ratio',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Traction_Analysis,viewMode:view)&hide-filter-bar=true");
            $("#tractionanalytics").attr("src", kibanaurl2 + "view/fc2f0730-13cc-11ed-8dd3-75dad63ca715?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Event.keyword,negate:!f,params:!('" + $eventfilter_name + "','No%20Event'),type:phrases),query:(bool:(minimum_should_match:1,should:!((match_phrase:(Event.keyword:'" + $eventfilter_name + "')),(match_phrase:(Event.keyword:'No%20Event'))))))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'8925e491-a8a2-4ea3-a245-ec93a676c5a5',w:15,x:0,y:0),id:'0af77a90-1873-11ed-8bd2-11f86e480d40',panelIndex:'8925e491-a8a2-4ea3-a245-ec93a676c5a5',title:'Total%20Person',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',w:33,x:15,y:0),id:c5d5b490-13c7-11ed-8dd3-75dad63ca715,panelIndex:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',title:'Zone%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t))," +
                "gridData:(h:14,i:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',w:24,x:0,y:13),id:'22f988d0-13c4-11ed-8dd3-75dad63ca715',panelIndex:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',title:'Gender%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:14,i:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,w:24,x:24,y:13),id:'763f96b0-13c4-11ed-8dd3-75dad63ca715',panelIndex:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,title:'Age%20Group%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:!n),gridData:(h:12,i:'63af69ca-09f0-4079-b847-ed0b8193e372',w:48,x:0,y:27),id:deed1950-13cc-11ed-8dd3-75dad63ca715,panelIndex:'63af69ca-09f0-4079-b847-ed0b8193e372',title:'Event%20Peak%20Time%20Analysis',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'25bef554-028d-485f-8d67-ea52201cee82',w:48,x:0,y:39),id:b2611cd0-1488-11ed-bd3b-c3402d8c57d8,panelIndex:'25bef554-028d-485f-8d67-ea52201cee82',title:'Event%20Participants%20Ratio',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Traction_Analysis,viewMode:view)&hide-filter-bar=true");
        } else if (redirection == 1) {
            window.location = '/tractionanalysis/data/' + sitefilter;
        }
    }
    else {
        if (redirection == 0) {
            // $("#tractionanalytics").attr("src", kibanaurl2 + "view/fc2f0730-13cc-11ed-8dd3-75dad63ca715?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + $thisdatefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + $thissitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + $thissitefilter + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Event.keyword,negate:!f,params:!('" + $eventfilter_name + "','No%20Event'),type:phrases),query:(bool:(minimum_should_match:1,should:!((match_phrase:(Event.keyword:'" + $eventfilter_name + "')),(match_phrase:(Event.keyword:'No%20Event'))))))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:13,i:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',w:15,x:0,y:0),id:'4c8ab9a0-13bd-11ed-8dd3-75dad63ca715',panelIndex:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:13,i:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',w:33,x:15,y:0),id:c5d5b490-13c7-11ed-8dd3-75dad63ca715,panelIndex:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(legendOpen:!t)),gridData:(h:14,i:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',w:24,x:0,y:13),id:'22f988d0-13c4-11ed-8dd3-75dad63ca715',panelIndex:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(legendOpen:!t)),gridData:(h:14,i:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,w:24,x:24,y:13),id:'763f96b0-13c4-11ed-8dd3-75dad63ca715',panelIndex:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:!n),gridData:(h:12,i:'63af69ca-09f0-4079-b847-ed0b8193e372',w:48,x:0,y:27),id:deed1950-13cc-11ed-8dd3-75dad63ca715,panelIndex:'63af69ca-09f0-4079-b847-ed0b8193e372',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:14,i:'25bef554-028d-485f-8d67-ea52201cee82',w:48,x:0,y:39),id:b2611cd0-1488-11ed-bd3b-c3402d8c57d8,panelIndex:'25bef554-028d-485f-8d67-ea52201cee82',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Traction_Analysis,viewMode:view)&hide-filter-bar=true");
            // $("#tractionanalytics").attr("src", kibanaurl2 + "view/fc2f0730-13cc-11ed-8dd3-75dad63ca715?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:"+
            //     +"'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Event.keyword,negate:!f,params:!('" + $eventfilter_name + "','No%20Event'),type:phrases),query:(bool:(minimum_should_match:1,should:!((match_phrase:(Event.keyword:'" + $eventfilter_name + "')),(match_phrase:(Event.keyword:'No%20Event'))))))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',w:15,x:0,y:0),id:'4c8ab9a0-13bd-11ed-8dd3-75dad63ca715',panelIndex:'614e06ce-1eef-49cf-b5f5-fc8c45400a6a',title:'Total%20Participant',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',w:33,x:15,y:0),id:c5d5b490-13c7-11ed-8dd3-75dad63ca715,panelIndex:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',title:'Zone%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:14,i:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',w:24,x:0,y:13),id:'22f988d0-13c4-11ed-8dd3-75dad63ca715',panelIndex:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',title:'Gender%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:14,i:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,w:24,x:24,y:13),id:'763f96b0-13c4-11ed-8dd3-75dad63ca715',panelIndex:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,title:'Age%20Group%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:!n),gridData:(h:12,i:'63af69ca-09f0-4079-b847-ed0b8193e372',w:48,x:0,y:27),id:deed1950-13cc-11ed-8dd3-75dad63ca715,panelIndex:'63af69ca-09f0-4079-b847-ed0b8193e372',title:'Event%20Peak%20Time%20Analysis',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'25bef554-028d-485f-8d67-ea52201cee82',w:48,x:0,y:39),id:b2611cd0-1488-11ed-bd3b-c3402d8c57d8,panelIndex:'25bef554-028d-485f-8d67-ea52201cee82',title:'Event%20Participants%20Ratio',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Traction_Analysis,viewMode:view)&hide-filter-bar=true");
            $("#tractionanalytics").attr("src", kibanaurl2 + "view/fc2f0730-13cc-11ed-8dd3-75dad63ca715?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:Event.keyword,negate:!f,params:!('" + $eventfilter_name + "','No%20Event'),type:phrases),query:(bool:(minimum_should_match:1,should:!((match_phrase:(Event.keyword:'" + $eventfilter_name + "')),(match_phrase:(Event.keyword:'No%20Event'))))))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'8925e491-a8a2-4ea3-a245-ec93a676c5a5',w:15,x:0,y:0),id:'0af77a90-1873-11ed-8bd2-11f86e480d40',panelIndex:'8925e491-a8a2-4ea3-a245-ec93a676c5a5',title:'Total%20Person',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',w:33,x:15,y:0),id:c5d5b490-13c7-11ed-8dd3-75dad63ca715,panelIndex:'2529ea46-04a7-4fb1-bd75-eab96bb3b9d9',title:'Zone%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t))," +
                "gridData:(h:14,i:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',w:24,x:0,y:13),id:'22f988d0-13c4-11ed-8dd3-75dad63ca715',panelIndex:'08c98c63-0e7e-404e-9eaf-cb15cacc1d02',title:'Gender%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:14,i:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,w:24,x:24,y:13),id:'763f96b0-13c4-11ed-8dd3-75dad63ca715',panelIndex:c1a26a3d-ed4c-437e-ab55-e8e0144c811c,title:'Age%20Group%20Wise',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:!n),gridData:(h:12,i:'63af69ca-09f0-4079-b847-ed0b8193e372',w:48,x:0,y:27),id:deed1950-13cc-11ed-8dd3-75dad63ca715,panelIndex:'63af69ca-09f0-4079-b847-ed0b8193e372',title:'Event%20Peak%20Time%20Analysis',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'25bef554-028d-485f-8d67-ea52201cee82',w:48,x:0,y:39),id:b2611cd0-1488-11ed-bd3b-c3402d8c57d8,panelIndex:'25bef554-028d-485f-8d67-ea52201cee82',title:'Event%20Participants%20Ratio',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Traction_Analysis,viewMode:view)&hide-filter-bar=true");
        } else if (redirection == 1) {
            window.location = '/tractionanalysis/data/' + sitefilter;
        }
    }
}
function eso_dashboard(page) {
    localStorage.setItem("datefilter", "custom");
    $eventfilter = $('select[name="eventfilter"]').val();
    $thisdatefilter = $thisdatefilter;
    $sitefilterdata = $('select[name="sitefilter"]').val().split(',');
    $sitefilter = $sitefilterdata[0];
    $(".frmtodivdata").css("display", "block");
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
    traction_graph_display(datefroto, $thissitefilter, 0);
}
