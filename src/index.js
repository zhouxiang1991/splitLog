import {
  execSync,
} from 'child_process';
import {
  statSync,
} from 'fs';
import {
  CronJob,
} from 'cron';

export default (cronTime = '0 0 0 * * *') => {
  const job = new CronJob({
    cronTime,
    onTick() {
      const out = statSync('./logs/out/out.log');
      if (
        out
        && out.size
      ) {
        execSync('cp ./logs/out/out.log ./logs/out/$(date +"%Y-%m-%d").log');
        execSync('> ./logs/out/out.log');
      }
      const err = statSync('./logs/err/err.log');
      if (
        err
        && err.size
      ) {
        execSync('cp ./logs/err/err.log ./logs/err/$(date +"%Y-%m-%d").log');
        execSync('> ./logs/err/err.log');
      }
      execSync('find ./logs/out -atime +30 -type f | xargs rm -rf');
      execSync('find ./logs/err -atime +30 -type f | xargs rm -rf');
    },
    start: false,
    timeZone: 'Asia/Shanghai',
  });
  return job;
};
