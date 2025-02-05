import pkg from '@vue/compiler-dom';
const { baseCompile, transformVHtml } = pkg;

const { code } = baseCompile(`<div v-html="message"></div>`,{
    nodeTransforms:[],
    directiveTransforms: transformVHtml
});
console.log("compilerDom===>",code);
