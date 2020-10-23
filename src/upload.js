import urls from './url'
import * as utils from './utils'
import Single from './single'
import { Observable } from './observable'
// 单文件上传
/**
 * @param file 上传文件
 * @param bucketId 空间Id
 * @param uploadToken 上传凭证
 * @param options 上传文件的相关资源信息配置
 */
export function uploadSingleFile(file, bucketId, uploadToken, options) {
  // const url = urls.uploadSingleUrl;
  // const formData = new FormData()
  // formData.append('file', file)
  // formData.append('bucketId', bucketId)
  // formData.append('uploadToken', uploadToken)
  // if (options && Object.keys(options).length !== 0) {
  //   Object.keys(options).forEach(key => formData.append(key, options[key].toString()))
  // }
  // const result = utils.request(url,{
  //   method: 'POST',
  //   body: formData,
  //   onProgress: (data) => {
  //     console.log(data)
  //   }
  // })
  // return result;
  const newOption = {
    file,
    bucketId,
    uploadToken,
    options
  }
  return new Observable((observer) => {
    const manager = new Single(newOption, {
      onData: (data) => observer.next(data),
      onError: (err) => observer.error(err),
      onComplete: (res) => observer.complete(res)
    })
    manager.run()
    return manager
  })
  // return new Single(newOption, {
  //   onData: (data) => { console.log(data)}
  // })
}

// 图片上传
/**
 * @param file 上传文件
 * @param bucketId 空间Id
 * @param uploadToken 上传凭证
 * @param options 上传文件的相关资源信息配置
 */
export function uploadImageFile(file, bucketId, uploadToken, options) {
  const url = urls.uploadImageUrl;
  const formData = new FormData()
  formData.append('file', file)
  formData.append('bucketId', bucketId)
  formData.append('uploadToken', uploadToken)
  if (options && Object.keys(options).length !== 0) {
    Object.keys(options).forEach(key => formData.append(key, options[key].toString()))
  }
  const result = utils.request(url,{
    method: 'POST',
    body: formData
  })
  return result;
}

// 音视频上传
/**
 * @param file 上传文件
 * @param bucketId 空间Id
 * @param uploadToken 上传凭证
 * @param asyncProcessing 是否异步处理视频
 * @param options 上传文件的相关资源信息配置
 */
export function uploadMediaFile(file, bucketId, uploadToken, asyncProcessing, options) {
  const url = urls.uploadMediaUrl;
  const formData = new FormData()
  formData.append('file', file)
  formData.append('bucketId', bucketId)
  formData.append('uploadToken', uploadToken)
  formData.append('asyncProcessing', asyncProcessing)
  if (options && Object.keys(options).length !== 0) {
    Object.keys(options).forEach(key => formData.append(key, options[key].toString()))
  }
  const result = utils.request(url,{
    method: 'POST',
    body: formData,
  })
  return result;
}
