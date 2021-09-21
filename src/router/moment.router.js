const Router = require('koa-router')
const { 
   verifyAuth,
   verifyPermission 
} = require('../middleware/auth_middleware')

const {
   verifyLabelExists
} = require('../middleware/label_middleware')
const {
   create,
   momentDetail,
   list,
   momentUpdate,
   momentDelete,
   addLabels,
   fileInfo
} = require('../controller/moment_controller')
const momentRouter = new Router({prefix: '/moment'})

// 发布动态
momentRouter.post('/', verifyAuth, create)

// 根据动态 获取用户信息
momentRouter.get('/:momentId', momentDetail)

//动态列表
momentRouter.get('/', list)

// 修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentUpdate)

// 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentDelete)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

// 动态配图的服务
momentRouter.get('/images/:filename', fileInfo)

module.exports = momentRouter