import { uploadSingleFile } from "../src";

window.uploadFile =  function uploadFile() {
  let file = document.getElementById('uploadFile').files[0];
  const upload = uploadSingleFile(file, "1310145483888635906", "pCs5lTP5h1.9fb026a3a4df6ba0e8640eeb749923c7");
  let next = (response) =>{
    let total = response.total;
    var a = document.getElementById('progress');
    a.textContent="进度：" + total.percent.toFixed(0) + "% ";
  }
  upload.subscribe(next)
}
