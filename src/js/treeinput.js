//add it to input attrs
//'class' => 'form-control treeinputelement',
//'data-type' => 'SP',
//'data-url' => '/prozorrosale2/auctions/get-sp-clasificators',

class TreeInput {
    constructor(el) {
        this.el = $(el);
        this.type = this.el.data('type');
        this.url = this.el.data('url');
        this.itemview = `
            <div class="treeinput_item">
                <div class="treeinput_item_name">
                    <div class="treeinput_item_name_icon"><i class="fa fa-square-o" aria-hidden="true"></i></div>
                    <div class="treeinput_item_name_content {{class}}" data-key="{{key}}">{{value}}</div>
                </div>
                <div class="treeinput_item_childs">
                </div>
            </div>
        `;
        this.init();
    }
    init() {
        let self = this;
        let isnew = false;
        $('body').append(`
            <div id="tree_` + self.type + `" class="treeinput">
                <div class="treeinput_search">
                    <input type="text" placeholder="Пошук по коду або опису...">
                </div>
                <div class="treeinput_res"></div>
            </div>
            <div id="treewrap_` + self.type + `" class="treeinput_wrap"><div>
        `);
        self.modal = $('#tree_' + self.type);
        self.wrap = $('#treewrap_' + self.type);
        self.tree_el = $('#tree_' + self.type).find('.treeinput_res');
        $('#tree_' + self.type).find('input').bind('keyup', function() {
            self.doSearch($(this));
        });
        self.wrap.bind('click', function() {
            self.modal.fadeOut();
            self.wrap.fadeOut();
        });
        self.el.bind('focus', function() {
            self.modal.fadeIn();
            self.wrap.fadeIn();
        });
        self.el.bind('keydown', function() {
            return false;
        });
        self.Tree = new Hata(
            self.tree_el,
            self.itemview, {},
            function() {
                self.addChildrens(this.el, this.data);
                this.el.children().each(function(index) {
                    let one = $(this);
                    one.find('.treeinput_item_name_icon').bind('click', function() {
                        if (!$(this).find('i').hasClass('fa-square-o')) {
                            $(this).find('i').toggleClass('fa-plus-square-o');
                            $(this).find('i').toggleClass('fa-minus-square-o');
                        }
                        one.find('.treeinput_item_childs').first().toggle();
                    });
                });
                this.el.find('.treeinput_item_name_content').each(function(index) {
                    let name = $(this);
                    if (!name.hasClass('disabled')) {
                        name.bind('click', function() {
                            self.el.val(name.html());
                            self.modal.hide();
                            self.wrap.hide();
                        });
                    }
                });
            },
            self.url
        ).render();
    }
    addChildrens(el, data) {
        let self = this;
        el.children().each(function(index) {
            if (data[index].childrens != undefined) {
                let d = [];
                if (data[index].childrens.length != undefined) {
                    d = data[index].childrens;
                } else {
                    let td = data[index].childrens;
                    for (var i in td) {
                        d.push(td[i]);
                    }
                }
                $(this).find('.treeinput_item_name_icon').html('<i class="fa fa-plus-square-o" aria-hidden="true"></i>');
                new Hata(
                    $(this).find('.treeinput_item_childs'),
                    self.itemview,
                    d,
                    function() {
                        self.addChildrens(this.el, this.data);
                        this.el.children().each(function(index) {
                            let one = $(this);
                            one.find('.treeinput_item_name_icon').bind('click', function() {
                                if (!$(this).find('i').hasClass('fa-square-o')) {
                                    $(this).find('i').toggleClass('fa-plus-square-o');
                                    $(this).find('i').toggleClass('fa-minus-square-o');
                                }
                                one.find('.treeinput_item_childs').first().toggle();
                            });
                        });
                        this.el.find('.treeinput_item_name_content').each(function(index) {
                            let name = $(this);
                            if (!name.hasClass('disabled')) {
                                name.bind('click', function() {
                                    self.el.val(name.html());
                                    self.modal.hide();
                                    self.wrap.hide();
                                });
                            }
                        });
                    }
                ).render();
            }
        });
    }
    doSearch(el) {
        let self = this;
        let filter = el.val().toUpperCase();

        if (filter.length > 0) {
            self.tree_el.find('.treeinput_item_childs').show();
            self.tree_el.find('i').each(function(index) {
                if (!$(this).hasClass('fa-square-o')) {
                    $(this).removeClass('fa-plus-square-o');
                    $(this).removeClass('fa-minus-square-o');
                    $(this).addClass('fa-minus-square-o');
                }
            });
            self.tree_el.find('.treeinput_item_name_content').each(function(index) {
                if ($(this).html().toUpperCase().indexOf(filter) > -1) {
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }
            });
        } else {
            self.tree_el.find('.treeinput_item_childs').hide();
            self.tree_el.find('i').each(function(index) {
                if (!$(this).hasClass('fa-square-o')) {
                    $(this).removeClass('fa-plus-square-o');
                    $(this).removeClass('fa-minus-square-o');
                    $(this).addClass('fa-plus-square-o');
                }
            });
            self.tree_el.find('.treeinput_item_name_content').each(function(index) {
                $(this).parent().show();
            });
        }
    }
}

$(window).ready(function() {
    window.ti = TreeInput;
    $('.treeinputelement').each(function(index) {
        new TreeInput($(this));
    });
});
