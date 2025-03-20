import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { docxView } from './utils';
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

  useEffect(() => {
    const container = document.getElementById('view-container');
    if (!container) return;
    docxView('https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx', container)
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

  const documentPages: DocumentPage[] = [
    { id: "page-1", imageUrl: "/images/doc-1-page-1.jpg" },
    { id: "page-2", imageUrl: "/images/doc-1-page-2.jpg" },
    { id: "page-3", imageUrl: "/images/doc-1-page-3.jpg" },
    { id: "page-4", imageUrl: "/images/doc-1-page-4.jpg" },
    { id: "page-5", imageUrl: "/images/doc-1-page-5.jpg" },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      <DocumentHeader title={documentMeta.title} />

      {/* 主要内容区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 文档内容区域 */}
        <div className="flex-1 overflow-auto bg-gray-100 relative">
          {/* 文档内容 */}
          <div className="max-w-4xl mx-auto py-6 px-4">
            <div id="view-container"></div>
          </div>
        </div>

        <DocumentSidebar documentMeta={documentMeta} />
      </div>
    </div>
  );
}