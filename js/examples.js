$(document).ready(function(){
	$("#demosMenu").change(function(){
	  window.location.href = $(this).find("option:selected").attr("id") + '.html';
	});
	window.sr = ScrollReveal();
	sr.reveal('.foo', {
        duration: 2000,
        delay: 50
    });
	sr.reveal('.bar', {
        duration: 2000,
        delay: 50
    });
});