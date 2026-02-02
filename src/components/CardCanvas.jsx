import React, { useRef } from 'react';
import { useCard } from '../context/CardContext';
import DraggableElement from './DraggableElement';

const CardCanvas = () => {
  const { currentCard, setSelectedElementId } = useCard();
  const containerRef = useRef(null);

  const getBackgroundStyle = () => {
    const { background } = currentCard;
    
    switch (background.type) {
      case 'color':
        return { backgroundColor: background.value };
      case 'gradient':
        return { background: background.value };
      case 'image':
        return {
          backgroundImage: `url(${background.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const handleCanvasClick = (e) => {
    if (e.target === containerRef.current) {
      setSelectedElementId(null);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-100 overflow-auto">
      <div className="relative shadow-2xl rounded-lg overflow-hidden">
        <div
          ref={containerRef}
          style={{
            width: `${currentCard.cardSize.width}px`,
            height: `${currentCard.cardSize.height}px`,
            ...getBackgroundStyle(),
            position: 'relative'
          }}
          onClick={handleCanvasClick}
        >
          {currentCard.elements.map((element) => (
            <DraggableElement
              key={element.id}
              element={element}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardCanvas;
