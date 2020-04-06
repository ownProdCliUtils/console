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
}
for (const key in apiObj) {
    if (apiObj.hasOwnProperty(key)) {
        apiObj[key] = `/api${apiObj[key]}`
    }
}
export default apiObj