+++
title = "Rock4D 开发板 YOLO 推理部署指南"
date = 2026-06-12
template = "page.html"
+++

# Rock4D 开发板 YOLO 推理部署指南

## 1. 开发板简介

Rock4D 是一款基于 Rockchip RK3588 处理器的高性能开发板，具有以下特点：

- **CPU**: 八核 ARM Cortex-A76 + Cortex-A55
- **NPU**: 6TOPS 算力的神经网络处理器
- **内存**: 8GB/16GB LPDDR4X
- **存储**: eMMC 5.1 + MicroSD + NVMe SSD
- **接口**: PCIe 3.0、USB 3.2、HDMI 2.1、MIPI CSI

## 2. 环境准备

### 2.1 镜像烧录与登陆

```bash
dd if=<img> of=<blk> bs=1M status=progress conv=fsync
minicom -D /dev/ttyUSB0 -b 1500000
# 用户名密码：radxa, radxa
```

### 2.2 安装系统更新

```bash
rsetup
# System -> System Update
```
### 2.3 安装驱动和库

```bash
# 安装miniforge
bash Miniforge3-25.11.0-0-Linux-x86_64.sh
conda create -n rknn python=3.12
conda activate rknn
# 安装lerobot
conda install ffmpeg -c conda-forge
sudo apt-get install cmake build-essential python3-dev pkg-config libavformat-dev libavcodec-dev libavdevice-dev libavutil-dev libswscale-dev libswresample-dev libavfilter-dev
pip install 'lerobot[feetech]' -i https://mirrors.aliyun.com/pypi/simple/
pip install torchvision==0.17.0    # 降级以解决依赖问题。如果模型能正常运行则不需要此操作。
# 安装rknn
sudo apt install cmake build-essential
pip install -r arm64_requirements_cp312.txt -i https://mirrors.aliyun.com/pypi/simple/
pip install rknn_toolkit2-2.3.2-cp312-cp312-manylinux_2_17_aarch64.manylinux2014_aarch64.whl -i https://mirrors.aliyun.com/pypi/simple/
```

## 3. YOLO 模型准备

基本思路：rk3576对fp16精度支持不好，需使用init8量化。

### 3.1 pt转onnx

```bash
git clone https://github.com/airockchip/ultralytics_yolo11.git && cd ultralytics_yolo11
vim ./ultralytics/cfg/default.yaml
    # model要改为pt模型的路径
export PYTHONPATH=./
python3 ./ultralytics/engine/exporter.py
```

### 3.2 onnx转rknn

```bash
git clone -b v2.3.2 https://github.com/airockchip/rknn_model_zoo.git
cd rknn_model_zoo/datasets    # 准备数据集
mkdir tennis
cp /path/to/tennis/imgdir tennis/img
cd tennis
ls img/* | tee dataset.txt
cd rknn_model_zoo/examples/yolov8/    
cp /path/to/model model/
python ./python/convert.py ./model/<onnx_model> rk3576 int8 ./model/<rknn_model>

```

## 4. NPU 推理部署

```bash
python ./python/yolov8.py --model_path ./model/<rknn_model> --target rk3576 --img_folder ./test_img/ --img_save
```

## 5. 性能优化

1. **量化优化**: 使用 INT8 量化，可获得 2-4 倍性能提升
2. **模型裁剪**: 根据实际需求裁剪不必要的检测类别
3. **输入尺寸调整**: 减小输入分辨率可显著提升速度

## 6. 参考资料

- [Rock4D 官方文档](https://docs.radxa.com/rock4/rock4d)
- [RKNN Toolkit 文档](https://github.com/rockchip-linux/rknn-toolkit2)

---

*本文档由 ChenlongOS 社区维护，欢迎贡献和反馈。*