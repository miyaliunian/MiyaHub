const Router = require('koa-router')
const labelRouter = new Router({
    prefix:'/label'
})

const {
    verifyAuth
} = require('../middleware/auth_middleware')

const {
    create
} = require('../controller/label_controller')

labelRouter.post('/',verifyAuth , create)

module.exports = labelRouter