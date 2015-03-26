
(function( $ ) {


    $.fn.exLink = function(options) {

    	var defaults = {
    		protocols: ['http', 'https'],
    		filetypes: ['pdf', 'xls', 'docx', 'doc', 'ppt', 'pptx'],
    		linkWarning: true,
    		linkWarningBody: 'You are about to leave this website and navigate to the link below. Would you like to continue?',
    		fileWarning: true,
    		fileWarningBody: 'You are about to open the file below. Do you wish to continue?',
    		dialogConfirm: '#006600',
    		dialogCancel: '#CC0000',
    		dialogConfirmText: '#fff',
    		dialogCancelText: '#fff',
    		dialogCancelButton: 'Cancel',
    		dialogConfirmButton: 'Continue',
    		modalWidth: "320px",
			modalHeight: "240px"
    		
    	}


        if(options != 're') {
    	   jQuery.options = $.extend({}, defaults, options);
        }	

    	var self = this;

    	targetLinks();

    	$( ".exLink, .docuLink" ).click(function( event ) {
			event.preventDefault();

			catchClick(event);
		});
 
    },

    targetLinks = function() {

    	var self = this;

    	jQuery.each(jQuery.options.protocols, function(key, value) {
			$('a[href^="'+value+'://"]').attr('class',"exLink");
    	});

    	jQuery.each(jQuery.options.filetypes, function(key, value) {
    		$('a[href$="'+value+'"]').attr('class', 'docuLink');
    	});
    },

    catchClick = function(obj) {
		
		if($(obj.target).is('.exLink')) {
			if(jQuery.options.linkWarning) {
				showLinkWarning(obj.target.href);
			} else {
				window.open(obj.target.href, '_blank');
			}
		} else {
			if(jQuery.options.fileWarning) {
				showDocWarning(obj.target.href);
			} else {
				window.open(obj.target.href, '_blank');
			}
		}
	},

	showLinkWarning = function(href) {
    	$('body').append('<div class="modalBG"></div>');
		$('.modalBG').fadeIn("slow");
		$('body').append('<div class="modal-dialog">'+jQuery.options.linkWarningBody+'<br><br><p><center><b>'+href+'</b></center></p><br><br><div class="exLinkButton exLinkCancel" onclick="$.fn.exLink.closeModal();">'+jQuery.options.dialogCancelButton+'</div><div class="exLinkButton exLinkContinue" onclick="$.fn.exLink.navigateLocation(&quot;'+href+'&quot;);">'+jQuery.options.dialogConfirmButton+'</div></div>');
		$('.modal-dialog').fadeIn("slow");

		$('.exLinkCancel').css("background-color",jQuery.options.dialogCancel);
		$('.exLinkContinue').css('background-color', jQuery.options.dialogConfirm);
		$('.exLinkCancel').css('color', jQuery.options.dialogCancelText);
		$('.exLinkContinue').css('color', jQuery.options.dialogConfirmText);

		$('.modal-dialog').css('width', jQuery.options.modalWidth);
		$('.modal-dialog').css('height', jQuery.options.modalHeight);
    },

    showDocWarning = function(href) {
    	$('body').append('<div class="modalBG"></div>');
		$('.modalBG').fadeIn("slow");
		$('body').append('<div class="modal-dialog">'+jQuery.options.fileWarningBody+'<br><br><p><center><b>'+href+'</b></center></p><br><br><div class="exLinkButton exLinkCancel" onclick="$.fn.exLink.closeModal();">'+jQuery.options.dialogCancelButton+'</div><div class="exLinkButton exLinkContinue" onclick="$.fn.exLink.navigateLocation(&quot;'+href+'&quot;);">'+jQuery.options.dialogConfirmButton+'</div></div>');
		$('.modal-dialog').fadeIn("slow");

		$('.exLinkCancel').css("background-color",jQuery.options.dialogCancel);
		$('.exLinkContinue').css('background-color', jQuery.options.dialogConfirm);
		$('.exLinkCancel').css('color', jQuery.options.dialogCancelText);
		$('.exLinkContinue').css('color', jQuery.options.dialogConfirmText);

		$('.modal-dialog').css('width', jQuery.options.modalWidth);
		$('.modal-dialog').css('height', jQuery.options.modalHeight);
    };

    $.fn.exLink.closeModal = function() {

    	$('.modalBG').remove();
    	$('.modal-dialog').remove();
    };

    $.fn.exLink.navigateLocation = function(href) {

    	window.open(href, '_blank');

		$('.modalBG').remove();
    	$('.modal-dialog').remove();  
    };  	
 
})( jQuery );