$(document).ready(function() {	
	// variables
	var $isAnimatedFirst = $('.one .is-animated'),
    $isAnimatedSecond = $('.two .is-animated'),
    $isAnimatedSecondSingle = $('.two .is-animated__single'),
	$isAnimatedThird = $('.three .is-animated'),
    $isAnimatedFourth = $('.four .is-animated'),
    $isAnimatedFourthSingle = $('.four .is-animated__single');

	// initialize fullPage
	$('#fullpage').fullpage({
		sectionsColor: ['#FFFFFF', '#FFFFFF', '#000000', '#FFFFFF'],
		anchors: ['Home', 'About', 'Projects', 'Contact'],
		menu: '#menu',
		continuousVertical: true,
		responsiveWidth: 900,
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['Home', 'About', 'Projects', 'Contact'],
	
	    afterLoad: function(){
				$isAnimatedFirst.addClass('animated fadeInUp');
				$isAnimatedFirst.eq(0).css('animation-delay', '.3s');
				$isAnimatedFirst.eq(0).css("animation-duration", '2s');
				$isAnimatedFirst.eq(1).css('animation-delay', '1s');
				$isAnimatedFirst.eq(1).css("animation-duration", '2s');
				$isAnimatedFirst.eq(2).css('animation-delay', '1.7s');
				$isAnimatedFirst.eq(2).css("animation-duration", '2s');
        },
	
	
	onLeave: function(index, nextIndex, direction) {

	
		if(index==1){
			$isAnimatedFirst.className="";
		}
      /**
       * use the following condition: 
       *
       *   if( index == 1 && direction == 'down' ) {
       *
       * if you haven't enabled the dot navigation
       * or you aren't interested in the animations that occur 
       * when you jump (using the dot navigation) 
       * from the first section to another sections 
       */

      // first animation
      if (index == 1 && nextIndex == 2) {
        $isAnimatedSecond.addClass('animated fadeInLeft');
        $isAnimatedSecond.eq(0).css('animation-delay', '.4s');
		$isAnimatedSecond.eq(0).css("animation-duration", '1.2s');
		$isAnimatedSecond.eq(1).css('animation-delay', '.4s');
		$isAnimatedSecond.eq(1).css("animation-duration", '1.2s');
        $isAnimatedSecondSingle.addClass('animated fadeInRight').css('animation-delay', '1s');
		$isAnimatedSecondSingle.css('animation-duration', '1.2s');
      }

      /**
       * use the following condition: 
       *
       *   else if( index == 2 && direction == 'down' ) {
       *
       * if you haven't enabled the dot navigation
       * or you aren't interested in the animations that occur 
       * when you jump (using the dot navigation) from the first section to the third one 
       */

      // second animation
      else if ((index == 1 || index == 2) && nextIndex == 3) {
        $isAnimatedThird.eq(0).addClass('animated fadeIn').css('animation-delay', '.3s');
		$isAnimatedThird.eq(0).css("animation-duration", '0.8s');
        $isAnimatedThird.eq(1).addClass('animated fadeIn').css('animation-delay', '.7s');
		$isAnimatedThird.eq(1).css("animation-duration", '0.8s');
		$isAnimatedThird.eq(2).addClass('animated fadeIn').css('animation-delay', '1s');
		$isAnimatedThird.eq(2).css("animation-duration", '0.8s');
      }

      /**
       * use the following condition:
       *
       *   else if( index == 3 && direction == 'down' ) {
       *
       * if you haven't enabled the dot navigation
       * or you aren't interested in the animations that occur 
       * when you jump (using the dot navigation) 
       * from the first or second section to the fourth one 
       */

      // third animation
      else if ((index == 1 || index == 2 || index == 3) && nextIndex == 4) {
        $isAnimatedFourth.addClass('animated zoomIn').css('animation-delay', '.6s');
        $isAnimatedFourthSingle.addClass('animated lightSpeedIn').css('animation-delay', '1.2s');
        $isAnimatedFourthSingle.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass('lightSpeedIn').addClass('zoomOutDown');
        });
      }
    }
  });
});


(jQuery);