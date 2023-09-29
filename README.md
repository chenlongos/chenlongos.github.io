## 辰龙操作系统（ChenLongOS）
辰龙操作系统是基于清华大学 [ArceOS](https://github.com/rcore-os/arceos) 操作系统的发行版，旨在为智能汽车、机器人、物联网等领域的复杂系统提供高安全、高性能和自主可控的国产操作系统解决方案。

### 关于辰龙
辰龙操作系统发行版建立在 ArceOS 操作系统内核之上。通过利用 ArceOS 内核的优势和功能，辰龙发行版能够提供更好的稳定性、可靠性和安全性。

辰龙发行版的近期目标是支持 ARM、RISC-V、LoongArch、x86 四种架构，对于每种架构，辰龙都将努力至少支持一款主流芯片和开发板，以满足不同用户的需求。

总之，辰龙操作系统发行版定位于基于 ArceOS 内核的发行版，致力于在多种硬件平台上进行适配和驱动开发，并提供技术培训和适配迁移服务。通过这些努力，辰龙旨在满足不同用户的需求，提供稳定可靠的操作系统解决方案。

## 辰龙操作系统的功能和特点
### 提供边缘计算能力：
辰龙操作系统将越来越注重在设备本地实现边缘计算能力。通过在设备上运行具有智能决策能力的算法和模型，可以避免将所有数据传输到云端进行处理，从而减少延迟并提高效率。边缘计算还可以提供更好的隐私保护，因为敏感数据可以在本地进行处理而无需离开设备。

### 支持多种连接协议和标准：
辰龙操作系统将支持多种连接协议和标准，以适应不同类型的物联网设备和应用场景。这包括但不限于Wi-Fi、蓝牙、Zigbee、LoRa等无线协议和MQTT、CoAP等通信协议。同时，辰龙操作系统也将积极参与和支持行业标准的制定和发展，以促进设备之间的互操作性。

### 强化安全性：
随着物联网设备的普及，安全威胁也不断增加。未来，面向安全的辰龙操作系统将继续加强安全性，提供更强大的安全防护机制。这可能包括对设备进行身份验证、数据加密和安全通信等功能，以保护用户的隐私和数据安全。

### 提供脚本语言支持
辰龙操作系统提供对Bash和Python3等脚本语言的支持，方便开发人员进行自定义的脚本编写和执行。

### 多种中间件支持
* DDS：DDS是一种用于实时数据传输和通信的标准，被广泛应用于物联网、机器人、工业自动化等领域。辰龙操作系统集成了DDS协议栈，使得设备可以使用DDS进行高效、可靠的数据交换和通信，为物联网、机器人和工业自动化等应用场景提供了可靠的数据交换解决方案。
* ROS/ROS2：作为机器人操作系统（Robot Operating System）的支持平台，辰龙操作系统可以与ROS框架无缝集成，在机器人开发和控制方面提供强大的工具和功能。使用ROS，开发人员可以实现传感器数据的获取、导航和路径规划、机器人控制等任务。
* OpenCV：作为计算机视觉库的集成，辰龙操作系统可以利用OpenCV来处理图像和视频数据，并提供各种计算机视觉算法和功能，如物体检测、人脸识别、图像处理等。

### 多种硬件架构支持，包括但不限于：

#### ARM架构
* 树莓派（Raspberry Pi）系列：
   - 主芯片型号： Broadcom BCM2711 （Cortex A72 x 4核）
   - 树莓派是基于ARM架构的低成本、高性能单板计算机。辰龙操作系统将提供对树莓派系列的支持，以满足教育和嵌入式应用的需求。
* 飞腾派（Phytium Pi）系列：
   - 主芯片型号： 飞腾4核处理器，包含2个FTC664核和2个FTC310核（基于Cortex A53 x 4核）
   - 飞腾派是首款基于飞腾定制芯片的国产化开源硬件产品，采用飞腾自主设计的定制款嵌入式 CPU。

#### RISC-V架构
* 华山派（HuaShan）：
   - 主芯片型号： 算能 CV1812H（玄铁 C906 x 2核）
   - 华山派是一款算能和生态伙伴硬件十万个为什么联合推出的基于RISC-V指令集架构的开源开发板，适用于学术研究和嵌入式系统开发。
* 荔枝派（Lychee）：
  - 主芯片型号： 阿里平头哥 曳影TH1520（玄铁C910 x 4核）
  - 荔枝派也是一款基于RISC-V架构的开源开发板，它具有较高的可扩展性和灵活性。

#### LoongArch架构
* 龙芯教育派（loongsonpai）
  - 主芯片型号：龙芯2K1000处理器
  - 2K1000是基于国产CPU架构LoongArch的芯片，具有自主知识产权。辰龙操作系统将支持LoongArch架构的芯片，以推动国产CPU在操作系统领域的应用。
* 星云开发板：
  - 主芯片型号：龙芯2K1000LA（LoongArch64 架构兼容）
  - 龙芯2K1000是面向工业控制与终端等领域的低功耗通用处理器。芯片外围接口包括两路PCIE2.0、一路SATA2.0、4路USB2.0、两路DVO、64位DDR3及其它多种接口。

### x86架构
* 清华同方PC机
  - 主芯片型号：Intel Core i5 (大多数型号都采用了四核心设计。这些处理器通常配备了四个物理核心和四个线程，支持多线程处理)
  - 基于Intel i5的清华同方品牌机可以适用于各种不同的应用场景，包括日常办公、学习、娱乐和轻度游戏等。

辰龙开源社区当前致力于将 ArceOS 内核适配到不同的硬件平台，并进行相关驱动程序的开发。这样可以使 ArceOS 更好地支持特定应用场景，并降低应用过程中的时间成本。
辰龙操作系统将不断努力扩展和适配更多的硬件架构，以满足不同用户的需求，并为各种应用场景提供稳定可靠的操作系统解决方案。

## 辰龙操作系统起源
辰龙操作系统是由 @asmcos、@limingth 共同发起的开源项目，并得到了清华大学 @chyyuu 老师的大力支持。本开源项目致力于打造安全操作系统的社区发行版本。

### 辰龙操作系统的业务模式
辰龙社区当前主要业务是适配迁移和技术服务：帮助企业在具体项目中移植适配 ArceOS 操作系统，并提供员工培训、技术支持和咨询服务。
* 通过技术培训，辰龙帮助用户了解和掌握辰龙操作系统的特性和使用方法。
* 同时，辰龙还提供适配迁移服务，帮助用户将其应用从其他操作系统迁移到辰龙操作系统上，

欢迎访问我们的 GitHub 页面 <https://github.com/ChenLongOS> 获取更多信息和源代码。
