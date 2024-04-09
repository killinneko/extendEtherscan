// テキストを置換する関数
function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = node.textContent.replace(/を/g, "をあああああああああああああああ。");
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // 子ノードに対して再帰的に置換を実行
      node.childNodes.forEach(childNode => {
        replaceText(childNode);
      });
    }
  }
  

  // 初期のテキスト置換を実行
  replaceText(document.body);
  
  // MutationObserver の設定
  const observer = new MutationObserver(mutationsList => {
    mutationsList.forEach(mutation => {
      // 追加されたノードに対してテキスト置換を行う
      mutation.addedNodes.forEach(addedNode => {
        replaceText(addedNode);
      });
    });
  });
  
  // DOM の変更を監視する
  observer.observe(document.body, { childList: true, subtree: true });
