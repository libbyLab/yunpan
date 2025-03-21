import React from 'react';

interface DocumentHeaderProps {
  title: string;
}

export default function DocumentHeader({ title }: DocumentHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-1 bg-white" style={{
      boxShadow: '0 2px 3px 0 rgba(0,0,0,.1)',
      borderBottom: '1px solid #f6f6f6',
      zIndex: 1,
    }}>
      <div className="flex items-center space-x-4">
        <a href="/" className="text-gray-600 hover:text-gray-900 block h-6 w-6" style={{
          backgroundImage: `url(${new URL(`../images/home.svg`, import.meta.url).href})`,
        }}></a>
        <span className="text-gray-900 text-[14px]">{title}</span>
      </div>
      <div className="flex items-center space-x-2">
        {/* <button className="bg-blue-600 text-white px-4 py-1 rounded">
          在线编辑
        </button> */}
        <button className="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </header>
  );
} 