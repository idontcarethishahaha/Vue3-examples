// 学院类型
export interface College {
  id: string //后端将Long转为String返回
  name: string
  createTime?: string
  updateTime?: string
}

// 添加学院
export interface AddCollegeRequest {
  name: string
}

// 更新学院
export interface UpdateCollegeRequest {
  name: string
}

// 学院管理员类型
export interface CollegeAdmin {
  id: string //后端将Long转为String返回
  name: string
  account: string
  tel?: string
  createTime?: string
}

// 添加学院管理员
export interface AddCollegeAdminRequest {
  name: string
  account: string
  tel?: string
  password?: string
}
