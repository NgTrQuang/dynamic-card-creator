import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { defaultTemplates } from '../data/defaultTemplates';

const TemplateContext = createContext();

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
};

export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState(() => {
    const saved = localStorage.getItem('cardTemplates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultTemplates;
      }
    }
    return defaultTemplates;
  });

  const saveTemplates = useCallback((newTemplates) => {
    setTemplates(newTemplates);
    localStorage.setItem('cardTemplates', JSON.stringify(newTemplates));
  }, []);

  const addTemplate = useCallback((template) => {
    const newTemplate = {
      ...template,
      id: uuidv4(),
      elements: template.elements.map(el => ({ ...el, id: uuidv4() }))
    };
    const newTemplates = [...templates, newTemplate];
    saveTemplates(newTemplates);
    return newTemplate.id;
  }, [templates, saveTemplates]);

  const importTemplate = useCallback((jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      const newTemplate = {
        ...parsed,
        id: uuidv4(),
        name: parsed.name ? `${parsed.name} (Imported)` : 'Imported Template',
        elements: (parsed.elements || []).map(el => ({ ...el, id: uuidv4() }))
      };
      const newTemplates = [...templates, newTemplate];
      saveTemplates(newTemplates);
      return { success: true, templateId: newTemplate.id };
    } catch (error) {
      return { success: false, error: 'Invalid JSON format' };
    }
  }, [templates, saveTemplates]);

  const deleteTemplate = useCallback((templateId) => {
    const isDefault = defaultTemplates.find(t => t.id === templateId);
    if (isDefault) {
      return { success: false, error: 'Cannot delete default templates' };
    }
    const newTemplates = templates.filter(t => t.id !== templateId);
    saveTemplates(newTemplates);
    return { success: true };
  }, [templates, saveTemplates]);

  const updateTemplate = useCallback((templateId, updates) => {
    const newTemplates = templates.map(t =>
      t.id === templateId ? { ...t, ...updates } : t
    );
    saveTemplates(newTemplates);
  }, [templates, saveTemplates]);

  const getTemplate = useCallback((templateId) => {
    return templates.find(t => t.id === templateId) || null;
  }, [templates]);

  const value = {
    templates,
    addTemplate,
    importTemplate,
    deleteTemplate,
    updateTemplate,
    getTemplate
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
