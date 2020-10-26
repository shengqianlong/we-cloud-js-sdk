import Baseload from './baseLoad'
import urls from './url'
import { Observable } from './observable'
// 单文件上传
/**
 * @param file 上传文件
 * @param bucketId 空间Id
 * @param uploadToken 上传凭证
 * @param options 上传文件的相关资源信息配置
 */
export function uploadSingleFile(file, bucketId, uploadToken, options) {
  const newOption = {
    file,
    bucketId,
    uploadToken,
    options
  }
  const uploadUrl = urls.uploadSingleUrl
  return new Observable((observer) => {
    const manager = new Baseload(newOption, {
      onData: (data) => observer.next(data),
      onError: (err) => observer.error(err),
      onComplete: (res) => observer.complete(res)
    }, uploadUrl)
    manager.putFile();
    return manager.stop.bind(manager)
  })
}

// 图片上传
/**
 * @param file 上传文件
 * @param bucketId 空间Id
 * @param uploadToken 上传凭证
 * @param options 上传文件的相关资源信息配置
 */
export function uploadImageFile(file, bucketId, uploadToken, options) {
  const newOption = {
    file,
    bucketId,
    uploadToken,
    options
  }
  const uploadUrl = urls.uploadImageUrl
  return new Observable((observer) => {
    const manager = new Baseload(newOption, {
      onData: (data) => observer.next(data),
      onError: (err) => observer.error(err),
      onComplete: (res) => observer.complete(res)
    }, uploadUrl)
    manager.putFile();
    return manager.stop.bind(manager)
  })
}

// // 音视频上传
// /**
//  * @param file 上传文件
//  * @param bucketId 空间Id
//  * @param uploadToken 上传凭证
//  * @param asyncProcessing 是否异步处理视频
//  * @param options 上传文件的相关资源信息配置
//  */
// export function uploadMediaFile(file, bucketId, uploadToken, asyncProcessing, options) {
//   const newOption = {
//     file,
//     bucketId,
//     uploadToken,
//     asyncProcessing,
//     options
//   }
//   return new Observable((observer) => {
//     const manager = new Media(newOption, {
//       onData: (data) => observer.next(data),
//       onError: (err) => observer.error(err),
//       onComplete: (res) => observer.complete(res)
//     })
//     manager.run()
//     return manager
//   })
// }
