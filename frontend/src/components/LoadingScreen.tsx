import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-primary flex items-center justify-center z-[100]">
      <div className="flex flex-col items-center animate-fade-in">
        {/* Logo */}
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl mb-6 animate-pulse-slow">
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <div className="w-20 h-20 text-primary-gold font-bold text-5xl flex items-center justify-center">
              ف
            </div>
          </div>
        </div>

        {/* Site Name */}
        <h1 className="text-4xl font-bold text-white mb-2">فرصتك</h1>
        <p className="text-white/80 text-lg">منصة العمل الحر الرائدة</p>

        {/* Loading Indicator */}
        <div className="mt-8 flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;