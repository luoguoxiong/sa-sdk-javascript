# iOS 平台打通
>⚠️ 此插件已自动集成在 SDK 中，<font color=red>禁止手动使用！</font>
## 功能
iOS APP 内嵌 H5 打通插件使得内嵌 H5 页面行为数据通过 APP 进行发送，使得 H5页面 和 APP 数据达到用户统一。<br>
对于嵌入 App 中 H5 页面，如果 App 也集成了神策分析的 SDK ，H5 页面数据可以通过 App 进行上报，会自动添加 App 获取到的预置属性。

在使用打通插件后，同时还需要在 App 端进行打通配置，参考[iOS打通](https://manual.sensorsdata.cn/sa/2.4/sdk-ios-7538614.html#SDK集成(iOS)-打通App与H5)。
更多关于打通功能说明请查看[官网文档](https://manual.sensorsdata.cn/sa/2.4/app-h5-1573914.html)。
### 原理
App SDK 暴露桥对象到浏览器控件 `window` 全局对象， JS SDK 通过该对象将上报数据发送给 App SDK。 App SDK 对数据进行处理及上报。
## 变动
App 上报数据中会添加 App 端相关的数据例如运营商名称 `$carrier`。浏览器网络请求中不再有数据上报请求。

## ⚠️ 注意
- 插件和 SDK 必须在同一个版本中，请勿混合不同版本的 SDK 和插件进行使用。