module.exports = {
  apps: [{
    name: 'inlinememobot',
    script: 'dist/index.js',
    cwd: '/var/www/InlineMemo/bot/',
    watch: true,
    ignore_watch: ['node_modules'],
    instance_var: 'INSTANCE_ID',
    env: {
      NODE_ENV: 'production',
      PORT: 8951
    },
  }]
}
