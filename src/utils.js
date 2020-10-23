export const encode = (url) => encodeURIComponent(url);

export const decode = (url) => decodeURIComponent(url);

export function createXHR() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest()
  }

  return window.ActiveXObject('Microsoft.XMLHTTP')
}

export function request (url, options) {
  return new Promise((resolve, reject) => {
    const xhr = createXHR()
    xhr.open(options.method, url)

    if (options.onCreate) {
      options.onCreate(xhr)
    }

    if (options.headers) {
      const headers = options.headers
      Object.keys(headers).forEach(k => {
        xhr.setRequestHeader(k, headers[k])
      })
    }

    xhr.upload.addEventListener('progress', (evt) => {
      if (evt.lengthComputable && options.onProgress) {
        options.onProgress({
          loaded: evt.loaded,
          total: evt.total
        })
      }
    })

    xhr.onreadystatechange = () => {
      const responseText = xhr.responseText
      if (xhr.readyState !== 4) {
        return
      }

      if (xhr.status !== 200) {
        let message = `xhr request failed, code: ${xhr.status}`
        if (responseText) {
          message += ` response: ${responseText}`
        }
        reject({
          code: xhr.status,
          message,
          isRequestError: true
        })
        return
      }

      try {
        resolve({
          data: JSON.parse(responseText)
        })
      } catch (err) {
        reject(err)
      }
    }

    xhr.send(options.body)
  })
}