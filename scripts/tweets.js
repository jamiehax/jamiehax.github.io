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

document.getElementById('generateButton').addEventListener('click', function() {
    const backendURL = "";
    var prompt = document.getElementById('prompt').value;

    document.querySelector('#result .tweet').innerText = "i dont have the money to host the model anywhere right now :'("
    return

    fetch(backendURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = data.generatedTweet;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
