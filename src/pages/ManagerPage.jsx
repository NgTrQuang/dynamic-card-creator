import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTemplates } from '../context/TemplateContext';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  CreditCard,
  LogOut,
  Layout,
  Settings,
  Plus,
  Trash2,
  Check,
  X,
  Upload,
  Download,
  Type,
  Image,
  Square,
  Copy,
  ChevronUp,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Palette,
  Undo2,
  Redo2,
  FileImage,
  FileText,
  Home
} from 'lucide-react';

const ManagerPage = () => {
  const { logout } = useAuth();
  const { templates, addTemplate, importTemplate, deleteTemplate } = useTemplates();
  const navigate = useNavigate();

  const [currentCard, setCurrentCard] = useState(() => {
    const template = templates[0];
    return {
      ...template,
      id: uuidv4(),
      elements: template.elements.map(el => ({ ...el, id: uuidv4() }))
    };
  });

  const [selectedElementId, setSelectedElementId] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [bgType, setBgType] = useState(currentCard.background.type);
  const [isExporting, setIsExporting] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageFileInputRef = useRef(null);
  const imagePropertyInputRef = useRef(null);

  const saveToHistory = useCallback((card) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(JSON.stringify(card));
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentCard(JSON.parse(history[newIndex]));
      setSelectedElementId(null);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentCard(JSON.parse(history[newIndex]));
      setSelectedElementId(null);
    }
  };

  const applyTemplate = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newCard = {
        ...template,
        id: uuidv4(),
        elements: template.elements.map(el => ({ ...el, id: uuidv4() }))
      };
      setCurrentCard(newCard);
      setSelectedElementId(null);
      setBgType(template.background.type);
      saveToHistory(newCard);
    }
  };

  const updateCardBackground = (background) => {
    setCurrentCard(prev => {
      const updated = { ...prev, background };
      saveToHistory(updated);
      return updated;
    });
  };

  const updateCardSize = (cardSize) => {
    setCurrentCard(prev => {
      const updated = { ...prev, cardSize };
      saveToHistory(updated);
      return updated;
    });
  };

  const addElement = (element) => {
    const newElement = {
      id: uuidv4(),
      ...element,
      x: element.x || 50,
      y: element.y || 50,
      scale: element.scale || 1
    };
    setCurrentCard(prev => {
      const updated = { ...prev, elements: [...prev.elements, newElement] };
      saveToHistory(updated);
      return updated;
    });
    setSelectedElementId(newElement.id);
  };

  const updateElement = (elementId, updates) => {
    setCurrentCard(prev => ({
      ...prev,
      elements: prev.elements.map(el =>
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  };

  const updateElementWithHistory = (elementId, updates) => {
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
  };

  const deleteElement = (elementId) => {
    setCurrentCard(prev => {
      const updated = { ...prev, elements: prev.elements.filter(el => el.id !== elementId) };
      saveToHistory(updated);
      return updated;
    });
    if (selectedElementId === elementId) setSelectedElementId(null);
  };

  const duplicateElement = (elementId) => {
    const element = currentCard.elements.find(el => el.id === elementId);
    if (element) {
      const newElement = { ...element, id: uuidv4(), x: element.x + 20, y: element.y + 20 };
      setCurrentCard(prev => {
        const updated = { ...prev, elements: [...prev.elements, newElement] };
        saveToHistory(updated);
        return updated;
      });
      setSelectedElementId(newElement.id);
    }
  };

  const moveElementLayer = (elementId, direction) => {
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
  };

  const handleSaveTemplate = () => {
    if (newTemplateName.trim()) {
      addTemplate({ ...currentCard, name: newTemplateName.trim() });
      setNewTemplateName('');
      setIsAddingTemplate(false);
    }
  };

  const handleDeleteTemplate = (e, templateId) => {
    e.stopPropagation();
    deleteTemplate(templateId);
  };

  const isDefaultTemplate = (templateId) => templateId.startsWith('template-');

  const handleExportJson = () => {
    const cardData = JSON.stringify(currentCard, null, 2);
    const blob = new Blob([cardData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCard.name.replace(/\s+/g, '_')}_template.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    setImportError('');
    const result = importTemplate(importJson);
    if (result.success) {
      setShowImportModal(false);
      setImportJson('');
      const newTemplate = templates.find(t => t.id === result.templateId) || templates[templates.length - 1];
      if (newTemplate) applyTemplate(newTemplate.id);
    } else {
      setImportError(result.error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImportJson(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const exportAsImage = async (format) => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 4, useCORS: true, allowTaint: true, backgroundColor: null, logging: false });
      const link = document.createElement('a');
      link.download = `card.${format}`;
      link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`, 0.95);
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 4, useCORS: true, allowTaint: true, backgroundColor: null, logging: false });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width / 4, canvas.height / 4]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 4, canvas.height / 4);
      pdf.save('card.pdf');
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleBgTypeChange = (type) => {
    setBgType(type);
    if (type === 'color') updateCardBackground({ type: 'color', value: '#ffffff' });
    else if (type === 'gradient') updateCardBackground({ type: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' });
  };

  const selectedElement = currentCard.elements.find(el => el.id === selectedElementId);

  const gradientPresets = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(180deg, #232526 0%, #414345 100%)',
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
    'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
  ];

  const getBackgroundStyle = () => {
    const { background } = currentCard;
    switch (background.type) {
      case 'color': return { backgroundColor: background.value };
      case 'gradient': return { background: background.value };
      case 'image': return { backgroundImage: `url(${background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };
      default: return { backgroundColor: '#ffffff' };
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <CreditCard size={28} className="text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-800">Template Manager</h1>
          <span className="text-sm text-gray-400">|</span>
          <span className="text-sm text-gray-600">{currentCard.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={historyIndex <= 0} className={`p-2 rounded-lg ${historyIndex > 0 ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gray-50 text-gray-300'}`}>
            <Undo2 size={18} />
          </button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1} className={`p-2 rounded-lg ${historyIndex < history.length - 1 ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gray-50 text-gray-300'}`}>
            <Redo2 size={18} />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          <button onClick={() => setShowImportModal(true)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Upload size={18} />
            Import
          </button>
          <button onClick={handleExportJson} className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Download size={18} />
            Export JSON
          </button>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          <a href="/" className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-indigo-600">
            <Home size={18} />
          </a>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Template Panel */}
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Layout size={20} className="text-indigo-600" />
              <h2 className="font-semibold text-gray-800">Templates</h2>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid gap-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => applyTemplate(template.id)}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-md ${currentCard.name === template.name ? 'border-indigo-500 shadow-md' : 'border-gray-200 hover:border-indigo-300'}`}
                >
                  <div className="h-16 w-full" style={{
                    background: template.background.type === 'gradient' ? template.background.value
                      : template.background.type === 'image' ? `url(${template.background.value}) center/cover`
                      : template.background.value
                  }} />
                  <div className="p-2 bg-white flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 truncate">{template.name}</span>
                    {currentCard.name === template.name && <Check size={14} className="text-indigo-600" />}
                  </div>
                  {!isDefaultTemplate(template.id) && (
                    <button onClick={(e) => handleDeleteTemplate(e, template.id)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="p-3 border-t border-gray-200">
            {isAddingTemplate ? (
              <div className="space-y-2">
                <input type="text" value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} placeholder="Template name..." className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" autoFocus />
                <div className="flex gap-2">
                  <button onClick={handleSaveTemplate} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                    <Check size={16} /> Save
                  </button>
                  <button onClick={() => { setIsAddingTemplate(false); setNewTemplateName(''); }} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300">
                    <X size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => setIsAddingTemplate(true)} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Plus size={18} /> Save as Template
              </button>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-100 overflow-auto">
          <div className="relative shadow-2xl rounded-lg overflow-hidden">
            <div
              ref={cardRef}
              style={{ width: `${currentCard.cardSize.width}px`, height: `${currentCard.cardSize.height}px`, ...getBackgroundStyle(), position: 'relative' }}
              onClick={(e) => { if (e.target === e.currentTarget) setSelectedElementId(null); }}
            >
              {currentCard.elements.map((element) => (
                <DraggableElement
                  key={element.id}
                  element={element}
                  isSelected={selectedElementId === element.id}
                  onSelect={() => setSelectedElementId(element.id)}
                  onUpdate={(updates) => updateElement(element.id, updates)}
                  onUpdateWithHistory={(updates) => updateElementWithHistory(element.id, updates)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Settings size={20} className="text-indigo-600" />
              <h2 className="font-semibold text-gray-800">Properties</h2>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Add Elements */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add Elements</h3>
              <div className="flex gap-2">
                <button onClick={() => addElement({ type: 'text', width: 150, height: 60, content: 'New Text', fontSize: 16, fontWeight: 'normal', color: '#000000', textAlign: 'left', verticalAlign: 'top' })} className="flex-1 flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <Type size={20} className="text-gray-600" />
                  <span className="text-xs text-gray-600">Text</span>
                </button>
                <button onClick={() => setShowImageModal(true)} className="flex-1 flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <Image size={20} className="text-gray-600" />
                  <span className="text-xs text-gray-600">Image</span>
                </button>
                <button onClick={() => addElement({ type: 'decoration', width: 100, height: 50, backgroundColor: '#3b82f6', borderRadius: '8px' })} className="flex-1 flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <Square size={20} className="text-gray-600" />
                  <span className="text-xs text-gray-600">Shape</span>
                </button>
              </div>
            </div>

            {/* Background */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Palette size={16} /> Card Background
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  {['color', 'gradient', 'image'].map((type) => (
                    <button key={type} onClick={() => handleBgTypeChange(type)} className={`flex-1 px-3 py-1.5 text-xs rounded-lg ${bgType === type ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
                {bgType === 'color' && (
                  <div className="flex items-center gap-2">
                    <input type="color" value={currentCard.background.value} onChange={(e) => updateCardBackground({ type: 'color', value: e.target.value })} className="w-10 h-10 rounded cursor-pointer border-0" />
                    <input type="text" value={currentCard.background.value} onChange={(e) => updateCardBackground({ type: 'color', value: e.target.value })} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                  </div>
                )}
                {bgType === 'gradient' && (
                  <div className="grid grid-cols-3 gap-2">
                    {gradientPresets.map((gradient, idx) => (
                      <button key={idx} onClick={() => updateCardBackground({ type: 'gradient', value: gradient })} className={`h-10 rounded-lg border-2 ${currentCard.background.value === gradient ? 'border-indigo-500' : 'border-transparent hover:border-gray-300'}`} style={{ background: gradient }} />
                    ))}
                  </div>
                )}
                {bgType === 'image' && (
                  <div className="space-y-2">
                    <input type="text" placeholder="Enter image URL..." value={currentCard.background.type === 'image' ? currentCard.background.value : ''} onChange={(e) => updateCardBackground({ type: 'image', value: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Or Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              updateCardBackground({ type: 'image', value: event.target.result });
                            };
                            reader.readAsDataURL(file);
                          }
                          e.target.value = '';
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-indigo-50 file:text-indigo-700 file:cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Card Size */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Card Size</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500">Width</label>
                  <input type="number" value={currentCard.cardSize.width} onChange={(e) => updateCardSize({ ...currentCard.cardSize, width: parseInt(e.target.value) || 400 })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Height</label>
                  <input type="number" value={currentCard.cardSize.height} onChange={(e) => updateCardSize({ ...currentCard.cardSize, height: parseInt(e.target.value) || 250 })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Element Properties */}
            {selectedElement && (
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Element Properties</h3>
                <div className="flex gap-2 mb-4">
                  <button onClick={() => duplicateElement(selectedElementId)} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200" title="Duplicate"><Copy size={14} /></button>
                  <button onClick={() => moveElementLayer(selectedElementId, 'up')} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200" title="Move Up"><ChevronUp size={14} /></button>
                  <button onClick={() => moveElementLayer(selectedElementId, 'down')} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 rounded-lg hover:bg-gray-200" title="Move Down"><ChevronDown size={14} /></button>
                  <button onClick={() => deleteElement(selectedElementId)} className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200" title="Delete"><Trash2 size={14} /></button>
                </div>

                {/* Scale */}
                <div className="mb-4">
                  <label className="text-xs text-gray-500 block mb-2">Scale</label>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateElementWithHistory(selectedElementId, { scale: Math.max(0.1, (selectedElement.scale || 1) - 0.1) })} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ZoomOut size={16} /></button>
                    <div className="flex-1 text-center text-sm font-medium">{Math.round((selectedElement.scale || 1) * 100)}%</div>
                    <button onClick={() => updateElementWithHistory(selectedElementId, { scale: Math.min(3, (selectedElement.scale || 1) + 0.1) })} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ZoomIn size={16} /></button>
                  </div>
                </div>

                {/* Position */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs text-gray-500">X</label>
                    <input type="number" value={Math.round(selectedElement.x)} onChange={(e) => updateElementWithHistory(selectedElementId, { x: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Y</label>
                    <input type="number" value={Math.round(selectedElement.y)} onChange={(e) => updateElementWithHistory(selectedElementId, { y: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                  </div>
                </div>

                {/* Size */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs text-gray-500">Width</label>
                    <input type="number" value={Math.round(selectedElement.width)} onChange={(e) => updateElementWithHistory(selectedElementId, { width: parseInt(e.target.value) || 50 })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Height</label>
                    <input type="number" value={Math.round(selectedElement.height)} onChange={(e) => updateElementWithHistory(selectedElementId, { height: parseInt(e.target.value) || 50 })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                  </div>
                </div>

                {/* Text Properties */}
                {selectedElement.type === 'text' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Content</label>
                      <input type="text" value={selectedElement.content} onChange={(e) => updateElementWithHistory(selectedElementId, { content: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">Font Size</label>
                        <input type="number" value={selectedElement.fontSize || 16} onChange={(e) => updateElementWithHistory(selectedElementId, { fontSize: parseInt(e.target.value) || 16 })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Color</label>
                        <input type="color" value={selectedElement.color || '#000000'} onChange={(e) => updateElementWithHistory(selectedElementId, { color: e.target.value })} className="w-full h-9 rounded cursor-pointer border-0" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Font Weight</label>
                      <select value={selectedElement.fontWeight || 'normal'} onChange={(e) => updateElementWithHistory(selectedElementId, { fontWeight: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
                        <option value="normal">Normal</option>
                        <option value="bold">Bold</option>
                        <option value="lighter">Light</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500">Text Align</label>
                        <select value={selectedElement.textAlign || 'left'} onChange={(e) => updateElementWithHistory(selectedElementId, { textAlign: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Vertical Align</label>
                        <select value={selectedElement.verticalAlign || 'top'} onChange={(e) => updateElementWithHistory(selectedElementId, { verticalAlign: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
                          <option value="top">Top</option>
                          <option value="middle">Middle</option>
                          <option value="bottom">Bottom</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Properties */}
                {selectedElement.type === 'image' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Image URL</label>
                      <input type="text" value={selectedElement.content} onChange={(e) => updateElementWithHistory(selectedElementId, { content: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" placeholder="Enter image URL" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Or Upload Image</label>
                      <input
                        ref={imagePropertyInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              updateElementWithHistory(selectedElementId, { content: event.target.result });
                            };
                            reader.readAsDataURL(file);
                          }
                          e.target.value = '';
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-indigo-50 file:text-indigo-700 file:cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Border Radius</label>
                      <input type="text" value={selectedElement.borderRadius || '0'} onChange={(e) => updateElementWithHistory(selectedElementId, { borderRadius: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                )}

                {/* Decoration Properties */}
                {selectedElement.type === 'decoration' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Background Color</label>
                      <div className="flex gap-2">
                        <input type="color" value={selectedElement.backgroundColor?.startsWith('#') ? selectedElement.backgroundColor : '#3b82f6'} onChange={(e) => updateElementWithHistory(selectedElementId, { backgroundColor: e.target.value })} className="w-10 h-10 rounded cursor-pointer border-0" />
                        <input type="text" value={selectedElement.backgroundColor || '#3b82f6'} onChange={(e) => updateElementWithHistory(selectedElementId, { backgroundColor: e.target.value })} className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Border Radius</label>
                      <input type="text" value={selectedElement.borderRadius || '0'} onChange={(e) => updateElementWithHistory(selectedElementId, { borderRadius: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Export Options */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Export Card</h3>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => exportAsImage('png')} disabled={isExporting} className="flex flex-col items-center gap-1 p-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 disabled:opacity-50">
                  <FileImage size={18} />
                  <span className="text-xs">PNG</span>
                </button>
                <button onClick={() => exportAsImage('jpg')} disabled={isExporting} className="flex flex-col items-center gap-1 p-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 disabled:opacity-50">
                  <Image size={18} />
                  <span className="text-xs">JPG</span>
                </button>
                <button onClick={exportAsPDF} disabled={isExporting} className="flex flex-col items-center gap-1 p-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-50">
                  <FileText size={18} />
                  <span className="text-xs">PDF</span>
                </button>
              </div>
            </div>

            {!selectedElement && (
              <div className="p-4 text-center text-gray-400 text-sm">
                Select an element to edit its properties
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Add Image</h3>
              <button onClick={() => { setShowImageModal(false); setImageUrl(''); }} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => {
                    if (imageUrl.trim()) {
                      addElement({ type: 'image', width: 100, height: 100, content: imageUrl.trim(), borderRadius: '0' });
                      setShowImageModal(false);
                      setImageUrl('');
                    }
                  }}
                  disabled={!imageUrl.trim()}
                  className="mt-2 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add from URL
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload from Device</label>
                <input
                  ref={imageFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        addElement({ type: 'image', width: 100, height: 100, content: event.target.result, borderRadius: '0' });
                        setShowImageModal(false);
                        setImageUrl('');
                      };
                      reader.readAsDataURL(file);
                    }
                    e.target.value = '';
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-indigo-50 file:text-indigo-700 file:cursor-pointer"
                />
              </div>
              <button
                onClick={() => { setShowImageModal(false); setImageUrl(''); }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Import Template</h3>
              <button onClick={() => { setShowImportModal(false); setImportJson(''); setImportError(''); }} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload JSON File</label>
                <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Or Paste JSON</label>
                <textarea value={importJson} onChange={(e) => setImportJson(e.target.value)} placeholder='{"name": "Template", "background": {...}, ...}' className="w-full h-40 px-3 py-2 text-sm border border-gray-300 rounded-lg font-mono resize-none" />
              </div>
              {importError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{importError}</div>
              )}
              <div className="flex gap-3">
                <button onClick={handleImportJson} disabled={!importJson.trim()} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  Import Template
                </button>
                <button onClick={() => { setShowImportModal(false); setImportJson(''); setImportError(''); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DraggableElement = ({ element, isSelected, onSelect, onUpdate, onUpdateWithHistory }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('resize-handle')) return;
    e.stopPropagation();
    onSelect();
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

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        onUpdate({ x: Math.max(0, elementStart.x + dx), y: Math.max(0, elementStart.y + dy) });
      }
      if (isResizing) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        onUpdate({ width: Math.max(20, elementStart.width + dx), height: Math.max(20, elementStart.height + dy) });
      }
    };

    const handleMouseUp = () => {
      if (isDragging || isResizing) {
        onUpdateWithHistory({ x: element.x, y: element.y, width: element.width, height: element.height });
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
  }, [isDragging, isResizing, dragStart, elementStart, element, onUpdate, onUpdateWithHistory]);

  const renderContent = () => {
    switch (element.type) {
      case 'text':
        const verticalAlignMap = { top: 'flex-start', middle: 'center', bottom: 'flex-end' };
        return (
          <div style={{ width: '100%', height: '100%', fontSize: `${element.fontSize || 16}px`, fontWeight: element.fontWeight || 'normal', color: element.color || '#000000', textAlign: element.textAlign || 'left', display: 'flex', alignItems: verticalAlignMap[element.verticalAlign] || 'flex-start', justifyContent: element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: '1.2' }}>
            {element.content}
          </div>
        );
      case 'image':
        return <img src={element.content} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: element.borderRadius || '0', border: element.border || 'none', pointerEvents: 'none' }} draggable={false} />;
      case 'decoration':
        return <div style={{ width: '100%', height: '100%', backgroundColor: element.backgroundColor || 'transparent', borderRadius: element.borderRadius || '0', border: element.border || 'none' }} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{ position: 'absolute', left: `${element.x}px`, top: `${element.y}px`, width: `${element.width}px`, height: `${element.height}px`, transform: `scale(${element.scale || 1})`, transformOrigin: 'top left', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
      className={isSelected ? 'outline outline-2 outline-blue-500 outline-offset-2' : ''}
      onMouseDown={handleMouseDown}
    >
      {renderContent()}
      {isSelected && (
        <>
          <div className="resize-handle absolute -right-1 -bottom-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize z-10" onMouseDown={handleResizeStart} />
          <div className="absolute -left-1 -top-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-none" />
          <div className="absolute -right-1 -top-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-none" />
          <div className="absolute -left-1 -bottom-1 w-2 h-2 bg-blue-500 rounded-full pointer-events-none" />
        </>
      )}
    </div>
  );
};

export default ManagerPage;
