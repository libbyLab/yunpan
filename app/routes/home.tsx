import type { Route } from "./+types/home";
import { useState } from "react";
import { useNavigate } from 'react-router'
// 文档列表项的类型定义
interface Document {
  id: string;
  title: string;
  lastModified: string;
  creator: string;
  size: string;
  type: string;
  url: string;
  space: string;
  path: string;
  createTime: string;
  modifyTime: string;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "云盘 - 我的文档" },
    { name: "description", content: "云盘在线文档管理" },
  ];
}

export default function Home() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortField, setSortField] = useState<"name" | "date" | "size">("date");
  const [isAscending, setIsAscending] = useState(false);
  let navigate = useNavigate();
  
  const handlePreview = (docData: Document) => {
    navigate(`/preview/${docData.id}`, {
      state: {
        docData: {
          ...docData
        }
      }
    });
  };

  // 模拟文档列表数据
  const documents: Document[] = [
    { 
      id: "1", 
      title: "产品使用手册.pdf", 
      lastModified: "2023-03-18 20:41:58", 
      creator: "wlj",
      size: "4.6 MB",
      type: "PDF文档",
      url: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf',
      space: "个人空间",
      path: "全部/",
      createTime: "2023-03-18 20:41:58",
      modifyTime: "2023-03-18 20:41:58",
    },
    { 
      id: "2", 
      title: "项目进展报告.docx", 
      lastModified: "2023-03-15 10:25:33", 
      creator: "张三",
      size: "2.1 MB",
      type: "Word文档",
      url: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.docx',
      space: "个人空间",
      path: "全部/",
      createTime: "2023-03-18 20:41:58",
      modifyTime: "2023-03-18 20:41:58",
    },
    { 
      id: "3", 
      title: "财务数据表.xlsx", 
      lastModified: "2023-03-10 14:32:45", 
      creator: "李四",
      size: "1.8 MB",
      type: "Excel表格", url: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx',
      space: "个人空间",
      path: "全部/",
      createTime: "2023-03-18 20:41:58",
      modifyTime: "2023-03-18 20:41:58",
    },
    { 
      id: "4", 
      title: "市场分析.pptx", 
      lastModified: "2023-03-05 09:15:22", 
      creator: "王五",
      size: "5.3 MB",
      type: "PowerPoint",
      url: 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pptx',
      space: "个人空间",
      path: "全部/",
      createTime: "2023-03-18 20:41:58",
      modifyTime: "2023-03-18 20:41:58",
    },
  ];

  // 按照排序字段和顺序对文档排序
  const sortedDocuments = [...documents].sort((a, b) => {
    let compareResult = 0;
    
    switch(sortField) {
      case "name":
        compareResult = a.title.localeCompare(b.title);
        break;
      case "date":
        compareResult = new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        break;
      case "size":
        // 简单的尺寸比较，实际应用中可能需要更复杂的逻辑
        const sizeA = parseFloat(a.size.split(' ')[0]);
        const sizeB = parseFloat(b.size.split(' ')[0]);
        compareResult = sizeB - sizeA;
        break;
    }

    return isAscending ? -compareResult : compareResult;
  });

  // 获取文件类型对应的图标和颜色
  function getFileIcon(fileName: string): { icon: string; color: string } {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return { icon: 'PDF', color: 'bg-red-500' };
      case 'docx':
      case 'doc':
        return { icon: 'DOC', color: 'bg-blue-500' };
      case 'xlsx':
      case 'xls':
        return { icon: 'XLS', color: 'bg-green-500' };
      case 'pptx':
      case 'ppt':
        return { icon: 'PPT', color: 'bg-orange-500' };
      case 'jpg':
      case 'jpeg':
      case 'png':
        return { icon: 'IMG', color: 'bg-purple-500' };
      default:
        return { icon: 'FILE', color: 'bg-gray-500' };
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">我的文档</h1>
          <div className="flex space-x-2">
            <button 
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => setViewMode('list')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 text-sm">
            <button 
              className={`px-3 py-1 rounded ${sortField === 'name' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => {
                if (sortField === 'name') {
                  setIsAscending(!isAscending);
                } else {
                  setSortField('name');
                  setIsAscending(true);
                }
              }}
            >
              文件名 {sortField === 'name' && (isAscending ? '↑' : '↓')}
            </button>
            <button 
              className={`px-3 py-1 rounded ${sortField === 'date' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => {
                if (sortField === 'date') {
                  setIsAscending(!isAscending);
                } else {
                  setSortField('date');
                  setIsAscending(false);
                }
              }}
            >
              修改日期 {sortField === 'date' && (isAscending ? '↑' : '↓')}
            </button>
            <button 
              className={`px-3 py-1 rounded ${sortField === 'size' ? 'bg-gray-200' : 'bg-white'}`}
              onClick={() => {
                if (sortField === 'size') {
                  setIsAscending(!isAscending);
                } else {
                  setSortField('size');
                  setIsAscending(false);
                }
              }}
            >
              大小 {sortField === 'size' && (isAscending ? '↑' : '↓')}
            </button>
          </div>
          <div>
            <input 
              type="text" 
              placeholder="搜索文件..." 
              className="px-3 py-1 border rounded text-sm"
            />
          </div>
        </div>
      </header>
      
      {viewMode === 'grid' ? (
        // 网格视图
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedDocuments.map((doc) => {
            const { icon, color } = getFileIcon(doc.title);
            return (
              <div
                key={doc.id} 
                onClick={() => handlePreview(doc)}
                className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`aspect-square ${color} text-white flex items-center justify-center`}>
                  <span className="text-2xl font-bold">{icon}</span>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{doc.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(doc.lastModified).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{doc.size}</span>
                    <span>{doc.creator}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // 列表视图
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 py-2 px-4 text-sm font-medium">
            <div className="col-span-6">文件名</div>
            <div className="col-span-2">修改时间</div>
            <div className="col-span-2">创建者</div>
            <div className="col-span-1">大小</div>
            <div className="col-span-1">类型</div>
          </div>
          <div className="divide-y">
            {sortedDocuments.map((doc) => {
              const { icon, color } = getFileIcon(doc.title);
              return (
                <div
                  key={doc.id} 
                  onClick={() => handlePreview(doc)}
                  className="grid grid-cols-12 py-3 px-4 hover:bg-gray-50 items-center"
                >
                  <div className="col-span-6 flex items-center space-x-3">
                    <div className={`w-8 h-8 ${color} text-white rounded flex items-center justify-center`}>
                      <span className="text-xs font-bold">{icon}</span>
                    </div>
                    <span className="truncate">{doc.title}</span>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {new Date(doc.lastModified).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">{doc.creator}</div>
                  <div className="col-span-1 text-sm text-gray-600">{doc.size}</div>
                  <div className="col-span-1 text-sm text-gray-600">{doc.type}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
