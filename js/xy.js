//进去看看按钮
$(".goBtn").on("touchstart",function(){
	$(this).addClass("goBtnA");
	swiper.slideTo(1,300,false);
});
$(".goBtn").on("touchend",function(){
	$(this).removeClass("goBtnA");
});

//第二页
$(".select-per li").addClass("swiper-slide");
var swiper = new Swiper('.swiper-container', {
//	noSwiping : true,
//	noSwipingClass : 'swiper-slide',
});
var swiper2 = new Swiper('.swiper-container2', {
		
});

//选择人物选项卡
var perNum = 0;
$('.select-heads li').click(function(){
	var index = $(this).index();
//	人物
	swiper2.slideTo(index, 300, false);
	$(".select-per li").css({"visibility" : "hidden"});
	$(".select-per li").eq(index).css({"visibility" : "visible"});
//	头像
	$(".select-heads div").removeClass("headsActive");
	$(".select-heads div").eq(index).addClass("headsActive");
//	文字
	$(".select-heads p").removeClass("active-name");
	$(".select-heads p").eq(index).addClass("active-name");
	perNum = index;
});

//选定人物按钮
$(".selectBtn").on("touchstart",function(){
	$(this).addClass("selectBtnA");
	$(".page3").removeClass("page3Hidden");
	swiper.slideTo(2,300,false);
	page3(perNum);
});
$(".selectBtn").on("touchend",function(){
	$(this).removeClass("selectBtnA");
});

//第三个页面
//添加云
var cloud = ["img/云1.png","img/云2.png","img/云3.png","img/云4.png","img/云5.png","img/云6.png","img/云7.png"];
for (var i = 0; i < cloud.length; i++) {
	$(".cloud").eq(i).css({
		"background-image" : "url("+cloud[i]+")"
	});
}
//物品
var articleArr = ["img/checkcake1.png","img/checkcake2.png","img/checkcake3.png","img/蛋糕1.png","img/蛋糕2.png","img/蛋糕3.png","img/sugar1.png","img/sugar2.png","img/sugar3.png","img/乳酸.png","img/宝箱.png"];
//对应物品的分数
var scoreArr = [100,169,177,222,246,279,300];

