import { uploadSingleFile } from "../src";

window.uploadFile =  function uploadFile() {
  let file = document.getElementById('uploadFile').files[0];
  const upload = uploadSingleFile(file, "1310145483888635906", "pCs5lTP5h1.a99c99ef1c6e62b3840755c965395614");
  let next = (response) =>{
    let total = response.total;
    var a = document.getElementById('progress');
    a.textContent="进度：" + total.percent.toFixed(0) + "% ";
  }
  let error = (response) => {
    console.log(response)
  }
  let complete = (response) => {
    console.log(response)
  }
  let subscription =  upload.subscribe(next, error, complete)

  window.stopUpload = function() {
    subscription.unsubscribe()
  }
}
