!function() {
	function a(a, b) {
		this._options = this._options || {}, $.extend(this._options, g), $.extend(this._options, b), this.inputs = a, this.init()
	}
	function b(a) {
		function b() {
			e.timerClear = setTimeout(function() {
				c = d(e.focusElem.val()), "" === c && clearTimeout(e.timerClear), e.focusElem.val(c), b()
			}, 100)
		}
		var c, e = this;
		switch (a.type) {
		case "touchstart":
			e.waitClear = setTimeout(b, 200);
			break;
		case "touchend":
			clearTimeout(e.waitClear), e.timerClear && clearTimeout(e.timerClear)
		}
	}
	function c(a) {
		var b, c, e, f = this,
			g = f._options;
		switch (a.type) {
		case "click":
			var h = $(a.target);
			h.attr("show-cursor") || h[0].blur(), f.focusElem = h, f.open();
			break;
		case "touchstart":
			if (void 0 !== f._touchelem) return;
			f._touchelem = a.target;
			break;
		case "touchend":
			if (a.target !== f._touchelem) return;
			if (b = $(a.target), !f.focusElem) return;
			e = f.focusElem.val(), e.toString().length < f.focusElem.attr("maxlength") && g.inputFn.call(f.focusElem, e, b.attr("data-tag")) !== !1 && f.focusElem.val(e + b.attr("data-tag")), f._touchelem = void 0;
			break;
		case "tap":
			if ((b = $(a.target).closest(".item-del", c)) && b.length) {
				if (!f.focusElem) return;
				e = f.focusElem.val(), f.focusElem.val(d(e))
			} else(b = $(a.target).closest(".keyboard-bar", c)) && b.length && f.close()
		}
	}
	function d(a) {
		return a.substring(0, a.length - 1)
	}
	function e(a) {
		$(a).on("touchstart", function() {
			$(this).css("background-color", " #bcc0c6")
		}), $(a).on("touchend  touchcancel", function() {
			$(this).css("background-color", " #fff")
		})
	}
	function f(b, c) {
		return new a(b, c)
	}
	var g = {
		inputFn: function() {}
	},
		h = null,
		i = [{
			val: 1,
			tag: 1
		}, {
			val: 2,
			tag: 2
		}, {
			val: 3,
			tag: 3
		}, {
			val: 4,
			tag: 4
		}, {
			val: 5,
			tag: 5
		}, {
			val: 6,
			tag: 6
		}, {
			val: 7,
			tag: 7
		}, {
			val: 8,
			tag: 8
		}, {
			val: 9,
			tag: 9
		}, {
			val: "X",
			tag: "X"
		}, {
			val: 0,
			tag: 0
		}, {
			val: "<span><i></i></span>",
			tag: "delete",
			"class": "item-del"
		}];
	a.prototype.init = function() {
		var a, d = this,
			f = d._options;
		d.eventHand = a = $.proxy(c, d), d.deleteEventHand = deleteEventHand = $.proxy(b, d), f._container = $(document.body);
		for (var g = '<div class="ui-identity-input"><section><div class="keyboard-bar"><p>收起键盘</p></div><ul class="clearfix">', h = 0; h < i.length; h++) {
			var j = i[h];
			g += '<li class="' + (j.class || "item-list") + '" data-tag="' + j.tag + '">' + j.val + "</li>"
		}
		g += "</ul></section></div>", f._wrap = $(g).appendTo(f._container), e($("li", f._wrap)), $("li:not(.item-del)", f._wrap).on("touchstart touchend", a), $(".item-del", f._wrap).on("touchstart touchend", deleteEventHand).on("tap", a), $(".keyboard-bar", f._wrap).on("tap", a), this.inputs.each(function() {
			$(this).attr("show-cursor") || (this.readOnly = !0)
		}).on("click", a)
	}, 
	a.prototype.open = function() {
		var a = this._options;
		a._wrap.css({
			display: "block",
			opacity: 1
		}).animate({
			transform: "translate3d(0,0,0)"
		}, 200)
	}, 
	a.prototype.close = function(a) {
		var b = this._options;
		return b._wrap.animate({
			transform: "translate3d(0,100%,0)",
			opacity: .2
		}, 260, function() {
			b._wrap.css({
				display: "none"
			}), a && a()
		}), this.focusElem = null, this
	}, 
	a.prototype.destroy = function() {
		{
			var a = this._options;
			this.eventHand
		}
		$(".keyboard-bar", a._wrap).off("tap"), $("li", a._wrap).off("touchstart touchend touchmove tap"), a._wrap.off("click").remove(), this.inputs.off("click", this.eventHand).each(function() {
			this.readOnly = !1
		}), h = null
	}, 
	a.prototype.add = function(a) {
		a.off("click", this.eventHand), this.inputs.add(a), a.on("click", this.eventHand), a.attr("show-cursor") || (a[0].readOnly = !0)
	}, 
	a.prototype.remove = function(a) {
		a.off("click", this.eventHand), a[0].readOnly = !1, this.focusElem && this.focusElem[0] == a[0] && (this.focusElem = null, this.close())
	}, a.prototype.update = function() {}, $.fn.identityInput = function(a) {
		return this ? ("remove" === a && h ? h.remove(this) : h ? h.add(this) : h = new f(this, a), h) : void 0
	}
}();