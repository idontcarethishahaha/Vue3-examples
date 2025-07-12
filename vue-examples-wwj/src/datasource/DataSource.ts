import type { Course } from '@/datasource/Types'

export function listCourses(): Course[] {
  const courses: Course[] = [
    {
      id: 1,
      name: 'Web开发技术',
      credit: 2.5,
      term: 4
    },
    {
      id: 2,
      name: 'C++程序设计',
      credit: 2.5,
      term: 4
    },
    {
      id: 3,
      name: 'Java程序设计',
      credit: 2.5,
      term: 4
    },
    {
      id: 4,
      name: '计算机学生的自我修养：从入门到入土',
      credit: 2,
      term: 4
    },
    {
      id: 5,
      name: 'Web前端开发技术',
      credit: 2,
      term: 5
    },
    {
      id: 6,
      name: 'Web系统框架',
      credit: 2.5,
      term: 5
    },
    {
      id: 7,
      name: 'XML与WebService技术',
      credit: 2,
      term: 5
    },
    {
      id: 8,
      name: '数字图像处理',
      credit: 2,
      term: 5
    },
    {
      id: 9,
      name: '企业资源计划',
      credit: 2,
      term: 6
    },
    {
      id: 10,
      name: '服务科学与SOA',
      credit: 2,
      term: 6
    },
    {
      id: 11,
      name: '人工智能导论',
      credit: 2,
      term: 6
    },
    {
      id: 12,
      name: '机器学习',
      credit: 2,
      term: 6
    }
  ]
  return courses
}
