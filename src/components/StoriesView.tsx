import React, { useState } from 'react';
import { X, Plus, Heart, Eye, Send, ArrowRight, Sparkles } from 'lucide-react';
import { Story, User } from '../types';

interface StoriesViewProps {
  currentUser: User;
  stories: Story[];
  onClose: () => void;
  onAddStory: (mediaUrl: string, caption: string) => void;
}

export const StoriesView: React.FC<StoriesViewProps> = ({
  currentUser,
  stories,
  onClose,
  onAddStory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80');

  const currentStory = stories[currentIndex];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStory(selectedImage, caption);
    setShowAddModal(false);
    setCaption('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-4 text-slate-100 select-none">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <img
            src={currentStory?.userAvatar || currentUser.avatar}
            alt=""
            className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500"
          />
          <div>
            <h4 className="font-bold text-sm text-white">{currentStory?.userName || currentUser.name}</h4>
            <span className="text-[11px] text-slate-400">{currentStory?.timestamp || 'الآن'}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 bg-slate-900/80 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Story Viewer Content */}
      <div className="relative w-full max-w-md h-[80vh] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col justify-end">
        {currentStory ? (
          <>
            <img
              src={currentStory.mediaUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40"></div>

            <div className="relative z-10 p-6">
              {currentStory.caption && (
                <p className="text-white text-sm mb-4 bg-slate-950/60 backdrop-blur p-3 rounded-2xl border border-slate-800/80">
                  {currentStory.caption}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-300 text-xs bg-slate-950/60 backdrop-blur px-3 py-1.5 rounded-full border border-slate-800">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>{currentStory.viewsCount} مشاهدة</span>
                </div>

                <button className="flex items-center gap-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow">
                  <Heart className="w-4 h-4" />
                  <span>إعجاب</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-6 text-center">
            <Sparkles className="w-12 h-12 text-cyan-400 mb-2 animate-bounce" />
            <h3 className="text-lg font-bold text-white mb-1">لا توجد قصص حالياً</h3>
            <p className="text-xs text-slate-400 mb-6">كن أول من ينشر قصة جديدة في تطبيق Era!</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-bold rounded-xl shadow-lg"
            >
              نشر قصة جديدة
            </button>
          </div>
        )}
      </div>

      {/* Add Story Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>إضافة قصة جديدة إلى Era</span>
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">رابط الصورة (URL)</label>
                <input
                  type="text"
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">تعليق على القصة</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="اكتب شيئاً مميزاً..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-xs transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow"
                >
                  نشر القصة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom action to add story */}
      {!showAddModal && (
        <div className="mt-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold px-6 py-3 rounded-2xl shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>نشر قصة جديدة</span>
          </button>
        </div>
      )}
    </div>
  );
};
