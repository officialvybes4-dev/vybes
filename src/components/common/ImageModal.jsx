import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ImageModal = () => {
  const { previewImage, setPreviewImage } = useApp();

  if (!previewImage) return null;

  const imageUrl = typeof previewImage === 'string' ? previewImage : previewImage.url;
  const caption = typeof previewImage === 'object' ? previewImage.caption : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn"
      onClick={() => setPreviewImage(null)}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="absolute top-[-48px] right-0 flex items-center gap-2">
          <a
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            download="dating-app-photo.jpg"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            title="Open in new tab / Download"
          >
            <Download className="w-5 h-5" />
          </a>
          <button
            onClick={() => setPreviewImage(null)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
            title="Close image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High Resolution Image */}
        <div className="rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
          <img
            src={imageUrl}
            alt={caption || 'Preview image'}
            className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
          />
        </div>

        {/* Caption bar if present */}
        {caption && (
          <div className="mt-3 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs max-w-lg text-center backdrop-blur-md">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
