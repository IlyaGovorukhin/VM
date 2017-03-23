var app = (function (){

    var Purse =[10,10,10,10],
        PurseVM = [100,100,100,100],
        Money = [1,2,5,10],
        Acount = [],
        Goods = [10,20,20,15],
        digits = [],
        Bill=0,
        valid = true,
        Change = [13,18,21,35];

    var initInside = function () {
        _setUpListners();
    };

    var  _setUpListners = function () {
        $('.buttonform').on('click', _addMoney)
        $('.buttonformVM').on('click', _addChange)
        $('.center_down-item--a').on('click', _addGoods)
         $('.class_form input').on('keypress', _checkingNum);
    }


  function _checkingNum(e) {
      if(e.keyCode < 32)return false;
      if( String.fromCharCode(e.keyCode)<'0'||String.fromCharCode(e.keyCode)>'9') return false;
  }




function _addMoney(e) {
    e.preventDefault();
    var form = $('.class_form');
    if(!validation.validateForm(form, Purse)){
       return false;
    }

    Acount = [];
     $('.input_item-form').each(function(index, elem) {
         Purse[index] = Purse[index] - $(elem).val();
         Acount.push($(elem).val() * Money[index])
         $(elem).val(0);
     });
    Acount.map(function (value,index) {
        Bill = Bill + value
    })
    $('.center_up-middle-p').text(Bill)


    digits = counterChange(Bill);
    PurseVM = PurseVM.map(function (value,index) {
        return value + digits[index];
    })
    product();
}


function _addChange(e) {
    e.preventDefault();
    digits = counterChange(Bill);
     PurseVM.forEach(function (value,index) {
         PurseVM[index] = value - digits[index];
         Purse[index] = Purse[index] + digits[index];
    })
    Bill = 0;
    $('.center_up-middle-p').text(0);
    modal.modalMassag('Спасибо');
    product();

}

    function product() {
        $('.counter_item-form').each(function (index, elem) {
            $(elem).html( Purse[index] + 'штук')
        })
        $('.counter_item-formVM').each(function (index, elem) {
            $(elem).html( PurseVM[index] + 'штук')
        })

    }

function _addGoods(e) {
    var arr=[];
    $('.center_down-item--a').map(function (index, elem){
     arr.push(elem.id)

   })
    var index = arr.indexOf(e.target.id);
    if(Goods[index] <= 0 || Bill < Change[index]){

        valid = false
    } else {
        Bill = Bill - Change[index]
        Goods[index]--;
    }

    if(valid){
        $('.center_up-middle-p').text(Bill)
        $('.center_down-item--p').each(function (index, elem) {
            $(elem).html(Goods[index] + ' порций')
        })


    }

    valid = true;
}


function counterChange(number) {
        var digits = [];
        digits.push(Math.floor(number/10));
        var a = number % 10;
        digits.push(Math.floor(a/5));
        var b = a % 5;
        digits.push(Math.floor(b/2));
        var c = b % 2;
        digits.push(Math.floor(c/1));
        return digits.reverse();
    }


    return {
        init: initInside
    };
})();

var validation = (function (){


    function validateForm(form, arr) {

        var elements = form.find('input'),
            valid = true,
            countVal =0;

        $.each(elements, function(index, elem){
            var
                element = $(elem),
                value = element.val();
            countVal = countVal + element.val();

            if(arr[index] < element.val()){

                modal.modalMassag('У вас не хватает монет');
                valid = false;
            }
        })

        if(countVal == 0){
            modal.modalMassag('Вы ничего не ввели');
            valid = false;
        }
        return valid;
    }

    return {
        validateForm: validateForm
    };


})();

var modal = (function (){

    var initInside = function () {
        _setUpListners();
    };
    function _showMassag(msg) {
        $('.modal').css({
            'display': 'block'
        })
        $('.modal_center-text').text(msg);
    }



    var  _setUpListners = function () {
        $('.modal_center-button').on('click', _hideMasseg)
    }

    function _hideMasseg(e) {
        e.preventDefault();

        $('.modal').css({
            'display': 'none'
        })
        $('.modal_center-text').text('');
    }

    return {
        init: initInside,
        modalMassag: _showMassag
    };
})();
modal.init();
app.init();


