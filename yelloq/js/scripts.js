$(document).ready(function(){





    //화면에 파리가 몇마리인지 보여주기 위한 변수
    var number_of_fly = 1

    //기존 파리에게 움직이는 애니메이션을 넣어줍니다.
    animateDiv('fly_1');


    $(document).click(function(e){
        //화면을 클릭시에 사운드가 플레이됩니다.
        $("#audio")[0].play();


        //화면을 클릭시에 새로운 파리가 추가됩니다.
        //추가되는 파리들은 다른 아이디를 가집니다. fly_1, fly_2, fly_3...이런식입니다.
        number_of_fly++
        $('body').append("<div class='fly' id='fly_"+number_of_fly+"'><img src='fly-unscreen.gif'></div>")
        var newq = makeNewPosition();
        $('#fly_'+number_of_fly).css({ top: newq[0], left: newq[1] })
        //새로 추가한 파리에도 움직이는 애니메이션을 넣어줍니다.
        animateDiv('fly_'+number_of_fly);




        //화면을 클릭시에 화면에 점이 찍히도록 합니다.
            $('body').append('<div class="marker" style="top:' + e.pageY + 'px; left:' + e.pageX + 'px"></div>');
    })

    })











    

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(id){
        var newq = makeNewPosition();
        var oldq = $('#'+id).offset();
        console.log(newq)
        var speed = calcSpeed([oldq.top, oldq.left], newq);
        
        $('#'+id).animate({ top: newq[0], left: newq[1] }, speed, function(){
          animateDiv(id);        
        });
};

function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.3;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}


   

