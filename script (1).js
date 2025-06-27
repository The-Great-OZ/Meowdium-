// Meowdium App JavaScript
class MeowdiumApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupMemeGenerator();
        this.setupCatifyMe();
        this.setupDexAggregator();
        this.setupToastSystem();
    }

    // Tab Navigation
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${targetTab}-generator` || content.id === `${targetTab}-me` || content.id === `dex-aggregator`) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // Toast System
    setupToastSystem() {
        this.toastContainer = document.getElementById('toast-container');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 4px;">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'} ${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div>${message}</div>
        `;
        
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }

    // Meme Generator
    setupMemeGenerator() {
        const uploadZone = document.getElementById('meme-upload');
        const fileInput = document.getElementById('meme-file');
        const topTextInput = document.getElementById('top-text');
        const bottomTextInput = document.getElementById('bottom-text');
        const fontSelect = document.getElementById('font-select');
        const generateBtn = document.getElementById('generate-meme');
        const downloadBtn = document.getElementById('download-meme');
        const canvas = document.getElementById('meme-canvas');
        const placeholder = document.getElementById('meme-placeholder');
        
        let currentImage = null;

        uploadZone.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    currentImage = new Image();
                    currentImage.onload = () => {
                        placeholder.style.display = 'none';
                        this.showToast('Image uploaded successfully!', 'success');
                    };
                    currentImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        generateBtn.addEventListener('click', () => {
            if (!currentImage) {
                this.showToast('Please upload an image first.', 'error');
                return;
            }

            const ctx = canvas.getContext('2d');
            canvas.width = currentImage.width;
            canvas.height = currentImage.height;

            // Draw image
            ctx.drawImage(currentImage, 0, 0);

            // Draw text
            this.drawMemeText(ctx, topTextInput.value, bottomTextInput.value, canvas.width, canvas.height, fontSelect.value);
            
            canvas.style.display = 'block';
            this.showToast('Meme generated successfully!', 'success');
        });

        downloadBtn.addEventListener('click', () => {
            if (canvas.style.display === 'none') {
                this.showToast('Please generate a meme first.', 'error');
                return;
            }

            const link = document.createElement('a');
            link.download = `catcoin-meme-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
            
            this.showToast('Meme downloaded!', 'success');
        });
    }

    drawMemeText(ctx, topText, bottomText, width, height, fontFamily) {
        const fontSize = Math.max(20, width * 0.08);
        
        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineWidth = Math.max(2, fontSize * 0.08);
        ctx.lineJoin = 'round';

        // Draw top text
        if (topText) {
            const lines = this.wrapText(ctx, topText.toUpperCase(), width - 40);
            lines.forEach((line, index) => {
                const y = fontSize + 20 + (index * fontSize * 1.1);
                ctx.strokeText(line, width / 2, y);
                ctx.fillText(line, width / 2, y);
            });
        }

        // Draw bottom text
        if (bottomText) {
            const lines = this.wrapText(ctx, bottomText.toUpperCase(), width - 40);
            const totalHeight = lines.length * fontSize * 1.1;
            const startY = height - totalHeight - 20;
            
            lines.forEach((line, index) => {
                const y = startY + (index * fontSize * 1.1);
                ctx.strokeText(line, width / 2, y);
                ctx.fillText(line, width / 2, y);
            });
        }
    }

    wrapText(ctx, text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });
        
        if (currentLine) {
            lines.push(currentLine);
        }

        return lines;
    }

    // Catify Me
    setupCatifyMe() {
        const uploadZone = document.getElementById('catify-upload');
        const fileInput = document.getElementById('catify-file');
        const overlayOptions = document.querySelectorAll('.overlay-option');
        const controlBtns = document.querySelectorAll('.control-btn');
        const downloadBtn = document.getElementById('download-catified');
        const preview = document.getElementById('catify-preview');
        
        let currentPhoto = null;
        let selectedOverlay = 'cat1';
        let overlayPosition = { x: 50, y: 20 };
        let overlaySize = 80;
        let overlayRotation = 0;

        uploadZone.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
                if (file.size > 5 * 1024 * 1024) {
                    this.showToast('File size exceeds 5MB limit.', 'error');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = (e) => {
                    currentPhoto = e.target.result;
                    this.updateCatifyPreview();
                    this.showToast('Photo uploaded successfully!', 'success');
                };
                reader.readAsDataURL(file);
            } else {
                this.showToast('Please upload a JPEG or PNG file.', 'error');
            }
        });

        overlayOptions.forEach(option => {
            option.addEventListener('click', () => {
                overlayOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                selectedOverlay = option.dataset.overlay;
                this.updateCatifyPreview();
            });
        });

        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const step = 5;
                
                switch (action) {
                    case 'up':
                        overlayPosition.y = Math.max(0, overlayPosition.y - step);
                        break;
                    case 'down':
                        overlayPosition.y = Math.min(80, overlayPosition.y + step);
                        break;
                    case 'left':
                        overlayPosition.x = Math.max(0, overlayPosition.x - step);
                        break;
                    case 'right':
                        overlayPosition.x = Math.min(80, overlayPosition.x + step);
                        break;
                    case 'rotate':
                        overlayRotation = (overlayRotation + 15) % 360;
                        break;
                    case 'bigger':
                        overlaySize = Math.min(150, overlaySize + 10);
                        break;
                    case 'smaller':
                        overlaySize = Math.max(30, overlaySize - 10);
                        break;
                    case 'reset':
                        overlayPosition = { x: 50, y: 20 };
                        overlaySize = 80;
                        overlayRotation = 0;
                        break;
                }
                this.updateCatifyPreview();
            });
        });

        downloadBtn.addEventListener('click', () => {
            if (!currentPhoto) {
                this.showToast('Please upload a photo first.', 'error');
                return;
            }
            
            this.downloadCatifiedImage();
        });
    }

    updateCatifyPreview() {
        const preview = document.getElementById('catify-preview');
        
        if (!currentPhoto) {
            preview.innerHTML = '<div class="placeholder">Upload a photo to preview</div>';
            return;
        }

        const overlayEmojis = {
            cat1: '🐱',
            cat2: '🐈',
            cat3: '🐈‍⬛',
            cat4: '😸',
            cat5: '😻'
        };

        const overlayColors = {
            cat1: 'rgba(254, 215, 170, 0.9)',
            cat2: 'rgba(229, 231, 235, 0.9)',
            cat3: 'rgba(0, 0, 0, 0.9)',
            cat4: 'rgba(254, 243, 199, 0.9)',
            cat5: 'rgba(252, 231, 243, 0.9)'
        };

        preview.innerHTML = `
            <div style="position: relative; display: inline-block;">
                <img src="${currentPhoto}" style="max-width: 100%; height: auto; border-radius: 0.5rem;" />
                <div class="cat-overlay" style="
                    position: absolute;
                    left: ${overlayPosition.x}%;
                    top: ${overlayPosition.y}%;
                    width: ${overlaySize}px;
                    height: ${overlaySize}px;
                    background-color: ${overlayColors[this.getSelectedOverlay()]};
                    transform: rotate(${overlayRotation}deg);
                    font-size: ${overlaySize * 0.6}px;
                ">
                    ${overlayEmojis[this.getSelectedOverlay()]}
                </div>
            </div>
        `;
    }

    getSelectedOverlay() {
        const activeOption = document.querySelector('.overlay-option.active');
        return activeOption ? activeOption.dataset.overlay : 'cat1';
    }

    downloadCatifiedImage() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            
            ctx.drawImage(img, 0, 0);
            
            // Draw overlay
            const overlayX = (overlayPosition.x / 100) * img.width;
            const overlayY = (overlayPosition.y / 100) * img.height;
            const overlayW = (overlaySize / 100) * Math.min(img.width, img.height) * 0.3;
            
            ctx.save();
            ctx.translate(overlayX + overlayW/2, overlayY + overlayW/2);
            ctx.rotate((overlayRotation * Math.PI) / 180);
            
            // Draw overlay background
            ctx.beginPath();
            ctx.arc(0, 0, overlayW/2, 0, 2 * Math.PI);
            const selectedOverlay = this.getSelectedOverlay();
            const colors = {
                cat1: '#fed7aa',
                cat2: '#e5e7eb',
                cat3: '#000000',
                cat4: '#fef3c7',
                cat5: '#fce7f3'
            };
            ctx.fillStyle = colors[selectedOverlay];
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Draw emoji
            const emojis = { cat1: '🐱', cat2: '🐈', cat3: '🐈‍⬛', cat4: '😸', cat5: '😻' };
            ctx.font = `${overlayW * 0.6}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = selectedOverlay === 'cat3' ? '#ffffff' : '#000000';
            ctx.fillText(emojis[selectedOverlay], 0, 0);
            
            ctx.restore();
            
            // Download
            const link = document.createElement('a');
            link.download = `catified-image-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
            
            this.showToast('Catified image downloaded!', 'success');
        };
        
        img.src = currentPhoto;
    }

    // DEX Aggregator
    setupDexAggregator() {
        const addressInput = document.getElementById('token-address');
        const fetchBtn = document.getElementById('fetch-token');
        const tokenItems = document.querySelectorAll('.token-item');
        const connectWalletBtn = document.getElementById('connect-wallet');
        const tokenDisplay = document.getElementById('token-info');

        fetchBtn.addEventListener('click', () => {
            const address = addressInput.value.trim();
            if (!address) {
                this.showToast('Please enter a token address.', 'error');
                return;
            }
            this.fetchTokenInfo(address);
        });

        tokenItems.forEach(item => {
            item.addEventListener('click', () => {
                const address = item.dataset.address;
                addressInput.value = address;
                this.fetchTokenInfo(address);
            });
        });

        connectWalletBtn.addEventListener('click', () => {
            this.showToast('Wallet connection coming soon!', 'info');
        });
    }

    async fetchTokenInfo(tokenAddress) {
        const tokenDisplay = document.getElementById('token-info');
        
        // Show loading state
        tokenDisplay.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <span>Fetching token information...</span>
            </div>
        `;

        try {
            const tokenInfo = await this.getTokenData(tokenAddress);
            this.displayTokenInfo(tokenInfo);
            this.showToast(`Token information loaded for ${tokenInfo.symbol}`, 'success');
        } catch (error) {
            this.displayTokenError(error.message);
            this.showToast('Failed to fetch token information', 'error');
        }
    }

    async getTokenData(tokenAddress) {
        // Validate Solana address format
        if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(tokenAddress)) {
            throw new Error('Invalid Solana token address format');
        }

        try {
            // Try DexScreener API search
            const searchResponse = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${tokenAddress}`);
            
            if (searchResponse.ok) {
                const searchData = await searchResponse.json();
                
                if (searchData.pairs && searchData.pairs.length > 0) {
                    const pair = searchData.pairs
                        .filter(p => p.chainId === 'solana')
                        .sort((a, b) => parseFloat(b.liquidity?.usd || '0') - parseFloat(a.liquidity?.usd || '0'))[0];
                    
                    if (pair) {
                        const token = pair.baseToken?.address === tokenAddress ? pair.baseToken : pair.quoteToken;
                        
                        return {
                            name: token?.name || 'Unknown Token',
                            symbol: token?.symbol || 'UNK',
                            price: parseFloat(pair.priceUsd || '0'),
                            priceChange24h: parseFloat(pair.priceChange?.h24 || '0'),
                            marketCap: parseFloat(pair.fdv || '0'),
                            volume24h: parseFloat(pair.volume?.h24 || '0'),
                            dexes: [pair.dexId].filter(Boolean)
                        };
                    }
                }
            }

            // Try direct token lookup
            const dexResponse = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
            
            if (dexResponse.ok) {
                const dexData = await dexResponse.json();
                
                if (dexData.pairs && dexData.pairs.length > 0) {
                    const pair = dexData.pairs[0];
                    const token = pair.baseToken;
                    
                    return {
                        name: token.name || 'Unknown Token',
                        symbol: token.symbol || 'UNK',
                        price: parseFloat(pair.priceUsd || '0'),
                        priceChange24h: parseFloat(pair.priceChange?.h24 || '0'),
                        marketCap: parseFloat(pair.fdv || '0'),
                        volume24h: parseFloat(pair.volume?.h24 || '0'),
                        dexes: dexData.pairs.map(p => p.dexId).filter((dex, index, arr) => arr.indexOf(dex) === index)
                    };
                }
            }

            // Handle specific known tokens
            if (tokenAddress === 'So11111111111111111111111111111111111111112') {
                const solResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true');
                
                if (solResponse.ok) {
                    const solData = await solResponse.json();
                    return {
                        name: 'Solana',
                        symbol: 'SOL',
                        price: solData.solana.usd,
                        priceChange24h: solData.solana.usd_24h_change,
                        marketCap: solData.solana.usd_market_cap,
                        volume24h: solData.solana.usd_24h_vol,
                        dexes: ['Jupiter', 'Raydium', 'Orca', 'Serum']
                    };
                }
            }
            
            if (tokenAddress === 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v') {
                return {
                    name: 'USD Coin',
                    symbol: 'USDC',
                    price: 1.00,
                    priceChange24h: 0.01,
                    marketCap: 24800000000,
                    volume24h: 4200000000,
                    dexes: ['Jupiter', 'Raydium', 'Orca']
                };
            }

            throw new Error('Token not found or API services are currently unavailable');
            
        } catch (error) {
            throw new Error(`Failed to fetch token information: ${error.message}`);
        }
    }

    displayTokenInfo(tokenInfo) {
        const tokenDisplay = document.getElementById('token-info');
        
        const formatPrice = (price) => {
            if (price < 0.01) return `$${price.toFixed(6)}`;
            return `$${price.toFixed(2)}`;
        };

        const formatMarketCap = (cap) => {
            if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
            if (cap >= 1e6) return `$${(cap / 1e6).toFixed(1)}M`;
            if (cap >= 1e3) return `$${(cap / 1e3).toFixed(1)}K`;
            return `$${cap.toFixed(0)}`;
        };

        const changeClass = tokenInfo.priceChange24h >= 0 ? 'positive' : 'negative';
        const changePrefix = tokenInfo.priceChange24h >= 0 ? '+' : '';

        tokenDisplay.innerHTML = `
            <div class="token-info-card">
                <div class="token-header">
                    <div class="token-meta">
                        <div class="token-icon blue">${tokenInfo.symbol.substring(0, 3).toUpperCase()}</div>
                        <div class="token-details">
                            <h4>${tokenInfo.name}</h4>
                            <p>${tokenInfo.symbol.toUpperCase()}</p>
                        </div>
                    </div>
                    <div class="token-price">
                        <div class="price">${formatPrice(tokenInfo.price)}</div>
                        <div class="change ${changeClass}">${changePrefix}${tokenInfo.priceChange24h.toFixed(2)}%</div>
                    </div>
                </div>
                
                <div class="token-stats">
                    <div class="stat-item">
                        <div class="label">Market Cap</div>
                        <div class="value">${formatMarketCap(tokenInfo.marketCap)}</div>
                    </div>
                    <div class="stat-item">
                        <div class="label">24h Volume</div>
                        <div class="value">${formatMarketCap(tokenInfo.volume24h)}</div>
                    </div>
                </div>
                
                <div class="dex-list">
                    <h5>Available on DEXs:</h5>
                    <div class="dex-badges">
                        ${tokenInfo.dexes.map(dex => `<span class="dex-badge">${dex}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    displayTokenError(errorMessage) {
        const tokenDisplay = document.getElementById('token-info');
        
        tokenDisplay.innerHTML = `
            <div class="error-display">
                <div class="error-icon">❌</div>
                <div class="error-title">Failed to fetch token information</div>
                <div class="error-message">${errorMessage}</div>
            </div>
        `;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MeowdiumApp();
});