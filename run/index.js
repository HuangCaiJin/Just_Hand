let {
    replaceContent,
    runCommand,
    createDirsSync,
    copy,
    getFileContent
} = require('./common')

let tree = getFileContent('./tree.json')

let createElement = (tree,parent = '',chileCode = '(^_^)') => {
    // 构建属性值
    let attrStr = '';
    Object.keys(tree.config).forEach(item=>{
        if(typeof tree.config[item] == 'string'){
            attrStr += `${item}="${tree.config[item]}" `
        }else{
            attrStr += `:${item}="${JSON.stringify(tree.config[item])}" `
        }
    })
    // 代码整理
    let space = new Array(tree.floor*4).fill(' ').join('')
    let element = `
    ${space}<${tree.tag} id="${tree.id}" ${attrStr}>
        ${tree.child.length ? chileCode : ''}
    ${space}</${tree.tag}>
    `
    // 插入元素
    let childElement = ``
    tree.child.forEach(item=>{
       childElement += createElement(item)
    })
    element = element.replace(chileCode,childElement)
    // 返回通过Josn构建的Dom
    return element
}

// console.log(createElement(tree))
replaceContent('./test.html',createElement(tree))

