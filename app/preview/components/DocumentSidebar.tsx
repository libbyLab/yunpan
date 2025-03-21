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
  'image': '图片',
}

export default function DocumentSidebar({ documentMeta }: DocumentSidebarProps) {
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");
  const location = useLocation();
  const docData = location.state?.docData;

  return (
    <div className="w-64 overflow-auto" style = {{
      background: '#f7f9fc',
      boxShadow: '-1px 0 2px 0 rgba(0,0,0,.1)',
      borderLeft: '1px solid #f6f6f6',
      zIndex: 1
    }}>
      <div className="py-4 px-4">
        {/* 切换选项卡 */}
        <div className="flex border-b mb-4" style={{
          fontSize: 13
        }}>
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
          <div className="space-y-4">
            {/* PDF图标和文件名 */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 text-white rounded-lg flex items-center justify-center" style={{
                backgroundImage: `url(${new URL(`../images/${docData.type}.svg`, import.meta.url).href})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}>
              </div>
              <h2 className="text-center font-medium">{documentMeta.title}</h2>
            </div>

            {/* 文档详情信息 */}
            <div className="space-y-2.5 doc-detail">
              <div className="flex">
                <label className="w-16 mb-6">创建人：</label>
                <span>{documentMeta.creator}</span>
              </div>
              <div className="flex">
                <label className="w-16">空间位置：</label>
                <span>{documentMeta.space}</span>
              </div>
              <div className="flex">
                <label className="w-16">文件路径：</label>
                <span>{documentMeta.path}</span>
              </div>
              <div className="flex">
                <label className="w-16">类型：</label>
                <span>{ typeName[documentMeta.type]||'' }</span>
              </div>
              <div className="flex">
                <label className="w-16">大小：</label>
                <span>{documentMeta.size}</span>
              </div>
              <div className="flex">
                <label className="w-16">创建时间：</label>
                <span>{documentMeta.createTime}</span>
              </div>
              <div className="flex">
                <label className="w-16">修改时间：</label>
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