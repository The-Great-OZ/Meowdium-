document.addEventListener("DOMContentLoaded", function () {
    setupTabs();
    setupMemeGenerator();
});

function setupTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            const tabId = button.getAttribute("data-tab");
            document.getElementById(tabId).classList.add("active");
        });
    });
}

function setupMemeGenerator() {
    const imageUpload = document.getElementById("meme-image-upload");
    const topTextInput = document.getElementById("meme-top-text");
    const bottomTextInput = document.getElementById("meme-bottom-text");
    const canvas = document.getElementById("meme-canvas");
    const downloadBtn = document.getElementById("download-meme");

    const ctx = canvas.getContext("2d");

    let image = new Image();

    imageUpload.addEventListener("change", function () {
        const reader = new FileReader();
        reader.onload = function () {
            image.src = reader.result;
        };
        reader.readAsDataURL(this.files[0]);
    });

    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        drawMeme();
    };

    topTextInput.addEventListener("input", drawMeme);
    bottomTextInput.addEventListener("input", drawMeme);

    function drawMeme() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.font = "30px Impact";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.textAlign = "center";

        ctx.fillText(topTextInput.value.toUpperCase(), canvas.width / 2, 40);
        ctx.strokeText(topTextInput.value.toUpperCase(), canvas.width / 2, 40);

        ctx.fillText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 20);
    }

    downloadBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "catcoin_meme.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
