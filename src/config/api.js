import {
    baseUrl
} from './baseUrl'
const apiObj = {
    //课程
    courseGetList: '/course/getList',
    courseModify: '/course/modify',
    courseDelete: '/course/delete',
    //章节
    courseCatalogGetList: '/courseCatalog/getList',
    courseCatalogModify: '/courseCatalog/modify',
    courseCatalogDelete: '/courseCatalog/delete',
    //段落
    courseContentGetContent: '/courseContent/getContent',
    courseContentModify: '/courseContent/modify',
    courseContentDelete: '/courseContent/delete',
    commonGetList: '/common/getList',
    fileUploadFile: '/file/uploadFile',
    fileVideo: '/file/video',
}
for (const key in apiObj) {
    if (apiObj.hasOwnProperty(key)) {
        let url = `/api${apiObj[key]}`
        if (process.env.NODE_ENV !== "development") {
            url = `${baseUrl}${apiObj[key]}`
        }
        apiObj[key] = url
    }
}
console.log(process.env);
export default apiObj