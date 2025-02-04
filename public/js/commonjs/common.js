var reportRedirect = configuration.reportRedirect;
var kibanaurl = configuration.kibanaurl;
var kibanaurl2 =configuration.kibanaurl2;
//let socket;
$(function () {
    $(".dropdowncolor").select2({
        minimumResultsForSearch: -1
    });
    $('#datepicker1,#datepicker2,#datepicker3,#datepicker4,#datepicker5,#datepicker6,#datepicker7,#datepicker8,#datepicker9,#datepicker10,#datepicker11,#datepicker12,#from,#to,#fromov,#toov').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        endDate: "currentDate",
        maxDate: new Date(),
    }).datepicker("setDate", 'now');

    var contentheader = $('.content-header').text();
    $('#controlheader').append(' <i style="font-size:14px" class="fa">&#xf054;</i>' +contentheader);
    
});

function logoutbuttonclick() {
    localStorage.removeItem("authtokenurl");
    localStorage.removeItem("useridurl");
    localStorage.removeItem("isadmin");
    localStorage.removeItem("user_id");
}

setTimeout(()=>{
    location.reload()
},3600000)
// },10000)w










document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', function() {
        const elements = document.querySelectorAll('.select2.select2-container.select2-container--default');
        elements.forEach(singleElement => {
            const parentElement = singleElement.parentElement;
            const parentWidth = parentElement ? parentElement.clientWidth : 0;  
            singleElement.style.width = (parentWidth - 10) + 'px';
        });
    });
});