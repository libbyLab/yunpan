import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { pptxView } from './utils';
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
  const { id } = useParams();
  const previewerRef = useRef(null);

  useEffect(() => {
    if (previewerRef.current) return;
    //初始化时指明要挂载的父元素Dom节点
    //调用库的init方法生成一个预览器
    const container = document.getElementById('view-container');
    if (!container) return;
    //初始化时指明要挂载的父元素Dom节点
    pptxView('https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pptx', container, previewerRef, (viewer)=>{
      previewerRef.current = viewer; 
    });
  }, []);

  // 模拟文档数据（实际中应通过API请求获取）
  const documentMeta: DocumentMeta = {
    id: id || "1",
    title: "产品使用手册.pdf",
    creator: "wlj",
    space: "个人空间",
    path: "全部/",
    type: "PDF文档",
    size: "4.6 MB",
    createTime: "2023-03-18 20:41:58",
    modifyTime: "2023-03-18 20:41:58",
    tags: []
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 顶部导航栏 */}
      <DocumentHeader title={documentMeta.title} />

      {/* 主要内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 文档内容区域 */}
        <div className="flex-1 overflow-auto bg-gray-100 relative">
          {/* 文档内容 */}
          <div className="max-w-4xl mx-auto py-6 px-4">
            <div id="view-container" style={{width: '100%'}}></div>
          </div>
        </div>

        {/* 文档信息侧边栏 */}
        <DocumentSidebar documentMeta={documentMeta} />
      </div>
    </div>
  );
}