import { baseParse, generate, transform, transformElement, transformExpression } from "@vue/compiler-core";

// 解析模板
const ast = baseParse(`
<template>
    <div>
        <span>hello {{message}}</span>
    </div>
</template>`)
console.log(ast);

// 转换AST
transform(ast, {
    nodeTransforms: [transformExpression, transformElement]
});

console.log("转换后的AST===>", ast);

// 生成代码
const { code } = generate(ast);
console.log("生成的代码===>", code);

