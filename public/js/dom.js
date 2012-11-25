/**
 * dom utilities to ween off jQuery laziness.
 */
var dom = {
	hasClass: function(el, cssclass) {
		var pattern = new RegExp(cssclass, "g");
		//return el.className.split( ' ' ).indexOf(cssclass) > -1;
		return pattern.test(el.className);
	},
	addClass: function(el, cssclass){
		el.className += ' ' + cssclass;
		return el;
	},
	removeClass: function(el, cssclass){
		var pattern = new RegExp(cssclass, "g");
		el.className = el.className.replace(pattern, '');
		return el;
	},
	toggleClass: function(el, cssclass) {
		var pattern = new RegExp(cssclass, "g");
		dom[ (pattern.test(el.className) ? 'remove':'add') + 'Class'](el, cssclass);
		return el;
	},
	show: function(el){
		dom.removeClass(el, 'hide');
	},
	hide: function(el){
		dom.addClass(el, 'hide');
	}
};