//固定导航栏
function scro(){
	function bind(obj,evetname,fn){
		if(obj.addEventListener){
			obj.addEventListener(evetname,fn,false);
		}else{
			obj.attachEvent('on'+evetname,function(){
				fn.call(obj);
			})
		}
	};
	bind(window,'scroll',function(){
		var top =  document.documentElement.scrollTop || document.body.scrollTop;
	    var num = -80;
	    var oTop = document.getElementById('Topnva');
	    if (top > 300) {//500就是滚动条滚动到的位置，大于500才显示
	        oTop.style.top = 0+'px';
	        oTop.style.transition = 0.5+'s';
	    } else {
	        oTop.style.top = num+'px';
	        oTop.style.transition = 0.5+'s';
	    }
	})
};
scro();

//banner图居中
function banner(){
	var oW = 0;
	var oPic = document.getElementById("pic");
	var oUl = oPic.getElementsByTagName('ul')[0];
	var aLis= oUl.children;
	
	oUl.style.width = aLis[0].offsetWidth*aLis.length + 'px';
	oW= document.documentElement.clientWidth || document.body.clientWidth;
	oPic.style.left = -(oPic.offsetWidth - oW)/2 +'px';
	window.onresize=function(){
		oW= document.documentElement.clientWidth || document.body.clientWidth;
		oPic.style.left = -(oPic.offsetWidth - oW)/2 +'px';
	};
};
 banner()

//购物车
function buy(){
		var oShop = document.getElementById("shopping");
		var oChandise = document.getElementById("chandise");
//stopPropagation()方法终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
		function show(evt,e){
			var evt = evt || event
			evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;
			var e = document.getElementById(e); 
			e.style.display = "block"; 
			} 
			function hide(e){ 
			var e = document.getElementById(e); 
			e.style.display = "none";
			
			}
			document.onclick=function(){
				hide('chandise')
			};
			oChandise.onclick = oShop.onclick = function(evt){
				var evt = evt || event
				show(evt,'chandise')
			};
};
buy()

 //banner图轮播
function round(){	
		var oBanner = document.getElementById('banner');
		var oPic = document.getElementById('pic');
		var oUl = oPic.getElementsByTagName('ul')[0];
		var aLis= oUl.children;
		var oOl = document.getElementsByTagName('ol')[0];
		var aBtn = oOl.children;
		var oBtnL = document.getElementById("btnL");
		var oBtnR = document.getElementById("btnR");
		var oBtnLeft = document.getElementById("btn_left");
		var oBtnRight = document.getElementById("btn_right");
				
		var timer = null;

		var i=0;
		aLis[i].style.display='block';
		
		function play(){
			var e=i;			
			i<aLis.length-1?i++:i=0;
			aLis[e].style.display = 'none';
			aBtn[e].className = '';
			aLis[i].style.display = 'block';
			aBtn[i].className = 'active';
			
		}	
		
		oBanner.onmouseover=function(){
			clearInterval(timer);
			oBtnL.style.opacity = 1;
			oBtnR.style.opacity = 1;	
			oBtnL.style.filter = "alpha(opacity=100)";
			oBtnR.style.filter = "alpha(opacity=100)";
		}
		oBanner.onmouseout=function(){
			timer=setInterval(play,2000);
			oBtnL.style.opacity = 0;
			oBtnR.style.opacity = 0;
			oBtnL.style.filter = "alpha(opacity=0)";
			oBtnR.style.filter = "alpha(opacity=0)";
		}
		for (var f=0;f<aBtn.length;f++) {
				aBtn[f].index = f;
				aBtn[f].onclick =function(){
					i = this.index;
					for (var f=0;f<aBtn.length;f++){
						aBtn[f].className = '';
						aLis[f].style.display = 'none';
					}
					aBtn[this.index].className = 'active';
					aLis[this.index].style.display = 'block';
				};
			}
		//点击
			oBtnLeft.onmouseover=oBtnRight.onmouseover=function(){
				this.style.backgroundPositionY=-72+'px';
			};
			oBtnLeft.onmouseout=oBtnRight.onmouseout=function(){
				this.style.backgroundPositionY=0+'px';
			};
			oBtnRight.onclick=play;
		
			oBtnLeft.onclick=function(){
				var e=i
				i>0?i--:i=aLis.length-1
	            aLis[e].style.display = 'none';
				aLis[i].style.display = 'block';
				aBtn[e].className="";
				aBtn[i].className="active";
			}

};
round()
//商品点击
function shop(){
	var oAll = document.getElementById("All");
	var oEntire = document.getElementById("entire");
	var oGood = document.getElementById("goods");
	var aLis = oGood.getElementsByTagName('li');
	var oCont = document.getElementById("cont");
	//var off =true			
		/*oAll.onclick = function(){
			if(off){
				oEntire.style.display = 'block';
				off=false;
			}else{
				oEntire.style.display = 'none';
				off=true;
			}
		}*/
		oAll.onclick = function(){
			oEntire.style.display = 'block';
		}
		oEntire.onmouseover = function(){
			oEntire.style.display = 'block';
		}
		oEntire.onmouseout = function(){
			oEntire.style.display = 'none';
		}
}
shop();

