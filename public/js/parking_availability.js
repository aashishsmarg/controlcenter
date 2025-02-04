$(function () {
    getparkingavail();
    setInterval(function () {
        getparkingavail();
    }, 5000);
});
function getparkingavail() {
    sctn_drdw = "";
    var hdata = { "API_KEY": "abc" }
    return new Promise((resolve, reject) => {
        ajaxcall('https://smargtech.in:3015/surveillance/ParkingAvailability?client_id=3',
            "GET", hdata, "").then(
                function (data) {
                    var response = JSON.parse(JSON.stringify(data));
                    console.log("response" + response);
                    // console.log("response"+JSON.stringify(response));
                    if (response.responsedata.resultcode == 2032) {
                        console.log("parkings == " + response.parkings[0].total_slots)
                        console.log("parkings == " + response.parkings[0].available_slots)
                        $("#parking_name").text(response.parkings[0].name);
                        $("#total_slots").text(response.parkings[0].total_slots);
                        $("#available_slots").text(response.parkings[0].available_slots);
                    }
                }).catch(function (err) {
                    console.log(err);
                    resolve('0');
                });
    });
}
