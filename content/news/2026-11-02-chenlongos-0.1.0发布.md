+++
title = "chenlongos 0.1.0 发布：首个开箱即用的 AKA-00 机器人系统镜像"
date = 2026-11-02
+++

**发布日期**：2026年11月2日
**版本号**：chenlongos 0.1.0
**适用硬件**：AKA-00 机器人（cv1812-edu / SG2002）
**镜像文件**：`chenlongos.img`（约 164 MB，整卡镜像含分区表）

chenlongos 0.1.0 是辰龙操作系统面向机器人场景的第一个完整发行版本：一条命令即可从源码构建出可直接烧录的 SD 卡镜像，镜像内已包含 StarryOS 内核、引导链、AKA-00 机器人应用与视觉推理程序，上电即可跑通「摄像头采集 → TPU 推理 → 底盘与机械臂控制」的完整链路。已在真机（AKA-00 机器人 + cv1812-edu 芯片）验证，系统启动与开机自启服务均正常工作。本版本的两项核心能力——**摄像头取帧率**与**机器人抓球效率**——使用了第三届中国研究生操作系统开源创新大赛 YPWsys 团队的成果，特此致谢（见文末）。

## 一、StarryOS 内核：摄像头帧率是 Linux 的 3 倍多

本版本使用 **StarryOS** 内核（ArceOS 组件化宏内核），而非传统的 Linux。在同一个摄像头、同一条硬件解码链路上的实测对比：

| 内核 | 读取摄像头帧率 | 相对表现 |
|---|---|---|
| **StarryOS（辰龙）** | **19 fps** | **≈ 3.2×** |
| Linux | 6 fps | 基准 |

差距主要来自视频路径的架构差异：StarryOS 把摄像头采集与 JPU 硬件解码直接放在内核态完成，省去了 Linux 方案中 V4L2 队列、内核到用户态的数据搬运以及多次缓冲复制。对机器人来说，这意味着**从"眼睛"到"决策"的延迟更低、有效帧更多**——同样的抓取、避障任务，感知输入更连贯。

需要特别说明的是：**这一取帧链路的帧率提升，正是 YPWsys 团队在第三届中国研究生操作系统开源创新大赛中贡献的成果**，本版本将其保留并落地到了 AKA-00 的真实硬件上。

## 二、这是一个机器人的操作系统

辰龙操作系统的定位不是通用桌面或服务器系统，而是**专为机器人打造的开源操作系统发行版**：

- 🤖 **面向 AKA-00 机器人**：镜像内置 AKA-00 部署包（`/root/AKA-00/`，含主程序 `aka-capp`、`config.toml`、Web 静态资源、示教模型与工具脚本）
- 🎾 **内置视觉推理应用 akars**：`/root/akars` + `yolov8n_tennis_v4.cvimodel`，直接在 TPU 上跑 YOLOv8 网球识别，并驱动底盘电机与机械臂
- 🔌 **当前支持的芯片**：**cv1812-edu** 与 **SG2002**（同属 RISC-V c906 架构，含 TPU 与 JPU 硬件单元）
- 🧩 **配套工具**：`/usr/bin/wifi_switch`（Station / SoftAP 运行时切换）、`/usr/bin/pinmux_tool`（串口引脚路由）

## 三、三个开机自启程序

机器人系统的关键差异在于"上电即用"。本版本提供三个开机自启的初始化服务，由内核的 `init.sh` 在登录 shell 之前同步调用入口脚本 `/usr/bin/starry-run-case-tests` 依次拉起：

### 1. `starry-pinmux` — 把串口引脚接对

调用 `pinmux_tool` 将 UART1 / UART2 引脚路由到 `/dev/ttyS1`、`/dev/ttyS2`。**必须最先执行**，否则后面的 akars 拿不到电机与机械臂的串口设备。该程序写完 `/dev/pinmux` 即退出，是一次性动作，不会阻塞启动。

### 2. `starry-sync` — 掉电不丢数据

后台启动 `sync-daemon.sh`，周期性（默认 10 秒）执行 `sync`，把 ext4 文件系统的脏页强制落盘。机器人经常被直接断电，这个守护进程保证配置、日志等关键数据不会因为突然掉电而丢失。

