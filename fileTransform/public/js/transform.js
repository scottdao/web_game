document.getElementsByClassName("zh")[0].onclick=function(){
    if(document.getElementsByClassName("checkbox")[0].checked){
        alert("转换成功")
    }
    else{
        alert("请勾选协议")
    }
}