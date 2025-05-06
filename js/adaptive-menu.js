function toggle(objName) {
  var obj = $(objName);
  if (obj.css("display") != "none") {
    obj.animate({ height: 'hide' }, 500);
  }
  else {
    obj.animate({ height: 'show' }, 500);
  }
}