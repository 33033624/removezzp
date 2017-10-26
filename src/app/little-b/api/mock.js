const data = [
  {
    brand: 'iphone',
    xinghao: [{
      model: 'iphone6s',
      banben: [
        {
          buy_channel: '国行',
          price:
          {
            '16GB': '3444',
            '32GB': '3444',
            '64GB': '3444',
            '128GB': '3444',
            '256GB': '3444'
          }
        },
        {
          buy_channel: '美版',
          price:
          {
            '16GB': '3444',
            '32GB': '3444',
            '64GB': '3444',
            '128GB': '3444',
            '256GB': '3444'
          }
        }
      ]
    },
    {
      model: 'iphone6 plus',
      banben: [
        {
          buy_channel: '国行',
          price:
          {
            '16GB': '3444',
            '32GB': '3444',
            '64GB': '3444',
            '128GB': '3444',
            '256GB': '3444'
          }
        },
        {
          buy_channel: '美版',
          price:
          {
            '16GB': '3444',
            '32GB': '3444',
            '64GB': '3444',
            '128GB': '3444',
            '256GB': '3444'
          }
        }
      ]
    }
    ]
  },
  {
    brand: 'OPPO',
    xinghao: [{
      model: '6s',
      banben: [
        {
          buy_channel: '国行',
          price:
          {
            '16GB': '3444',
            '32GB': '3444',
            '64GB': '3444',
            '128GB': '3444',
            '256GB': '3444'
          }
        }
      ]
    },
    {
      model: 'plus',
      banben: [
        {
          buy_channel: '国行',
          price:
          {
            '16GB': '3444',
            '32GB': '3444',
            '64GB': '3444',
            '128GB': '3444',
            '256GB': '3444'
          }
        },
        {
          buy_channel: '美版',
          price:
          {
            '16GB': '3444',
            '32GB': '3444',
            '64GB': '3444',
            '128GB': '3444',
            '256GB': '3444'
          }
        }
      ]
    }
    ]
  }
]
const pinpai = [
  {
    name: 'iphone',
    id: 1
  },
  {
    name: 'oppo',
    id: 2
  },
  {
    name: '华为',
    id: 3
  }
]
const jixing = [
  {
    name: 'iphone6',
    id: 11
  },
  {
    name: 'iphone6s',
    id: 12
  },
  {
    name: 'iphone6s p',
    id: 13
  },
  {
    name: 'iphone7',
    id: 14
  }
]
const shuxing = {
  capacity: [
    {
      name: '32',
      id: 111
    },
    {
      name: '64',
      id: 112
    },
    {
      name: '128',
      id: 113
    }
  ],
  buyChannel: [
    {
      name: '国行',
      id: 1111
    },
    {
      name: '美版',
      id: 1112
    },
    {
      name: '港版',
      id: 1113
    }
  ]
}
const shangpinList = [
  {
    reason: '审核不通过原因/不符合报名要求原因',
    infoId: '123',
    infoTitle: 'iphone6 64 美版',
    auditStatus: '4',
    infoPrice: '1200',
    infoPics: '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502446808954&di=c2a9e69a923add1ad99160d16ff428e8&imgtype=0&src=http%3A%2F%2Fpic49.nipic.com%2Ffile%2F20140927%2F19617624_230415502002_2.jpg'
  },
  {
    reason: '',
    infoId: '123',
    infoTitle: 'iphone6 64 美版',
    auditStatus: '0',
    infoPrice: '1200',
    infoPics: '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502446808954&di=c2a9e69a923add1ad99160d16ff428e8&imgtype=0&src=http%3A%2F%2Fpic49.nipic.com%2Ffile%2F20140927%2F19617624_230415502002_2.jpg'
  },
  {
    reason: '',
    infoId: '123',
    infoTitle: 'iphone6 64 美版',
    auditStatus: '1',
    infoPrice: '1200',
    infoPics: '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502446808954&di=c2a9e69a923add1ad99160d16ff428e8&imgtype=0&src=http%3A%2F%2Fpic49.nipic.com%2Ffile%2F20140927%2F19617624_230415502002_2.jpg'
  },
  {
    reason: '由于自己的操作失误造成的',
    infoId: '123',
    infoTitle: 'iphone6 64 国行',
    auditStatus: '4',
    infoPrice: '1200',
    infoPics: '//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502446808954&di=c2a9e69a923add1ad99160d16ff428e8&imgtype=0&src=http%3A%2F%2Fpic49.nipic.com%2Ffile%2F20140927%2F19617624_230415502002_2.jpg'
  }
]
export {data, pinpai, jixing, shuxing, shangpinList}
