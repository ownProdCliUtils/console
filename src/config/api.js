const apiObj = {
    uploadLogo:'/upload/logo',
    uploadBanner:'/upload/banner',
    homeBanner:'/home/banner',
    removeFileById:'/home/removeFileById',
    getLogo:'/home/getLogo',
    commonUploadFiles:'/common/uploadFiles',
    goodAddGood:'/good/addGood',
    getGoodLists:'/good/getGoodLists',
    getGoodById:'/good/getGoodById',
    updateGood:'/good/updateGood',
}
for (const key in apiObj) {
    if (apiObj.hasOwnProperty(key)) {
        apiObj[key] = `http://127.0.0.1:7001${apiObj[key]}`
    }
}
export default apiObj