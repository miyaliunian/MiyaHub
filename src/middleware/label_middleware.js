const service = require('../service/label_service')
const verifyLabelExists = async (ctx, next) => {
 const { labels } = ctx.request.body 
 const newLabels = []
 for (const name of labels) {
     const labelResult = await service.getLabelByName(name)
     const label = {name} 
     if (!labelResult) {
         const result = await service.create(name) 
         label.id = result.insertId
     } else {
        label.id = labelResult.id
     }
    newLabels.push(label) 
 }
 ctx.labels = newLabels
 await next()
}
module.exports = {
    verifyLabelExists
} 