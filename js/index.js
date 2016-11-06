$(function(){
    var iw=$(document).width();
    var ih=$(document).height();
    $('.bg').width(iw);
    $('.bg').height(ih);
    for(var i=0;i<20;i++){
        for(var j=0;j<20;j++){
            $('<div>').addClass('square').attr('id',i+'_'+j).appendTo('.scence');
        }
    }
    //画蛇
    var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
    var dict={'0-0':true,'0-1':true,'0-2':true};
    for(var i=0;i<snake.length;i++){
        $('#'+snake[i].x+'_'+snake[i].y).addClass('snake');
        $('#'+snake[snake.length-1].x+'_'+snake[snake.length-1].y).addClass('head right');
    }
    //放食物
    var food;
    var dropfood=function(){
        var x,y;
        x=Math.floor(Math.random()*19);
        y=Math.floor(Math.random()*19);
        while(dict[x+'_'+y]){
            x=Math.floor(Math.random()*19);
            y=Math.floor(Math.random()*19);
        }
        $('#'+x+'_'+y).addClass('food');
        return {x:x,y:y};
    }
    food=dropfood();
    //键盘事件来调用这个函数
    var dir=39;
    $(document).on('keydown',function(e){
        if(Math.abs(e.keyCode-dir)==2){
            return;
        }
        if(e.keyCode==39||e.keyCode==38||e.keyCode==37||e.keyCode==40){
            dir=e.keyCode;
        }

    })
    //让蛇移动
    move=function(){
        var oldhead=snake[snake.length-1];
        var newhead;
        if(dir==39){
            newhead={x:oldhead.x,y:oldhead.y+1};
        }
        else if(dir==37){
            newhead={x:oldhead.x,y:oldhead.y-1};
        }
        else if(dir==38){
            newhead={x:oldhead.x-1,y:oldhead.y};
        }else if(dir==40){
            newhead={x:oldhead.x+1,y:oldhead.y};
        }
        if(newhead.x<0||newhead.x>19||newhead.y<0||newhead.y>19||dict[newhead.x+'_'+newhead.y])
        {
            // alert("撞死了");
            $('.show').css('display','block');
            clearInterval(t);
            // return;
        }else{
        if(newhead.x==food.x && newhead.y==food.y){
            $('#'+food.x+'_'+food.y).removeClass('food');
            food=dropfood();
        }else{
            var tail=snake.shift();
            delete dict[tail.x+'_'+tail.y];
            $('#'+tail.x+'_'+tail.y).removeClass('snake');
        }
       $('.snake').filter('.head').removeClass('head');
        snake.push(newhead);
        if(dir==39){
            $('.snake').filter('.top').removeClass('top');
            $('#'+snake[snake.length-1].x+'_'+snake[snake.length-1].y).addClass('head right');
        }else if(dir==37){
            $('.snake').filter('.top').removeClass('top');
            $('#'+snake[snake.length-1].x+'_'+snake[snake.length-1].y).addClass('head left');
        }else if(dir==38){
            $('.snake').addClass('top');
            $('#'+snake[snake.length-1].x+'_'+snake[snake.length-1].y).addClass('head shang');
        }else if(dir==40){
            $('.snake').addClass('top');
            $('#'+snake[snake.length-1].x+'_'+snake[snake.length-1].y).addClass('head xia');
        }
        dict[newhead.x+'_'+newhead.y]=true;
        $('#'+newhead.x+'_'+newhead.y).addClass('snake');
        }
    }
    var t=setInterval(move,200);
    $('.btn').on('click',function(){
        $('.show').css('display','none');
        $('.scence').find('.snake').removeClass('snake');
        snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
        dict={'0-0':true,'0-1':true,'0-2':true};
        for(var i=0;i<snake.length;i++){
            $('#'+snake[i].x+'_'+snake[i].y).addClass('snake');
            $('#'+snake[snake.length-1].x+'_'+snake[snake.length-1].y).addClass('head right');
        }
        $('.scence').find('.food').removeClass('food');
        food=dropfood();
        dir=39;
        // clearInterval(t);
        t=setInterval(move,200);
    })
})