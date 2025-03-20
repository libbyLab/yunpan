import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import {init} from  'pptx-preview';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");
  const previewerRef = useRef(null);

  useEffect(() => {
    if (previewerRef.current) return;
    //初始化时指明要挂载的父元素Dom节点
    //调用库的init方法生成一个预览器
    let pptxPrviewer = init(document.getElementById('view-container'), {
      width: 960,
      height: 540
    })
    previewerRef.current = pptxPrviewer;

    //传递要预览的文件地址即可
    //获取文件或者读取文件，获取文件的 ArrayBuffer格式数据，传给组件进行预览
    fetch('https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pptx').then(response => {
    // fetch('http://58.87.89.50:9990/logs/OfficeTestFile/1.pptx').then(response => {
      return response.arrayBuffer()
    }).then(res => {
      //调用预览器的preview方法
      pptxPrviewer.preview(res)
      if (previewerRef.current && previewerRef.current.destroy) {
        // 如果预览库提供了销毁方法，调用它
        previewerRef.current.destroy();
      }
      previewerRef.current = null;
    })
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
      <header className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7" />
            </svg>
          </a>
          <span className="text-gray-900 font-medium">{documentMeta.title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            在线编辑
          </button>
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
                  <div className="w-24 h-24 bg-red-500 text-white rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl font-bold">PDF</span>
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
                    <span>{documentMeta.type}</span>
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
                  <div className="flex">
                    <span className="text-gray-500 w-20">标签：</span>
                    <button className="text-blue-500 text-sm">添加标签</button>
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
      </div>
    </div>
  );
}