import React, { useState } from 'react';
import { useCard } from '../context/CardContext';
import {
  Settings,
  Type,
  Image,
  Square,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Palette
} from 'lucide-react';

const PropertiesPanel = () => {
  const {
    currentCard,
    selectedElementId,
    getSelectedElement,
    updateElement,
    updateElementWithHistory,
    deleteElement,
    duplicateElement,
    moveElementLayer,
    updateCardBackground,
    updateCardSize,
    addElement
  } = useCard();

  const [bgType, setBgType] = useState(currentCard.background.type);
  const selectedElement = getSelectedElement();

  const handleBgTypeChange = (type) => {
    setBgType(type);
    if (type === 'color') {
      updateCardBackground({ type: 'color', value: '#ffffff' });
    } else if (type === 'gradient') {
      updateCardBackground({ type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' });
    }
  };

  const handleBgValueChange = (value) => {
    updateCardBackground({ type: bgType, value });
  };

  const handleScaleChange = (delta) => {
    if (selectedElement) {
      const newScale = Math.max(0.1, Math.min(3, (selectedElement.scale || 1) + delta));
      updateElementWithHistory(selectedElementId, { scale: newScale });
    }
  };

  const addTextElement = () => {
    addElement({
      type: 'text',
      width: 150,
      height: 30,
      content: 'New Text',
      fontSize: 16,
      fontWeight: 'normal',
      color: '#000000'
    });
  };

  const addImageElement = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      addElement({
        type: 'image',
        width: 100,
        height: 100,
        content: url,
        borderRadius: '0'
      });
    }
  };

  const addDecorationElement = () => {
    addElement({
      type: 'decoration',
      width: 100,
      height: 50,
      backgroundColor: '#3b82f6',
      borderRadius: '8px'
    });
  };

  const gradientPresets = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(180deg, #232526 0%, #414345 100%)',
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
    'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-indigo-600" />
          <h2 className="font-semibold text-gray-800">Properties</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Add Elements Section */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Add Elements</h3>
          <div className="flex gap-2">
            <button
              onClick={addTextElement}
              className="flex-1 flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Type size={20} className="text-gray-600" />
              <span className="text-xs text-gray-600">Text</span>
            </button>
            <button
              onClick={addImageElement}
              className="flex-1 flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Image size={20} className="text-gray-600" />
              <span className="text-xs text-gray-600">Image</span>
            </button>
            <button
              onClick={addDecorationElement}
              className="flex-1 flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Square size={20} className="text-gray-600" />
              <span className="text-xs text-gray-600">Shape</span>
            </button>
          </div>
        </div>

        {/* Card Background Section */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Palette size={16} />
            Card Background
          </h3>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              {['color', 'gradient', 'image'].map((type) => (
                <button
                  key={type}
                  onClick={() => handleBgTypeChange(type)}
                  className={`flex-1 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                    bgType === type
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {bgType === 'color' && (
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentCard.background.value}
                  onChange={(e) => handleBgValueChange(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={currentCard.background.value}
                  onChange={(e) => handleBgValueChange(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            )}

            {bgType === 'gradient' && (
              <div className="grid grid-cols-3 gap-2">
                {gradientPresets.map((gradient, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBgValueChange(gradient)}
                    className={`h-12 rounded-lg border-2 transition-all ${
                      currentCard.background.value === gradient
                        ? 'border-indigo-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                    style={{ background: gradient }}
                  />
                ))}
              </div>
            )}

            {bgType === 'image' && (
              <input
                type="text"
                placeholder="Enter image URL..."
                value={currentCard.background.type === 'image' ? currentCard.background.value : ''}
                onChange={(e) => handleBgValueChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Card Size Section */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Card Size</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">Width</label>
              <input
                type="number"
                value={currentCard.cardSize.width}
                onChange={(e) => updateCardSize({
                  ...currentCard.cardSize,
                  width: parseInt(e.target.value) || 400
                })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Height</label>
              <input
                type="number"
                value={currentCard.cardSize.height}
                onChange={(e) => updateCardSize({
                  ...currentCard.cardSize,
                  height: parseInt(e.target.value) || 250
                })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Selected Element Properties */}
        {selectedElement && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Element Properties
            </h3>

            {/* Element Actions */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => duplicateElement(selectedElementId)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Duplicate"
              >
                <Copy size={14} />
              </button>
              <button
                onClick={() => moveElementLayer(selectedElementId, 'up')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Move Up"
              >
                <ChevronUp size={14} />
              </button>
              <button
                onClick={() => moveElementLayer(selectedElementId, 'down')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Move Down"
              >
                <ChevronDown size={14} />
              </button>
              <button
                onClick={() => deleteElement(selectedElementId)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Zoom/Scale Controls */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 block mb-2">Scale</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleScaleChange(-0.1)}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ZoomOut size={16} />
                </button>
                <div className="flex-1 text-center text-sm font-medium">
                  {Math.round((selectedElement.scale || 1) * 100)}%
                </div>
                <button
                  onClick={() => handleScaleChange(0.1)}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>

            {/* Position */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500">X Position</label>
                <input
                  type="number"
                  value={Math.round(selectedElement.x)}
                  onChange={(e) => updateElementWithHistory(selectedElementId, {
                    x: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Y Position</label>
                <input
                  type="number"
                  value={Math.round(selectedElement.y)}
                  onChange={(e) => updateElementWithHistory(selectedElementId, {
                    y: parseInt(e.target.value) || 0
                  })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Size */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500">Width</label>
                <input
                  type="number"
                  value={Math.round(selectedElement.width)}
                  onChange={(e) => updateElementWithHistory(selectedElementId, {
                    width: parseInt(e.target.value) || 50
                  })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Height</label>
                <input
                  type="number"
                  value={Math.round(selectedElement.height)}
                  onChange={(e) => updateElementWithHistory(selectedElementId, {
                    height: parseInt(e.target.value) || 50
                  })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Text-specific properties */}
            {selectedElement.type === 'text' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Content</label>
                  <input
                    type="text"
                    value={selectedElement.content}
                    onChange={(e) => updateElementWithHistory(selectedElementId, {
                      content: e.target.value
                    })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Font Size</label>
                    <input
                      type="number"
                      value={selectedElement.fontSize || 16}
                      onChange={(e) => updateElementWithHistory(selectedElementId, {
                        fontSize: parseInt(e.target.value) || 16
                      })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Color</label>
                    <input
                      type="color"
                      value={selectedElement.color || '#000000'}
                      onChange={(e) => updateElementWithHistory(selectedElementId, {
                        color: e.target.value
                      })}
                      className="w-full h-9 rounded cursor-pointer border-0"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Font Weight</label>
                  <select
                    value={selectedElement.fontWeight || 'normal'}
                    onChange={(e) => updateElementWithHistory(selectedElementId, {
                      fontWeight: e.target.value
                    })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="lighter">Light</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Text Align</label>
                  <select
                    value={selectedElement.textAlign || 'left'}
                    onChange={(e) => updateElementWithHistory(selectedElementId, {
                      textAlign: e.target.value
                    })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            )}

            {/* Image-specific properties */}
            {selectedElement.type === 'image' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Image URL</label>
                  <input
                    type="text"
                    value={selectedElement.content}
                    onChange={(e) => updateElementWithHistory(selectedElementId, {
                      content: e.target.value
                    })}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Border Radius</label>
                  <input
                    type="text"
                    value={selectedElement.borderRadius || '0'}
                    onChange={(e) => updateElementWithHistory(selectedElementId, {
                      borderRadius: e.target.value
                    })}
                    placeholder="e.g., 8px, 50%, 10px 20px"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Decoration-specific properties */}
            {selectedElement.type === 'decoration' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedElement.backgroundColor?.startsWith('#') 
                        ? selectedElement.backgroundColor 
                        : '#3b82f6'}
                      onChange={(e) => updateElementWithHistory(selectedElementId, {
                        backgroundColor: e.target.value
                      })}
                      className="w-10 h-10 rounded cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={selectedElement.backgroundColor || '#3b82f6'}
                      onChange={(e) => updateElementWithHistory(selectedElementId, {
                        backgroundColor: e.target.value
                      })}
                      placeholder="Color or rgba()"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Border Radius</label>
                  <input
                    type="text"
                    value={selectedElement.borderRadius || '0'}
                    onChange={(e) => updateElementWithHistory(selectedElementId, {
                      borderRadius: e.target.value
                    })}
                    placeholder="e.g., 8px, 50%"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Border</label>
                  <input
                    type="text"
                    value={selectedElement.border || ''}
                    onChange={(e) => updateElementWithHistory(selectedElementId, {
                      border: e.target.value
                    })}
                    placeholder="e.g., 2px solid #000"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedElement && (
          <div className="p-4 text-center text-gray-400 text-sm">
            Select an element to edit its properties
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;
