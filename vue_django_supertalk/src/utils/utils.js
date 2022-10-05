/*
 * @Author: darkgoldenrod(暮秋)
 * @Date: 2022-04-11 16:34:50
 * @LastEditTime: 2022-04-25 12:05:44
 * @LastEditors: darkgoldenrod(暮秋)
 * @Description: 
 * @FilePath: \vue_咸鱼\spuertalkl\src\utils\utils.js
 */

export function comment(datas, DataLabel, Data) {
    let res
    typeof datas == "string" ? res = JSON.parse(datas) : res = datas
    for (let item in res[0]) {
      item == "children" ? 1 : DataLabel[item] = item;
    }
    Data.length = 0;
    res.forEach((item) => {
      Data.push(item);
    });
  }

export function comment2(datas, Data) {
    let res
    typeof datas == "string" ? res = JSON.parse(datas) : res = datas
    Data.length = 0;
    res.forEach((item) => {
      Data.push(item);
    });
  }


  var exportCsv = (obj) => {
    try {
      var title = obj.title;
      var titleForKey = obj.titleForKey;
      var data = obj.data;
      var str = [];
      str.push(obj.title.join(",") + "\n");
      for (var i = 0; i < data.length; i++) {
        var temp = [];
        for (var j = 0; j < titleForKey.length; j++) {
          temp.push(data[i][titleForKey[j]]);
        }
        str.push(temp.join(",") + "\n");
      }
      console.log(str);
      var uri =
        "data:text/csv;charset=utf-8-sig," + encodeURIComponent(str.join(""));
      var downloadLink = document.createElement("a");
      downloadLink.href = uri;
      downloadLink.download = "export.csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  export function csvUtil(label, datas) {
    datas == []
      ? (() => {
          this.$message.error("暂无数据可以导出");
          return;
        })()
      : 1;
    let titles = [];
    let titleForKeys = [];
    for (let item in label) {
      titleForKeys.push(item);
      titles.push(label[item]);
    }
    exportCsv({
      title: titles,
      titleForKey: titleForKeys,
      data: datas,
    });
  }