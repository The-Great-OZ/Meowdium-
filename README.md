# Meowdium - Fully Functional GitHub Pages Version

A complete cat-themed web utility platform for CatCoin featuring advanced meme generation, photo overlay tools, and comprehensive Solana DEX integration - fully optimized for GitHub Pages deployment.

## ✨ Enhanced Features

- **Advanced Meme Generator**: 
  - Canvas-based rendering with professional text wrapping
  - Multiple font options (Impact, Arial, Comic Sans)
  - Real-time preview with drag & drop support
  - High-quality download functionality

- **Professional Catify Me Tool**: 
  - 5 unique cat overlay styles with emoji representations
  - Interactive positioning controls (move, rotate, resize)
  - Real-time preview with smooth animations
  - Export functionality with composite rendering

- **Comprehensive DEX Aggregator**: 
  - Universal Solana token address validation
  - Multi-source API integration (DexScreener, CoinGecko, Jupiter)
  - Intelligent caching system (5-minute cache)
  - Phantom wallet integration support
  - Real-time market data with price formatting

## 🚀 GitHub Pages Deployment

### Production-Ready Files:

1. **`index.html`** (12.9 KB) - Complete responsive HTML structure
2. **`style.css`** (15.2 KB) - Advanced CSS with animations and responsive design
3. **`script.js`** (28.5 KB) - Full-featured JavaScript with caching and error handling
4. **`README.md`** (Updated) - Complete documentation

### Quick Deployment Steps:

1. **Create Repository**
   ```bash
   # Create new GitHub repository
   # Name: meowdium-catcoin-app (or similar)
   ```

2. **Upload Files**
   - Copy all 4 files from `docs/` folder to repository root
   - Alternative: Keep files in `docs/` subfolder

3. **Enable Pages**
   - Repository Settings → Pages
   - Source: "Deploy from a branch" 
   - Branch: `main`, Folder: `/` (or `/docs`)
   - Save changes

4. **Live Access**
   - URL: `https://yourusername.github.io/repositoryname`
   - Deploy time: 2-5 minutes

### Advanced Features Included:

- **Smart Caching**: 5-minute localStorage cache for token data
- **Multi-API Integration**: DexScreener, CoinGecko, Jupiter APIs with fallback
- **Real-time Validation**: Solana address format checking
- **Progress Indicators**: Visual feedback for all operations
- **Responsive Design**: Optimized for mobile and desktop
- **Offline Capabilities**: Cached data works without internet
- **Wallet Integration**: Phantom wallet connection support

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
