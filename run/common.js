var fs = require("fs");
const chalk = require("chalk");
const childProcess = require('child_process');
module.exports = {
    // 获取某个文件的内容
    getFileContent(path,isJson = true){
        let content = fs.readFileSync(path,'utf-8')
        return isJson ? JSON.parse(content) : content
    },
    // 替换某个文件的内容
    replaceContent(path,content = ''){
        fs.writeFileSync(path,content,{
            flag:'w'
        },(err,data) => {
            if (err !== null) {
                console.log(err)
            }
        });
    },
    /* 执行cmd命令 */
    runCommand(command,succese=()=>{},error=()=>{}){
        var workerProcess = childProcess.exec(command, function (err, stdout, stderr) {
             if (err) {
                 error(err)
             }
             succese(stdout,stderr)
         });
         workerProcess.on('exit', function (code) {
             // console.log('子进程已退出，退出码 '+code);
         });
     },
     /* 创建多层文件夹 */
     createDirsSync(dir, mode,callback=()=>{}){
        if (!fs.existsSync(dir)) {
            var dirArr = dir.split('/').filter(item=>{
                return item != '' && item != '.' && item != '..'
            });
            var pathtmp = '';
            dirArr.forEach((item)=>{
                pathtmp = !pathtmp ? item : pathtmp + '/' + item
                if(!fs.existsSync(pathtmp)){
                    if (!fs.mkdirSync(pathtmp, mode)) {
                        if(pathtmp == dir){
                            console.log(chalk.green(pathtmp + "目录创建成功！"));
                            callback(dir)
                        }
                    }else{
                        console.log(chalk.red(pathtmp + "目录创建失败！"));
                    }
                }
            })
        }
        else {
            console.log(chalk.yellow(dir + "目录已存在！"));
            callback(dir)
        }
    },
    copy(form,to,fun=()=>{}){
        let formContent = fs.readFileSync(form,'utf8');
        fs.writeFileSync(to,formContent)
        console.log(chalk.green(`${form} => ${to} 内容复制成功！`))
        fun()
    }
}