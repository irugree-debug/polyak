! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports && "object" == typeof module ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t, e) {
    "use strict";

    function r(t, e, r, n) {
        for (var s = [], i = 0; i < t.length; i++) {
            var o = t[i];
            if (o) {
                var a = tinycolor(o),
                    l = a.toHsl().l < .5 ? "sp-thumb-el sp-thumb-dark cp-selected-color" : "sp-thumb-el sp-thumb-light cp-selected-color";
                l += tinycolor.equals(e, o) ? " sp-thumb-active" : "";
                var c = a.toString(n.preferredFormat || "rgb"),
                    u = v ? "background-color:" + a.toRgbString() : "filter:" + a.toFilter();
                s.push('<span title="' + c + '" data-color="' + a.toRgbString() + '" class="' + l + '"><span class="sp-thumb-inner cp-selected-color" style="' + u + ';"></span></span>')
            } else s.push('<span class="sp-thumb-el sp-clear-display" ><span class="sp-clear-palette-only" style="background-color: transparent;"></span></span>')
        }
        return "<div class='sp-cf " + r + "'>" + s.join("") + "</div>"
    }

    function n() {
        for (var t = 0; t < d.length; t++) d[t] && d[t].hide()
    }

    function s(e, r) {
        e.locale = e.locale || window.navigator.language, e.locale && (e.locale = e.locale.split("-")[0].toLowerCase()), "en" != e.locale && t.spectrum.localization[e.locale] && (e = t.extend({}, t.spectrum.localization[e.locale], e));
        var n = t.extend({}, f, e);
        return n.callbacks = {
            move: c(n.move, r),
            change: c(n.change, r),
            show: c(n.show, r),
            hide: c(n.hide, r),
            beforeShow: c(n.beforeShow, r)
        }, n
    }

    function i(i, a) {
        function c() {
            if (B.showPaletteOnly && (B.showPalette = !0), Et.text(B.showPaletteOnly ? B.togglePaletteMoreText : B.togglePaletteLessText), B.palette) {
                lt = B.palette.slice(0), ct = t.isArray(lt[0]) ? lt : [lt], ut = {};
                for (var e = 0; e < ct.length; e++)
                    for (var r = 0; r < ct[e].length; r++) {
                        var n = tinycolor(ct[e][r]).toRgbString();
                        ut[n] = !0
                    }
                B.showPaletteOnly && !Bt && (Bt = "" === lt[0][0] ? lt[0][0] : Object.keys(ut)[0])
            }
            yt.toggleClass("sp-flat", q), yt.toggleClass("sp-input-disabled", !B.showInput), yt.toggleClass("sp-alpha-enabled", B.showAlpha), yt.toggleClass("sp-clear-enabled", Kt), yt.toggleClass("sp-buttons-disabled", !B.showButtons), yt.toggleClass("sp-palette-buttons-disabled", !B.togglePaletteOnly), yt.toggleClass("sp-palette-disabled", !B.showPalette), yt.toggleClass("sp-palette-only", B.showPaletteOnly), yt.toggleClass("sp-initial-disabled", !B.showInitial), yt.addClass(B.className).addClass(B.containerClassName), I()
        }

        function f() {
            if (G) {
                try {
                    var e = window.localStorage,
                        r = e[G].split(",#");
                    r.length > 1 && (delete e[G], t.each(r, function(t, e) {
                        y(e)
                    }))
                } catch (t) {}
                try {
                    ht = window.localStorage[G].split(";")
                } catch (t) {}
            }
        }

        function y(e) {
            if (V) {
                var r = tinycolor(e).toRgbString();
                if (!ut[r] && -1 === t.inArray(r, ht))
                    for (ht.push(r); ht.length > pt;) ht.shift();
                if (G) try {
                    window.localStorage[G] = ht.join(";")
                } catch (t) {}
            }
        }

        function _() {
            var t = [];
            if (B.showPalette)
                for (var e = 0; e < ht.length; e++) {
                    var r = tinycolor(ht[e]).toRgbString();
                    ut[r] || t.push(ht[e])
                }
            return t.reverse().slice(0, B.maxSelectionSize)
        }

        function w() {
            var e = T(),
                n = t.map(ct, function(t, e) {});
            f(), ht && n.push(r(_(), e, "sp-palette-row sp-palette-row-selection", B)), Ht.html(n.join(""))
        }

        function x() {
            if (B.showInitial) {
                var t = Lt,
                    e = T();
                Mt.html(r([t, e], e, "sp-palette-row-initial", B))
            }
        }

        function S() {
            (J <= 0 || Q <= 0 || Z <= 0) && I(), Y = !0, yt.addClass(ft), gt = null, bt.trigger("dragstart.spectrum", [T()])
        }

        function C() {
            Y = !1, yt.removeClass(ft), bt.trigger("dragstop.spectrum", [T()])
        }

        function k(t) {
            if (dt) dt = !1;
            else if (null !== t && "" !== t || !Kt) {
                var e = tinycolor(t);
                e.isValid() ? (F(e), E(), D()) : At.addClass("sp-validation-error")
            } else F(null), E(), D()
        }

        function P() {
            var e = t.Event("beforeShow.spectrum");
            W ? I() : (bt.trigger(e, [T()]), !1 === X.beforeShow(T()) || e.isDefaultPrevented() || (n(), W = !0, t(vt).on("keydown.spectrum", R), t(vt).on("click.spectrum", A), t(window).on("resize.spectrum", $), Dt.addClass("sp-active"), yt.removeClass("sp-hidden"), I(), j(), Lt = T(), x(), X.show(Lt), bt.trigger("show.spectrum", [Lt])))
        }

        function R(t) {
            27 === t.keyCode && H()
        }

        function A(t) {
            2 != t.button && (Y || (Vt ? D(!0) : M(), H()))
        }

        function H() {
            W && !q && (W = !1, t(vt).off("keydown.spectrum", R), t(vt).off("click.spectrum", A), t(window).off("resize.spectrum", $), Dt.removeClass("sp-active"), yt.addClass("sp-hidden"), X.hide(T()), bt.trigger("hide.spectrum", [T()]))
        }

        function M() {
            F(Lt, !0), D(!0)
        }

        function F(t, r) {
            if (tinycolor.equals(t, T())) j();
            else {
                var n, s;
                t && t !== e || !Kt ? (Gt = !1, s = (n = tinycolor(t)).toHsv(), st = s.h % 360 / 360, it = s.s, ot = s.v, at = s.a) : Gt = !0, j(), n && n.isValid() && !r && (qt = B.preferredFormat || n.getFormat())
            }
        }

        function T(t) {
            return t = t || {}, Kt && Gt ? null : tinycolor.fromRatio({
                h: st,
                s: it,
                v: ot,
                a: Math.round(1e3 * at) / 1e3
            }, {
                format: t.format || qt
            })
        }

        function O() {
            return !At.hasClass("sp-validation-error")
        }

        function E() {
            j(), X.move(T()), bt.trigger("move.spectrum", [T()])
        }

        function j() {
            At.removeClass("sp-validation-error"), z();
            var e = tinycolor.fromRatio({
                h: st,
                s: 1,
                v: 1
            });
            wt.css("background-color", e.toHexString());
            var r = qt;
            at < 1 && (0 !== at || "name" !== r) && ("hex" !== r && "hex3" !== r && "hex6" !== r && "name" !== r || (r = "rgb"));
            var n = T({
                    format: r
                }),
                s = "";
            if (Nt.removeClass("sp-clear-display"), Nt.css("background-color", "transparent"), !n && Kt) Nt.addClass("sp-clear-display");
            else {
                var i = n.toHexString(),
                    o = n.toRgbString();
                if (v || 1 === n.alpha ? Nt.css("background-color", o) : (Nt.css("background-color", "transparent"), Nt.css("filter", n.toFilter())), B.showAlpha) {
                    var a = n.toRgb();
                    a.a = 0;
                    var l = tinycolor(a).toRgbString(),
                        c = "linear-gradient(left, " + l + ", " + i + ")";
                    g ? kt.css("filter", tinycolor(l).toFilter({
                        gradientType: 1
                    }, i)) : (kt.css("background", "-webkit-" + c), kt.css("background", "-moz-" + c), kt.css("background", "-ms-" + c), kt.css("background", "linear-gradient(to right, " + l + ", " + i + ")"))
                }
                s = n.toString(r)
            }
            var TEr = T().toRgbStringR();
            var TEg = T().toRgbStringG();
            var TEb = T().toRgbStringB();
            var TEa = T().toRgbStringA();
            if (
            (B.showInput && At.val(s),
            bt.val(s),
            //t(".sp-hue-marker").css("background", T().toHexString()),
            //t(".cp-hex input").val(T().toHexString()),
            //t(".cp-r input").val(T().toRgbStringR()),
            //t(".cp-g input").val(T().toRgbStringG()),
            //t(".cp-b input").val(T().toRgbStringB()),
            //t(".cp-a input").val(T().toRgbStringA()),
            //cef.emit("auto_service_response", TEr, TEg, TEb, TEa, element_id),
            colorCallback(TEr, TEg, TEb, 1),
            //console.log(`r: ${TEr} g: ${TEg} b: ${TEb}`),
            t(".service-rgb-box").attr("data-color", T().toRgbString()),
            "text" == B.type || "component" == B.type)
            ) {
            var u = n;
            if (u && $t) {
            var h = u.isLight() || u.getAlpha() < 0.4 ? "black" : "white";
            $t.css("background-color", u.toRgbString()).css("color", h);
            } else $t.css("background-color", Yt).css("color", Wt);
            }
            B.showPalette && w(), x();
            }

        function z() {
            var t = it,
                e = ot;
            if (Kt && Gt) Rt.hide(), Ct.hide(), xt.hide();
            else {
                Rt.show(), Ct.show(), xt.show();
                var r = t * Q,
                    n = J - e * J;
                r = Math.max(-U, Math.min(Q - U, r - U)), n = Math.max(-U, Math.min(J - U, n - U)), xt.css({
                    top: n + "px",
                    left: r + "px"
                });
                var s = 12.1 * at;//15.416666666666666 * at;
                Rt.css({
                    left: s + "vw"
                });
                var i = 12.1 * st;//15.416666666666666 * st;
                Ct.css({
                    left: i + "vw"
                })
            }
        }

        function D(t) {
            var e = T(),
                r = !tinycolor.equals(e, Lt);
            e && (e.toString(qt), y(e)), t && r && (X.change(e), dt = !0, bt.trigger("change", [e]))
        }

        function I() {
            W && (Q = wt.width(), J = wt.height(), U = xt.height(), tt = St.width(), Z = St.height(), nt = Ct.height(), et = Pt.width(), rt = Rt.width(), q || (yt.css("position", "absolute"), B.offset ? yt.offset(B.offset) : yt.offset(o(yt, It))), z(), B.showPalette && w(), bt.trigger("reflow.spectrum"))
        }

        function N() {
            H(), mt = !0, bt.attr("disabled", !0), It.addClass("sp-disabled")
        }
        var B = s(a, i),
            L = B.type,
            q = "flat" == L,
            V = B.showSelectionPalette,
            G = B.localStorageKey,
            K = B.theme,
            X = B.callbacks,
            $ = h(I, 10),
            W = !1,
            Y = !1,
            Q = 0,
            J = 0,
            U = 0,
            Z = 0,
            tt = 0,
            et = 0,
            rt = 0,
            nt = 0,
            st = 0,
            it = 0,
            ot = 0,
            at = 1,
            lt = [],
            ct = [],
            ut = {},
            ht = B.selectionPalette.slice(0),
            pt = B.maxSelectionSize,
            ft = "sp-dragging",
            dt = !1,
            gt = null,
            vt = i.ownerDocument,
            bt = (vt.body, t(i)),
            mt = !1,
            yt = t(m, vt).addClass(K),
            _t = yt.find(".sp-picker-container"),
            wt = yt.find(".sp-color"),
            xt = yt.find(".sp-dragger"),
            St = yt.find(".sp-hue"),
            Ct = yt.find(".sp-slider"),
            kt = yt.find(".sp-alpha-inner"),
            Pt = yt.find(".sp-alpha"),
            Rt = yt.find(".sp-alpha-handle"),
            At = yt.find(".sp-input"),
            Ht = yt.find(".sp-palette"),
            Mt = yt.find(".sp-initial"),
            Ft = yt.find(".sp-cancel"),
            Tt = yt.find(".sp-clear"),
            Ot = yt.find(".sp-choose"),
            Et = yt.find(".sp-palette-toggle"),
            jt = bt.is("input"),
            zt = (jt && "color" === bt.attr("type") && p(), jt && "color" == L),
            Dt = zt ? t(b).addClass(K).addClass(B.className).addClass(B.replacerClassName) : t([]),
            It = zt ? Dt : bt,
            Nt = Dt.find(".sp-preview-inner"),
            Bt = B.color || jt && bt.val(),
            Lt = !1,
            qt = B.preferredFormat,
            Vt = !B.showButtons || B.clickoutFiresChange,
            Gt = !Bt,
            Kt = B.allowEmpty,
            Xt = null,
            $t = null,
            Wt = null,
            Yt = null,
            Qt = bt.attr("id");
        if (Qt !== e && Qt.length > 0) {
            var Jt = t('label[for="' + Qt + '"]');
            Jt.length && Jt.on("click", function(t) {
                return t.preventDefault(), bt.spectrum("show"), !1
            })
        }! function() {
            function e(e) {
                return e.data && e.data.ignore ? (F(t(e.target).closest(".sp-thumb-el").data("color")), E()) : (F(t(e.target).closest(".sp-thumb-el").data("color")), E(), B.hideAfterPaletteSelect ? (D(!0), H()) : D()), !1
            }
            if (g && yt.find("*:not(input)").attr("unselectable", "on"), c(), Xt = t('<span class="sp-original-input-container"></span>'), ["margin"].forEach(function(t) {
                    Xt.css(t, bt.css(t))
                }), "block" == bt.css("display") && Xt.css("display", "flex"), zt) bt.after(Dt).hide();
            else if ("text" == L) Xt.addClass("sp-colorize-container"), bt.addClass("spectrum sp-colorize").wrap(Xt);
            else if ("component" == L) {
                bt.addClass("spectrum").wrap(Xt);
                var r = t(["<div class='sp-colorize-container sp-add-on'>", "<div class='sp-colorize'></div> ", "</div>"].join(""));
                r.width(bt.outerHeight() + "px").css("border-radius", bt.css("border-radius")).css("border", bt.css("border")), bt.addClass("with-add-on").before(r)
            }
            if ($t = bt.parent().find(".sp-colorize"), Wt = $t.css("color"), Yt = $t.css("background-color"), Kt || Tt.hide(), q) bt.after(yt).hide();
            else {
                var n = "parent" === B.appendTo ? bt.parent() : t(B.appendTo);
                1 !== n.length && (n = t("body")), n.append(yt)
            }
            f(), It.on("click.spectrum touchstart.spectrum", function(e) {
                mt || P(), e.stopPropagation(), t(e.target).is("input") || e.preventDefault()
            }), (bt.is(":disabled") || !0 === B.disabled) && N(), yt.click(l), [At, bt].forEach(function(e) {
                e.change(function() {
                    k(e.val())
                }), e.on("paste", function() {
                    setTimeout(function() {
                        k(e.val())
                    }, 1)
                }), e.keydown(function(r) {
                    13 == r.keyCode && (k(t(e).val()), e == bt && H())
                })
            }), Ft.text(B.cancelText), Ft.on("click.spectrum", function(t) {
                t.stopPropagation(), t.preventDefault(), M(), H()
            }), Tt.attr("title", B.clearText), Tt.on("click.spectrum", function(t) {
                t.stopPropagation(), t.preventDefault(), Gt = !0, E(), q && D(!0)
            }), Ot.text(B.chooseText), Ot.on("click.spectrum", function(t) {
                t.stopPropagation(), t.preventDefault(), g && At.is(":focus") && At.trigger("change"), O() && (D(!0), console.log(T().toString()), H())
            }), Et.text(B.showPaletteOnly ? B.togglePaletteMoreText : B.togglePaletteLessText), Et.on("click.spectrum", function(t) {
                t.stopPropagation(), t.preventDefault(), B.showPaletteOnly = !B.showPaletteOnly, B.showPaletteOnly || q || yt.css("left", "-=" + (_t.outerWidth(!0) + 5)), c()
            }), u(Pt, function(t, e, r) {
                at = t / et, Gt = !1, r.shiftKey && (at = Math.round(10 * at) / 10), E()
            }, S, C), u(St, function(t, e) {
                st = parseFloat(t / tt), Gt = !1, B.showAlpha || (at = 1), E()
            }, S, C), u(wt, function(t, e, r) {
                if (r.shiftKey) {
                    if (!gt) {
                        var n = it * Q,
                            s = J - ot * J,
                            i = Math.abs(t - n) > Math.abs(e - s);
                        gt = i ? "x" : "y"
                    }
                } else gt = null;
                var o = !gt || "x" === gt,
                    a = !gt || "y" === gt;
                o && (it = parseFloat(t / Q)), a && (ot = parseFloat((J - e) / J)), Gt = !1, B.showAlpha || (at = 1), E()
            }, S, C), Bt ? (F(Bt), j(), qt = tinycolor(Bt).format || B.preferredFormat, y(Bt)) : "" === Bt ? (F(Bt), j()) : j(), q && P();
            var s = g ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            Ht.on(s, ".sp-thumb-el", e), Mt.on(s, ".sp-thumb-el:nth-child(1)", {
                ignore: !0
            }, e)
        }();
        var Ut = {
            show: P,
            hide: H,
            toggle: function() {
                W ? H() : P()
            },
            reflow: I,
            option: function(r, n) {
                return r === e ? t.extend({}, B) : n === e ? B[r] : (B[r] = n, "preferredFormat" === r && (qt = B.preferredFormat), void c())
            },
            enable: function() {
                mt = !1, bt.attr("disabled", !1), It.removeClass("sp-disabled")
            },
            disable: N,
            offset: function(t) {
                B.offset = t, I()
            },
            set: function(t) {
                F(t), D()
            },
            get: T,
            destroy: function() {
                bt.show().removeClass("spectrum with-add-on sp-colorize"), It.off("click.spectrum touchstart.spectrum"), yt.remove(), Dt.remove(), $t && $t.css("background-color", Yt).css("color", Wt);
                var t = bt.closest(".sp-original-input-container");
                t.length > 0 && t.after(bt).remove(), d[Ut.id] = null
            },
            container: yt
        };
        return Ut.id = d.push(Ut) - 1, Ut
    }

    function o(e, r) {
        var n = e.outerWidth(),
            s = e.outerHeight(),
            i = r.outerHeight(),
            o = e[0].ownerDocument,
            a = o.documentElement,
            l = a.clientWidth + t(o).scrollLeft(),
            c = a.clientHeight + t(o).scrollTop(),
            u = r.offset(),
            h = u.left,
            p = u.top;
        return p += i, h -= Math.min(h, h + n > l && l > n ? Math.abs(h + n - l) : 0), p -= Math.min(p, p + s > c && c > s ? Math.abs(s + i - 0) : 0), {
            top: p,
            bottom: u.bottom,
            left: h,
            right: u.right,
            width: u.width,
            height: u.height
        }
    }

    function a() {}

    function l(t) {
        t.stopPropagation()
    }

    function c(t, e) {
        var r = Array.prototype.slice,
            n = r.call(arguments, 2);
        return function() {
            return t.apply(e, n.concat(r.call(arguments)))
        }
    }

    function u(e, r, n, s) {
        function i(t) {
            t.stopPropagation && t.stopPropagation(), t.preventDefault && t.preventDefault(), t.returnValue = !1
        }

        function o(t) {
            if (c) {
                if (g && l.documentMode < 9 && !t.button) return a();
                var n = t.originalEvent && t.originalEvent.touches && t.originalEvent.touches[0],
                    s = n && n.pageX || t.pageX,
                    o = n && n.pageY || t.pageY,
                    d = Math.max(0, Math.min(s - u.left, p)),
                    v = Math.max(0, Math.min(o - u.top, h));
                f && i(t), r.apply(e, [d, v, t])
            }
        }

        function a() {
            c && (t(l).off(d), t(l.body).removeClass("sp-dragging"), setTimeout(function() {
                s.apply(e, arguments)
            }, 0)), c = !1
        }
        r = r || function() {}, n = n || function() {}, s = s || function() {};
        var l = document,
            c = !1,
            u = {},
            h = 0,
            p = 0,
            f = "ontouchstart" in window,
            d = {};
        d.selectstart = i, d.dragstart = i, d["touchmove mousemove"] = o, d["touchend mouseup"] = a, t(e).on("touchstart mousedown", function(r) {
            (r.which ? 3 == r.which : 2 == r.button) || c || !1 !== n.apply(e, arguments) && (c = !0, h = t(e).height(), p = t(e).width(), u = t(e).offset(), t(l).on(d), t(l.body).addClass("sp-dragging"), o(r), i(r))
        })
    }

    function h(t, e, r) {
        var n;
        return function() {
            var s = this,
                i = arguments;
            r && clearTimeout(n), !r && n || (n = setTimeout(function() {
                n = null, t.apply(s, i)
            }, e))
        }
    }

    function p() {
        return t.fn.spectrum.inputTypeColorSupport()
    }
    var f = {
            beforeShow: a,
            move: a,
            change: a,
            show: a,
            hide: a,
            color: !1,
            flat: !1,
            type: "",
            showInput: !1,
            allowEmpty: !0,
            showButtons: !0,
            clickoutFiresChange: !0,
            showInitial: !1,
            showPalette: !0,
            showPaletteOnly: !1,
            hideAfterPaletteSelect: !1,
            togglePaletteOnly: !1,
            showSelectionPalette: !0,
            localStorageKey: !1,
            appendTo: "body",
            maxSelectionSize: 16,
            locale: "ru",
            cancelText: "Отмена",
            chooseText: "Сохранить",
            togglePaletteMoreText: "more",
            togglePaletteLessText: "less",
            clearText: "Clear Color Selection",
            noColorSelectedText: "No Color Selected",
            preferredFormat: "name",
            className: "",
            containerClassName: "",
            replacerClassName: "",
            showAlpha: !0,
            theme: "sp-light",
            palette: [],
            selectionPalette: [],
            disabled: !1,
            offset: null
        },
        d = [],
        g = !!/msie/i.exec(window.navigator.userAgent),
        v = function() {
            function t(t, e) {
                return !!~("" + t).indexOf(e)
            }
            var e = document.createElement("div").style;
            return e.cssText = "background-color:rgba(0,0,0,.5)", t(e.backgroundColor, "rgba") || t(e.backgroundColor, "hsla")
        }(),
        b = ["<div class='sp-replacer'>", "<div class='sp-preview'><div class='sp-preview-inner'></div></div>", "<div class='sp-dd'>&#9660;</div>", "</div>"].join(""),
        m = function() {
            var t = "";
            if (g)
                for (var e = 1; e <= 6; e++) t += "<div class='sp-" + e + "'></div>";
            return ["<div class='sp-container sp-hidden'>", "<div class='sp-picker-container'>", "<div class='sp-color'>", "<div class='sp-sat'>", "<div class='sp-val'>", "<div class='sp-dragger'></div>", "</div>", "</div>", "</div>", "<div class='sp-hue'>", "<div class='sp-slider'></div>", t, "</div>", "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>", /*'<div class="cp-values">', '<div class="cp-hex"><input type="text" value="" readonly></div>', '<div class="cp-r"><input type="text" value="" readonly></div>', '<div class="cp-g"><input type="text" value="" readonly></div>', '<div class="cp-b"><input type="text" value="" readonly></div>', '<div class="cp-a"><input type="text" value="" readonly></div>', "</div>", '<div class="cp-text-values">', "<div>R</div>", "<div>G</div>", "<div>B</div>", "</div>",*/ "</div>", "</div>", "<div class='sp-initial sp-thumb sp-cf'></div>", "<div class='sp-palette-container'>", "<div class='sp-palette sp-thumb sp-cf'></div>", "</div>", /*"<div class='sp-button-container sp-cf'>", "<button type='button' class='cp-button-confirm sp-choose'>Сохранить</button>", "<button class='cp-button-close sp-cancel' href='#'>Отмена</button>", "</div>",*/ "</div>"].join("")
        }();
    t.fn.spectrum = function(e, r) {
            if ("string" == typeof e) {
                var n = this,
                    s = Array.prototype.slice.call(arguments, 1);
                return this.each(function() {
                    var r = d[t(this).data("spectrum.id")];
                    if (r) {
                        var i = r[e];
                        if (!i) throw new Error("Spectrum: no such method: '" + e + "'");
                        "get" == e ? n = r.get() : "container" == e ? n = r.container : "option" == e ? n = r.option.apply(r, s) : "destroy" == e ? (r.destroy(), t(this).removeData("spectrum.id")) : i.apply(r, s)
                    }
                }), n
            }
            return this.spectrum("destroy").each(function() {
                var r = t.extend({}, t(this).data(), e);
                t(this).is("input") ? r.flat || "flat" == r.type ? r.type = "flat" : "color" == t(this).attr("type") ? r.type = "color" : r.type = r.type || "component" : r.type = "noInput";
                var n = i(this, r);
                t(this).data("spectrum.id", n.id)
            })
        }, t.fn.spectrum.load = !0, t.fn.spectrum.loadOpts = {}, t.fn.spectrum.draggable = u, t.fn.spectrum.defaults = f, t.fn.spectrum.inputTypeColorSupport = function e() {
            if (void 0 === e._cachedResult) {
                var r = t("<input type='color'/>")[0];
                e._cachedResult = "color" === r.type && "" !== r.value
            }
            return e._cachedResult
        }, t.spectrum = {}, t.spectrum.localization = {}, t.spectrum.palettes = {}, t.fn.spectrum.processNativeColorInputs = function() {
            var e = t("input[type=color]");
            e.length && !p() && e.spectrum({
                preferredFormat: "hex6"
            })
        },
        function() {
            function t(t) {
                var r = {
                        r: 0,
                        g: 0,
                        b: 0
                    },
                    s = 1,
                    o = !1,
                    a = !1;
                return "string" == typeof t && (t = F(t)), "object" == typeof t && (t.hasOwnProperty("r") && t.hasOwnProperty("g") && t.hasOwnProperty("b") ? (r = e(t.r, t.g, t.b), o = !0, a = "%" === String(t.r).substr(-1) ? "prgb" : "rgb") : t.hasOwnProperty("h") && t.hasOwnProperty("s") && t.hasOwnProperty("v") ? (t.s = A(t.s), t.v = A(t.v), r = i(t.h, t.s, t.v), o = !0, a = "hsv") : t.hasOwnProperty("h") && t.hasOwnProperty("s") && t.hasOwnProperty("l") && (t.s = A(t.s), t.l = A(t.l), r = n(t.h, t.s, t.l), o = !0, a = "hsl"), t.hasOwnProperty("a") && (s = t.a)), s = w(s), {
                    ok: o,
                    format: t.format || a,
                    r: D(255, I(r.r, 0)),
                    g: D(255, I(r.g, 0)),
                    b: D(255, I(r.b, 0)),
                    a: s
                }
            }

            function e(t, e, r) {
                return {
                    r: 255 * x(t, 255),
                    g: 255 * x(e, 255),
                    b: 255 * x(r, 255)
                }
            }

            function r(t, e, r) {
                t = x(t, 255), e = x(e, 255), r = x(r, 255);
                var n, s, i = I(t, e, r),
                    o = D(t, e, r),
                    a = (i + o) / 2;
                if (i == o) n = s = 0;
                else {
                    var l = i - o;
                    switch (s = a > .5 ? l / (2 - i - o) : l / (i + o), i) {
                        case t:
                            n = (e - r) / l + (e < r ? 6 : 0);
                            break;
                        case e:
                            n = (r - t) / l + 2;
                            break;
                        case r:
                            n = (t - e) / l + 4
                    }
                    n /= 6
                }
                return {
                    h: n,
                    s: s,
                    l: a
                }
            }

            function n(t, e, r) {
                function n(t, e, r) {
                    return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t
                }
                var s, i, o;
                if (t = x(t, 360), e = x(e, 100), r = x(r, 100), 0 === e) s = i = o = r;
                else {
                    var a = r < .5 ? r * (1 + e) : r + e - r * e,
                        l = 2 * r - a;
                    s = n(l, a, t + 1 / 3), i = n(l, a, t), o = n(l, a, t - 1 / 3)
                }
                return {
                    r: 255 * s,
                    g: 255 * i,
                    b: 255 * o
                }
            }

            function s(t, e, r) {
                t = x(t, 255), e = x(e, 255), r = x(r, 255);
                var n, s, i = I(t, e, r),
                    o = D(t, e, r),
                    a = i,
                    l = i - o;
                if (s = 0 === i ? 0 : l / i, i == o) n = 0;
                else {
                    switch (i) {
                        case t:
                            n = (e - r) / l + (e < r ? 6 : 0);
                            break;
                        case e:
                            n = (r - t) / l + 2;
                            break;
                        case r:
                            n = (t - e) / l + 4
                    }
                    n /= 6
                }
                return {
                    h: n,
                    s: s,
                    v: a
                }
            }

            function i(t, e, r) {
                t = 6 * x(t, 360), e = x(e, 100), r = x(r, 100);
                var n = j.floor(t),
                    s = t - n,
                    i = r * (1 - e),
                    o = r * (1 - s * e),
                    a = r * (1 - (1 - s) * e),
                    l = n % 6;
                return {
                    r: 255 * [r, o, i, i, a, r][l],
                    g: 255 * [a, r, r, o, i, i][l],
                    b: 255 * [i, i, a, r, r, o][l]
                }
            }

            function o(t, e, r, n) {
                var s = [R(z(t).toString(16)), R(z(e).toString(16)), R(z(r).toString(16))];
                return n && s[0].charAt(0) == s[0].charAt(1) && s[1].charAt(0) == s[1].charAt(1) && s[2].charAt(0) == s[2].charAt(1) ? s[0].charAt(0) + s[1].charAt(0) + s[2].charAt(0) : s.join("")
            }

            function a(t, e, r, n) {
                return [R(H(n)), R(z(t).toString(16)), R(z(e).toString(16)), R(z(r).toString(16))].join("")
            }

            function l(t, e) {
                e = 0 === e ? 0 : e || 10;
                var r = B(t).toHsl();
                return r.s -= e / 100, r.s = S(r.s), B(r)
            }

            function c(t, e) {
                e = 0 === e ? 0 : e || 10;
                var r = B(t).toHsl();
                return r.s += e / 100, r.s = S(r.s), B(r)
            }

            function u(t) {
                return B(t).desaturate(100)
            }

            function h(t, e) {
                e = 0 === e ? 0 : e || 10;
                var r = B(t).toHsl();
                return r.l += e / 100, r.l = S(r.l), B(r)
            }

            function p(t, e) {
                e = 0 === e ? 0 : e || 10;
                var r = B(t).toRgb();
                return r.r = I(0, D(255, r.r - z(-e / 100 * 255))), r.g = I(0, D(255, r.g - z(-e / 100 * 255))), r.b = I(0, D(255, r.b - z(-e / 100 * 255))), B(r)
            }

            function f(t, e) {
                e = 0 === e ? 0 : e || 10;
                var r = B(t).toHsl();
                return r.l -= e / 100, r.l = S(r.l), B(r)
            }

            function d(t, e) {
                var r = B(t).toHsl(),
                    n = (z(r.h) + e) % 360;
                return r.h = n < 0 ? 360 + n : n, B(r)
            }

            function g(t) {
                var e = B(t).toHsl();
                return e.h = (e.h + 180) % 360, B(e)
            }

            function v(t) {
                var e = B(t).toHsl(),
                    r = e.h;
                return [B(t), B({
                    h: (r + 120) % 360,
                    s: e.s,
                    l: e.l
                }), B({
                    h: (r + 240) % 360,
                    s: e.s,
                    l: e.l
                })]
            }

            function b(t) {
                var e = B(t).toHsl(),
                    r = e.h;
                return [B(t), B({
                    h: (r + 90) % 360,
                    s: e.s,
                    l: e.l
                }), B({
                    h: (r + 180) % 360,
                    s: e.s,
                    l: e.l
                }), B({
                    h: (r + 270) % 360,
                    s: e.s,
                    l: e.l
                })]
            }

            function m(t) {
                var e = B(t).toHsl(),
                    r = e.h;
                return [B(t), B({
                    h: (r + 72) % 360,
                    s: e.s,
                    l: e.l
                }), B({
                    h: (r + 216) % 360,
                    s: e.s,
                    l: e.l
                })]
            }

            function y(t, e, r) {
                e = e || 6, r = r || 30;
                var n = B(t).toHsl(),
                    s = 360 / r,
                    i = [B(t)];
                for (n.h = (n.h - (s * e >> 1) + 720) % 360; --e;) n.h = (n.h + s) % 360, i.push(B(n));
                return i
            }

            function _(t, e) {
                e = e || 6;
                for (var r = B(t).toHsv(), n = r.h, s = r.s, i = r.v, o = [], a = 1 / e; e--;) o.push(B({
                    h: n,
                    s: s,
                    v: i
                })), i = (i + a) % 1;
                return o
            }

            function w(t) {
                return t = parseFloat(t), (isNaN(t) || t < 0 || t > 1) && (t = 1), t
            }

            function x(t, e) {
                k(t) && (t = "100%");
                var r = P(t);
                return t = D(e, I(0, parseFloat(t))), r && (t = parseInt(t * e, 10) / 100), j.abs(t - e) < 1e-6 ? 1 : t % e / parseFloat(e)
            }

            function S(t) {
                return D(1, I(0, t))
            }

            function C(t) {
                return parseInt(t, 16)
            }

            function k(t) {
                return "string" == typeof t && -1 != t.indexOf(".") && 1 === parseFloat(t)
            }

            function P(t) {
                return "string" == typeof t && -1 != t.indexOf("%")
            }

            function R(t) {
                return 1 == t.length ? "0" + t : "" + t
            }

            function A(t) {
                return t <= 1 && (t = 100 * t + "%"), t
            }

            function H(t) {
                return Math.round(255 * parseFloat(t)).toString(16)
            }

            function M(t) {
                return C(t) / 255
            }

            function F(t) {
                t = t.replace(T, "").replace(O, "").toLowerCase();
                var e;
                return (e = L.rgb.exec(t)) ? {
                    r: e[1],
                    g: e[2],
                    b: e[3]
                } : (e = L.rgba.exec(t)) ? {
                    r: e[1],
                    g: e[2],
                    b: e[3],
                    a: e[4]
                } : (e = L.hsl.exec(t)) ? {
                    h: e[1],
                    s: e[2],
                    l: e[3]
                } : (e = L.hsla.exec(t)) ? {
                    h: e[1],
                    s: e[2],
                    l: e[3],
                    a: e[4]
                } : (e = L.hsv.exec(t)) ? {
                    h: e[1],
                    s: e[2],
                    v: e[3]
                } : (e = L.hsva.exec(t)) ? {
                    h: e[1],
                    s: e[2],
                    v: e[3],
                    a: e[4]
                } : (e = L.hex8.exec(t)) ? {
                    a: M(e[1]),
                    r: C(e[2]),
                    g: C(e[3]),
                    b: C(e[4]),
                    format: "hex8"
                } : (e = L.hex6.exec(t)) ? {
                    r: C(e[1]),
                    g: C(e[2]),
                    b: C(e[3]),
                    format: "hex"
                } : !!(e = L.hex3.exec(t)) && {
                    r: C(e[1] + "" + e[1]),
                    g: C(e[2] + "" + e[2]),
                    b: C(e[3] + "" + e[3]),
                    format: "hex"
                }
            }
            var T = /^[\s,#]+/,
                O = /\s+$/,
                E = 0,
                j = Math,
                z = j.round,
                D = j.min,
                I = j.max,
                N = j.random,
                B = function(e, r) {
                    if (e = e || "", r = r || {}, e instanceof B) return e;
                    if (!(this instanceof B)) return new B(e, r);
                    var n = t(e);
                    this._originalInput = e, this._r = n.r, this._g = n.g, this._b = n.b, this._a = n.a, this._roundA = z(1e3 * this._a) / 1e3, this._format = r.format || n.format, this._gradientType = r.gradientType, this._r < 1 && (this._r = z(this._r)), this._g < 1 && (this._g = z(this._g)), this._b < 1 && (this._b = z(this._b)), this._ok = n.ok, this._tc_id = E++
                };
            B.prototype = {
                isDark: function() {
                    return this.getBrightness() < 128
                },
                isLight: function() {
                    return !this.isDark()
                },
                isValid: function() {
                    return this._ok
                },
                getOriginalInput: function() {
                    return this._originalInput
                },
                getFormat: function() {
                    return this._format
                },
                getAlpha: function() {
                    return this._a
                },
                getBrightness: function() {
                    var t = this.toRgb();
                    return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3
                },
                setAlpha: function(t) {
                    return this._a = w(t), this._roundA = z(1e3 * this._a) / 1e3, this
                },
                toHsv: function() {
                    var t = s(this._r, this._g, this._b);
                    return {
                        h: 360 * t.h,
                        s: t.s,
                        v: t.v,
                        a: this._a
                    }
                },
                toHsvString: function() {
                    var t = s(this._r, this._g, this._b),
                        e = z(360 * t.h),
                        r = z(100 * t.s),
                        n = z(100 * t.v);
                    return 1 == this._a ? "hsv(" + e + ", " + r + "%, " + n + "%)" : "hsva(" + e + ", " + r + "%, " + n + "%, " + this._roundA + ")"
                },
                toHsvStringH: function() {
                    var t = s(this._r, this._g, this._b),
                        e = z(360 * t.h);
                    z(100 * t.s), z(100 * t.v);
                    return this._a, e
                },
                toHsvStringS: function() {
                    var t = s(this._r, this._g, this._b),
                        e = (z(360 * t.h), z(100 * t.s));
                    z(100 * t.v);
                    return this._a, e
                },
                toHsvStringV: function() {
                    var t = s(this._r, this._g, this._b),
                        e = (z(360 * t.h), z(100 * t.s), z(100 * t.v));
                    return this._a, e
                },
                toHsvStringA: function() {
                    var t = s(this._r, this._g, this._b);
                    z(360 * t.h), z(100 * t.s), z(100 * t.v);
                    return 1 == this._a ? 1 : this._roundA
                },
                toHsl: function() {
                    var t = r(this._r, this._g, this._b);
                    return {
                        h: 360 * t.h,
                        s: t.s,
                        l: t.l,
                        a: this._a
                    }
                },
                toHslString: function() {
                    var t = r(this._r, this._g, this._b),
                        e = z(360 * t.h),
                        n = z(100 * t.s),
                        s = z(100 * t.l);
                    return 1 == this._a ? "hsl(" + e + ", " + n + "%, " + s + "%)" : "hsla(" + e + ", " + n + "%, " + s + "%, " + this._roundA + ")"
                },
                toHex: function(t) {
                    return o(this._r, this._g, this._b, t)
                },
                toHexString: function(t) {
                    return "#" + this.toHex(t)
                },
                toHex8: function() {
                    return a(this._r, this._g, this._b, this._a)
                },
                toHex8String: function() {
                    return "#" + this.toHex8()
                },
                toRgb: function() {
                    return {
                        r: z(this._r),
                        g: z(this._g),
                        b: z(this._b),
                        a: this._a
                    }
                },
                toRgbString: function() {
                    return 1 == this._a ? "rgb(" + z(this._r) + ", " + z(this._g) + ", " + z(this._b) + ")" : "rgba(" + z(this._r) + ", " + z(this._g) + ", " + z(this._b) + ", " + this._roundA + ")"
                },
                toRgbStringR: function() {
                    return z(1 == this._a ? this._r : this._r)
                },
                toRgbStringG: function() {
                    return z(1 == this._a ? this._g : this._g)
                },
                toRgbStringB: function() {
                    return z(1 == this._a ? this._b : this._b)
                },
                toRgbStringA: function() {
                    return this._a, this._roundA
                },
                toPercentageRgb: function() {
                    return {
                        r: z(100 * x(this._r, 255)) + "%",
                        g: z(100 * x(this._g, 255)) + "%",
                        b: z(100 * x(this._b, 255)) + "%",
                        a: this._a
                    }
                },
                toPercentageRgbString: function() {
                    return 1 == this._a ? "rgb(" + z(100 * x(this._r, 255)) + "%, " + z(100 * x(this._g, 255)) + "%, " + z(100 * x(this._b, 255)) + "%)" : "rgba(" + z(100 * x(this._r, 255)) + "%, " + z(100 * x(this._g, 255)) + "%, " + z(100 * x(this._b, 255)) + "%, " + this._roundA + ")"
                },
                toName: function() {
                    return 0 === this._a ? "transparent" : !(this._a < 1) && void 0
                },
                toFilter: function(t) {
                    var e = "#" + a(this._r, this._g, this._b, this._a),
                        r = e,
                        n = this._gradientType ? "GradientType = 1, " : "";
                    return t && (r = B(t).toHex8String()), "progid:DXImageTransform.Microsoft.gradient(" + n + "startColorstr=" + e + ",endColorstr=" + r + ")"
                },
                toString: function(t) {
                    var e = !!t;
                    t = t || this._format;
                    var r = !1,
                        n = this._a < 1 && this._a >= 0;
                    return e || !n || "hex" !== t && "hex6" !== t && "hex3" !== t && "name" !== t ? ("rgb" === t && (r = this.toRgbString()), "prgb" === t && (r = this.toPercentageRgbString()), "hex" !== t && "hex6" !== t || (r = this.toHexString()), "hex3" === t && (r = this.toHexString(!0)), "hex8" === t && (r = this.toHex8String()), "name" === t && (r = this.toName()), "hsl" === t && (r = this.toHslString()), "hsv" === t && (r = this.toHsvString()), r || this.toHexString()) : "name" === t && 0 === this._a ? this.toName() : this.toRgbString()
                },
                _applyModification: function(t, e) {
                    var r = t.apply(null, [this].concat([].slice.call(e)));
                    return this._r = r._r, this._g = r._g, this._b = r._b, this.setAlpha(r._a), this
                },
                lighten: function() {
                    return this._applyModification(h, arguments)
                },
                brighten: function() {
                    return this._applyModification(p, arguments)
                },
                darken: function() {
                    return this._applyModification(f, arguments)
                },
                desaturate: function() {
                    return this._applyModification(l, arguments)
                },
                saturate: function() {
                    return this._applyModification(c, arguments)
                },
                greyscale: function() {
                    return this._applyModification(u, arguments)
                },
                spin: function() {
                    return this._applyModification(d, arguments)
                },
                _applyCombination: function(t, e) {
                    return t.apply(null, [this].concat([].slice.call(e)))
                },
                analogous: function() {
                    return this._applyCombination(y, arguments)
                },
                complement: function() {
                    return this._applyCombination(g, arguments)
                },
                monochromatic: function() {
                    return this._applyCombination(_, arguments)
                },
                splitcomplement: function() {
                    return this._applyCombination(m, arguments)
                },
                triad: function() {
                    return this._applyCombination(v, arguments)
                },
                tetrad: function() {
                    return this._applyCombination(b, arguments)
                }
            }, B.fromRatio = function(t, e) {
                if ("object" == typeof t) {
                    var r = {};
                    for (var n in t) t.hasOwnProperty(n) && (r[n] = "a" === n ? t[n] : A(t[n]));
                    t = r
                }
                return B(t, e)
            }, B.equals = function(t, e) {
                return !(!t || !e) && B(t).toRgbString() == B(e).toRgbString()
            }, B.random = function() {
                return B.fromRatio({
                    r: N(),
                    g: N(),
                    b: N()
                })
            }, B.mix = function(t, e, r) {
                r = 0 === r ? 0 : r || 50;
                var n, s = B(t).toRgb(),
                    i = B(e).toRgb(),
                    o = r / 100,
                    a = 2 * o - 1,
                    l = i.a - s.a,
                    c = 1 - (n = ((n = a * l == -1 ? a : (a + l) / (1 + a * l)) + 1) / 2),
                    u = {
                        r: i.r * n + s.r * c,
                        g: i.g * n + s.g * c,
                        b: i.b * n + s.b * c,
                        a: i.a * o + s.a * (1 - o)
                    };
                return B(u)
            }, B.readability = function(t, e) {
                var r = B(t),
                    n = B(e),
                    s = r.toRgb(),
                    i = n.toRgb(),
                    o = r.getBrightness(),
                    a = n.getBrightness(),
                    l = Math.max(s.r, i.r) - Math.min(s.r, i.r) + Math.max(s.g, i.g) - Math.min(s.g, i.g) + Math.max(s.b, i.b) - Math.min(s.b, i.b);
                return {
                    brightness: Math.abs(o - a),
                    color: l
                }
            }, B.isReadable = function(t, e) {
                var r = B.readability(t, e);
                return r.brightness > 125 && r.color > 500
            }, B.mostReadable = function(t, e) {
                for (var r = null, n = 0, s = !1, i = 0; i < e.length; i++) {
                    var o = B.readability(t, e[i]),
                        a = o.brightness > 125 && o.color > 500,
                        l = o.brightness / 125 * 3 + o.color / 500;
                    (a && !s || a && s && l > n || !a && !s && l > n) && (s = a, n = l, r = B(e[i]))
                }
                return r
            };
            var L = function() {
                var t = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",
                    e = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?",
                    r = "[\\s|\\(]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")[,|\\s]+(" + t + ")\\s*\\)?";
                return {
                    rgb: new RegExp("rgb" + e),
                    rgba: new RegExp("rgba" + r),
                    hsl: new RegExp("hsl" + e),
                    hsla: new RegExp("hsla" + r),
                    hsv: new RegExp("hsv" + e),
                    hsva: new RegExp("hsva" + r),
                    hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                    hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                    hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
                }
            }();
            window.tinycolor = B
        }(), t(function() {
            t.fn.spectrum.load && t.fn.spectrum.processNativeColorInputs()
        })
})
// Слушатель для показа/скрытия спидометра
cef.on('modern:hud:speedo:visible', (state) => {
    if (state) {
        document.getElementById('car').style.display = 'block';
        // Если используете атрибут hidden, его тоже нужно убрать
        document.getElementById('car').removeAttribute('hidden');
    } else {
        document.getElementById('car').style.display = 'none';
    }
});
cef.on('modern:hud:speedo:update', (speed, fuel, mileage) => {
    // В вашем HTML за скорость отвечает элемент с классом speed-val (или аналогичный)
    // Добавьте здесь логику обновления текста в элементах
    document.querySelector('.speed-val').innerText = speed;
});