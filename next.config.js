const withImages = require('next-images')

module.exports = withImages({
  esModule: true,
  env: {
    userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMGUxYjI1NWE3Njg0MDAxY2RmOTMwNyIsImVtYWlsIjoibWFyY2Vsb2hhdWJyaWhAZ21haWwuY29tIiwiaWF0IjoxNjExODczOTExLCJleHAiOjE2MTE5NjAzMTF9.CR74gBSAUG2y7XV-cpg-xSvEpoK86nP105xclUwpqxQ',
  },
})
