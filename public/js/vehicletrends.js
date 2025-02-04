// document.addEventListener('DOMContentLoaded', () => {
//     window.addEventListener('resize', function() {
//         const elements = document.querySelectorAll('.select2.select2-container.select2-container--default');
//         elements.forEach(singleElement => {
//             const parentElement = singleElement.parentElement;
//             const parentWidth = parentElement ? parentElement.clientWidth : 0;  
//             singleElement.style.width = (parentWidth - 10) + 'px';
//         });
//     });
// });



$(function () {
    vehicletrends("false");
});
function vehicletrends(isdatef_is_custom) {
    //  alert(isdatef_is_custom);
    if (isdatef_is_custom == "true") {
        var thisVehicleTypeFilter = vehicelTypefilter();
        vehicle_analytics_dashboard();
    }
    else if (isdatef_is_custom == "false") {
        sitefilter();
        $thisdatefilter = datefilter();
        if ($thisdatefilter == "custom") {
            //  $("#closer").click();
            //  alert("heeelo");
        }
        else {
            $(".frt_date_row").css("display", "none");
            $thisVehicleTypeFilter = vehicelTypefilter();
            if ($thisVehicleTypeFilter == "2_Wheeler") {
                two_w_vehicle_graph_display($thissitefilter, $thisdatefilter)
            } else {
                vehicle_graph_display($thissitefilter, $thisdatefilter);
            }
        }
    }
}
$('select[name="datefilter"]').change(function () {
    vehicletrends("false");
});
$('select[name="sitefilter"]').change(function () {
    sitefilter();
    var datef_val = $('select[name="datefilter"]').val();
    if (datef_val == "custom") {
        vehicletrends("true");
    }
    else {
        vehicletrends("false");
    }
});
$('select[name="vehicleTypeFilter"]').change(function () {
    // alert("hello");
    //sitefilter();
    var datef_val = $('select[name="datefilter"]').val();
    if (datef_val == "custom") {
        vehicletrends("true");
    }
    else {
        vehicletrends("false");
    }
    //   vehicletrends("true");
});
function vehicle_analytics_dashboard() {
    localStorage.setItem("datefilter", "custom");
    $(".frt_date_row").css("display", "block");
    $("#frto").css("display", "block");
    $("#tdo").css("display", "block");
    var fromdate = $("#from").datepicker().val();
    var todate = $("#to").datepicker().val();
    var sit_id = $('select[name="sitefilter"]').val();
    var thisVehicleTypeFilter = vehicelTypefilter();
    var retailarray1 = sit_id.split(',');
    $thissitefilter = retailarray1[0];
    analyticsversion = retailarray1[1];
    var strt_time = retailarray1[2];
    var ed_time = retailarray1[3];
    var vehicledashboardversion = retailarray1[4];
    //two_w_vehicledashboardversion = retailarray1[5]
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
    $("#closer").click();
    //vehicle_graph_display($thissitefilter, datefroto);
    //alert("vehicledashb== $thisVehicleTypeFilter ==oardversion "+thisVehicleTypeFilter);  
    if (thisVehicleTypeFilter == "2_Wheeler") {
        two_w_vehicle_graph_display($thissitefilter, datefroto)
    } else {
        vehicle_graph_display($thissitefilter, datefroto);
    }
}
function vehicle_graph_display(sitefilter, datefilter) {
    //alert("vehicledashboardversion "+$vehicledashboardversion);
    if ($vehicledashboardversion == 'v1.0.0') {
        $("#vehicdivnew").css("visibility", "hidden");
        $("#vehicdivnew").css("display", "hidden");
        $("#vehicanalytics").attr("src", kibanaurl + "dashboard/ec8ad6f0-56a4-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.1.0,viewMode:view)&hide-filter-bar=true");
        $("#vehicanalytics").css("display", "block");
    } else if ($vehicledashboardversion == 'v1.2.0') {
        $("#vehicdivnew").css("visibility", "hidden");
        $("#vehicdivnew").css("display", "hidden");
        $("#vehicanalytics").attr("src", kibanaurl + "dashboard/02630880-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.0,viewMode:view)&hide-filter-bar=true");
        $("#vehicanalytics").css("display", "block");
    } else if ($vehicledashboardversion == 'v1.2.1') {
        $("#vehicdivnew").css("visibility", "hidden");
        $("#vehicdivnew").css("display", "hidden");
        $("#vehicanalytics").attr("src", kibanaurl + "dashboard/185f3cd0-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:VehicleAnalyticsv1.2.1,viewMode:view)&hide-filter-bar=true");
        $("#vehicanalytics").css("display", "block");
    } else if ($vehicledashboardversion == 'v1.2.2') {
        $("#vehicdivnew").css("visibility", "hidden");
        $("#vehicdivnew").css("display", "hidden");
        
        //$("#vehicanalytics").attr("src", kibanaurl2 + "view/477b2c90-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:()),gridData:(h:11,i:e2ebd896-1cc6-44f7-bf4f-9f9305e070f3,w:11,x:0,y:0),id:ca4ba3b0-7a4c-11eb-9090-8fcb9b0c766e,panelIndex:e2ebd896-1cc6-44f7-bf4f-9f9305e070f3,title:'Total%20Vehicle%20Count',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:11,i:'34ce8340-febc-42b2-a8c5-420453d4cb4c',w:22,x:11,y:0),id:'03329480-7a9e-11eb-aebd-c78366141c52',panelIndex:'34ce8340-febc-42b2-a8c5-420453d4cb4c',title:'Vehicle%20Accumulation%20Curve',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:(colors:(Eco:%2364B0C8,Premium:%23629E51),legendOpen:!t)),gridData:(h:11,i:d3babf8f-b740-4440-af52-57b20eff6e9b,w:15,x:33,y:0),id:'02e1dc60-4123-11ec-8a18-9fa75c912d79',panelIndex:d3babf8f-b740-4440-af52-57b20eff6e9b,type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),vis:!n),gridData:(h:12,i:'13a3b5ea-c8a9-42f1-9be9-e21b4a9bcaf0',w:20,x:0,y:11),id:'07213300-cdd0-11eb-bcee-1f847a63e7e4',panelIndex:'13a3b5ea-c8a9-42f1-9be9-e21b4a9bcaf0',title:'Dwell%20Time(Hours)',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:12,i:'80351911-4ec7-4785-b37e-48b104212d3b',w:28,x:20,y:11),id:'98b67e30-5f28-11ec-aa53-272aef46cf4f',panelIndex:'80351911-4ec7-4785-b37e-48b104212d3b',title:'Dwell%20Time%20Trend',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:14,i:bfe9cc74-e0c0-4ea2-848a-0c547df47c25,w:29,x:0,y:23),id:'95698830-187e-11ec-ba6e-e39eaf95505e',panelIndex:bfe9cc74-e0c0-4ea2-848a-0c547df47c25,title:'Zone%20Wise%20Vehicle%20Count%20Analysis',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:14,i:e487b879-8ecc-41ec-ae89-deaade323d83,w:19,x:29,y:23),id:bb261520-8345-11ec-aa53-272aef46cf4f,panelIndex:e487b879-8ecc-41ec-ae89-deaade323d83,title:'Zone%20wise%20Day%20Slice%20Trend',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:13,i:'0719b3d8-d27f-4a34-98d6-b4dbcc593f57',w:48,x:0,y:37),id:d33afac0-840a-11ec-aa53-272aef46cf4f,panelIndex:'0719b3d8-d27f-4a34-98d6-b4dbcc593f57',title:'Top%20Visitors%20(Vehicle)',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:()),gridData:(h:17,i:ae392e71-18c9-4323-a288-a88e1a6413a9,w:48,x:0,y:50),id:'22864f60-39eb-11ef-aa7b-8f83a4b27553',panelIndex:ae392e71-18c9-4323-a288-a88e1a6413a9,type:lens,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:VehicleAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
        
        $("#vehicanalytics").attr("src", kibanaurl2 + "view/477b2c90-56a5-11ec-aa53-272aef46cf4f?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:VehicleAnalyticsv1.2.2,viewMode:view)&hide-filter-bar=true");
        
        $("#vehicanalytics").css("display", "block");
    } else if ($vehicledashboardversion == 'v0.0.0') {
        $("#vehicanalytics").css("display", "none");
        $("#vehicdivnew").css("display", "block");
        $("#vehicdivnew").css("visibility", "visible");
    }
}
function two_w_vehicle_graph_display(sitefilter, datefilter) {
    // alert("two_w_vehicle_graph_display "+$two_w_vehicledashboardversion);
    if ($two_w_vehicledashboardversion == 'v1.0.0') {
        $("#vehicdivnew").css("visibility", "hidden");
        $("#vehicdivnew").css("display", "hidden");
        $("#vehicanalytics").css("display", "block");
        $("#vehicanalytics").attr("src", kibanaurl2 + "view/843a2370-b441-11ed-94e4-6baa835c580e?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:30000),time:(" + datefilter + "))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'42354920-c78c-11ec-8a10-a58f1ea8b425',key:SiteId,negate:!f,params:(query:'" + sitefilter + "'),type:phrase),query:(match_phrase:(SiteId:'" + sitefilter + "')))),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:bb889e53-542f-4820-99f8-ec85343a7dea,w:12,x:0,y:0),id:'39ecaf40-b441-11ed-94e4-6baa835c580e',panelIndex:bb889e53-542f-4820-99f8-ec85343a7dea,title:'Total%20Vehicle%20In%20Count',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:c68ad700-1942-4d5e-a0f9-3927df201ef2,w:12,x:12,y:0),id:ee15b810-b444-11ed-94e4-6baa835c580e,panelIndex:c68ad700-1942-4d5e-a0f9-3927df201ef2,title:'Total%20Vehicle%20Out%20Count',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'6dbcd376-5a4f-4a3f-b6cd-dd1f6936036b',w:24,x:24,y:0),id:'35bf15b0-b442-11ed-94e4-6baa835c580e',panelIndex:'6dbcd376-5a4f-4a3f-b6cd-dd1f6936036b',title:'Vehicle%20Accumulation%20Curve',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:'3ad24070-6904-4e04-89a7-c40cda7cd9e7',w:24,x:0,y:15),id:'57dc7e70-b443-11ed-94e4-6baa835c580e',panelIndex:'3ad24070-6904-4e04-89a7-c40cda7cd9e7',title:'Zone%20Wise%20Vehicle%20Count%20Analysis',type:visualization,version:'7.17.3'),(embeddableConfig:(enhancements:(),hidePanelTitles:!f),gridData:(h:15,i:f13df076-da98-4921-8a7d-14bed0b7f80d,w:24,x:24,y:15),id:'37b1ac00-b444-11ed-94e4-6baa835c580e',panelIndex:f13df076-da98-4921-8a7d-14bed0b7f80d,title:'Zone%20wise%20Day%20Slice%20Trend',type:visualization,version:'7.17.3'),(embeddableConfig:(attributes:(description:'',references:!((id:'42354920-c78c-11ec-8a10-a58f1ea8b425',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'42354920-c78c-11ec-8a10-a58f1ea8b425',name:indexpattern-datasource-layer-4c278c87-a1a8-441b-bc40-a07b5a9cca46,type:index-pattern),(id:'42354920-c78c-11ec-8a10-a58f1ea8b425',name:filter-index-pattern-0,type:index-pattern),(id:'42354920-c78c-11ec-8a10-a58f1ea8b425',name:filter-index-pattern-1,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('4c278c87-a1a8-441b-bc40-a07b5a9cca46':(columnOrder:!('0f96efc4-8cfe-4a74-a710-1a2e437f7205','21dcf987-1246-415d-bac0-202b2d192e36','0448d2e1-3e65-4cee-b18f-6ab93f9b8433'),columns:('0448d2e1-3e65-4cee-b18f-6ab93f9b8433':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,params:(format:(id:number,params:(decimals:0))),scale:ratio,sourceField:Records),'0f96efc4-8cfe-4a74-a710-1a2e437f7205':(dataType:string,isBucketed:!t,label:'Top%20values%20of%20Site.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:'0448d2e1-3e65-4cee-b18f-6ab93f9b8433',type:column),orderDirection:desc,otherBucket:!t,size:3),scale:ordinal,sourceField:Site.keyword),'21dcf987-1246-415d-bac0-202b2d192e36':(dataType:date,isBucketed:!t,label:DateTime,operationType:date_histogram,params:(interval:auto),scale:interval,sourceField:DateTime)),incompleteColumns:())))),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,indexRefName:filter-index-pattern-0,key:NotificationType,negate:!f,params:(query:24),type:phrase),query:(match_phrase:(NotificationType:24))),('$state':(store:appState),meta:(alias:!n,disabled:!f,indexRefName:filter-index-pattern-1,key:MainEntryCount,negate:!f,params:(query:1),type:phrase),query:(match_phrase:(MainEntryCount:1)))),query:(language:kuery,query:''),visualization:(gridConfig:(isCellLabelVisible:!f,isXAxisLabelVisible:!t,isYAxisLabelVisible:!t,type:lens_heatmap_grid),layerId:'4c278c87-a1a8-441b-bc40-a07b5a9cca46',layerType:data,legend:(isVisible:!t,position:right,type:lens_heatmap_legendConfig),palette:(accessor:'0448d2e1-3e65-4cee-b18f-6ab93f9b8433',name:positive,params:(name:positive,rangeMax:80,rangeMin:0,reverse:!f,stops:!((color:%23d6e9e4,stop:0),(color:%23aed3ca,stop:20),(color:%2385bdb1,stop:40),(color:%235aa898,stop:60),(color:%23209280,stop:80))),type:palette),shape:heatmap,valueAccessor:'0448d2e1-3e65-4cee-b18f-6ab93f9b8433',xAccessor:'21dcf987-1246-415d-bac0-202b2d192e36',yAccessor:'0f96efc4-8cfe-4a74-a710-1a2e437f7205')),title:'2W_Vehicle_PeakTime',type:lens,visualizationType:lnsHeatmap),enhancements:()),gridData:(h:14,i:c596e798-0ad0-47b4-85ee-2111425d3bc1,w:48,x:0,y:30),panelIndex:c596e798-0ad0-47b4-85ee-2111425d3bc1,type:lens,version:'7.17.3')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'2W_Vehicle_Analytics_V1.0.0',viewMode:view)&hide-filter-bar=true");
    } else if ($two_w_vehicledashboardversion == 'v0.0.0') {
        $("#vehicanalytics").css("display", "none");
        $("#vehicdivnew").css("display", "block");
        $("#vehicdivnew").css("visibility", "visible");
    }
}
