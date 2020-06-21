# React + Storybook + TypeScript
 
通用业务组件

注： 命令都在最外层路径执行 npm 大于5.0的 可以使用 npx

## 文件说明

.storybook 为 storybook 启动对应的配置文件 

通过workspace 方式 
# 等价于 lerna bootstrap --npm-client yarn --use-workspaces
## Setup

```
yarn  
```

## Develop

```
yarn start
```

## Release

```
yarn release
```

## 常见问题
- 调试方式
采用 yarn build 将打包好的文件 拷贝或者软链接的方式调试

- 给某个package安装依赖 禁止在项目内部安装

packageA 将 packageA 作为 packageB 的依赖进行安装 

```
yarn workspace packageB 
```

- 给所有的package安装依赖
```
yarn workspaces add lodash
```

- 给root 安装依赖：一般的公用的开发工具都是安装在root里
```
yarn add -W -D 
```

- 添加组件

```
npx lerna create @sample/xxx
```


