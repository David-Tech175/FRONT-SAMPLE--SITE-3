if (!jQuery.support.ajax) {
    var XMLHttpRequest = function () {
        this.method = "POST";
        this.url = null;
        this.status = 0;
        this.async = true;
        this.iframe = null;
        this.responseText = null;
        this.header = new Object();
        this.id = "_xmlhttp_" + new Date().getTime();
        this.container = document.body;
        this.date = "";
    };
    XMLHttpRequest.prototype.open = function (c, a, b) {
        this.method = c;
        this.url = a;
        this.async = b;
        this.readyState = 0;
        this.iframe = document.createElement("IFRAME");
        this.iframe.style.position = "absolute";
        this.iframe.style.top = "0px";
        this.iframe.style.left = "-3000px";
        this.iframe.id = this.id;
        this.iframe.src = "common/blank.jsp";
        if (document.getElementById(this.id) == null) {
            this.container.appendChild(this.iframe);
        }
        urlParts = this.url.split("?");
        if (urlParts.length > 1) {
            this.url = urlParts[0];
            this.data = urlParts[1];
        }
    };
    XMLHttpRequest.prototype.setRequestHeader = function (a, b) {
        this.header[a] = b;
    };
    XMLHttpRequest.prototype.abort = function () {};
    XMLHttpRequest.prototype.getResponseHeader = function (a) {
        return "";
    };
    XMLHttpRequest.prototype.getAllResponseHeaders = function () {
        return "";
    };
    XMLHttpRequest.prototype.fix = function (a) {
        return decodeURIComponent(a.replace(/\+/g, " "));
    };
    XMLHttpRequest.prototype.send = function (b) {
        var a = [];
        a[a.length] = '<html><body><form name="ajaxForm" method="' + this.method + '" action="' + this.url + '">';
        if (b != null && b.length > 0) {
            params = b.split("&");
            for (i = 0; i < params.length; i++) {
                pair = params[i].split("=");
                a[a.length] = '<textarea name="' + this.fix(pair[0]) + '">' + this.fix(pair[1]) + "</textarea>";
            }
        }
        if (this.data != null && this.data.length > 0) {
            params = this.data.split("&");
            for (i = 0; i < params.length; i++) {
                pair = params[i].split("=");
                a[a.length] = '<textarea name="' + pair[0] + '">' + pair[1] + "</textarea>";
            }
        }
        a[a.length] = "</form>";
        a[a.length] = "<script>document.ajaxForm.submit();</script>";
        a[a.length] = "</body></html>";
        this.iframe._xmlhttp = this;
        this.iframe._xmlhttp._fix = -1;
        this.iframe._xmlhttp.responseText = null;
        this.iframe.onreadystatechange = this._onreadystatechange;
        var c = this.iframe.contentDocument;
        if (c == undefined || c == null) {
            c = this.iframe.contentWindow.document;
        }
        a = a.join("");
        c.open();
        c.write(a);
        c.close();
    };
    XMLHttpRequest.prototype._onreadystatechange = function () {
        this._xmlhttp._fix++;
        if (this._xmlhttp._fix < 1) {
            return;
        }
        if (this._xmlhttp._fix == 1) {
            this._xmlhttp.readyState = 1;
        } else {
            if (this._xmlhttp._fix > 1) {
                switch (this.readyState.toString()) {
                    case "loading":
                        this._xmlhttp.readyState = 2;
                        break;
                    case "interactive":
                        this._xmlhttp.readyState = 3;
                        break;
                    case "complete":
                        if (window.frames[this.id]) {
                            var a = window.frames[this.id].document.childNodes[0].childNodes[1];
                            this._xmlhttp.responseText = a ? a.innerHTML : "";
                            this._xmlhttp.status = 200;
                        } else {
                            this._xmlhttp.responseText = "";
                            this._xmlhttp.status = 408;
                        }
                        this.onreadystatechange = function () {};
                        this._xmlhttp.readyState = 4;
                }
            }
        }
        if (typeof this._xmlhttp.onreadystatechange == "function") {
            this._xmlhttp.onreadystatechange();
        }
    };
    jQuery.ajaxSettings.xhr = function () {
        return new XMLHttpRequest();
    };
    jQuery.support.ajax = true;
    jQuery.ajaxTransport(function (a) {
        if (!a.crossDomain || jQuery.support.cors) {
            var b;
            return {
                send: function (h, c) {
                    var g = a.xhr(),
                        f,
                        e;
                    if (a.username) {
                        g.open(a.type, a.url, a.async, a.username, a.password);
                    } else {
                        g.open(a.type, a.url, a.async);
                    }
                    if (a.xhrFields) {
                        for (e in a.xhrFields) {
                            g[e] = a.xhrFields[e];
                        }
                    }
                    if (a.mimeType && g.overrideMimeType) {
                        g.overrideMimeType(a.mimeType);
                    }
                    if (!a.crossDomain && !h["X-Requested-With"]) {
                        h["X-Requested-With"] = "XMLHttpRequest";
                    }
                    try {
                        for (e in h) {
                            g.setRequestHeader(e, h[e]);
                        }
                    } catch (d) {}
                    g.send((a.hasContent && a.data) || null);
                    b = function (r, l) {
                        var m, k, j, p, o;
                        try {
                            if (b && (l || g.readyState === 4)) {
                                b = undefined;
                                if (f) {
                                    g.onreadystatechange = jQuery.noop;
                                    delete xhrCallbacks[f];
                                }
                                if (l) {
                                    if (g.readyState !== 4) {
                                        g.abort();
                                    }
                                } else {
                                    m = g.status;
                                    j = g.getAllResponseHeaders();
                                    p = {};
                                    o = g.responseXML;
                                    if (o && o.documentElement) {
                                        p.xml = o;
                                    }
                                    p.text = g.responseText;
                                    try {
                                        k = g.statusText;
                                    } catch (q) {
                                        k = "";
                                    }
                                    if (!m && a.isLocal && !a.crossDomain) {
                                        m = p.text ? 200 : 404;
                                    } else {
                                        if (m === 1223) {
                                            m = 204;
                                        }
                                    }
                                }
                            }
                        } catch (n) {
                            if (!l) {
                                c(-1, n);
                            }
                        }
                        if (p) {
                            c(m, k, p, j);
                        }
                    };
                    if (!a.async || g.readyState === 4) {
                        b();
                    } else {
                        g.onreadystatechange = b;
                    }
                },
                abort: function () {
                    if (b) {
                        b(0, 1);
                    }
                },
            };
        }
    });
}
