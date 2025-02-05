import { parse, compileTemplate } from "@vue/compiler-sfc";

const source = `
<template>
    <div>
        <span>hello {{message}}</span>
    </div>
</template>
<script>
export default {
    data(){
        return {
            message: 'world'}
    }
}
</script>
`;

// 解析SFC文件
const { descriptor } = parse(source);

console.log("解析SFC文件===>", descriptor);

// 处理模板
const result = compileTemplate({
    source: descriptor.template.content,
    filename: "hello.vue",
    id: "hello",
})

console.log("处理模板===>", result);