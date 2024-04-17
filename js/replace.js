window.onload = function () {
  var HTMLstring = document.getElementById("content").innerHTML;
  var strHTML = HTMLstring.toString();
  // console.log(HTMLstring);

  // 拡張機能のローカル保存データを読み込む
  chrome.storage.sync.get("replacements", function (result) {
    var replacements = result.replacements || [];

    // 文字列の置換処理
    replacements.forEach(function (replacement) {
      // 1. 文字列のペアを読み込む
      var address = replacement.address;
      var aliasString = replacement.aliasString;
      console.log("replaceSTR:", aliasString, "targetAddress", address);
      // 2. アドレスを正規表現および，省略形に対応した形に変更
      var fullAddr = ">" + address + "<";
      var shortAddr =
        ">" + address.slice(0, 10) + "..." + address.slice(-9) + "<";
      console.log("fullAdderExp:", fullAddr, "shortAddrExp:", shortAddr);
      // 3. 正規表現で置き換えする
      var fullAddrRegExp = new RegExp(fullAddr, "gi");
      var shortAddrRegExp = new RegExp(shortAddr, "gi");
      strHTML = strHTML.replace(fullAddrRegExp, ">" + aliasString + "<");
      strHTML = strHTML.replace(shortAddrRegExp, ">" + aliasString + "<");
    });

    // console.log(strHTML);
    document.getElementById("content").innerHTML = strHTML;
    console.log("DONE");

    // DOMの変更を監視する
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          // 変更があった場合の処理をここに記述する
          var HTMLstring = document.getElementById("content").innerHTML;
          replacements.forEach(function (replacement) {
            // 1. 文字列のペアを読み込む
            var address = replacement.address;
            var aliasString = replacement.aliasString;
            console.log("replaceSTR:", aliasString, "targetAddress", address);
            // 2. アドレスを正規表現および，省略形に対応した形に変更
            var fullAddr = ">" + address + "<";
            var shortAddr =
              ">" + address.slice(0, 10) + "..." + address.slice(-8) + "<";
            console.log("fullAdderExp:", fullAddr, "shortAddrExp:", shortAddr);
            // 3. 正規表現で置き換えする
            var fullAddrRegExp = new RegExp(fullAddr, "gi");
            var shortAddrRegExp = new RegExp(shortAddr, "gi");
            strHTML = strHTML.replace(fullAddrRegExp, aliasString);
            strHTML = strHTML.replace(shortAddrRegExp, aliasString);
          });
          document.getElementById("content").innerHTML = strHTML;
          console.log("DONE");
        }
      });
    });

    // 監視の開始
    observer.observe(document.getElementById("content"), {
      childList: true,
      subtree: true,
      characterData: true,
    });
  });
  // 拡張機能ストレージに保存した機能を実装
};