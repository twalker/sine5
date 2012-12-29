module.exports = function(grunt){
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
				'public/js/dist/<%= pkg.name %>.min.js': ['<%= requirejs.compile.options.out%>']

				}
			}
		},

		requirejs: {
			compile: {
				options: {
					optimize: 'none',
					baseUrl: "public/js",
					mainConfigFile: "public/js/main.js",
					out: "public/js/dist/sine5.js"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['requirejs', 'uglify']);
}