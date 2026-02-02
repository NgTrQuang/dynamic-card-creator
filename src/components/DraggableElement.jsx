import React, { useState, useRef, useEffect } from 'react';
import { useCard } from '../context/CardContext';

const DraggableElement = ({ element, containerRef }) => {
  const { selectedElementId, setSelectedElementId, updateElement, updateElementWithHistory } = useCard();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const elementRef = useRef(null);

  const isSelected = selectedElementId === element.id;

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) return;
    e.stopPropagation();
    setSelectedElementId(element.id);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ x: element.x, y: element.y, width: element.width, height: element.height });
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({ x: element.x, y: element.y, width: element.width, height: element.height });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        updateElement(element.id, {
          x: Math.max(0, elementStart.x + dx),
          y: Math.max(0, elementStart.y + dy)
        });
      }

      if (isResizing) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        updateElement(element.id, {
          width: Math.max(20, elementStart.width + dx),
          height: Math.max(20, elementStart.height + dy)
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging || isResizing) {
        updateElementWithHistory(element.id, {
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height
        });
      }
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, elementStart, element, updateElement, updateElementWithHistory, containerRef]);

  const getElementStyle = () => {
    const baseStyle = {
      position: 'absolute',
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      transform: `scale(${element.scale || 1})`,
      transformOrigin: 'top left',
      cursor: isDragging ? 'grabbing' : 'grab',
      userSelect: 'none'
    };

    return baseStyle;
  };

  const renderContent = () => {
    switch (element.type) {
      case 'text':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              fontSize: `${element.fontSize || 16}px`,
              fontWeight: element.fontWeight || 'normal',
              color: element.color || '#000000',
              textAlign: element.textAlign || 'left',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {element.content}
          </div>
        );

      case 'image':
        return (
          <img
            src={element.content}
            alt="Card element"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: element.borderRadius || '0',
              border: element.border || 'none',
              pointerEvents: 'none'
            }}
            draggable={false}
          />
        );

      case 'decoration':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: element.backgroundColor || 'transparent',
              borderRadius: element.borderRadius || '0',
              border: element.border || 'none'
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={elementRef}
      style={getElementStyle()}
      className={`no-select ${isSelected ? 'element-selected' : ''}`}
      onMouseDown={handleMouseDown}
    >
      {renderContent()}
      
      {isSelected && (
        <>
          <div
            className="resize-handle absolute -right-1 -bottom-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize z-10"
            onMouseDown={handleResizeStart}
          />
          <div className="absolute -left-1 -top-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-none" />
          <div className="absolute -right-1 -top-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-none" />
          <div className="absolute -left-1 -bottom-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-none" />
        </>
      )}
    </div>
  );
};

export default DraggableElement;
