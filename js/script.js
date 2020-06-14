"use strict";

$(document).ready(function () {
  var mainList = {
    input: {
      budget: $('#budget'),
      nameShop: $('#nameShop'),
      products: $('#products'),
      open: $('#status'),
      employer: {
        box: null,
        name: $('.employer__name'),
        position: $('.employer__position')
      }
    },
    text: {
      budget: $('.mainList__budget'),
      nameShop: $('.mainList__nameShop'),
      products: $('.mainList__products'),
      employer: $('.mainList__employer'),
      open: $('.mainList__status_now'),
      warning: $('.pop-up__text')
    },
    btn: {
      addEmployer: $('.mainList-box .btn-employer'),
      result: $('.mainList .btn-result')
    },
    nameShop: null,
    budget: null,
    products: null,
    employers: {},
    open: null,
    discount: false,
    price: 0
  }; // functions

  var functions = {
    addEmployer: $(mainList.btn.addEmployer).on('click', function (e) {
      e.preventDefault();
      mainList.input.employer.box = $('.mainList-employer');
      mainList.input.employer.name = $('.employer__name');
      mainList.input.employer.position = $('.employer__position');
      $(mainList.input.employer.box[0]).clone().appendTo('.mainList-box__item');
      $('.mainList-employer:last-child').find('.employer__name').val('');
      $('.mainList-employer:last-child').find('.employer__position').val('');
      mainList.input.employer.name = $('.employer__name');
      mainList.input.employer.position = $('.employer__position');

      for (var i = 0; i < mainList.input.employer.name.length; i++) {
        $(mainList.input.employer.name[i]).on('blur', function () {
          if (parseInt($(this).val()) && $(this).val() !== '') {
            $('.pop-up').addClass('pop-up_active');
            $('.pop-up__text').text('Вы введи некорректные данные. Имя сотрудника не может начинаться на цифру или состоять только из цифр.');
            $('.pop-up__box').addClass('pop-up__box_active');
            $(this).val('');
          } else if ($(this).val().length > 30) {
            $('.pop-up').addClass('pop-up_active');
            $('.pop-up__text').text('Слишком много символов. Введите более короткое имя.');
            $('.pop-up__box').addClass('pop-up__box_active');
            $(this).val('');
          } else if ($(this).val().length <= 2 && $(this).val().length !== 0) {
            $('.pop-up').addClass('pop-up_active');
            $('.pop-up__text').text('Слишком короткое имя сотрудника.');
            $('.pop-up__box').addClass('pop-up__box_active');
            $(this).val('');
          }
        });
      }

      for (var _i = 0; _i < mainList.input.employer.position.length; _i++) {
        $(mainList.input.employer.position[_i]).on('blur', function () {
          if (parseInt($(this).val()) && $(this).val() !== '') {
            $('.pop-up').addClass('pop-up_active');
            $('.pop-up__text').text('Вы введи некорректные данные. Название должности не может начинаться на цифру или состоять только из цифр.');
            $('.pop-up__box').addClass('pop-up__box_active');
            $(this).val('');
          } else if ($(this).val().length > 30) {
            $('.pop-up').addClass('pop-up_active');
            $('.pop-up__text').text('Слишком много символов. Введите более короткое название должности.');
            $('.pop-up__box').addClass('pop-up__box_active');
            $(this).val('');
          } else if ($(this).val().length <= 2 && $(this).val().length !== 0) {
            $('.pop-up').addClass('pop-up_active');
            $('.pop-up__text').text('Слишком короткое название должности.');
            $('.pop-up__box').addClass('pop-up__box_active');
            $(this).val('');
          }
        });
      }
    }),
    result: $(mainList.btn.result).on('click', function (e) {
      e.preventDefault();
      mainList.budget = +mainList.input.budget.val();
      mainList.nameShop = mainList.input.nameShop.val();
      mainList.products = mainList.input.products.val().split(', ');

      if ($('.mainList__employer').length <= $('.mainList-employer').length) {
        $('.mainList__employer').slice(1).remove();

        for (var i = 1; i < $('.mainList-employer').length; i++) {
          $('.mainList__employer:last-child').clone().appendTo('.mainList__text_list');
        }
      }

      mainList.input.employer.box = $('.mainList-employer');
      mainList.input.employer.name = $('.employer__name');
      mainList.input.employer.position = $('.employer__position');

      if (mainList.input.employer.name.val().length > 0 || mainList.input.employer.position.val().length > 0) {
        for (var _i2 = 0; _i2 < mainList.input.employer.box.length; _i2++) {
          mainList.employers[$(mainList.input.employer.box[_i2]).find(mainList.input.employer.name).val()] = $(mainList.input.employer.box[_i2]).find(mainList.input.employer.position).val();
        }

        for (var k = 0; k < $('.mainList__employer').length; k++) {
          var text = Object.keys(mainList.employers)[k];
          $('.mainList__employer:nth-child(' + (k + 1) + ')').text(text + ' - ' + mainList.employers[text]);
        }
      }

      mainList.text.budget.text(mainList.budget / 30 + ' рублей');
      mainList.text.nameShop.text(mainList.nameShop);
      mainList.text.products.text(mainList.products.join(', '));

      if (+mainList.input.open.val() < 18 & +mainList.input.open.val() >= 8) {
        mainList.open = true;
        $(mainList.text.open).text('Открыто');
        $('.mainList__status_icon').css('background', '#00bd06');
      } else {
        mainList.open = false;
        $(mainList.text.open).text('Закрыто');
        $('.mainList__status_icon').css('background', '#ce0909');
      }
    }),
    popUpClose: $('.pop-up__close').on('click', function () {
      $('.pop-up').removeClass('pop-up_active');
      $('.pop-up__box').removeClass('pop-up__box_active');
    }),
    checks: {
      budget: $(mainList.input.budget).on('blur', function () {
        if (!parseInt(mainList.input.budget.val()) && mainList.input.budget.val() !== '') {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Вы введи некорректные данные. Введите сумму с помощью цифр.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.budget.val('');
        } else if (mainList.input.budget.val().length > 8) {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Слишком много символов. Введите корректную сумму.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.budget.val('');
        }
      }),
      nameShop: $(mainList.input.nameShop).on('blur', function () {
        if (parseInt(mainList.input.nameShop.val()) && mainList.input.nameShop.val() !== '') {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Вы введи некорректные данные. Название не может состоять только из цифр.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.nameShop.val('');
        } else if (mainList.input.nameShop.val().length > 30) {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Слишком много символов. Введите более короткое название.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.nameShop.val('');
        }
      }),
      open: $(mainList.input.open).on('blur', function () {
        if (!parseInt(mainList.input.open.val()) && mainList.input.open.val() !== '') {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Вы ввели некорректные данные. Время с помощью цифр.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.open.val('');
        } else if (mainList.input.open.val().length > 2 || mainList.input.open.val() > 24 || mainList.input.open.val() < 0) {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('В сутках 24 часа. Введите корректное время.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.open.val('');
        }
      }),
      productItem: $(mainList.input.products).on('blur', function () {
        if (mainList.input.products.val().length < 1) {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Список товаров не может быть пустым.');
          $('.pop-up__box').addClass('pop-up__box_active');
        } else if (!isNaN(mainList.input.products.val())) {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Название товаров не может быть числом.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.products.val('');
        }
      }),
      employerName: mainList.input.employer.name.on('blur', function () {
        if (parseInt(mainList.input.employer.name.val()) && mainList.input.employer.name.val() !== '') {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Вы введи некорректные данные. Имя сотрудника не может начинаться на цифру или состоять только из цифр.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.employer.name.val('');
        } else if (mainList.input.employer.name.val().length > 30) {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Слишком много символов. Введите более короткое имя.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.employer.name.val('');
        } else if (mainList.input.employer.name.val().length <= 2 && mainList.input.employer.name.val().length !== 0) {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Слишком короткое имя сотрудника.');
          $('.pop-up__box').addClass('pop-up__box_active');
          mainList.input.employer.name.val('');
        }
      }),
      employerPosition: mainList.input.employer.position.on('blur', function () {
        if (parseInt($(this).val()) && $(this).val() !== '') {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Вы введи некорректные данные. Должность сотрудника не может начинаться на цифру или состоять только из цифр.');
          $('.pop-up__box').addClass('pop-up__box_active');
          $(this).val('');
        } else if ($(this).val().length > 30) {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Слишком много символов. Введите более короткое название должности.');
          $('.pop-up__box').addClass('pop-up__box_active');
          $(this).val('');
        } else if ($(this).val().length <= 1 && $(this).val().length !== 0) {
          $('.pop-up').addClass('pop-up_active');
          $('.pop-up__text').text('Слишком короткое название должности.');
          $('.pop-up__box').addClass('pop-up__box_active');
          $(this).val('');
        }
      }),
      discount: $('.mainList-discount__checkbox').change(function () {
        if ($('.mainList-discount__checkbox').prop("checked")) {
          $('.mainList-discount__item').addClass('mainList-discount__item_active');
          mainList.price = 80;
          mainList.discount = true;
        } else {
          $('.mainList-discount__item').removeClass('mainList-discount__item_active');
          mainList.price = 0;
          mainList.discount = false;
        }
      })
    }
  };
});