function getEle(ele) {
    return document.querySelector(ele)
}
var main=getEle("#main");

~function () {
    var music = document.getElementById("music"), audioFir = document.getElementById("audioFir");

    //->给页面的加载缓冲500MS时间
    window.setTimeout(function () {
        audioFir.play();

        //->当音频文件可以播放(出声了)的时候:canplay/canplaythrough
        audioFir.addEventListener("canplay", function () {
            music.style.display = "block";
            music.className = "music musicMove";
        }, false);
    }, 500);

    //->移动端使用CLICK存在300MS的延迟
    music.addEventListener("click", function () {
        //->当前是暂停的
        if (audioFir.paused) {
            audioFir.play();
            music.className = "music musicMove";
            return;
        }
        //->当前是播放的
        audioFir.pause();
        music.className = "music";
    }, false);
}();

$(document).on("touchmove", function (e) {
    e.preventDefault();
});
$(function () {
    //设定宽高
    var viewHeight = $(window).height();
    var $li = $("#list").find(">li");
    $("#main").css("height", viewHeight);
    //绑定滑动事件
    slidePage();
    function slidePage() {
        var nowIndex = 0, nextIndex = 0, step = 1 / 4, startY = null, isOk = true;
        $li.on("touchstart", function (e) {
            if (isOk === false)return;
            isOk = false;
            var tar = e.originalEvent.changedTouches[0];
            startY = tar.pageY;
            nowIndex = $(this).index();
            $li.on('touchmove.move', function (e) {
                var tar = e.originalEvent.changedTouches[0];
                $(this).siblings("li").hide();
                if (tar.pageY < startY) {
                    nextIndex = nowIndex == $li.length - 1 ? 0 : nowIndex + 1;
                    $li.eq(nextIndex).css("transform", "translate(0," + (viewHeight + tar.pageY - startY) + "px)")
                } else if (tar.pageY > startY) {
                    nextIndex = nowIndex == 0 ? $li.length - 1 : nowIndex - 1;
                    $li.eq(nextIndex).css("transform", "translate(0," + (-viewHeight + tar.pageY - startY) + "px)")
                } else {
                    isOk = true
                }
                $(this).css("transform", "translate(0," + (tar.pageY - startY) * step + "px) scale(" + (1 - Math.abs(tar.pageY - startY) / viewHeight * step) + ")");
                $li.eq(nextIndex).addClass("zIndex").show()
            });
            $li.on("touchend.move", function (e) {
                var touch = e.originalEvent.changedTouches[0];
                console.log(touch)
                if (touch.pageY < startY) {
                    $(this).css('transform', 'translate(0,' + (-viewHeight * step) + 'px) scale(' + (1 - step) + ')')
                } else if (touch.pageY > startY) {
                    $(this).css('transform', 'translate(0,' + (viewHeight * step) + 'px) scale(' + (1 - step) + ')')
                } else {
                    isOk = true
                }
                $li.eq(nextIndex).css('transform', 'translate(0,0)');
                $li.eq(nextIndex).css('transition', '.3s');
                $li.eq(nowIndex).css('transition', '.3s');
                $li.off('.move');
            })
        });
        $li.on('transitionend webkitTransitionend', function (e) {
            if (!$li.is(e.target))return;
            reseFn();
        });
        function reseFn() {
            $li.css('transform', '');
            $li.css('transition', '');
            $li.eq(nextIndex).removeClass('zIndex').siblings('li').hide();

            isOk = true;
        }
        //function end(e){
        //    $(this).eq(nextIndex).css("webkitTransition","");
        //    $(this).eq(nextIndex).firstElementChild.id="a"+this.index;
        //
        //}
    }
});
















