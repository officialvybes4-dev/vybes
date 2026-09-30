import React, { useState, useRef } from 'react';
import { X, Upload, Image as ImageIcon, Send, Sparkles } from 'lucide-react';
import { SAMPLE_PHOTOS } from '../../data/initialChats';
import { useTheme } from '../../context/ThemeContext';

export const ImageUploaderModal = ({ isOpen, onClose, onSendImage }) => {
  const { theme } = useTheme();
  const fileInputRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'presets'

  if (!isOpen) return null;

  // Handle local file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if (!selectedImage) return;
    onSendImage({
      imageUrl: selectedImage,
      text: caption.trim()
    });
    setSelectedImage(null);
    setCaption('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl transition-all ${theme.cardBg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Send Image in Chat</h2>
              <p className="text-[11px] text-gray-400">Share memories, photos, or aesthetic moments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Upload Local File vs Curated Presets */}
        <div className="grid grid-cols-2 gap-2 my-4 p-1 rounded-2xl bg-black/30 border border-white/10">
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'upload' ? `${theme.buttonClass} shadow-md` : 'text-gray-400 hover:text-white'
            }`}
          >
            Upload Device Photo
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'presets' ? `${theme.buttonClass} shadow-md` : 'text-gray-400 hover:text-white'
            }`}
          >
            Curated Photo Presets
          </button>
        </div>

        {/* Upload Mode */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {selectedImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-white/20 h-56 bg-black flex items-center justify-center group">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 hover:border-rose-400/60 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white/5 hover:bg-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 animate-bounce" />
                </div>
                <p className="text-xs font-bold text-white">Click or Drag & Drop photo here</p>
                <p className="text-[10px] text-gray-400 mt-1">Supports PNG, JPG, GIF, WebP up to 10MB</p>
              </div>
            )}
          </div>
        )}

        {/* Presets Mode */}
        {activeTab === 'presets' && (
          <div className="space-y-3">
            <p className="text-[11px] text-gray-400">Choose a stunning vibe to send instantly:</p>
            <div className="grid grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {SAMPLE_PHOTOS.map((item, idx) => {
                const isSelected = selectedImage === item.url;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedImage(item.url);
                      setCaption(item.caption);
                    }}
                    className={`relative rounded-xl overflow-hidden cursor-pointer border transition-all h-24 group ${
                      isSelected 
                        ? 'border-rose-400 ring-2 ring-rose-400/40 scale-95' 
                        : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-1">
                      <p className="text-[9px] font-semibold text-white truncate text-center">{item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Optional Caption Input */}
        <div className="mt-4">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a sweet caption or note... (optional)"
            className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${theme.inputBg}`}
          />
        </div>

        {/* Action Button */}
        <div className="mt-5">
          <button
            onClick={handleSend}
            disabled={!selectedImage}
            className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 ${
              selectedImage
                ? `${theme.buttonClass} transition-transform active:scale-95`
                : 'bg-white/10 text-gray-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Send Photo in Chat</span>
          </button>
        </div>

      </div>
    </div>
  );
};
