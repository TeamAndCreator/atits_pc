/**
 * 分页函数
 * pno--页数
 * psize--每页显示记录数
 * 分页部分是从真实数据行开始，因而存在加减某个常数，以确定真正的记录数
 * 纯js分页实质是数据行全部加载，通过是否显示属性完成分页功能
 **/
// 通知公告
function goPageNoti(pno, psize) {
    var itable = document.getElementById("notice");
    var num = itable.getElementsByTagName('li').length;//表格所有行数(所有记录数)
    //console.log(num);
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页 
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  31 
    var endRow = currentPage * pageSize;//结束显示的行   40
    endRow = (endRow > num) ? num : endRow; 40
    // console.log(endRow);
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.getElementsByTagName('li')[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "block";
        } else {
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
    var tempStr = "当前第" + currentPage + "页  ";
    if (currentPage > 1) {
        // tempStr += "<a  onClick=\"goPage(" + (1) + "," + psize + ")\">首页</a>";
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageNoti(" + (currentPage - 1) + "," + psize + ")\"><上一页</a>"
    } else {
        // tempStr += "首页";
        tempStr += "<上一页";
    }

    if (currentPage < totalPage) {
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageNoti(" + (currentPage + 1) + "," + psize + ")\">下一页></a>";
        // tempStr += "<a  onClick=\"goPage(" + (totalPage) + "," + psize + ")\">尾页</a>";
    } else {
        tempStr += "下一页>";
        // tempStr += "尾页";
    }

    document.getElementById("noti").innerHTML = tempStr;

}


//体系动态
function goPageDyna(pno, psize) {
    var itable = document.getElementById("dynamic");
    var num = itable.getElementsByTagName('li').length;//表格所有行数(所有记录数)
    //console.log(num);
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页 
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  31 
    var endRow = currentPage * pageSize;//结束显示的行   40
    endRow = (endRow > num) ? num : endRow; 40
   // console.log(endRow);
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.getElementsByTagName('li')[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "block";
        } else {
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
    var tempStr = "当前第" + currentPage + "页  ";
    if (currentPage > 1) {
        // tempStr += "<a  onClick=\"goPage(" + (1) + "," + psize + ")\">首页</a>";
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageDyna(" + (currentPage - 1) + "," + psize + ")\"><上一页</a>"
    } else {
        // tempStr += "首页";
        tempStr += "<上一页";
    }
   
    if (currentPage < totalPage) {
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageDyna(" + (currentPage + 1) + "," + psize + ")\">下一页></a>";
        // tempStr += "<a  onClick=\"goPage(" + (totalPage) + "," + psize + ")\">尾页</a>";
    } else {
        tempStr += "下一页>";
        // tempStr += "尾页";
    }
    
    document.getElementById("dyna").innerHTML = tempStr;

}

//规章制度
function goPageRegu(pno, psize) {
    var itable = document.getElementById("regulation");
    var num = itable.getElementsByTagName('li').length;//表格所有行数(所有记录数)
    //console.log(num);
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页 
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  31 
    var endRow = currentPage * pageSize;//结束显示的行   40
    endRow = (endRow > num) ? num : endRow; 40
    // console.log(endRow);
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.getElementsByTagName('li')[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "block";
        } else {
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
    var tempStr = "当前第" + currentPage + "页  ";
    if (currentPage > 1) {
        // tempStr += "<a  onClick=\"goPage(" + (1) + "," + psize + ")\">首页</a>";
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageRegu(" + (currentPage - 1) + "," + psize + ")\"><上一页</a>"
    } else {
        // tempStr += "首页";
        tempStr += "<上一页";
    }

    if (currentPage < totalPage) {
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageRegu(" + (currentPage + 1) + "," + psize + ")\">下一页></a>";
        // tempStr += "<a  onClick=\"goPage(" + (totalPage) + "," + psize + ")\">尾页</a>";
    } else {
        tempStr += "下一页>";
        // tempStr += "尾页";
    }

    document.getElementById("regu").innerHTML = tempStr;

}

//重大活动

function goPageActi(pno, psize) {
    var itable = document.getElementById("activity");
    var num = itable.getElementsByTagName('li').length;//表格所有行数(所有记录数)
    //console.log(num);
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页 
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  31 
    var endRow = currentPage * pageSize;//结束显示的行   40
    endRow = (endRow > num) ? num : endRow; 40
    // console.log(endRow);
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.getElementsByTagName('li')[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "block";
        } else {
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
    var tempStr = "当前第" + currentPage + "页  ";
    if (currentPage > 1) {
        // tempStr += "<a  onClick=\"goPage(" + (1) + "," + psize + ")\">首页</a>";
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageActi(" + (currentPage - 1) + "," + psize + ")\"><上一页</a>"
    } else {
        // tempStr += "首页";
        tempStr += "<上一页";
    }

    if (currentPage < totalPage) {
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageActi(" + (currentPage + 1) + "," + psize + ")\">下一页></a>";
        // tempStr += "<a  onClick=\"goPage(" + (totalPage) + "," + psize + ")\">尾页</a>";
    } else {
        tempStr += "下一页>";
        // tempStr += "尾页";
    }

    document.getElementById("acti").innerHTML = tempStr;

}

//重大文件报告
function goPageRepo(pno, psize) {
    var itable = document.getElementById("report");
    var num = itable.getElementsByTagName('li').length;//表格所有行数(所有记录数)
    //console.log(num);
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页 
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  31 
    var endRow = currentPage * pageSize;//结束显示的行   40
    endRow = (endRow > num) ? num : endRow; 40
    // console.log(endRow);
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.getElementsByTagName('li')[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "block";
        } else {
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
    var tempStr = "当前第" + currentPage + "页  ";
    if (currentPage > 1) {
        // tempStr += "<a  onClick=\"goPage(" + (1) + "," + psize + ")\">首页</a>";
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageRepo(" + (currentPage - 1) + "," + psize + ")\"><上一页</a>"
    } else {
        // tempStr += "首页";
        tempStr += "<上一页";
    }

    if (currentPage < totalPage) {
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageRepo(" + (currentPage + 1) + "," + psize + ")\">下一页></a>";
        // tempStr += "<a  onClick=\"goPage(" + (totalPage) + "," + psize + ")\">尾页</a>";
    } else {
        tempStr += "下一页>";
        // tempStr += "尾页";
    }

    document.getElementById("repo").innerHTML = tempStr;

}

//重大成果
function goPageHarv(pno, psize) {
    var itable = document.getElementById("harvest");
    var num = itable.getElementsByTagName('li').length;//表格所有行数(所有记录数)
    //console.log(num);
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //总共分几页 
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  31 
    var endRow = currentPage * pageSize;//结束显示的行   40
    endRow = (endRow > num) ? num : endRow; 40
    // console.log(endRow);
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.getElementsByTagName('li')[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.display = "block";
        } else {
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
    var tempStr = "当前第" + currentPage + "页  ";
    if (currentPage > 1) {
        // tempStr += "<a  onClick=\"goPage(" + (1) + "," + psize + ")\">首页</a>";
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageHarv(" + (currentPage - 1) + "," + psize + ")\"><上一页</a>"
    } else {
        // tempStr += "首页";
        tempStr += "<上一页";
    }

    if (currentPage < totalPage) {
        tempStr += "<a style=\"cursor: pointer\" onClick=\"goPageHarv(" + (currentPage + 1) + "," + psize + ")\">下一页></a>";
        // tempStr += "<a  onClick=\"goPage(" + (totalPage) + "," + psize + ")\">尾页</a>";
    } else {
        tempStr += "下一页>";
        // tempStr += "尾页";
    }

    document.getElementById("harv").innerHTML = tempStr;

}
