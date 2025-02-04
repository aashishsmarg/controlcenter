$(function () {
    offer_trends_analysis("false");
});
function offer_trends_analysis(isdatef_is_custom) {
    if (isdatef_is_custom == "true") {
        eso_dashboard("nopage");
    }
    else if (isdatef_is_custom == "false") {
        sitefilter();
        $thisdatefilter = datefilter();
        if ($thisdatefilter == "custom") { }
        else {
            offertrends_graph_display($thissitefilter, $thisdatefilter);
        }
    }
}
$('select[name="datefilter"]').change(function () {
    offer_trends_analysis("false");
});
$('select[name="sitefilter"]').change(function () {
    sitefilter();
    var datef_val = $('select[name="datefilter"]').val();
    if (datef_val == "custom") {
        offer_trends_analysis("true");
    }
    else {
        offer_trends_analysis("false");
    }
});
function offertrends_graph_display(sitefilter, datefilter) {
    if ($vehicledashboardversion == 'v0.0.0') {
        $("#offeranalytics").css("display", "none");
        $("#offerdivnew").css("display", "block");
        $("#offerdivnew").css("visibility", "visible");
    }
    else {
        $("#offeranalytics").css("display", "block");
        $("#offerdivnew").css("visibility", "hidden");
        $("#offerdivnew").css("display", "hidden");
        $("#offeranalytics").attr("src", kibanaurl2 + "view/d742f9f0-2375-11ed-884e-69ba52e53abb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:14,i:'762d6628-0b15-4ab3-b952-e4e98455eaec',w:10,x:0,y:0),id:'2fa0fd80-2219-11ed-884e-69ba52e53abb',panelIndex:'762d6628-0b15-4ab3-b952-e4e98455eaec',title:'Total%20View%20Count',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:14,i:'0b68962b-8cdb-41c1-907c-cae717f55f7d',w:22,x:26,y:0),id:a13e3be0-23b0-11ed-884e-69ba52e53abb,panelIndex:'0b68962b-8cdb-41c1-907c-cae717f55f7d',type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:14,i:'4af8a619-267c-4c33-b298-adfe7e0d72d1',w:16,x:10,y:0),id:d6d5f880-243f-11ed-884e-69ba52e53abb,panelIndex:'4af8a619-267c-4c33-b298-adfe7e0d72d1',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:13,i:'7985316e-72b7-4832-b7d1-376fb55ca7b2',w:20,x:27,y:14),id:'566d4730-23ad-11ed-884e-69ba52e53abb',panelIndex:'7985316e-72b7-4832-b7d1-376fb55ca7b2',title:'Average%20Offer%20View%20Time',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(legendOpen:!f)),gridData:(h:13,i:f8930aa1-c98e-41d9-a04b-a5fc233bd465,w:27,x:0,y:14),id:e4f0c1d0-2376-11ed-884e-69ba52e53abb,panelIndex:f8930aa1-c98e-41d9-a04b-a5fc233bd465,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:!n),gridData:(h:16,i:'44670afa-3067-4f4e-adf2-55cdb5d01e5e',w:48,x:0,y:27),id:'3ee5e730-237a-11ed-884e-69ba52e53abb',panelIndex:'44670afa-3067-4f4e-adf2-55cdb5d01e5e',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(params:(sort:(columnIndex:0,direction:asc)))),gridData:(h:15,i:a2e3e17b-86c0-415a-ae64-ca20a9ef1f05,w:48,x:0,y:43),id:'7f69d9f0-2376-11ed-884e-69ba52e53abb',panelIndex:a2e3e17b-86c0-415a-ae64-ca20a9ef1f05,type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Offer_Dashboard,viewMode:view)&hide-filter-bar=true");
    }
}
function eso_dashboard(page) {
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
    //    traction_graph_display(datefroto, $thissitefilter);
    offertrends_graph_display($thissitefilter, datefroto);
}
