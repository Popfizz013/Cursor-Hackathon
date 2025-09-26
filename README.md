# Cursor-Hackathon 

Victoria's first Cursor event hosted by Tenfold Victoria at VIATEC! Open to anyone who wants to explore using Cursor in a 3-hour sprint of vibe coding any idea you have.

## Project Overview

This project features an interactive 3D globe with a modern React UI that provides an engaging user experience across all devices. Built during the Cursor Hackathon, this application demonstrates responsive design principles and cross-platform compatibility.

## Key Features

- **Interactive 3D Globe**: Immersive 3D visualization with smooth interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern React UI**: Clean, intuitive interface built with React
- **Cross-Device Compatibility**: Seamless experience across different screen sizes
- **Browser Window Resizing**: Dynamic adaptation to window size changes
- **Performance Optimized**: Smooth animations and interactions on all devices

## Responsive Design Goals

The application is designed to maintain usability and visual appeal across:

- **Desktop**: Full-featured experience with optimal performance
- **Tablet**: Touch-optimized interface with adapted layouts
- **Mobile**: Streamlined UI with essential features preserved
- **Small Screens**: Graceful degradation while maintaining core functionality
- **Browser Resizing**: Dynamic layout adjustments for any window size

## Technology Stack

- **Frontend**: React
- **3D Graphics**: Three.js (or similar 3D library)
- **Styling**: CSS3 with responsive design principles
- **Build Tool**: Vite/Webpack
- **Package Manager**: npm/yarn

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser with WebGL support

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Popfizz013/Cursor-Hackathon.git
   cd Cursor-Hackathon
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in your terminal)

## Usage

1. **Desktop Experience**
   - Use mouse to rotate and zoom the 3D globe
   - Click on interactive elements for detailed information
   - Utilize keyboard shortcuts for enhanced navigation

2. **Mobile/Tablet Experience**
   - Touch and drag to rotate the globe
   - Pinch to zoom in/out
   - Tap for interactions and navigation

3. **Responsive Features**
   - Layout automatically adapts to screen size
   - UI elements scale appropriately
   - Touch targets optimized for mobile devices

## Development

### Project Structure
```
src/
├── components/          # React components
├── styles/             # CSS and styling files
├── assets/             # Images, models, and static files
├── utils/              # Utility functions
└── App.js              # Main application component
```

### Key Components
- **Globe3D**: Main 3D globe component
- **UI**: User interface components
- **ResponsiveLayout**: Layout management for different screen sizes

## Design Principles

- **Mobile-First**: Design starts with mobile and scales up
- **Progressive Enhancement**: Core functionality works on all devices
- **Touch-Friendly**: Adequate touch targets and gestures
- **Performance**: Optimized for smooth interactions on all devices
- **Accessibility**: WCAG compliant design patterns

## Known Issues & Solutions

### Responsive Design Challenges
- **Issue**: 3D globe performance on low-end mobile devices
- **Solution**: Implement level-of-detail (LOD) system and performance monitoring

- **Issue**: Touch interactions conflicting with scroll
- **Solution**: Proper touch event handling and gesture recognition

### Cross-Browser Compatibility
- **Issue**: WebGL support varies across browsers
- **Solution**: Fallback to 2D canvas for unsupported browsers

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Ensure responsive design principles
- Test across multiple devices and browsers
- Maintain performance standards
- Write clear, documented code

## Testing Responsive Design

### Manual Testing Checklist
- [ ] Desktop (1920x1080, 1366x768)
- [ ] Tablet (768x1024, 1024x768)
- [ ] Mobile (375x667, 414x896)
- [ ] Landscape orientations
- [ ] Browser window resizing
- [ ] Touch interactions
- [ ] Performance on low-end devices

### Automated Testing
```bash
npm run test:responsive
npm run test:performance
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Tenfold Victoria** for hosting the Cursor Hackathon
- **VIATEC** for providing the venue
- **Cursor** for the amazing AI-powered development experience
- **Victoria's Developer Community** for the collaborative spirit

## Contact

- **Repository**: [Popfizz013/Cursor-Hackathon](https://github.com/Popfizz013/Cursor-Hackathon)
- **Event**: Victoria's First Cursor Hackathon
- **Host**: Tenfold Victoria at VIATEC

---

*Built with during Victoria's first Cursor Hackathon*
