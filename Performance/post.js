var $c = function (name) {
    return $(document.createElement(name));
};
var common;
(function (common) {
    function onErr(msg, url, num) {
        $.ajax({
            type: 'POST',
            url: '/z/err',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                msg: msg,
                url: url,
                num: num,
                loc: window.location.href
            })
        });
        return false;
    }
    ;
    var VersionView = (function () {
        function VersionView(el, delay) {
            var _this = this;
            this.el = el;
            this.timer = -1;
            el.hover(function () {
                _this.mouseDidEnter(delay);
            }, function () {
                _this.mouseDidLeave();
            });
        }
        VersionView.prototype.reset = function () {
            if (this.timer >= 0) {
                clearTimeout(this.timer);
            }
            this.timer = -1;
            if (this.view) {
                this.view.remove();
            }
            this.view = null;
        };
        VersionView.prototype.show = function (data) {
            var view = $c('div')
                .addClass('version')
                .text('<' + data.sha.substring(0, 12) + ', ' + data.name + '>')
                .insertBefore(this.el);
            this.view = view;
            var er = this.el.get(0).getBoundingClientRect(), vr = view.get(0).getBoundingClientRect();
            view.css({
                'left': (er.left + er.width / 2) - vr.width / 2 + window.screenX,
                'top': er.top - vr.height - 40 + window.scrollY
            });
        };
        VersionView.prototype.mouseDidEnter = function (delay) {
            var _this = this;
            this.reset();
            this.timer = setTimeout(function () {
                $.ajax({
                    url: '/version',
                    dataType: 'json'
                }).done(function (data) {
                    _this.show(data);
                });
            }, delay);
        };
        VersionView.prototype.mouseDidLeave = function () {
            this.reset();
        };
        VersionView.attachTo = function (el) {
            return new VersionView(el, 2000);
        };
        return VersionView;
    }());
    function init() {
        window.onerror = onErr;
        $('footer > .sig').on('click', function (e) {
            e.preventDefault();
            $('body,html').stop().animate({
                scrollTop: 0
            }, 500);
        });
        VersionView.attachTo($('footer > .sig'));
        var perf = window.performance;
        if (!perf) {
            return;
        }
        var dur = Date.now() - perf.timing.requestStart, div = document.body.appendChild(document.createElement('div'));
        div.setAttribute('id', 'perf');
        div.textContent = dur + 'ms';
        setTimeout(function () {
            div.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(div);
            }, 200);
        }, 5000);
    }
    common.init = init;
    ;
})(common || (common = {}));
var klunk;
(function (klunk) {
    var BASE_URL = '//storage.googleapis.com/fs.kellegous.com/stats/b/', SVGNS = 'http://www.w3.org/2000/svg', DAY_IN_MS = 1000 * 60 * 60 * 24, days = 230, v = 'a';
    var graphHeight = 56;
    var MONS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
        'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    function urlFor(pathname) {
        var p = pathname.split('/').slice(2, 6);
        if (p.length < 4) {
            return '';
        }
        return BASE_URL + p.join('/') + '.json?' + v;
    }
    function loadFor(pathname, fn) {
        var url = urlFor(pathname);
        if (!url) {
            fn([]);
        }
        else {
            $.getJSON(url, function (data) {
                fn(transformToNow(Date.parse(data.t), data.c));
            });
        }
    }
    function transformToNow(t, c) {
        var now = Date.now(), dt = ((now - t) / DAY_IN_MS) | 0, res = c.slice(dt - days);
        while (res.length < days) {
            res.push(0);
        }
        return {
            t: t + (dt - days) * DAY_IN_MS,
            c: res
        };
    }
    function isFirstOfMonth(dt) {
        return dt.getDate() == 1;
    }
    function formatMonth(dt) {
        return MONS[dt.getMonth()];
    }
    function monthsIn(t, n) {
        var res = [];
        for (var i = 0; i < n; i++) {
            var dt = new Date(t + i * DAY_IN_MS);
            res.push(isFirstOfMonth(dt) ? dt : null);
        }
        return res;
    }
    function createSvg(name) {
        return document.createElementNS(SVGNS, name);
    }
    function setAttrs(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, '' + attrs[key]);
        }
    }
    function mkSvg(par, name, attrs) {
        var el = createSvg(name);
        setAttrs(el, attrs);
        return par.appendChild(el);
    }
    function render(svg) {
        loadFor(location.pathname, function (data) {
            var c = data.c, w = svg.width.baseVal.value, h = svg.height.baseVal.value, dx = w / days, dy = graphHeight / 255, mons = monthsIn(data.t, data.c.length);
            c.forEach(function (y, i) {
                var dt = mons[i];
                if (dt) {
                    if ((days - i) > 5) {
                        mkSvg(svg, 'text', {
                            x: i * dx + 4,
                            y: h - graphHeight - 4,
                            'font-family': 'museo-sans',
                            'font-size': 10,
                            fill: '#999'
                        }).textContent = formatMonth(dt);
                    }
                    mkSvg(svg, 'line', {
                        x1: i * dx + 1,
                        y1: h - graphHeight - 12,
                        x2: i * dx + 1,
                        y2: h,
                        'stroke-dasharray': '2,2',
                        stroke: '#ccc'
                    });
                }
                mkSvg(svg, 'rect', {
                    x: i * dx + 1,
                    y: h - y * dy,
                    width: dx - 2,
                    height: y * dy,
                    fill: '#ccc'
                });
            });
        });
    }
    klunk.render = render;
})(klunk || (klunk = {}));
function formatCount(v) {
    if (v < 1e3) {
        return '' + v;
    }
    if (v < 1e6) {
        return (v / 1e3).toFixed(1) + 'k';
    }
    return (v / 1e6).toFixed(1) + 'M';
}
;
function countsFor(url, fn) {
    $.ajax('/counts.json?url=' + encodeURIComponent(url), {
        success: function (data) {
            var likes = data.Facebook ? data.Facebook.total_count | 0 : 0, pluses = data.GooglePlusOne | 0;
            fn(likes, pluses);
        }
    });
}
;
function socialize() {
    var f = document.querySelector('#lk>.soc>.face');
    countsFor(location.pathname, function (likes, pluses) {
        var total = likes + pluses;
        if (total == 0) {
            return;
        }
        var fc = f.querySelector('.c');
        fc.textContent = formatCount(total);
        f.classList.remove('off');
        var title = (total == 1)
            ? 'someone somewhere on the internet liked this'
            : formatCount(total) + " people somewhere on the internet like this";
        f.setAttribute('title', title);
    });
}
common.init();
socialize();
klunk.render(document.querySelector('#lk>.act>svg.kg'));