'use strict';

/** 
 * OPTIONAL where to move goods files  
 * 可选 手动漫画整理的时候，你想把喜欢的漫画移动到的位置
 */
const now = new Date();
const y = now.getFullYear();
let mm = now.getMonth()+1;
mm = ( mm < 10 ) ? ( "0" + ( mm ).toString() ) : ( mm ).toString();

const fd =  [y, mm, "01"].join("_");
module.exports.good_folder = "/data/good/" + fd;
module.exports.good_folder_root = "/data/good";
module.exports.not_good_folder = "/data/sort/"+ y;
module.exports.additional_folder = [
	"/data/other"
];

//----------------- below section used by developer-----------------------------

module.exports.workspace_name = "workspace";
 
module.exports.cache_folder_name = "cache";

module.exports.thumbnail_folder_name = "thumbnails";

module.exports.img_convert_cache = "image_convert_cache"

//delete or move to recyle bin
//删除操作是真的彻底删除还是丢进回收站
module.exports.move_file_to_recyle = true;

//wehter to use meaningful file name in cache folder
//or encode they by hash function
module.exports.readable_cache_folder_name = true;

//漫画阅读中两页clip在一起以后，翻页是不是还要接着拼在一起
//wether to clip page
module.exports.keep_clip = false;

//in MB
module.exports.oversized_image_size = 4;

//非localhost的机器想移动删除文件，需要在admin输出密码才可以获得权限
//并不是高明的安全机制
//注：Shigureader设计实现，只考虑在LAN情况下的性能和安全性。
//Naive password when access remotely
module.exports.file_change_password = "2020";

//压缩图片的时候用的参数
//传给magick用的
//For magick compress output quality
module.exports.img_convert_quality = 65;

//which output file 
module.exports.img_convert_dest_type = ".jpg";

//超过这个大小，再转换的时候同时压低分辨率。
//现在太多漫画，扫描出来一来4000*6000。完全没有必要
module.exports.img_reduce_resolution_threshold = 6*1024*1024 ; //in MB

//小于这个大小，没有转换的必要
module.exports.img_convert_min = 2.5*1024*1024; //in MB

//Only Shrink Larger Images ('>' flag)
//参考资料:http://www.imagemagick.org/Usage/resize/#shrink
//不必担心，会保持比例，高宽都低于规定的比例。
module.exports.img_reduce_resolution_dimension = "2800x2800";

//uses can view folder that has images as a zip
//so users do not have zip their manga
//But this may cause more Memory usage
//可以阅读文件夹的图片，就不需要打包成zip
//但可能用很多内存
module.exports.view_img_folder = true;


//global password
//when set, user need to enter password to use ShiguReader
//全局密码，设置以后用户必须输入密码才能打开网站
module.exports.home_password = ""

//do not display a zip if it has no image files or music files
module.exports.filter_empty_zip = true;
