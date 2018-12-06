<template>
    <div style="height: 100%;width: 100%;">
        <input type="text" id="text"><button type="button" @click="send()">发送消息</button>
        <div id="message">
        </div>
    </div>
</template>

<script>
    export default {
        name: "getMessage",
        data () {
            return {
                sendValue:'',
                websocker: null,
            }
        },
        methods: {
            getMessage () {
                const _this = this;
                if('WebSocket' in window){
                    this.websocker = new WebSocket("ws://121.40.165.18:8800");
                    this.websocker.onmessage = this.getMsg;
                }else{
                    alert('not support websocket');
                }
            },
            getMsg (e) {
                this.setHtml(e.data);
            },
            send () {
                var message = document.getElementById('text').value;
                this.websocker.send(message);
            },
            setHtml (text) {
                document.getElementById('message').innerHTML += text + '<br/>';
            }
        },
        created () {

        },
        mounted () {
            this.getMessage();
        }
    }
</script>

<style scoped>
    ul li{
        list-style: none;
    }
    ul li p:nth-child(2){
        color: grey;
        font-size: 14px;
    }
</style>