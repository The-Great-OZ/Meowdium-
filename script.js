
function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

// MEME GENERATOR
function generateMeme() {
  const canvas = document.getElementById("memeCanvas");
  const ctx = canvas.getContext("2d");
  const imageInput = document.getElementById("memeImageUpload").files[0];
  const topText = document.getElementById("topText").value;
  const bottomText = document.getElementById("bottomText").value;

  if (!imageInput) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.font = "40px Impact";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";

      ctx.fillText(topText, canvas.width / 2, 50);
      ctx.strokeText(topText, canvas.width / 2, 50);

      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
      ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(imageInput);
}

// CATIFY ME
function catifyImage() {
  const canvas = document.getElementById("catifyCanvas");
  const ctx = canvas.getContext("2d");
  const imageInput = document.getElementById("catifyImageUpload").files[0];
  const overlay = new Image();
  overlay.src = "https://ipfs.io/ipfs/bafybeia6gy2nmrpr4xdyivdngzy4a3iv54zh6zoh37ldqg3yxkfe7icotu"; // cat face overlay

  if (!imageInput) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      overlay.onload = () => {
        const catSize = img.width / 3;
        ctx.drawImage(overlay, img.width / 3, img.height / 4, catSize, catSize);
      };
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(imageInput);
}

// MINI DEX AGGREGATOR (DexScreener)
async function fetchDexData() {
  const tokenAddress = document.getElementById("tokenAddress").value.trim();
  const output = document.getElementById("dexResults");
  output.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${tokenAddress}`);
    const data = await response.json();

    if (data && data.pair) {
      const { priceUsd, liquidity, volume24h } = data.pair;
      output.innerHTML = `
        <p><strong>Price (USD):</strong> $${priceUsd}</p>
        <p><strong>Liquidity:</strong> $${liquidity.usd}</p>
        <p><strong>24h Volume:</strong> $${volume24h}</p>
      `;
    } else {
      output.innerHTML = "Token not found.";
    }
  } catch (err) {
    output.innerHTML = "Error fetching data.";
  }
}
