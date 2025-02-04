$(function () {
    is_custom("false");
});
function is_custom(isdatef_is_custom) {
    if (isdatef_is_custom == "true") {
        for_footfall_distribution_custom();
    }
    else if (isdatef_is_custom == "false") {
        sitefilter();
        $thisdatefilter = datefilter();
        if ($thisdatefilter == "custom") { }
        else {
            footfalldistribution_graph_display($thissitefilter, $thisdatefilter);
        }
    }
}
function download_footfalldistribution_analytics_report(a) {
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
    console.log(newfromdate)
    console.log(newtodate)
    console.log(catID)
    $.get("/footfalldistribution/data/" + catID + "/" + fromdate + "/" + todate + '', function (data) {
        if (data) {
            msgFromServer = data.text;
            if (msgFromServer == "success") {
                newSiteName = data.sitename.split(" ").join("-");
                window.open(reportRedirect + "report/Smarg_" + newSiteName + "_Footfall_Distribution_Reports_" + newfromdate + "_" + newtodate + ".xls");
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
    is_custom("false");
});
$('select[name="sitefilter"]').change(function () {
    sitefilter();
    var datef_val = $('select[name="datefilter"]').val();
    if (datef_val == "custom") {
        $(".modal-dialog").css("display", "none");
        is_custom("true");
    }
    else {
        is_custom("false");
    }
});
function for_footfall_distribution_custom() {
    $(".frmtodivdata").css("display", "block");
    localStorage.setItem("datefilter", "custom");
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#from").datepicker().val();
    var todate = $("#to").datepicker().val();
    var sit_id = $('select[name="sitefilter"]').val();
    console.log(fromdate + " " + todate)
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
    footfalldistribution_graph_display($thissitefilter, datefroto);
}
function footfalldistribution_graph_display(sitefilter, datefilter) {
    var distribution_version = $('select[name="sitefilter"]').val().split(",")[4];
    
    console.log("distribution_version")
    console.log(distribution_version)
    if (distribution_version === 'v1.0.0') {
	    $("#footfall_distribution_analytics").css("display", "block");
        ///$("#footfall_distribution_analytics").attr("src", kibanaurl2 + "view/791b17b0-edbb-11ee-9b15-9dbb1e3cc316?embed=true&_g=(refreshInterval:(pause:!t,value:60000),time:(" + datefilter + "))"
        
        $("#footfall_distribution_analytics").attr("src", kibanaurl2 + "view/791b17b0-edbb-11ee-9b15-9dbb1e3cc316?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ac85e640-4274-11ee-b3e3-77d199b200e2,key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:15,i:'5e49ff96-c777-4f92-b8e9-2adf2af60f5d',w:24,x:0,y:0),id:'3fb46ff0-edb4-11ee-9b15-9dbb1e3cc316',panelIndex:'5e49ff96-c777-4f92-b8e9-2adf2af60f5d',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(legendOpen:!f)),gridData:(h:15,i:ae2f55c1-9899-406f-9375-a8d405fd26ce,w:24,x:24,y:0),id:e73b2d70-edb6-11ee-9b15-9dbb1e3cc316,panelIndex:ae2f55c1-9899-406f-9375-a8d405fd26ce,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:'9f9885bd-ecfb-4e92-bb1e-299a53075692',w:24,x:0,y:15),id:f1539dc0-edb0-11ee-9b15-9dbb1e3cc316,panelIndex:'9f9885bd-ecfb-4e92-bb1e-299a53075692',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:c82af756-3ebb-4508-93c1-41d0782f1189,w:24,x:24,y:15),id:'973bf4e0-edb0-11ee-9b15-9dbb1e3cc316',panelIndex:c82af756-3ebb-4508-93c1-41d0782f1189,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:f7584c37-6fce-4c40-a190-3fd9ce9598d2,w:24,x:0,y:30),id:'6e524eb0-edb7-11ee-9b15-9dbb1e3cc316',panelIndex:f7584c37-6fce-4c40-a190-3fd9ce9598d2,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:'9d4697e7-e141-49c4-9c9a-57c89fc62c61',w:24,x:24,y:30),id:'426d8a90-edb6-11ee-9b15-9dbb1e3cc316',panelIndex:'9d4697e7-e141-49c4-9c9a-57c89fc62c61',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:!n),gridData:(h:15,i:'5c290e02-90ef-4f22-bcd6-80f4f6b9e9a5',w:48,x:0,y:45),id:'079dccb0-78c3-11eb-9090-8fcb9b0c766e',panelIndex:'5c290e02-90ef-4f22-bcd6-80f4f6b9e9a5',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:15,i:'9c236efa-cb26-4adf-bb83-9c0c40e9942b',w:48,x:0,y:60),id:'43a91ff0-f0b8-11ee-8bef-290bce539de5',panelIndex:'9c236efa-cb26-4adf-bb83-9c0c40e9942b',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:PassageFloorBlockAnalytics_v1.0.0,viewMode:view)&hide-filter-bar=true");
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
    }else if (distribution_version === 'v2.0.0') {
        $("#footfall_distribution_analytics").attr("src", kibanaurl2 + "view/56c4a930-c0fa-11ee-9c14-b1c4a95199b9?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'ac85e640-4274-11ee-b3e3-77d199b200e2',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:30,i:a0ba7376-a50c-49e1-be6c-50255e1405cb,w:24,x:0,y:0),id:'6cdf5440-c0f5-11ee-9c14-b1c4a95199b9',panelIndex:a0ba7376-a50c-49e1-be6c-50255e1405cb,title:'Category%20Wise%20Store%20Traction',type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'19c3f2e7-c52d-4a81-b8fa-665c65f9f1a0',w:24,x:24,y:0),id:'414c4f10-c0f3-11ee-9c14-b1c4a95199b9',panelIndex:'19c3f2e7-c52d-4a81-b8fa-665c65f9f1a0',title:'Store%20Wise%20Gender%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'8d1ab48c-4767-499c-9e43-dca451a201f7',w:24,x:24,y:15),id:'0b796650-c0f5-11ee-9c14-b1c4a95199b9',panelIndex:'8d1ab48c-4767-499c-9e43-dca451a201f7',title:'Store%20Wise%20Age%20Group%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'084c23ad-64f2-414d-bc55-7a89c8b00d0d',w:48,x:0,y:30),id:'77890e70-c0f7-11ee-9c14-b1c4a95199b9',panelIndex:'084c23ad-64f2-414d-bc55-7a89c8b00d0d',title:'Block%20Wise%20Store%20Traction',type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f,vis:!n),gridData:(h:15,i:'02c98b7c-1249-45f4-bfdf-b171caf69edd',w:24,x:0,y:45),id:f28f8090-c0f7-11ee-9c14-b1c4a95199b9,panelIndex:'02c98b7c-1249-45f4-bfdf-b171caf69edd',title:'Category%20Wise%20Age%20Group%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'79ae3d80-298e-4259-a908-1b5232c9ff69',w:24,x:24,y:45),id:ef4c8000-c0f6-11ee-9c14-b1c4a95199b9,panelIndex:'79ae3d80-298e-4259-a908-1b5232c9ff69',title:'Category%20Wise%20Gender%20Distribution',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:17,i:d1286061-d043-4132-beea-c63b62d80f36,w:24,x:0,y:60),id:acff3460-c0f9-11ee-9c14-b1c4a95199b9,panelIndex:d1286061-d043-4132-beea-c63b62d80f36,title:'Block%20Wise%20Category%20Traction',type:lens,version:'7.17.3'),(embeddableConfig:(attributes:(references:!((id:ac85e640-4274-11ee-b3e3-77d199b200e2,name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:ac85e640-4274-11ee-b3e3-77d199b200e2,name:indexpattern-datasource-layer-2d103a75-bef3-45f0-9642-289cd9e63d8c,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('2d103a75-bef3-45f0-9642-289cd9e63d8c':(columnOrder:!('12a59cd6-ee25-48f2-a0c8-142c82cc4f26',bcb2b83e-bcbb-474d-9a05-1f659dbfd431,c08e6f7d-4a97-4efd-b34b-9eb10f803ec4),columns:('12a59cd6-ee25-48f2-a0c8-142c82cc4f26':(dataType:string,isBucketed:!t,label:'Top%20values%20of%20Category.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:c08e6f7d-4a97-4efd-b34b-9eb10f803ec4,type:column),orderDirection:desc,otherBucket:!t,size:5),scale:ordinal,sourceField:Category.keyword),bcb2b83e-bcbb-474d-9a05-1f659dbfd431:(dataType:string,isBucketed:!t,label:'Top%20values%20of%20Block.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:c08e6f7d-4a97-4efd-b34b-9eb10f803ec4,type:column),orderDirection:desc,otherBucket:!t,size:3),scale:ordinal,sourceField:Block.keyword),c08e6f7d-4a97-4efd-b34b-9eb10f803ec4:(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:default,groups:!('12a59cd6-ee25-48f2-a0c8-142c82cc4f26',bcb2b83e-bcbb-474d-9a05-1f659dbfd431),layerId:'2d103a75-bef3-45f0-9642-289cd9e63d8c',layerType:data,legendDisplay:default,metric:c08e6f7d-4a97-4efd-b34b-9eb10f803ec4,nestedLegend:!f,numberDisplay:percent)),shape:donut)),title:'',type:lens,visualizationType:lnsPie),enhancements:(),hidePanelTitles:!f),gridData:(h:17,i:'38a330b6-6857-45bc-bd39-65b378c459c2',w:24,x:24,y:60),panelIndex:'38a330b6-6857-45bc-bd39-65b378c459c2',title:'Category%20Wise%20Block%20Traction',type:lens,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:10,i:'74ff6214-0137-4fb5-a461-c330f3f066ca',w:48,x:0,y:77),id:'17a04630-c40e-11ee-b9ed-531c3dc9e16e',panelIndex:'74ff6214-0137-4fb5-a461-c330f3f066ca',type:visualization,version:'7.17.3'),(embeddableConfig:(vis:!n),gridData:(h:12,i:'3435d864-9b92-48fb-ad87-ecb50b65efaa',w:48,x:0,y:87),id:'659945c0-c649-11ee-b9ed-531c3dc9e16e',panelIndex:'3435d864-9b92-48fb-ad87-ecb50b65efaa',type:visualization,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:Store_Analytics_v1.0,viewMode:view)&hide-filter-bar=true");
        $("#retadivnew").css("visibility", "hidden");
        $("#retadivnew").css("display", "hidden");
        $("#footfall_distribution_analytics").css("display", "block");
    } else if (distribution_version == 'v0.0.0') {
        $("#footfall_distribution_analytics").css("display", "none");
        $("#retadivnew").css("visibility", "visible");
        $("#retadivnew").css("display", "block");
    }
}