### 3. `starry-akars` — 拉起机器人主应用

进入 `/root` 后启动 akars：

```bash
./akars yolov8n_tennis_v4.cvimodel --motor /dev/ttyS1 --arm /dev/ttyS2
```

日志写入 `/run/akars.log`，进程号记录在 `/run/akars.pid`。带 pidfile 幂等保护——重复执行不会启动第二个实例，因此入口脚本可以安全地反复调用。

三个服务都遵循同一条约束：**立即返回、自行后台化**。因为入口脚本由内核同步执行，任何一个服务阻塞都会导致系统卡在启动阶段进不了 shell。所有参数（同步间隔、串口设备、模型名）都可用环境变量覆盖，不改镜像即可调试。

## 四、下载与烧录

| 项目 | 值 |
|---|---|
| 镜像 | `chenlongos.img`（171,966,464 字节） |
| SHA256 | `fa6af9e723714eda1065e06be6feff5455d02f45f9b90f082987564723098640` |
| 发布页 | <https://github.com/chenlongos/chenlong/releases/tag/0.1.0> |
| 源码 | <https://github.com/chenlongos/chenlong>（分支 `cv1812-edu`，标签 `0.1.0`） |

分区布局：

| 分区 | 类型 / 标签 | 大小 | 内容 |
|---|---|---|---|
| p1 | FAT32 / `BOOT` | 60 MB | `fip.bin`、`starryos.uimg`、`aka-00-sg2002.dtb`、`boot_cmd.txt` |
| p2 | ext4 / `rootfs` | 100 MB | 精简 rootfs + `/root/AKA-00`、`akars`、`/usr/bin` 工具 |

烧录（**务必确认目标设备，写错磁盘会毁数据**）：

```bash
sudo dd if=chenlongos.img of=/dev/sdX bs=1M status=progress conv=fsync
```

写入 SD 卡后插入 AKA-00 上电，串口可依次看到引脚配置输出与 `STARRY_GROUPED_AUTORUN_INIT`，随后进入 shell；`ps` 中可见 `sync-daemon` 与 `akars` 两个进程。

## 五、从源码构建

本版本起，构建流程**不再要求 root 权限**：检测到无法免密提权时会自动切换到纯用户态打包路径，因此 CI 与无人值守环境可以直接出图。

```bash
git clone https://github.com/chenlongos/chenlong.git
cd chenlong
./scripts/repo_clone.sh --gitclone scripts/subtree_chenlongos.xml
./scripts/apply_patch.sh
./scripts/build_chenlongos.sh          # 产物在 chenlongos_output/
```

## 六、致谢 YPWsys 团队

**chenlongos 0.1.0 使用了第三届中国研究生操作系统开源创新大赛 YPWsys 团队的参赛成果**，这些成果直接体现在本版本最核心的两项机器人能力上：

| 成果 | 在本版本中的体现 |
|---|---|
| 📷 **摄像头帧率提升** | 取帧与硬件解码链路优化，是 StarryOS 上 19 fps 对比 Linux 6 fps 这一差距的重要来源（见第一节） |
| 🎾 **机器人抓球效率提升** | 视觉识别与底盘／机械臂控制的协同优化，让 AKA-00 从"看得见"走到"抓得准"，抓取网球的效率与稳定性明显提高 |

也就是说，本文开头那组帧率数据和这台机器人能稳定抓球的表现，都有 YPWsys 团队的贡献在内。

在此向 **YPWsys 团队**致以诚挚的感谢 🙏 —— 是他们在大赛中的认真投入与开源分享，让这份成果没有止步于赛场，而是继续运行在机器人上、继续被社区迭代。

我们也真诚欢迎更多高校团队把大赛作品带到真实硬件与真实场景中检验：辰龙操作系统提供从内核、驱动到应用层的完整链路，也欢迎以大赛成果为基础继续共建。

## 后续计划

- 把摄像头帧率、推理耗时等指标整理成可持续对比的性能基线文档
- 支持更多 SG2002 系列开发板
- 提供 OTA 增量更新，让机器人不必每次重新烧卡

---

*ChenlongOS 社区维护，欢迎体验、反馈与贡献代码。*
