var define, require;
if (function (t, e) {
    function n(t) {
        return function (e) {
            return {}.toString.call(e) == "[object " + t + "]"
        }
    }

    function o() {
    }

    var i = n("Function"), r = {};
    o.prototype.exec = function () {
        function t(t) {
            return o.get(t).exec()
        }

        var n = this;
        if (this.execed) return n.exports;
        this.execed = !0;
        var r = n.factory, a = i(r) ? r(t, n.exports = {}, n) : r;
        return a === e && (a = n.exports), delete n.factory, n.exports = a, a
    }, define = function (t, e, n) {
        i(e) && (n = e, e = []);
        var r = {id: t, deps: e, factory: n};
        o.save(r)
    }, o.save = function (t) {
        var e = o.get(t.id);
        e.id = t.id, e.dependencies = t.deps, e.factory = t.factory
    }, o.get = function (t) {
        return r[t] || (r[t] = new o)
    }, t.require = function (t) {
        var e = o.get(t);
        return e.execed || e.exec(), e.exports
    }
}(this), define("app/views/coupon/ticket/index", ["atom/magix/index", "app/lib/util2"], function (t, e, n) {
    var o = t("atom/magix/index"), i = t("app/lib/util2"), r = window.CONST_VAR;
    o.applyStyle("mx-c91", '.coupon-wrap{width:100%;height:6.1rem;background:#ff8700;background:linear-gradient(125deg,#ff8700,#ff5145);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff8700",endColorstr="#ff5145",GradientType=1);position:relative}.coupon-wrap .title{height:.63rem;padding-top:.43rem}.coupon-wrap .title p{text-align:center;color:#fff;font-size:.28rem;line-height:.32rem}.coupon-wrap .content{width:7.11rem;height:4.7rem;background:#fff;border-radius:.12rem;padding-top:.29rem;box-sizing:border-box;margin:0 auto;box-shadow:0 0 2px 0 rgba(0,0,0,.5);text-align:center}.coupon-wrap .content .time{font-size:.24rem;line-height:.32rem;color:#9b9b9b;text-align:center;margin-bottom:.3rem;height:.3rem}.coupon-wrap .content .time .hr{width:.38rem;height:.01rem;background:hsla(0,0%,61%,.5);display:inline-block;vertical-align:middle}.coupon-wrap .content .time .left-hr{margin-right:.28rem}.coupon-wrap .content .time .right-hr{margin-left:.28rem}.coupon-wrap .content .coupon-con{width:3.02rem;height:1.43rem;margin:0 auto .32rem;box-sizing:border-box}.coupon-wrap .content .coupon-con .amount{overflow:hidden;text-align:center;padding-top:.15rem}.coupon-wrap .content .coupon-con .amount-icon{color:#ff5540;font-size:.28rem;line-height:1;position:absolute;bottom:.14rem;left:-.32rem;font-style:normal;font-weight:400}.coupon-wrap .content .coupon-con .amount-num{color:#ff5540;font-size:.72rem;line-height:1;font-weight:600;position:relative}.coupon-wrap .content .coupon-con .tip{font-size:.24rem;color:#ff5540;text-align:center;line-height:1.2}.coupon-wrap .content .coupon-con .errorTip{color:#9b9b9b;font-size:.34rem;line-height:1.43rem}.coupon-wrap .content .normal{background:url(//gw.alicdn.com/tfs/TB1A65vkDnI8KJjy0FfXXcdoVXa-302-143.png) no-repeat;background-size:cover}.coupon-wrap .content .J_no{background:url(//gw.alicdn.com/tfs/TB1QsRZkv6H8KJjSspmXXb2WXXa-302-143.png) no-repeat;background-size:cover}.coupon-wrap .content .pl7{padding-left:.7rem;padding-top:.25rem}.coupon-wrap .content .center{text-align:center}.coupon-wrap .content .y-btn{color:#ff5142}.coupon-wrap .content .g-btn{color:#9b9b9b}.coupon-wrap .content .btn{height:.7rem;border-radius:.35rem;box-sizing:border-box;font-size:.26rem;line-height:.65rem;background:#ff5540;color:#fff;border:1px solid;margin-bottom:.3rem;outline:none;display:inline-block;padding:0 .55rem}.coupon-wrap .content .hr{width:6.63rem;height:1px;background:#d2d2d2;margin:0 auto;-webkit-transform:scaleY(.5);transform:scaleY(.5)}.coupon-wrap .content .shop-link{height:.98rem;width:100%;display:block;overflow:hidden}.coupon-wrap .content .shop{height:.32rem;margin-top:.3rem;margin-left:.24rem}.coupon-wrap .content .shop .shoplogo{height:.6rem;width:.6rem;float:left;margin-right:.1rem;margin-top:-.08rem}.coupon-wrap .content .shop .shopname{float:left;font-size:.26rem;color:#4a4a4a}.coupon-wrap .content .shop .shoparrow{float:right;width:.13rem;height:.23rem;margin:.12rem .4rem 0 0}.coupon-wrap .bottom-img{position:absolute;bottom:-.05rem;left:.04rem;height:.14rem;width:7.41rem;background:url(//gw.alicdn.com/tfs/TB1MR1QjcLJ8KJjy0FnXXcFDpXa-741-14.png) no-repeat;background-size:cover}.coupon-toast{text-align:center}.coupon-toast .atom-dialog-content{display:inline-block;padding:.2rem .6rem!important;background:rgba(0,0,0,.6);color:#fff;border-radius:.1rem;font-size:.28rem}.atom-dialog-wrap div.atom-dialog{background:transparent}'), n.exports = o.View.extend({
        tmpl: '<div class="coupon-wrap"><div class="title"><p><%- shopName%>\u4f18\u60e0\u5238</p></div><div class="content"><p class="time"><% if(hasTimeInfo){%><span class="left-hr hr"></span>\u4f7f\u7528\u671f\u9650&nbsp;<%- startTime%>&nbsp;-&nbsp;<%- endTime%><span class="right-hr hr"></span><% }%></p><div mx-click="getCoupon()" class="coupon-con J_first <%- bgClass%> <%- plClass%>"><% if(showAmount){%><p class="amount"><span class="amount-num"><i class="amount-icon">\uffe5</i><%- amount%></span></p><p class="tip">\u6ee1<%- startFee%>\u5143\u53ef\u7528</p><%}else{%><span class="errorTip"><%- errTip%></span><%}%></div><% if(retStatus === 0){%><button id="getCouponBtn" class="y-btn btn" mx-click="getCoupon()">\u7acb\u5373\u9886\u5238</button><% }else{ %><a data-spm="ds1" href="<%- shopUrl%>" class="y-btn btn">\u53bb\u5e97\u94fa\u901b\u901b</a><% }%><a data-spm="ds2" id="shopLink" href="<%- shopUrl%>" class="J_none y-btn btn">\u5df2\u9886\u53d6\uff0c\u53bb\u5e97\u94fa\u901b\u901b</a> <a data-spm="ds3" id="shopLink2" href="<%- shopUrl%>" class="J_none y-btn btn">\u53bb\u5e97\u94fa\u901b\u901b</a><div class="hr"></div><a data-spm="ds4" href="<%- shopUrl%>" class="shop-link"><p class="shop"><img src="<%- shopLogo%>" class="shoplogo"> <span class="shopname"><%- shopName%></span> <img src="//gw.alicdn.com/tfs/TB1lrOQhOqAXuNjy1XdXXaYcVXa-13-23.png" class="shoparrow"></p></a></div><div class="bottom-img"></div></div>',
        render: function () {
            var t = this;
            t.data = t.fixData(o.config().couponData);
            var e = $.tmpl(t.tmpl, t.data);
            t.setHTML(t.id, e)
        },
        fixData: function (t) {
            return t.bgClass = t.retStatus === r.GET_COUPON_SUCCESS ? "normal" : "J_no", t.retStatus === r.GET_COUPON_SUCCESS ? (t.showAmount = !0, t.plClass = "center") : (t.showAmount = !1, t.plClass = "center"), t.errTip = t.retStatus == r.GET_COUPON_YLW ? "\u4f18\u60e0\u5238\u5df2\u9886\u5b8c" : t.retStatus == r.GET_COUPON_YGQ ? "\u4f18\u60e0\u5238\u5df2\u8fc7\u671f" : "\u4f18\u60e0\u5238\u4e0d\u5b58\u5728", t.effectiveStartTime && t.effectiveEndTime ? (t.hasTimeInfo = !0, t.startTime = t.effectiveStartTime.split(" ")[0].replace(/\-/g, "."), t.endTime = t.effectiveEndTime.split(" ")[0].replace(/\-/g, ".")) : t.hasTimeInfo = !1, t.shopName = t.shopName || "", t.shopLogo = t.shopLogo || "//gw.alicdn.com/tps/TB1Uf4VNpXXXXa4apXXXXXXXXXX-80-80.png", t
        },
        "getCoupon<click>": function () {
            var t = this;
            !$(".coupon-con").hasClass("J_no") && $(".coupon-con").hasClass("J_first") && lib.login.isLogin(function (e) {
                e ? t.getCouponDo() : lib.login.goLoginAsync(function (e) {
                    "SUCCESS" == e.toUpperCase() && t.getCouponDo()
                })
            })
        },
        getCouponDo: function () {
            var t = this;
            alert(1)
            lib.mtop.request({
                // api: "mtop.alimama.union.hsf.mama.coupon.apply",
                api: "http://localhost:8090/",
                data: {
                    sellerId: i.searchObj.sellerId,
                    activityId: i.searchObj.activityId,
                    pid: i.searchObj.pid,
                    mteeUa: i.safe.getUA(),
                    umidToken: i.safe.getUmidToken()
                },
                AntiCreep: !0,
                v: "1.0",
                ecode: 1,
                LoginRequest: !0
            }, function (e) {
                e = e.data || {}, e.result = e.result || {}, t.dealWithCode(e.result.retStatus)
            }, function () {
                t.dealWithCode()
            })
        },
        dealWithCode: function (t) {
            var e = this, t = parseInt(t);
            switch (t) {
                case r.APPLY_COUPON_SUCCESS:
                    i.showDialogAndGoDetail("\u4f18\u60e0\u5238\u9886\u53d6\u6210\u529f"), $(".coupon-con").removeClass("J_first"), e.showGoShop();
                    break;
                case r.APPLY_COUPON_NOSAFE:
                    i.showDialogAndGoDetail("\u7cfb\u7edf\u4f11\u606f\u4e2d"), $(".coupon-con").removeClass("J_first");
                    break;
                case r.APPLY_COUPON_YLQ:
                    i.showDialogAndGoDetail("\u9886\u53d6\u5df2\u8fbe\u4e0a\u9650"), $(".coupon-con").removeClass("J_first"), e.showGoShop();
                    break;
                case r.APPLY_COUPON_GQ:
                    i.showDialogAndGoDetail("\u4f18\u60e0\u5238\u5df2\u8fc7\u671f"), e.hideCouponAndGoShop2();
                    break;
                case r.APPLY_COUPON_YLW:
                    i.showDialogAndGoDetail("\u4f18\u60e0\u5238\u5df2\u9886\u5b8c"), e.hideCouponAndGoShop();
                    break;
                case r.APPLY_COUPON_MORE:
                    i.showDialogAndGoDetail("\u9886\u53d6\u5931\u8d25,\u8be5\u8d26\u6237\u9886\u5238\u6570\u91cf\u5df2\u8fbe\u4e0a\u9650"), $(".coupon-con").removeClass("J_first");
                    break;
                case r.APPLY_COUPON_NOLOGIN:
                    lib.login.goLoginAsync(function (t) {
                        "SUCCESS" == t.toUpperCase() && e.getCouponDo()
                    });
                    break;
                case r.APPLY_COUPON_NOSELF:
                    i.showDialogAndGoDetail("\u4e0d\u80fd\u9886\u53d6\u81ea\u5df1\u521b\u5efa\u7684\u5238"), $(".coupon-con").removeClass("J_first");
                    break;
                default:
                    i.showDialogAndGoDetail("\u7cfb\u7edf\u5f00\u5c0f\u5dee\u5566,\u8bf7\u7a0d\u540e\u91cd\u8bd5")
            }
        },
        showGoShop: function () {
            $("#getCouponBtn").addClass("J_none"), $("#shopLink").removeClass("J_none")
        },
        hideCouponAndGoShop: function () {
            $("#getCouponBtn").addClass("J_none"), $("#shopLink2").removeClass("J_none"), $(".coupon-con").removeClass("normal").addClass("J_no").html('<span class="errorTip">\u4f18\u60e0\u5238\u5df2\u9886\u5b8c</span>')
        },
        hideCouponAndGoShop2: function () {
            $("#getCouponBtn").addClass("J_none"), $("#shopLink2").removeClass("J_none"), $(".coupon-con").removeClass("normal").addClass("J_no").html('<span class="errorTip">\u4f18\u60e0\u5238\u5df2\u8fc7\u671f</span>')
        }
    })
}), define("app/views/coupon/main", ["atom/magix/index", "app/lib/util2", "app/views/coupon/mockData.js"], function (t, e, n) {
    var o = t("atom/magix/index"), i = t("app/lib/util2"), r = t("app/views/coupon/mockData.js"),
        a = window.CONST_VAR = {
            GET_COUPON_SUCCESS: 0,
            GET_COUPON_BCZ: 2,
            GET_COUPON_YGQ: 7,
            GET_COUPON_YLW: 4,
            GET_COUPON_ERROR: 8,
            APPLY_COUPON_SUCCESS: 0,
            APPLY_COUPON_NOSAFE: 4,
            APPLY_COUPON_GQ: 5,
            APPLY_COUPON_YLW: 7,
            APPLY_COUPON_YLQ: 1,
            APPLY_COUPON_MORE: 2,
            APPLY_COUPON_ERROR: 3,
            APPLY_COUPON_NOLOGIN: 8,
            APPLY_COUPON_NOSELF: 9
        };
    n.exports = o.View.extend({
        tmpl: '<div class="body-wrap"><div class="" mx-view="app/views/coupon/ticket/index"></div><div><p class="rule-title">\u6d3b\u52a8\u8bf4\u660e</p><ol class="rule-list"><li>1.\u70b9\u51fb\u201c\u7acb\u5373\u9886\u5238\u201d\u6309\u94ae\uff0c\u9886\u53d6\u6210\u529f\u540e\u8fdb\u5165\u5e97\u94fa\u65f6\u4f7f\u7528\uff0c\u5373\u53ef\u4eab\u53d7\u4f18\u60e0\u3002</li><li>2.\u5728\u624b\u673a\u6dd8\u5b9d-\u6211\u7684\u6dd8\u5b9d-\u5361\u5238\u5305-\u7f51\u5e97\u4f18\u60e0\u5238\uff0c\u53ef\u67e5\u8be2\u5df2\u53d1\u653e\u5230\u8d26\u6237\u7684\u4f18\u60e0\u5238\u3002</li></ol></div></div>',
        errorTmpl: '<img class="err-img" src="//gw.alicdn.com/tfs/TB1zgOXjgvD8KJjy0FlXXagBFXa-220-220.png" alt=""><p class="err-tip">\u4f18\u60e0\u5238\u4e0d\u5b58\u5728</p>',
        render: function () {
            var t = this;
            t.getData()
        },
        getData: function () {
            var t = this;
            i.searchObj.usemock ? t.dealData(r) : lib.mtop.request({
                api: "mtop.alimama.union.hsf.mama.coupon.get",
                data: {sellerId: i.searchObj.sellerId, activityId: i.searchObj.activityId, pid: i.searchObj.pid},
                AntiCreep: !0,
                AntiFlood: !0,
                v: "1.0",
                ecode: 0
            }, function (e) {
                t.dealData(e)
            }, function () {
                t.renderError()
            })
        },
        dealData: function (t) {
            var e = this;
            t = t.data || {};
            var n = t.result || {};
            n.retStatus = parseInt(n.retStatus, 10);
            var i = n.retStatus;
            i !== a.GET_COUPON_BCZ && i !== a.GET_COUPON_ERROR || n.shopUrl ? (o.config({couponData: n}), e.setHTML(e.id, e.tmpl)) : e.renderError()
        },
        renderError: function () {
            this.setHTML(this.id, this.errorTmpl)
        }
    })
}), define("app/lib/util2", ["atom/zepto/index", "app/lib/localStorage", "atom/dialog/index"], function (t, e, n) {
    var o = t("atom/zepto/index"), i = t("app/lib/localStorage"), r = t("atom/dialog/index"), a = {};
    a.showDialogAndGoDetail = function (t, e, n) {
        var o = r.create({
            elCls: "coupon-toast",
            content: t,
            needMask: !1,
            show: !0,
            closable: !1,
            maskClosable: !1,
            closeDestroy: !0,
            preventScroll_fixed: !1,
            preventScroll_touchMove: !0
        });
        setTimeout(function () {
            o.prop("vframe").invoke("close"), n && n(), e && (location.href = e)
        }, 1500)
    }, a.errorLog = function (t) {
        console && console.log(t)
    }, a.getSpmInfo = function (t) {
        var e = o("meta[name=data-spm]").attr("content"), n = o("body").attr("data-spm");
        return "spm=" + e + "." + n + "." + t
    }, a.getSpmAB = function () {
        var t = o("meta[name=data-spm]").attr("content"), e = o("body").attr("data-spm");
        return t + "." + e
    }, a.joinParams = function (t) {
        var e = [], n = function (t, n) {
            var t = encodeURIComponent(t), n = encodeURIComponent(n);
            (t || n) && e.push(t + ("" == n ? "" : "=" + n))
        };
        for (var o in t) {
            var i = t[o];
            if (i && i.constructor == Array) for (var r = 0, a = i.length; a > r; r++) n(o, i[r]); else n(o, i)
        }
        return e.join("&")
    }, a.parseParams = function (t) {
        var e = {};
        if (t) for (var n, o = 0, i = t.split(/&+/), r = i.length; r > o; o++) if (n = i[o]) {
            var a = decodeURIComponent(n.replace(/=.*/, "")), s = decodeURIComponent(n.replace(/(.*?=)|(.*)/, ""));
            (a || s) && (a in e ? ("string" == typeof e[a] && (e[a] = [e[a]]), e[a].push(s)) : e[a] = s)
        }
        return e
    }, a.searchObj = function () {
        var t = a.parseParams(window.location.search.replace(/^\?+/, "")), e = {};
        for (var n in t) t.hasOwnProperty(n) && (e[n] = o.isArray(t[n]) ? t[n][0] : t[n]);
        return e
    }(), a.urlPid = a.searchObj.pid, a.searchObj.pid = a.searchObj.pid || "mm_33231688_7050284_23466709", a.safe = function () {
        if (window.__MM_SAFE) return window.__MM_SAFE;
        var t = window.ctl && window.ctl.noConflict() || {};
        return t.config(), window.__MM_SAFE = t, t
    }();
    var s = function () {
        var t, e = [];
        if (/(iPad|iPod|iPhone|MSIE[\s\d\.]+);/i.test(navigator.userAgent)) t = !1; else {
            var n = function (n) {
                t = !!n, o.each(e, function (e, n) {
                    n(t)
                })
            }, i = new Image;
            i.onload = function () {
                n(1)
            }, i.onerror = function () {
                n(0)
            }, i.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vuUAAA="
        }
        return function (n) {
            "function" == typeof n && ("undefined" != typeof t ? n(t) : e.push(n))
        }
    }();
    window._WEBP = i.get("webp"), null === window._WEBP && s(function (t) {
        window._WEBP = t, i.set("webp", t)
    }), a.adaptImg = function (t, e, n) {
        var o = "";
        return (e || n) && (o += "_", e && (o += e + "x" + e), n && (o += "q" + n), o += ".jpg", ("true" === window._WEBP || window._WEBP === !0) && (o += "_.webp")), t + o
    }, !Array.prototype.indexOf && (Array.prototype.indexOf = function (t) {
        for (var e = 0, n = this.length; n > e; e++) if (this[e] === t) return e;
        return -1
    }), n.exports = a
}), define("atom/dialog/index", ["atom/magix/index", "atom/mask/index", "atom/zepto/index"], function (t, e, n) {
    function o(t) {
        t.preventDefault && t.preventDefault()
    }

    var i = t("atom/magix/index"), r = t("atom/mask/index"), a = t("atom/zepto/index");
    i.applyStyle("mx-d6e", '.atom-dialog-hide body{position:fixed;width:100%}.atom-dialog-wrap{display:none;position:fixed;overflow:auto;top:0;right:0;bottom:0;left:0;height:100%;-webkit-overflow-scrolling:touch;outline:0}.atom-dialog-wrap .atom-dialog{position:relative;background:#fff;border-radius:5px}.atom-dialog-wrap .atom-dialog .atom-dialog-title{text-align:center;font-size:20px;padding:10px}.atom-dialog-wrap .atom-dialog .atom-dialog-content{padding:10px 20px}.atom-dialog-wrap .atom-dialog .atom-dialog-close{position:absolute;right:3%;top:5%;color:#333;height:20px;line-height:20px}.atom-dialog-wrap .atom-dialog .atom-dialog-close:after{content:"\\D7";font-weight:100;font-size:20px}.atom-dialog-show{display:flex;display:-ms-flexbox;display:-webkit-box;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.atom-dialog-bottom-close{position:absolute;bottom:-2.5rem;left:5.2rem;width:1.7rem;height:1.7rem;background:url(//gw.alicdn.com/tps/TB1nv7dNFXXXXaNXXXXXXXXXXXX-76-76.png);background-size:1.7rem}'), n.exports = i.View.extend({
        tmpl: '<div class="atom-dialog <%= elCls %>" style="width:<%= width %>;height:<%= height %>"><% if(title){ %><div class="atom-dialog-title"><%= title %></div><% } %> <% if(content){ %><div class="atom-dialog-content"><%= content %></div><% } %> <% if(view){ %><div id="dialog_subview_of_<%= ownerid %>" class="atom-dialog-content" mx-view></div><% } %> <% if(closable){ %><div class="atom-dialog-close" mx-click="close()"></div><% } %> <% if(needBottomCloseIcon){%><div class="atom-dialog-bottom-close" mx-click="close()"></div><% }%></div>',
        ctor: function (t) {
            var e = this;
            e.$options = a.extend({
                width: "80%",
                height: "auto",
                closable: !0,
                closeDestroy: !1,
                maskClosable: !0,
                elCls: "",
                view: "",
                viewOptions: {},
                content: "",
                show: !1,
                animated: !0,
                title: "",
                zIndex: 999,
                preventScroll: !0,
                needBottomCloseIcon: !1,
                needMask: !0,
                preventScroll_fixed: !0,
                preventScroll_touchMove: !1
            }, t), e.fixOptions(e.$options), e.$options.needMask && (e.$maskVf = r.create().prop("vframe")), e.$relatedElement = a("#" + e.id), e.on("destroy", function () {
                a("#" + e.id).remove(), e.$options.needMask && e.$maskVf.invoke("destroy")
            })
        },
        fixOptions: function (t) {
            t.width && /\d$/.test(t.width) && (t.width += "px"), t.height && /\d$/.test(t.height) && (t.height += "px")
        },
        render: function () {
            var t = this;
            t.$options.ownerid = t.id;
            var e = a.tmpl(t.tmpl, t.$options);
            if (t.setHTML(t.id, e), t.$options.view) {
                var n = i.Vframe.get("dialog_subview_of_" + t.id);
                n && n.mountView(t.$options.view, t.$options.viewOptions)
            }
            t.$relatedElement.css("zIndex", t.$options.zIndex), t.$options.show && t.open(), t.$options.maskClosable && t.$relatedElement.on("click", function (e) {
                a.contains(t.$relatedElement[0], e.target) || (t.close(), t.$options.needMask && t.$maskVf.invoke("hide"))
            })
        },
        open: function () {
            var t = this;
            t.$options.needMask && t.$maskVf.invoke("show"), t.$relatedElement.addClass("atom-dialog-show"), t.$options.preventScroll && t.$options.preventScroll_fixed && a("html").addClass("atom-dialog-hide"), t.$options.preventScroll && t.$options.preventScroll_touchMove && a("#" + t.id).on("touchmove", o), a("#" + this.id).trigger({
                type: "open",
                value: ""
            })
        },
        close: function () {
            var t = this;
            t.$options.preventScroll && t.$options.preventScroll_fixed && a("html").removeClass("atom-dialog-hide"), t.$options.preventScroll && t.$options.preventScroll_touchMove && a("#" + t.id).off("touchmove", o), t.$options.closeDestroy ? t.destroy() : (t.$options.needMask && t.$maskVf.invoke("hide"), t.$relatedElement.removeClass("atom-dialog-show")), a("#" + this.id).trigger({
                type: "close",
                value: ""
            })
        },
        "close<click>": function () {
            var t = this;
            t.close()
        },
        destroy: function () {
            this.owner.unmountVframe()
        }
    }, {
        create: function (t) {
            var e = "atom" + i.guid("dlg_"), n = i.config("rootId"), o = i.Vframe.get(n);
            return a("body").append('<div class="atom-dialog-wrap" id="' + e + '"/>'), o.mountVframe(e, "atom/dialog/index", t), a("#" + e)
        }
    })
}), define("atom/mask/index", ["atom/magix/index", "atom/zepto/index"], function (t, e, n) {
    function o(t) {
        t.preventDefault && t.preventDefault()
    }

    var i = t("atom/magix/index"), r = t("atom/zepto/index");
    n.exports = i.View.extend({
        ctor: function (t) {
            var e = this;
            e.$options = t, e.on("destroy", function () {
                r("#" + e.id).remove()
            })
        }, render: function () {
            var t = this, e = t.$options.elCls || "", n = t.$options.show || !1, o = t.id;
            t.$relatedElement = r("#" + o), n && t.$relatedElement.addClass("atom-mask-show"), e && t.$relatedElement.addClass("atom-mask-show"), t.endUpdate()
        }, show: function () {
            this.$relatedElement.addClass("atom-mask-show"), r("#" + this.id).on("touchmove", o)
        }, hide: function () {
            this.$relatedElement.removeClass("atom-mask-show"), r("#" + this.id).off("touchmove", o)
        }, destroy: function () {
            var t = this;
            t.owner.unmountVframe()
        }
    }, {
        create: function (t) {
            var e = "atom" + i.guid("dlg_"), n = i.config("rootId"), o = i.Vframe.get(n);
            return r("body").append('<div class="atom-mask" id="' + e + '"/>'), o.mountVframe(e, "atom/mask/index", t), r("#" + e)
        }
    })
}), define("app/lib/localStorage", ["app/lib/date"], function (t, e, n) {
    function o(t) {
        if (!c) return void 0;
        try {
            var e = window.localStorage.getItem(t);
            return e
        } catch (n) {
            return void 0
        }
    }

    function i(t, e) {
        if (c) try {
            window.localStorage.setItem(t, e)
        } catch (n) {
        }
    }

    function r(t, e, n) {
        !n && (n = ",");
        var r = o(t);
        r = r ? r + n + e : e, i(t, e)
    }

    var a = t("app/lib/date"), s = function (t) {
        var e = "test_key" + (new Date).getTime();
        if (!t) return !1;
        try {
            return t.setItem(e, "value"), t.removeItem(e), !0
        } catch (n) {
            return !1
        }
    }, c = s(window.localStorage);
    n.exports = {
        get: o, set: i, append: r, addValuesByDate: function (t, e, n) {
            var o = a.getDayString(n), r = this.getValuesByDate(t);
            r[o] = r[o] ? r[o].indexOf(e) > -1 ? r[o] : r[o] + "," + e : e;
            try {
                r = JSON.stringify(r)
            } catch (s) {
                r = "{}"
            }
            return i(t, r), r
        }, getValuesByDate: function (t, e, n) {
            !n && (n = a.now()), !e && (e = a.addDay(new Date, -3)), e = e.getTime();
            var r, s;
            try {
                r = JSON.parse(o(t) || "{}")
            } catch (c) {
                return i(t, "{}"), {}
            }
            for (var u in r) r.hasOwnProperty(u) && (s = a.getDateFromStr(u, "yyyy-mm-dd"), (e >= s || s >= n) && delete r[u]);
            return r
        }, addTimesByDay: function (t) {
            var e = this.getTimesByDay(t);
            e += 1;
            var n = a.getDayString() + ";" + e;
            i(t, n)
        }, getTimesByDay: function (t) {
            var e = o(t);
            if (e) {
                var n = e.split(";");
                return n[0] == a.getDayString() ? parseInt(n[1]) || 0 : 0
            }
            return 0
        }
    }
}), define("app/lib/date", function (t, e, n) {
    function o(t) {
        return t >= 10 ? t : "0" + t
    }

    function i(t) {
        return !t && (t = new Date), l(t, "yyyy-mm-dd")
    }

    function r(t) {
        return [t.getFullYear(), t.getMonth(), t.getDay(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()]
    }

    function a(t, e) {
        return f(t, 0, 0, e)
    }

    function s(t, e) {
        for (var n, o = {
            yyyy: "year",
            mm: "month",
            dd: "day",
            hh: "hour",
            MM: "minute",
            ss: "second"
        }, i = {
            year: void 0,
            month: 1,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0
        }, r = e.split(/\W/), a = t.split(/\W/), s = 0, c = r.length; c > s; s++) n = r[s], o[n] && (i[o[n]] = a[s]);
        return i.month && (i.month = i.month - 1), i.year ? new Date(i.year, i.month, i.day, i.hour, i.minute, i.second) : new Error("year is required!")
    }

    function c() {
        return Date.now ? Date.now() : (new Date).getTime()
    }

    var u = {
        yyyy: function (t) {
            return t.getFullYear()
        }, mm: function (t) {
            return o(t.getMonth() + 1)
        }, dd: function (t) {
            return o(t.getDate())
        }, m: function (t) {
            return t.getMonth() + 1
        }, d: function (t) {
            return t.getDate()
        }, hh: function (t) {
            return o(t.getHours())
        }, MM: function (t) {
            return o(t.getMinutes())
        }, ss: function (t) {
            return o(t.getSeconds())
        }
    }, l = function (t, e) {
        "string" != typeof e && (e = "yyyy-mm-dd");
        var n = e.replace(/\b(\w+)\b/g, function (e) {
            return u[e](t)
        });
        return n || t.toString()
    }, f = function (t, e, n, o) {
        var i = r(t);
        return new Date(e + i[0], n + i[1], o + i[3])
    };
    n.exports = {formatDate: l, getDateFromStr: s, getDayString: i, addDay: a, now: c}
}), define("app/views/coupon/mockData", function (t, e, n) {
    n.exports = {
        api: "mtop.alimama.union.hsf.coupon.get",
        data: {
            message: "",
            result: {
                amount: "10",
                couponFlowLimit: "false",
                couponKey: "wgrbi07I9UziRzMiytwfIb8lhhMlKXkMj%2F01lr%2FZFB9LxERAsLKXAIgmyfFANNIqgPRfTgnhrZM%3D",
                effectiveEndTime: "2017-12-26 23:59:59",
                effectiveStartTime: "2017-12-20 00:00:00",
                privateCouponUrl: "//market.m.taobao.com/apps/aliyx/coupon/detail.html?sellerId=2964575958&activityId=9a1fafc340dc4f68b655b16509391581",
                retStatus: "0",
                shopLogo: "//img.alicdn.com/bao/uploaded//e3/63/TB15zVKSVXXXXbRXFXXSutbFXXX.jpg",
                shopName: "\u5361\u8299\u5170\u6d17\u62a4\u65d7\u8230\u5e97",
                startFee: "30",
                couponApplyStartTime: "2017-12-26 23:59:59",
                shopUrl: "//market.m.taobao.com/apps/aliyx/coupon/detail.html?sellerId=2964575958&activityId=9a1fafc340dc4f68b655b16509391581"
            },
            success: "true"
        },
        ret: ["SUCCESS::\u8c03\u7528\u6210\u529f"],
        v: "1.0"
    }
}), define("atom/magix/index", ["atom/zepto/index"], function (t) {
    var e, n = t("atom/zepto/index"), o = function (e, n) {
            if (e) if (window.seajs) seajs.use(e, n); else {
                var o = [];
                s(e) || (e = [e]);
                for (var i = 0; i < e.length; i++) o.push(t(e[i]));
                n && n.apply(g, o)
            } else n()
        }, i = function () {
        }, r = function (t, e, n, o, r) {
            return i[$] = e[$], r = new i, j(r, n), j(t, o), r.constructor = t, t[$] = r, t
        }, a = n.isPlainObject, s = n.isArray, c = function (t, e) {
            n(t).html(e)
        }, u = function (t, e, o, i) {
            e && !u[t] && (u[t] = 1, o = n(y + E), o.length ? (i = o.prop("styleSheet"), i ? i.cssText += e : o.append(e)) : n("head").append('<style id="' + E + '">' + e + "</style>"))
        }, l = 0, f = "", p = [], d = p.slice, h = function () {
        }, m = ",", g = null, v = window, w = document, y = "#", b = "", x = "object", $ = "prototype", C = /[#?].*$/,
        S = /([^=&?\/#]+)=?([^&#?]*)/g, _ = /(?!^)=|&/, O = function (t) {
            return (t || "mx_") + l++
        }, E = O(), k = O(), P = {
            rootId: O(), defaultView: k, error: function (t) {
                throw t
            }
        }, T = P.hasOwnProperty, A = function (t) {
            return typeof t == x ? t : w.getElementById(t)
        }, D = function (t, e, n) {
            if (t = A(t), e = A(e), t && e && (n = t == e, !n)) try {
                n = e.contains ? e.contains(t) : 16 & e.compareDocumentPosition(t)
            } catch (o) {
            }
            return n
        }, j = function (t, e, n) {
            for (n in e) t[n] = e[n];
            return t
        }, N = function (t, e, n, o, i, r) {
            for (s(t) || (t = [t]), s(e) || (e = [e]), o = 0; r = t[o]; o++) try {
                i = r && r.apply(n, e)
            } catch (a) {
                P.error(a)
            }
            return i
        }, L = function (t, e) {
            return t && T.call(t, e)
        }, I = function (t, e) {
            return e.f - t.f || e.t - t.t
        }, M = function (t, e, n, o) {
            o = this, o.c = [], o.b = 0 | e || 5, o.x = o.b + (t || 20), o.r = n
        };
    j(M[$], {
        get: function (t) {
            var e = this, n = e.c, o = n[b + t];
            return o && (o.f++, o.t = l++, o = o.v), o
        }, set: function (t, e) {
            var n = this, o = n.c, i = b + t, r = o[i], a = n.b;
            if (!r) {
                if (o.length >= n.x) for (o.sort(I); a--;) r = o.pop(), r.f > 0 && n.del(r.o);
                r = {o: t}, o.push(r), o[i] = r
            }
            r.v = e, r.f = 1, r.t = l++
        }, del: function (t) {
            t = b + t;
            var e = this.c, n = e[t], o = this.r;
            n && (n.f = -1, n.v = f, delete e[t], o && N(o, n.o, n))
        }, has: function (t) {
            return L(this.c, b + t)
        }
    });
    var U, X = new M, V = function (t, e, n) {
        try {
            n = decodeURIComponent(n)
        } catch (o) {
        }
        U[e] = n
    }, B = function (t) {
        var e, n = X.get(t);
        return n || (U = {}, e = t.replace(C, f), t == e && _.test(e) && (e = f), t.replace(e, f).replace(S, V), X.set(t, n = {
            a: e,
            b: U
        })), {path: n.a, params: j({}, n.b)}
    }, F = function (t, e, n) {
        var o, i, r, a = [];
        for (i in e) o = e[i] + f, (!n || o || L(n, i)) && (o = encodeURIComponent(o), a.push(r = i + "=" + o));
        return r && (t += (t && (~t.indexOf("?") ? "&" : "?")) + a.join("&")), t
    }, R = function (t, e) {
        var n, o, i, r = {};
        if (t && (i = t.length)) for (n = 0; i > n; n++) o = t[n], r[e && o ? o[e] : o] = e ? o : (0 | r[o]) + 1;
        return r
    }, z = Object.keys || function (t, e, n) {
        e = [];
        for (n in t) L(t, n) && e.push(n);
        return e
    }, J = {
        config: function (t, e) {
            return e = P, t && (e = a(t) ? j(e, t) : e[t]), e
        },
        boot: function (t) {
            j(P, t), o(P.exts, function () {
                ee().mountView(P.defaultView)
            })
        },
        toMap: R,
        toTry: N,
        toUrl: F,
        parseUrl: B,
        mix: j,
        has: L,
        keys: z,
        inside: D,
        node: A,
        applyStyle: u,
        guid: O,
        Cache: M
    }, G = "on", Y = {
        fire: function (t, e, n, o) {
            var i, r, a, s, c = b + t, u = this, l = u[c];
            if (e || (e = {}), e.type || (e.type = t), l) for (i = l.length, r = i - 1; i--;) a = o ? i : r - i, s = l[a], s.d ? (l.splice(a, 1), r--) : N(s.f, e, u);
            l = u[G + t], l && N(l, e, u), n && u.off(t)
        }, on: function (t, e) {
            var n = this, o = b + t, i = n[o] || (n[o] = []);
            i.push({f: e})
        }, off: function (t, e) {
            var n, o, i = b + t, r = this, a = r[i];
            if (e) {
                if (a) for (n = a.length; n--;) if (o = a[n], o.f == e && !o.d) {
                    o.d = 1;
                    break
                }
            } else delete r[i], delete r[G + t]
        }
    };
    J.Event = Y;
    var Z, q, W = /(\w+):\s*([^,\}]+)\s*/g, H = /(['"])(.*)\1/, Q = /^[\d\.]+$/, K = function (t, e, n) {
        t.$d || t.$h || t.$cc != t.$rc || (t.$cr || (t.$cr = 1, t.$ca = 0, t.fire("created")), e = t.id, n = ne[t.pId], n && !L(n.$r, e) && (n.$r[e] = 1, n.$rc++, K(n)))
    }, te = function (t, e, n, o) {
        e || (e = {}), !t.$ca && t.$cr && (t.$cr = 0, t.$ca = 1, t.fire("alter", e), n = t.id, o = ne[t.pId], o && L(o.$r, n) && (o.$rc--, delete o.$r[n], te(o, e)))
    }, ee = function (t, n) {
        return Z || (e = w.body, t = P.rootId, n = A(t), n || (e.id = t), Z = new ae(t)), Z
    }, ne = {}, oe = function (t, e) {
        L(ne, t) || (ne[t] = e, ae.fire("add", {vframe: e}), t = A(t), t && (t.vframe = e))
    }, ie = function (t, e, n) {
        for (e = t.$il; e.length;) n = e.shift(), n.r || t.invoke(n.n, n.a), delete e[n.k]
    }, re = function (t, e, n) {
        n = ne[t], n && (delete ne[t], ae.fire("remove", {vframe: n, fcc: e}), t = A(t), t && (t.vframe = g))
    }, ae = function (t, e, n) {
        n = this, n.id = t, n.$c = {}, n.$cc = 0, n.$rc = 0, n.$s = 1, n.$r = {}, n.$il = [], n.pId = e, oe(t, n)
    };
    j(ae, j({
        all: function () {
            return ne
        }, get: function (t) {
            return ne[t]
        }
    }, Y)), j(j(ae[$], Y), {
        mountView: function (t, e) {
            var n, i, r, a = this, s = A(a.id);
            !a.$a && s && (a.$a = 1, a.$t = s.innerHTML), a.unmountView(), a.$d = 0, s && t && (a.path = t, n = B(t), r = n.path, i = ++a.$s, o(r, function (t) {
                if (i == a.$s) {
                    t || P.error(Error("cannot load:" + r)), xe(t);
                    var o = n.params, c = j(o, e), u = s.getAttribute("mx-init");
                    if (u) {
                        var l = a.parent();
                        l = l && l.$v;
                        var f = {}, p = function (t) {
                            for (var e = t.split("."), n = l; e.length && n;) n = n[e.shift()];
                            return n
                        };
                        u.replace(W, function (t, e, n) {
                            t = n.match(H), n = t ? t[2] : Q.test(n) ? parseFloat(n) : p(n), f[e] = n
                        }), j(c, f)
                    }
                    r = new t({
                        owner: a,
                        id: a.id
                    }, c), a.$v = r, ye(r), r.init(c), r.render(), r.tmpl || r.$p || r.endUpdate()
                }
            }))
        }, unmountView: function () {
            var t, e, n = this, o = n.$v;
            n.$il = [], o && (q || (e = 1, q = {id: n.id}), n.$d = 1, n.unmountZone(0, 1), te(n, q), n.$v = 0, $e(o), t = A(n.id), t && n.$a && c(t, n.$t), e && (q = 0)), n.$s++
        }, mountVframe: function (t, e, n) {
            var o, i = this;
            return te(i), o = ne[t], o || (L(i.$c, t) || (i.$cl = f, i.$cc++), i.$c[t] = t, o = new ae(t, i.id)), o.mountView(e, n), o
        }, mountZone: function (t, e) {
            var o, i, r, a = this;
            t = t || a.id;
            var s = n(y + t + " [mx-view]");
            for (a.$h = 1, a.unmountZone(t, 1), o = s.length - 1; o >= 0; o--) i = s[o], r = i.id || (i.id = O()), a.mountVframe(r, i.getAttribute("mx-view"), e);
            a.$h = 0, K(a)
        }, unmountVframe: function (t, e) {
            var n, o, i, r = this;
            t = t ? r.$c[t] : r.id, n = ne[t], n && (o = n.$cr, i = n.pId, n.unmountView(), re(t, o), n.id = n.pId = f, n = ne[i], n && L(n.$c, t) && (delete n.$c[t], n.$cl = f, n.$cc--, e || K(n)))
        }, unmountZone: function (t, e) {
            var n, o = this, i = o.$c;
            for (n in i) (!t || n != t && D(n, t)) && o.unmountVframe(n, 1);
            e || K(o)
        }, parent: function (t, e) {
            for (e = this, t = t >>> 0 || 1; e && t--;) e = ne[e.pId];
            return e
        }, children: function (t) {
            return t = this, t.$cl || (t.$cl = z(t.$c))
        }, invoke: function (t, e) {
            var n, o, i, r, a, s, c = this;
            return (o = c.$v) && o.$p ? n = (i = o[t]) && N(i, e, o) : (a = c.$il, r = a[s = b + t], r && (r.r = 1), r = {
                n: t,
                a: e,
                k: s
            }, a.push(r), a[s] = r), n
        }
    }), J.Vframe = ae;
    var se = function (t, e) {
        e = t.data, N(e.f, t, e.v)
    }, ce = function (t, e, o, i, r, a) {
        i ? n(t).off(e, r, o) : n(t).on(e, r, a, o)
    }, ue = "parentNode", le = new M(30, 10), fe = /([^\(]+)\(([\s\S]*)?\)/, pe = {}, de = function (t) {
        for (var n, o, i, r, a, s, c, u, l, f, d = t.target, h = t.type, m = "mx-" + h, g = []; d != e && 1 == d.nodeType;) {
            if (n = d.getAttribute(m)) {
                if (g = [], a = d.$f, !a) for (s = d; s = s[ue];) if (L(ne, c = s.id)) {
                    d.$f = a = c;
                    break
                }
                a ? (i = ne[a], r = i && i.$v, r && r.$s > 0 && (u = le.get(n), u || (u = n.match(fe) || p, u = {
                    n: u[1],
                    i: u[2]
                }, u.p = u.i && N(Function("return " + u.i)) || {}, le.set(n, u)), l = u.n + b + h, f = r[l], f && (t.current = d, t.currentTarget = d, t.params = u.p, N(f, t, r)))) : P.error(Error("bad:" + n))
            }
            if ((o = d.$) && o[h] || t.mxStop || t.isPropagationStopped()) break;
            g.push(d), d = d[ue] || e
        }
        for (; d = g.pop();) o = d.$ || (d.$ = {}), o[h] = 1
    }, he = function (t, n) {
        var o = 0 | pe[t], i = o > 0 ? 1 : 0;
        o += n ? -i : i, o || (ce(e, t, de, n), n || (o = 1)), pe[t] = o
    }, me = /^(\$?)([^<]+)<([^>]+)>$/, ge = function (t, e) {
        var n, o, i = t.$r;
        for (n in i) o = i[n], (e || o.x) && ve(i, n, 1)
    }, ve = function (t, e, n) {
        var o, i, r = t[e];
        return r && (i = r.e, o = i.destroy, o && n && N(o, p, i), delete t[e]), i
    }, we = function (t, e, n) {
        e = t.render, t.render = function () {
            n = this, n.$s > 0 && (n.$s++, n.fire("rendercall"), ge(n), N(e, d.call(arguments), n))
        }
    }, ye = function (t, e) {
        var n, o, i = t.$eo;
        for (n in i) he(n, e);
        for (i = t.$el, n = i.length; n--;) o = i[n], ce(o.e || y + t.id, o.n, se, e, o.s, {v: t, f: o.f})
    }, be = {win: v, doc: w}, xe = function (t) {
        if (!t[b]) {
            t[b] = 1;
            var e, n, o, i, r, a, s, c, u = t[$], l = {}, f = [];
            for (s in u) if (e = u[s], n = s.match(me)) for (a = n[1], o = n[2], i = n[3].split(m); c = i.pop();) a ? (r = be[o], f.push({
                f: e,
                s: r ? g : o,
                n: c,
                e: r
            })) : (l[c] = 1, u[o + b + c] = e);
            we(u), u.$eo = l, u.$el = f
        }
    }, $e = function (t) {
        t.$s > 0 && (t.$s = 0, t.fire("destroy", 0, 1, 1), ge(t, 1), ye(t, 1)), t.$s--
    }, Ce = function (t, e) {
        e = this, j(e, t), e.$r = {}, e.$s = 1
    }, Se = Ce[$];
    j(Ce, {
        extend: function (t, e) {
            var n = this;
            t = t || {};
            var o = t.ctor, i = function (t, e) {
                n.call(this, t, e), o && o.call(this, e)
            };
            return i.extend = n.extend, r(i, n, t, e)
        }
    }), j(j(Se, Y), {
        render: h, init: h, beginUpdate: function (t, e) {
            e = this, e.$s > 0 && e.$p && e.owner.unmountZone(t, 1)
        }, endUpdate: function (t, e, n, o) {
            e = this, e.$s > 0 && (o = e.$p, e.$p = 1, n = e.owner, n.mountZone(t), o || ie(n))
        }, wrapAsync: function (t, e) {
            var n = this, o = n.$s;
            return function () {
                o > 0 && o == n.$s && t && t.apply(e || n, arguments)
            }
        }, capture: function (t, e, n, o, i) {
            return o = this.$r, e ? (ve(o, t, 1), i = {e: e, x: n}, o[t] = i) : (i = o[t], e = i && i.e || e), e
        }, release: function (t, e) {
            return ve(this.$r, t, e)
        }, setHTML: function (t, e) {
            var n, o = this;
            o.beginUpdate(t), o.$s > 0 && (n = A(t), n && c(n, e)), o.endUpdate(t)
        }
    }), J.View = Ce;
    var _e = function (t, e) {
        var n = this, o = t && t.ctor, i = function () {
            var t = this, e = arguments;
            n.apply(t, e), o && o.apply(t, e)
        };
        return i.extend = _e, r(i, n, t, e)
    };
    return j(h[$], Y), h.extend = _e, J.Base = h, define(k, function () {
        return Ce.extend()
    }), J
}), define("atom/zepto/index", function (t, e, n) {
    var o = function () {
        function t(t) {
            return null == t ? String(t) : Z[q.call(t)] || "object"
        }

        function e(e) {
            return "function" == t(e)
        }

        function n(t) {
            return null != t && t == t.window
        }

        function o(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE
        }

        function i(e) {
            return "object" == t(e)
        }

        function r(t) {
            return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
        }

        function a(t) {
            return "number" == typeof t.length
        }

        function s(t) {
            return T.call(t, function (t) {
                return null != t
            })
        }

        function c(t) {
            return t.length > 0 ? S.fn.concat.apply([], t) : t
        }

        function u(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }

        function l(t) {
            return t in N ? N[t] : N[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }

        function f(t, e) {
            return "number" != typeof e || L[u(t)] ? e : e + "px"
        }

        function p(t) {
            var e, n;
            return j[t] || (e = D.createElement(t), D.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), j[t] = n), j[t]
        }

        function d(t) {
            return "children" in t ? A.call(t.children) : S.map(t.childNodes, function (t) {
                return 1 == t.nodeType ? t : void 0
            })
        }

        function h(t, e) {
            var n, o = t ? t.length : 0;
            for (n = 0; o > n; n++) this[n] = t[n];
            this.length = o, this.selector = e || ""
        }

        function m(t, e, n) {
            for (C in e) n && (r(e[C]) || K(e[C])) ? (r(e[C]) && !r(t[C]) && (t[C] = {}), K(e[C]) && !K(t[C]) && (t[C] = []), m(t[C], e[C], n)) : e[C] !== $ && (t[C] = e[C])
        }

        function g(t, e) {
            return null == e ? S(t) : S(t).filter(e)
        }

        function v(t, n, o, i) {
            return e(n) ? n.call(t, o, i) : n
        }

        function w(t, e, n) {
            null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
        }

        function y(t, e) {
            var n = t.className || "", o = n && n.baseVal !== $;
            return e === $ ? o ? n.baseVal : n : void(o ? n.baseVal = e : t.className = e)
        }

        function b(t) {
            try {
                return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? S.parseJSON(t) : t) : t
            } catch (e) {
                return t
            }
        }

        function x(t, e) {
            e(t);
            for (var n = 0, o = t.childNodes.length; o > n; n++) x(t.childNodes[n], e)
        }

        var $, C, S, _, O, E, k = [], P = k.concat, T = k.filter, A = k.slice, D = window.document, j = {}, N = {},
            L = {"column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1},
            I = /^\s*<(\w+|!)[^>]*>/, M = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            U = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, X = /^(?:body|html)$/i,
            V = /([A-Z])/g, B = ["val", "css", "html", "text", "data", "width", "height", "offset"],
            F = ["after", "prepend", "before", "append"], R = D.createElement("table"), z = D.createElement("tr"),
            J = {tr: D.createElement("tbody"), tbody: R, thead: R, tfoot: R, td: z, th: z, "*": D.createElement("div")},
            G = /complete|loaded|interactive/, Y = /^[\w-]*$/, Z = {}, q = Z.toString, W = {},
            H = D.createElement("div"), Q = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            }, K = Array.isArray || function (t) {
                return t instanceof Array
            };
        return W.matches = function (t, e) {
            if (!e || !t || 1 !== t.nodeType) return !1;
            var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (n) return n.call(t, e);
            var o, i = t.parentNode, r = !i;
            return r && (i = H).appendChild(t), o = ~W.qsa(i, e).indexOf(t), r && H.removeChild(t), o
        }, O = function (t) {
            return t.replace(/-+(.)?/g, function (t, e) {
                return e ? e.toUpperCase() : ""
            })
        }, E = function (t) {
            return T.call(t, function (e, n) {
                return t.indexOf(e) == n
            })
        }, W.fragment = function (t, e, n) {
            var o, i, a;
            return M.test(t) && (o = S(D.createElement(RegExp.$1))), o || (t.replace && (t = t.replace(U, "<$1></$2>")), e === $ && (e = I.test(t) && RegExp.$1), e in J || (e = "*"), a = J[e], a.innerHTML = "" + t, o = S.each(A.call(a.childNodes), function () {
                a.removeChild(this)
            })), r(n) && (i = S(o), S.each(n, function (t, e) {
                B.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
            })), o
        }, W.Z = function (t, e) {
            return new h(t, e)
        }, W.isZ = function (t) {
            return t instanceof W.Z
        }, W.init = function (t, n) {
            var o;
            if (!t) return W.Z();
            if ("string" == typeof t) if (t = t.trim(), "<" == t[0] && I.test(t)) o = W.fragment(t, RegExp.$1, n), t = null; else {
                if (n !== $) return S(n).find(t);
                o = W.qsa(D, t)
            } else {
                if (e(t)) return S(D).ready(t);
                if (W.isZ(t)) return t;
                if (K(t)) o = s(t); else if (i(t)) o = [t], t = null; else if (I.test(t)) o = W.fragment(t.trim(), RegExp.$1, n), t = null; else {
                    if (n !== $) return S(n).find(t);
                    o = W.qsa(D, t)
                }
            }
            return W.Z(o, t)
        }, S = function (t, e) {
            return W.init(t, e)
        }, S.extend = function (t) {
            var e, n = A.call(arguments, 1);
            return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
                m(t, n, e)
            }), t
        }, W.qsa = function (t, e) {
            var n, o = "#" == e[0], i = !o && "." == e[0], r = o || i ? e.slice(1) : e, a = Y.test(r);
            return t.getElementById && a && o ? (n = t.getElementById(r)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : A.call(a && !o && t.getElementsByClassName ? i ? t.getElementsByClassName(r) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        }, S.contains = D.documentElement.contains ? function (t, e) {
            return t !== e && t.contains(e)
        } : function (t, e) {
            for (; e && (e = e.parentNode);) if (e === t) return !0;
            return !1
        }, S.type = t, S.isFunction = e, S.isWindow = n, S.isArray = K, S.isPlainObject = r, S.isEmptyObject = function (t) {
            var e;
            for (e in t) return !1;
            return !0
        }, S.inArray = function (t, e, n) {
            return k.indexOf.call(e, t, n)
        }, S.camelCase = O, S.trim = function (t) {
            return null == t ? "" : String.prototype.trim.call(t)
        }, S.uuid = 0, S.support = {}, S.expr = {}, S.noop = function () {
        }, S.map = function (t, e) {
            var n, o, i, r = [];
            if (a(t)) for (o = 0; o < t.length; o++) n = e(t[o], o), null != n && r.push(n); else for (i in t) n = e(t[i], i), null != n && r.push(n);
            return c(r)
        }, S.each = function (t, e) {
            var n, o;
            if (a(t)) {
                for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t
            } else for (o in t) if (e.call(t[o], o, t[o]) === !1) return t;
            return t
        }, S.grep = function (t, e) {
            return T.call(t, e)
        }, window.JSON && (S.parseJSON = JSON.parse), S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
            Z["[object " + e + "]"] = e.toLowerCase()
        }), S.fn = {
            constructor: W.Z,
            length: 0,
            forEach: k.forEach,
            reduce: k.reduce,
            push: k.push,
            sort: k.sort,
            splice: k.splice,
            indexOf: k.indexOf,
            concat: function () {
                var t, e, n = [];
                for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = W.isZ(e) ? e.toArray() : e;
                return P.apply(W.isZ(this) ? this.toArray() : this, n)
            },
            map: function (t) {
                return S(S.map(this, function (e, n) {
                    return t.call(e, n, e)
                }))
            },
            slice: function () {
                return S(A.apply(this, arguments))
            },
            ready: function (t) {
                return G.test(D.readyState) && D.body ? t(S) : D.addEventListener("DOMContentLoaded", function () {
                    t(S)
                }, !1), this
            },
            get: function (t) {
                return t === $ ? A.call(this) : this[t >= 0 ? t : t + this.length]
            },
            toArray: function () {
                return this.get()
            },
            size: function () {
                return this.length
            },
            remove: function () {
                return this.each(function () {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function (t) {
                return k.every.call(this, function (e, n) {
                    return t.call(e, n, e) !== !1
                }), this
            },
            filter: function (t) {
                return e(t) ? this.not(this.not(t)) : S(T.call(this, function (e) {
                    return W.matches(e, t)
                }))
            },
            add: function (t, e) {
                return S(E(this.concat(S(t, e))))
            },
            is: function (t) {
                return this.length > 0 && W.matches(this[0], t)
            },
            not: function (t) {
                var n = [];
                if (e(t) && t.call !== $) this.each(function (e) {
                    t.call(this, e) || n.push(this)
                }); else {
                    var o = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? A.call(t) : S(t);
                    this.forEach(function (t) {
                        o.indexOf(t) < 0 && n.push(t)
                    })
                }
                return S(n)
            },
            has: function (t) {
                return this.filter(function () {
                    return i(t) ? S.contains(this, t) : S(this).find(t).size()
                })
            },
            eq: function (t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function () {
                var t = this[0];
                return t && !i(t) ? t : S(t)
            },
            last: function () {
                var t = this[this.length - 1];
                return t && !i(t) ? t : S(t)
            },
            find: function (t) {
                var e, n = this;
                return e = t ? "object" == typeof t ? S(t).filter(function () {
                    var t = this;
                    return k.some.call(n, function (e) {
                        return S.contains(e, t)
                    })
                }) : 1 == this.length ? S(W.qsa(this[0], t)) : this.map(function () {
                    return W.qsa(this, t)
                }) : S()
            },
            closest: function (t, e) {
                var n = this[0], i = !1;
                for ("object" == typeof t && (i = S(t)); n && !(i ? i.indexOf(n) >= 0 : W.matches(n, t));) n = n !== e && !o(n) && n.parentNode;
                return S(n)
            },
            parents: function (t) {
                for (var e = [], n = this; n.length > 0;) n = S.map(n, function (t) {
                    return (t = t.parentNode) && !o(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
                });
                return g(e, t)
            },
            parent: function (t) {
                return g(E(this.pluck("parentNode")), t)
            },
            children: function (t) {
                return g(this.map(function () {
                    return d(this)
                }), t)
            },
            contents: function () {
                return this.map(function () {
                    return this.contentDocument || A.call(this.childNodes)
                })
            },
            siblings: function (t) {
                return g(this.map(function (t, e) {
                    return T.call(d(e.parentNode), function (t) {
                        return t !== e
                    })
                }), t)
            },
            empty: function () {
                return this.each(function () {
                    this.innerHTML = ""
                })
            },
            pluck: function (t) {
                return S.map(this, function (e) {
                    return e[t]
                })
            },
            show: function () {
                return this.each(function () {
                    "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName))
                })
            },
            replaceWith: function (t) {
                return this.before(t).remove()
            },
            wrap: function (t) {
                var n = e(t);
                if (this[0] && !n) var o = S(t).get(0), i = o.parentNode || this.length > 1;
                return this.each(function (e) {
                    S(this).wrapAll(n ? t.call(this, e) : i ? o.cloneNode(!0) : o)
                })
            },
            wrapAll: function (t) {
                if (this[0]) {
                    S(this[0]).before(t = S(t));
                    for (var e; (e = t.children()).length;) t = e.first();
                    S(t).append(this)
                }
                return this
            },
            wrapInner: function (t) {
                var n = e(t);
                return this.each(function (e) {
                    var o = S(this), i = o.contents(), r = n ? t.call(this, e) : t;
                    i.length ? i.wrapAll(r) : o.append(r)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    S(this).replaceWith(S(this).children())
                }), this
            },
            clone: function () {
                return this.map(function () {
                    return this.cloneNode(!0)
                })
            },
            hide: function () {
                return this.css("display", "none")
            },
            toggle: function (t) {
                return this.each(function () {
                    var e = S(this);
                    (t === $ ? "none" == e.css("display") : t) ? e.show() : e.hide()
                })
            },
            prev: function (t) {
                return S(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function (t) {
                return S(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function (t) {
                return 0 in arguments ? this.each(function (e) {
                    var n = this.innerHTML;
                    S(this).empty().append(v(this, t, e, n))
                }) : 0 in this ? this[0].innerHTML : null
            },
            text: function (t) {
                return 0 in arguments ? this.each(function (e) {
                    var n = v(this, t, e, this.textContent);
                    this.textContent = null == n ? "" : "" + n
                }) : 0 in this ? this[0].textContent : null
            },
            attr: function (t, e) {
                var n;
                return "string" != typeof t || 1 in arguments ? this.each(function (n) {
                    if (1 === this.nodeType) if (i(t)) for (C in t) w(this, C, t[C]); else w(this, t, v(this, e, n, this.getAttribute(t)))
                }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : $
            },
            removeAttr: function (t) {
                return this.each(function () {
                    1 === this.nodeType && t.split(" ").forEach(function (t) {
                        w(this, t)
                    }, this)
                })
            },
            prop: function (t, e) {
                return t = Q[t] || t, 1 in arguments ? this.each(function (n) {
                    this[t] = v(this, e, n, this[t])
                }) : this[0] && this[0][t]
            },
            data: function (t, e) {
                var n = "data-" + t.replace(V, "-$1").toLowerCase(),
                    o = 1 in arguments ? this.attr(n, e) : this.attr(n);
                return null !== o ? b(o) : $
            },
            val: function (t) {
                return 0 in arguments ? this.each(function (e) {
                    this.value = v(this, t, e, this.value)
                }) : this[0] && (this[0].multiple ? S(this[0]).find("option").filter(function () {
                    return this.selected
                }).pluck("value") : this[0].value)
            },
            offset: function (t) {
                if (t) return this.each(function (e) {
                    var n = S(this), o = v(this, t, e, n.offset()), i = n.offsetParent().offset(),
                        r = {top: o.top - i.top, left: o.left - i.left};
                    "static" == n.css("position") && (r.position = "relative"), n.css(r)
                });
                if (!this.length) return null;
                if (!S.contains(D.documentElement, this[0])) return {top: 0, left: 0};
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: Math.round(e.width),
                    height: Math.round(e.height)
                }
            },
            css: function (e, n) {
                if (arguments.length < 2) {
                    var o, i = this[0];
                    if (!i) return;
                    if (o = getComputedStyle(i, ""), "string" == typeof e) return i.style[O(e)] || o.getPropertyValue(e);
                    if (K(e)) {
                        var r = {};
                        return S.each(e, function (t, e) {
                            r[e] = i.style[O(e)] || o.getPropertyValue(e)
                        }), r
                    }
                }
                var a = "";
                if ("string" == t(e)) n || 0 === n ? a = u(e) + ":" + f(e, n) : this.each(function () {
                    this.style.removeProperty(u(e))
                }); else for (C in e) e[C] || 0 === e[C] ? a += u(C) + ":" + f(C, e[C]) + ";" : this.each(function () {
                    this.style.removeProperty(u(C))
                });
                return this.each(function () {
                    this.style.cssText += ";" + a
                })
            },
            index: function (t) {
                return t ? this.indexOf(S(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function (t) {
                return t ? k.some.call(this, function (t) {
                    return this.test(y(t))
                }, l(t)) : !1
            },
            addClass: function (t) {
                return t ? this.each(function (e) {
                    if ("className" in this) {
                        _ = [];
                        var n = y(this), o = v(this, t, e, n);
                        o.split(/\s+/g).forEach(function (t) {
                            S(this).hasClass(t) || _.push(t)
                        }, this), _.length && y(this, n + (n ? " " : "") + _.join(" "))
                    }
                }) : this
            },
            removeClass: function (t) {
                return this.each(function (e) {
                    if ("className" in this) {
                        if (t === $) return y(this, "");
                        _ = y(this), v(this, t, e, _).split(/\s+/g).forEach(function (t) {
                            _ = _.replace(l(t), " ")
                        }), y(this, _.trim())
                    }
                })
            },
            toggleClass: function (t, e) {
                return t ? this.each(function (n) {
                    var o = S(this), i = v(this, t, n, y(this));
                    i.split(/\s+/g).forEach(function (t) {
                        (e === $ ? !o.hasClass(t) : e) ? o.addClass(t) : o.removeClass(t)
                    })
                }) : this
            },
            scrollTop: function (t) {
                if (this.length) {
                    var e = "scrollTop" in this[0];
                    return t === $ ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function () {
                        this.scrollTop = t
                    } : function () {
                        this.scrollTo(this.scrollX, t)
                    })
                }
            },
            scrollLeft: function (t) {
                if (this.length) {
                    var e = "scrollLeft" in this[0];
                    return t === $ ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function () {
                        this.scrollLeft = t
                    } : function () {
                        this.scrollTo(t, this.scrollY)
                    })
                }
            },
            position: function () {
                if (this.length) {
                    var t = this[0], e = this.offsetParent(), n = this.offset(),
                        o = X.test(e[0].nodeName) ? {top: 0, left: 0} : e.offset();
                    return n.top -= parseFloat(S(t).css("margin-top")) || 0, n.left -= parseFloat(S(t).css("margin-left")) || 0, o.top += parseFloat(S(e[0]).css("border-top-width")) || 0, o.left += parseFloat(S(e[0]).css("border-left-width")) || 0, {
                        top: n.top - o.top,
                        left: n.left - o.left
                    }
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent || D.body; t && !X.test(t.nodeName) && "static" == S(t).css("position");) t = t.offsetParent;
                    return t
                })
            }
        }, S.fn.detach = S.fn.remove, ["width", "height"].forEach(function (t) {
            var e = t.replace(/./, function (t) {
                return t[0].toUpperCase()
            });
            S.fn[t] = function (i) {
                var r, a = this[0];
                return i === $ ? n(a) ? a["inner" + e] : o(a) ? a.documentElement["scroll" + e] : (r = this.offset()) && r[t] : this.each(function (e) {
                    a = S(this), a.css(t, v(this, i, e, a[t]()))
                })
            }
        }), F.forEach(function (e, n) {
            var o = n % 2;
            S.fn[e] = function () {
                var e, i, r = S.map(arguments, function (n) {
                    return e = t(n), "object" == e || "array" == e || null == n ? n : W.fragment(n)
                }), a = this.length > 1;
                return r.length < 1 ? this : this.each(function (t, e) {
                    i = o ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
                    var s = S.contains(D.documentElement, i);
                    r.forEach(function (t) {
                        if (a) t = t.cloneNode(!0); else if (!i) return S(t).remove();
                        i.insertBefore(t, e), s && x(t, function (t) {
                            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                        })
                    })
                })
            }, S.fn[o ? e + "To" : "insert" + (n ? "Before" : "After")] = function (t) {
                return S(t)[e](this), this
            }
        }), W.Z.prototype = h.prototype = S.fn, W.uniq = E, W.deserializeValue = b, S.zepto = W, S
    }();
    window.Zepto = o, void 0 === window.$ && (window.$ = o), function (t) {
        function e(t) {
            return t._zid || (t._zid = p++)
        }

        function n(t, n, r, a) {
            if (n = o(n), n.ns) var s = i(n.ns);
            return (g[e(t)] || []).filter(function (t) {
                return !(!t || n.e && t.e != n.e || n.ns && !s.test(t.ns) || r && e(t.fn) !== e(r) || a && t.sel != a)
            })
        }

        function o(t) {
            var e = ("" + t).split(".");
            return {e: e[0], ns: e.slice(1).sort().join(" ")}
        }

        function i(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }

        function r(t, e) {
            return t.del && !w && t.e in y || !!e
        }

        function a(t) {
            return b[t] || w && y[t] || t
        }

        function s(n, i, s, c, l, p, d) {
            var h = e(n), m = g[h] || (g[h] = []);
            i.split(/\s/).forEach(function (e) {
                if ("ready" == e) return t(document).ready(s);
                var i = o(e);
                i.fn = s, i.sel = l, i.e in b && (s = function (e) {
                    var n = e.relatedTarget;
                    return !n || n !== this && !t.contains(this, n) ? i.fn.apply(this, arguments) : void 0
                }), i.del = p;
                var h = p || s;
                i.proxy = function (t) {
                    if (t = u(t), !t.isImmediatePropagationStopped()) {
                        t.data = c;
                        var e = h.apply(n, t._args == f ? [t] : [t].concat(t._args));
                        return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                    }
                }, i.i = m.length, m.push(i), "addEventListener" in n && n.addEventListener(a(i.e), i.proxy, r(i, d))
            })
        }

        function c(t, o, i, s, c) {
            var u = e(t);
            (o || "").split(/\s/).forEach(function (e) {
                n(t, e, i, s).forEach(function (e) {
                    delete g[u][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, r(e, c))
                })
            })
        }

        function u(e, n) {
            return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(S, function (t, o) {
                var i = n[t];
                e[t] = function () {
                    return this[o] = x, i && i.apply(n, arguments)
                }, e[o] = $
            }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = x)), e
        }

        function l(t) {
            var e, n = {originalEvent: t};
            for (e in t) C.test(e) || t[e] === f || (n[e] = t[e]);
            return u(n, t)
        }

        var f, p = 1, d = Array.prototype.slice, h = t.isFunction, m = function (t) {
                return "string" == typeof t
            }, g = {}, v = {}, w = "onfocusin" in window, y = {focus: "focusin", blur: "focusout"},
            b = {mouseenter: "mouseover", mouseleave: "mouseout"};
        v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", t.event = {
            add: s,
            remove: c
        }, t.proxy = function (n, o) {
            var i = 2 in arguments && d.call(arguments, 2);
            if (h(n)) {
                var r = function () {
                    return n.apply(o, i ? i.concat(d.call(arguments)) : arguments)
                };
                return r._zid = e(n), r
            }
            if (m(o)) return i ? (i.unshift(n[o], n), t.proxy.apply(null, i)) : t.proxy(n[o], n);
            throw new TypeError("expected function")
        }, t.fn.bind = function (t, e, n) {
            return this.on(t, e, n)
        }, t.fn.unbind = function (t, e) {
            return this.off(t, e)
        }, t.fn.one = function (t, e, n, o) {
            return this.on(t, e, n, o, 1)
        };
        var x = function () {
            return !0
        }, $ = function () {
            return !1
        }, C = /^([A-Z]|returnValue$|layer[XY]$)/, S = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        t.fn.delegate = function (t, e, n) {
            return this.on(e, t, n)
        }, t.fn.undelegate = function (t, e, n) {
            return this.off(e, t, n)
        }, t.fn.live = function (e, n) {
            return t(document.body).delegate(this.selector, e, n), this
        }, t.fn.die = function (e, n) {
            return t(document.body).undelegate(this.selector, e, n), this
        }, t.fn.on = function (e, n, o, i, r) {
            var a, u, p = this;
            return e && !m(e) ? (t.each(e, function (t, e) {
                p.on(t, n, o, e, r)
            }), p) : (m(n) || h(i) || i === !1 || (i = o, o = n, n = f), (i === f || o === !1) && (i = o, o = f), i === !1 && (i = $), p.each(function (f, p) {
                r && (a = function (t) {
                    return c(p, t.type, i), i.apply(this, arguments)
                }), n && (u = function (e) {
                    var o, r = t(e.target).closest(n, p).get(0);
                    return r && r !== p ? (o = t.extend(l(e), {
                        currentTarget: r,
                        liveFired: p
                    }), (a || i).apply(r, [o].concat(d.call(arguments, 1)))) : void 0
                }), s(p, e, i, o, n, u || a)
            }))
        }, t.fn.off = function (e, n, o) {
            var i = this;
            return e && !m(e) ? (t.each(e, function (t, e) {
                i.off(t, n, e)
            }), i) : (m(n) || h(o) || o === !1 || (o = n, n = f), o === !1 && (o = $), i.each(function () {
                c(this, e, o, n)
            }))
        }, t.fn.trigger = function (e, n) {
            return e = m(e) || t.isPlainObject(e) ? t.Event(e) : u(e), e._args = n, this.each(function () {
                e.type in y && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
            })
        }, t.fn.triggerHandler = function (e, o) {
            var i, r;
            return this.each(function (a, s) {
                i = l(m(e) ? t.Event(e) : e), i._args = o, i.target = s, t.each(n(s, e.type || e), function (t, e) {
                    return r = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0
                })
            }), r
        }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
            t.fn[e] = function (t) {
                return 0 in arguments ? this.bind(e, t) : this.trigger(e)
            }
        }), t.Event = function (t, e) {
            m(t) || (e = t, t = e.type);
            var n = document.createEvent(v[t] || "Events"), o = !0;
            if (e) for (var i in e) "bubbles" == i ? o = !!e[i] : n[i] = e[i];
            return n.initEvent(t, o, !0), u(n)
        }
    }(o), function (t) {
        function e(e, n, o) {
            var i = t.Event(n);
            return t(e).trigger(i, o), !i.isDefaultPrevented()
        }

        function n(t, n, o, i) {
            return t.global ? e(n || w, o, i) : void 0
        }

        function o(e) {
            e.global && 0 === t.active++ && n(e, null, "ajaxStart")
        }

        function i(e) {
            e.global && !--t.active && n(e, null, "ajaxStop")
        }

        function r(t, e) {
            var o = e.context;
            return e.beforeSend.call(o, t, e) === !1 || n(e, o, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, o, "ajaxSend", [t, e])
        }

        function a(t, e, o, i) {
            var r = o.context, a = "success";
            o.success.call(r, t, a, e), i && i.resolveWith(r, [t, a, e]), n(o, r, "ajaxSuccess", [e, o, t]), c(a, e, o)
        }

        function s(t, e, o, i, r) {
            var a = i.context;
            i.error.call(a, o, e, t), r && r.rejectWith(a, [o, e, t]), n(i, a, "ajaxError", [o, i, t || e]), c(e, o, i)
        }

        function c(t, e, o) {
            var r = o.context;
            o.complete.call(r, e, t), n(o, r, "ajaxComplete", [e, o]), i(o)
        }

        function u() {
        }

        function l(t) {
            return t && (t = t.split(";", 2)[0]), t && (t == C ? "html" : t == $ ? "json" : b.test(t) ? "script" : x.test(t) && "xml") || "text"
        }

        function f(t, e) {
            return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }

        function p(e) {
            e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0)
        }

        function d(e, n, o, i) {
            return t.isFunction(n) && (i = o, o = n, n = void 0), t.isFunction(o) || (i = o, o = void 0), {
                url: e,
                data: n,
                success: o,
                dataType: i
            }
        }

        function h(e, n, o, i) {
            var r, a = t.isArray(n), s = t.isPlainObject(n);
            t.each(n, function (n, c) {
                r = t.type(c), i && (n = o ? i : i + "[" + (s || "object" == r || "array" == r ? n : "") + "]"), !i && a ? e.add(c.name, c.value) : "array" == r || !o && "object" == r ? h(e, c, o, n) : e.add(n, c)
            })
        }

        var m, g, v = 0, w = window.document, y = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            b = /^(?:text|application)\/javascript/i, x = /^(?:text|application)\/xml/i, $ = "application/json",
            C = "text/html", S = /^\s*$/, _ = w.createElement("a");
        _.href = window.location.href, t.active = 0, t.ajaxJSONP = function (e, n) {
            if (!("type" in e)) return t.ajax(e);
            var o, i, c = e.jsonpCallback, u = (t.isFunction(c) ? c() : c) || "jsonp" + ++v,
                l = w.createElement("script"), f = window[u], p = function (e) {
                    t(l).triggerHandler("error", e || "abort")
                }, d = {abort: p};
            return n && n.promise(d), t(l).on("load error", function (r, c) {
                clearTimeout(i), t(l).off().remove(), "error" != r.type && o ? a(o[0], d, e, n) : s(null, c || "error", d, e, n), window[u] = f, o && t.isFunction(f) && f(o[0]), f = o = void 0
            }), r(d, e) === !1 ? (p("abort"), d) : (window[u] = function () {
                o = arguments
            }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + u), w.head.appendChild(l), e.timeout > 0 && (i = setTimeout(function () {
                p("timeout")
            }, e.timeout)), d)
        }, t.ajaxSettings = {
            type: "GET",
            beforeSend: u,
            success: u,
            error: u,
            complete: u,
            context: null,
            global: !0,
            xhr: function () {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: $,
                xml: "application/xml, text/xml",
                html: C,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0
        }, t.ajax = function (e) {
            var n, i = t.extend({}, e || {}), c = t.Deferred && t.Deferred();
            for (m in t.ajaxSettings) void 0 === i[m] && (i[m] = t.ajaxSettings[m]);
            o(i), i.crossDomain || (n = w.createElement("a"), n.href = i.url, n.href = n.href, i.crossDomain = _.protocol + "//" + _.host != n.protocol + "//" + n.host), i.url || (i.url = window.location.toString()), p(i);
            var d = i.dataType, h = /\?.+=\?/.test(i.url);
            if (h && (d = "jsonp"), i.cache !== !1 && (e && e.cache === !0 || "script" != d && "jsonp" != d) || (i.url = f(i.url, "_=" + Date.now())), "jsonp" == d) return h || (i.url = f(i.url, i.jsonp ? i.jsonp + "=?" : i.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(i, c);
            var v, y = i.accepts[d], b = {}, x = function (t, e) {
                    b[t.toLowerCase()] = [t, e]
                }, $ = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1 : window.location.protocol, C = i.xhr(),
                O = C.setRequestHeader;
            if (c && c.promise(C), i.crossDomain || x("X-Requested-With", "XMLHttpRequest"), x("Accept", y || "*/*"), (y = i.mimeType || y) && (y.indexOf(",") > -1 && (y = y.split(",", 2)[0]), C.overrideMimeType && C.overrideMimeType(y)), (i.contentType || i.contentType !== !1 && i.data && "GET" != i.type.toUpperCase()) && x("Content-Type", i.contentType || "application/x-www-form-urlencoded"), i.headers) for (g in i.headers) x(g, i.headers[g]);
            if (C.setRequestHeader = x, C.onreadystatechange = function () {
                if (4 == C.readyState) {
                    C.onreadystatechange = u, clearTimeout(v);
                    var e, n = !1;
                    if (C.status >= 200 && C.status < 300 || 304 == C.status || 0 == C.status && "file:" == $) {
                        d = d || l(i.mimeType || C.getResponseHeader("content-type")), e = C.responseText;
                        try {
                            "script" == d ? (1, eval)(e) : "xml" == d ? e = C.responseXML : "json" == d && (e = S.test(e) ? null : t.parseJSON(e))
                        } catch (o) {
                            n = o
                        }
                        n ? s(n, "parsererror", C, i, c) : a(e, C, i, c)
                    } else s(C.statusText || null, C.status ? "error" : "abort", C, i, c)
                }
            }, r(C, i) === !1) return C.abort(), s(null, "abort", C, i, c), C;
            if (i.xhrFields) for (g in i.xhrFields) C[g] = i.xhrFields[g];
            var E = "async" in i ? i.async : !0;
            C.open(i.type, i.url, E, i.username, i.password);
            for (g in b) O.apply(C, b[g]);
            return i.timeout > 0 && (v = setTimeout(function () {
                C.onreadystatechange = u, C.abort(), s(null, "timeout", C, i, c)
            }, i.timeout)), C.send(i.data ? i.data : null), C
        }, t.get = function () {
            return t.ajax(d.apply(null, arguments))
        }, t.post = function () {
            var e = d.apply(null, arguments);
            return e.type = "POST", t.ajax(e)
        }, t.getJSON = function () {
            var e = d.apply(null, arguments);
            return e.dataType = "json", t.ajax(e)
        }, t.fn.load = function (e, n, o) {
            if (!this.length) return this;
            var i, r = this, a = e.split(/\s/), s = d(e, n, o), c = s.success;
            return a.length > 1 && (s.url = a[0], i = a[1]), s.success = function (e) {
                r.html(i ? t("<div>").html(e.replace(y, "")).find(i) : e), c && c.apply(r, arguments)
            }, t.ajax(s), this
        };
        var O = encodeURIComponent;
        t.param = function (e, n) {
            var o = [];
            return o.add = function (e, n) {
                t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(O(e) + "=" + O(n))
            }, h(o, e, n), o.join("&").replace(/%20/g, "+")
        }
    }(o), function (t) {
        var e = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g}, n = /(.)^/,
            o = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029"},
            i = /\\|'|\r|\n|\u2028|\u2029/g, r = function (t) {
                return "\\" + o[t]
            }, a = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"};
        t.keys = function (t) {
            var e = [];
            for (var n in t) t.hasOwnProperty(n) && e.push(n);
            return e
        };
        var s = function (e) {
            var n = function (t) {
                return e[t]
            }, o = "(?:" + t.keys(e).join("|") + ")", i = RegExp(o), r = RegExp(o, "g");
            return function (t) {
                return t = null == t ? "" : "" + t, i.test(t) ? t.replace(r, n) : t
            }
        };
        t.escape = s(a);
        var c = function (o, a, s) {
            !a && s && (a = s), a = a || {}, a = t.extend(a, e);
            var c = RegExp([(a.escape || n).source, (a.interpolate || n).source, (a.evaluate || n).source].join("|") + "|$", "g"),
                u = 0, l = "__p+='";
            o.replace(c, function (t, e, n, a, s) {
                return l += o.slice(u, s).replace(i, r), u = s + t.length, e ? l += "'+\n((__t=(" + e + "))==null?'':$.escape(__t))+\n'" : n ? l += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : a && (l += "';\n" + a + "\n__p+='"), t
            }), l += "';\n", a.variable || (l = "with(obj||{}){\n" + l + "}\n"), l = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + l + "return __p;\n";
            var f;
            try {
                f = new Function(a.variable || "obj", "$", l)
            } catch (p) {
                throw p.source = l, p
            }
            var d = function (e) {
                return f.call(this, e, t)
            }, h = a.variable || "obj";
            return d.source = "function(" + h + "){\n" + l + "}", d
        };
        t.tmpl = function (t, e) {
            return c(t)(e)
        }
    }(o), function (t) {
        function e(t, e) {
            var n = this.os = {}, o = this.browser = {}, i = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
                r = t.match(/(Android);?[\s\/]+([\d.]+)?/), a = !!t.match(/\(Macintosh\; Intel /),
                s = t.match(/(iPad).*OS\s([\d_]+)/), c = t.match(/(iPod)(.*OS\s([\d_]+))?/),
                u = !s && t.match(/(iPhone\sOS)\s([\d_]+)/), l = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                f = /Win\d{2}|Windows/.test(e), p = t.match(/Windows Phone ([\d.]+)/), d = l && t.match(/TouchPad/),
                h = t.match(/Kindle\/([\d.]+)/), m = t.match(/Silk\/([\d._]+)/),
                g = t.match(/(BlackBerry).*Version\/([\d.]+)/), v = t.match(/(BB10).*Version\/([\d.]+)/),
                w = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/), y = t.match(/PlayBook/),
                b = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/), x = t.match(/Firefox\/([\d.]+)/),
                $ = t.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
                C = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
                S = !b && t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
                _ = S || t.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
            (o.webkit = !!i) && (o.version = i[1]), r && (n.android = !0, n.version = r[2]), u && !c && (n.ios = n.iphone = !0, n.version = u[2].replace(/_/g, ".")), s && (n.ios = n.ipad = !0, n.version = s[2].replace(/_/g, ".")), c && (n.ios = n.ipod = !0, n.version = c[3] ? c[3].replace(/_/g, ".") : null), p && (n.wp = !0, n.version = p[1]), l && (n.webos = !0, n.version = l[2]), d && (n.touchpad = !0), g && (n.blackberry = !0, n.version = g[2]), v && (n.bb10 = !0, n.version = v[2]), w && (n.rimtabletos = !0, n.version = w[2]), y && (o.playbook = !0), h && (n.kindle = !0, n.version = h[1]), m && (o.silk = !0, o.version = m[1]), !m && n.android && t.match(/Kindle Fire/) && (o.silk = !0), b && (o.chrome = !0, o.version = b[1]), x && (o.firefox = !0, o.version = x[1]), $ && (n.firefoxos = !0, n.version = $[1]), C && (o.ie = !0, o.version = C[1]), _ && (a || n.ios || f) && (o.safari = !0, n.ios || (o.version = _[1])), S && (o.webview = !0), n.tablet = !!(s || y || r && !t.match(/Mobile/) || x && t.match(/Tablet/) || C && !t.match(/Phone/) && t.match(/Touch/)), n.phone = !(n.tablet || n.ipod || !(r || u || l || g || v || b && t.match(/Android/) || b && t.match(/CriOS\/([\d.]+)/) || x && t.match(/Mobile/) || C && t.match(/Touch/)))
        }

        e.call(t, navigator.userAgent, navigator.platform), t.__detect = e
    }(o), n.exports = o
}), function (t) {
    function e() {
        t.rem = Math.min(parseInt(n.getBoundingClientRect().width), 640) / 7.5, n.style.fontSize = t.rem + "px"
    }

    var n = document.documentElement, o = null;
    t.addEventListener("resize", function () {
        clearTimeout(o), o = setTimeout(e, 300)
    }), t.addEventListener("pageshow", function (t) {
        t.persisted && (clearTimeout(o), o = setTimeout(e, 300))
    }), e()
}(window, void 0), window.isInApp = window.navigator && window.navigator.userAgent && /AliApp\((TB)\/([\d\.]+)\)/i.test(window.navigator.userAgent), ~location.search.indexOf("systype=waptest") ? (lib.mtop.config.prefix = "acs", lib.mtop.config.subDomain = "waptest", lib.mtop.config.mainDomain = "taobao.com") : ~location.search.indexOf("systype=wapa") ? (lib.mtop.config.prefix = "acs", lib.mtop.config.subDomain = "wapa", lib.mtop.config.mainDomain = "taobao.com") : (lib.mtop.config.prefix = "acs", lib.mtop.config.subDomain = "m", lib.mtop.config.mainDomain = "taobao.com"), window.seajs) seajs.config({base: "http://" + location.host}), seajs.use(["atom/magix/index"], function (t) {
    t.config({defaultView: "app/views/coupon/main"}), t.boot({rootId: "J_root"})
}); else {
    var Magix = require("atom/magix/index");
    require("app/views/coupon/main"), Magix.config({defaultView: "app/views/coupon/main"}), Magix.boot({rootId: "J_root"})
}
