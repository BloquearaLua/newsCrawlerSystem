const fs = require('fs')

function getStopwords() {
    return new Promise((resolve, reject) => {
        let stopwords = []
        fs.readFile('d:\\code\\front-end\\projects\\NewsCrawlerSystem\\server\\util\\stopwords.txt', (err, data) => {
            if (err) {
                reject(err)
            } else {
                stopwords = data.toString().split('\r\n')
                resolve(stopwords)
            }
        })
    })
}


module.exports = {
    getStopwords
}