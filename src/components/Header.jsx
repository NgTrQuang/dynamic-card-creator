import React from 'react';
import { useCard } from '../context/CardContext';
import { Undo2, Redo2, Download, CreditCard } from 'lucide-react';

const Header = () => {
  const { undo, redo, canUndo, canRedo, currentCard } = useCard();

  const handleExport = () => {
    const cardData = JSON.stringify(currentCard, null, 2);
    const blob = new Blob([cardData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCard.name.replace(/\s+/g, '_')}_card.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <CreditCard size={28} className="text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-800">Card Creator</h1>
        </div>
        <span className="text-sm text-gray-400">|</span>
        <span className="text-sm text-gray-600">{currentCard.name}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
            canUndo
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-50 text-gray-300 cursor-not-allowed'
          }`}
          title="Undo"
        >
          <Undo2 size={18} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
            canRedo
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-50 text-gray-300 cursor-not-allowed'
          }`}
          title="Redo"
        >
          <Redo2 size={18} />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Download size={18} />
          Export
        </button>
      </div>
    </header>
  );
};

export default Header;
