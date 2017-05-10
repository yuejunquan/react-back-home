//   这个地方是更新配置文件 的脚本
var fs = require('fs');
var spath = require('path');
var os = require('os');
//修改MainApplication.java
setMainApplication("./android", function (path, s) {
    //找到MainApplication.java
    var isSettingGradle = path.match(/MainApplication\.java/);
    if (isSettingGradle != null) {//如果文件不为空
        console.log("文件路径:" + path);
        if (isFile(path) == false) {
            console.log("MainApplication.java文件不存在!!");
            return;
        }
        var rf = fs.readFileSync(path, "utf-8");
        //添加new AppReactPackage()
        var isAlreadyWrite = rf.match(/.*new AppReactPackage().*/);
        if (isAlreadyWrite == null) {//如果没有添加xxx，便执行
            var searchKey = rf.match(/new MainReactPackage()../);
            if (searchKey != null) {//如果没有找到文件里指定的位置
                rf = rf.replace(searchKey[0], searchKey[0]+ "\n,new AppReactPackage()");
                fs.writeFileSync(path, rf, "utf-8");
            } else {
                throw new TypeError("没有在MainApplication.java里找到指定的位置");
            }
        }
        //添加import com.backHome.AppReactPackage;
        var isAlreadyWrite = rf.match(/.*import com.backHome.AppReactPackage;.*/);
        if (isAlreadyWrite == null) {//如果没有添加xxx，便执行
            var searchKey = rf.match(/import android.app.Application;/);
            if (searchKey != null) {//如果没有找到文件里指定的位置
                rf = rf.replace(searchKey[0], searchKey[0]+ "\nimport com.backHome.AppReactPackage;");
                fs.writeFileSync(path, rf, "utf-8");
            } else {
                throw new TypeError("没有在MainApplication.java里找到指定的位置");
            }
        }

    }
});
function setMainApplication(dir, findOne) {
    if (typeof findOne !== 'function') {
        throw new TypeError('源代码错误');
    }
    eachFileSync(spath.resolve(dir), findOne);
}

//在com下面创建backHome文件夹
createFile();
function createFile() {
    var pathh = "./android/app/src/main/java/com/backHome"
    var nodePath="./node_modules/react-back-home/";
    if (!fs.existsSync(pathh)) {
        fs.mkdirSync(pathh);
    }
    var AppReactPackage = fs.readFileSync(nodePath+"AppReactPackage.java", "utf-8");
    var BackHome = fs.readFileSync(nodePath+"BackHome.java", "utf-8");
    if (!fs.existsSync(pathh + '/AppReactPackage.java')) {//如果文件不存在就创建
        fs.appendFileSync(pathh + '/AppReactPackage.java', AppReactPackage);
    }
    if (!fs.existsSync(pathh + '/BackHome.java')) {//如果文件不存在就创建
        fs.appendFileSync(pathh + '/BackHome.java', BackHome)
    }


}



//判断文件是否存在
function isFile(path) {
    return exists(path) && fs.statSync(path).isFile();
}
// 判断文件
function exists(path) {
    return fs.existsSync(path) || path.existsSync(path);
}
//遍历文件夹
function eachFileSync(dir, findOne) {
    var stats = fs.statSync(dir);
    findOne(dir, stats);

    // 遍历子目录
    if (stats.isDirectory()) {
        var files = fullPath(dir, fs.readdirSync(dir));
        // console.log(dir);
        files.forEach(function (f) {
            eachFileSync(f, findOne);
        });
    }
}
//查询出路径下的文件+文件夹
function fullPath(dir, files) {
    return files.map(function (f) {
        return spath.join(dir, f);
    });
}