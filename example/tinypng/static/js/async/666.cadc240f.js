"use strict";(self.webpackChunkrspress_doc_template=self.webpackChunkrspress_doc_template||[]).push([["666"],{8611:function(e,n,r){r.r(n),r.d(n,{default:function(){return l}});var s=r(5893),i=r(65);function t(e){let n=Object.assign({h1:"h1",a:"a",h2:"h2",p:"p",ul:"ul",li:"li",pre:"pre",code:"code",img:"img",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",strong:"strong",ol:"ol"},(0,i.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.h1,{id:"无阻塞高性能将rust的imagequant库带入web前端",children:["无阻塞、高性能：将Rust的imagequant库带入Web前端",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#无阻塞高性能将rust的imagequant库带入web前端",children:"#"})]}),"\n",(0,s.jsxs)(n.h2,{id:"背景",children:["背景",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#背景",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"本文记录了Png压缩库的调研过程，将优秀的imagequant Rust包编译成浏览器可用的WASM包，并通过Worker解决主线程阻塞的问题。"}),"\n",(0,s.jsx)(n.p,{children:"图片压缩一直是前端/客户端必须优化的问题之一，高质量低尺寸的文件能够提高响应速度，减少流量，目前不同规模的团队在不同场景可能有以下方式来解决这个问题："}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"服务端压缩：比如云对象存储 Cloudflare Images"}),"\n",(0,s.jsx)(n.li,{children:"代码自动压缩：比如前端脚手架压缩"}),"\n",(0,s.jsx)(n.li,{children:"手动压缩：比如Squoosh，TinyPng"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"因为压缩目前还是最主流的压缩方式，并且Squoosh png压缩效果不佳（包太旧了），于是想自己重新再编译一套最新的wasm。"}),"\n",(0,s.jsxs)(n.h2,{id:"相关术语",children:["相关术语",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#相关术语",children:"#"})]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://squoosh.app/",target:"_blank",rel:"noopener noreferrer",children:"squoosh"}),"：Chrome团队一个开源的客户端图片压缩网站"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://crates.io/crates/imagequant",target:"_blank",rel:"noopener noreferrer",children:"imagequant"}),"：一个处理png图像质量的库，可以减少图片的质量，本文用的是rust版本"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/rustwasm/wasm-pack?tab=readme-ov-file",target:"_blank",rel:"noopener noreferrer",children:"wasm-pack"}),"：将rust打包成npm包的脚手架工具"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://crates.io/crates/imagequant",target:"_blank",rel:"noopener noreferrer",children:"crates"}),"：一个rust lib下载平台，类似于npm"]}),"\n",(0,s.jsxs)(n.h2,{id:"webassembly的两种形态",children:["WebAssembly的两种形态",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#webassembly的两种形态",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"首先简单介绍一下WebAssembly两种形态："}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"机器码格式"}),"\n",(0,s.jsx)(n.li,{children:"文本格式"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"这种文本形式更类似于处理器的汇编指令,因为WebAssembly本身是一门语言，一个小小的实例："}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-Assembly",children:'(module\n  (table 2 anyfunc)\n  (func $f1 (result i32)\n    i32.const 42)\n  (func $f2 (result i32)\n    i32.const 13)\n  (elem (i32.const 0) $f1 $f2)\n  (type $return_i32 (func (result i32)))\n  (func (export "callByIndex") (param $i i32) (result i32)\n    local.get $i\n    call_indirect $return_i32)\n)\n'})}),"\n",(0,s.jsx)(n.p,{children:"一般很少有人直接写文本格式，而是通过其他语言、或者是现存lib来编译成浏览器可用的wasm，这样很多客户端的计算模块只需简单处理都能很快转译成WASM在浏览器使用的模块，极大丰富了浏览器的使用场景。"}),"\n",(0,s.jsx)(n.p,{children:"接着我们先从一个入门实例开始，逐步到自己动手编译一个Rust模块。"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://cdn.jsdelivr.net/gh/viteui/viteui.github.io@web-image/web/image/202410050124657.(null)",alt:"img"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://web.wcrane.cn/251-%E6%8A%80%E6%9C%AF%E6%8B%93%E5%B1%95/5-Rust/Rust%E5%AD%A6%E4%B9%A0/200-Rust%E5%9C%A8WebAssembly%E4%B8%AD%E7%9A%84%E7%AE%80%E5%8D%95%E4%BD%BF%E7%94%A8.html",target:"_blank",rel:"noopener noreferrer",children:"Rust在WebAssembly中的简单使用"})}),"\n",(0,s.jsxs)(n.h2,{id:"imagequant打包成npm包",children:["imagequant打包成npm包",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#imagequant打包成npm包",children:"#"})]}),"\n",(0,s.jsxs)(n.h3,{id:"压缩库选型",children:["压缩库选型",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#压缩库选型",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"简单聊一下为什么选择imagequant，这也是调研得出来的结论，squoosh是开发者使用最多的一个的一个开源图片图片的网站（3年未更新），因此对于其他格式的压缩，可以部分copy其中一些比较优异的压缩库，不满意的部分比如png的可以自己编译wasm。"}),"\n",(0,s.jsxs)(n.table,{children:["\n",(0,s.jsxs)(n.thead,{children:["\n",(0,s.jsxs)(n.tr,{children:["\n",(0,s.jsx)(n.th,{children:"图片类型"}),"\n",(0,s.jsx)(n.th,{children:"压缩库"}),"\n",(0,s.jsx)(n.th,{children:"结论"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.tbody,{children:["\n",(0,s.jsxs)(n.tr,{children:["\n",(0,s.jsx)(n.td,{children:"PNG"}),"\n",(0,s.jsx)(n.td,{children:"oxiPNG"}),"\n",(0,s.jsx)(n.td,{children:"squoosh使用的png压缩库，压缩率很一般，15-25%左右"}),"\n"]}),"\n",(0,s.jsxs)(n.tr,{children:["\n",(0,s.jsx)(n.td,{children:"PNG"}),"\n",(0,s.jsx)(n.td,{children:"imagequant"}),"\n",(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.a,{href:"https://crates.io/crates/imagequant",target:"_blank",rel:"noopener noreferrer",children:"https://crates.io/crates/imagequant"})," 压缩效果≈70% squoosh编译出来的wasm太老了(v2.12.1)， 需要自己再编译一次,最新的是（v4.3.0）"]}),"\n"]}),"\n",(0,s.jsxs)(n.tr,{children:["\n",(0,s.jsx)(n.td,{children:"JPEG"}),"\n",(0,s.jsx)(n.td,{children:"mozJPEG"}),"\n",(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.a,{href:"https://github.com/mozilla/mozjpeg",target:"_blank",rel:"noopener noreferrer",children:"https://github.com/mozilla/mozjpeg"})," 压缩效果≈80%"]}),"\n"]}),"\n",(0,s.jsxs)(n.tr,{children:["\n",(0,s.jsx)(n.td,{children:"WEBP"}),"\n",(0,s.jsx)(n.td,{children:"libwebp"}),"\n",(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.a,{href:"https://github.com/webmproject/libwebp",target:"_blank",rel:"noopener noreferrer",children:"https://github.com/webmproject/libwebp"})," 压缩效果>90%"]}),"\n"]}),"\n",(0,s.jsxs)(n.tr,{children:["\n",(0,s.jsx)(n.td,{children:"SVG"}),"\n",(0,s.jsx)(n.td,{children:"libsvgo"}),"\n",(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.a,{href:"https://github.com/svg/svgo",target:"_blank",rel:"noopener noreferrer",children:"https://github.com/svg/svgo"})," 压缩效果10%~30% 原库svgo只支持node环境，libsvgo提供了浏览器的支持模式"]}),"\n"]}),"\n",(0,s.jsxs)(n.tr,{children:["\n",(0,s.jsx)(n.td,{children:"AVIF"}),"\n",(0,s.jsx)(n.td,{children:"avif-serialize"}),"\n",(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.a,{href:"https://github.com/packurl/wasm_avif",target:"_blank",rel:"noopener noreferrer",children:"https://github.com/packurl/wasm_avif"})," 压缩效果>90%,但当前的兼容性差 squoosh使用的也比较旧， 且Figma不支持SharedArrayBuffer 重新编译了最新的avif-serialize"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"压缩效果是如何鉴别的？"})}),"\n",(0,s.jsx)(n.p,{children:"纯肉眼拖动观察肯定不够客观全面，所以我用了多张色彩对鲜明、和业务相关图片进行测验。"}),"\n",(0,s.jsxs)(n.p,{children:["图片对比工具： ",(0,s.jsx)(n.a,{href:"https://www.diffchecker.com/image-compare/",target:"_blank",rel:"noopener noreferrer",children:"https://www.diffchecker.com/image-compare/"})]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://cdn.jsdelivr.net/gh/viteui/viteui.github.io@web-image/web/image/202410052111513.(null)",alt:"img"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://cdn.jsdelivr.net/gh/viteui/viteui.github.io@web-image/web/image/202410052110784.(null)",alt:"img"})}),"\n",(0,s.jsxs)(n.h2,{id:"png压缩打包",children:["PNG压缩打包",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#png压缩打包",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"前面说到，sqoosh的oxipng压缩效果差、imagequant版本老，因此这里需要自己手动来打包"}),"\n",(0,s.jsx)(n.p,{children:"首先需要找到imagequant的rust库（crates类似npm）"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://crates.io/crates/imagequant",target:"_blank",rel:"noopener noreferrer",children:"https://crates.io/crates/imagequant"})}),"\n",(0,s.jsx)(n.p,{children:"然后将依赖加入到Cargo.toml (这个类似package.json)"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'[package]\nname = "tinypng-lib-wasm"\nversion = "1.0.50"\nedition = "2021"\nauthor = ["wacrne"]\ndescription = "TinyPNG Rust WASM Library"\nlicense = "MIT"\nkeywords = []\n\n[lib]\ncrate-type = ["cdylib", "rlib"]\n\n[dependencies]\nimagequant = { version = "4.2.0", default-features = false }\nwasm-bindgen = "0.2.84"\n\n# The `console_error_panic_hook` crate provides better debugging of panics by\n# logging them with `console.error`. This is great for development, but requires\n# all the `std::fmt` and `std::panicking` infrastructure, so isn\'t great for\n# code size when deploying.\nconsole_error_panic_hook = { version = "0.1.7", optional = true }\nlodepng = "3.7.2"\n'})}),"\n",(0,s.jsx)(n.p,{children:"然后编写部分导出代码，将处理图片的函数暴露给js调用"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"#[wasm_bindgen]\nimpl Imagequant {\n    #[wasm_bindgen(constructor)]\n    pub fn new() -> Imagequant {\n        Imagequant {\n            instance: imagequant::new(),\n        }\n    }\n\n    /// Make an image from RGBA pixels.\n    /// Use 0.0 for gamma if the image is sRGB (most images are).\n    pub fn new_image(data: Vec<u8>, width: usize, height: usize, gamma: f64) -> ImagequantImage {\n        ImagequantImage::new(data, width, height, gamma)\n    }\n //. 省略\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"打包生成npm package"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://cdn.jsdelivr.net/gh/viteui/viteui.github.io@web-image/web/image/202410052111127.(null)",alt:"img"})}),"\n",(0,s.jsx)(n.p,{children:"可以先从d.ts中看生成的代码如何调用，从文件中看到需要输入uint8Array和图片尺寸大小，于是我们可以这样调用："}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { Imagequant, ImagequantImage } from 'tinypng-lib-wasm'\n\n// 获取图片元信息\nconst { width, height, imageData } = await this.getImageBitInfo()\n// 将 Uint8Array 数据从发给 Imagequant/WASM\nconst uint8Array = new Uint8Array(imageData.data.buffer)\nconst image = new ImagequantImage(uint8Array, width, height, 0)\nconst instance = new Imagequant()\n// 配置压缩质量\ninstance.set_quality(30, 85)\n// 启动压缩\nconst output = instance.process(image)\n\nconst outputBlob = new Blob([output.buffer], { type: 'image/png' })\n\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"// 获取图片信息：宽、高、像素数据、图片大小\nconst getImageBitInfo = (file) => {\n  return new Promise((resolve, reject) => {\n    const reader = new FileReader();\n\n    // 创建一个 Image 对象\n    const img = new Image();\n    img.src = URL.createObjectURL(file);\n\n    img.onload = () => {\n      // 创建一个 canvas 元素\n      const canvas = document.createElement('canvas');\n      canvas.width = img.width;\n      canvas.height = img.height;\n      const ctx = canvas.getContext('2d');\n\n      if (!ctx) {\n        reject(new Error('无法获取 canvas 上下文'));\n        return;\n      }\n\n      // 将图像绘制到 canvas 上\n      ctx.drawImage(img, 0, 0);\n\n      // 获取 ImageData\n      const imageData = ctx.getImageData(0, 0, img.width, img.height);\n      const data = imageData.data; // Uint8ClampedArray\n\n      // 将 Uint8ClampedArray 转换为普通的 Uint8Array\n      const buffer = new Uint8Array(data).buffer;\n\n      // 确保缓冲区长度是 width * height * 4\n      const expectedLength = img.width * img.height * 4;\n      if (buffer.byteLength !== expectedLength) {\n        reject(new Error(`缓冲区长度不匹配：期望 ${expectedLength} 字节，但得到 ${buffer.byteLength} 字节`));\n        return;\n      }\n\n      resolve({\n        buffer,\n        width: img.width,\n        height: img.height,\n        size: file.size\n      });\n\n      // 释放对象 URL\n      URL.revokeObjectURL(img.src);\n    };\n\n    img.onerror = () => {\n      reject(new Error('图片加载失败'));\n      URL.revokeObjectURL(img.src);\n    };\n  });\n};\n"})}),"\n",(0,s.jsxs)(n.p,{children:["演示一下，压缩效果还不错，对于质量，还可以调整相关的参数。目前的参数设置为 ",(0,s.jsx)(n.code,{children:"instance.set_quality(35, 88);"})]}),"\n",(0,s.jsx)(n.p,{children:"压缩效果可以媲美tinify。"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://cdn.jsdelivr.net/gh/viteui/viteui.github.io@web-image/web/image/202410050124857.(null)",alt:"img"})}),"\n",(0,s.jsx)(n.p,{children:"压缩为原来的 27.6% （-62.4%）"}),"\n",(0,s.jsx)(n.p,{children:"tinify压缩效果（-61%）"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://cdn.jsdelivr.net/gh/viteui/viteui.github.io@web-image/web/image/202410052110603.(null)",alt:"img"})}),"\n",(0,s.jsxs)(n.h2,{id:"其他压缩库打包",children:["其他压缩库打包",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#其他压缩库打包",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"其他库squoosh比如webp、jpg、avif已经帮忙打包好了，svg有现成的npm库，因此较为简单。"}),"\n",(0,s.jsxs)(n.h2,{id:"使用worker避免阻塞js主线程",children:["使用Worker避免阻塞js主线程",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#使用worker避免阻塞js主线程",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"在压缩大图的时候，发现浏览器有点卡，周围的按钮的动效都无法正常运行，点也点不动。这是因为我们如果直接调用wasm会直接阻塞js主线程，既然是计算密集型的工作，这个时候就只能拿出非常适合这种场景的特性了：Worker。"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.img,{src:"https://cdn.jsdelivr.net/gh/viteui/viteui.github.io@web-image/web/image/202410050124455.(null)",alt:"img"})}),"\n",(0,s.jsx)(n.p,{children:"先实现一下woker中需要执行的代码，他完成了2件事情"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"在worker中执行压缩任务"}),"\n",(0,s.jsx)(n.li,{children:"监听主线程发送的文件，传输文件到主线程"}),"\n"]}),"\n",(0,s.jsxs)(n.h3,{id:"使用步骤",children:["使用步骤",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#使用步骤",children:"#"})]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["webpack项目中安装",(0,s.jsx)(n.code,{children:"worker-loader"})]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npm install worker-loader\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsxs)(n.li,{children:["在",(0,s.jsx)(n.code,{children:"webpack.config.js"}),"中配置"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"module.exports = {\n  // ...\n  module: {\n    rules: [\n      {\n        test: /\\.worker\\.js$/,\n        use: { loader: 'worker-loader' },\n      },\n    ],\n  },\n};\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsxs)(n.li,{children:["定义",(0,s.jsx)(n.code,{children:"imageWorker.worker.js"})]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"// imageWorker.worker.js\nimport TinyPNG from 'tinypng-lib';\n\nself.onmessage = async function (e) {\n    const {\n        image,\n        options\n    } = e.data;\n    try {\n      	// 使用支持webWorker的方法\n        const result = await TinyPNG.compressWorkerImage(image, options);\n        self.postMessage(result);\n    } catch (error) {\n        self.postMessage({ error: error.message });\n    }\n};\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"4",children:["\n",(0,s.jsx)(n.li,{children:"在组件中使用"}),"\n"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"监听webworker的消息"}),"\n",(0,s.jsxs)(n.li,{children:["使用 ",(0,s.jsx)(n.code,{children:"TinyPNG.getImage"})," 处理文件信息"]}),"\n",(0,s.jsx)(n.li,{children:"发送图片信息给webworker进行压缩"}),"\n",(0,s.jsx)(n.li,{children:"接收webworker返回的压缩结果"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"<script>\n// Import the worker\nimport ImageWorker from './imageWorker.worker.js'; // This is the bundled worker\nimport { getSizeTrans } from '../utils';\nimport TinyPNG from 'tinypng-lib';\nexport default {\n  name: 'Base',\n  data() {\n    return {\n      imgUrl: '',\n      compressResult: {},\n    }\n  },\n  mounted() {\n    // Start the worker when the component is mounted\n    this.worker = new ImageWorker();\n\n    // Receive the message (compressed result) from the worker\n    this.worker.onmessage = (e) => {\n      this.compressing = false;\n      const result = e.data;\n      if (result.error) {\n        console.error(\"Compression failed:\", result.error);\n      } else {\n        const url = URL.createObjectURL(result.blob);\n        this.imgUrl = url;\n        this.compressResult = result;\n      }\n    };\n  },\n  methods: {\n    async uploadImg(e) {\n      const file = e.file;\n      // 获取图片信息\n      const image = await TinyPNG.getImage(file);\n      this.compressing = true;\n      // Send the file to the worker for compression\n      this.worker.postMessage({\n        image,\n        options: {\n          minimumQuality: 30,\n          quality: 85\n        }\n      });\n    }\n  },\n  beforeDestroy() {\n    // Terminate the worker when the component is destroyed\n    if (this.worker) {\n      this.worker.terminate();\n    }\n  }\n}\n<\/script>\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"5",children:["\n",(0,s.jsxs)(n.li,{children:["说明：对于jpeg、jpg的图片不支持使用WebWorker压缩需要使用",(0,s.jsx)(n.code,{children:"TinyPNG.compressJpegImage"})," 进行压缩"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import TinyPNG from 'tinypng-lib';\nTinyPNG.compressJpegImage(file, options)\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"总结",children:["总结",(0,s.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#总结",children:"#"})]}),"\n",(0,s.jsx)(n.p,{children:"编译imagequant的过程比较坎坷，主要是rust的语言机制确实跟平常使用的语言不一样，需要学习的概念会多一些。不过获得的效果还是很不错的："}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"节省了服务器处理资源"}),"\n",(0,s.jsx)(n.li,{children:"节省了图片网络传输的时间"}),"\n",(0,s.jsx)(n.li,{children:"接入了WebWorker，可以并发执行任务且不阻塞"}),"\n",(0,s.jsx)(n.li,{children:"接入Service worker后可以做到离线使用"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"小广告："})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["开箱即用的图片压缩工具npm包：",(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/tinypng-lib",target:"_blank",rel:"noopener noreferrer",children:"tinypng-lib"})]}),"\n",(0,s.jsxs)(n.li,{children:["图片压缩工具wasm包：",(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/tinypng-lib-wasm",target:"_blank",rel:"noopener noreferrer",children:"tinypng-lib-wasm"})]}),"\n",(0,s.jsxs)(n.li,{children:["图片压缩工具体验地址：",(0,s.jsx)(n.a,{href:"https://tinypng.wcrane.cn/example",target:"_blank",rel:"noopener noreferrer",children:(0,s.jsx)(n.a,{href:"https://tinypng.wcrane.cn/example",target:"_blank",rel:"noopener noreferrer",children:"https://tinypng.wcrane.cn/example"})})]}),"\n"]})]})}function a(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(t,{...e})}):t(e)}let l=a;a.__RSPRESS_PAGE_META={},a.__RSPRESS_PAGE_META["guide%2F%E6%8A%80%E6%9C%AF%E5%8E%9F%E7%90%86%2Frust.md"]={toc:[{text:"背景",id:"背景",depth:2},{text:"相关术语",id:"相关术语",depth:2},{text:"WebAssembly的两种形态",id:"webassembly的两种形态",depth:2},{text:"imagequant打包成npm包",id:"imagequant打包成npm包",depth:2},{text:"压缩库选型",id:"压缩库选型",depth:3},{text:"PNG压缩打包",id:"png压缩打包",depth:2},{text:"其他压缩库打包",id:"其他压缩库打包",depth:2},{text:"使用Worker避免阻塞js主线程",id:"使用worker避免阻塞js主线程",depth:2},{text:"使用步骤",id:"使用步骤",depth:3},{text:"总结",id:"总结",depth:2}],title:"无阻塞、高性能：将Rust的imagequant库带入Web前端",frontmatter:{}}}}]);