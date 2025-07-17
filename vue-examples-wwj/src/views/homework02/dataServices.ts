import type { Department, Teacher } from './Types'

// 模拟异步获取全部部门
export const listDepartmentsService = () => {
  return new Promise<Department[]>(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: '102',
          name: '大数据'
        },
        {
          id: '154',
          name: '人工智能'
        },
        {
          id: '243',
          name: '软件工程'
        }
      ])
    }, 1000)
  })
}

export const listTeachersService = (depId: string) => {
  return new Promise<Teacher[]>(resolve => {
    setTimeout(() => {
      const teachers = [
        {
          id: '32',
          name: '张阳',
          depId: '102'
        },
        {
          id: '41',
          name: '詹泽晔',
          depId: '102'
        },
        {
          id: '43',
          name: '林玥辰',
          depId: '102'
        },
        {
          id: '52',
          name: '薛瀚',
          depId: '154'
        },
        {
          id: '54',
          name: '赖申婷',
          depId: '154'
        },
        {
          id: '56',
          name: '王青',
          depId: '154'
        },
        {
          id: '63',
          name: '王波',
          depId: '243'
        },
        {
          id: '64',
          name: '李莉',
          depId: '243'
        },
        {
          id: '67',
          name: '边继龙',
          depId: '243'
        }
      ]
      const ts = teachers.filter(t => t.depId === depId)
      resolve(ts)
    }, 1000)
  })
}
