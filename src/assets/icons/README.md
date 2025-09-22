# TabBar 图标说明

请将以下图标文件放置在此目录下：

## 打卡页面图标
- `checkin.png` - 未选中状态的打卡图标
- `checkin-active.png` - 选中状态的打卡图标

## 求助页面图标  
- `help.png` - 未选中状态的求助图标
- `help-active.png` - 选中状态的求助图标

## 我的页面图标
- `profile.png` - 未选中状态的我的图标
- `profile-active.png` - 选中状态的我的图标

## 图标规格要求
- 尺寸：40px × 40px
- 格式：PNG
- 背景：透明
- 颜色：未选中状态建议使用灰色，选中状态建议使用主题色 #667eea

## 临时解决方案
如果暂时没有图标文件，可以：
1. 使用在线图标生成器创建简单图标
2. 或者暂时注释掉 tabBar 配置中的 iconPath 和 selectedIconPath 字段
