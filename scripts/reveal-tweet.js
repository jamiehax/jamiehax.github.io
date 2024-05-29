document.addEventListener("DOMContentLoaded", function() {
    var hiddenTweet = document.getElementById("hidden-tweet");
    
    hiddenTweet.addEventListener("click", function() {
        if (hiddenTweet.style.display === "none" || hiddenTweet.innerHTML === "...") {
            hiddenTweet.style.display = "inline-block";
            hiddenTweet.innerHTML = "jill and i wish everyone has a new way to helping hbcu students throughout the press and calling mexicans rapists";
        } else {
            hiddenTweet.innerHTML = "...";
        }
    });
});
