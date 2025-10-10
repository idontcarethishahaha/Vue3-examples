import type { ResultVO } from '@/types'
import axios from 'axios'

axios.defaults.baseURL = '/api/'

//请求拦截器,添加 token
axios.interceptors.request.use(req => {
  const token = localStorage.getItem('token')
  if (token && req.headers) {
    req.headers.token = token
  }
  return req
})

//响应拦截器
axios.interceptors.response.use(async resp => {
  //处理blob响应类型
  if (resp.config.responseType === 'blob' && !resp.headers['content-disposition']) {
    const text = await resp.data.text()
    throw new Error(JSON.parse(text).message)
  }

  const data = resp.data as ResultVO

  if (data.code >= 400) {
    throw new Error(data.message)
  }

  //解析json
  const parseData = <T>(obj: T): T => {
    if (obj === null || obj === undefined) {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(item => parseData(item)) as T
    }

    if (typeof obj === 'object') {
      const result: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(obj)) {
        result[key] = parseData(value)
      }
      return result as T
    }

    if (typeof obj === 'string') {
      try {
        const parsed = JSON.parse(obj)
        return parseData(parsed)
      } catch {
        return obj
      }
    }

    return obj
  }

  resp.data = parseData(resp.data)
  return resp
})

//HTTP请求
export const useGet = <T>(url: string): Promise<T> => {
  return axios.get<ResultVO<T>>(url).then(res => res.data.data)
}

export const usePost = <T>(url: string, data?: unknown): Promise<T> => {
  return axios.post<ResultVO<T>>(url, data).then(res => res.data.data)
}

export const usePut = <T>(url: string, data?: unknown): Promise<T> => {
  return axios.put<ResultVO<T>>(url, data).then(res => res.data.data)
}

export const usePatch = <T>(url: string, data?: unknown): Promise<T> => {
  return axios.patch<ResultVO<T>>(url, data).then(res => res.data.data)
}

export const useDelete = <T>(url: string): Promise<T> => {
  return axios.delete<ResultVO<T>>(url).then(res => res.data.data)
}

export default axios
