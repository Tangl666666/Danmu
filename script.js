$(document).ready(function(){

//创建野狗云引用
var ref = new Wilddog("https://danmufashe.wilddogio.com/");
var arr=[];


//按下按钮1触发动作
$(".Button1").click(function(){
var text=$(".text").val();
arr.push(text);
//将文本框中的值存储到野狗云
ref.child("message").push(text);
$(".text").val("");


});


//按下按钮2触发动作
$(".Button2").click(function(){
    ref.remove();
    $(".screen").empty();
    arr=[];
});





//监听新增数据

ref.child("message").on("child_added", function(snapshot) {
    
        var value = snapshot.val();
   
    
      var textObj = $("<div class=\"show\"></div>");   //此时.show div还没创建 ，只是创建了一个变量
      textObj.text(value);    
	  $(".screen").append(textObj);       //append后面可以直接加html，这里直接加了.show div元素，而且textObj是局部变量，每次调用函数都新增一个.show div

      place(textObj); 
      move(textObj);
     

      /*本题最坑我的地方，下面是我原先的代码，错误原因：
        第一次执行下列代码会生成一个.show的div，值为value，正常，但第二次开始由于都是用.show来执行赋值，放置位置和平移的，所以所有的.show div都会一起动，所以原先第一行的就会到第二行.....
      */

     /*   
       $(".screen").append("<div class=\"show\"></div>");
       $(".show").text(value);
        place($(".show")); 
      
        move($(".show"));
        */

});

 //监听删除数据
ref.on('child_removed', function() {
	    arr = [];

	    $('.screen').empty();
	  });

//offset函数也挺有用的，可以计算出具体的像素
var offsetTop=$(".screen").offset().top; 
var offsetLeft=$(".screen").offset().left;
var screenWidth=$(".screen").width();
var screenHeight=$(".screen").height();
var minH=offsetTop;
var maxH=screenHeight+offsetTop;
var deltah=50;

//放置位置函数
function place(obj){
	
    obj.css({
     	"margin-top":minH,
     	"margin-left":screenWidth-obj.width(),
     	 "color":getRandomColor()
      });
    minH+=deltah;
    if(minH==offsetTop+7*50)
    	minH=offsetTop;
}
//移动函数


function move(obj){
	var time = 10000+10000*Math.random();
	obj.animate({
		left:"-"+screenWidth+"px"},time

)}

//获取随机颜色函数
function getRandomColor(){ 
 return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
 } 




//实现发出一个字每隔2秒在发出数组中的字
function getandrun()
{   
   if(arr.length!=0){
       var num=Math.floor(Math.random()*arr.length);

       var textObj = $("<div class=\"show\"></div>");
      textObj.text(arr[num]);
	  $(".screen").append(textObj);

      place(textObj); 
      move(textObj);

   }
   setTimeout(getandrun,2000);
}
getandrun();



});