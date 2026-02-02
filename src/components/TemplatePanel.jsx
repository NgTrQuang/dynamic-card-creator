import React, { useState } from 'react';
import { useCard } from '../context/CardContext';
import { Layout, Plus, Trash2, Check, X } from 'lucide-react';

const TemplatePanel = () => {
  const { templates, applyTemplate, saveAsTemplate, deleteTemplate, currentCard } = useCard();
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');

  const handleSaveTemplate = () => {
    if (newTemplateName.trim()) {
      saveAsTemplate(newTemplateName.trim());
      setNewTemplateName('');
      setIsAddingTemplate(false);
    }
  };

  const handleDeleteTemplate = (e, templateId) => {
    e.stopPropagation();
    deleteTemplate(templateId);
  };

  const isDefaultTemplate = (templateId) => {
    return templateId.startsWith('template-');
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Layout size={20} className="text-indigo-600" />
          <h2 className="font-semibold text-gray-800">Templates</h2>
        </div>
        <p className="text-xs text-gray-500">Select a template or create your own</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid gap-3">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => applyTemplate(template.id)}
              className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${
                currentCard.name === template.name
                  ? 'border-indigo-500 shadow-md'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div
                className="h-20 w-full"
                style={{
                  background: template.background.type === 'gradient'
                    ? template.background.value
                    : template.background.type === 'image'
                    ? `url(${template.background.value}) center/cover`
                    : template.background.value
                }}
              />
              <div className="p-2 bg-white">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {template.name}
                </p>
              </div>
              
              {!isDefaultTemplate(template.id) && (
                <button
                  onClick={(e) => handleDeleteTemplate(e, template.id)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              )}

              {currentCard.name === template.name && (
                <div className="absolute top-1 left-1 p-1 bg-indigo-500 text-white rounded-full">
                  <Check size={12} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-gray-200">
        {isAddingTemplate ? (
          <div className="space-y-2">
            <input
              type="text"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              placeholder="Template name..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveTemplate}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Check size={16} />
                Save
              </button>
              <button
                onClick={() => {
                  setIsAddingTemplate(false);
                  setNewTemplateName('');
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTemplate(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} />
            Save as Template
          </button>
        )}
      </div>
    </div>
  );
};

export default TemplatePanel;
