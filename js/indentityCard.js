(function(win){
	win.identityCard={

		currentElement:null,
		nums:[], //显示的数字
		index:0, //当前光标的所在位置
		hasbind:false,//设置参数，当有多个输入框时选定一个其他输入框则不执行键盘事件

		add:function(code){
			//向数组的中部插入项
			this.nums.splice(this.index,0,[code]);
			console.log([code]);
			this.index++;

			this.currentElement.dataset.nums=this.nums.join(',');

			this.show();
		},

		del:function(){

			//数组删除一位

			if(this.index>0)
			{
				this.nums.splice(this.index-1,1);
			
				this.index--;	
			}

//			console.log(this.nums instanceof Object);
			this.currentElement.dataset.nums=this.nums.join(',');

			this.show();
		},
		//显示数组
		show:function(){

			var ele=this.currentElement.getElementsByClassName('pnl_indentity')[0];

			var html="";

			var curs=document.getElementsByClassName("identity-cursor");

			for(var i=0;i<curs.length;i++)
			{
				curs[i].remove();//remove不兼容
			}

			if(this.index==0)
			{
				html+='<span class="identity-cursor">|</span>';
			}

			//根据当前光标位置和数字显示对应内容
			for(var i=0;i<this.nums.length;i++)
			{
				html+="<span class='num'>"+this.nums[i]+"</span>";
				if(i==this.index-1)
				{
					html+='<span class="identity-cursor">|</span>';
				}
			}

			ele.innerHTML=html;

		},

		getdata:function(id){

			//获取input的数据
			
			this.currentElement =document.getElementById(id);

			this.nums=[];

			if(this.currentElement.dataset.nums)
			{
				this.nums=this.currentElement.dataset.nums.split(',');
			}

			this.index=this.currentElement.dataset.index || 0;
//			console.log(this.index);
		},

		bind:function(id){

			var self=this;

			this.getdata(id);

			if(!this.hasbind)
			{
				//绑定键盘点击事件
				var items=document.getElementsByClassName('item-num');

				for(var i=0;i<items.length;i++)
				{
					items[i].addEventListener('click', function(e){
				        if(e.srcElement && e.srcElement.innerText)
				        {
				        	self.add(e.srcElement.innerText);	
				        }
				    }, false);
				}
    
				//绑定删除的方法
				document.getElementsByClassName('item-del')[0].addEventListener('click', function(e){
					self.del();
				});

				this.hasbind=true;
			}

			//绑定输入框点击事件，设置光标位置
			this.currentElement.getElementsByClassName('pnl_indentity')[0].addEventListener('click',function(e){
				
				//根据offsetX与每个数字离左边的距离，来判断到底鼠标点击在哪个数字后面
				console.log("我点击是第:"+self.getNumIndex(e.offsetX)+"个");

				e.preventDefault();

				var id=e.srcElement.parentElement.id || e.srcElement.parentElement.parentElement.id;
				if(id)
				{
					self.getdata(id);
				}
				self.index=self.getNumIndex(e.offsetX);
				self.show();

			});

			self.show();
		},

		getNumIndex:function(offsetX){
			var index=0;
			var ele=this.currentElement.getElementsByClassName('pnl_indentity')[0];

			if(ele.getElementsByClassName("num").length>0){
				var singleNumberWidth=ele.getElementsByClassName("num")[0].offsetWidth-2; //获取单个字符的宽度,减去第一个距有边框距离

				//获取每个num离input框X轴的距离
				for(i=0;i<ele.getElementsByClassName("num").length;i++)
				{
					var cNum=ele.getElementsByClassName("num")[i];
					//debugger;
					if(offsetX>(cNum.offsetLeft+singleNumberWidth)) //singleNumberWidth是单个字符的宽度
					{
						index++;
					}
				}
			}

			return index;
		},

		init:function(id){

			//绑定键盘点击事件
			this.bind(id);
		}
	};




	identityCard.init("indentityCard");
	identityCard.init("indentityCard2");
	identityCard.init("indentityCard3");


})(window);