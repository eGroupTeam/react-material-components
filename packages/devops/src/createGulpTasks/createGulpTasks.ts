import path from 'path';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import bom from 'gulp-bom';
import rename from 'gulp-rename';
import clean from 'gulp-clean';

export interface CreateGulpTasksConfig {
  serverDir: string;
  buildFolder: string;
  indexPath?: string;
}

function createGulpTasks({
  serverDir,
  buildFolder,
  indexPath,
}: CreateGulpTasksConfig) {
  /**
   * build index and it accepts jsp or html file type.
   */
  gulp.task('buildIndex', () => {
    if (!indexPath) return Promise.resolve('done');
    const name = path.basename(indexPath);
    const dir = path.dirname(indexPath);
    return (
      gulp
        .src('build/index.html')
        .pipe(
          plumber({
            errorHandler(error) {
              console.log(error.message);
              this.emit('end');
            },
          })
        )
        // gulp bom is to conver files to utf-8
        .pipe(bom())
        .pipe(rename(name))
        .pipe(gulp.dest(`${serverDir}${dir}`))
    );
  });

  /**
   * clean build folder
   */
  gulp.task('cleanBuild', () =>
    gulp
      .src(`${serverDir}${buildFolder}`, {
        read: false,
        allowEmpty: true,
      })
      .pipe(
        clean({
          force: true,
        })
      )
  );

  /**
   * copy build to serverDir
   */
  gulp.task('copyBuild', () => {
    if (!indexPath) {
      return gulp
        .src('build/**/*')
        .pipe(gulp.dest(`${serverDir}${buildFolder}`));
    }
    return gulp
      .src(['build/**/*', '!build/index.html'])
      .pipe(gulp.dest(`${serverDir}${buildFolder}`));
  });

  /**
   * production
   */
  gulp.task(
    'production',
    gulp.series(['buildIndex', 'cleanBuild', 'copyBuild'])
  );
}

export default createGulpTasks;
