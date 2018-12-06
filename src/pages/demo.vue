<template>
    <div id="app">
        <img src="http://omsproductionimg.yangkeduo.com/images/2017-03-30/327d79cc6892802653ddf02316417cb1.jpeg" alt="" style="width: 100%;height: 100%;">
        <div id="qrcode"></div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'
    import html2canvas from 'html2canvas'
    export default {
        name: 'App',
        data () {
        },
        methods: {
            getBase (url)　{

            },
            qrcode () {
                let qrcode = new QRCode('qrcode', {
                    width: 100,
                    height: 100, // 高度
                    text: 'https://www.baidu.com/'

                })
            },
            toImage () {
                html2canvas (document.body, {
                    backgroundColor: null,
                    useCORS: true,  // 允许加载跨域图片
                    tainttest: true // 检测每张图片都已经加载完成
                }).then((canvas) => {
                    var imgUri = canvas.toDataURL("image/png")
                    document.body.appendChild(canvas)
                })
            }
        },
        created () {
        },
        mounted () {
            this.qrcode()
            this.toImage()
        }
    }
</script>

<style>
</style>