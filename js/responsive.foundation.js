/*! Responsive Foundation styling 4.0.1 for DataTables
 * Copyright (c) SpryMedia Ltd - datatables.net/license
 */

(function(factory){
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['datatables.net-zf', 'datatables.net-responsive'], function (dt) {
			return factory(window, document, dt);
		});
	}
	else if (typeof exports === 'object') {
		// CommonJS
		var cjsRequires = function (root) {
			if (! root.DataTable) {
				require('datatables.net-zf')(root);
			}

			if (! window.DataTable.Responsive) {
				require('datatables.net-responsive')(root);
			}
		};

		if (typeof window === 'undefined') {
			module.exports = function (root) {
				if (! root) {
					// CommonJS environments without a window global must pass a
					// root. This will give an error otherwise
					root = window;
				}

				cjsRequires(root);
				return factory(root, root.document, root.DataTable);
			};
		}
		else {
			cjsRequires(window);
			module.exports = factory(window, window.document, window.DataTable);
		}
	}
	else {
		// Browser
		factory(window, document, window.DataTable);
	}
}(function(window, document, DataTable) {
'use strict';



// Note that Foundation's JS depends upon jQuery, so we use it here
var jq = DataTable.use('jq');
var _display = DataTable.Responsive.display;
var _original = _display.modal;

_display.modal = function (options) {
	return function (row, update, render, closeCallback) {
		if (!jq.fn.foundation) {
			return _original(row, update, render, closeCallback);
		}
		else {
			var rendered = render();

			if (rendered === false) {
				return false;
			}

			if (!update) {
				var modalContainer = jq('<div class="reveal-overlay" style="display:block"/>');
				jq(
					'<div class="reveal reveal-modal" style="display:block; top: 150px;" data-reveal/>'
				)
					.append('<button class="close-button" aria-label="Close">&#215;</button>')
					.append(
						options && options.header ? '<h4>' + options.header(row) + '</h4>' : null
					)
					.append(rendered)
					.appendTo(modalContainer);

				modalContainer.appendTo('body');

				jq('button.close-button').on('click', function () {
					jq('.reveal-overlay').remove();
					closeCallback();
				});
				jq('.reveal-overlay').on('click', function () {
					jq('.reveal-overlay').remove();
					closeCallback();
				});
			}
			else {
				return false;
			}

			return true;
		}
	};
};


return DataTable;
}));
