import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router";
import { preView } from './utils';
import DocumentHeader from "./components/DocumentHeader";
import DocumentSidebar from "./components/DocumentSidebar";

// 文档页面类型定义
interface DocumentPage {
  id: string;
  imageUrl: string;
}

// 文档元数据类型定义
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

export function meta() {
  return [
    { title: "文档查看器" },
    { name: "description", content: "在线查看文档内容" },
  ];
}

export default function DocumentViewer() {
  const location = useLocation();
  const docData = location.state?.docData || {};
  const previewerRef = useRef(null);
  
  // 模拟文档数据（实际中应通过API请求获取）
  useEffect(() => {
    if (previewerRef.current) return;
    const container = document.getElementById('view-container');
    if (!container) return;
    const { url, type } = docData;
    preView(type, url, container, previewerRef)
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      <DocumentHeader title={docData.title} />

      {/* 主要内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 文档内容区域 */}
        <div className="flex-1 overflow-auto bg-gray-100 flex relative">
          {/* 左侧翻页按钮 */}
          <div id="view-container" className="flex-1"></div>
        </div>

        <DocumentSidebar documentMeta={docData} />
      </div>
    </div>
  );
}