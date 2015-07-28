module.exports = function(grunt){
  //Configuration Task(s)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      livereload: {
        files: ['**/*.html', '**/*.css', '**/*.js'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load Plugins
  
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Register Task(s)
  
  grunt.registerTask('creep', 'watch');
};