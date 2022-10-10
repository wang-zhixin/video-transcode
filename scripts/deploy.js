const fs = require('fs-extra')

async function copyFiles (src, dest) {
  try {
    await fs.copy(src, dest)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

copyFiles('./public', './.next/standalone/public')
copyFiles('./node-v16.17.1-linux-x64', './.next/standalone/node-v16.17.1-linux-x64')
copyFiles('./.next/static', './.next/standalone/.next/static')