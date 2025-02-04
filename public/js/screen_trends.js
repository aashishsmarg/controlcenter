$(function () {
    screen_trends_analysis("false");
});
// function screen_trends_analysis() {
//     sitefilter();
//     $thisdatefilter = datefilter();
//     if ($thisdatefilter == "custom") { }
//     else {
//         screentrends_graph_display($thissitefilter, $thisdatefilter);
//     }
// }
function screen_trends_analysis(isdatef_is_custom) {
    if (isdatef_is_custom == "true") {
        eso_dashboard("nopage");
    }
    else if (isdatef_is_custom == "false") {
        sitefilter();
        $thisdatefilter = datefilter();
        if ($thisdatefilter == "custom") { }
        else {
            screentrends_graph_display($thissitefilter, $thisdatefilter);
        }
    }
}
$('select[name="datefilter"]').change(function () {
    screen_trends_analysis("false");
});
$('select[name="sitefilter"]').change(function () {
    sitefilter();
    var datef_val = $('select[name="datefilter"]').val();
    if (datef_val == "custom") {
        screen_trends_analysis("true");
    }
    else {
        screen_trends_analysis("false");
    }
});
function screentrends_graph_display(sitefilter, datefilter) {
    if ($vehicledashboardversion == 'v0.0.0') {
        $("#adanalytics").css("display", "none");
        $("#screentrendivnew").css("display", "block");
        $("#screentrendivnew").css("visibility", "visible");
    }
    else {
        $("#adanalytics").css("display", "block");
        $("#screentrendivnew").css("visibility", "hidden");
        $("#screentrendivnew").css("display", "hidden");
        $("#adanalytics").attr("src", kibanaurl2 + "view/69a9e600-2510-11ed-884e-69ba52e53abb?embed=true&_g=(filters:!(),query:(language:kuery,query:''),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:12,i:e549a31f-9aa0-48de-b789-0282e39b83b3,w:10,x:0,y:0),id:a62b2350-1e08-11ed-93c9-010b4e29d7f3,panelIndex:e549a31f-9aa0-48de-b789-0282e39b83b3,title:'Total%20Person%20Count',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:12,i:d99656ec-c745-453d-a8e9-67882779c6fc,w:14,x:10,y:0),id:'7fbf5040-1f81-11ed-93c9-010b4e29d7f3',panelIndex:d99656ec-c745-453d-a8e9-67882779c6fc,title:'Screen-wise%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,table:!n,vis:(legendOpen:!t)),gridData:(h:12,i:'98a3ca4b-e742-4239-ac50-dac5ed968464',w:24,x:24,y:0),id:'48aa7e80-1e0b-11ed-93c9-010b4e29d7f3',panelIndex:'98a3ca4b-e742-4239-ac50-dac5ed968464',title:'Gender-wise%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:12,i:dbf374f1-51bb-47c8-bd4a-53af5fbdecca,w:24,x:0,y:12),id:'8084dea0-21fc-11ed-884e-69ba52e53abb',panelIndex:dbf374f1-51bb-47c8-bd4a-53af5fbdecca,title:'Screens%20View%20Time%20(In%20second)',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:12,i:b9b76c4c-1a43-4879-914e-a6c3e8595806,w:24,x:24,y:12),id:cdaf90c0-237e-11ed-884e-69ba52e53abb,panelIndex:b9b76c4c-1a43-4879-914e-a6c3e8595806,title:'Time%20Bucket-wise%20Views%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:a5a05c7d-d2ae-4543-acb0-35802c611603,w:15,x:0,y:24),id:e7a0a500-2054-11ed-93c9-010b4e29d7f3,panelIndex:a5a05c7d-d2ae-4543-acb0-35802c611603,title:'Zone-wise%20Screen%20Views'," +
            "type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'89eacf14-09e2-48dc-bb06-11c2e1318a1d',w:33,x:15,y:24),id:c8402040-1e0c-11ed-93c9-010b4e29d7f3,panelIndex:'89eacf14-09e2-48dc-bb06-11c2e1318a1d',title:'Zone-wise%20Views%20Trend',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'0b87f9da-698d-4076-afda-022ebebcc0ed',w:30,x:0,y:39),id:e03d5230-2442-11ed-884e-69ba52e53abb,panelIndex:'0b87f9da-698d-4076-afda-022ebebcc0ed',title:'Total%20Person%20vs%20Face%20vs%20Gaze',type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:(legendOpen:!t)),gridData:(h:15,i:'9711fa46-591e-400c-8ac6-950c529181f7',w:18,x:30,y:39),id:'86b5e140-1e35-11ed-93c9-010b4e29d7f3',panelIndex:'9711fa46-591e-400c-8ac6-950c529181f7',title:'Zone-wise%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(hidePanelTitles:!f,vis:!n),gridData:(h:14,i:'1c23ed3b-17c2-429e-9dfb-e9e4c885b2cd',w:48,x:0,y:54),id:d4746820-277c-11ed-884e-69ba52e53abb,panelIndex:'1c23ed3b-17c2-429e-9dfb-e9e4c885b2cd',title:'Peak%20Time%20Analysis%20',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Screen%20Trends%20Dashboard',viewMode:view)&hide-filter-bar=true");
    }
}
function eso_dashboard(page) {

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
    screentrends_graph_display(datefroto, $thissitefilter);
}
