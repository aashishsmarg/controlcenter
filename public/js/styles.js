$(document).ready(function () {
    $('#myModalpopup').on('show.bs.modal', function (e) {
            $('img').on('click', function () {
        var image = $(this).attr('src');
        $('#myModal').on('show.bs.modal', function () {
            $(".showimage").attr("src", image);
        });
    });
    });
});


$("#myModal .close").click();

$("#myModal .close").trigger("click"); 