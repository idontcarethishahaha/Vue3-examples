export interface Shops {
  id: string
  name: string
  //address: string
  phone: string
  img?: string
  score: number
  //startFee: number
  deliveryFee?: number //配送费
  items: Item[]
}

export interface Item {
  id: string
  name: string
  price: number
  img: string
  //description?: string
  //type:'food'|'drink'
  sales: number
}

export interface Order {
  shopId: string
  shopName: string
  deliveryFee: number
  items: {
    item: Item
    quantity: number
  }[]
}

// 店铺列表
export const listShopsMock = async (): Promise<Shops[]> => {
  return new Promise<Shops[]>(resolve => {
    setTimeout(() => {
      resolve(shops)
    }, 1000)
  })
}

// 单个店铺
export const getShopMock = async (id: string): Promise<Shops | undefined> => {
  return new Promise<Shops | undefined>(resolve => {
    setTimeout(() => {
      resolve(shops.find(shop => shop.id === id))
    }, 1000)
  })
}

// 商品列表
export const getShopItemsMock = async (shopId: string): Promise<Item[]> => {
  return new Promise<Item[]>(resolve => {
    setTimeout(() => {
      const shop = shops.find(s => s.id === shopId)
      resolve(shop?.items || [])
    }, 800)
  })
}

// 订单
export const createOrderMock = async (order: Order): Promise<Order> => {
  return new Promise<Order>(resolve => {
    setTimeout(() => {
      resolve(order)
    }, 500)
  })
}

