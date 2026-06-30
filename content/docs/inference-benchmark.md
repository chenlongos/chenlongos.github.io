+++
title = "不同芯片推理效率对比"
date = 2026-06-12
template = "page.html"
+++

# 不同芯片推理效率对比

本文档展示了不同开发板在 YOLO 推理任务中的性能对比测试结果。

## 测试数据

| 开发板名称 | 模型类型 | 平均推理时间 | 识别网球数量 |
| --- | --- | --- | --- |
| 台式机（AMD 5600G） | YOLOv8 FP32 ONNX格式 | 44 ms | 152 |
| Jetson Orin RX Super (CUDA) | YOLOv8 FP32 ONNX格式 | 49 ms | 144 |
| OrangePi 5 Plus (RK3588) | YOLOv8 FP16 RKNN格式 | 113 ms | 152 |
| Rock 4D (RK3576) | YOLOv8 INT8 RKNN格式 | 44 ms | 144 |
| LicheeRV Nano (SG2002) | YOLOv8 INT8 CVIMODEL格式 | 116 ms （[pengzechen](https://github.com/penzechen)提供） | - |

## 测试说明

- **推理时间**：从加载图片开始，到返回预测框结束的总时间
- **测试任务**：使用 YOLOv8 模型进行网球识别

## 测试代码

不同芯片的测试代码分别位于以下仓库：

- **SG2002 芯片测试代码**：[akars](https://github.com/chenlongos/akars.git)
- **其他芯片测试代码**：[tennis_test](https://github.com/chenlongos/tennis_test.git)

---

*本文档由 ChenlongOS 社区维护，欢迎贡献和反馈。*