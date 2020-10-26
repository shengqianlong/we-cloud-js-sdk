import * as utils from './utils'

export default class Baseload {

  constructor(option, handlers, url){
    this.xhrList = []
    this.option = option
    this.handlers = handlers
    this.url = url
  }

  async putFile() {
    this.aborted = false

    try {
      this.uploadAt = new Date().getTime()

      const result = await this.run()
      this.handlers.onComplete(result.data)

      return result

    } catch (err) {
      this.clear()
      this.handlers.onError(err)
      throw err
    }
  }

  clear() {
    this.xhrList.forEach(xhr => xhr.abort())
    this.xhrList = []
  }

  stop() {
    this.clear()
    this.aborted = true
  }

  addXhr(xhr) {
    this.xhrList.push(xhr)
  }

  async run() {
    const url = this.url;
    const formData = new FormData()
    formData.append('file', this.option.file)
    formData.append('bucketId', this.option.bucketId)
    formData.append('uploadToken', this.option.uploadToken)
    if (this.option.options && Object.keys(this.option.options).length !== 0) {
      Object.keys(this.option.options).forEach(key => formData.append(key, this.option.options[key].toString()))
    }
    const result = utils.request(url,{
      method: 'POST',
      body: formData,
      onProgress: (data) => {
        this.updateDirectProgress(data.loaded, data.total)
      },
      onCreate: xhr => this.addXhr(xhr)
    })
    this.finishDirectProgress()
    return result;
  }
  updateDirectProgress(loaded, total) {
    // 当请求未完成时可能进度会达到100，所以total + 1来防止这种情况出现
    this.progress = { total: this.getProgressInfoItem(loaded, total + 1) }
    this.handlers.onData(this.progress)
  }

  finishDirectProgress() {
    // 在某些浏览器环境下，xhr 的 progress 事件无法被触发，progress 为 null，这里 fake 下
    if (!this.progress) {
      this.progress = { total: this.getProgressInfoItem(this.option.file.size, this.option.file.size) }
      this.handlers.onData(this.progress)
      return
    }

    const { total } = this.progress
    this.progress = { total: this.getProgressInfoItem(total.loaded + 1, total.size) }
    this.handlers.onData(this.progress)
  }


  getProgressInfoItem(loaded, size) {
    return {
      loaded,
      size,
      percent: loaded / size * 100
    }
  }
}
