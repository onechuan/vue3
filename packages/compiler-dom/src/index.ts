import {
  type CodegenResult,
  type CompilerOptions,
  type DirectiveTransform,
  type NodeTransform,
  type ParserOptions,
  type RootNode,
  baseCompile,
  baseParse,
  noopDirectiveTransform,
} from '@vue/compiler-core'
import { parserOptions } from './parserOptions'
import { transformStyle } from './transforms/transformStyle'
import { transformVHtml } from './transforms/vHtml'
import { transformVText } from './transforms/vText'
import { transformModel } from './transforms/vModel'
import { transformOn } from './transforms/vOn'
import { transformShow } from './transforms/vShow'
import { transformTransition } from './transforms/Transition'
import { stringifyStatic } from './transforms/stringifyStatic'
import { ignoreSideEffectTags } from './transforms/ignoreSideEffectTags'
import { extend } from '@vue/shared'

export { parserOptions }

/**
 * 添加了一个transformStyle转换函数，用于处理dom上的style属性
 */
export const DOMNodeTransforms: NodeTransform[] = [
  transformStyle,
  ...(__DEV__ ? [transformTransition] : []),
]

/**
 * 添加了一个directiveTransforms转换函数，用于处理dom标签上的指令函数
 */
export const DOMDirectiveTransforms: Record<string, DirectiveTransform> = {
  cloak: noopDirectiveTransform,
  html: transformVHtml,
  text: transformVText,
  model: transformModel, // override compiler-core
  on: transformOn, // override compiler-core
  show: transformShow,
}

/**
 * compile函数返回的是@vue/compiler-core中的baseCompile函数
 * @param src 
 * @param options 
 * @returns 
 */
export function compile(
  src: string | RootNode,
  options: CompilerOptions = {},
): CodegenResult {
  return baseCompile(
    src,
    extend(
      {}, 
      parserOptions, options, 
      {
      // 包含了很多的transform转换函数，用于处理AST抽象语法树
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        ignoreSideEffectTags,
        // 添加了一个transformStyle转换函数，用于处理dom上的style属性
        ...DOMNodeTransforms,
        ...(options.nodeTransforms || []),
      ],
      // 
      directiveTransforms: extend(
        {},
        // 添加了一个directiveTransforms转换函数，用于处理dom标签上的指令函数
        DOMDirectiveTransforms,
        options.directiveTransforms || {},
      ),
      transformHoist: __BROWSER__ ? null : stringifyStatic,
    }),
  )
}

export function parse(template: string, options: ParserOptions = {}): RootNode {
  return baseParse(template, extend({}, parserOptions, options))
}

export * from './runtimeHelpers'
export { transformStyle } from './transforms/transformStyle'
export {
  createDOMCompilerError,
  DOMErrorCodes,
  DOMErrorMessages,
} from './errors'
export * from '@vue/compiler-core'
