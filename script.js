
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

function generateMeme() {
  const canvas = document.getElementById("memeCanvas");
  const ctx = canvas.getContext("2d");
  const image = document.getElementById("memeImage").files[0];
  if (!image) return alert("Please upload an image.");
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      ctx.font = "40px Impact";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText(document.getElementById("topText").value, canvas.width / 2, 50);
      ctx.strokeText(document.getElementById("topText").value, canvas.width / 2, 50);
      ctx.fillText(document.getElementById("bottomText").value, canvas.width / 2, canvas.height - 20);
      ctx.strokeText(document.getElementById("bottomText").value, canvas.width / 2, canvas.height - 20);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(image);
}

function addCatOverlay() {
  const canvas = document.getElementById("overlayCanvas");
  const ctx = canvas.getContext("2d");
  const image = document.getElementById("uploadImage").files[0];
  if (!image) return alert("Upload an image first.");
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const catFace = new Image();
      catFace.onload = () => {
        const scale = Math.min(canvas.width, canvas.height) / 3;
        ctx.drawImage(catFace, canvas.width / 2 - scale / 2, canvas.height / 2 - scale / 2, scale, scale);
      };
      catFace.src = "https://i.imgur.com/vg7Z8Q7.png"; // placeholder
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(image);
}

async function fetchTokenData() {
  const address = document.getElementById("tokenAddress").value;
  if (!address) return alert("Enter a token address.");
  try {
    const coingecko = await fetch(`https://api.coingecko.com/api/v3/coins/solana/contract/${address}`);
    const data = await coingecko.json();
    document.getElementById("tokenInfo").innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Symbol:</strong> ${data.symbol}</p>
      <p><strong>Price (USD):</strong> $${data.market_data.current_price.usd}</p>
    `;
  } catch (err) {
    document.getElementById("tokenInfo").innerText = "Error fetching token data.";
  }
}
