const form = document.querySelector("#form");
const url = document.querySelector("#url");
const shortUrl = document.querySelector(".short-url");
const btn = document.querySelector(".copy-btn");


form.addEventListener("submit", function(e){
    if(url.value === ""){
        e.preventDefault();
        url.parentElement.classList.add("error");
    };
});


function addEvents() {
    var copyBtn = document.querySelectorAll("#copy");
    copyBtn.forEach(el => el.addEventListener("click", copyText));
}


function copyText(e) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = e.target.previousSibling.previousSibling.innerText;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    // Changing Style
    e.target.innerHTML = "Copied!";
    e.target.classList.add("copied-btn");

    setTimeout(function() {
    e.target.innerHTML = "Copy";
    e.target.classList.remove("copied-btn");
    }, 4000);
}

addEvents();