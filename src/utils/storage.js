/* 
封装本地存储模块
*/

/* 存储数据 */

export const setItem = (key, value) => {
  //将数组或对象的数据转成字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/* 获取数据 */

export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    //返回正确的json格式的数据【如果不是就返回错误数据】
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/* 删除数据 */

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
