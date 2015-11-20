// jQuery.exLink 
// Author: YupItsZac
// Github: https://github.com/YupItsZac/jQuery.exLink
// Web: http://www.yupitszac.com
// Demo: http://www.yupitszac.com/demo/jquery-exlink
// Support: @YupItsZac - Twitter, or fb.me/yupitszac
// Version 2.3.0 November 20, 2015



var exLink = (function() {
 
    var opts = {};    

    initialize = function(options) {

        var defaults = {
            protocols: ['http', 'https'],
            filetypes: ['pdf', 'xls', 'docx', 'doc', 'ppt', 'pptx'],
            hostCompare: false,
            noFollow: false,
            fancyBoxIgnore: true,
            navigateCallback: null,
            navigateState: null,
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
            clickedColor: '',
            newWindow: false,
            widthWindow: "500",
            heightWindow: "400;",
            titleWindow: 'exLink by YupItsZac.com'
        }


       opts = $.extend({}, defaults, options);

       $('body').on('click','.exLink, .docuLink',function(event){
            event.preventDefault();

            if(event.handled != true) {
                catchClick(event);
            }

            event.handled = true;
        });  

        var self = this;

        if(opts.hostCompare) {
            targetByHost();
        } else {
            targetByProtocol();
        }

        $('.exLink').css('color', opts.externalColor);
        $('.docuLink').css('color', opts.documentColor);

    };

    targetByProtocol = function() {

        var self = this;

        jQuery.each(opts.protocols, function(key, value) {
            if(opts.noFollow) {
                if(opts.fancyBoxIgnore) {
                    $('a[href^="'+value+'://"]').not('.docuLink, .iframe').addClass("exLink").attr('rel', 'nofollow');
                } else {
                    $('a[href^="'+value+'://"]').not('.docuLink').addClass("exLink").attr('rel', 'nofollow');
                }
            } else {
                if(opts.fancyBoxIgnore) {
                    $('a[href^="'+value+'://"]').not('.docuLink, .iframe').addClass("exLink");
                } else {
                    $('a[href^="'+value+'://"]').not('.docuLink').addClass("exLink");
                }
            }
        });

        identifyDocuments();
    };

    targetByHost = function() {

        identifyDocuments();


        var self = this;

        var hostname = new RegExp(location.host);

        $('a').each(function() {

            if(hostname.test($(this).attr('href')) === false) {
                if(opts.noFollow) {
                    if(opts.fancyBoxignore) {
                        $(this).not('.docuLink, .iframe').addClass('exLink').attr('rel', 'nofollow');
                    } else {
                        $(this).not('.docuLink').addClass('exLink').attr('rel', 'nofollow');
                    }
                } else {
                    if(opts.fancyBoxIgnore) {
                        $(this).not('.docuLink, .iframe').addClass('exLink');
                    } else {
                        $(this).not('.docuLink').addClass('exLink');
                    }
                }
            }
        });
    };

    identifyDocuments = function() {

        jQuery.each(opts.filetypes, function(key, value) {
            $('a[href$="'+value+'"]').not('.exLink').addClass('docuLink').css('color', opts.documentColor);
        });
    };

    catchClick = function(obj) {

        if($(obj.target).is('.exLink')) {
            if(opts.linkWarning) {

                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }

                showLinkWarning(href);
                if ($.isFunction(opts.navigateCallback)) {
                    opts.navigateCallback(obj, 1, true);
                }
            } else {
                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }

                window.open(href, '_blank');
                if ($.isFunction(opts.navigateCallback)) {
                    opts.navigateCallback(obj, 1, false);
                }
                
            }
        } else {
            if(opts.fileWarning) {

                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }

                showDocWarning(href);
                
                if($.isFunction(opts.navigateCallback)) {
                    opts.navigateCallback(obj, 1, true);
                }

            } else {
                if($(obj.target).is('a')) {
                    var href = obj.target.href;
                } else {
                    var href = $(obj.target).closest('a').attr('href');
                }
                window.open(href, '_blank');

                if($.isFunction(opts.navigateCallback)) {
                    opts.navigateCallback(obj, 2, false);
                }
            }
        }
   
        if(opts.clickedColor) {
            $(obj.target).css('color', opts.clickedColor);
        }

        window.lastObj = obj;
     
    };

    showLinkWarning = function(href) {

        if(opts.modalDisplayBG) {
            $('body').append('<div class="modalBG"></div>');
            $('.modalBG').fadeIn("slow");
        }

        $('body').append('<div class="modal-dialog">'+opts.linkWarningBody+'<br><br><p><center><b>'+href+'</b></center></p><br><br><div class="exLinkButton exLinkCancel" onclick="exLink.closeModal();">'+opts.dialogCancelButton+'</div><div class="exLinkButton exLinkContinue" onclick="exLink.navigate(&quot;'+href+'&quot;);">'+opts.dialogConfirmButton+'</div></div>');
        $('.modal-dialog').fadeIn("slow");

        $('.exLinkCancel').css("background-color",opts.dialogCancel);
        $('.exLinkContinue').css('background-color', opts.dialogConfirm);
        $('.exLinkCancel').css('color', opts.dialogCancelText);
        $('.exLinkContinue').css('color', opts.dialogConfirmText);

        $('.modal-dialog').css('width', opts.modalWidth);
        $('.modal-dialog').css('height', opts.modalHeight);
    };

    showDocWarning = function(href) {
        if(opts.modalDisplayBG) {
            $('body').append('<div class="modalBG"></div>');
            $('.modalBG').fadeIn("slow");
        }

        $('body').append('<div class="modal-dialog">'+opts.fileWarningBody+'<br><br><p><center><b>'+href+'</b></center></p><br><br><div class="exLinkButton exLinkCancel" onclick="exLink.closeModal();">'+opts.dialogCancelButton+'</div><div class="exLinkButton exLinkContinue" onclick="exLink.navigate(&quot;'+href+'&quot;);">'+opts.dialogConfirmButton+'</div></div>');
        $('.modal-dialog').fadeIn("slow");

        $('.exLinkCancel').css("background-color",opts.dialogCancel);
        $('.exLinkContinue').css('background-color', opts.dialogConfirm);
        $('.exLinkCancel').css('color', opts.dialogCancelText);
        $('.exLinkContinue').css('color', opts.dialogConfirmText);

        $('.modal-dialog').css('width', opts.modalWidth);
        $('.modal-dialog').css('height', opts.modalHeight);
    };

    closeModal = function() {

        $('.modalBG').remove();
        $('.modal-dialog').remove();
    };

    navigateLocation = function(href) {

        if(opts.gaTracking) {

            var hname = window.location.hostname;

            if(opts.gaTrackOld) {
                var track = _gaq.push(['_trackEvent', opts.gaTrackLabel, hname, href]);
            } else {
                ga('send', 'event', opts.gaTrackLabel, hname, href);
            }
        }

        if(opts.newWindow) {
            window.open(href, opts.titleWindow, 'height='+opts.heightWindow+', width='+opts.widthWindow);
            if($.isFunction(opts.navigateState)) {
                opts.navigateState(href, 1);
            }
        } else {
            window.open(href, '_blank');
            if($.isFunction(opts.navigateState)) {
                opts.navigateState(href, 2);
            }
        }

        $('.modalBG, .modal-dialog').remove();  
    };      
 
    //Public stuffs
    //These are the functions that are public facing.
    //Anything not mapped here will not be accessible form console or the browser.
    return {
        init: initialize,
        closeModal: closeModal,
        navigate: navigateLocation
    };


})();

