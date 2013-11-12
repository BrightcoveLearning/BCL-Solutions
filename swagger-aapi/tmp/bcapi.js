(function() {
    var e, t, n; (function(r) {
        function d(e, t) {
            return h.call(e, t)
        }
        function v(e, t) {
            var n, r, i, s, o, u, a, f, c, h, p = t && t.split("/"),
            d = l.map,
            v = d && d["*"] || {};
            if (e && e.charAt(0) === ".") if (t) {
                p = p.slice(0, p.length - 1),
                e = p.concat(e.split("/"));
                for (f = 0; f < e.length; f += 1) {
                    h = e[f];
                    if (h === ".") e.splice(f, 1),
                    f -= 1;
                    else if (h === "..") {
                        if (f === 1 && (e[2] === ".." || e[0] === "..")) break;
                        f > 0 && (e.splice(f - 1, 2), f -= 2)
                    }
                }
                e = e.join("/")
            } else e.indexOf("./") === 0 && (e = e.substring(2));
            if ((p || v) && d) {
                n = e.split("/");
                for (f = n.length; f > 0; f -= 1) {
                    r = n.slice(0, f).join("/");
                    if (p) for (c = p.length; c > 0; c -= 1) {
                        i = d[p.slice(0, c).join("/")];
                        if (i) {
                            i = i[r];
                            if (i) {
                                s = i,
                                o = f;
                                break
                            }
                        }
                    }
                    if (s) break; ! u && v && v[r] && (u = v[r], a = f)
                } ! s && u && (s = u, o = a),
                s && (n.splice(0, o, s), e = n.join("/"))
            }
            return e
        }
        function m(e, t) {
            return function() {
                return s.apply(r, p.call(arguments, 0).concat([e, t]))
            }
        }
        function g(e) {
            return function(t) {
                return v(t, e)
            }
        }
        function y(e) {
            return function(t) {
                a[e] = t
            }
        }
        function b(e) {
            if (d(f, e)) {
                var t = f[e];
                delete f[e],
                c[e] = !0,
                i.apply(r, t)
            }
            if (!d(a, e) && !d(c, e)) throw new Error("No " + e);
            return a[e]
        }
        function w(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)),
            [t, e]
        }
        function E(e) {
            return function() {
                return l && l.config && l.config[e] || {}
            }
        }
        var i, s, o, u, a = {},
        f = {},
        l = {},
        c = {},
        h = Object.prototype.hasOwnProperty,
        p = [].slice;
        o = function(e, t) {
            var n, r = w(e),
            i = r[0];
            return e = r[1],
            i && (i = v(i, t), n = b(i)),
            i ? n && n.normalize ? e = n.normalize(e, g(t)) : e = v(e, t) : (e = v(e, t), r = w(e), i = r[0], e = r[1], i && (n = b(i))),
            {
                f: i ? i + "!" + e: e,
                n: e,
                pr: i,
                p: n
            }
        },
        u = {
            require: function(e) {
                return m(e)
            },
            exports: function(e) {
                var t = a[e];
                return typeof t != "undefined" ? t: a[e] = {}
            },
            module: function(e) {
                return {
                    id: e,
                    uri: "",
                    exports: a[e],
                    config: E(e)
                }
            }
        },
        i = function(e, t, n, i) {
            var s, l, h, p, v, g = [],
            w;
            i = i || e;
            if (typeof n == "function") {
                t = !t.length && n.length ? ["require", "exports", "module"] : t;
                for (v = 0; v < t.length; v += 1) {
                    p = o(t[v], i),
                    l = p.f;
                    if (l === "require") g[v] = u.require(e);
                    else if (l === "exports") g[v] = u.exports(e),
                    w = !0;
                    else if (l === "module") s = g[v] = u.module(e);
                    else if (d(a, l) || d(f, l) || d(c, l)) g[v] = b(l);
                    else {
                        if (!p.p) throw new Error(e + " missing " + l);
                        p.p.load(p.n, m(i, !0), y(l), {}),
                        g[v] = a[l]
                    }
                }
                h = n.apply(a[e], g);
                if (e) if (s && s.exports !== r && s.exports !== a[e]) a[e] = s.exports;
                else if (h !== r || !w) a[e] = h
            } else e && (a[e] = n)
        },
        e = t = s = function(e, t, n, a, f) {
            return typeof e == "string" ? u[e] ? u[e](t) : b(o(e, t).f) : (e.splice || (l = e, t.splice ? (e = t, t = n, n = null) : e = r), t = t ||
            function() {},
            typeof n == "function" && (n = a, a = f), a ? i(r, e, t, n) : setTimeout(function() {
                i(r, e, t, n)
            },
            15), s)
        },
        s.config = function(e) {
            return l = e,
            s
        },
        n = function(e, t, n) {
            t.splice || (n = t, t = []),
            !d(a, e) && !d(f, e) && (f[e] = [e, t, n])
        },
        n.amd = {
            jQuery: !0
        }
    })(),
    n("libs/almond/almond",
    function() {}),
    function() {
        var e = this,
        t = e._,
        n = {},
        r = Array.prototype,
        i = Object.prototype,
        s = Function.prototype,
        o = r.push,
        u = r.slice,
        a = r.concat,
        f = i.toString,
        l = i.hasOwnProperty,
        c = r.forEach,
        h = r.map,
        p = r.reduce,
        d = r.reduceRight,
        v = r.filter,
        m = r.every,
        g = r.some,
        y = r.indexOf,
        b = r.lastIndexOf,
        w = Array.isArray,
        E = Object.keys,
        S = s.bind,
        x = function(e) {
            if (e instanceof x) return e;
            if (! (this instanceof x)) return new x(e);
            this._wrapped = e
        };
        typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x,
        x.VERSION = "1.4.3";
        var T = x.each = x.forEach = function(e, t, r) {
            if (e == null) return;
            if (c && e.forEach === c) e.forEach(t, r);
            else if (e.length === +e.length) {
                for (var i = 0,
                s = e.length; i < s; i++) if (t.call(r, e[i], i, e) === n) return
            } else for (var o in e) if (x.has(e, o) && t.call(r, e[o], o, e) === n) return
        };
        x.map = x.collect = function(e, t, n) {
            var r = [];
            return e == null ? r: h && e.map === h ? e.map(t, n) : (T(e,
            function(e, i, s) {
                r[r.length] = t.call(n, e, i, s)
            }), r)
        };
        var N = "Reduce of empty array with no initial value";
        x.reduce = x.foldl = x.inject = function(e, t, n, r) {
            var i = arguments.length > 2;
            e == null && (e = []);
            if (p && e.reduce === p) return r && (t = x.bind(t, r)),
            i ? e.reduce(t, n) : e.reduce(t);
            T(e,
            function(e, s, o) {
                i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
            });
            if (!i) throw new TypeError(N);
            return n
        },
        x.reduceRight = x.foldr = function(e, t, n, r) {
            var i = arguments.length > 2;
            e == null && (e = []);
            if (d && e.reduceRight === d) return r && (t = x.bind(t, r)),
            i ? e.reduceRight(t, n) : e.reduceRight(t);
            var s = e.length;
            if (s !== +s) {
                var o = x.keys(e);
                s = o.length
            }
            T(e,
            function(u, a, f) {
                a = o ? o[--s] : --s,
                i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
            });
            if (!i) throw new TypeError(N);
            return n
        },
        x.find = x.detect = function(e, t, n) {
            var r;
            return C(e,
            function(e, i, s) {
                if (t.call(n, e, i, s)) return r = e,
                !0
            }),
            r
        },
        x.filter = x.select = function(e, t, n) {
            var r = [];
            return e == null ? r: v && e.filter === v ? e.filter(t, n) : (T(e,
            function(e, i, s) {
                t.call(n, e, i, s) && (r[r.length] = e)
            }), r)
        },
        x.reject = function(e, t, n) {
            return x.filter(e,
            function(e, r, i) {
                return ! t.call(n, e, r, i)
            },
            n)
        },
        x.every = x.all = function(e, t, r) {
            t || (t = x.identity);
            var i = !0;
            return e == null ? i: m && e.every === m ? e.every(t, r) : (T(e,
            function(e, s, o) {
                if (! (i = i && t.call(r, e, s, o))) return n
            }), !!i)
        };
        var C = x.some = x.any = function(e, t, r) {
            t || (t = x.identity);
            var i = !1;
            return e == null ? i: g && e.some === g ? e.some(t, r) : (T(e,
            function(e, s, o) {
                if (i || (i = t.call(r, e, s, o))) return n
            }), !!i)
        };
        x.contains = x.include = function(e, t) {
            return e == null ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e,
            function(e) {
                return e === t
            })
        },
        x.invoke = function(e, t) {
            var n = u.call(arguments, 2);
            return x.map(e,
            function(e) {
                return (x.isFunction(t) ? t: e[t]).apply(e, n)
            })
        },
        x.pluck = function(e, t) {
            return x.map(e,
            function(e) {
                return e[t]
            })
        },
        x.where = function(e, t) {
            return x.isEmpty(t) ? [] : x.filter(e,
            function(e) {
                for (var n in t) if (t[n] !== e[n]) return ! 1;
                return ! 0
            })
        },
        x.max = function(e, t, n) {
            if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
            if (!t && x.isEmpty(e)) return - Infinity;
            var r = {
                computed: -Infinity,
                value: -Infinity
            };
            return T(e,
            function(e, i, s) {
                var o = t ? t.call(n, e, i, s) : e;
                o >= r.computed && (r = {
                    value: e,
                    computed: o
                })
            }),
            r.value
        },
        x.min = function(e, t, n) {
            if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
            if (!t && x.isEmpty(e)) return Infinity;
            var r = {
                computed: Infinity,
                value: Infinity
            };
            return T(e,
            function(e, i, s) {
                var o = t ? t.call(n, e, i, s) : e;
                o < r.computed && (r = {
                    value: e,
                    computed: o
                })
            }),
            r.value
        },
        x.shuffle = function(e) {
            var t, n = 0,
            r = [];
            return T(e,
            function(e) {
                t = x.random(n++),
                r[n - 1] = r[t],
                r[t] = e
            }),
            r
        };
        var k = function(e) {
            return x.isFunction(e) ? e: function(t) {
                return t[e]
            }
        };
        x.sortBy = function(e, t, n) {
            var r = k(t);
            return x.pluck(x.map(e,
            function(e, t, i) {
                return {
                    value: e,
                    index: t,
                    criteria: r.call(n, e, t, i)
                }
            }).sort(function(e, t) {
                var n = e.criteria,
                r = t.criteria;
                if (n !== r) {
                    if (n > r || n === void 0) return 1;
                    if (n < r || r === void 0) return - 1
                }
                return e.index < t.index ? -1 : 1
            }), "value")
        };
        var L = function(e, t, n, r) {
            var i = {},
            s = k(t || x.identity);
            return T(e,
            function(t, o) {
                var u = s.call(n, t, o, e);
                r(i, u, t)
            }),
            i
        };
        x.groupBy = function(e, t, n) {
            return L(e, t, n,
            function(e, t, n) { (x.has(e, t) ? e[t] : e[t] = []).push(n)
            })
        },
        x.countBy = function(e, t, n) {
            return L(e, t, n,
            function(e, t) {
                x.has(e, t) || (e[t] = 0),
                e[t]++
            })
        },
        x.sortedIndex = function(e, t, n, r) {
            n = n == null ? x.identity: k(n);
            var i = n.call(r, t),
            s = 0,
            o = e.length;
            while (s < o) {
                var u = s + o >>> 1;
                n.call(r, e[u]) < i ? s = u + 1 : o = u
            }
            return s
        },
        x.toArray = function(e) {
            return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
        },
        x.size = function(e) {
            return e == null ? 0 : e.length === +e.length ? e.length: x.keys(e).length
        },
        x.first = x.head = x.take = function(e, t, n) {
            return e == null ? void 0 : t != null && !n ? u.call(e, 0, t) : e[0]
        },
        x.initial = function(e, t, n) {
            return u.call(e, 0, e.length - (t == null || n ? 1 : t))
        },
        x.last = function(e, t, n) {
            return e == null ? void 0 : t != null && !n ? u.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
        },
        x.rest = x.tail = x.drop = function(e, t, n) {
            return u.call(e, t == null || n ? 1 : t)
        },
        x.compact = function(e) {
            return x.filter(e, x.identity)
        };
        var A = function(e, t, n) {
            return T(e,
            function(e) {
                x.isArray(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
            }),
            n
        };
        x.flatten = function(e, t) {
            return A(e, t, [])
        },
        x.without = function(e) {
            return x.difference(e, u.call(arguments, 1))
        },
        x.uniq = x.unique = function(e, t, n, r) {
            x.isFunction(t) && (r = n, n = t, t = !1);
            var i = n ? x.map(e, n, r) : e,
            s = [],
            o = [];
            return T(i,
            function(n, r) {
                if (t ? !r || o[o.length - 1] !== n: !x.contains(o, n)) o.push(n),
                s.push(e[r])
            }),
            s
        },
        x.union = function() {
            return x.uniq(a.apply(r, arguments))
        },
        x.intersection = function(e) {
            var t = u.call(arguments, 1);
            return x.filter(x.uniq(e),
            function(e) {
                return x.every(t,
                function(t) {
                    return x.indexOf(t, e) >= 0
                })
            })
        },
        x.difference = function(e) {
            var t = a.apply(r, u.call(arguments, 1));
            return x.filter(e,
            function(e) {
                return ! x.contains(t, e)
            })
        },
        x.zip = function() {
            var e = u.call(arguments),
            t = x.max(x.pluck(e, "length")),
            n = new Array(t);
            for (var r = 0; r < t; r++) n[r] = x.pluck(e, "" + r);
            return n
        },
        x.object = function(e, t) {
            if (e == null) return {};
            var n = {};
            for (var r = 0,
            i = e.length; r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
            return n
        },
        x.indexOf = function(e, t, n) {
            if (e == null) return - 1;
            var r = 0,
            i = e.length;
            if (n) {
                if (typeof n != "number") return r = x.sortedIndex(e, t),
                e[r] === t ? r: -1;
                r = n < 0 ? Math.max(0, i + n) : n
            }
            if (y && e.indexOf === y) return e.indexOf(t, n);
            for (; r < i; r++) if (e[r] === t) return r;
            return - 1
        },
        x.lastIndexOf = function(e, t, n) {
            if (e == null) return - 1;
            var r = n != null;
            if (b && e.lastIndexOf === b) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
            var i = r ? n: e.length;
            while (i--) if (e[i] === t) return i;
            return - 1
        },
        x.range = function(e, t, n) {
            arguments.length <= 1 && (t = e || 0, e = 0),
            n = arguments[2] || 1;
            var r = Math.max(Math.ceil((t - e) / n), 0),
            i = 0,
            s = new Array(r);
            while (i < r) s[i++] = e,
            e += n;
            return s
        };
        var O = function() {};
        x.bind = function(e, t) {
            var n, r;
            if (e.bind === S && S) return S.apply(e, u.call(arguments, 1));
            if (!x.isFunction(e)) throw new TypeError;
            return n = u.call(arguments, 2),
            r = function() {
                if (this instanceof r) {
                    O.prototype = e.prototype;
                    var i = new O;
                    O.prototype = null;
                    var s = e.apply(i, n.concat(u.call(arguments)));
                    return Object(s) === s ? s: i
                }
                return e.apply(t, n.concat(u.call(arguments)))
            }
        },
        x.bindAll = function(e) {
            var t = u.call(arguments, 1);
            return t.length == 0 && (t = x.functions(e)),
            T(t,
            function(t) {
                e[t] = x.bind(e[t], e)
            }),
            e
        },
        x.memoize = function(e, t) {
            var n = {};
            return t || (t = x.identity),
            function() {
                var r = t.apply(this, arguments);
                return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
            }
        },
        x.delay = function(e, t) {
            var n = u.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null, n)
            },
            t)
        },
        x.defer = function(e) {
            return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
        },
        x.throttle = function(e, t) {
            var n, r, i, s, o = 0,
            u = function() {
                o = new Date,
                i = null,
                s = e.apply(n, r)
            };
            return function() {
                var a = new Date,
                f = t - (a - o);
                return n = this,
                r = arguments,
                f <= 0 ? (clearTimeout(i), i = null, o = a, s = e.apply(n, r)) : i || (i = setTimeout(u, f)),
                s
            }
        },
        x.debounce = function(e, t, n) {
            var r, i;
            return function() {
                var s = this,
                o = arguments,
                u = function() {
                    r = null,
                    n || (i = e.apply(s, o))
                },
                a = n && !r;
                return clearTimeout(r),
                r = setTimeout(u, t),
                a && (i = e.apply(s, o)),
                i
            }
        },
        x.once = function(e) {
            var t = !1,
            n;
            return function() {
                return t ? n: (t = !0, n = e.apply(this, arguments), e = null, n)
            }
        },
        x.wrap = function(e, t) {
            return function() {
                var n = [e];
                return o.apply(n, arguments),
                t.apply(this, n)
            }
        },
        x.compose = function() {
            var e = arguments;
            return function() {
                var t = arguments;
                for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
                return t[0]
            }
        },
        x.after = function(e, t) {
            return e <= 0 ? t() : function() {
                if (--e < 1) return t.apply(this, arguments)
            }
        },
        x.keys = E ||
        function(e) {
            if (e !== Object(e)) throw new TypeError("Invalid object");
            var t = [];
            for (var n in e) x.has(e, n) && (t[t.length] = n);
            return t
        },
        x.values = function(e) {
            var t = [];
            for (var n in e) x.has(e, n) && t.push(e[n]);
            return t
        },
        x.pairs = function(e) {
            var t = [];
            for (var n in e) x.has(e, n) && t.push([n, e[n]]);
            return t
        },
        x.invert = function(e) {
            var t = {};
            for (var n in e) x.has(e, n) && (t[e[n]] = n);
            return t
        },
        x.functions = x.methods = function(e) {
            var t = [];
            for (var n in e) x.isFunction(e[n]) && t.push(n);
            return t.sort()
        },
        x.extend = function(e) {
            return T(u.call(arguments, 1),
            function(t) {
                if (t) for (var n in t) e[n] = t[n]
            }),
            e
        },
        x.pick = function(e) {
            var t = {},
            n = a.apply(r, u.call(arguments, 1));
            return T(n,
            function(n) {
                n in e && (t[n] = e[n])
            }),
            t
        },
        x.omit = function(e) {
            var t = {},
            n = a.apply(r, u.call(arguments, 1));
            for (var i in e) x.contains(n, i) || (t[i] = e[i]);
            return t
        },
        x.defaults = function(e) {
            return T(u.call(arguments, 1),
            function(t) {
                if (t) for (var n in t) e[n] == null && (e[n] = t[n])
            }),
            e
        },
        x.clone = function(e) {
            return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({},
            e) : e
        },
        x.tap = function(e, t) {
            return t(e),
            e
        };
        var M = function(e, t, n, r) {
            if (e === t) return e !== 0 || 1 / e == 1 / t;
            if (e == null || t == null) return e === t;
            e instanceof x && (e = e._wrapped),
            t instanceof x && (t = t._wrapped);
            var i = f.call(e);
            if (i != f.call(t)) return ! 1;
            switch (i) {
            case "[object String]":
                return e == String(t);
            case "[object Number]":
                return e != +e ? t != +t: e == 0 ? 1 / e == 1 / t: e == +t;
            case "[object Date]":
            case "[object Boolean]":
                return + e == +t;
            case "[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
            }
            if (typeof e != "object" || typeof t != "object") return ! 1;
            var s = n.length;
            while (s--) if (n[s] == e) return r[s] == t;
            n.push(e),
            r.push(t);
            var o = 0,
            u = !0;
            if (i == "[object Array]") {
                o = e.length,
                u = o == t.length;
                if (u) while (o--) if (! (u = M(e[o], t[o], n, r))) break
            } else {
                var a = e.constructor,
                l = t.constructor;
                if (a !== l && !(x.isFunction(a) && a instanceof a && x.isFunction(l) && l instanceof l)) return ! 1;
                for (var c in e) if (x.has(e, c)) {
                    o++;
                    if (! (u = x.has(t, c) && M(e[c], t[c], n, r))) break
                }
                if (u) {
                    for (c in t) if (x.has(t, c) && !(o--)) break;
                    u = !o
                }
            }
            return n.pop(),
            r.pop(),
            u
        };
        x.isEqual = function(e, t) {
            return M(e, t, [], [])
        },
        x.isEmpty = function(e) {
            if (e == null) return ! 0;
            if (x.isArray(e) || x.isString(e)) return e.length === 0;
            for (var t in e) if (x.has(e, t)) return ! 1;
            return ! 0
        },
        x.isElement = function(e) {
            return !! e && e.nodeType === 1
        },
        x.isArray = w ||
        function(e) {
            return f.call(e) == "[object Array]"
        },
        x.isObject = function(e) {
            return e === Object(e)
        },
        T(["Arguments", "Function", "String", "Number", "Date", "RegExp"],
        function(e) {
            x["is" + e] = function(t) {
                return f.call(t) == "[object " + e + "]"
            }
        }),
        x.isArguments(arguments) || (x.isArguments = function(e) {
            return !! e && !!x.has(e, "callee")
        }),
        typeof / . / !="function" && (x.isFunction = function(e) {
            return typeof e == "function"
        }),
        x.isFinite = function(e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        },
        x.isNaN = function(e) {
            return x.isNumber(e) && e != +e
        },
        x.isBoolean = function(e) {
            return e === !0 || e === !1 || f.call(e) == "[object Boolean]"
        },
        x.isNull = function(e) {
            return e === null
        },
        x.isUndefined = function(e) {
            return e === void 0
        },
        x.has = function(e, t) {
            return l.call(e, t)
        },
        x.noConflict = function() {
            return e._ = t,
            this
        },
        x.identity = function(e) {
            return e
        },
        x.times = function(e, t, n) {
            var r = Array(e);
            for (var i = 0; i < e; i++) r[i] = t.call(n, i);
            return r
        },
        x.random = function(e, t) {
            return t == null && (t = e, e = 0),
            e + (0 | Math.random() * (t - e + 1))
        };
        var _ = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2F;"
            }
        };
        _.unescape = x.invert(_.escape);
        var D = {
            escape: new RegExp("[" + x.keys(_.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + x.keys(_.unescape).join("|") + ")", "g")
        };
        x.each(["escape", "unescape"],
        function(e) {
            x[e] = function(t) {
                return t == null ? "": ("" + t).replace(D[e],
                function(t) {
                    return _[e][t]
                })
            }
        }),
        x.result = function(e, t) {
            if (e == null) return null;
            var n = e[t];
            return x.isFunction(n) ? n.call(e) : n
        },
        x.mixin = function(e) {
            T(x.functions(e),
            function(t) {
                var n = x[t] = e[t];
                x.prototype[t] = function() {
                    var e = [this._wrapped];
                    return o.apply(e, arguments),
                    F.call(this, n.apply(x, e))
                }
            })
        };
        var P = 0;
        x.uniqueId = function(e) {
            var t = "" + ++P;
            return e ? e + t: t
        },
        x.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var H = /(.)^/,
        B = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "   ": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        j = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        x.template = function(e, t, n) {
            n = x.defaults({},
            n, x.templateSettings);
            var r = new RegExp([(n.escape || H).source, (n.interpolate || H).source, (n.evaluate || H).source].join("|") + "|$", "g"),
            i = 0,
            s = "__p+='";
            e.replace(r,
            function(t, n, r, o, u) {
                return s += e.slice(i, u).replace(j,
                function(e) {
                    return "\\" + B[e]
                }),
                n && (s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"),
                r && (s += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"),
                o && (s += "';\n" + o + "\n__p+='"),
                i = u + t.length,
                t
            }),
            s += "';\n",
            n.variable || (s = "with(obj||{}){\n" + s + "}\n"),
            s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
            try {
                var o = new Function(n.variable || "obj", "_", s)
            } catch(u) {
                throw u.source = s,
                u
            }
            if (t) return o(t, x);
            var a = function(e) {
                return o.call(this, e, x)
            };
            return a.source = "function(" + (n.variable || "obj") + "){\n" + s + "}",
            a
        },
        x.chain = function(e) {
            return x(e).chain()
        };
        var F = function(e) {
            return this._chain ? x(e).chain() : e
        };
        x.mixin(x),
        T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
        function(e) {
            var t = r[e];
            x.prototype[e] = function() {
                var n = this._wrapped;
                return t.apply(n, arguments),
                (e == "shift" || e == "splice") && n.length === 0 && delete n[0],
                F.call(this, n)
            }
        }),
        T(["concat", "join", "slice"],
        function(e) {
            var t = r[e];
            x.prototype[e] = function() {
                return F.call(this, t.apply(this._wrapped, arguments))
            }
        }),
        x.extend(x.prototype, {
            chain: function() {
                return this._chain = !0,
                this
            },
            value: function() {
                return this._wrapped
            }
        })
    }.call(this),
    n("underscore",
    function(e) {
        return function() {
            var t, n;
            return t || e._
        }
    } (this)),
    function() {
        var e, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q, R, U, z, W, X, V, $ = [].slice,
        J = {}.hasOwnProperty,
        K = function(e, t) {
            function r() {
                this.constructor = e
            }
            for (var n in t) J.call(t, n) && (e[n] = t[n]);
            return r.prototype = t.prototype,
            e.prototype = new r,
            e.__super__ = t.prototype,
            e
        },
        Q = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        };
        typeof module != "undefined" && module !== null ? (module.exports = e = {},
        e.Bacon = e) : (typeof t == "function" && t.amd != null && n("bacon", [],
        function() {
            return e
        }), this.Bacon = e = {}),
        e.fromBinder = function(t, n) {
            return n == null && (n = X.id),
            new a(function(r) {
                var i;
                return i = t(function() {
                    var t, s, o, a, f, l, c;
                    t = 1 <= arguments.length ? $.call(arguments, 0) : [],
                    a = n.apply(null, t),
                    a instanceof Array && X.last(a) instanceof u || (a = [a]),
                    c = [];
                    for (f = 0, l = a.length; f < l; f++) s = a[f],
                    o = r(s = q(s)),
                    o === e.noMore || s.isEnd() ? i != null ? c.push(i()) : c.push(e.scheduler.setTimeout(function() {
                        return i()
                    },
                    0)) : c.push(void 0);
                    return c
                })
            })
        },
        e.$ = {
            asEventStream: function(t, n, r) {
                var i, s = this;
                return A(n) && (i = [n, null], r = i[0], n = i[1]),
                e.fromBinder(function(e) {
                    return s.on(t, n, e),
                    function() {
                        return s.off(t, n, e)
                    }
                },
                r)
            }
        },
        (V = typeof jQuery !== "undefined" && jQuery !== null ? jQuery: typeof Zepto !== "undefined" && Zepto !== null ? Zepto: null) != null && (V.fn.asEventStream = e.$.asEventStream),
        e.fromEventTarget = function(t, n, r) {
            var i, s, o, u, a, f;
            return i = (o = t.addEventListener) != null ? o: (u = t.addListener) != null ? u: t.bind,
            s = (a = t.removeEventListener) != null ? a: (f = t.removeListener) != null ? f: t.unbind,
            e.fromBinder(function(e) {
                return i.call(t, n, e),
                function() {
                    return s.call(t, n, e)
                }
            },
            r)
        },
        e.fromPromise = function(t) {
            return e.fromBinder(function(e) {
                return t.then(e,
                function(t) {
                    return e(new o(t))
                }),
                function() {
                    return typeof t.abort == "function" ? t.abort() : void 0
                }
            },
            function(e) {
                return [e, T()]
            })
        },
        e.noMore = ["<no-more>"],
        e.more = ["<more>"],
        e.later = function(t, n) {
            return e.sequentially(t, [n])
        },
        e.sequentially = function(t, n) {
            var r;
            return r = 0,
            e.fromPoll(t,
            function() {
                var e;
                return e = n[r++],
                r < n.length ? e: [e, T()]
            })
        },
        e.repeatedly = function(t, n) {
            var r;
            return r = 0,
            e.fromPoll(t,
            function() {
                return n[r++%n.length]
            })
        },
        M = function(t) {
            return function() {
                var n, r, i;
                return r = arguments[0],
                n = 2 <= arguments.length ? $.call(arguments, 1) : [],
                i = j(t, [function(e, t) {
                    return r.apply(null, $.call(e).concat([t]))
                }]),
                e.combineAsArray(n).flatMap(i)
            }
        },
        e.fromCallback = M(function() {
            var t, n;
            return n = arguments[0],
            t = 2 <= arguments.length ? $.call(arguments, 1) : [],
            e.fromBinder(function(e) {
                return _(n, t)(e),
                B
            },
            function(e) {
                return [e, T()]
            })
        }),
        e.fromNodeCallback = M(function() {
            var t, n;
            return n = arguments[0],
            t = 2 <= arguments.length ? $.call(arguments, 1) : [],
            e.fromBinder(function(e) {
                return _(n, t)(e),
                B
            },
            function(e, t) {
                return e ? [new o(e), T()] : [t, T()]
            })
        }),
        e.fromPoll = function(t, n) {
            return e.fromBinder(function(n) {
                var r;
                return r = e.scheduler.setInterval(n, t),
                function() {
                    return e.scheduler.clearInterval(r)
                }
            },
            n)
        },
        e.interval = function(t, n) {
            return n == null && (n = {}),
            e.fromPoll(t,
            function() {
                return H(n)
            })
        },
        e.constant = function(e) {
            return new p(F([e], k), !0)
        },
        e.never = function() {
            return e.fromArray([])
        },
        e.once = function(t) {
            return e.fromArray([t])
        },
        e.fromArray = function(e) {
            return new a(F(e, H))
        },
        F = function(e, t) {
            return function(n) {
                var r, i, s;
                for (i = 0, s = e.length; i < s; i++) r = e[i],
                n(t(r));
                return n(T()),
                B
            }
        },
        e.mergeAll = function(e) {
            var t, n, r, i, s;
            y(e),
            n = X.head(e),
            s = X.tail(e);
            for (r = 0, i = s.length; r < i; r++) t = s[r],
            n = n.merge(t);
            return n
        },
        e.zipAsArray = function() {
            var t, n;
            return n = arguments[0],
            t = 2 <= arguments.length ? $.call(arguments, 1) : [],
            n instanceof Array || (n = [n].concat(t)),
            e.zipWith(n, Array)
        },
        e.zipWith = function(t, n) {
            return new a(function(r) {
                var i, s, o, u, a, f, l, c, h, p;
                i = function() {
                    var e, n, r;
                    r = [];
                    for (e = 0, n = t.length; e < n; e++) u = t[e],
                    r.push([]);
                    return r
                } (),
                l = !1,
                f = function() {
                    var e, n, r;
                    r = [];
                    for (e = 0, n = t.length; e < n; e++) u = t[e],
                    r.push(B);
                    return r
                } (),
                a = function() {
                    var e, t;
                    for (e = 0, t = f.length; e < t; e++) n = f[e],
                    n();
                    return l = !0
                },
                c = function(t) {
                    var n;
                    return n = r(t),
                    (n === e.noMore || t.isEnd()) && a(),
                    n
                },
                s = function(t) {
                    return function(r) {
                        var s, o, u;
                        return r.isError() ? c(r) : r.isInitial() ? e.more: (i[t].push(r), !r.isEnd() && X.all(function() {
                            var e, t, n;
                            n = [];
                            for (e = 0, t = i.length; e < t; e++) s = i[e],
                            n.push(s.length);
                            return n
                        } ()) && (u = function() {
                            var e, t, n;
                            n = [];
                            for (e = 0, t = i.length; e < t; e++) s = i[e],
                            n.push(s.shift().value());
                            return n
                        } (), o = c(r.apply(X.always(n.apply(null, u))))), X.any(function() {
                            var e, t, n;
                            n = [];
                            for (e = 0, t = i.length; e < t; e++) s = i[e],
                            n.push(s.length && s[0].isEnd());
                            return n
                        } ()) && (o = c(T())), o || e.more)
                    }
                };
                for (o = h = 0, p = t.length; h < p; o = ++h) u = t[o],
                f[o] = function(e) {
                    if (!l) return u.subscribe(s(e))
                } (o);
                return a
            })
        },
        e.combineAsArray = function() {
            var t, n, r, i, s = this;
            return r = arguments[0],
            t = 2 <= arguments.length ? $.call(arguments, 1) : [],
            r instanceof Array || (r = [r].concat(t)),
            r.length ? (i = function() {
                var e, t, i;
                i = [];
                for (e = 0, t = r.length; e < t; e++) n = r[e],
                i.push(c);
                return i
            } (), new p(function(t) {
                var s, o, u, a, f, l, c, p, d, m, g, y;
                m = !1,
                d = function() {
                    var e, t, i;
                    i = [];
                    for (e = 0, t = r.length; e < t; e++) n = r[e],
                    i.push(B);
                    return i
                } (),
                p = function() {
                    var e, t, n;
                    for (t = 0, n = d.length; t < n; t++) e = d[t],
                    e();
                    return m = !0
                },
                u = function() {
                    var e, t, i;
                    i = [];
                    for (e = 0, t = r.length; e < t; e++) n = r[e],
                    i.push(!1);
                    return i
                } (),
                s = function() {
                    var n;
                    if (X.all(u)) return n = t(T()),
                    n === e.noMore && p(),
                    n
                },
                f = !1,
                o = function(n, r) {
                    return function(o) {
                        var u, a;
                        return o.isEnd() ? (n(), s(), e.noMore) : o.isError() ? (u = t(o), u === e.noMore && p(), u) : (r(o.value), X.all(X.map(function(e) {
                            return e.isDefined
                        },
                        i)) ? f && o.isInitial() ? e.more: (f = !0, a = function() {
                            var e, t, n, r;
                            r = [];
                            for (t = 0, n = i.length; t < n; t++) e = i[t],
                            r.push(e.get()());
                            return r
                        },
                        u = t(o.apply(a)), u === e.noMore && p(), u) : e.more)
                    }
                },
                l = function(e) {
                    return o(function() {
                        return u[e] = !0
                    },
                    function(t) {
                        return i[e] = new v(t)
                    })
                };
                for (a = g = 0, y = r.length; g < y; a = ++g) c = r[a],
                c instanceof h || (c = e.constant(c)),
                m || (d[a] = c.subscribe(l(a)));
                return p
            })) : e.constant([])
        },
        e.onValues = function() {
            var t, n, r;
            return n = 2 <= arguments.length ? $.call(arguments, 0, r = arguments.length - 1) : (r = 0, []),
            t = arguments[r++],
            e.combineAsArray(n).onValues(t)
        },
        e.combineWith = function() {
            var t, n;
            return t = arguments[0],
            n = 2 <= arguments.length ? $.call(arguments, 1) : [],
            e.combineAsArray(n).map(function(e) {
                return t.apply(null, e)
            })
        },
        e.combineTemplate = function(t) {
            var n, r, i, s, o, u, a, f, l, c;
            return a = [],
            c = [],
            u = function(e) {
                return e[e.length - 1]
            },
            l = function(e, t, n) {
                return u(e)[t] = n
            },
            n = function(e, t) {
                return function(n, r) {
                    return l(n, e, r[t])
                }
            },
            o = function(e, t) {
                return function(n, r) {
                    return l(n, e, t)
                }
            },
            f = function(e) {
                return e instanceof Array ? [] : {}
            },
            i = function(e, t) {
                var r, i;
                return t instanceof h ? (c.push(t), a.push(n(e, c.length - 1))) : typeof t == "object" ? (i = function(e) {
                    return function(n, r) {
                        var i;
                        return i = f(t),
                        l(n, e, i),
                        n.push(i)
                    }
                },
                r = function(e, t) {
                    return e.pop()
                },
                a.push(i(e)), s(t), a.push(r)) : a.push(o(e, t))
            },
            s = function(e) {
                return X.each(e, i)
            },
            s(t),
            r = function(e) {
                var n, r, i, s, o;
                i = f(t),
                n = [i];
                for (s = 0, o = a.length; s < o; s++) r = a[s],
                r(n, e);
                return i
            },
            e.combineAsArray(c).map(r)
        },
        u = function() {
            function e() {}
            return e.prototype.isEvent = function() {
                return ! 0
            },
            e.prototype.isEnd = function() {
                return ! 1
            },
            e.prototype.isInitial = function() {
                return ! 1
            },
            e.prototype.isNext = function() {
                return ! 1
            },
            e.prototype.isError = function() {
                return ! 1
            },
            e.prototype.hasValue = function() {
                return ! 1
            },
            e.prototype.filter = function(e) {
                return ! 0
            },
            e.prototype.onDone = function(e) {
                return e()
            },
            e
        } (),
        l = function(e) {
            function t(e, t) {
                var n = this;
                A(e) ? this.value = function() {
                    var t;
                    return t = e(),
                    n.value = X.always(t),
                    t
                }: this.value = X.always(e)
            }
            return K(t, e),
            t.prototype.isNext = function() {
                return ! 0
            },
            t.prototype.hasValue = function() {
                return ! 0
            },
            t.prototype.fmap = function(e) {
                var t = this;
                return this.apply(function() {
                    return e(t.value())
                })
            },
            t.prototype.apply = function(e) {
                return new t(e)
            },
            t.prototype.filter = function(e) {
                return e(this.value())
            },
            t.prototype.describe = function() {
                return this.value()
            },
            t
        } (u),
        f = function(e) {
            function t() {
                return t.__super__.constructor.apply(this, arguments)
            }
            return K(t, e),
            t.prototype.isInitial = function() {
                return ! 0
            },
            t.prototype.isNext = function() {
                return ! 1
            },
            t.prototype.apply = function(e) {
                return new t(e)
            },
            t.prototype.toNext = function() {
                return new l(this.value)
            },
            t
        } (l),
        s = function(e) {
            function t() {
                return t.__super__.constructor.apply(this, arguments)
            }
            return K(t, e),
            t.prototype.isEnd = function() {
                return ! 0
            },
            t.prototype.fmap = function() {
                return this
            },
            t.prototype.apply = function() {
                return this
            },
            t.prototype.describe = function() {
                return "<end>"
            },
            t
        } (u),
        o = function(e) {
            function t(e) {
                this.error = e
            }
            return K(t, e),
            t.prototype.isError = function() {
                return ! 0
            },
            t.prototype.fmap = function() {
                return this
            },
            t.prototype.apply = function() {
                return this
            },
            t.prototype.describe = function() {
                return "<error> " + this.error
            },
            t
        } (u),
        h = function() {
            function t() {
                this.combine = Q(this.combine, this),
                this.flatMapLatest = Q(this.flatMapLatest, this),
                this.scan = Q(this.scan, this),
                this.takeUntil = Q(this.takeUntil, this),
                this.assign = this.onValue
            }
            return t.prototype.onValue = function() {
                var e, t;
                return t = arguments[0],
                e = 2 <= arguments.length ? $.call(arguments, 1) : [],
                t = _(t, e),
                this.subscribe(function(e) {
                    if (e.hasValue()) return t(e.value())
                })
            },
            t.prototype.onValues = function(e) {
                return this.onValue(function(t) {
                    return e.apply(null, t)
                })
            },
            t.prototype.onError = function() {
                var e, t;
                return t = arguments[0],
                e = 2 <= arguments.length ? $.call(arguments, 1) : [],
                t = _(t, e),
                this.subscribe(function(e) {
                    if (e.isError()) return t(e.error)
                })
            },
            t.prototype.onEnd = function() {
                var e, t;
                return t = arguments[0],
                e = 2 <= arguments.length ? $.call(arguments, 1) : [],
                t = _(t, e),
                this.subscribe(function(e) {
                    if (e.isEnd()) return t()
                })
            },
            t.prototype.errors = function() {
                return this.filter(function() {
                    return ! 1
                })
            },
            t.prototype.filter = function() {
                var t, n;
                return n = arguments[0],
                t = 2 <= arguments.length ? $.call(arguments, 1) : [],
                n instanceof p ? n.sampledBy(this,
                function(e, t) {
                    return [e, t]
                }).filter(function(e) {
                    var t, n;
                    return t = e[0],
                    n = e[1],
                    t
                }).map(function(e) {
                    var t, n;
                    return t = e[0],
                    n = e[1],
                    n
                }) : (n = _(n, t), this.withHandler(function(t) {
                    return t.filter(n) ? this.push(t) : e.more
                }))
            },
            t.prototype.takeWhile = function() {
                var t, n;
                return n = arguments[0],
                t = 2 <= arguments.length ? $.call(arguments, 1) : [],
                n = _(n, t),
                this.withHandler(function(t) {
                    return t.filter(n) ? this.push(t) : (this.push(T()), e.noMore)
                })
            },
            t.prototype.endOnError = function() {
                return this.withHandler(function(e) {
                    return e.isError() ? (this.push(e), this.push(T())) : this.push(e)
                })
            },
            t.prototype.take = function(t) {
                return t <= 0 ? e.never() : this.withHandler(function(n) {
                    return n.hasValue() ? (t--, t > 0 ? this.push(n) : (this.push(n), this.push(T()), e.noMore)) : this.push(n)
                })
            },
            t.prototype.map = function() {
                var e, t;
                return t = arguments[0],
                e = 2 <= arguments.length ? $.call(arguments, 1) : [],
                t = _(t, e),
                this.withHandler(function(e) {
                    return this.push(e.fmap(t))
                })
            },
            t.prototype.mapError = function() {
                var e, t;
                return t = arguments[0],
                e = 2 <= arguments.length ? $.call(arguments, 1) : [],
                t = _(t, e),
                this.withHandler(function(e) {
                    return e.isError() ? this.push(H(t(e.error))) : this.push(e)
                })
            },
            t.prototype.mapEnd = function() {
                var t, n;
                return n = arguments[0],
                t = 2 <= arguments.length ? $.call(arguments, 1) : [],
                n = _(n, t),
                this.withHandler(function(t) {
                    return t.isEnd() ? (this.push(H(n(t))), this.push(T()), e.noMore) : this.push(t)
                })
            },
            t.prototype.doAction = function() {
                var e, t;
                return t = arguments[0],
                e = 2 <= arguments.length ? $.call(arguments, 1) : [],
                t = _(t, e),
                this.withHandler(function(e) {
                    return e.hasValue() && t(e.value()),
                    this.push(e)
                })
            },
            t.prototype.takeUntil = function(t) {
                var n;
                return n = this,
                this.withSubscribe(function(r) {
                    var i, s, o, u, a, f;
                    return f = !1,
                    u = B,
                    a = B,
                    o = function() {
                        return u(),
                        a(),
                        f = !0
                    },
                    i = function(t) {
                        return t.isEnd() ? (a(), r(t), e.noMore) : (t.onDone(function() {
                            var n;
                            if (!f) {
                                n = r(t);
                                if (n === e.noMore) return o()
                            }
                        }), e.more)
                    },
                    s = function(t) {
                        return t.isError() ? e.more: t.isEnd() ? e.noMore: (u(), r(T()), e.noMore)
                    },
                    u = n.subscribe(i),
                    f || (a = t.subscribe(s)),
                    o
                })
            },
            t.prototype.skip = function(t) {
                return this.withHandler(function(n) {
                    return n.hasValue() ? t > 0 ? (t--, e.more) : this.push(n) : this.push(n)
                })
            },
            t.prototype.skipDuplicates = function(e) {
                return e == null && (e = function(e, t) {
                    return e === t
                }),
                this.withStateMachine(c,
                function(t, n) {
                    return n.hasValue() ? t === c || !e(t.get(), n.value()) ? [new v(n.value()), [n]] : [t, []] : [t, [n]]
                })
            },
            t.prototype.withStateMachine = function(t, n) {
                var r;
                return r = t,
                this.withHandler(function(t) {
                    var i, s, o, u, a, f, l;
                    i = n(r, t),
                    s = i[0],
                    u = i[1],
                    r = s,
                    a = e.more;
                    for (f = 0, l = u.length; f < l; f++) {
                        o = u[f],
                        a = this.push(o);
                        if (a === e.noMore) return a
                    }
                    return a
                })
            },
            t.prototype.scan = function(t, n) {
                var r, i, s = this;
                return n = I(n),
                r = z(t),
                i = function(t) {
                    var i, o;
                    return i = !1,
                    o = s.subscribe(function(s) {
                        return s.hasValue() ? i && s.isInitial() ? e.more: (i = !0, r = new v(n(r.getOrElse(void 0), s.value())), t(s.apply(X.always(r.get())))) : (s.isEnd() && (i = !0), t(s))
                    }),
                    i || r.forEach(function(n) {
                        var r;
                        r = t(k(n));
                        if (r === e.noMore) return o(),
                        o = B
                    }),
                    o
                },
                new p(i)
            },
            t.prototype.zip = function(t, n) {
                return n == null && (n = Array),
                e.zipWith([this, t], n)
            },
            t.prototype.diff = function(e, t) {
                return t = I(t),
                this.scan([e],
                function(e, n) {
                    return [n, t(e[0], n)]
                }).filter(function(e) {
                    return e.length === 2
                }).map(function(e) {
                    return e[1]
                })
            },
            t.prototype.flatMap = function(n) {
                var r;
                return n = D(n),
                r = this,
                new a(function(i) {
                    var s, o, u, a, l, c;
                    return o = [],
                    u = !1,
                    c = function() {},
                    l = function() {
                        var e, t, n;
                        c();
                        for (t = 0, n = o.length; t < n; t++) e = o[t],
                        e();
                        return o = []
                    },
                    s = function() {
                        if (u && o.length === 0) return i(T())
                    },
                    a = function(r) {
                        var a, c, h, p, d;
                        if (r.isEnd()) return u = !0,
                        s();
                        if (r.isError()) return i(r);
                        a = n(r.value()),
                        a instanceof t || (a = e.once(a)),
                        d = void 0,
                        c = !1,
                        p = function() {
                            return d != null && X.remove(d, o),
                            s()
                        },
                        h = function(t) {
                            var n;
                            return t.isEnd() ? (p(), c = !0, e.noMore) : (t instanceof f && (t = t.toNext()), n = i(t), n === e.noMore && l(), n)
                        },
                        d = a.subscribe(h);
                        if (!c) return o.push(d)
                    },
                    c = r.subscribe(a),
                    l
                })
            },
            t.prototype.flatMapLatest = function(e) {
                var t, n = this;
                return e = D(e),
                t = this.toEventStream(),
                t.flatMap(function(n) {
                    return e(n).takeUntil(t)
                })
            },
            t.prototype.not = function() {
                return this.map(function(e) {
                    return ! e
                })
            },
            t.prototype.log = function() {
                var e;
                return e = 1 <= arguments.length ? $.call(arguments, 0) : [],
                this.subscribe(function(t) {
                    return typeof console != "undefined" && console !== null ? typeof console.log == "function" ? console.log.apply(console, $.call(e).concat([t.describe()])) : void 0 : void 0
                }),
                this
            },
            t.prototype.slidingWindow = function(e) {
                return this.scan([],
                function(t, n) {
                    return t.concat([n]).slice( - e)
                })
            },
            t.prototype.combine = function(t, n) {
                var r;
                return r = I(n),
                e.combineAsArray(this, t).map(function(e) {
                    return r(e[0], e[1])
                })
            },
            t
        } (),
        a = function(t) {
            function n(e) {
                var t;
                n.__super__.constructor.call(this),
                w(e),
                t = new i(e),
                this.subscribe = t.subscribe,
                this.hasSubscribers = t.hasSubscribers
            }
            return K(n, t),
            n.prototype.map = function() {
                var e, t;
                return t = arguments[0],
                e = 2 <= arguments.length ? $.call(arguments, 1) : [],
                t instanceof p ? t.sampledBy(this, N) : n.__super__.map.apply(this, [t].concat($.call(e)))
            },
            n.prototype.delay = function(t) {
                return this.flatMap(function(n) {
                    return e.later(t, n)
                })
            },
            n.prototype.debounce = function(t) {
                return this.flatMapLatest(function(n) {
                    return e.later(t, n)
                })
            },
            n.prototype.throttle = function(e) {
                return this.bufferWithTime(e).map(function(e) {
                    return e[e.length - 1]
                })
            },
            n.prototype.bufferWithTime = function(e) {
                var t, n = this;
                return t = function(e) {
                    return e.schedule()
                },
                this.buffer(e, t, t)
            },
            n.prototype.bufferWithCount = function(e) {
                var t;
                return t = function(t) {
                    if (t.values.length === e) return t.flush()
                },
                this.buffer(0, t)
            },
            n.prototype.buffer = function(t, n, r) {
                var i, s, o;
                return n == null && (n = function() {}),
                r == null && (r = function() {}),
                i = {
                    scheduled: !1,
                    end: null,
                    values: [],
                    flush: function() {
                        var t;
                        this.scheduled = !1;
                        if (this.values.length > 0) {
                            t = this.push(H(this.values)),
                            this.values = [];
                            if (this.end != null) return this.push(this.end);
                            if (t !== e.noMore) return r(this)
                        } else if (this.end != null) return this.push(this.end)
                    },
                    schedule: function() {
                        var e = this;
                        if (!this.scheduled) return this.scheduled = !0,
                        t(function() {
                            return e.flush()
                        })
                    }
                },
                o = e.more,
                A(t) || (s = t, t = function(t) {
                    return e.scheduler.setTimeout(t, s)
                }),
                this.withHandler(function(e) {
                    return i.push = this.push,
                    e.isError() ? o = this.push(e) : e.isEnd() ? (i.end = e, i.scheduled || i.flush()) : (i.values.push(e.value()), n(i)),
                    o
                })
            },
            n.prototype.merge = function(t) {
                var r;
                return r = this,
                new n(function(n) {
                    var i, s, o, u, a, f;
                    return u = B,
                    a = B,
                    f = !1,
                    o = function() {
                        return u(),
                        a(),
                        f = !0
                    },
                    i = 0,
                    s = function(t) {
                        var r;
                        return t.isEnd() ? (i++, i === 2 ? n(T()) : e.more) : (r = n(t), r === e.noMore && o(), r)
                    },
                    u = r.subscribe(s),
                    f || (a = t.subscribe(s)),
                    o
                })
            },
            n.prototype.toProperty = function(e) {
                return arguments.length === 0 && (e = c),
                this.scan(e, O)
            },
            n.prototype.toEventStream = function() {
                return this
            },
            n.prototype.concat = function(e) {
                var t;
                return t = this,
                new n(function(n) {
                    var r;
                    return r = t.subscribe(function(t) {
                        return t.isEnd() ? r = e.subscribe(n) : n(t)
                    }),
                    function() {
                        return r()
                    }
                })
            },
            n.prototype.awaiting = function(e) {
                return this.map(!0).merge(e.map(!1)).toProperty(!1)
            },
            n.prototype.startWith = function(t) {
                return e.once(t).concat(this)
            },
            n.prototype.withHandler = function(e) {
                var t;
                return t = new i(this.subscribe, e),
                new n(t.subscribe)
            },
            n.prototype.withSubscribe = function(e) {
                return new n(e)
            },
            n
        } (h),
        p = function(t) {
            function n(t, r) {
                this.toEventStream = Q(this.toEventStream, this),
                this.toProperty = Q(this.toProperty, this),
                this.changes = Q(this.changes, this),
                this.sample = Q(this.sample, this);
                var i, s = this;
                n.__super__.constructor.call(this),
                r === !0 ? this.subscribe = t: this.subscribe = (new d(t, r)).subscribe,
                i = function(t, r, i) {
                    var o, u;
                    return o = c,
                    u = c,
                    new n(function(n) {
                        var a, f, l, c, h, p, d, m, g, y, b;
                        return b = !1,
                        g = B,
                        y = B,
                        m = function() {
                            return g(),
                            y(),
                            b = !0
                        },
                        c = !1,
                        p = !1,
                        a = function() {
                            var t;
                            if (c && p) return t = n(T()),
                            t === e.noMore && m(),
                            t
                        },
                        l = !1,
                        f = function(t, r, i) {
                            return function(s) {
                                var f;
                                return s.isEnd() ? (t(), a(), e.noMore) : s.isError() ? (f = n(s), f === e.noMore && m(), f) : (r(new v(s.value)), o.isDefined && u.isDefined ? l && s.isInitial() ? e.more: (l = !0, f = i(n, s, o.value, u.value), f === e.noMore && m(), f) : e.more)
                            }
                        },
                        h = f(function() {
                            return c = !0
                        },
                        function(e) {
                            return o = e
                        },
                        r),
                        d = f(function() {
                            return p = !0
                        },
                        function(e) {
                            return u = e
                        },
                        i),
                        g = s.subscribe(h),
                        b || (y = t.subscribe(d)),
                        m
                    })
                },
                this.sampledBy = function(e, t) {
                    var n, r;
                    return t == null && (t = N),
                    t = I(t),
                    n = function(e, n, r, i) {
                        return e(n.apply(function() {
                            return t(r(), i())
                        }))
                    },
                    r = i(e, B, n),
                    e instanceof a && (r = r.changes()),
                    r.takeUntil(e.filter(!1).mapEnd())
                }
            }
            return K(n, t),
            n.prototype.sample = function(t) {
                return this.sampledBy(e.interval(t, {}))
            },
            n.prototype.changes = function() {
                var e = this;
                return new a(function(t) {
                    return e.subscribe(function(e) {
                        if (!e.isInitial()) return t(e)
                    })
                })
            },
            n.prototype.withHandler = function(e) {
                return new n(this.subscribe, e)
            },
            n.prototype.withSubscribe = function(e) {
                return new n(e)
            },
            n.prototype.toProperty = function() {
                return E(arguments),
                this
            },
            n.prototype.toEventStream = function() {
                var e = this;
                return new a(function(t) {
                    return e.subscribe(function(e) {
                        return e.isInitial() && (e = e.toNext()),
                        t(e)
                    })
                })
            },
            n.prototype.and = function(e) {
                return this.combine(e,
                function(e, t) {
                    return e && t
                })
            },
            n.prototype.or = function(e) {
                return this.combine(e,
                function(e, t) {
                    return e || t
                })
            },
            n.prototype.decode = function(t) {
                return this.combine(e.combineTemplate(t),
                function(e, t) {
                    return t[e]
                })
            },
            n.prototype.delay = function(e) {
                return this.delayChanges(function(t) {
                    return t.delay(e)
                })
            },
            n.prototype.debounce = function(e) {
                return this.delayChanges(function(t) {
                    return t.debounce(e)
                })
            },
            n.prototype.throttle = function(e) {
                return this.delayChanges(function(t) {
                    return t.throttle(e)
                })
            },
            n.prototype.delayChanges = function(e) {
                return m(this, e(this.changes()))
            },
            n
        } (h),
        m = function(t, n) {
            var r;
            return r = function(t) {
                var n;
                return n = c,
                t.subscribe(function(t) {
                    return t.isInitial() && (n = new v(t.value())),
                    e.noMore
                }),
                n
            },
            n.toProperty(r(t))
        },
        i = function() {
            function t(t, n) {
                var r, i, s, o, a, f, l, c, h, p, d = this;
                t == null && (t = function() {
                    return B
                }),
                c = [],
                f = null,
                a = !1,
                s = !1,
                this.hasSubscribers = function() {
                    return c.length > 0
                },
                o = null,
                h = B,
                l = function(e) {
                    return c = X.without(e, c)
                },
                p = null,
                i = function(e) {
                    var t, n, r, i;
                    if (p != null) {
                        n = p,
                        p = null;
                        for (r = 0, i = n.length; r < i; r++) t = n[r],
                        t()
                    }
                    return e.onDone = u.prototype.onDone
                },
                r = function(e) {
                    return p = (p || []).concat([e])
                },
                this.push = function(t) {
                    var n, s, u, h, p, v;
                    if (!a) {
                        if (t === o) return;
                        t.isError() && (o = t),
                        u = !1;
                        try {
                            a = !0,
                            t.onDone = r,
                            h = c;
                            for (p = 0, v = h.length; p < v; p++) s = h[p],
                            n = s.sink(t),
                            (n === e.noMore || t.isEnd()) && l(s);
                            u = !0
                        } finally {
                            a = !1,
                            u || (f = null)
                        }
                        u = !0;
                        while (f != null ? f.length: void 0) t = X.head(f),
                        f = X.tail(f),
                        d.push(t);
                        return i(t),
                        d.hasSubscribers() ? e.more: e.noMore
                    }
                    return f = (f || []).concat([t]),
                    e.more
                },
                n == null && (n = function(e) {
                    return this.push(e)
                }),
                this.handleEvent = function(e) {
                    return e.isEnd() && (s = !0),
                    n.apply(d, [e])
                },
                this.subscribe = function(e) {
                    var n;
                    return s ? (e(T()), B) : (w(e), n = {
                        sink: e
                    },
                    c = c.concat(n), c.length === 1 && (h = t(d.handleEvent)), w(h),
                    function() {
                        l(n);
                        if (!d.hasSubscribers()) return h()
                    })
                }
            }
            return t
        } (),
        d = function(t) {
            function n(t, r) {
                var i, s, o, u = this;
                n.__super__.constructor.call(this, t, r),
                i = c,
                o = this.push,
                t = this.subscribe,
                s = !1,
                this.push = function(e) {
                    return e.isEnd() && (s = !0),
                    e.hasValue() && (i = new v(e.value())),
                    o.apply(u, [e])
                },
                this.subscribe = function(n) {
                    var r, o, a;
                    return r = !1,
                    a = function() {
                        return u.hasSubscribers() || s
                    },
                    o = i.filter(a).map(function(e) {
                        return n(k(e))
                    }),
                    o.getOrElse(e.more) === e.noMore ? B: s ? (n(T()), B) : t.apply(u, [n])
                }
            }
            return K(n, t),
            n
        } (i),
        r = function(t) {
            function n() {
                var t, r, i, s, u, a, f, l, c = this;
                i = void 0,
                a = [],
                t = !1,
                r = function(t) {
                    return function(n) {
                        return n.isEnd() ? (l(t), e.noMore) : i(n)
                    }
                },
                f = function() {
                    var e, t, n, r;
                    r = [];
                    for (t = 0, n = a.length; t < n; t++) e = a[t],
                    r.push(typeof e.unsub == "function" ? e.unsub() : void 0);
                    return r
                },
                u = function(e) {
                    return e.unsub = e.input.subscribe(r(e.input))
                },
                l = function(e) {
                    var t, n, r, i;
                    for (t = r = 0, i = a.length; r < i; t = ++r) {
                        n = a[t];
                        if (n.input === e) {
                            typeof n.unsub == "function" && n.unsub(),
                            a.splice(t, 1);
                            return
                        }
                    }
                },
                s = function(e) {
                    var t, n, r, s, o;
                    i = e,
                    n = [],
                    o = x(a);
                    for (r = 0, s = o.length; r < s; r++) t = o[r],
                    u(t);
                    return f
                },
                n.__super__.constructor.call(this, s),
                this.plug = function(e) {
                    var n;
                    if (t) return;
                    return n = {
                        input: e
                    },
                    a.push(n),
                    i != null && u(n),
                    function() {
                        return l(e)
                    }
                },
                this.push = function(e) {
                    return typeof i == "function" ? i(H(e)) : void 0
                },
                this.error = function(e) {
                    return typeof i == "function" ? i(new o(e)) : void 0
                },
                this.end = function() {
                    return t = !0,
                    f(),
                    typeof i == "function" ? i(T()) : void 0
                }
            }
            return K(n, t),
            n
        } (a),
        v = function() {
            function e(e) {
                this.value = e
            }
            return e.prototype.getOrElse = function() {
                return this.value
            },
            e.prototype.get = function() {
                return this.value
            },
            e.prototype.filter = function(t) {
                return t(this.value) ? new e(this.value) : c
            },
            e.prototype.map = function(t) {
                return new e(t(this.value))
            },
            e.prototype.forEach = function(e) {
                return e(this.value)
            },
            e.prototype.isDefined = !0,
            e.prototype.toArray = function() {
                return [this.value]
            },
            e
        } (),
        c = {
            getOrElse: function(e) {
                return e
            },
            filter: function() {
                return c
            },
            map: function() {
                return c
            },
            forEach: function() {},
            isDefined: !1,
            toArray: function() {
                return []
            }
        },
        e.EventStream = a,
        e.Property = p,
        e.Observable = h,
        e.Bus = r,
        e.Initial = f,
        e.Next = l,
        e.End = s,
        e.Error = o,
        B = function() {},
        O = function(e, t) {
            return t
        },
        N = function(e, t) {
            return e
        },
        k = function(e) {
            return new f(X.always(e))
        },
        H = function(e) {
            return new l(X.always(e))
        },
        T = function() {
            return new s
        },
        q = function(e) {
            return e instanceof u ? e: H(e)
        },
        x = function(e) {
            return e.slice(0)
        },
        C = Array.prototype.indexOf ?
        function(e, t) {
            return e.indexOf(t)
        }: function(e, t) {
            var n, r, i, s;
            for (n = i = 0, s = e.length; i < s; n = ++i) {
                r = e[n];
                if (t === r) return n
            }
            return - 1
        },
        g = function(e, t) {
            if (!t) throw e
        },
        b = function(e) {
            return g("not an event : " + e, e instanceof u && e.isEvent())
        },
        w = function(e) {
            return g("not a function : " + e, A(e))
        },
        A = function(e) {
            return typeof e == "function"
        },
        y = function(e) {
            return g("not an array : " + e, e instanceof Array)
        },
        E = function(e) {
            return g("no arguments supported", e.length === 0)
        },
        S = function(e) {
            return g("not a string : " + e, typeof e == "string")
        },
        P = function(e, t, n) {
            return S(t),
            n === void 0 && (n = []),
            function(r) {
                return e[t].apply(e, n.concat([r]))
            }
        },
        j = function(e, t) {
            return function() {
                var n;
                return n = 1 <= arguments.length ? $.call(arguments, 0) : [],
                e.apply(null, t.concat(n))
            }
        },
        D = function(e) {
            return e instanceof h && (e = X.always(e)),
            w(e),
            e
        },
        _ = function(e, t) {
            return A(e) ? t.length ? j(e, t) : e: L(e) ? R(e, t) : typeof e == "object" && t.length ? P(e, X.head(t), X.tail(t)) : X.always(e)
        },
        L = function(e) {
            return typeof e == "string" && e.length > 1 && e.charAt(0) === "."
        },
        e.isFieldKey = L,
        R = function(e, t) {
            var n, r;
            return r = e.slice(1).split("."),
            n = X.map(W(t), r),
            function(t) {
                var r, i;
                for (r = 0, i = n.length; r < i; r++) e = n[r],
                t = e(t);
                return t
            }
        },
        W = function(e) {
            return function(t) {
                return function(n) {
                    var r;
                    return n == null ? void 0 : (r = n[t], A(r) ? r.apply(n, e) : r)
                }
            }
        },
        U = function(e) {
            return e.slice(1)
        },
        I = function(e) {
            var t;
            return A(e) ? e: L(e) ? (t = U(e),
            function(e, n) {
                return e[t](n)
            }) : g("not a function or a field key: " + e, !1)
        },
        z = function(e) {
            return e instanceof v || e === c ? e: new v(e)
        },
        typeof n != "undefined" && n !== null && n.amd != null && typeof n == "function" && n("bacon", [],
        function() {
            return e
        }),
        X = {
            head: function(e) {
                return e[0]
            },
            always: function(e) {
                return function() {
                    return e
                }
            },
            empty: function(e) {
                return e.length === 0
            },
            tail: function(e) {
                return e.slice(1, e.length)
            },
            filter: function(e, t) {
                var n, r, i, s;
                n = [];
                for (i = 0, s = t.length; i < s; i++) r = t[i],
                e(r) && n.push(r);
                return n
            },
            map: function(e, t) {
                var n, r, i, s;
                s = [];
                for (r = 0, i = t.length; r < i; r++) n = t[r],
                s.push(e(n));
                return s
            },
            each: function(e, t) {
                var n, r, i;
                i = [];
                for (n in e) r = e[n],
                i.push(t(n, r));
                return i
            },
            toArray: function(e) {
                return e instanceof Array ? e: [e]
            },
            contains: function(e, t) {
                return C(e, t) !== -1
            },
            id: function(e) {
                return e
            },
            last: function(e) {
                return e[e.length - 1]
            },
            all: function(e) {
                var t, n, r;
                for (n = 0, r = e.length; n < r; n++) {
                    t = e[n];
                    if (!t) return ! 1
                }
                return ! 0
            },
            any: function(e) {
                var t, n, r;
                for (n = 0, r = e.length; n < r; n++) {
                    t = e[n];
                    if (t) return ! 0
                }
                return ! 1
            },
            without: function(e, t) {
                return X.filter(function(t) {
                    return t !== e
                },
                t)
            },
            remove: function(e, t) {
                var n;
                n = C(t, e);
                if (n >= 0) return t.splice(n, 1)
            }
        },
        e._ = X,
        e.scheduler = {
            setTimeout: function(e, t) {
                return setTimeout(e, t)
            },
            setInterval: function(e, t) {
                return setInterval(e, t)
            },
            clearInterval: function(e) {
                return clearInterval(e)
            },
            now: function() {
                return (new Date).getTime()
            }
        }
    }.call(this),
    function(e) {
        typeof n == "function" && n.amd ? n("lucid", e) : typeof module != "object" && typeof module != "function" || !module.exports ? window.LucidJS = e() : module.exports = e()
    } (function() {
        function t(e) {
            function s(e) {
                function u() {
                    if (!n[e]) return;
                    for (i = 0; i < t.length; i += 1) n[e].splice(n[e].indexOf(t[i]), 1);
                    n[e].length < 1 && delete n[e]
                }
                function f(e, t) {
                    function o() {
                        var e;
                        for (e = 0; e < i.length; e += 1) i[e].clear()
                    }
                    var n, r = {},
                    i = [];
                    for (n = 0; n < e.length; n += 1) t.unshift(e[n]),
                    i.push(s.apply(this, t)),
                    t.shift();
                    return r.clear = o,
                    r
                }
                var t = Array.prototype.slice.apply(arguments, [1]),
                r = {},
                i,
                o;
                if (typeof e == "object" && typeof e.push == "function") return f(e, t);
                e.slice(0, 7) !== "emitter" && a("emitter.listener", e, t),
                n[e] || (n[e] = []);
                for (i = 0; i < t.length; i += 1) {
                    if (typeof t[i] != "function") throw new Error("Cannot bind event. All callbacks must be functions.");
                    n[e].push(t[i])
                }
                return r.clear = u,
                r
            }
            function o(e) {
                var t = Array.prototype.slice.apply(arguments, [1]),
                r,
                i;
                if (typeof e == "object" && typeof e.push == "function") {
                    for (i = 0; i < e.length; i += 1) o.apply(null, [e[i]].concat(t));
                    return
                }
                if (!n[e]) throw new Error('Tried to remove an event from a non-existant event of type "' + e + '".');
                for (r = 0; r < t.length; r += 1) {
                    if (typeof t[r] != "function") throw new Error("Tried to remove a non-function.");
                    var s = n[e].indexOf(t[r]);
                    n[e].splice(s, 1)
                }
            }
            function u(e) {
                var t, n = Array.prototype.slice.apply(arguments, [1]),
                r = !0;
                return t = s(e,
                function() {
                    var e, i = Array.prototype.slice.apply(arguments);
                    t.clear();
                    for (e = 0; e < n.length; e += 1) n[e].apply(this, i) === !1 && (r = !1);
                    return r
                }),
                t
            }
            function a(e, t, r, i, s, o) {
                function h(e, t, n, r, i, s) {
                    var o, f = !0;
                    typeof s != "undefined" && (u = Array.prototype.slice.apply(arguments, [1]));
                    for (o = 0; o < e.length; o += 1) u ? (args.unshift(e[o]), a.apply(this, args) === !1 && (f = !1), args.shift()) : a(e[o], t, n, r, i) === !1 && (f = !1);
                    return f
                }
                var u, f, l, c = !0;
                typeof o != "undefined" && (u = Array.prototype.slice.apply(arguments, [1]));
                if (typeof e == "object" && typeof e.push == "function") return u ? h.apply(null, arguments) : h(e, t, r, i, s);
                e = e.split(".");
                while (e.length) {
                    l = n[e.join(".")],
                    e[0] !== "emitter" && (u ? a.apply(this, [].concat("emitter.event", e.join("."), u)) : a("emitter.event", t, r, i, s));
                    if (l) {
                        l = [].concat(l);
                        for (f = 0; f < l.length; f += 1) u ? l[f].apply(this, u) === !1 && (c = !1) : l[f](t, r, i, s) === !1 && (c = !1)
                    }
                    e.pop()
                }
                return c
            }
            function f(e, t, n, i, o, u) {
                function h() {
                    r[e].splice(r[e].indexOf(l), 1),
                    c()
                }
                var f, l, c;
                return u && (f = Array.prototype.slice.apply(arguments, [1])),
                u ? a.apply(arguments) : a(e, t, n, i, o),
                l = s("emitter.listener",
                function(r, s) {
                    var u;
                    if (e === r) for (u = 0; u < s.length; u += 1) f ? s[u].apply(f) : s[u](t, n, i, o)
                }),
                r[e] || (r[e] = []),
                r[e].push(l),
                c = l.clear,
                l.clear = h,
                l
            }
            function l(e) {
                var t;
                if (e) {
                    for (t = 0; t < r[e].length; t += 1) r[e][t].clear();
                    delete r[e]
                } else for (e in r) {
                    if (!r.hasOwnProperty(e)) continue;
                    l(e)
                }
            }
            function c(e) {
                function v(e, t) {
                    e.listenerBinding = s("emitter.listener",
                    function(n) {
                        e.events.indexOf(n) === -1 && (e.bindings.push(m(t, n)), e.events.push(n))
                    })
                }
                function m(e, t) {
                    return e.on(t,
                    function() {
                        var e = Array.prototype.slice.apply(arguments);
                        return e.unshift(t),
                        a.apply(this, e)
                    })
                }
                function g() {
                    if (p.length) while (p.length) p[0].clear(),
                    p.splice(0, 1)
                }
                function y() {
                    while (l.length) {
                        l[0].listenerBinding && l[0].listenerBinding.clear();
                        while (l[0].bindings.length) l[0].bindings[0].clear(),
                        l[0].bindings.splice(0, 1);
                        i.splice(i.indexOf(l[0]), 1),
                        l.splice(0, 1)
                    }
                }
                var t = {},
                r = Array.prototype.slice.apply(arguments),
                o,
                u,
                f,
                l = [],
                h,
                p = [],
                d;
                if (typeof e == "object" && typeof e.push == "function" && typeof e[0] == "string") {
                    for (o = 0; o < e.length; o += 1) p.push(c.apply(null, [e[o]].concat(r)));
                    return t.clear = g,
                    t
                }
                typeof e == "object" && typeof e.on == "function" ? e = !1 : r.shift();
                if (e !== !1 && typeof e != "string") throw new Error("Cannot create pipe. The first argument must be an event string or an emitter.");
                for (u = 0; u < r.length; u += 1) {
                    for (f = 0; f < i.length; f += 1) if (i[f].emitter === r[u]) {
                        h = i[f];
                        break
                    }
                    if (h && h.type === 2) continue;
                    h || (h = {},
                    h.emitter = r[u], h.bindings = [], h.events = [], e ? h.type = 1 : h.type = 2);
                    if (h.events.indexOf(e) !== -1) continue;
                    h.events.push(e);
                    if (h.type === 1) d = m(r[u], e),
                    d.event = e,
                    h.bindings.push(d);
                    else if (h.type === 2) {
                        for (e in n) {
                            if (!n.hasOwnProperty(e)) continue;
                            d = r[u].on(e, m),
                            d.event = e,
                            h.bindings.push(d),
                            h.events.push(e)
                        }
                        v(h, r[u])
                    }
                    l.push(h),
                    i.push(h)
                }
                return t.clear = y,
                t
            }
            function h(e) {
                var t, n, r;
                for (t = 0; t < i.length; t += 1) {
                    if (e) {
                        if (i[t].type === 2) continue;
                        if (i[t].events.indexOf(e) === -1) continue;
                        i[t].events.splice(i[t].events.indexOf(e), 1)
                    }
                    i[t].type === 2 && i[t].listenerBinding.clear();
                    for (n = 0; n < i[t].bindings.length; n += 1) {
                        if (e && i[t].bindings[n].event !== e) continue;
                        i[t].bindings[n].clear(),
                        i[t].bindings.splice(n, 1),
                        n -= 1
                    }
                    i[t].bindings.length < 1 && (i.splice(t, 1), t -= 1)
                }
            }
            function p(e) {
                return e ? n[e] : n
            }
            function d(e) {
                e ? delete n[e] : n = {}
            }
            function v() {
                a("emitter.clear"),
                n = {},
                l(),
                h(),
                delete t.on,
                delete t.once,
                delete t.trigger,
                delete t.set,
                delete t.pipe,
                delete t.listeners,
                delete t.clear
            }
            function m(e) {
                function o() {
                    var t;
                    for (t = 0; t < i.length; t += 1) try {
                        e.removeEventListener ? e.removeEventListener(i[t].event, i[t].listener, !1) : e.detachEvent && e.detachEvent("on" + i[t].event, i[t].listener)
                    } catch(s) {
                        console.error(s)
                    }
                    n = [],
                    r.clear()
                }
                var n = [],
                r,
                i = [];
                r = s("emitter.listener",
                function(t) {
                    function s(e) {
                        var n = Array.prototype.slice.apply(arguments);
                        n.unshift([t, "dom." + t]),
                        a.apply(this, n) === !1 && (e.preventDefault(), e.stopPropagation())
                    }
                    if (n.indexOf(t) > -1) return;
                    n.push(t);
                    try {
                        e.addEventListener ? (e.addEventListener(t, s, !1), i.push({
                            event: t,
                            listener: s
                        })) : e.attachEvent && (e.attachEvent("on" + t, s), i.push({
                            event: t,
                            listener: s
                        }))
                    } catch(r) {
                        console.error(r)
                    }
                }),
                t.clearNodeEmitter = o
            }
            var t = e || {},
            n = {},
            r = {},
            i = [];
            return ! t.on && !t.once && !t.trigger && !t.set && !t.pipe && !t.listeners ? (t.on = s, t.off = o, t.once = u, t.trigger = a, t.set = f, t.set.clear = l, t.pipe = c, t.pipe.clear = h, t.listeners = p, t.listeners.clear = d, (t.addEventListener || t.attachEvent) && m(t), t) : t
        }
        var e;
        return e = {
            emitter: t
        },
        [].indexOf || (Array.prototype.indexOf = function(e, t, n) {
            for (n = this.length, t = (n + ~~t) % n; t < n && (!(t in this) || this[t] !== e); t++);
            return t ^ n ? t: -1
        }),
        e
    }),
    function(e) {
        if (typeof bootstrap == "function") bootstrap("promise", e);
        else if (typeof exports == "object") e(void 0, exports);
        else if (typeof n == "function") n("promise", e);
        else if (typeof ses != "undefined") {
            if (!ses.ok()) return;
            ses.makeQ = function() {
                var t = {};
                return e(void 0, t)
            }
        } else e(void 0, Q = {})
    } (function(e, t) {
        function b(e) {
            return y(e) === "[object StopIteration]" || e instanceof w
        }
        function S(e, t) {
            t.stack && typeof e == "object" && e !== null && e.stack && e.stack.indexOf(E) === -1 && (e.stack = x(e.stack) + "\n" + E + "\n" + x(t.stack))
        }
        function x(e) {
            var t = e.split("\n"),
            n = [];
            for (var r = 0; r < t.length; ++r) {
                var i = t[r]; ! N(i) && !T(i) && n.push(i)
            }
            return n.join("\n")
        }
        function T(e) {
            return e.indexOf("(module.js:") !== -1 || e.indexOf("(node.js:") !== -1
        }
        function N(e) {
            var t = /at .+ \((.*):(\d+):\d+\)/.exec(e);
            if (!t) return ! 1;
            var i = t[1],
            s = t[2];
            return i === r && s >= n && s <= Tt
        }
        function C() {
            if (Error.captureStackTrace) {
                var e, t, n = Error.prepareStackTrace;
                return Error.prepareStackTrace = function(n, r) {
                    e = r[1].getFileName(),
                    t = r[1].getLineNumber()
                },
                (new Error).stack,
                Error.prepareStackTrace = n,
                r = e,
                t
            }
        }
        function k(e, t, n) {
            return function() {
                return typeof console != "undefined" && typeof console.warn == "function" && console.warn(t + " is deprecated, use " + n + " instead.", (new Error("")).stack),
                e.apply(e, arguments)
            }
        }
        function L() {
            function u(r) {
                if (!e) return;
                n = R(r),
                p(e,
                function(e, t) {
                    o(function() {
                        n.promiseSend.apply(n, t)
                    })
                },
                void 0),
                e = void 0,
                t = void 0
            }
            var e = [],
            t = [],
            n,
            r = m(L.prototype),
            i = m(O.prototype);
            return i.promiseSend = function(r, i, s, u) {
                var a = h(arguments);
                e ? (e.push(a), r === "when" && u && t.push(u)) : o(function() {
                    n.promiseSend.apply(n, a)
                })
            },
            i.valueOf = function() {
                return e ? i: n.valueOf()
            },
            Error.captureStackTrace && (Error.captureStackTrace(i, L), i.stack = i.stack.substring(i.stack.indexOf("\n") + 1)),
            s(i),
            r.promise = i,
            r.resolve = u,
            r.reject = function(e) {
                u(q(e))
            },
            r.notify = function(n) {
                e && p(t,
                function(e, t) {
                    o(function() {
                        t(n)
                    })
                },
                void 0)
            },
            r
        }
        function A(e) {
            var t = L();
            return it(e, t.resolve, t.reject, t.notify).fail(t.reject),
            t.promise
        }
        function O(e, t, n, r) {
            t === void 0 && (t = function(e) {
                return q(new Error("Promise does not support operation: " + e))
            });
            var i = m(O.prototype);
            return i.promiseSend = function(n, r) {
                var s = h(arguments, 2),
                o;
                try {
                    e[n] ? o = e[n].apply(i, s) : o = t.apply(i, [n].concat(s))
                } catch(u) {
                    o = q(u)
                }
                r && r(o)
            },
            n && (i.valueOf = n),
            r && (i.exception = r),
            s(i),
            i
        }
        function M(e) {
            return _(e) ? e.valueOf() : e
        }
        function _(e) {
            return e && typeof e.promiseSend == "function"
        }
        function D(e) {
            return P(e) || H(e)
        }
        function P(e) {
            return ! _(M(e))
        }
        function H(e) {
            return e = M(e),
            _(e) && "exception" in e
        }
        function I() { ! F && typeof window != "undefined" && !window.Touch && window.console && console.log("Should be empty:", j),
            F = !0
        }
        function q(e) {
            e = e || new Error;
            var t = O({
                when: function(t) {
                    if (t) {
                        var n = d(B, this);
                        n !== -1 && (j.splice(n, 1), B.splice(n, 1))
                    }
                    return t ? t(e) : q(e)
                }
            },
            function() {
                return q(e)
            },
            function n() {
                return this
            },
            e);
            return I(),
            B.push(t),
            j.push(e),
            t
        }
        function R(e) {
            if (_(e)) return e;
            e = M(e);
            if (e && typeof e.then == "function") {
                var t = L();
                return e.then(t.resolve, t.reject, t.notify),
                t.promise
            }
            return O({
                when: function() {
                    return e
                },
                get: function(t) {
                    return e[t]
                },
                put: function(t, n) {
                    return e[t] = n,
                    e
                },
                del: function(t) {
                    return delete e[t],
                    e
                },
                post: function(t, n) {
                    return e[t].apply(e, n)
                },
                apply: function(t, n) {
                    return e.apply(t, n)
                },
                fapply: function(t) {
                    return e.apply(void 0, t)
                },
                viewInfo: function() {
                    function r(e) {
                        n[e] || (n[e] = typeof t[e])
                    }
                    var t = e,
                    n = {};
                    while (t) Object.getOwnPropertyNames(t).forEach(r),
                    t = Object.getPrototypeOf(t);
                    return {
                        type: typeof e,
                        properties: n
                    }
                },
                keys: function() {
                    return g(e)
                }
            },
            void 0,
            function n() {
                return e
            })
        }
        function U(e) {
            return O({
                isDef: function() {}
            },
            function() {
                var n = h(arguments);
                return G.apply(void 0, [e].concat(n))
            },
            function() {
                return M(e)
            })
        }
        function z(e, t) {
            return e = R(e),
            t ? O({
                viewInfo: function() {
                    return t
                }
            },
            function() {
                var n = h(arguments);
                return G.apply(void 0, [e].concat(n))
            },
            function() {
                return M(e)
            }) : G(e, "viewInfo")
        }
        function W(e) {
            return z(e).when(function(t) {
                var n;
                t.type === "function" ? n = function() {
                    return tt(e, void 0, arguments)
                }: n = {};
                var r = t.properties || {};
                return g(r).forEach(function(t) {
                    r[t] === "function" && (n[t] = function() {
                        return et(e, t, arguments)
                    })
                }),
                R(n)
            })
        }
        function X(e, t, n, r) {
            function u(e) {
                try {
                    return t ? t(e) : e
                } catch(n) {
                    return q(n)
                }
            }
            function a(e) {
                if (n) {
                    S(e, l);
                    try {
                        return n(e)
                    } catch(t) {
                        return q(t)
                    }
                }
                return q(e)
            }
            function f(e) {
                return r ? r(e) : e
            }
            var i = L(),
            s = !1,
            l = R(e);
            return o(function() {
                l.promiseSend("when",
                function(e) {
                    if (s) return;
                    s = !0,
                    i.resolve(u(e))
                },
                function(e) {
                    if (s) return;
                    s = !0,
                    i.resolve(a(e))
                })
            }),
            l.promiseSend("when", void 0, void 0,
            function(e) {
                i.notify(f(e))
            }),
            i.promise
        }
        function V(e, t, n) {
            return X(e,
            function(e) {
                return ut(e).then(function(e) {
                    return t.apply(void 0, e)
                },
                n)
            },
            n)
        }
        function $(e) {
            return function() {
                function t(e, t) {
                    var s;
                    try {
                        s = n[e](t)
                    } catch(o) {
                        return b(o) ? o.value: q(o)
                    }
                    return X(s, r, i)
                }
                var n = e.apply(this, arguments),
                r = t.bind(t, "send"),
                i = t.bind(t, "throw");
                return r()
            }
        }
        function J(e) {
            throw new w(e)
        }
        function K(e) {
            return function() {
                return ut([this, ut(arguments)]).spread(function(t, n) {
                    return e.apply(t, n)
                })
            }
        }
        function Q(e) {
            return function(t) {
                var n = h(arguments, 1);
                return G.apply(void 0, [t, e].concat(n))
            }
        }
        function G(e, t) {
            var n = L(),
            r = h(arguments, 2);
            return e = R(e),
            o(function() {
                e.promiseSend.apply(e, [t, n.resolve].concat(r))
            }),
            n.promise
        }
        function Y(e, t, n) {
            var r = L();
            return e = R(e),
            o(function() {
                e.promiseSend.apply(e, [t, r.resolve].concat(n))
            }),
            r.promise
        }
        function Z(e) {
            return function(t) {
                var n = h(arguments, 1);
                return Y(t, e, n)
            }
        }
        function rt(e, t) {
            var n = h(arguments, 2);
            return tt(e, t, n)
        }
        function it(e) {
            var t = h(arguments, 1);
            return nt(e, t)
        }
        function st(e, t) {
            var n = h(arguments, 2);
            return function() {
                var i = n.concat(h(arguments));
                return tt(e, t, i)
            }
        }
        function ot(e) {
            var t = h(arguments, 1);
            return function() {
                var r = t.concat(h(arguments));
                return nt(e, r)
            }
        }
        function ut(e) {
            return X(e,
            function(e) {
                var t = e.length;
                if (t === 0) return R(e);
                var n = L();
                return p(e,
                function(r, i, s) {
                    P(i) ? (e[s] = M(i), --t === 0 && n.resolve(e)) : X(i,
                    function(r) {
                        e[s] = r,
                        --t === 0 && n.resolve(e)
                    }).fail(n.reject)
                },
                void 0),
                n.promise
            })
        }
        function at(e) {
            return X(e,
            function(e) {
                return X(ut(v(e,
                function(e) {
                    return X(e, i, i)
                })),
                function() {
                    return v(e, R)
                })
            })
        }
        function ft(e, t) {
            return X(e, void 0, t)
        }
        function lt(e, t) {
            return X(e, void 0, void 0, t)
        }
        function ct(e, t) {
            return X(e,
            function(e) {
                return X(t(),
                function() {
                    return e
                })
            },
            function(e) {
                return X(t(),
                function() {
                    return q(e)
                })
            })
        }
        function ht(e, n, r, i) {
            function s(n) {
                o(function() {
                    S(n, e);
                    if (!t.onerror) throw n;
                    t.onerror(n)
                })
            }
            var u = n || r || i ? X(e, n, r, i) : e;
            ft(u, s)
        }
        function pt(e, t) {
            var n = L(),
            r = setTimeout(function() {
                n.reject(new Error("Timed out after " + t + " ms"))
            },
            t);
            return X(e,
            function(e) {
                clearTimeout(r),
                n.resolve(e)
            },
            function(e) {
                clearTimeout(r),
                n.reject(e)
            }),
            n.promise
        }
        function dt(e, t) {
            t === void 0 && (t = e, e = void 0);
            var n = L();
            return setTimeout(function() {
                n.resolve(e)
            },
            t),
            n.promise
        }
        function vt(e, t) {
            var n = h(t),
            r = L();
            return n.push(r.makeNodeResolver()),
            nt(e, n).fail(r.reject),
            r.promise
        }
        function mt(e) {
            var t = h(arguments, 1),
            n = L();
            return t.push(n.makeNodeResolver()),
            nt(e, t).fail(n.reject),
            n.promise
        }
        function gt(e) {
            var t = h(arguments, 1);
            return function() {
                var n = t.concat(h(arguments)),
                r = L();
                return n.push(r.makeNodeResolver()),
                nt(e, n).fail(r.reject),
                r.promise
            }
        }
        function yt(e, t, n) {
            return wt(e, t).apply(void 0, n)
        }
        function bt(e, t) {
            var n = h(arguments, 2);
            return yt(e, t, n)
        }
        function wt(e) {
            if (arguments.length > 1) {
                var t = arguments[1],
                n = h(arguments, 2),
                r = e;
                e = function() {
                    var e = n.concat(h(arguments));
                    return r.apply(t, e)
                }
            }
            return function() {
                var t = L(),
                n = h(arguments);
                return n.push(t.makeNodeResolver()),
                nt(e, n).fail(t.reject),
                t.promise
            }
        }
        function Et(e, t, n) {
            var r = h(n),
            i = L();
            return r.push(i.makeNodeResolver()),
            et(e, t, r).fail(i.reject),
            i.promise
        }
        function St(e, t) {
            var n = h(arguments, 2),
            r = L();
            return n.push(r.makeNodeResolver()),
            et(e, t, n).fail(r.reject),
            r.promise
        }
        function xt(e, t) {
            if (!t) return e;
            e.then(function(e) {
                o(function() {
                    t(null, e)
                })
            },
            function(e) {
                o(function() {
                    t(e)
                })
            })
        }
        var n = C(),
        r,
        i = function() {},
        s = Object.freeze || i;
        typeof cajaVM != "undefined" && (s = cajaVM.def);
        var o;
        if (typeof process != "undefined") o = process.nextTick;
        else if (typeof setImmediate == "function") o = setImmediate;
        else if (typeof MessageChannel != "undefined") {
            var u = new MessageChannel,
            a = {},
            f = a;
            u.port1.onmessage = function() {
                a = a.next;
                var e = a.task;
                delete a.task,
                e()
            },
            o = function(e) {
                f = f.next = {
                    task: e
                },
                u.port2.postMessage(0)
            }
        } else o = function(e) {
            setTimeout(e, 0)
        };
        var l;
        if (Function.prototype.bind) {
            var c = Function.prototype.bind;
            l = c.bind(c.call)
        } else l = function(e) {
            return function() {
                return e.call.apply(e, arguments)
            }
        };
        var h = l(Array.prototype.slice),
        p = l(Array.prototype.reduce ||
        function(e, t) {
            var n = 0,
            r = this.length;
            if (arguments.length === 1) do {
                if (n in this) {
                    t = this[n++];
                    break
                }
                if (++n >= r) throw new TypeError
            } while ( 1 );
            for (; n < r; n++) n in this && (t = e(t, this[n], n));
            return t
        }),
        d = l(Array.prototype.indexOf ||
        function(e) {
            for (var t = 0; t < this.length; t++) if (this[t] === e) return t;
            return - 1
        }),
        v = l(Array.prototype.map ||
        function(e, t) {
            var n = this,
            r = [];
            return p(n,
            function(i, s, o) {
                r.push(e.call(t, s, o, n))
            },
            void 0),
            r
        }),
        m = Object.create ||
        function(e) {
            function t() {}
            return t.prototype = e,
            new t
        },
        g = Object.keys ||
        function(e) {
            var t = [];
            for (var n in e) t.push(n);
            return t
        },
        y = Object.prototype.toString,
        w;
        typeof ReturnValue != "undefined" ? w = ReturnValue: w = function(e) {
            this.value = e
        };
        var E = "From previous event:";
        t.nextTick = o,
        t.defer = L,
        L.prototype.makeNodeResolver = function() {
            var e = this;
            return function(t, n) {
                t ? e.reject(t) : arguments.length > 2 ? e.resolve(h(arguments, 1)) : e.resolve(n)
            }
        },
        L.prototype.node = k(L.prototype.makeNodeResolver, "node", "makeNodeResolver"),
        t.promise = A,
        t.makePromise = O,
        O.prototype.then = function(e, t, n) {
            return X(this, e, t, n)
        },
        O.prototype.thenResolve = function(e) {
            return X(this,
            function() {
                return e
            })
        },
        p(["isResolved", "isFulfilled", "isRejected", "when", "spread", "send", "get", "put", "del", "post", "invoke", "keys", "apply", "call", "bind", "fapply", "fcall", "fbind", "all", "allResolved", "view", "viewInfo", "timeout", "delay", "catch", "finally", "fail", "fin", "progress", "end", "done", "nfcall", "nfapply", "nfbind", "ncall", "napply", "nbind", "npost", "ninvoke", "nend", "nodeify"],
        function(e, n) {
            O.prototype[n] = function() {
                return t[n].apply(t, [this].concat(h(arguments)))
            }
        },
        void 0),
        O.prototype.toSource = function() {
            return this.toString()
        },
        O.prototype.toString = function() {
            return "[object Promise]"
        },
        s(O.prototype),
        t.nearer = M,
        t.isPromise = _,
        t.isResolved = D,
        t.isFulfilled = P,
        t.isRejected = H;
        var B = [],
        j = [],
        F;
        t.reject = q,
        t.begin = R,
        t.resolve = R,
        t.ref = k(R, "ref", "resolve"),
        t.master = U,
        t.viewInfo = z,
        t.view = W,
        t.when = X,
        t.spread = V,
        t.async = $,
        t["return"] = J,
        t.promised = K,
        t.sender = k(Q, "sender", "dispatcher"),
        t.Method = k(Q, "Method", "dispatcher"),
        t.send = k(G, "send", "dispatch"),
        t.dispatch = Y,
        t.dispatcher = Z,
        t.get = Z("get"),
        t.put = Z("put"),
        t["delete"] = t.del = Z("del");
        var et = t.post = Z("post");
        t.invoke = function(e, t) {
            var n = h(arguments, 2);
            return et(e, t, n)
        };
        var tt = t.apply = k(Z("apply"), "apply", "fapply"),
        nt = t.fapply = Z("fapply");
        t.call = k(rt, "call", "fcall"),
        t["try"] = it,
        t.fcall = it,
        t.bind = k(st, "bind", "fbind"),
        t.fbind = ot,
        t.keys = Z("keys"),
        t.all = ut,
        t.allResolved = at,
        t["catch"] = t.fail = ft,
        t.progress = lt,
        t["finally"] = t.fin = ct,
        t.end = k(ht, "end", "done"),
        t.done = ht,
        t.timeout = pt,
        t.delay = dt,
        t.nfapply = vt,
        t.nfcall = mt,
        t.nfbind = gt,
        t.napply = k(yt, "napply", "npost"),
        t.ncall = k(bt, "ncall", "ninvoke"),
        t.nbind = k(wt, "nbind", "nfbind"),
        t.npost = Et,
        t.ninvoke = St,
        t.nend = k(xt, "nend", "nodeify"),
        t.nodeify = xt;
        var Tt = C()
    }),
    function() {
        var e = [].slice;
        n("logger", [],
        function() {
            var t;
            return t = function() {
                function i(e) {
                    e == null && (e = "NONE"),
                    this.hasConsole = (typeof console !== "undefined" && console !== null ? console.log: void 0) != null,
                    r(e) ? this.setLogLevel(e) : this.setLogLevel("NONE")
                }
                var t, n, r;
                return i.LOG_LEVEL = {
                    DEBUG: 0,
                    INFO: 1,
                    LOG: 2,
                    WARN: 3,
                    ERROR: 4,
                    NONE: 5
                },
                t = function(e, t) {
                    var n;
                    return e.bind === Function.prototype.bind && Function.prototype.bind ? Function.prototype.bind.apply(e, Array.prototype.slice.call(arguments, 1)) : (n = Array.prototype.slice.call(arguments, 2),
                    function() {
                        return e.apply(t, n.concat(Array.prototype.slice.call(arguments)))
                    })
                },
                n = function() {
                    var t;
                    return t = 1 <= arguments.length ? e.call(arguments, 0) : [],
                    !0
                },
                r = function(e) {
                    return e !== void 0 && i.LOG_LEVEL[e] !== void 0 ? !0 : !1
                },
                i.prototype.setLogLevel = function(e) {
                    if (r(e)) {
                        if (!this.hasConsole) return this.debug = this.info = this.log = this.warn = this.error = n;
                        this.logLevel = i.LOG_LEVEL[e];
                        switch (this.logLevel) {
                        case i.LOG_LEVEL.DEBUG:
                            return this.debug = t(console.info, console),
                            this.info = t(console.info, console),
                            this.log = t(console.log, console),
                            this.warn = t(console.warn, console),
                            this.error = t(console.error, console);
                        case i.LOG_LEVEL.INFO:
                            return this.debug = n,
                            this.info = t(console.info, console),
                            this.log = t(console.log, console),
                            this.warn = t(console.warn, console),
                            this.error = t(console.error, console);
                        case i.LOG_LEVEL.LOG:
                            return this.debug = this.info = n,
                            this.log = t(console.log, console),
                            this.warn = t(console.warn, console),
                            this.error = t(console.error, console);
                        case i.LOG_LEVEL.WARN:
                            return this.debug = this.info = this.log = n,
                            this.warn = t(console.warn, console),
                            this.error = t(console.error, console);
                        case i.LOG_LEVEL.ERROR:
                            return this.debug = this.info = this.log = this.warn = n,
                            this.error = t(console.error, console);
                        default:
                            return this.debug = this.info = this.log = this.warn = this.error = n
                        }
                    }
                },
                i
            } ()
        })
    }.call(this),
    function() {
        var e = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        };
        if (typeof n == "undefined" || n === null) throw "Require JS is required to load this module";
        n("bcapi", ["lucid", "promise", "logger"],
        function(t, n, r) {
            var i;
            return i = function() {
                function l(n) {
                    this.authenticate = e(this.authenticate, this),
                    this._checkAuthStatus = e(this._checkAuthStatus, this),
                    this._messageListener = e(this._messageListener, this),
                    this._handleProxyCallback = e(this._handleProxyCallback, this),
                    this._setTokenRequestTimeout = e(this._setTokenRequestTimeout, this);
                    var i, s, o, u;
                    if (n == null) throw "invalid arguments passed into constructor";
                    if (n.stubAccessToken == null && n.moduleId == null) throw "stubAccessToken or moduleId is required";
                    if (n.id == null) throw "id is required";
                    this.logger = new r((n != null ? n.logLevel: void 0) || "NONE"),
                    this.PATH = this.constructor.PATH,
                    this.PATH.OAUTH_ARBITER_ORIGIN = this.PATH.OAUTH_ARBITER.match(/([^\/]*\/[^\/]*){2}/)[0],
                    this.registeredOrigins = {},
                    this.proxyCallbackCache = {},
                    o = new XMLHttpRequest,
                    "withCredentials" in o ? this.CORSSupport = !0 : this.CORSSupport = !1,
                    u = t.emitter();
                    for (s in u) i = u[s],
                    this[s] = i;
                    this.stubAccessToken = n.stubAccessToken || null,
                    this.moduleId = n.moduleId || null,
                    this.accountId = n.id || null,
                    this.parseResultAsJSON = n.parseResultAsJSON != null ? n.parseResultAsJSON: !0,
                    this.refreshToken = n.refreshToken || !0,
                    this.accessToken = null,
                    this.accessTokenState = null,
                    this.accessTokenStateFailureCount = 0,
                    this.accessTokenLastResponseTimestamp = null
                }
                var i, s, o, u, a, f;
                return s = "BCAPI",
                i = 300,
                o = 1e4,
                l.PATH = {
                    LIVE: "https://live.api.brightcove.com/v1",
                    PLAYERS: "https://smartplayers.api.brightcove.com/v1",
                    OAUTH_ARBITER: "https://sadmin.brightcove.com/bcapi/latest/js/arbiter.html",
                    OAUTH_AUTHORIZE: "https://oauth.brightcove.com/v2/authorization",
                    SIGN_IN: "https://signin.brightcove.com/login"
                },
                f = function(e) {
                    var t;
                    return t = {},
                    e && t.toString.call(e) === "[object Function]"
                },
                a = function(e) {
                    return e && Object.prototype.toString.call(e) === "[object Array]"
                },
                u = function(e) {
                    var t;
                    return t = document.createElement("a"),
                    t.href = e,
                    t.port ? "" + t.protocol + "//" + t.hostname + ":" + t.port: "" + t.protocol + "//" + t.hostname
                },
                l.prototype._setTokenRequestTimeout = function(e) {
                    return this.logger.error("This method globally changes the token request timeout.  Only use for testing!!"),
                    o = e
                },
                l.prototype._generateUniqueId = function() {
                    var e, t;
                    return t = Math.random(),
                    e = (new Date).getTime(),
                    t * e
                },
                l.prototype._createCORSRequest = function(e, t) {
                    var n;
                    if (this.stubAccessToken == null && this.accessToken == null) throw "an Access Token is required";
                    this.logger.info("createCORSRequest", t, e),
                    n = new XMLHttpRequest,
                    "withCredentials" in n ? n.open(t, e) : typeof XDomainRequest != "undefined" ? (n = new XDomainRequest, n.open(t, e)) : n = null,
                    this.logger.info("createCORSRequest xhr", n);
                    if (n == null) throw "CORS not supported";
                    return n
                },
                l.prototype._normalizedRequestHeaders = function(e) {
                    var t, n, r, i, s;
                    if (e != null ? e.headers: void 0) return e.headers;
                    if ((e != null ? e.headers: void 0) === null) return null;
                    if (e.header && a(e.header)) {
                        this.logger.warn("The requestParams.header option is deprecated and will be removed, please use requestParams.headers object instead."),
                        n = {},
                        s = e.header;
                        for (r = 0, i = s.length; r < i; r++) t = s[r],
                        n["" + t.header] = t.value;
                        return n
                    }
                    return e.header ? (this.logger.warn("The requestParams.header option is deprecated and will be removed, please use requestParams.headers object instead."), n = {},
                    n["" + e.header.header] = e.header.value, n) : e.header === null ? (this.logger.warn("The requestParams.header option is deprecated and will be removed, please use requestParams.headers object instead."), null) : void 0
                },
                l.prototype._getRequestHeaders = function(e) {
                    var t, n;
                    return t = this._normalizedRequestHeaders(e),
                    t === void 0 && (t = {},
                    t["Content-Type"] = "application/json"),
                    t !== null && (this.logger.info("request header(s) set:", t), "authorization" in t || "Authorization" in t || (this.stubAccessToken ? t.Authorization = "BC_LIVE_TOKEN " + this.stubAccessToken: t.Authorization = "Bearer " + ((n = this.accessToken) != null ? n.access_token: void 0))),
                    t
                },
                l.prototype._validateRequest = function(e) {
                    if (e == null) throw "invalid arguements passed into call";
                    if (e.path == null) throw "request.path is required";
                    if (!e.path.length) throw "request.path is invalid";
                    if (e.method == null) throw "request.method is required";
                    if (e.header != null && !a(e.header)) if (e.header.header == null || e.header.value == null) throw "invalid request header"
                },
                l.prototype._createProxyIframe = function(e, t) {
                    var n;
                    return this.logger.log("createProxyIframe called"),
                    this.logger.info("" + s + " createProxyIframe", e, t),
                    n = document.getElementById(e),
                    n || (n = document.createElement("iframe"), n.setAttribute("name", e), n.setAttribute("id", e), n.setAttribute("style", "display: none;"), t != null && n.setAttribute("src", t), document.body.appendChild(n)),
                    n
                },
                l.prototype._createPromisedIframe = function(e, t) {
                    var r, i;
                    return r = n.defer(),
                    i = document.createElement("iframe"),
                    i.setAttribute("name", e),
                    i.setAttribute("id", e),
                    i.setAttribute("style", "display: none;"),
                    t != null && i.setAttribute("src", t),
                    i.onload = function() {
                        return r.resolve(i)
                    },
                    document.body.appendChild(i),
                    r.promise
                },
                l.prototype._registerProxyCallbacks = function(e, t, n) {
                    var r;
                    return r = this._generateUniqueId(),
                    this.proxyCallbackCache[r] = {
                        origin: e,
                        callback: t,
                        errback: n
                    },
                    r
                },
                l.prototype._handleProxyCallback = function(e, t) {
                    var n;
                    n = this.proxyCallbackCache[t.callbackId];
                    if ("" + e.origin == "" + n.origin) {
                        delete this.proxyCallbackCache[t.callbackId];
                        if (t.xhr.status === 200) return n.callback(JSON.parse(t.xhr.responseText));
                        if (n != null ? n.errback: void 0) return n.errback()
                    }
                },
                l.prototype._proxyRequest = function(e, t, n, r) {
                    var i, s;
                    return s = this._registerProxyCallbacks(e, n, r),
                    i = {
                        headers: this._getRequestHeaders(t),
                        url: t.path
                    },
                    this.registeredOrigins[e].proxyFrame.then(function(t) {
                        return t.contentWindow.postMessage(JSON.stringify({
                            callbackId: s,
                            options: i
                        }), e)
                    })
                },
                l.prototype._messageListener = function(e) {
                    var t, n, r, o, u;
                    if (e.origin.indexOf(this.PATH.OAUTH_ARBITER_ORIGIN) !== 0) return;
                    e != null && e.data != null && (o = JSON.parse(e.data));
                    if (o != null ? o.callbackId: void 0) {
                        this._handleProxyCallback(e, o);
                        return
                    }
                    if (a(o)) {
                        n = o[0],
                        t = o[1];
                        if (n === "tokenResponse") {
                            if (t != null ? t.access_token: void 0) return "" + this.accessTokenState == "" + t.state ? (r = parseInt(t != null ? t.expires_in: void 0, 10), isNaN(r) && (r = i), u = (r - 30) * 1e3, this.accessToken = t, this.accessTokenLastResponseTimestamp = new Date, clearTimeout(this.authTimer), this.refreshToken && (this.authTimer = setTimeout(this.authenticate, u)), this.logger.info("" + s + " received new access token, expires in " + r + " seconds"), this.trigger("auth", {
                                token: t
                            })) : this.accessTokenStateFailureCount += 1;
                            this.accessTokenLastResponseTimestamp = new Date,
                            this.logger.log("" + s + " Unable to obtain access token due to " + (t != null ? t.error: void 0));
                            switch (t.error) {
                            case "access_denied":
                                return this.trigger("auth", {
                                    error: {
                                        code: "ACCESS_DENIED",
                                        message: t.error
                                    }
                                });
                            default:
                                return this.trigger("auth", {
                                    error: {
                                        code: "TOKEN_REQUEST_ERROR",
                                        message: t != null ? t.error: void 0
                                    }
                                })
                            }
                        }
                    }
                },
                l.prototype._checkAuthStatus = function(e) {
                    if (e === this.accessTokenLastResponseTimestamp) return this.logger.warn("" + s + " no token response recieved in " + o + " ms"),
                    this.trigger("auth", {
                        error: {
                            code: "TOKEN_REQUEST_TIMEOUT",
                            message: "No token response recieved in " + o + " ms"
                        }
                    })
                },
                l.init = function(e) {
                    var t;
                    return t = new l(e),
                    t.logger.warn("" + s + " BCApi.init is deprecated and will be removed.  Please use new BCApi(params)."),
                    t.logger.info("" + s + " init", e),
                    t
                },
                l.prototype.authenticate = function(e) {
                    var t, n, r, i, u, a, c, h = this;
                    if (typeof document != "undefined" && document !== null ? !document.body: !void 0) {
                        setTimeout(function() {
                            return h.authenticate(e)
                        },
                        100);
                        return
                    }
                    this.logger.info("" + s + " authenticate", e);
                    if (this.moduleId == null) throw "moduleId not defined";
                    return window.addEventListener ? window.addEventListener("message", this._messageListener, !1) : window.attachEvent && window.attachEvent("onmessage", this._messageListener),
                    f(e) && this.once("auth",
                    function(t) {
                        return (t != null ? t.error: void 0) ? e(t.error) : e(null, t.token)
                    }),
                    e && f(e) && this.logger.log("callback was provided to authenticate"),
                    i = "" + window.location.protocol + "//" + window.location.hostname,
                    window.location.port && (i += ":" + window.location.port),
                    t = l.PATH.OAUTH_ARBITER,
                    n = "" + l.PATH.OAUTH_ARBITER + "?origin=" + encodeURIComponent(i),
                    u = "" + this.accountId + "__vca",
                    this.accessTokenState = this._generateUniqueId(),
                    r = "" + l.PATH.OAUTH_AUTHORIZE + "?mode=immediate&response_type=token&client_id=" + this.moduleId + "&scope=" + u + "&state=" + encodeURIComponent(this.accessTokenState) + "&redirect_uri=" + encodeURIComponent(n),
                    this.logger.info("" + s + " clientProxySrc: " + t),
                    this.logger.info("" + s + " oauthProxySrc: " + r),
                    (a = this.clientProxy) == null && (this.clientProxy = this._createProxyIframe("bc-client", t)),
                    (c = this.oAuthProxy) == null && (this.oAuthProxy = this._createProxyIframe("bc-oauth-" + this.moduleId)),
                    setTimeout(this._checkAuthStatus, o, this.accessTokenLastResponseTimestamp),
                    this.oAuthProxy.src = r
                },
                l.prototype.getToken = function() {
                    return this.accessToken
                },
                l.prototype.login = function() {
                    return window.location = "" + PATH.SIGN_IN + "?redirect=" + encodeURIComponent(window.location)
                },
                l.prototype.createRequest = function(e) {
                    var t, n, r, i;
                    this.logger.info("createRequest", e),
                    this._validateRequest(e),
                    r = this._createCORSRequest(e.path, e.method),
                    t = this._getRequestHeaders(e);
                    for (n in t) i = t[n],
                    r.setRequestHeader(n, i);
                    return r.requestHeader == null && (r.requestHeader = t),
                    r
                },
                l.prototype.call = function(e, t, n) {
                    var r, i, s = this;
                    this.logger.info("call", e, t),
                    this._validateRequest(e);
                    if (t == null) throw "responder is required";
                    if (!f(t)) throw "responder is not a function";
                    if (n != null && !f(n)) throw "error responder is not a function";
                    return i = u(e.path),
                    i in this.registeredOrigins && !this.CORSSupport ? this._proxyRequest(i, e, t, n) : (r = this.createRequest(e), r.onload = function() {
                        var e;
                        s.logger.info("CORSrequest.onload", r.responseText),
                        e = r.responseText;
                        if (s.parseResultAsJSON && JSON.parse != null) {
                            s.logger.info("attempting to parse result to JSON", r.responseText);
                            try {
                                e = JSON.parse(r.responseText)
                            } catch(n) {
                                s.logger.error("error parsing result JSON, return raw result"),
                                e = r.responseText
                            }
                        }
                        return t(e)
                    },
                    n != null && (r.onerror = function() {
                        return s.logger.error("CORSrequest.onerror"),
                        n()
                    }), e.data != null ? r.send(e.data) : r.send())
                },
                l.prototype.registerOrigin = function(e) {
                    var t;
                    if (e != null ? !e.origin: !void 0) throw {
                        code: "REQUIRED_ARGUMENT_MISSING",
                        message: "origin is a required option"
                    };
                    if (e != null ? !e.proxyPath: !void 0) throw {
                        code: "REQUIRED_ARGUMENT_MISSING",
                        message: "proxyPath is a required option"
                    };
                    return t = u(e != null ? e.origin: void 0),
                    this.registeredOrigins[t] || (this.registeredOrigins[t] = {
                        origin: t,
                        proxyPath: e.proxyPath,
                        proxyFrame: this._createPromisedIframe("" + t.replace(/[^\w\s]+/gi, "-") + "-proxy", "" + t + e.proxyPath)
                    }),
                    !0
                },
                l.prototype.reset = function(e) {
                    return this.clientProxy = null,
                    this.oAuthProxy = null,
                    this.accessToken = null,
                    this.accessTokenState = null,
                    this.accessTokenStateFailureCount = 0,
                    this.accessTokenLastResponseTimestamp = null
                },
                l.prototype.setLogLevel = function(e) {
                    return this.logger.setLogLevel(e)
                },
                l
            } ()
        })
    }.call(this),
    function() {
        n("client/util", [],
        function() {
            var e;
            return e = function() {
                function e() {}
                return e.bindEvent = function(e, t, n) {
                    if (!e) throw {
                        code: "REQUIRED_ARGUMENT_MISSING",
                        message: "Object is a required argument"
                    };
                    if (!t) throw {
                        code: "REQUIRED_ARGUMENT_MISSING",
                        message: "Event Name is a required argument"
                    };
                    if (!n) throw {
                        code: "REQUIRED_ARGUMENT_MISSING",
                        message: "Handler is a required argument"
                    };
                    if (e.addEventListener != null) return e.addEventListener(t, n, !1);
                    if (e.attachEvent != null) return e.attachEvent("on" + t, n);
                    throw {
                        code: "UNABLE_TO_BIND_EVENT",
                        message: "Neither addEventListener or attachEvent are present"
                    }
                },
                e.currentOrigin = function() {
                    var e;
                    return e = "" + window.location.protocol + "//" + window.location.hostname,
                    window.location.port && (e += ":" + window.location.port),
                    e
                },
                e.randomNumber = function() {
                    var e, t;
                    return t = Math.random(),
                    e = (new Date).getTime(),
                    t * e
                },
                e
            } ()
        })
    }.call(this),
    function(e, t, n) {
        function r(e) {
            return "[object Function]" == d.call(e)
        }
        function i(e) {
            return "string" == typeof e
        }
        function s() {}
        function o(e) {
            return ! e || "loaded" == e || "complete" == e || "uninitialized" == e
        }
        function u() {
            var e = v.shift();
            m = 1,
            e ? e.t ? h(function() { ("c" == e.t ? k.injectCss: k.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
            },
            0) : (e(), u()) : m = 0
        }
        function a(e, n, r, i, s, a, f) {
            function l(t) {
                if (!d && o(c.readyState) && (w.r = d = 1, !m && u(), c.onload = c.onreadystatechange = null, t)) {
                    "img" != e && h(function() {
                        b.removeChild(c)
                    },
                    50);
                    for (var r in T[n]) T[n].hasOwnProperty(r) && T[n][r].onload()
                }
            }
            var f = f || k.errorTimeout,
            c = t.createElement(e),
            d = 0,
            g = 0,
            w = {
                t: r,
                s: n,
                e: s,
                a: a,
                x: f
            };
            1 === T[n] && (g = 1, T[n] = []),
            "object" == e ? c.data = n: (c.src = n, c.type = e),
            c.width = c.height = "0",
            c.onerror = c.onload = c.onreadystatechange = function() {
                l.call(this, g)
            },
            v.splice(i, 0, w),
            "img" != e && (g || 2 === T[n] ? (b.insertBefore(c, y ? null: p), h(l, f)) : T[n].push(c))
        }
        function f(e, t, n, r, s) {
            return m = 0,
            t = t || "j",
            i(e) ? a("c" == t ? E: w, e, t, this.i++, n, r, s) : (v.splice(this.i++, 0, e), 1 == v.length && u()),
            this
        }
        function l() {
            var e = k;
            return e.loader = {
                load: f,
                i: 0
            },
            e
        }
        var c = t.documentElement,
        h = e.setTimeout,
        p = t.getElementsByTagName("script")[0],
        d = {}.toString,
        v = [],
        m = 0,
        g = "MozAppearance" in c.style,
        y = g && !!t.createRange().compareNode,
        b = y ? c: p.parentNode,
        c = e.opera && "[object Opera]" == d.call(e.opera),
        c = !!t.attachEvent && !c,
        w = g ? "object": c ? "script": "img",
        E = c ? "script": w,
        S = Array.isArray ||
        function(e) {
            return "[object Array]" == d.call(e)
        },
        x = [],
        T = {},
        N = {
            timeout: function(e, t) {
                return t.length && (e.timeout = t[0]),
                e
            }
        },
        C,
        k;
        k = function(e) {
            function t(e) {
                var e = e.split("!"),
                t = x.length,
                n = e.pop(),
                r = e.length,
                n = {
                    url: n,
                    origUrl: n,
                    prefixes: e
                },
                i,
                s,
                o;
                for (s = 0; s < r; s++) o = e[s].split("="),
                (i = N[o.shift()]) && (n = i(n, o));
                for (s = 0; s < t; s++) n = x[s](n);
                return n
            }
            function o(e, i, s, o, u) {
                var a = t(e),
                f = a.autoCallback;
                a.url.split(".").pop().split("?").shift(),
                a.bypass || (i && (i = r(i) ? i: i[e] || i[o] || i[e.split("/").pop().split("?")[0]]), a.instead ? a.instead(e, i, s, o, u) : (T[a.url] ? a.noexec = !0 : T[a.url] = 1, s.load(a.url, a.forceCSS || !a.forceJS && "css" == a.url.split(".").pop().split("?").shift() ? "c": n, a.noexec, a.attrs, a.timeout), (r(i) || r(f)) && s.load(function() {
                    l(),
                    i && i(a.origUrl, u, o),
                    f && f(a.origUrl, u, o),
                    T[a.url] = 2
                })))
            }
            function u(e, t) {
                function n(e, n) {
                    if (e) {
                        if (i(e)) n || (f = function() {
                            var e = [].slice.call(arguments);
                            l.apply(this, e),
                            c()
                        }),
                        o(e, f, t, 0, u);
                        else if (Object(e) === e) for (p in h = function() {
                            var t = 0,
                            n;
                            for (n in e) e.hasOwnProperty(n) && t++;
                            return t
                        } (), e) e.hasOwnProperty(p) && (!n && !--h && (r(f) ? f = function() {
                            var e = [].slice.call(arguments);
                            l.apply(this, e),
                            c()
                        }: f[p] = function(e) {
                            return function() {
                                var t = [].slice.call(arguments);
                                e && e.apply(this, t),
                                c()
                            }
                        } (l[p])), o(e[p], f, t, p, u))
                    } else ! n && c()
                }
                var u = !!e.test,
                a = e.load || e.both,
                f = e.callback || s,
                l = f,
                c = e.complete || s,
                h, p;
                n(u ? e.yep: e.nope, !!a),
                a && n(a)
            }
            var a, f, c = this.yepnope.loader;
            if (i(e)) o(e, 0, c, 0);
            else if (S(e)) for (a = 0; a < e.length; a++) f = e[a],
            i(f) ? o(f, 0, c, 0) : S(f) ? k(f) : Object(f) === f && u(f, c);
            else Object(e) === e && u(e, c)
        },
        k.addPrefix = function(e, t) {
            N[e] = t
        },
        k.addFilter = function(e) {
            x.push(e)
        },
        k.errorTimeout = 1e4,
        null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", C = function() {
            t.removeEventListener("DOMContentLoaded", C, 0),
            t.readyState = "complete"
        },
        0)),
        e.yepnope = l(),
        e.yepnope.executeStack = u,
        e.yepnope.injectJs = function(e, n, r, i, a, f) {
            var l = t.createElement("script"),
            c,
            d,
            i = i || k.errorTimeout;
            l.src = e;
            for (d in r) l.setAttribute(d, r[d]);
            n = f ? u: n || s,
            l.onreadystatechange = l.onload = function() { ! c && o(l.readyState) && (c = 1, n(), l.onload = l.onreadystatechange = null)
            },
            h(function() {
                c || (c = 1, n(1))
            },
            i),
            a ? l.onload() : p.parentNode.insertBefore(l, p)
        },
        e.yepnope.injectCss = function(e, n, r, i, o, a) {
            var i = t.createElement("link"),
            f,
            n = a ? u: n || s;
            i.href = e,
            i.rel = "stylesheet",
            i.type = "text/css";
            for (f in r) i.setAttribute(f, r[f]);
            o || (p.parentNode.insertBefore(i, p), h(n, 0))
        }
    } (this, document),
    n("yepnope",
    function(e) {
        return function() {
            var t, n;
            return t || e.yepnope
        }
    } (this)),
    function() {
        var e = {}.hasOwnProperty,
        t = [].indexOf ||
        function(e) {
            for (var t = 0,
            n = this.length; t < n; t++) if (t in this && this[t] === e) return t;
            return - 1
        };
        n("client/widget_loader", ["yepnope"],
        function() {
            var n;
            return n = function() {
                function f() {
                    yepnope.addFilter(function(e) {
                        return e.url.indexOf("http") !== 0 && (e.url = n + e.url),
                        e
                    })
                }
                var n, r, i, s, o, u, a;
                return n = "https://videocloudnew.brightcove.com/public/assets/js/widgets/",
                r = "https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js",
                u = "https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js",
                s = {
                    feedback: ["feedback.css", "feedback.js"],
                    picker: ["picker.css", "picker.js"],
                    modal: ["modal.js"]
                },
                i = ["modal"],
                o = ["feedback"],
                a = {},
                f.prototype.registerWidget = function(e, t, n) {
                    var r;
                    a[e] = t;
                    if (n) return r = document.createElement("div"),
                    r.className = "bc-widget",
                    typeof n == "string" ? r.innerHTML = n: r.appendChild(n),
                    document.body.appendChild(r)
                },
                f.prototype.preloadWidgets = function(t, n) {
                    var r, i;
                    t == null && (t = []),
                    a = o.concat(t),
                    r = [];
                    for (i in a) {
                        if (!e.call(a, i)) continue;
                        r = r.concat(s[a[i]])
                    }
                    return yepnope({
                        load: r,
                        complete: n
                    })
                },
                f.prototype.loadWidget = function(e, n, o) {
                    var f, l = this;
                    o == null && (o = {}),
                    n || (n = function() {});
                    if (a[e]) {
                        n(a[e]);
                        return
                    }
                    return f = s[e] || o.assets,
                    t.call(i, e) >= 0 && (f.unshift(r), window.jQuery || f.unshift(u)),
                    yepnope({
                        load: f,
                        complete: function() {
                            return n(a[e])
                        }
                    })
                },
                f.prototype.getWidget = function(e) {
                    return a[e]
                },
                f
            } ()
        })
    }.call(this),
    function() {
        var e = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        };
        n("client/studio_header", [],
        function() {
            var t, n, r;
            return r = function(e, t, n) {
                return document.addEventListener ? e.addEventListener(t, n) : e.attachEvent(t, n)
            },
            t = function() {
                function o(e, i, s, u) {
                    var a, f, l = this;
                    this.targetId = e,
                    this.dropId = i,
                    this.selector = s,
                    this.callback = u,
                    f = document.getElementById(this.targetId),
                    a = document.getElementById(this.dropId),
                    r(f, "click",
                    function(e) {
                        return l.step = -1,
                        l.toggle(e)
                    }),
                    r(f, "keydown",
                    function(e) {
                        l.step = -1,
                        e.keyCode === t && l.toggle(e);
                        if (l.visible) return l.arrow(e)
                    }),
                    r(a, "click",
                    function(e) {
                        return l.select(e)
                    }),
                    r(a, "keydown",
                    function(e) {
                        return e.keyCode === t && l.select(e),
                        l.arrow(e)
                    }),
                    o.all.length === 0 && (r(document, "click",
                    function(e) {
                        if (e.target.tagName !== "INPUT") return l.hideAll(e)
                    }), r(document, "keyup",
                    function(e) {
                        if (e.keyCode === n) return l.hideAll(e),
                        e.target.blur()
                    })),
                    o.all.push(this)
                }
                var e, t, n, i, s;
                return o.all = [],
                t = 13,
                s = 38,
                e = 40,
                i = 9,
                n = 27,
                o.prototype.onSelect = function(e) {},
                o.prototype.onShow = function(e) {},
                o.prototype.onHide = function(e) {},
                o.prototype.hide = function(e) {
                    return document.getElementById(this.dropId).style.display = "none",
                    this.visible = !1,
                    this.onHide(e)
                },
                o.prototype.show = function(e) {
                    return document.getElementById(this.dropId).style.display = "block",
                    this.visible = !0,
                    this.onShow(e)
                },
                o.prototype.toggle = function(e) {
                    return this.visible ? this.hide(e) : this.show(e),
                    this.hideAll(e, this.targetId),
                    e.preventDefault(),
                    e.stopPropagation()
                },
                o.prototype.select = function(e) {
                    return this.onSelect(e),
                    e.stopPropagation()
                },
                o.prototype.arrow = function(t) {
                    var n, r, o, u, a, f, l, c;
                    if ((c = t.keyCode) === e || c === s || c === i) {
                        t.preventDefault(),
                        t.stopPropagation(),
                        o = document.querySelectorAll(this.selector),
                        a = [];
                        for (f = 0, l = o.length; f < l; f++) r = o[f],
                        r.style.display !== "none" && a.push(r);
                        return u = t.keyCode === e || t.keyCode === i && !t.shiftKey,
                        n = t.keyCode === s || t.keyCode === i && t.shiftKey,
                        u && this.step++,
                        n && this.step--,
                        this.step < 0 && (this.step = 0),
                        this.step > a.length - 1 && (this.step = a.length - 1),
                        a[this.step].focus()
                    }
                },
                o.prototype.hideAll = function(e, t) {
                    var n, r, i, s, u;
                    s = o.all,
                    u = [];
                    for (r = 0, i = s.length; r < i; r++) n = s[r],
                    n.targetId !== t ? u.push(n.hide(e)) : u.push(void 0);
                    return u
                },
                o
            } (),
            n = function() {
                function m(t) {
                    this.render = e(this.render, this),
                    l = t,
                    this.render(),
                    setTimeout(n, 3e3),
                    setInterval(n, 6e4)
                }
                var n, i, s, o, u, a, f, l, c, h, p, d, v;
                return l = null,
                i = !1,
                a = null,
                h = function(e, t) {
                    return document.cookie = e + "=" + t
                },
                s = function(e) {
                    var t;
                    return t = document.cookie.match(RegExp(e + "=(\\w+)")),
                    t ? t[1] : null
                },
                p = function() {
                    return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch
                },
                v = {
                    settings: {
                        en: "Settings",
                        es: "Configuración",
                        ja: "アカウント設定"
                    },
                    profile: {
                        en: "Profile",
                        es: "Perfil",
                        ja: "プロフィール"
                    },
                    users: {
                        en: "Users",
                        es: "Usuarios",
                        ja: "ユーザー"
                    },
                    reports: {
                        en: "Reports",
                        es: "Informes",
                        ja: "レポート"
                    },
                    support: {
                        en: "Support",
                        es: "Asistencia",
                        ja: "サポート"
                    },
                    sign_out: {
                        en: "Sign Out",
                        es: "Cerrar sesión",
                        ja: "ログアウト"
                    },
                    search: {
                        en: "Search Accounts",
                        es: "Buscar cuenta",
                        ja: "検索アカウント"
                    },
                    beta: {
                        en: "Beta",
                        es: "Beta",
                        ja: "ベータ"
                    },
                    problems: {
                        en: "There are system problems. Click for details.",
                        es: "Hay problemas en el sistema. Haga clic para obtener más información.",
                        ja: "システムの問題があります。詳細については、クリックしてください。"
                    }
                },
                u = function() {
                    var e;
                    return e = '<div id="bc-brand">\n  <div id="bc-meta">\n    <a id="bc-siren" href="http://status.brightcove.com/" title="' + v.problems[a] + '">\n      <img src="https://videocloudnew.brightcove.com/public/assets/img/status-warning.png" width="21" height="19" alt="System Error"/>\n    </a>\n    <span id="bc-email"></span>\n    <span id="bc-settings">\n      <img id="bc-settings-icon" src="https://videocloudnew.brightcove.com/public/assets/img/settings.png" width="16" height="16" alt="' + v.settings[a] + '" tabindex="0"/>\n      <div id="bc-settings-list" class="bc-dropdown">\n        <ul>\n          <li><a href="https://videocloud.brightcove.com/studio/profile">' + v.profile[a] + '</a></li>\n          <li><a href="https://videocloud.brightcove.com/studio/admin/publishing">' + v.settings[a] + '</a></li>\n          <li><a href="https://videocloud.brightcove.com/studio/users">' + v.users[a] + '</a></li>\n          <li><a href="https://videocloud.brightcove.com/studio/reports">' + v.reports[a] + '</a></li>\n        </ul>\n      </div>\n    </span>\n    <a id="bc-support" href="http://support.brightcove.com/">' + v.support[a] + '</a> |\n    <a id="bc-logout" href="https://signin.brightcove.com/logout">' + v.sign_out[a] + '</a>\n  </div>\n  <div>\n    <a href="https://videocloudnew.brightcove.com/dashboard" tabindex="1">\n      <img id="bc-logo" width="225" height="27" src="https://videocloudnew.brightcove.com/public/assets/img/logo.png" alt="Video Cloud" title="Video Cloud"/>\n    </a>\n  </div>\n</div>\n<div id="bc-bar">\n  <div id="bc-bar-inside">\n    <a id="bc-accts" tabindex="1">\n      <span id="bc-accts-current"></span>\n      <span id="bc-accts-caret">&#9660;</span>\n    </a>\n    <div id="bc-arrow"></div>\n    <ul id="bc-mods">\n    </ul>\n  </div>\n</div>\n<div id="bc-accts-list" class="bc-dropdown">\n  <input id="bc-accts-search" type="search" placeholder="' + v.search[a] + '" tabindex="1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>\n  <ul id="bc-accts-results">\n  </ul>\n</div>',
                    e.replace(/>\s+</g, "><")
                },
                o = function(e) {
                    var t, n, r, s, o, u;
                    t = {
                        module: {
                            title: "Dashboard",
                            url: "https://videocloudnew.brightcove.com/dashboard"
                        },
                        current: location.pathname === "/dashboard"
                    };
                    for (r = 0, o = e.length; r < o; r++) n = e[r],
                    n.current = window.location.href.indexOf(n.module.url) === 0,
                    n.module.classic && n.current && (i = !0);
                    if (i) for (s = 0, u = e.length; s < u; s++) n = e[s],
                    n.module.classic && (n.module.url = n.module.url.split("//")[1].match(/\/.+/)[0]);
                    return [t].concat(e)
                },
                c = function(e) {
                    var t, n, r, i, s, o, u, a;
                    t = 13,
                    o = [],
                    s = document.querySelectorAll("#bc-accts-list li");
                    for (u = 0, a = s.length; u < a; u++) i = s[u],
                    n = i.getAttribute("data-name").toLowerCase(),
                    r = this.value.toLowerCase().replace(/\s+/g, " ").replace(/^\s+|\s+$/g, ""),
                    n.indexOf(r) > -1 || r === "" ? (i.style.display = "block", o.push(i)) : i.style.display = "none";
                    if (o.length === 1 && e.keyCode === t) return d(o[0].getAttribute("data-account-id"))
                },
                d = function(e) {
                    return l._postMessage({
                        action: "switcheroo",
                        accountId: e
                    })
                },
                n = function() {
                    return l.get("/status",
                    function(e) {
                        return document.getElementById("bc-siren").style.display = e.status === "good" ? "none": "inline"
                    })
                },
                m.prototype.render = function(e, t, n) {
                    var r;
                    a = s("BC_LANG");
                    if (e) return r = l.getLanguage(),
                    r !== a && (a = r, document.getElementById("bc-nav").innerHTML = u(), h("BC_LANG", a)),
                    (n != null ? n.showSettingsLink: void 0) === !0 && (document.getElementById("bc-settings").style.display = "inline-block"),
                    document.getElementById("bc-email").innerHTML = e.email_address,
                    f(e.accounts, e.currentAccount, t);
                    if (a) return document.getElementById("bc-nav").innerHTML = u()
                },
                f = function(e, n, s) {
                    var u, f, h, m, g, y, b, w, E, S, x, T, N, C, k, L = this;
                    document.getElementById("bc-accts-current").innerHTML = n.name,
                    S = document.getElementById("bc-accts-results");
                    for (x = 0, N = e.length; x < N; x++) f = e[x],
                    g = document.createElement("li"),
                    g.setAttribute("data-name", f.name),
                    g.setAttribute("data-account-id", f.id),
                    g.setAttribute("tabindex", "1"),
                    u = document.createElement("a"),
                    u.setAttribute("data-account-id", f.id),
                    u.innerHTML = f.name,
                    u.href = "javascript:void(0)",
                    f.id === n.id && (w = document.createElement("span"), w.className = "bc-accts-selected", w.innerHTML = "&bull;", g.appendChild(w)),
                    g.appendChild(u),
                    S.appendChild(g);
                    S = document.getElementById("bc-mods"),
                    k = o(s);
                    for (T = 0, C = k.length; T < C; T++) y = k[T],
                    g = document.createElement("li"),
                    y.current && (g.className = "bc-current"),
                    u = document.createElement("a"),
                    u.href = y.module.url,
                    u.setAttribute("tabindex", "2"),
                    u.setAttribute("data-url", y.module.url),
                    i && u.setAttribute("data-classic", "true"),
                    u.innerHTML = y.module.title,
                    y.beta && (w = document.createElement("span"), w.className = "beta", w.innerHTML = v.beta[a], w.setAttribute("data-url", y.module.url), u.appendChild(w)),
                    g.appendChild(u),
                    S.appendChild(g);
                    return r(document.getElementById("bc-mods"), "click",
                    function(e) {
                        if (location.href.indexOf(e.target.getAttribute("data-url")) === 0) return l.trigger("home"),
                        e.preventDefault(),
                        !1
                    }),
                    r(document.getElementById("bc-logout"), "click",
                    function(e) {
                        return location.href = "https://signin.brightcove.com/logout?redirect=" + l._getRedirectUrl(),
                        e.preventDefault(),
                        !1
                    }),
                    i && $("#bc-mods a[data-classic=true]").on("click",
                    function(e) {
                        return $("#bc-mods li").removeClass("bc-current"),
                        $(this).parent().addClass("bc-current")
                    }),
                    e.length > 1 && (h = document.getElementById("bc-accts-caret"), h.style.display = "inline", m = document.getElementById("bc-accts-search"), E = new t("bc-accts", "bc-accts-list", "#bc-accts-list [tabindex]", null), E.onShow = function(e) {
                        return p() || m.focus(),
                        this.step = 0,
                        h.innerHTML = "&#9650;"
                    },
                    E.onHide = function(e) {
                        return h.innerHTML = "&#9660;"
                    },
                    E.onSelect = function(e) {
                        var t;
                        t = e.target.getAttribute("data-account-id");
                        if (t) return d(t)
                    },
                    r(m, "keyup", c)),
                    b = new t("bc-settings-icon", "bc-settings-list", "#bc-settings a", null),
                    document.getElementById("bc-bar-inside").style.display = "block"
                },
                m
            } (),
            n
        })
    }.call(this),
    function() {
        n("client/trial_display", [],
        function() {
            var e;
            return e = function() {
                function t(t) {
                    e = t
                }
                var e;
                return e = null,
                t.prototype.showTrialActive = function() {
                    var t, n, r, i, s, o;
                    return n = (i = e.getModule()) != null ? (s = i.module) != null ? (o = s.trial) != null ? o.message: void 0 : void 0 : void 0,
                    n ? (t = document.getElementById("bc-trial"), t ? t.innerHTML = n: (t = document.createElement("div"), t.id = "bc-trial", t.innerHTML = n, r = document.getElementById("bc-nav"), r.parentNode.insertBefore(t, r.nextSibling)), !0) : !1
                },
                t.prototype.showTrialExpired = function(t) {
                    var n, r, i, s, o;
                    return i = e.getModule(),
                    r = i != null ? (s = i.module) != null ? (o = s.trial) != null ? o.expiredMessage: void 0 : void 0 : void 0,
                    r ? (n = r + " " + t, e.loadWidget("modal",
                    function(e) {
                        return e.invert(),
                        e.setHeadline("" + i.module.title + " Trial Expired"),
                        e.setBody(n),
                        e.open()
                    }), !0) : !1
                },
                t
            } ()
        })
    }.call(this),
    function() {
        n("client/toast", [],
        function() {
            var e;
            return e = function() {
                function n() {}
                var e, t;
                return t = null,
                e = null,
                n.prototype.alert = function(n, r) {
                    return r == null && (r = "info"),
                    r === "error" && (r = "warning"),
                    t === null && (t = document.createElement("div"), t.id = "bc-toaster", e = document.createElement("div"), e.id = "bc-toast", e.innerHTML = '<span class="icon">&#x2715;</span><div></div>', e.firstChild.onclick = function() {
                        return t.style.display = "none"
                    },
                    t.appendChild(e), document.body.appendChild(t)),
                    t.style.display = "block",
                    e.childNodes[1].innerHTML = n,
                    e.className = "bc-toast-" + r
                },
                n
            } ()
        })
    }.call(this),
    function() {
        var e = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        };
        n("client/studio_module", ["underscore", "bacon", "lucid", "promise", "logger", "bcapi", "./util", "./widget_loader", "./studio_header", "./trial_display", "./toast"],
        function(t, n, r, i, s, o, u, a, f, l, c) {
            var h;
            return h = function() {
                function S(t) {
                    var n, s, o, h = this;
                    t == null && (t = {}),
                    this.request = e(this.request, this),
                    this.login = e(this.login, this),
                    this._kickoff = e(this._kickoff, this),
                    this._loadWidgetsFromConfig = e(this._loadWidgetsFromConfig, this),
                    this._handleResponse = e(this._handleResponse, this),
                    this._handleAuthenticate = e(this._handleAuthenticate, this),
                    this._handleUserResponse = e(this._handleUserResponse, this),
                    this._onMessage = e(this._onMessage, this),
                    this._authenticate = e(this._authenticate, this),
                    this._initializeBCApi = e(this._initializeBCApi, this),
                    this._waitForLoad = e(this._waitForLoad, this),
                    this._fetchUser = e(this._fetchUser, this),
                    this._getLoginUrl = e(this._getLoginUrl, this),
                    o = r.emitter();
                    for (s in o) n = o[s],
                    this[s] = n;
                    b = new c,
                    E = new a,
                    y = new f(this),
                    w = new l(this),
                    t.logLevel != null && this.setLogLevel(t.logLevel),
                    this.config = {},
                    this.user = null,
                    this.modules = [],
                    this.callbacks = {},
                    this.authenticatedOnce = !1,
                    this.initDeferred = i.defer(),
                    this.userDeferred = i.defer(),
                    this._eventBus = r.emitter(),
                    this._eventBus.on("user", this._handleUserResponse),
                    this._eventBus.on("switcherood", this._handleAccountSwitch),
                    this._eventBus.on("auth", this._handleAuthenticate),
                    this._eventBus.on("get_response", this._handleResponse),
                    this._eventBus.on("post_response", this._handleResponse),
                    u.bindEvent(window, "message", this._onMessage),
                    i.allResolved([this.initDeferred.promise, this.userDeferred.promise]).spread(function(e, t) {
                        return h._kickoff(t)
                    })
                }
                var h, p, d, v, m, g, y, b, w, E;
                return v = new s,
                p = "https://videocloudnew.brightcove.com",
                g = "https://videocloudnew.brightcove.com/user",
                m = "https://signin.brightcove.com/",
                h = "https://services.brightcove.com/services/internal/",
                d = "https://videocloudnew.brightcove.com/bounce",
                b = null,
                E = null,
                y = null,
                w = null,
                S.prototype._postMessage = function(e) {
                    return document.getElementById("bc-user").contentWindow.postMessage(JSON.stringify(e), p)
                },
                S.prototype._bindOfflineHandling = function(e) {
                    var t = this;
                    return e == null && (e = {}),
                    this.authResponseBus = new n.Bus,
                    this.authRequestBus = new n.Bus,
                    this._eventBus.on("auth",
                    function(e) {
                        return t.authResponseBus.push(e)
                    }),
                    this.userInteracting = e.userInteractionStream.map(!0).toProperty(!0),
                    this.userFocused = e.userFocusStream.map(!0).toProperty(!0),
                    this.userActive = this.userFocused.and(this.userInteracting).flatMapLatest(function() {
                        return n.once(!0).merge(n.later(3e4, !1))
                    }).skipDuplicates(),
                    this.awaitingTokenTimeoutRetry = this.authResponseBus.filter(function(e) {
                        var t;
                        return (e != null ? (t = e.error) != null ? t.code: void 0 : void 0) === "TOKEN_REQUEST_TIMEOUT"
                    }).awaiting(this.authRequestBus).skipDuplicates(),
                    this.needsInstantAuth = this.awaitingTokenTimeoutRetry.and(this.userActive).filter(function(e) {
                        return e
                    }),
                    this.needsInstantAuth.subscribe(function() {
                        return v.log("needs instant auth", Date.now()),
                        t._authenticate()
                    })
                },
                S.prototype._getLoginUrl = function() {
                    var e;
                    return this.config && ((e = this.config) != null ? e.admin: void 0) === !0 ? "" + h: "" + m + "?redirect=" + this._getRedirectUrl()
                },
                S.prototype._getRedirectUrl = function() {
                    var e;
                    return e = encodeURIComponent(window.location.href),
                    location.hostname.indexOf("brightcove.com") > -1 ? e: "" + d + "/" + encodeURIComponent(e)
                },
                S.prototype._fetchUser = function() {
                    var e, t = this;
                    if (typeof document != "undefined" && document !== null ? !document.body: !void 0) {
                        setTimeout(function() {
                            return t._fetchUser
                        },
                        100);
                        return
                    }
                    return this.userFrame || (this.userFrame || (this.userFrame = document.createElement("iframe")), this.userFrame.setAttribute("id", "bc-user"), this.userFrame.setAttribute("style", "display: none;"), document.body.appendChild(this.userFrame)),
                    e = "" + g + "?buster=" + u.randomNumber() + "#origin=" + encodeURIComponent(u.currentOrigin()),
                    v.log("setting bc-user frame source to " + e),
                    this.userFrame.src = e,
                    this.userFrame
                },
                S.prototype._waitForLoad = function() {
                    var e;
                    return (typeof window != "undefined" && window !== null ? (e = window.onStudioModuleLoad) != null ? e.call: void 0 : void 0) ? window.onStudioModuleLoad(this) : setTimeout(this._waitForLoad, 100)
                },
                S.prototype._connect = function() {
                    return this._fetchUser(),
                    this._waitForLoad()
                },
                S.prototype._initializeBCApi = function() {
                    var e, t, n, r;
                    return e = {
                        id: this.user.currentAccount.id,
                        moduleId: (t = this.config) != null ? t.moduleId: void 0,
                        stubAccessToken: (n = this.config) != null ? n.stubAccessToken: void 0,
                        logLevel: ((r = this.config) != null ? r.logLevel: void 0) || "NONE"
                    },
                    this.bcApi = new o(e),
                    this._eventBus.pipe("auth", this.bcApi)
                },
                S.prototype._authenticate = function() {
                    return this.authRequestBus.push(Date.now()),
                    this.bcApi.authenticate()
                },
                S.prototype._onMessage = function(e) {
                    var t, n, r;
                    if (e != null && e.data != null && e.origin === p) {
                        t = JSON.parse(e.data),
                        r = t[0],
                        n = t[1];
                        if (r === "client") switch (n.event) {
                        case "user":
                            return this._eventBus.trigger("user", n.detail);
                        case "switcherooed":
                            return this._eventBus.trigger("switcherood");
                        case "get_response":
                            return this._eventBus.trigger("get_response", n.detail);
                        case "post_response":
                            return this._eventBus.trigger("post_response", n.detail);
                        default:
                            return v.warn("Received unknown event", e)
                        }
                    }
                },
                S.prototype._handleUserResponse = function(e) {
                    var t, n = this;
                    if (this.user && this.authenticatedOnce) {
                        if (e.error && e.error.code === "NOT_LOGGED_IN") return this.trigger("logout"),
                        this.alert("Your session has expired.  Please <a href='" + this._getLoginUrl() + "'>login</a>.", "error")
                    } else {
                        if (e != null ? !e.error: !void 0) return this.user = e.user,
                        this.modules = e.modules,
                        this.features = e.features,
                        this.userDeferred.resolve(e);
                        switch ((t = e.error) != null ? t.code: void 0) {
                        case "NOT_LOGGED_IN":
                            return this.initDeferred.promise.then(function() {
                                return n.login()
                            });
                        default:
                            return this.alert("A system error has occurred.  Please reload your browser and try again.", "error")
                        }
                    }
                },
                S.prototype._handleAccountSwitch = function() {
                    return window.location.reload()
                },
                S.prototype._handleAuthenticate = function(e) {
                    var t;
                    if ((e != null ? e.error: void 0) != null) switch ((t = e.error) != null ? t.code: void 0) {
                    case "ACCESS_DENIED":
                        this._fetchUser();
                        break;
                    case "TOKEN_REQUEST_TIMEOUT":
                        clearTimeout(this.offlineTimer),
                        this.offlineTimer = setTimeout(this._authenticate, 3e4)
                    } else this.authenticatedOnce = !0;
                    return this.trigger("auth", {
                        token: e.token,
                        error: e.error || null
                    })
                },
                S.prototype._handleResponse = function(e) {
                    var t;
                    return t = this.callbacks[e.callbackId],
                    delete e.callbackId,
                    t.success(e),
                    delete this.callbacks[e.callbackId]
                },
                S.prototype._loadWidgetsFromConfig = function(e) {
                    return E.preloadWidgets(this.config.widgets, e)
                },
                S.prototype._kickoff = function(e) {
                    var t, r, i = this;
                    this._bindOfflineHandling({
                        userInteractionStream: n.fromEventTarget(window, "mousemove").merge(n.fromEventTarget(window, "keydown")),
                        userFocusStream: n.fromEventTarget(window, "focus")
                    }),
                    ((t = this.config) != null ? t.moduleId: void 0) && this._initializeBCApi(),
                    this._loadWidgetsFromConfig(function() {
                        return i.trigger("init", {
                            user: i.user,
                            error: e.error || null
                        })
                    }),
                    ((r = this.config) != null ? r.moduleId: void 0) && this._authenticate(),
                    y.render(this.user, this.modules, this.features),
                    this.isTrialActive() && this.showTrialActive();
                    if (this.isTrialExpired()) return this.showTrialExpired()
                },
                S.prototype.init = function(e) {
                    var n;
                    return e == null && (e = {}),
                    t.extend(this.config, e),
                    ((n = this.config) != null ? !n.moduleId: !void 0) && v.warn("No moduleId provided to init, OAuth support will not be enabled."),
                    this.initDeferred.resolve()
                },
                S.prototype.setLogLevel = function(e) {
                    return e == null && (e = "NONE"),
                    this.config.logLevel = e,
                    v.setLogLevel(e),
                    this.bcApi && this.bcApi.setLogLevel(e),
                    !0
                },
                S.prototype.api = function() {
                    return this.bcApi
                },
                S.prototype.getUser = function() {
                    return this.user
                },
                S.prototype.login = function() {
                    return location.href = this._getLoginUrl()
                },
                S.prototype.registerWidget = function(e, t, n) {
                    return E.registerWidget(e, t, n)
                },
                S.prototype.loadWidget = function(e, t, n) {
                    return E.loadWidget(e, t, n)
                },
                S.prototype.getWidget = function(e) {
                    return E.getWidget(e)
                },
                S.prototype.getModule = function() {
                    var e, t, n, r;
                    r = this.modules;
                    for (t = 0, n = r.length; t < n; t++) {
                        e = r[t];
                        if (window.location.href.indexOf(e.module.url) === 0) return e
                    }
                    return {}
                },
                S.prototype.getLanguage = function() {
                    if (this.user) return this.user.locale.split("_")[0]
                },
                S.prototype.get = function(e, t, n) {
                    return this.request(e, "get", {},
                    t, n)
                },
                S.prototype.post = function(e, t, n, r) {
                    return this.request(e, "post", t, n, r)
                },
                S.prototype.request = function(e, t, n, r, i) {
                    var s;
                    return i == null && (i = function() {}),
                    s = Math.floor( + (new Date) * Math.random()).toString(32),
                    this.callbacks[s] = {
                        success: r,
                        error: i
                    },
                    n.action = t.toLowerCase(),
                    n.path = e,
                    n.callbackId = s,
                    this._postMessage(n)
                },
                S.prototype.alert = function(e, t, n) {
                    var r, i;
                    t == null && (t = "info"),
                    n == null && (n = {}),
                    b.alert(e, t),
                    n.Message = e,
                    n.Location = location.href,
                    n.Time = new Date,
                    i = "";
                    for (r in n) i += "" + r + ": " + n[r].toString() + "\n";
                    return v.log(i),
                    void 0
                },
                S.prototype.showTrialActive = function() {
                    return w.showTrialActive()
                },
                S.prototype.showTrialExpired = function(e) {
                    return e == null && (e = ""),
                    w.showTrialExpired(e)
                },
                S.prototype.isTrialActive = function() {
                    var e;
                    return ((e = this.getModule().trial) != null ? e.active: void 0) || !1
                },
                S.prototype.isTrialExpired = function() {
                    var e;
                    return ((e = this.getModule().trial) != null ? e.expired: void 0) || !1
                },
                S.prototype.showAccessDenied = function() {
                    return this.loadWidget("modal",
                    function(e) {
                        return e.setHeadline("Access Denied"),
                        e.setBody("Oh no! You don't have permission to access this module."),
                        e.open()
                    })
                },
                S
            } ()
        })
    }.call(this),
    function() {
        t.config({
            baseUrl: "/js",
            paths: {
                logger: "libs/logger/logger",
                events: "libs/events/events",
                bcapi: "libs/bcapi/bcapi",
                bacon: "libs/bacon/dist/Bacon",
                hogan: "libs/hogan/web/builds/2.0.0/hogan-2.0.0.amd",
                text: "libs/require/text",
                hgn: "libs/require/hgn",
                templates: "client/templates",
                promise: "libs/q/q",
                lucid: "libs/lucid/lucid",
                underscore: "libs/underscore/underscore",
                yepnope: "libs/yepnope/yepnope.1.5.4-min"
            },
            shim: {
                yepnope: {
                    deps: [],
                    exports: "yepnope"
                },
                underscore: {
                    deps: [],
                    exports: "_"
                }
            },
            hgn: {
                templateExtension: ".js"
            }
        }),
        t(["client/studio_module"],
        function(e) {
            return window.StudioModule = new e(window.STUDIO_MODULE_OPTIONS),
            window.StudioModule._connect()
        })
    }.call(this),
    n("studio-module",
    function() {})
})();