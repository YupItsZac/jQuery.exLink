// jQuery.exLink 
// Author: YupItsZac
// Github: https://github.com/YupItsZac/jQuery.exLink
// Web: http://www.yupitszac.com
// Demo: http://www.yupitszac.com/demo/jquery-exlink
// Support: @YupItsZac - Twitter, or fb.me/yupitszac
// Version 2.0.2 April 27, 2015



(function( $ ) {


    $.fn.exLink = function(options) {

        var defaults = {
            protocols: ['http', 'https'],
            filetypes: ['pdf', 'xls', 'docx', 'doc', 'ppt', 'pptx'],
            hostCompare: false,
            noFollow: false,
            fancyBoxIgnore: true,
            linkCallback: null,
            fileCallback: null,
            gaTracking: false,
            gaTrackLabel: 'External Links',
            gaTrackOld: false,
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
            modalDisplayBG: true,
            modalWidth: "320px",
            modalHeight: "240px",
            externalColor: '',
            documentColor: '',
            clickedColor: ''
        }


        if(options != 're') {
           jQuery.options = $.extend({}, defaults, options);

           $('body').on('click','.exLink, .docuLink',function(event){
                event.preventDefault();

                if(event.handled != true) {
                    catchClick(event);
                }

                event.handled = true;
            });
        }   

        var self = this;

        if(jQuery.options.hostCompare) {
            targetByHost();
        } else {
            targetByProtocol();
        }

        $('.exLink').css('color', jQuery.options.externalColor);
        $('.docuLink').css('color', jQuery.options.documentColor);
 
    },

    targetByProtocol = function() {

        var self = this;

        jQuery.each(jQuery.options.protocols, function(key, value) {
            if(jQuery.options.noFollow) {
                if(jQuery.options.fancyBoxIgnore) {
                    $('a[href^="'+value+'://"]').not('.docuLink, .iframe').addClass("exLink").attr('rel', 'nofollow');
                } else {
                    $('a[href^="'+value+'://"]').not('.docuLink').addClass("exLink").attr('rel', 'nofollow');
                }
            } else {
                if(jQuery.options.fancyBoxIgnore) {
                    $('a[href^="'+value+'://"]').not('.docuLink, .iframe').addClass("exLink");
                } else {
                    $('a[href^="'+value+'://"]').not('.docuLink').addClass("exLink");
                }
            }
        });

        identifyDocuments();
    },

    targetByHost = function() {

        identifyDocuments();


        var self = this;

        var hostname = new RegExp(location.host);

        $('a').each(function() {

            if(hostname.test($(this).attr('href')) === false) {
                if(jQuery.options.noFollow) {
                    if(jQuery.options.fancyBoxignore) {
                        $(this).not('.docuLink, .iframe').addClass('exLink').attr('rel', 'nofollow');
                    } else {
                        $(this).not('.docuLink').addClass('exLink').attr('rel', 'nofollow');
                    }
                } else {
                    if(jQuery.options.fancyBoxIgnore) {
                        $(this).not('.docuLink, .iframe').addClass('exLink');
                    } else {
                        $(this).not('.docuLink').addClass('exLink');
                    }
                }
            }
        });
    },

    identifyDocuments = function() {

        jQuery.each(jQuery.options.filetypes, function(key, value) {
            $('a[href$="'+value+'"]').not('.exLink').addClass('docuLink').css('color', jQuery.options.documentColor);
        });
    },

    catchClick = function(obj) {

        if($(obj.target).is('.exLink')) {
            if(jQuery.options.linkWarning) {

                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }

                showLinkWarning(href);
                if ($.isFunction(jQuery.options.linkCallback)) {
                    jQuery.options.linkCallback(obj, true);
                }
            } else {
                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }

                window.open(href, '_blank');
                if ($.isFunction(jQuery.options.linkCallback)) {
                    jQuery.options.linkCallback(obj, false);
                }
                
            }
        } else {
            if(jQuery.options.fileWarning) {

                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }

                showDocWarning(href);
                
                if($.isFunction(jQuery.options.fileCallback)) {
                    jQuery.options.fileCallback(obj, true);
                }

            } else {
                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }
                window.open(href, '_blank');

                if($.isFunction(jQuery.options.fileCallback)) {
                    jQuery.options.fileCallback(obj, false);
                }
            }
        }
   
        if(jQuery.options.clickedColor) {
            $(obj.target).css('color', jQuery.options.clickedColor);
        }

        window.lastObj = obj;
     
    },

    showLinkWarning = function(href) {

        if(jQuery.options.modalDisplayBG) {
            $('body').append('<div class="modalBG"></div>');
            $('.modalBG').fadeIn("slow");
        }

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
        if(jQuery.options.modalDisplayBG) {
            $('body').append('<div class="modalBG"></div>');
            $('.modalBG').fadeIn("slow");
        }

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

        if(jQuery.options.gaTracking) {

            var hname = window.location.hostname;

            if(jQuery.options.gaTrackOld) {
                var track = _gaq.push(['_trackEvent', jQuery.options.gaTrackLabel, hname, href]);
            } else {
                ga('send', 'event', jQuery.options.gaTrackLabel, hname, href);
            }
        }

        window.open(href, '_blank');

        $('.modalBG').remove();
        $('.modal-dialog').remove();  
    };      
 
})( jQuery );