
export const docxView = (url, container, previewerRef, callback) => {
  import('@js-preview/docx/lib/index.css');
  import('@js-preview/docx').then(module => {
    //初始化时指明要挂载的父元素Dom节点
    const previewer = module.default.init(container);
    if (!!previewerRef) previewerRef.current = previewer;
    if (!!callback) callback(previewer);
    //传递要预览的文件地址即可
    previewer.preview(url).then(res => {
      console.log('预览完成');
    }).catch(e => {
      console.log('预览失败', e);
    });
  });
};

export const xlsxView = (url, container, previewerRef, callback) => {
  import('@js-preview/excel/lib/index.css');
  import('@js-preview/excel').then(module => {
    const previewer = module.default.init(container);
    if (!!callback) callback(previewer);
    previewerRef.current = previewer;
    //传递要预览的文件地址即可
    previewer.preview(url).then(res => {
      console.log('预览完成');
    }).catch(e => {
      console.log('预览失败', e);
    });
  });
};

export const pdfView = (url, container, previewerRef, callback) => {
  //初始化时指明要挂载的父元素Dom节点
  import('@js-preview/pdf').then(module => {
    const previewer = module.default.init(container, {
      onError: (e) => {
        console.log('发生错误', e);
      },
      onRendered: () => {
        console.log('渲染完成');
      }
    });
    if (!!previewerRef) previewerRef.current = previewer;
    if (!!callback) callback(previewer);
    //传递要预览的文件地址即可
    previewer.preview(url);
  });
};

export const pptxView = (url, container, previewerRef, callback) => {
  import('pptx-preview').then(module => {
    const previewer = module.init(container, {
      width: 960,
      height: 540
    });
    previewerRef.current = previewer;
    if (!!callback) callback(previewer);
    //传递要预览的文件地址即可
    //获取文件或者读取文件，获取文件的 ArrayBuffer格式数据，传给组件进行预览
    fetch(url).then(response => {
      return response.arrayBuffer();
    }).then(res => {
      //调用预览器的preview方法
      previewer.preview(res);
      if (previewerRef.current && previewerRef.current.destroy) {
        // 如果预览库提供了销毁方法，调用它
        previewerRef.current.destroy();
      }
      previewerRef.current = null;
    });
  });
};

/**
 * 根据url 获取扩展名
 * @param {*} url 文件url
 * @returns 
 */
function getFileExtension (url) {
  // 先去除URL中的查询参数和锚点
  const cleanUrl = url.split(/[?#]/)[0];
  // 获取路径中的最后一部分
  const fileName = cleanUrl.split('/').pop();
  // 如果没有文件名，返回空字符串
  if (!fileName) return '';

  // 分割文件名，获取最后一个点号后的内容
  const ext = fileName.split('.').pop();
  // 如果没有扩展名，返回空字符串
  return ext || '';
}

const viewTypes = {
  docx: docxView,
  pptx: pptxView,
  pdf: pdfView,
  xlsx: xlsxView
};

export const preView = (type, url, container, previewerRef, callback) => {
  viewTypes[type](url, container, previewerRef, callback);
};