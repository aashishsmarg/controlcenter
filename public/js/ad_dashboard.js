$(function () {
    ad_dashboard();
});
function ad_dashboard() {
    sitefilter();
    addashboard_graph_display($thissitefilter);
}
$('select[name="sitefilter"]').change(function () {
    ad_dashboard();
});
function addashboard_graph_display(sitefilter) {
    if ($vehicledashboardversion == 'v0.0.0') {
        $("#addashboard").css("display", "none");
        $("#adddivnew").css("display", "block");
        $("#adddivnew").css("visibility", "visible");
    }
    else {
        $("#addashboard").css("display", "block");
        $("#adddivnew").css("visibility", "hidden");
        $("#adddivnew").css("display", "hidden");
        $("#addashboard").attr("src", kibanaurl2 + "view/e490deb0-250f-11ed-884e-69ba52e53abb?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(from:now-1y%2Fd,to:now%2Fd))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:11,i:ee1d6ac6-6821-4d99-875c-e53d9446c461,w:19,x:0,y:0),id:'85705180-1fac-11ed-93c9-010b4e29d7f3',panelIndex:ee1d6ac6-6821-4d99-875c-e53d9446c461,title:'Screen%20Views%20Summary%20',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:11,i:'018c856a-f901-4f18-ad49-a6fa65309a9f',w:29,x:19,y:0),id:e7681140-1f82-11ed-93c9-010b4e29d7f3,panelIndex:'018c856a-f901-4f18-ad49-a6fa65309a9f',title:'Screen%20Views%20Comparison%20(4%20Day)',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'3afe83fc-001e-47dd-b518-b32eeb2e81bf',w:24,x:0,y:11),id:'72ab2f50-1f8b-11ed-93c9-010b4e29d7f3',panelIndex:'3afe83fc-001e-47dd-b518-b32eeb2e81bf',title:'Month-wise%20Screen%20Views',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:ee036987-2e09-4b95-9df5-d866f703d93b,w:24,x:24,y:11),id:a2bfeed0-275e-11ed-884e-69ba52e53abb,panelIndex:ee036987-2e09-4b95-9df5-d866f703d93b,title:'Month-wise%20Offer%20Views',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Ad%20Dashboard',viewMode:view)&hide-filter-bar=true");
        // advertisment_dashboard($thisdatefilter, $thissitefilter)
    }
}
