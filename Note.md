# 开发采坑笔记

## 用户在 stock chart 中操作 range selector 后数据无法显示
由于获取的数据时间顺序反了。获取的时间序列数据必须按照时间从早到晚顺序排列，否则会导致range selector 选择时间后数据无法显示