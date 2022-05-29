const pages = [
  {
    name: '主页',
    path: '/news'
  },
  {
    name: '新浪新闻',
    path: '/weibonews'
  },
  {
    name: '华尔街新闻',
    path: '/wallstreet'
  },
  {
    name: '文本分析结果',
    path: 'analysis'
  }
];
  
const settings = [{
    name: '我的点赞',
    path: '/likes',
    ariaLabel: 'MyLikes',
  },{
    name: '我的浏览记录',
    path: '/views',
    ariaLabel: 'MyViews',
  },{
    name: '个人资料',
    path: '/profile',
    ariaLabel: 'MyProfile',
  },{
    name: '注销',
    path: '/logout',
    ariaLabel: 'Logout',
  }];
  
const logouts = [{
    name: '登录',
    path: '/login',
    ariaLabel: 'Login',
  },{
    name: '注册',
    path: '/register',
    ariaLabel: 'Register',
  }];

  export {
    pages,
    settings,
    logouts
  }