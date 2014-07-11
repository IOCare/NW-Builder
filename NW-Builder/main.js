function updateImageUrl(image_id, new_image_url) {
  var image = document.getElementById(image_id);
  if (image)
    image.src = new_image_url;
}

function createImage(image_id, image_url) {
  var image = document.createElement("img");
  image.setAttribute("id", image_id);
  image.src = image_url;
  return image;
}

function createButton(button_id, button_name, normal_image_url,
                       hover_image_url, click_func) {
  var button = document.createElement("div");
  button.setAttribute("class", button_name);
  var button_img = createImage(button_id, normal_image_url);
  button.appendChild(button_img);
  button.onmouseover = function() {
    updateImageUrl(button_id, hover_image_url);
  }
  button.onmouseout = function() {
    updateImageUrl(button_id, normal_image_url);
  }
  button.onclick = click_func;
  return button;
}

function focusTitlebars(focus) {
  var bg_color = focus ? "#003333" : "#009999";
    
  var titlebar = document.getElementById("top-titlebar");
  if (titlebar)
    titlebar.style.backgroundColor = bg_color;
  titlebar = document.getElementById("bottom-titlebar");
  if (titlebar)
    titlebar.style.backgroundColor = bg_color;
  titlebar = document.getElementById("left-titlebar");
  if (titlebar)
    titlebar.style.backgroundColor = bg_color;
  titlebar = document.getElementById("right-titlebar");
  if (titlebar)
    titlebar.style.backgroundColor = bg_color;
}



function addTitlebar(titlebar_name, titlebar_icon_url, titlebar_text) {
	var titlebar = document.getElementById(titlebar_name);

	var closeButton = createButton(titlebar_name + "-close-button",
								 titlebar_name + "-close-button",
								 "button_close.png",
								 "button_close_hover.png",
								 closeWindow);
	titlebar.appendChild(closeButton);
}

function removeTitlebar(titlebar_name) {
  var titlebar = document.getElementById(titlebar_name);
  if (titlebar)
    document.body.removeChild(titlebar);
}


function updateContentStyle() {
  var content = document.getElementById("content");
  if (!content)
    return;

  var left = 0;
  var top = 0;
  var width = window.outerWidth;
  var height = window.outerHeight;

  var titlebar = document.getElementById("top-titlebar");
  if (titlebar) {
    height -= titlebar.offsetHeight;
    top += titlebar.offsetHeight;
  }
  titlebar = document.getElementById("bottom-titlebar");
  if (titlebar) {
    height -= titlebar.offsetHeight;
  }
  titlebar = document.getElementById("left-titlebar");
  if (titlebar) {
    width -= titlebar.offsetWidth;
    left += titlebar.offsetWidth;
  }
  titlebar = document.getElementById("right-titlebar");
  if (titlebar) {
    width -= titlebar.offsetWidth;
  }

  var contentStyle = "position: absolute; ";
  contentStyle += "left: " + left + "px; ";
  contentStyle += "top: " + top + "px; ";
  contentStyle += "width: " + width + "px; ";
  contentStyle += "height: " + height + "px; ";
  content.setAttribute("style", contentStyle);
}

function updateCheckbox() {
  var top_checkbox = document.getElementById("top-box");
 // var bottom_checkbox = document.getElementById("bottom-box");
  //var left_checkbox = document.getElementById("left-box");
  //var right_checkbox = document.getElementById("right-box");
  //if (top_checkbox.checked || bottom_checkbox.checked) {
    //left_checkbox.disabled = true;
   // right_checkbox.disabled = true;
 // } else if (left_checkbox.checked || right_checkbox.checked) {
  //  top_checkbox.disabled = true;
   // bottom_checkbox.disabled = true;
  //} else {
    //left_checkbox.disabled = false;
   // right_checkbox.disabled = false;
    //top_checkbox.disabled = false;
    //bottom_checkbox.disabled = false;
  //}
}
function initCheckbox(checkboxId, titlebar_name, titlebar_icon_url, titlebar_text) {
  var elem = document.getElementById(checkboxId);
  if (!elem)
    return;
  elem.onclick = function() {
    if (document.getElementById(checkboxId).checked)
      addTitlebar(titlebar_name, titlebar_icon_url, titlebar_text);
    else
      removeTitlebar(titlebar_name);
    focusTitlebars(true);

    updateContentStyle();
    updateCheckbox();
  }
}
window.onfocus = function() { 
  console.log("focus");
  focusTitlebars(true);
}

window.onblur = function() { 
  console.log("blur");
  focusTitlebars(false);
}

window.onresize = function() {
  updateContentStyle();
}

function closeWindow() {
  window.close();
}