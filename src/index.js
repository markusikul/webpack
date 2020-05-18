import * as $ from  'jquery'
import 'webpack-jquery-ui'
import 'webpack-jquery-ui/draggable'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'normalize.css'
import './sass/style.sass';
import Te from './js/main.js';

var te =new Te('ffff');
console.log(te.get());


$('body').css('background-image','url("img/background.jpg")');

 var container_itm='k';
 var text;

eventdelete();
eventAddItm();
drag();
//selectDragContainer()
function selectDragContainer() {
    $('.row').on('mouseover',function (e) {
        $('.container-itm').removeClass('hover')
        $(e.target).parents('.col-g').find('.container-itm').addClass('hover')
    })

    $('.container-itm').on('mouseout',function (e) {
        console.log('mouseout')
    })
}

function drag() {
    $( ".container-itm" ).sortable({
        revert: true
    });
    $('.itm').draggable({
        connectToSortable: ".container-itm",
        revert: "invalid",
        start: function(e) {
           console.log(e.target);
        },
        drag: function(e) {
            console.log(e);
        },
        stop: function(e) {
            console.log(e);
        }

    });
}




$('.add-colon').on('click',function () {
    $(this).parent().find('.add-text').show();
    $(this).hide();
})

$('.create-colon').on('click',function () {
    var text = $(this).parents('.add-text').find('.text-itm').val();
    $('.end').before(getColonEl(text));
    $(this).parents('.add-text').hide();
    $(this).parents('.col-g').find('.add-colon').show();
    $(this).parents('.add-text').find('.text-itm').val('');
    eventdelete();
    eventAddItm();
    drag();
})


function eventAddItm() {
    $('.add-itm').off();
    $('.add-itm').on('click',function () {
        $(this).parent().find('.add-text').show();
        container_itm = $(this).parent().find('.container-itm');
        $(this).hide();
    })

    $('.block-btn .close').off();
    $('.block-btn .close').on('click',function () {
        $(this).parents('.add-text').hide();
        $(this).parents('.col-g').find('.add-itm, .add-colon').show();
    })
    $('.create-itm').off();
    $('.create-itm').on('click',function () {
        console.log(container_itm)

        var text = $(this).parents('.add-text').find('.text-itm').val();
        container_itm.append(getItm(text));
        $('#text-itm-modal').modal('hide');
        eventdelete();
        drag();
        $(this).parents('.add-text').hide();
        $(this).parents('.col-g').find('.add-itm').show();
        $(this).parents('.add-text').find('.text-itm').val('');
    })
}




function eventdelete() {
    $('.delete').off();
    $('.delete').on('click',function () {
        $(this).parent().remove();
    })
}



function getItm(text) {

    var el =' <div class="itm">'+text+'  <button type="button" class="close delete" aria-label="Close" >\n' +
        '                            <span aria-hidden="true">&times;</span>\n' +
        '                        </button> </div>';
    return el;
}


function getColonEl(text) {
    var el =' <DIV class="col-g col-md-3">\n' +
        '                <div class="title">'+text+'</div>\n' +
        '                <div class="container-itm">\n' +
        '\n' +
        '                </div>\n' +
        '                <div class="add-itm">\n' +
        '                    <div>+</div>\n' +
        '                    <div>Добавить еще одну карточку</div>\n' +
        '                </div>\n' +
        '                <div class="add-text">\n' +
        '                    <textarea class="text-itm" name="" cols="30" rows="2" placeholder="Введите название карточки"></textarea>\n' +
        '                    <div class="block-btn">\n' +
        '                        <button class="btn-add  btn btn-success create-itm">Добавить карточку</button>\n' +
        '                        <button type="button" class="close " aria-label="Close" >\n' +
        '                            <span aria-hidden="true">&times;</span>\n' +
        '                        </button></div>\n' +
        '                </div>\n' +
        '            </DIV>';
    return el;
}
