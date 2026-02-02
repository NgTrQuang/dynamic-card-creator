import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTemplates } from '../context/TemplateContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  CreditCard,
  Download,
  FileImage,
  FileText,
  Image,
  Settings,
  ChevronRight,
  Check,
  RefreshCw,
  Upload
} from 'lucide-react';

const CardCreatorPage = () => {
  const { templates } = useTemplates();
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [cardData, setCardData] = useState({});
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef(null);

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  useEffect(() => {
    if (selectedTemplate) {
      const initialData = {};
      selectedTemplate.elements.forEach((el, index) => {
        if (el.type === 'text') {
          initialData[`text_${index}`] = el.content;
        } else if (el.type === 'image') {
          initialData[`image_${index}`] = el.content;
        }
      });
      setCardData(initialData);
    }
  }, [selectedTemplateId]);

  const handleDataChange = (key, value) => {
    setCardData(prev => ({ ...prev, [key]: value }));
  };

  const getBackgroundStyle = (background) => {
    if (!background) return { backgroundColor: '#ffffff' };
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

  const exportAsImage = async (format) => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

      const link = document.createElement('a');
      link.download = `card.${format}`;
      link.href = canvas.toDataURL(`image/${format === 'jpg' ? 'jpeg' : format}`, 0.95);
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });

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
      alert('PDF export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const renderCardElement = (element, index) => {
    const key = element.type === 'text' ? `text_${index}` : `image_${index}`;
    const content = cardData[key] !== undefined ? cardData[key] : element.content;

    const baseStyle = {
      position: 'absolute',
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      transform: `scale(${element.scale || 1})`,
      transformOrigin: 'top left'
    };

    const verticalAlignMap = { top: 'flex-start', middle: 'center', bottom: 'flex-end' };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              fontSize: `${element.fontSize || 16}px`,
              fontWeight: element.fontWeight || 'normal',
              color: element.color || '#000000',
              textAlign: element.textAlign || 'left',
              display: 'flex',
              alignItems: verticalAlignMap[element.verticalAlign] || 'flex-start',
              justifyContent: element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: '1.2'
            }}
          >
            {content}
          </div>
        );

      case 'image':
        return (
          <img
            key={element.id}
            src={content}
            alt="Card element"
            style={{
              ...baseStyle,
              objectFit: 'cover',
              borderRadius: element.borderRadius || '0',
              border: element.border || 'none'
            }}
            crossOrigin="anonymous"
          />
        );

      case 'decoration':
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
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

  const getEditableFields = () => {
    if (!selectedTemplate) return [];
    
    return selectedTemplate.elements
      .map((el, index) => {
        if (el.type === 'text') {
          return {
            type: 'text',
            key: `text_${index}`,
            label: el.content.substring(0, 20) + (el.content.length > 20 ? '...' : ''),
            placeholder: 'Enter text...'
          };
        } else if (el.type === 'image') {
          return {
            type: 'image',
            key: `image_${index}`,
            label: 'Image URL',
            placeholder: 'Enter image URL...'
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <CreditCard size={28} className="text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-800">Card Creator</h1>
            </div>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Settings size={18} />
              Manager
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Template Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-800">1. Select Template</h2>
                <p className="text-sm text-gray-500 mt-1">Choose a template to start</p>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="grid gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplateId(template.id)}
                      className={`w-full text-left rounded-lg overflow-hidden border-2 transition-all ${
                        selectedTemplateId === template.id
                          ? 'border-indigo-500 shadow-md'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <div
                        className="h-16 w-full"
                        style={getBackgroundStyle(template.background)}
                      />
                      <div className="p-2 bg-white flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 truncate">
                          {template.name}
                        </span>
                        {selectedTemplateId === template.id && (
                          <Check size={16} className="text-indigo-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Fields */}
            {selectedTemplate && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-4">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-800">2. Fill in Data</h2>
                  <p className="text-sm text-gray-500 mt-1">Customize your card content</p>
                </div>
                <div className="p-4 max-h-80 overflow-y-auto space-y-4">
                  {getEditableFields().map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {field.type === 'image' ? (
                          <span className="flex items-center gap-1">
                            <Image size={12} /> Image
                          </span>
                        ) : (
                          field.label
                        )}
                      </label>
                      {field.type === 'image' ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={cardData[field.key] || ''}
                            onChange={(e) => handleDataChange(field.key, e.target.value)}
                            placeholder="Enter image URL..."
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    handleDataChange(field.key, event.target.result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                                e.target.value = '';
                              }}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-indigo-50 file:text-indigo-700 file:cursor-pointer file:text-xs"
                            />
                          </div>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={cardData[field.key] || ''}
                          onChange={(e) => handleDataChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      )}
                    </div>
                  ))}
                  {getEditableFields().length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No editable fields in this template
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Center - Card Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-800">3. Preview & Export</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedTemplate ? selectedTemplate.name : 'Select a template first'}
                  </p>
                </div>
                {selectedTemplate && (
                  <button
                    onClick={() => {
                      const initialData = {};
                      selectedTemplate.elements.forEach((el, index) => {
                        if (el.type === 'text') {
                          initialData[`text_${index}`] = el.content;
                        } else if (el.type === 'image') {
                          initialData[`image_${index}`] = el.content;
                        }
                      });
                      setCardData(initialData);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <RefreshCw size={14} />
                    Reset
                  </button>
                )}
              </div>

              <div className="p-8 bg-gray-100 flex items-center justify-center min-h-[400px]">
                {selectedTemplate ? (
                  <div
                    ref={cardRef}
                    className="shadow-2xl rounded-lg overflow-hidden"
                    style={{
                      width: `${selectedTemplate.cardSize.width}px`,
                      height: `${selectedTemplate.cardSize.height}px`,
                      ...getBackgroundStyle(selectedTemplate.background),
                      position: 'relative'
                    }}
                  >
                    {selectedTemplate.elements.map((element, index) =>
                      renderCardElement(element, index)
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <CreditCard size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Select a template to preview your card</p>
                  </div>
                )}
              </div>

              {/* Export Buttons */}
              {selectedTemplate && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => exportAsImage('png')}
                      disabled={isExporting}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                    >
                      <FileImage size={18} />
                      Export PNG
                    </button>
                    <button
                      onClick={() => exportAsImage('jpg')}
                      disabled={isExporting}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                    >
                      <Image size={18} />
                      Export JPG
                    </button>
                    <button
                      onClick={exportAsPDF}
                      disabled={isExporting}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      <FileText size={18} />
                      Export PDF
                    </button>
                  </div>
                  {isExporting && (
                    <p className="text-center text-sm text-gray-500 mt-3">
                      Exporting... Please wait
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCreatorPage;
