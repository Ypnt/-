# 项目说明
===========================

## 环境依赖
vscode 1.77.0
 
===========================
 
## 功能说明
1. 掘金界面设计
2. 根据类型获取界面信息

===========================

## 实现思路
1. 将掘金界面分成左右两部分
    左右部分：导航栏和数据栏（布局结构一致）
    - 对导航栏中的类型进行选择，使用fetch根据不同类型抓取不同的信息
    - 不同的类型拥有不同的url和body
    - 根据新抓取的信息更新数据栏
2. 根据不同的回报内容，构造不同的数据类型，分别存储值leftItem与rightItem中

===========================

## 遇到的问题及解决方案
   - 如何得到url和body，利用whistle抓包，分析包结构。<br>
    在左栏中的url是一致的，但是body有不同，最新的sort_type为300而推荐的sort_type为200，不同的类型有着不同的cate_id。<br>
    在右栏中，url统一为https://e.juejin.cn/resources/github，而body中的category，period，lang都是由信息栏所决定的，需要根据用户选择进行变化。<br>
    对于每个按钮的信息，可以通过浏览器进行获取得到一个js文件<br>
    于是我用了两个函数lChoose和rChoose根据用户选择，返回url和body。getLeftData和getRightData用于获取左右信息栏的信息。将元素监听器的设置分为两部分，一是用户点击产生的动态效果，二是用户选择类型对新数据的读取：
    - 推荐按钮的旋转设计，选择三角形按钮的翻转设计
    - 点赞、分享文字样式的引用
===========================

## 项目链接
<https://git.wpsit.cn/cug-2023-web-tasks/yangyikai/src/master/week03/work>