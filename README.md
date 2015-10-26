Simple Bootstrap 3 Confirm Dialog
---------------------------------

Installation
```
meteor add yp2:confirm-modal-bs3
```

Usage
-----

In template - html add this:

```html
<template name="foo">
   	<button data-id="confirmModalId" class="btn bg-red btn-flat btn-block confirm-modal-btn">Show modal</button>
    {{>confirmModal data=modalData}}
    
</template>

```
Value in data-id has to be the same as value set in modalData.id.

In template helpers you have to return modal data:
```javascript
Template.foo.helpers({
	modalData: function () {
    	return {
        	// event, template arguments refers to confirmn modal template 
            id: 'confirmModalId',
            actionBtnLabel: 'Action button label', 	// if not set: "Save"
            cancelBtnLabel: 'Cancel button label', 	// if not set: "Cancel"
            template: Template.foo,					// refernece to parent template
            modalTitle: "Modal title",
            modalBody: 'Modal body',				// safe for html
            modalBodyIsTemplate: false              // boolean if true modalBody will by pass as name to Template.dynamic
            hideOnSuccess: true                     // boolean if true modal will hide after invoking all confirmAction callbacks
            onShow: function (event, template) {	// on show modal callback or array of functions
            	console.log('on show callback');
            },
            onHide: function (event, template) {	// on hide modal callback or array of functions
            	console.log('on hide callback');
            },
            confirmAction: function(event, template) {	//confirm action function or array of functions
                console.log('confirm action');
            },
            cancelAction: function(event, template) {	//cancel action function or array of functions
            	console.log('cancel action');
            }
        }		
    }
})

```

Template may contains multiple confirm dialogs with different ids and different modalData objects.
