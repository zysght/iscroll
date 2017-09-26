var boxH = $('.refresh').height();
var iRefreshText = $('.refresh'); // 刷新
var iUpload = $('.upload'); // 加载
var myScroll = null;
var initScroll = null; // 显示释放刷新
function loaded(){ // 安全调用
	setTimeout(function(){
		myScroll = new iScroll('wrapper',{
			hScroll:false,
			topOffset:boxH, // topOffset 基准值
			// faseScrollbar:false,
			// hideScrollbar:false
			onScrollMove:function(){ // 滚动移动
				if(this.y > 0 && !iRefreshText.hasClass('fill')){ // 刷新
					iRefreshText.find('span').text('释放刷新');
					iRefreshText.addClass('fill')
					this.minScrollY = 0;
				}else if(this.y < 0 && iRefreshText.hasClass('fill')){ // 不刷新
					iRefreshText.find('span').text('下拉刷新')
					iRefreshText.removeClass('fill')
					this.minScrollY = -boxH;
				}else if(Math.abs(this.y) > Math.abs(initScroll) && !iUpload.hasClass('filp')){ // 加载
					iUpload.find('span').text('释放加载')
					iUpload.addClass('filp');
					this.maxScrollY = initScroll;
				}else if(Math.abs(this.y) < Math.abs(initScroll) && iUpload.hasClass('filp')){ // 不加载
					iUpload.find('span').text('加载更多')
					iUpload.removeClass('filp');
					this.maxScrollY = initScroll + boxH;
				}
			},
			onRefresh:function(){ // 刷新
				initScroll = this.maxScrollY;
				if(iRefreshText.hasClass('refreshing')){
					iRefreshText.find('span').text('下拉刷新');
					iRefreshText[0].className = 'refresh';
				}else if(iUpload.hasClass('refreshing')){
					iUpload.find('span').text('上拉加载');
					iUpload[0].className = 'upload';
					this.scrollTo(0,initScroll + boxH);
				}
			},
			onScrollEnd:function(){ // 刷新回调函数
				if(iRefreshText.hasClass('fill')){
					iRefreshText.find('span').text('正在刷新');
					iRefreshText[0].className = 'refresh refreshing'
					iRefreshFn();
				}else if(iUpload.hasClass('filp')){
					iUpload.find('span').text('正在加载');
					iUpload[0].className = 'upload refreshing';
					iUploadFn();
				}
			}
		});		
	}, 100)
}
window.addEventListener('load',loaded,false);
function iRefreshFn (){
	setTimeout(function(){
		myScroll.refresh(); //激活刷新回调
	}, 3000)
}
function iUploadFn (){
	setTimeout(function(){
		for(var i=0;i<3;i++){
			$('<li>新内容<li>').appendTo('.list');
		}
		myScroll.refresh();//激活刷新回调
	}, 3000)
}
