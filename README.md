jQuery exLink
===

The jQuery exLink plugin simplifies the task of opening external links and documents in a new tab. This plugin supports configurable options, document type filtration, dialog warnings to notify users that they are leaving the site or opening a document, and customizable messages/visuals. 

This plugin is distributed as is, and does not include any official support. However, if you come across an issue or need any assistance deploying exLink, just let me know! I'd be happy to help.

Also, if you'd like to contribute to the plugin, that's cool too. Just fork and start creating!


Usage
===

exLink is incredibly light weight, and very easy to setup. This plugin will function without anything beyond jQuery.



1). Include the exLink Javascript, and optionally the stylesheet. Don't include the stylesheet if you will not be using the modal warnings (linkWarning: false, fileWarning: false)

```javascript

<script type="text/javascript" src="/exLink/jquery.exLink.js"></script>


```

```html

<link rel="stylesheet" href="/exLink/jquery.exLink.css">

```


2). After the required files have been included in your document, usage is incredibly easy! For the default case, just initiate the exLink plugin. This uses all of the default options. 

```javascript

$.fn.exLink();

```

If you'd like to customize the plugin (which most people do), then you'll need to specify the options you want to change. Here is an initialization with ALL possible options. 

```javascript

$.fn.exLink({
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
});

```

Options
===

######Functionality Options

**protocols** - Specify specific protocols you would like to catch. This is useful if you only want to warn about non-secure links, but don't care about secure links. By default, http and https protocols are enabled. Ex: protocols: ['http', 'https', 'ftp', 'ftps']

**filetypes** - Specify a an array of document formats you want to catch. Similar to protocols, but matching the extension of the document linked. Ex: filetypes: ['doc', 'pdf', 'xlx', 'docx', 'ppt'] NOTE: Do not include the leading dot

**linkWarning** - Display a warning notifying the user that they are navigating to an external link. By default, this is enabled. Ex: linkWarning: true

**fileWarning** - Similar to linkWarning, this notifies the user that they are opening a document and asks for confirmation ot proceed. By default, this is also enabled. Ex: fileWarning: true
 

######Visual Options

**linkWarningBody** - This is a string containing the message you would like to display to users when they click an external link. linkWarning must be set to true for this to work. Al HTML markup is accepted.

**fileWarningBody** - This is a string containing the message you would like to display to users when they click on a document link. fileWarning must be set to true for this to work. All HTML markup is accepted.

**dialogConfirm** - The background color of the 'confirm' button on the warning dialog. This is a hex code set to #006600 by default.

**dialogCancel** - The background color of the 'cancel' button on the warning dialog. This is a hex code set to #CC0000 by default.

**dialogCancelText** - The font color of the 'cancel' button on the warning dialog. This is a hex code set to #fff by default.

**dialogConfirmText** - The font color of the 'confirm' button on the warning dialog. This is a hex code set to #fff by default.

**dialogCancelButton** - The text label of the 'cancel' button on the warning dialog. This is a string set to 'Cancel' by default.

**dialogConfirmButton** - The text label of the 'confirm' button on the warning dialog. This is a string set to 'Continue' by default.

**modalWidth** - The width of the warning box. This is a string. Ex: modalWidth: "500px"

**modalHeight** - The height of the warning box. This is a string. Ex: modalHeight: "200px"

Notes & Hints
===

In order for exLink to determine which links are external and which are internal without parsing the domain for every link on the page, use relative paths for all of your internal links. 

```html

	<a href="/path/to/internal/resource">Internal Link</a>

```

If you are loading content via AJAX or will be adding any content after exLink has been initialized, you'll need to reinitialize the plugin. If you specify the string 're' as your options, then the options will not be affected and all external links/documents will be redetected to account for your new additions. 

```javascript

	$.fn.exLink('re');

```

If you have any trouble with the plugin, shoot me a tweet @YupItsZac and I'd be happy to help! 
