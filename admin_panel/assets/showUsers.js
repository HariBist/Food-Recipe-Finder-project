function showUsers() {
    $.ajax({
        url: "./viewUsers.php",
        method: "post",
        data: { record: 1 },
        success: function (data) {
            $('.allContent-section').html(data);
        }
    });
}
