require.config({
	// TOREVIST: shouldn't need both include and deps
	include: ["app"],
	deps: ["app"],
	paths: {
		d3: "d3.v3",
		"socket.io": "empty:"
	},

	shim: {
		"d3": {
			exports: "d3"
		},
		"socket.io": {
			exports: "io"
		}
	}
});