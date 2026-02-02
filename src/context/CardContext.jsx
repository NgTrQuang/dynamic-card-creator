import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { defaultTemplates, createEmptyTemplate } from '../data/defaultTemplates';

const CardContext = createContext();

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};

export const CardProvider = ({ children }) => {
  const [templates, setTemplates] = useState(defaultTemplates);
  const [currentCard, setCurrentCard] = useState(() => {
    const template = defaultTemplates[0];
    return {
      ...template,
      id: uuidv4(),
      elements: template.elements.map(el => ({ ...el, id: uuidv4() }))
    };
  });
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = useCallback((card) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.stringify(card));
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const applyTemplate = useCallback((templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newCard = {
        ...template,
        id: uuidv4(),
        elements: template.elements.map(el => ({ ...el, id: uuidv4() }))
      };
      setCurrentCard(newCard);
      setSelectedElementId(null);
      saveToHistory(newCard);
    }
  }, [templates, saveToHistory]);

  const updateCardBackground = useCallback((background) => {
    setCurrentCard(prev => {
      const updated = { ...prev, background };
      saveToHistory(updated);
      return updated;
    });
  }, [saveToHistory]);

  const updateCardSize = useCallback((cardSize) => {
    setCurrentCard(prev => {
      const updated = { ...prev, cardSize };
      saveToHistory(updated);
      return updated;
    });
  }, [saveToHistory]);

  const addElement = useCallback((element) => {
    const newElement = {
      id: uuidv4(),
      ...element,
      x: element.x || 50,
      y: element.y || 50,
      scale: element.scale || 1
    };
    setCurrentCard(prev => {
      const updated = {
        ...prev,
        elements: [...prev.elements, newElement]
      };
      saveToHistory(updated);
      return updated;
    });
    setSelectedElementId(newElement.id);
    return newElement.id;
  }, [saveToHistory]);

  const updateElement = useCallback((elementId, updates) => {
    setCurrentCard(prev => {
      const updated = {
        ...prev,
        elements: prev.elements.map(el =>
          el.id === elementId ? { ...el, ...updates } : el
        )
      };
      return updated;
    });
  }, []);

  const updateElementWithHistory = useCallback((elementId, updates) => {
    setCurrentCard(prev => {
      const updated = {
        ...prev,
        elements: prev.elements.map(el =>
          el.id === elementId ? { ...el, ...updates } : el
        )
      };
      saveToHistory(updated);
      return updated;
    });
  }, [saveToHistory]);

  const deleteElement = useCallback((elementId) => {
    setCurrentCard(prev => {
      const updated = {
        ...prev,
        elements: prev.elements.filter(el => el.id !== elementId)
      };
      saveToHistory(updated);
      return updated;
    });
    if (selectedElementId === elementId) {
      setSelectedElementId(null);
    }
  }, [selectedElementId, saveToHistory]);

  const duplicateElement = useCallback((elementId) => {
    const element = currentCard.elements.find(el => el.id === elementId);
    if (element) {
      const newElement = {
        ...element,
        id: uuidv4(),
        x: element.x + 20,
        y: element.y + 20
      };
      setCurrentCard(prev => {
        const updated = {
          ...prev,
          elements: [...prev.elements, newElement]
        };
        saveToHistory(updated);
        return updated;
      });
      setSelectedElementId(newElement.id);
    }
  }, [currentCard.elements, saveToHistory]);

  const moveElementLayer = useCallback((elementId, direction) => {
    setCurrentCard(prev => {
      const index = prev.elements.findIndex(el => el.id === elementId);
      if (index === -1) return prev;
      
      const newElements = [...prev.elements];
      const newIndex = direction === 'up' 
        ? Math.min(index + 1, newElements.length - 1)
        : Math.max(index - 1, 0);
      
      if (newIndex !== index) {
        const [removed] = newElements.splice(index, 1);
        newElements.splice(newIndex, 0, removed);
      }
      
      const updated = { ...prev, elements: newElements };
      saveToHistory(updated);
      return updated;
    });
  }, [saveToHistory]);

  const saveAsTemplate = useCallback((name) => {
    const newTemplate = {
      ...currentCard,
      id: uuidv4(),
      name: name || `Custom Template ${templates.length + 1}`,
      thumbnail: ''
    };
    setTemplates(prev => [...prev, newTemplate]);
    return newTemplate.id;
  }, [currentCard, templates.length]);

  const deleteTemplate = useCallback((templateId) => {
    if (defaultTemplates.find(t => t.id === templateId)) {
      return false;
    }
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    return true;
  }, []);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentCard(JSON.parse(history[newIndex]));
      setSelectedElementId(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentCard(JSON.parse(history[newIndex]));
      setSelectedElementId(null);
    }
  }, [history, historyIndex]);

  const getSelectedElement = useCallback(() => {
    return currentCard.elements.find(el => el.id === selectedElementId) || null;
  }, [currentCard.elements, selectedElementId]);

  const value = {
    templates,
    currentCard,
    selectedElementId,
    setSelectedElementId,
    applyTemplate,
    updateCardBackground,
    updateCardSize,
    addElement,
    updateElement,
    updateElementWithHistory,
    deleteElement,
    duplicateElement,
    moveElementLayer,
    saveAsTemplate,
    deleteTemplate,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    getSelectedElement
  };

  return (
    <CardContext.Provider value={value}>
      {children}
    </CardContext.Provider>
  );
};
