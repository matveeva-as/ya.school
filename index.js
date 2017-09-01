var myForm = (function() {

  function validFIO(fio) {
    return ( fio.match(/^[a-zа-яё]+\s[a-zа-яё]+\s[a-zа-яё]+$/i) === null ? false : true);
  }

  function validMail(mail) {
    return ( mail.match(/^[A-Z0-9._%+-]+@(ya\.ru)|(yandex\.ru)|(yandex\.ua)|(yandex\.by)|(yandex\.kz)|(yandex\.com)$/i) === null ? false : true);
  }

  function validPhone(phone) {
    //находим все цифры и складываем
    let total = 0;
    let d = phone.match(/\d/g);
    if (d!==null)
      for (let i = 0; i < d.length; i++) {
          total += d[i] << 0;
      }
    return ( total > 30 || phone.match(/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/i) === null ? false : true);
  }

  function send() {
    $('.progress').removeClass('progress');
    let files = [{"status":"success"}, {"status":"error","reason":"ошибка ответа сервера"},  {"status":"progress","timeout":2000}];
    let result = files[Math.floor(Math.random()*files.length)]; //рандомный элемент массива
    $('#resultContainer').addClass(result.status);
    switch (result.status) {
      case 'success':
        $('#resultContainer ').text(result.status);
        break;
      case 'error':
        $('#resultContainer ').text(result.reason);
        break;
      case 'progress':
        setTimeout(send, result.timeout);
        break;
    }
  }

  return {
    validate: function() {
      let valid = [];
      var form = this.getData();
      if (!validFIO(form['fio'].val())) {
        valid.push('fio');
      }
      if (!validMail(form['mail'].val())) {
        valid.push('mail');
      }
      if (!validPhone(form['phone'].val())) {
        valid.push('phone');
      }
      return { 'isValid': valid.length>0 ? false : true, errorFields: valid};
    },
    getData: function() {
      return {"fio":$('[name=fio]'), "mail":$('[name=email]'), "phone":$('[name=phone]')};
    },
    setData: function() {
      //не поняла, что должно происходить, добавлю функцию заполнения инпутов тестовыми данными
      $('[name=fio]').val('Иванов Иван Иванович');
      $('[name=email]').val('s@yandex.com');
      $('[name=phone]').val('+7(111)222-33-11');
    },
    submit: function() {
      let validRes = this.validate();
      $('.error').removeClass('error');
      if (validRes.isValid){
        $('#submitButton').attr('disabled',true);
        send();
      }
      else {
        var form = this.getData();
        $.each(validRes.errorFields, function(key,val){
          $(form[val]).addClass('error')
        })
      }
    }
  }

})();