const shops: Shops[] = [
  {
    id: '1',
    name: '华莱士(南平汽车站店)',
    phone: '0599-893-1558',
    img: 'https://p0.meituan.net/waimaipoi/0ea21b2140465d6795e05bca217af864865369.png',
    score: 4.5,
    deliveryFee: 2,
    items: [
      {
        id: '101',
        name: '秘制烤鸡腿堡',
        price: 13.5,
        img: 'https://k.sinaimg.cn/n/sinakd10118/450/w750h500/20230807/1861-4b04ce6a15e628f5ccc5680089fc5916.jpg/w700d1q75cms.jpg',
        sales: 38
      },
      {
        id: '102',
        name: '劲脆鲜虾堡',
        price: 12.5,
        img: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.Myknm2QQUpL2D7Xsrp5NnQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 26
      },
      {
        id: '103',
        name: '香辣鸡腿堡',
        price: 11.5,
        img: 'https://ykz-cdn1-https.jinxidao.com/UEditorImages_2b0e0eed856373e1692d989fa7292e78.jpg',
        sales: 42
      },
      {
        id: '104',
        name: '鳕鱼堡+小薯+中可(套餐)',
        price: 29.9,
        img: 'https://ykz-cdn1-https.jinxidao.com/UEditorImages_2254e700c130e0019c59e97c2324f129.jpg',
        sales: 23
      },
      {
        id: '105',
        name: '香辣鸡腿堡+小薯+中可(套餐)',
        price: 29.9,
        img: 'https://ts1.tc.mm.bing.net/th/id/R-C.00e4f28d8d808c0671db52b4f529145e?rik=O9SYgwc8GOKzjg&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20230807ac%2f40%2fw480h360%2f20230807%2f4b4a-23e4fd414aebe82a74ba610842e5197f.jpg&ehk=y6FkqefxmA6AMXAKtXHc1%2fcKr0VuZG%2fhQQavrk2CXJ4%3d&risl=&pid=ImgRaw&r=0',
        sales: 12
      },
      {
        id: '106',
        name: '牛气冲天堡',
        price: 19.8,
        img: 'https://ts1.tc.mm.bing.net/th/id/R-C.ba0c6a1bc7a349b16a54f6cd2d65d094?rik=WpLxUYKYzUehcw&riu=http%3a%2f%2fimg.canyin.com%2f2019%2f03%2f169917291e9.png&ehk=VS91Yvch71ormIl0sCo7ZFKTIgoE%2bURqWXZQnIZc3KM%3d&risl=&pid=ImgRaw&r=0',
        sales: 38
      },
      {
        id: '107',
        name: '黑椒鸡块(小食)',
        price: 8.5,
        img: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.-ABCGxGGBihblTENVK4ogAHaFH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 30
      },
      {
        id: '108',
        name: '没有了',
        price: 0,
        img: 'https://ts3.tc.mm.bing.net/th/id/OIP-C.GVJNO3lexWUc1wAm7SsEBgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 0
      }
    ]
  },
  {
    id: '2',
    name: '蜜雪冰城(马站店)',
    phone: '173-6098-5085',
    img: 'https://p0.meituan.net/waimaipoi/1c479083ce39fb5515f7ad1503b427ee178972.jpg',
    score: 5.0,
    deliveryFee: 2,
    items: [
      {
        id: '201',
        name: '雪王大圣代草莓味',
        price: 7,
        img: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.XtRQ-k8V_L9l8Vj5rj3ZRwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 98
      },
      {
        id: '202',
        name: '雪王大圣代奥利奥饼干风味',
        img: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.a0hEzt0zw5vQhqjHQuCSuAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 7,
        sales: 56
      },
      {
        id: '203',
        name: '雪王大圣代芒果味',
        img: 'https://img14.360buyimg.com/pop/jfs/t1/69093/9/24010/109329/648c5c85Faa5ec034/1a8f9f3f09242e5c.jpg',
        price: 7,
        sales: 50
      },
      {
        id: '204',
        name: '三拼霸霸奶茶',
        img: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.QF9aJO-CHh1tjrdr_iVRVAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 8,
        sales: 30
      },
      {
        id: '205',
        name: '双拼奶茶',
        img: 'https://k.sinaimg.cn/n/sinakd10112/40/w960h680/20200624/7b59-ivmqpci3579005.jpg/w700d1q75cms.jpg?by=cms_fixed_width',
        price: 8,
        sales: 34
      },
      {
        id: '206',
        name: '珍珠奶茶',
        img: 'https://ts3.tc.mm.bing.net/th/id/OIP-C.hagYHuOXjp4EX0HoEdpStgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 8,
        sales: 45
      },
      {
        id: '207',
        name: '茉莉绿茶',
        img: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.Id1gZRhWqSftYoTnX8v5sQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 6,
        sales: 33
      },
      {
        id: '208',
        name: '红茶',
        img: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.-QMUQyoZL-GeatBeDCOh5AAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 6,
        sales: 43
      },
      {
        id: '209',
        name: '冰鲜柠檬水',
        img: 'https://ts4.tc.mm.bing.net/th/id/OIP-C.kMmMGwvjA3SbK_zvzj0arQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 4,
        sales: 158
      },
      {
        id: '210',
        name: '棒打鲜橙',
        img: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.pUhhRvYW7KWd4fY1-FCbigAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 4,
        sales: 120
      },
      {
        id: '211',
        name: '蜜桃四季春',
        img: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.F1s2TmMTpvmBGV-ZW5LJSwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 6,
        sales: 101
      },
      {
        id: '212',
        name: '草莓啵啵',
        img: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.aMyt3cZA3VkmM7XSPCgt9AAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        price: 4,
        sales: 158
      },
      {
        id: '213',
        name: '没有了',
        price: 0,
        img: 'https://ts3.tc.mm.bing.net/th/id/OIP-C.GVJNO3lexWUc1wAm7SsEBgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 0
      }
    ]
  },
  {
    id: '3',
    name: '隆江猪脚饭(马站店)',
    phone: '137-0690-0099',
    img: 'https://p0.meituan.net/business/7757f606939b0fb5752b5e472c4123ee78679.jpg',
    score: 4.3,
    deliveryFee: 0.5,
    items: [
      {
        id: '301',
        name: '招牌猪脚饭',
        price: 24.8,
        img: 'https://ts4.tc.mm.bing.net/th/id/OIP-C.rwKWR7BgbJozEGVj0eIMCQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 305
      },
      {
        id: '302',
        name: '猪脚 + 烧鸭饭',
        price: 31.8,
        img: 'https://ts4.tc.mm.bing.net/th/id/OIP-C.-k_asvs8q7pV6L0SErCCDwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 90
      },
      {
        id: '303',
        name: '猪脚 + 五花肉饭',
        price: 31.8,
        img: 'https://ts4.tc.mm.bing.net/th/id/OIP-C.UvEcR_7f2OXhcdlY3z0TqgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 55
      },
      {
        id: '304',
        name: '猪脚 + 肉卷饭',
        price: 33.1,
        img: 'https://ts2.tc.mm.bing.net/th/id/OIP-C.1aU5vdLyOnguuYQ6PW0cvgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 60
      },
      {
        id: '305',
        name: '随机三拼饭',
        price: 33.1,
        img: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.-LXe9g-e_W_Jug1EwxaMUAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 77
      },
      {
        id: '306',
        name: '没有了',
        price: 0,
        img: 'https://ts3.tc.mm.bing.net/th/id/OIP-C.GVJNO3lexWUc1wAm7SsEBgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 0
      }
    ]
  },
  {
    id: '4',
    name: '幸运咖(四鹤店)',
    phone: '185-0599-9773',
    img: 'https://p0.meituan.net/waimaipoi/dd32cb2b736aeef4154f320fb712f4e3883762.png',
    score: 4.8,
    deliveryFee: 2.9,
    items: [
      {
        id: '401',
        name: '鲜橙波士茶',
        price: 9.9,
        img: 'http://www.liulijingnc.cn/uploads/allimg/200728/1-200HQ62J3262.jpg',
        sales: 12
      },
      {
        id: '402',
        name: '美式黑咖啡',
        price: 10,
        img: 'http://www.liulijingnc.cn/uploads/allimg/200728/1-200HQ62TWT.jpg',
        sales: 13
      },
      {
        id: '403',
        name: '鲜橙咖啡',
        price: 9,
        img: 'http://www.liulijingnc.cn/uploads/allimg/200728/1-200HQ62940324.jpg',
        sales: 17
      },
      {
        id: '404',
        name: '摩卡咖啡',
        price: 8,
        img: 'http://www.liulijingnc.cn/uploads/allimg/200728/1-200HQ6303Rc.jpg',
        sales: 6
      },
      {
        id: '405',
        name: '咖啡撞奶',
        price: 10.9,
        img: 'http://www.liulijingnc.cn/uploads/allimg/200728/1-200HQ61RB43.jpg',
        sales: 9
      },
      {
        id: '406',
        name: '没有了',
        price: 0,
        img: 'https://ts3.tc.mm.bing.net/th/id/OIP-C.GVJNO3lexWUc1wAm7SsEBgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        sales: 0
      }
    ]
  }
]
