function showReviews() {
    $.ajax({
        url: "./userReview.php",
        method: "post",
        data: { record: 1 },
        success: function (data) {
            $('.allContent-section').html(data);
        }
    });
}
