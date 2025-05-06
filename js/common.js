$(document).ready(function() {
    //селекты 
    var params = {
        changedEl: "select"
    };
    cuSel(params);
    $('.colorbox').colorbox();
    $('.bxslider').bxSlider({
      auto: true,
      pager: false,
      mode: 'fade',
      controls: true,
      slideMargin: 10,
      minSlides: 1,
      maxSlides: 1
    });
});
$(document).ready(function(){
  $(".datepicker").datepicker();
  $(".timeinput").mask("99:99");
});

$(document).ready(function(){
 
$(window).scroll(function(){
if ($(this).scrollTop() > 200) {
$('.scrollup').fadeIn();
} else {
$('.scrollup').fadeOut();
}
});
 
$('.scrollup').click(function(){
$("html, body").animate({ scrollTop: 20 }, 600);
return false;
});
 
});

function prepareFileInput(input) {
  var btn = document.createElement('div');
  btn.className = 'file_btn_bg';
  input.parentNode.insertBefore(btn, input);
  var edit = document.createElement('input');
  edit.type = 'text';
  edit.readonly = true;
  edit.style.zIndex = -1;
  input.parentNode.insertBefore(edit, input.nextSibling);
  $(input).bind('change', function() {
    var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;
    var file_name = '';
    if (file_api && this.files[0]) {
      file_name = this.files[0].name;
      for (var i = 1; i < this.files.length; i++)
        file_name = file_name + ', ' + this.files[i].name;
    }
    else
      file_name = this.val();
    file_name = file_name.replace('c:\\fakepath\\', '');
    edit.value = file_name;
  });
}

function formatFileSize(size) {
  let units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  let p = 0;
  while (size >= 1024 && p < units.length - 1) {
    size /= 1024;
    p++;
  }
  return +size.toFixed(2) + ' ' + units[p];
}

$(document).ready(function() {
  $('input[type="file"].file_with_btn').each(function() {
    prepareFileInput(this);
  }); 
});