//导航栏的选项卡

//获取属性
function control(){
	function Tab(json){
		this.json = json;
		this.oMenu = document.getElementById(this.json['id']);
		this.oUl = this.oMenu.getElementsByTagName('ul')[0];
		this.aLis = this.oUl.getElementsByTagName('a');
	}
	//初始化执行函数
	Tab.prototype.init=function(){
		var This = this;
		
		for(var i=0; i<this.aLis.length;i++){
			this.aLis[i].index=i;
			this.aLis[i][This.json.ev]=function(){
				var LiThis=this;
				This.change(LiThis);		//调用对象下的change方法
			}
			
		}
	};
	//点击方法
	Tab.prototype.change=function(LiThis){
		for(var i=0; i<this.aLis.length;i++){
			this.aLis[i].className='';
			//this.aCont[i].style.display='none';
		}
		LiThis.className='orange';
		//this.aCont[LiThis.index].style.display='block';		
		//this.iNum=LiThis.index;
	};
	var t1=new Tab({
		id:'menu',
		ev:'onclick'
	});
	t1.init();
	
}
control();

//内容选项卡
function nva(){
	var aLis = document.getElementById('ent').getElementsByTagName("li");
	var aUl = document.getElementById('demo').getElementsByTagName("ul");				
	var e = 0;
	aUl[e].style.display="block";
	aLis[e].className="list";
		for(var i=0;i<aLis.length;i++){
			aLis[i].index = i;
			aLis[i].onclick = function(){
				for(var i=0;i<aLis.length;i++) {
					aLis[i].className = "";
					aUl[i].style.display = "none";
				}
				this.className = "list";
				aUl[this.index].style.display = "block";
			}
		}
}
nva();

//无缝滚动
function rolling(){
	var oWrap =document.getElementById("wrap");
	var oUl = oWrap.getElementsByTagName('ul')[0];
	var aLis = oUl.getElementsByTagName('li');
	var timer=null;
	var Num=3;
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLis[0].offsetWidth*aLis.length+'px';
	
	function autoPlay(){
		timer=setInterval(function(){
			if(oUl.offsetLeft==-(oUl.offsetWidth/2)){
				oUl.style.left=0;
			}else if(oUl.offsetLeft>0){
				oUl.style.left=-(oUl.offsetWidth/2)+'px';
			}
			oUl.style.left=oUl.offsetLeft+Num+'px';
		},30)
	};
	autoPlay();
	oWrap.onmouseover=function(){
		clearInterval(timer);
	};
	oWrap.onmouseout=function(){
		autoPlay();
	}
}
rolling();
//返回顶部
function back(){
	var oBackT = document.getElementById("backT");
	var oTop = 0;
	var timer=null;
	var off=true;
	window.onscroll=function(){
		oTop = document.documentElement.scrollTop || document.body.scrollTop;
		
		if(oTop>300){
			oBackT.style.display='block'
		}else{
			oBackT.style.display='none'
		};		
		if(!off){
			clearInterval(timer)
		}
		off=false;		
	};	
	oBackT.onclick=function(){
		timer=setInterval(function(){
			var backTop = Math.floor(oTop/6);
			if(backTop == 0){
				clearInterval(timer)
			}else{
				if(document.documentElement.scrollTop){
					document.documentElement.scrollTop-=backTop
				}else{
					document.body.scrollTop-=backTop;
				}						 
				off=true;
			}
		},30)		
	}
};
back();
	