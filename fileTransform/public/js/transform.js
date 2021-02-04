document.getElementsByClassName("zh")[0].onclick=function(){
    if(document.getElementsByClassName("checkbox")[0].checked){
        alert("转换成功")
    }
    else{
        alert("请勾选协议")
    }
}
// 点击切换效果
let ddarr=document.querySelectorAll("#left dd")
for(let i=0;i<ddarr.length;i++){
    ddarr[i].onclick=function(event){
        let text=event.target.innerText
        document.getElementById("scp").innerHTML=text
        // 清空类名
        for(let j=0;j<ddarr.length;j++){
            ddarr[j].className=""
        }
        ddarr[i].className="click"
    }
}