//开始游戏
//总分数
var scoreSumArr = 0000;
function page3(perNum){
//	选择的人物
	var personArr = ["img/人物白客.png","img/人物韩雪.png","img/人物明道.png","img/人物刘语熙.png","img/人物徐开骋.png"];
	$(".personImg").attr("src",personArr[perNum]);
//	重置云的位置
	$(".cloudL").css({"left" : "0px"});
	$(".cloudR").css({"right" : "0px"});
//	消失开始背景和提示
	$(".bg_start,.clickHere").animate({"opacity":0.1},2000,function(){
		$(".bg_start,.clickHere").css({"display":"none"});
	});
//	隐藏最后得分提示
	$(".scoreEndBox").removeClass("showScoreBox");
//	重置时间
	for (var i = 0; i < $(".times div").length; i++) {
		$(".times div").eq(i).html(0);
	}
	$(".times div").eq(0).html(3);
//	重置分数
	scoreSumArr = 0000;
	for (var j = 0; j < $(".scoreSum img").length; j++) {
		$(".scoreSum img").eq(j).attr("src",("img/"+0+".png"));
	}
//	左边的向右运动
	var speedL = [2400,2900,3300,2000];
	var directionL = "right";
	(function (){
		var cssL = {
			"left" : "0px"
		};
		if (directionL==="right") {
			directionL = "left";
			cssL.left = "450px";
		} else{
			directionL = "right";
		}
		for (var i = 0; i < $(".cloudL").length; i++) {
			$(".cloudL").eq(i).animate(cssL,speedL[i],"swing",arguments.callee);
		}
	})();
//	右边的向左运动
	var speedR = [3500,3800,2600];
	var directionR = "left";
	(function(){
		var cssR = {
			"right" : "0px"
		};
		if (directionR==="left") {
			directionR = "right";
			cssR.right = "450px";
		} else{
			directionR = "left";
		}
		for (var i = 0; i < $(".cloudR").length; i++) {
			$(".cloudR").eq(i).animate(cssR,speedR[i],"swing",arguments.callee);
		}
	})();

//	控制定时器的变量
	var dieTimeNum = 0;
//	点击红色按钮
	$(".startBtn").on("touchstart",function(){
//		$(this).addClass("startBtnA");
//		停止木棍旋转
		$(".stick").addClass("rotateS_stop");
//		判断时间定时器是否启动,0表示没启动,1表示启动
		if (dieTimeNum == 0) {
//			如果没有启动就启动定时器,并且将定时器判定变量改为1
			dieTime();
			dieTimeNum = 1;
		}
//		判断木棍是否为原始长度
		if ($(".stickBody").height() == 170){
//			setTimeout(function(){
//				$(".stick").addClass("rotateS_stop");
//			},2000);
//			木棍伸长
			$(".stickBody").addClass("stickChange");
//			用定时器时刻获取吸把头和7个云朵的坐标
			var timer = setInterval(function(){
				var stickHeadT = $(".stickHead").offset().top + $(".stickHead").outerHeight();
				var stickHeadL = $(".stickHead").offset().left + $(".stickHead").outerWidth();
				var articleT = [];
				var articleL = [];
				for (var i = 0; i < $(".article").length; i++) {
					articleT.push($(".article").eq(i).offset().top);
					articleL.push($(".article").eq(i).offset().left);
				}
				for (var i = 0; i < $(".article").length; i++) {
//					抓取物品条件
					if (stickHeadT > articleT[i] && stickHeadL > articleL[i] && stickHeadT < articleT[i]+$(".article").eq(i).height() && stickHeadL < articleL[i]+$(".article").eq(i).width() && $(".stickBody").hasClass("stickChange")) {
						var this_i = i;
//						获取得分
						var scoreNumArr = scoreArr[this_i]+"";
						for (var j = 0; j < $(".score img").length; j++) {
							$(".score img").eq(j).attr("src",("img/"+scoreNumArr[j]+".png"));
						}
//						获取分数的位置
						var scoreT = $(".stickHead").offset().top - $(".score").height();
						var scoreL = $(".stickHead").offset().left;
//						获取分数最后运动的位置
						var scoreEndT = $(".scoreSum").offset().top + $(".scoreSum").height()/2 - $(".score").height()/2;
						var scoreEndL = $(".scoreSum").offset().left + $(".scoreSum").width()/2 - $(".score").width()/2;
						$(".score").css({
							"top" : scoreT,
							"left" : scoreL,
							"display" : "block"
						}).animate({
							"top" : scoreEndT,
							"left" : scoreEndL
						},700,"swing",function(){
//							计算总分数
							scoreSumArr = scoreArr[this_i] + parseInt(scoreSumArr);
							scoreSumArr = "" + scoreSumArr;
							while(scoreSumArr.length<4){
								scoreSumArr = "0" + scoreSumArr;
							}
							for (var j = 0; j < $(".scoreSum img").length; j++) {
								$(".scoreSum img").eq(j).attr("src",("img/"+scoreSumArr[j]+".png"));
							}
							$(".scoreSumNum").animate({"width" : 50+"px"},200,"linear").animate({"width" : 40+"px"},200,"linear",function(){
								$(".score").css({"display" : "none"});
							});
						});
//						变化物品的位置
						$(".getArticle img").attr("src",$(".article").eq(i).attr("src"));
						$(".article").eq(i).hide();
//						木棍长度返回
						$(".stickBody").removeClass("stickChange");
//						空的云朵再次出现物品
						setTimeout(function(){
//							var randNum = rand(0,10);
//							if (this_i<6) {
//								var srcNew = articleArr[randNum];
//							} else if(this_i==6) {
//								var srcNew = articleArr[10];
//							}
//							$(".article").eq(this_i).attr("src",srcNew);
							$(".article").eq(this_i).show();
						},3000);
					} else if ($(".stickHead").offset().left<=0 || $(".stickHead").offset().left+$(".stickHead").width()>=$(document).innerWidth() || $(".stickBody").outerHeight()==1000) {
						$(".stickBody").removeClass("stickChange");
//						计算总分数
						scoreSumArr = "" + scoreSumArr;
					}
				}
//				开启旋转动画
				if ($(".stickBody").height()==170) {
					$(".stick").removeClass("rotateS_stop");
					if ($(".getArticle img").attr("src") != "") {
						setTimeout(function(){
							$(".getArticle img").attr("src", "");
						},100);
					}
				}
			},1);
		}
//		$(".startBtn").on("touchend",function(){
//			$(this).removeClass("startBtnA");
//		});
	});
}

