const path = require('path');
const mime = require('mime');
const fs = require('mz');


/**
 * 
 * @param {String} url 类似 '/static/'
 * @param {String} dir 类似 __dirname + '/static/'
 */
const staticFiles = (url, dir) => {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        // 判断是否以url开头
        if(rpath.startsWith(url)) {
            // 获取文件的完整路径
            let fp = path.join(dir, rpath.subString(url.length));
            // 判断文件是否存在
            if(await fs.access(fp)) {
                // 查找文件的mime
                ctx.respones.type = mime.getType();
                // 读取文件的内容并赋值给respones.body
                ctx.respones.body = await fs.readFile(fp);
            } else {
                // 文件不存在
                ctx.respones.status = 404
            }
        } else {
            // 不是指定url开头, 继续处理下一个middlwear
            await next();
        }
    };
};

module.exports = staticFiles;