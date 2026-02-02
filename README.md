# Dynamic Card Creator

A React-based personal information card creator with drag-and-drop functionality, multiple templates, and customization options.

## Features

- **Multiple Pre-built Templates**: 6 professionally designed card templates
- **Drag & Drop**: Position elements anywhere on the card
- **Resize Elements**: Resize text, images, and shapes
- **Zoom/Scale**: Scale individual elements without affecting others
- **Custom Backgrounds**: Solid colors, gradients, or images
- **Add Elements**: Text, images (via URL), and decoration shapes
- **Save as Template**: Save your custom designs as reusable templates
- **Layer Management**: Move elements up/down in the z-index
- **Undo/Redo**: Full history support
- **Export**: Export card configuration as JSON

## Tech Stack

- React 19.x
- Vite 5.x
- TailwindCSS 3.x
- Lucide React (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Select a Template**: Choose from the left panel
2. **Edit Elements**: Click on any element to select and edit
3. **Drag to Reposition**: Click and drag elements to move them
4. **Resize**: Use the corner handle on selected elements
5. **Add New Elements**: Use the buttons in the right panel
6. **Customize Background**: Change colors, gradients, or add images
7. **Save Template**: Save your design for reuse
8. **Export**: Download your card configuration

## No Database Required

All data is stored in browser memory. Templates and cards are managed in React state without any backend dependencies.
