import React, { useState } from 'react';
import { useLocation } from 'react-router';

interface DocumentMeta {
  id: string;
  title: string;
  creator: string;
  space: string;
  path: string;
  type: string;
  size: string;
  createTime: string;
  modifyTime: string;
  tags: string[];
}

interface DocumentSidebarProps {
  documentMeta: DocumentMeta;
}

const typeName = {
  'xlsx': 'Excel文档',
  'pptx': 'PPT文档',
  'docx': 'Word文档',
  'pdf': 'PDF文档',
}

export default function DocumentSidebar({ documentMeta }: DocumentSidebarProps) {
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");
  const location = useLocation();
  const docData = location.state?.docData;

  return (
    <div className="w-80 border-l overflow-auto">
      <div className="py-4 px-4">
        {/* 切换选项卡 */}
        <div className="flex border-b mb-4">
          <button 
            className={`pb-2 px-4 ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('details')}
          >
            详细信息
          </button>
          <button 
            className={`pb-2 px-4 ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('history')}
          >
            历史版本
          </button>
        </div>

        {/* 文档信息 */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* PDF图标和文件名 */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 text-white rounded-lg flex items-center justify-center mb-2" style={{
                backgroundImage: `url(${new URL(`../images/${docData.type}.svg`, import.meta.url).href})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}>
                
              </div>
              <h2 className="text-center font-medium">{documentMeta.title}</h2>
            </div>

            {/* 文档详情信息 */}
            <div className="space-y-3">
              <div className="flex">
                <span className="text-gray-500 w-20">创建人：</span>
                <span>{documentMeta.creator}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-20">空间位置：</span>
                <span>{documentMeta.space}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-20">文件路径：</span>
                <span>{documentMeta.path}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-20">类型：</span>
                <span>{ typeName[documentMeta.type]||'' }</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-20">大小：</span>
                <span>{documentMeta.size}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-20">创建时间：</span>
                <span>{documentMeta.createTime}</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 w-20">修改时间：</span>
                <span>{documentMeta.modifyTime}</span>
              </div>
            </div>
          </div>
        )}

        {/* 历史版本 */}
        {activeTab === 'history' && (
          <div className="text-center text-gray-500 py-8">
            暂无历史版本
          </div>
        )}
      </div>
    </div>
  );
} 