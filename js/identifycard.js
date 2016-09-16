window.onload = function(){
	var identity = new Identity();
	identity.init("indentityCard");
}


var Identity = function(){
	this.nums = [];
	this.index = 0;
	this.cur_ele = null;
	this.Isbind = false;	
}

Identity.prototype = {
	//初始化
	init:function(id){
		this.bind(id);
	},
	//绑定事件
	bind:function(id){
		
		var that = this;
		
		this.getdata(id);
		
//		var keyboard_event = function(i){
//			return key(值)
//		}
		
		if(this.Isbind != true)
		{
			var items = document.getElementsByClassName("item-num");
			//键盘点击事件
			for(var i = 0;i < items.length;i++){
//				(function (i) {
//					items[i].addEventListener("click",function(e){
//						if(e.srcElement &&e.srcElement.innerText){
//							that.add(e.srcElement.innerText);
//							console.log(e.srcElement.innerText);
//						}
//					},false);
//				})(i);
				items[i].addEventListener('click', (function () {
			        return function (e){
			            e.preventDefault();
			            if(e.srcElement &&e.srcElement.innerText){
							that.add(e.srcElement.innerText);
							console.log(e.srcElement.innerText);   
						}
			        }               
			    })(i), 'false');
			}
			//优化版,返回值可用。
//			for(var i = 0;i < items.length;i++){
//				items[i].addEventListener("click",keyboard_event(i),false);
//			}
			
			var del = document.getElementsByClassName('item-del');
			
			//删除事件
			del[0].addEventListener("click",function(){
				that.del();
			},false);
			
			this.Isbind = false;
		}
		//绑定输入框点击事件
		this.cur_ele.getElementsByClassName('pnl_indentity')[0].addEventListener("tap,click",function(e){
			e.preventDefault();
			var id = e.srcElement.parentElement.id || e.srcElement.parentElement.parentElement.id;
			if(id){
				that.getdata();
			}
			that.index=that.getNumIndex(e.offsetX);
			that.show();
		});
		
		this.show();
	},
	//获取数据
	getdata:function(id){
		
		this.cur_ele = document.getElementById(id);
		
		if(this.cur_ele.dataset.nums){
			this.nums = this.cur_ele.dataset.nums.split(",");
		}
		
		this.index = this.cur_ele.dataset.index || 0;
	},
	//添加数据
	add:function(ele){
		//splice插入功能
		this.nums.splice(this.index,0,[ele]);
		this.index++;
		this.cur_ele.dataset.nums = this.nums.join(",");
		
		this.show();
	},
	//删除数据
	del:function(){
		if(this.index > 0){
			this.nums.splice(this.index-1,1);
			this.index--;
		}	
		this.cur_ele.dataset.nums=this.nums.join(',');
		
		this.show();
	},
	//显示数据
	show:function(){
		
		var html = "",
		    ele = this.cur_ele.getElementsByClassName("pnl_indentity")[0],
			cursor = document.getElementsByClassName("identity-cursor");
			
		for(var i = 0;i<cursor.length;i++){
			cursor[i].style.display="none";
		}
		
		if(this.index==0)
		{
			html += '<span class="identity-cursor">|</span>';
		}
		
		for(var i = 0;i < this.nums.length;i++){
			html += "<span class='num'>"+this.nums[i]+"</span>";
			if(i==this.index-1)
			{
				html+='<span class="identity-cursor">|</span>';
			}
		}
		ele.innerHTML = html;
	},
	Pop:function(){
		if(this.cur_ele.dataset.index != 0){
			
		}
	},
	getNumIndex:function(_offsetX){
		var index = 0,
			ele = this.cur_ele.getElementsByClassName("pnl_indentity")[0];
		if(ele.getElementsByClassName("num")){
			var singleNumberWidth=ele.getElementsByClassName("num")[0].offsetWidth-2;
			for(var i = 0;i<ele.getElementsByClassName("num").length;i++){
				cNum = ele.getElementsByClassName("num")[i];
				if(_offsetX>(cNum.offsetLeft+singleNumberWidth)) //singleNumberWidth是单个字符的宽度
					{
						index++;
					}
			}
		}
		return index;
	}
}
