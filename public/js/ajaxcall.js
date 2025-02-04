function ajaxcall(url, method, headerdata, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: method,
            headers: { "API_KEY": "abc" },
            data: data,
            success: function (data) {
                // console.log("data"+data);
                resolve(data) // Resolve promise and go to then()
            },
            error: function (err) {
                // console.log("err"+ JSON.stringify(err));
                reject(err) // Reject the promise and go to catch()
            }
        });
    });
}
