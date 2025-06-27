document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.style.display = 'none');

      tab.classList.add('active');
      contents[idx].style.display = 'block';
    });
  });

  // Meme Generator
  const memeImageInput = document.getElementById('memeImageInput');
  const memeTextInput = document.getElementById('memeText');
  const generateMemeButton = document.getElementById('generateMeme');
  const memeCanvas = document.getElementById('memeCanvas');
  const memeCtx = memeCanvas.getContext('2d');

  generateMemeButton.addEventListener('click', () => {
    const file = memeImageInput.files[0];
    if (!file) return alert('Upload an image first.');

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        memeCanvas.width = img.width;
        memeCanvas.height = img.height;
        memeCtx.drawImage(img, 0, 0);
        memeCtx.font = "40px Impact";
        memeCtx.fillStyle = "white";
        memeCtx.strokeStyle = "black";
        memeCtx.lineWidth = 2;
        memeCtx.textAlign = "center";
        memeCtx.fillText(memeTextInput.value, img.width / 2, 50);
        memeCtx.strokeText(memeTextInput.value, img.width / 2, 50);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Catify Me
  const userPhotoInput = document.getElementById('userPhotoInput');
  const catifyButton = document.getElementById('catifyBtn');
  const catifyCanvas = document.getElementById('catifyCanvas');
  const catifyCtx = catifyCanvas.getContext('2d');

  catifyButton.addEventListener('click', () => {
    const file = userPhotoInput.files[0];
    if (!file) return alert('Upload your photo first.');

    const reader = new FileReader();
    reader.onload = function (e) {
      const userImg = new Image();
      userImg.onload = function () {
        catifyCanvas.width = userImg.width;
        catifyCanvas.height = userImg.height;
        catifyCtx.drawImage(userImg, 0, 0);

        const catFace = new Image();
        catFace.src = "https://i.imgur.com/EZ6pSXA.png"; // Replace with hosted overlay
        catFace.onload = () => {
          const overlaySize = userImg.width / 3;
          catifyCtx.drawImage(catFace, userImg.width / 3, userImg.height / 4, overlaySize, overlaySize);
        };
      };
      userImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Mini DEX Aggregator
  const dexResults = document.getElementById('dexResults');

  async function fetchDEXData() {
    try {
      const url = "https://api.dexscreener.com/latest/dex/pairs/solana";
      const res = await fetch(url);
      const json = await res.json();
      const topPair = json.pairs[0];
      dexResults.innerHTML = `
        <strong>Top Pair:</strong> ${topPair.baseToken.name} (${topPair.baseToken.symbol})<br>
        Price: $${topPair.priceUsd}<br>
        Volume 24h: $${topPair.volume.h24.toLocaleString()}<br>
        Liquidity: $${topPair.liquidity.usd.toLocaleString()}<br>
        <a href="${topPair.url}" target="_blank">View on DexScreener</a>
      `;
    } catch (err) {
      dexResults.innerText = "Failed to fetch DEX data.";
    }
  }

  fetchDEXData();
});