//定时器
var dieTimer=null;
function dieTime(){
	var times=3000;
	dieTimer=setInterval(function(){
		times--;
		var timeNum = times+"";
		while(timeNum.length<4){
			timeNum = "0"+timeNum;
		}
		if(times<=0){
			clearInterval(dieTimer);
    		 	$(".cloud").stop(true,false);
    		 	$(".bg_start").css({"display":"block","opacity":0.7});
    		 	$(".stick").removeClass("play");
    		 	while(scoreSumArr.length<4){
				scoreSumArr = "0" + scoreSumArr;
			}
		 	for (var j = 0; j < $(".scoreEnd img").length; j++) {
				$(".scoreEnd img").eq(j).attr("src",("img/"+scoreSumArr[j]+".png"));
			}
    		 	$(".scoreEndBox").addClass("showScoreBox");
		}
//		图片
//		for (var i = 0; i < $(".times img").length; i++) {
//			$(".times img").eq(i).attr("src",("img/time"+timeNum[i]+".png"));
//		}
//		文字
		for (var i = 0; i < $(".times div").length; i++) {
			$(".times div").eq(i).html(timeNum[i]);
		}
	},5);
}

//随机数
function rand(min,max){
	return parseInt(Math.random()*(max-min)+min);
}

//排名li的top
for (var i = 0; i < $(".player li").length; i++) {
	$(".player li").eq(i).css({
		"top" : i*20+"%"
	});
}
//再玩一次
$(".again").on("touchstart",function(){
	$(".page3").removeClass("page3Hidden");
	page3(perNum);
});
//查看排名进入到下一页
$(".showRank").on("touchend",function(){
//	动画小时提示
	$(".share").css({"opacity" : 0.9}).removeClass("shareHidden");
	$(".share").animate({"opacity" : 0.1},2000,function(){
		$(".share").addClass("shareHidden");
	});
//	所有玩家的名字
	var playerNameArr = ["白客","韩雪","刘语熙","明道","徐开骋"];
//	所有玩家头像的路径
	var headImgArr = ["img/头像－白客.png","img/头像－韩雪.png","img/头像－刘语熙.png","img/头像－明道.png","img/头像－徐开骋.png"];
//	获取玩家的编号和总分数
	var playerId = perNum;
	var playerName = playerNameArr[playerId];
	var headImg = headImgArr[playerId];
	var scoreSum = parseInt(scoreSumArr);
	console.log(playerName);
	$.ajax({
		type : "get",
		url : "infoPlayer.php",
		async : true,
		data : {
			playerName : playerName,
			headImg : headImg,
			scoreSum : scoreSum
		},
		dataType : "json",
		success : function(data){
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				$(".rank").eq(i).html(i+1);
				$(".player img").eq(i).attr("src",data[i]["head_img"]);
				$(".playerName").eq(i).html(data[i]["player_name"]);
				$(".scoreSumEnd").eq(i).html(data[i]["score_sum"]);
			}
		}
	});
	swiper.slideTo(3,300,false);
});

//第四页返回游戏
$(".backGame").on("touchstart",function(){
	$(".page3").addClass("page3Hidden");
	swiper.slideTo(1,300,false);
});
//领取奖品
$(".award").on("touchstart",function(){
	swiper.slideTo(4,300,false);
});
//第五页
//查看积分
$(".showCredit").on("touchstart",function(){
	swiper.slideTo(3,300,false);
});
