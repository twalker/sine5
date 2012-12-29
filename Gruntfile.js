module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['public/js/**/*.js'],
				// the location of the resulting JS file
				dest: 'public/js/dist/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> v<%= pkg.version %>, <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
				//'public/js/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				'public/js/dist/<%= pkg.name %>.min.js': ['<%= requirejs.compile.options.out%>']

				}
			}
		},

		requirejs: {

			compile: {
				options: {
					optimize: 'none',
					baseUrl: "public/js",
					mainConfigFile: "public/js/config.js",
					out: "public/js/dist/requirejs-out.js"
				}
			}
		}		
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-requirejs');


	grunt.registerTask('default', ['requirejs', 'uglify']);
}