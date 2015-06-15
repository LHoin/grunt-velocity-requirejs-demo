var bundle = require('../bundle') || {};

module.exports =  {
	default: {
		src: '<%=yo.dist%>/static/js/common/require-config.js',
		overwrite: true,
		replacements: [{
			from: /\/\*\s*_bundles_position\s*\*\//,
			to: function() {
				var bundleString = JSON.stringify(bundle);
				return 'require.bundles=' + bundleString + ';';
			}
		}]
	}
}
