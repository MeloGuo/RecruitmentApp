# React全家桶+Express+MongoDB-实时聊天招聘webApp
本项目是对React和Express的实践，是第一次深入使用React，同时是第一次实践Express和MongoDB，之前在后端上只使用过Flask。并且使用Socket.IO亲自实践了webSocket的使用，体会到了ws协议和http的不同。

#### 使用说明
将项目clone到本地，先安装依赖。
然后在命令行中输入```npm run build```
构建项目成功后输入```npm run server```，即可在localhost:9093访问项目

#### 预览图
登录页  
![登录页](https://wx1.sinaimg.cn/mw690/0070gOERly1fovzopj01nj30ag0ikmy4.jpg)

注册页  
![注册页](https://wx4.sinaimg.cn/mw690/0070gOERly1fovzopiz16j30af0ijab2.jpg)

人员列表  
![人员列表](https://wx1.sinaimg.cn/mw690/0070gOERly1fovzopizhsj30af0ilgml.jpg)

消息列表  
![消息列表](https://wx3.sinaimg.cn/mw690/0070gOERly1fovzopi1mdj30ad0ii0t5.jpg)

个人信息页  
![个人信息页](https://wx3.sinaimg.cn/mw690/0070gOERly1fovzopiz7hj30ag0ilwfr.jpg)

##### ToDo
- FixBug:偶尔出现的未读消息混乱，触发情境暂时不明确
- FixBug:偶尔信息重复发送多条
- FixBug:偶尔底部输入框位置异常   
- 增加个人信息的类型，如：教育信息、工作经验等具体组件
- 增加上传简历功能
