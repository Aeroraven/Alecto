//To intercept the source code for TMALL v8
//Just use NGINX
export function alectoTmallReqDigest(e) {
    function t(e, t) {
        return e << t | e >>> 32 - t
    }
    function n(e, t) {
        var n, r, i, a, o;
        return i = 2147483648 & e,
        a = 2147483648 & t,
        o = (1073741823 & e) + (1073741823 & t),
        (n = 1073741824 & e) & (r = 1073741824 & t) ? 2147483648 ^ o ^ i ^ a : n | r ? 1073741824 & o ? 3221225472 ^ o ^ i ^ a : 1073741824 ^ o ^ i ^ a : o ^ i ^ a
    }
    function r(e, r, i, a, o, s, l) {
        return e = n(e, n(n(function(e, t, n) {
            return e & t | ~e & n
        }(r, i, a), o), l)),
        n(t(e, s), r)
    }
    function i(e, r, i, a, o, s, l) {
        return e = n(e, n(n(function(e, t, n) {
            return e & n | t & ~n
        }(r, i, a), o), l)),
        n(t(e, s), r)
    }
    function a(e, r, i, a, o, s, l) {
        return e = n(e, n(n(function(e, t, n) {
            return e ^ t ^ n
        }(r, i, a), o), l)),
        n(t(e, s), r)
    }
    function o(e, r, i, a, o, s, l) {
        return e = n(e, n(n(function(e, t, n) {
            return t ^ (e | ~n)
        }(r, i, a), o), l)),
        n(t(e, s), r)
    }
    function s(e) {
        var t, n = "", r = "";
        for (t = 0; 3 >= t; t++)
            n += (r = "0" + (e >>> 8 * t & 255).toString(16)).substr(r.length - 2, 2);
        return n
    }
    var l, c, p, u, d, f, m, g, h, v;
    for (v = function(e) {
        for (var t, n = e.length, r = n + 8, i = 16 * ((r - r % 64) / 64 + 1), a = new Array(i - 1), o = 0, s = 0; n > s; )
            o = s % 4 * 8,
            a[t = (s - s % 4) / 4] = a[t] | e.charCodeAt(s) << o,
            s++;
        return o = s % 4 * 8,
        a[t = (s - s % 4) / 4] = a[t] | 128 << o,
        a[i - 2] = n << 3,
        a[i - 1] = n >>> 29,
        a
    }(e = function(e) {
        console.log("L5530");
        console.log(e);
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            128 > r ? t += String.fromCharCode(r) : r > 127 && 2048 > r ? (t += String.fromCharCode(r >> 6 | 192),
            t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
            t += String.fromCharCode(r >> 6 & 63 | 128),
            t += String.fromCharCode(63 & r | 128))
        }
        return t
    }(e)),
    f = 1732584193,
    m = 4023233417,
    g = 2562383102,
    h = 271733878,
    l = 0; l < v.length; l += 16)
        c = f,
        p = m,
        u = g,
        d = h,
        f = r(f, m, g, h, v[l + 0], 7, 3614090360),
        h = r(h, f, m, g, v[l + 1], 12, 3905402710),
        g = r(g, h, f, m, v[l + 2], 17, 606105819),
        m = r(m, g, h, f, v[l + 3], 22, 3250441966),
        f = r(f, m, g, h, v[l + 4], 7, 4118548399),
        h = r(h, f, m, g, v[l + 5], 12, 1200080426),
        g = r(g, h, f, m, v[l + 6], 17, 2821735955),
        m = r(m, g, h, f, v[l + 7], 22, 4249261313),
        f = r(f, m, g, h, v[l + 8], 7, 1770035416),
        h = r(h, f, m, g, v[l + 9], 12, 2336552879),
        g = r(g, h, f, m, v[l + 10], 17, 4294925233),
        m = r(m, g, h, f, v[l + 11], 22, 2304563134),
        f = r(f, m, g, h, v[l + 12], 7, 1804603682),
        h = r(h, f, m, g, v[l + 13], 12, 4254626195),
        g = r(g, h, f, m, v[l + 14], 17, 2792965006),
        f = i(f, m = r(m, g, h, f, v[l + 15], 22, 1236535329), g, h, v[l + 1], 5, 4129170786),
        h = i(h, f, m, g, v[l + 6], 9, 3225465664),
        g = i(g, h, f, m, v[l + 11], 14, 643717713),
        m = i(m, g, h, f, v[l + 0], 20, 3921069994),
        f = i(f, m, g, h, v[l + 5], 5, 3593408605),
        h = i(h, f, m, g, v[l + 10], 9, 38016083),
        g = i(g, h, f, m, v[l + 15], 14, 3634488961),
        m = i(m, g, h, f, v[l + 4], 20, 3889429448),
        f = i(f, m, g, h, v[l + 9], 5, 568446438),
        h = i(h, f, m, g, v[l + 14], 9, 3275163606),
        g = i(g, h, f, m, v[l + 3], 14, 4107603335),
        m = i(m, g, h, f, v[l + 8], 20, 1163531501),
        f = i(f, m, g, h, v[l + 13], 5, 2850285829),
        h = i(h, f, m, g, v[l + 2], 9, 4243563512),
        g = i(g, h, f, m, v[l + 7], 14, 1735328473),
        f = a(f, m = i(m, g, h, f, v[l + 12], 20, 2368359562), g, h, v[l + 5], 4, 4294588738),
        h = a(h, f, m, g, v[l + 8], 11, 2272392833),
        g = a(g, h, f, m, v[l + 11], 16, 1839030562),
        m = a(m, g, h, f, v[l + 14], 23, 4259657740),
        f = a(f, m, g, h, v[l + 1], 4, 2763975236),
        h = a(h, f, m, g, v[l + 4], 11, 1272893353),
        g = a(g, h, f, m, v[l + 7], 16, 4139469664),
        m = a(m, g, h, f, v[l + 10], 23, 3200236656),
        f = a(f, m, g, h, v[l + 13], 4, 681279174),
        h = a(h, f, m, g, v[l + 0], 11, 3936430074),
        g = a(g, h, f, m, v[l + 3], 16, 3572445317),
        m = a(m, g, h, f, v[l + 6], 23, 76029189),
        f = a(f, m, g, h, v[l + 9], 4, 3654602809),
        h = a(h, f, m, g, v[l + 12], 11, 3873151461),
        g = a(g, h, f, m, v[l + 15], 16, 530742520),
        f = o(f, m = a(m, g, h, f, v[l + 2], 23, 3299628645), g, h, v[l + 0], 6, 4096336452),
        h = o(h, f, m, g, v[l + 7], 10, 1126891415),
        g = o(g, h, f, m, v[l + 14], 15, 2878612391),
        m = o(m, g, h, f, v[l + 5], 21, 4237533241),
        f = o(f, m, g, h, v[l + 12], 6, 1700485571),
        h = o(h, f, m, g, v[l + 3], 10, 2399980690),
        g = o(g, h, f, m, v[l + 10], 15, 4293915773),
        m = o(m, g, h, f, v[l + 1], 21, 2240044497),
        f = o(f, m, g, h, v[l + 8], 6, 1873313359),
        h = o(h, f, m, g, v[l + 15], 10, 4264355552),
        g = o(g, h, f, m, v[l + 6], 15, 2734768916),
        m = o(m, g, h, f, v[l + 13], 21, 1309151649),
        f = o(f, m, g, h, v[l + 4], 6, 4149444226),
        h = o(h, f, m, g, v[l + 11], 10, 3174756917),
        g = o(g, h, f, m, v[l + 2], 15, 718787259),
        m = o(m, g, h, f, v[l + 9], 21, 3951481745),
        f = n(f, c),
        m = n(m, p),
        g = n(g, u),
        h = n(h, d);
    return (s(f) + s(m) + s(g) + s(h)).toLowerCase()
}