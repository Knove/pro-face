/**
 * 导入后缀名，导出ICON 图片
 *
 * @param  {string} postf       postf 是后缀名
 * @return {object}           An object is Image File require
 */
export default function iconExport(postf) {
  if (postf === ".pptx" || postf === ".ppt") {
    return require("../assets/file-logo/PPT.png");
  } else if (postf === ".doc" || postf === ".docx") {
    return require("../assets/file-logo/WORD.png");
  } else if (postf === ".xlsx" || postf === ".xls") {
    return require("../assets/file-logo/ECEL.png");
  } else if (postf === ".jpg" || postf === ".jpeg") {
    return require("../assets/file-logo/JPG.png");
  } else if (postf === ".png") {
    return require("../assets/file-logo/PNG.png");
  } else if (postf === ".pdf") {
    return require("../assets/file-logo/PDF.png");
  } else if (postf === ".zip") {
    return require("../assets/file-logo/ZIP.png");
  } else if (postf === ".gif") {
    return require("../assets/file-logo/GIF.png");
  } else if (postf === ".txt") {
    return require("../assets/file-logo/TET.png");
  } else {
    return require("../assets/file-logo/OTHER.png");
  }
}
