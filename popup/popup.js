document.addEventListener("DOMContentLoaded", function () {
    var registButton = document.getElementById("registButton");
    registButton.addEventListener("click", function () {
      var address = document.getElementById("address").value;
      var aliasString = document.getElementById("aliasString").value;
  
      // 空白文字をエスケープする
      address = address.replace(/\s/g, "");
      aliasString = aliasString.replace(/\s/g, "");
  
      chrome.storage.sync.get("replacements", function (result) {
        var replacements = result.replacements || [];
  
        replacements.push({
          address: address,
          aliasString: aliasString,
        });
  
        var data = {
          replacements: replacements,
        };
  
        chrome.storage.sync.set(data, function () {
          console.log("情報を登録しました");
        });
  
        // 入力項目を削除する
        document.getElementById("address").value = "";
        document.getElementById("aliasString").value = "";
      });
    });
    var resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", function () {
      chrome.storage.sync.remove("replacements", function () {
        console.log("情報をリセットしました");
      });
    });
  });