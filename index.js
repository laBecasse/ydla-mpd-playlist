const PLAYLIST_DIR = '/var/lib/mpd/playlists'
const PLAYLIST_FILE = 'ydla.m3u'

const path = require('path')
const fs = require('fs')

const playlistPath = path.join(PLAYLIST_DIR, PLAYLIST_FILE)

module.exports = function (medias) {
  let lines = ''

  for (let media of medias) {
    if (media.getFileUrl() && media.tags.includes('music')) {
      lines += media.getFileUrl() + '#' + media.title
      lines += '\n'
    }
  }

  return new Promise((resolve, reject) => {
    fs.appendFile(playlistPath, lines, err => {
      if (err) return reject(err)
      resolve(lines)
    })
  })
}
