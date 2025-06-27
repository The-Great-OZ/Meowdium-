# Meowdium - GitHub Pages Deployment

A cat-themed web utility platform for CatCoin featuring meme generation, photo overlay tools, and Solana DEX integration.

## Features

- **Meme Generator**: Upload images, add custom text with multiple fonts, and download memes
- **Catify Me**: Transform photos with cat overlays using positioning controls
- **DEX Aggregator**: Universal Solana token lookup with real-time market data

## GitHub Pages Setup

### Required Files for GitHub Pages:

1. `index.html` - Main HTML structure
2. `style.css` - Complete CSS styling with cat-themed design
3. `script.js` - JavaScript functionality for all features
4. `README.md` - This documentation file

### Deployment Steps:

1. **Create GitHub Repository**
   - Create a new repository on GitHub
   - Name it appropriately (e.g., `meowdium-app`)

2. **Upload Files**
   - Upload all files from the `docs/` folder to your repository root
   - Or place them in a `docs/` folder if you prefer

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select source: "Deploy from a branch"
   - Choose branch: `main` (or `master`)
   - Choose folder: `/` (root) or `/docs` if you used a docs folder
   - Click "Save"

4. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/repositoryname`
   - It may take a few minutes to deploy

### File Structure:
```
docs/
├── index.html          # Main application
├── style.css           # Styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Features Overview

### Meme Generator
- File upload with drag & drop support
- Text inputs for top and bottom text
- Font selection (Impact, Arial, Comic Sans)
- Canvas-based rendering with text wrapping
- Download functionality

### Catify Me
- Photo upload (JPEG/PNG, max 5MB)
- 5 different cat overlay styles
- Interactive positioning controls
- Rotation and sizing options
- Export catified images

### DEX Aggregator
- Universal Solana token address lookup
- Real-time data from DexScreener and CoinGecko APIs
- Popular token quick-select buttons
- Market data including price, volume, market cap
- DEX availability information

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Canvas API support required for image generation
- Fetch API for token data requests

## API Dependencies

The DEX Aggregator uses these external APIs:
- DexScreener API for Solana token data
- CoinGecko API for popular token information
- CORS-enabled requests for real-time data

## Customization

The app uses CSS variables for easy theming:
- `--catcoin-gold`: #f4c542
- `--catcoin-brown`: #4b3621  
- `--catcoin-cream`: #fff9e6
- `--catcoin-dark`: #333

Modify these in `style.css` to change the color scheme.

## Performance Notes

- Images are processed client-side for privacy
- Token data is cached briefly to reduce API calls
- Responsive design optimized for mobile devices
- Lazy loading implemented for better performance

## Support

For issues or questions about the CatCoin project, reach out to the community through official channels.