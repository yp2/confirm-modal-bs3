if (Meteor.isClient) {

    Template.confirmModal.helpers({
        getModalId: function () {
            return Template.instance().modalId;
        },
        getActionBtnLabel: function () {
            return Template.instance().actionBtnLabel;
        },
        getCancelBtnLabel: function () {
            return Template.instance().cancelBtnLabel;
        },
        getModalBody: function () {
            return Template.instance().modalBody;
        },
        getModalTitle: function () {
            return Template.instance().modalTitle;
        }
    });

    Template.confirmModal.events({
        'click .confirm-modal-cancel-btn': function (e, t) {
            e.preventDefault();
            //run callbacks
            for (var i = 0; i < t.cancelActionCallbacks.length; i++) {
                t.cancelActionCallbacks[i](e, t);
            }
        },
        'click .confirm-modal-action-btn': function (e, t) {
            e.preventDefault();
            //run callbacks
            for (var i = 0; i < t.confirmActionCallbacks.length; i++) {
                t.confirmActionCallbacks[i](e, t);
            }
        }
    });


    Template.confirmModal.onCreated(function () {
        var self = this;
        self.modalId = self.data.data.id;
        self.actionBtnLabel = self.data.data.actionBtnLabel || "Save";
        self.cancelBtnLabel = self.data.data.cancelBtnLabel || "Close";
        self.parentShowModalVar = 'showConfirmModal' + self.modalId;
        self.htmlModalId = "confirmModal" + self.modalId;
        self.dataTemplate = self.data.data.template;
        self.onShowCallbacks = [];
        self.onHideCallbacks = [];
        self.cancelActionCallbacks = [];
        self.confirmActionCallbacks = [];
        self.modalBody = self.data.data.modalBody || "Body to implement";
        self.modalTitle = self.data.data.modalTitle || "Title to implement";

        // cancelActionCallbacks
        if (typeof self.data.data.cancelAction === "function") {
            self.cancelActionCallbacks.push(self.data.data.cancelAction);
        } else if (self.data.data.cancelAction instanceof Array) {
            self.cancelActionCallbacks = self.data.data.cancelAction;
        }

        // confirmActionCallbacks
        if (typeof self.data.data.confirmAction === "function") {
            self.confirmActionCallbacks.push(self.data.data.confirmAction);
        } else if (self.data.data.confirmAction instanceof Array) {
            self.confirmActionCallbacks = self.data.data.confirmAction;
        }

        // show.bs.modal callbacks
        if (typeof self.data.data.onShow === "function") {
            self.onShowCallbacks.push(self.data.data.onShow);
        } else if (self.data.data.onShow instanceof Array) {
            self.onShowCallbacks = self.data.data.onShow;
        }

        // hide.bs.modal callbacks
        if (typeof self.data.data.onHide === "function") {
            self.onHideCallbacks.push(self.data.data.onHide);
        } else if (self.data.data.onHide instanceof Array) {
            self.onHideCallbacks = self.data.data.onHide;
        }

        self.cancelActionCallbacks.push(
            function (e, t) {
                $('#' + self.htmlModalId).modal('hide')
            }
        );

        self.confirmActionCallbacks.push(
            function (e, t) {
                console.log('confirm hide');
                $("#" + self.htmlModalId).modal('hide')
            }
        );

        self.onHideCallbacks.push(
            function (e, t) {
                t.parentTemplate()[self.parentShowModalVar].set(false);
            }
        );

        // Parent template vars
        self.parentTemplate()[self.parentShowModalVar] = new ReactiveVar(false);

        // ConfirmModal template event map
        var modalEvents = {};
        modalEvents['hide.bs.modal #' + self.htmlModalId] = function (e, t) {
            //run callbacks
            for (var i = 0; i < self.onHideCallbacks.length; i++) {
                self.onHideCallbacks[i](e, t);
            }
        };
        modalEvents['show.bs.modal #' + self.htmlModalId] = function (e, t) {
            //run callbacks
            for (var i = 0; i < self.onShowCallbacks.length; i++) {
                self.onShowCallbacks[i](e, t);
            }
        };

        Template.confirmModal.events(modalEvents);

        // Parent template events
        var parentEvents = {};
        //parentEvents['click .confirm-modal-btn-' + self.modalId] = function(e, t) {
        parentEvents['click .confirm-modal-btn'] = function (e, t) {
            e.preventDefault();
            t['showConfirmModal' + $(e.currentTarget).data().id].set(true)
        };

        self.dataTemplate.events(parentEvents);
    });

    Template.confirmModal.onRendered(function () {
        var self = this;

        self.autorun(function () {
            if (self.view.isRendered) {
                if (self.parentTemplate()[self.parentShowModalVar].get()) {
                    $('#' + self.htmlModalId).modal('show')
                }
            }
        })

    });

    Template.confirmModal.onDestroyed(function () {
        var self = this;
        self.parentTemplate()[self.parentShowModalVar].set(false);
        $(".modal-backdrop").remove();
        $('body').removeClass('modal-open');
    });

}
