const labelService = require('../service/label_service')
class LabelController {
    async create(ctx, next) {
        const {name} = ctx.request.body
        const result = await labelService.create(name)
        ctx.body = result
    }
}

module.exports = new LabelController()