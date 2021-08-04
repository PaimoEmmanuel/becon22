$(function () {
  /* global variables */
  const register = $(".register");
  const registerContent = register.innerHTML;

  $(".image-editor-1").cropit();
  $(".image-editor-2").cropit();
  $(".image-editor-3").cropit();

  $("#btn_upload_1").on("click", function () {
    if($("#input_text_1").val()==""){
      $("#error_paragraph").css('display', 'block');
      return;
    }
    $("#error_paragraph").css('display', 'none');
    exportCropitImage(0, $(".image-editor-1"))
  });
  $("#btn_upload_2").on("click", function () {
    exportCropitImage(1, $(".image-editor-2"))
  });
  $("#btn_upload_3").on("click", function () {
    exportCropitImage(2, $(".image-editor-3"))
    processImage();
  });

  function exportCropitImage(index, handler){
    let imageData = handler.cropit("export", {
      type: "image/jpeg",
      quality: 1.0,
      originalSize: true,
    });
    let images = getImageArray();
    images[index] = imageData;
    setImageArray(images);
  }

  function processImage () {
    register.html(`<h3>Getting Your Video...</h3><h3>This might take some seconds</h3><h3>0% done</h3>`);
    const text1 = $(`#input_text_1`).val()
    const text2 = $(`#input_text_2`).val()
    // name, y, x
    const textData1 = [`${text1}`, 485, 596];
    // name, y, x
    const textData2 = [`${text2}`, 433, 587];

    // button.attr("disabled", "disabled").html("...processing");

    // x, y, width, height
    const picData = [79, 276, 462, 462];
    let images = getImageArray();

    createDP(0,images[0], picData, textData1, genericCb);

    function genericCb (index, url) {
      //adasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdadasdasdasdasdasdasdsaadsdasdasdasdasdasdasdasdasdasdadas
      let images = getImageArray();
      if (index < 2) {
        $.ajax({
          url: "https://api.cloudinary.com/v1_1/dlkv3fl1f/image/upload",
          type: "POST",
          data: {
            file: url,
            upload_preset: "sb2wllyb",
          },
          success: function (result) {
            // console.log(result);
            // console.log(result.public_id);
            images[index] = result.public_id;
            setImageArray(images);
  
            if(index == 0){
              register.html(`<h3>Getting Your Video...</h3><h3>This might take some seconds</h3><h3>30% done</h3>`);
              createDP(1,images[1], picData, textData2, genericCb);
            }else{
              register.html(`<h3>Getting Your Video...</h3><h3>This might take some seconds</h3><h3>60% done</h3>`);
              createDP(2,images[2], picData, "", genericCb);
            }
          },
          error: function (xhr, status, error) {
            console.log(error);
          },
        });
        return;
      }
      $.ajax({
        url: "https://api.cloudinary.com/v1_1/dlkv3fl1f/image/upload",
        type: "POST",
        data: {
          file: url,
          upload_preset: "sb2wllyb",
        },
        success: function (result) {
          images[index] = result.public_id;
          setImageArray(images);

          register.html(`<h3>Getting Your Video...</h3><h3>This might take some seconds</h3><h3>90% done</h3>`);
          navigateTo("yourdp", createHTMLForImage(url));
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });

      function createHTMLForImage(url) {
        let images = getImageArray();
        return `
        <h3>Do the work of an Evangelist,
            share your Video far & wide</h3>
        <a class="heading-links-a" href="https://res.cloudinary.com/dlkv3fl1f/video/upload/w_1080,h_1080/l_${
          images[0]
        },so_0,eo_5/l_${images[1]},so_5,eo_10/l_${images[2]},so_10,eo_15/l_Main_Flyer_jt8grg,so_15/fl_attachment/BeconClip_wjt81h.mp4" download="Becon_Vid_${text1.replace(/\./g, "")}">Download my video</a>
        `;
      }
    }
  };
  
  if (CanvasRenderingContext2D && !CanvasRenderingContext2D.renderText) {
    // @param  letterSpacing  {float}  CSS letter-spacing property
    CanvasRenderingContext2D.prototype.renderText = function (
      text,
      x,
      y,
      letterSpacing
    ) {
      if (!text || typeof text !== "string" || text.length === 0) {
        return;
      }

      if (typeof letterSpacing === "undefined") {
        letterSpacing = 0;
      }

      // letterSpacing of 0 means normal letter-spacing

      var characters = String.prototype.split.call(text, ""),
        index = 0,
        current,
        currentPosition = x,
        align = 1;

      if (this.textAlign === "right") {
        characters = characters.reverse();
        align = -1;
      } else if (this.textAlign === "center") {
        var totalWidth = 0;
        for (var i = 0; i < characters.length; i++) {
          totalWidth += this.measureText(characters[i]).width + letterSpacing;
        }
        currentPosition = x - totalWidth / 2;
      }

      while (index < text.length) {
        current = characters[index++];
        this.fillText(current, currentPosition, y);
        currentPosition +=
          align * (this.measureText(current).width + letterSpacing);
      }
    };
  }

  function createDP(index, imageUrl, pic, name, cb) {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      imageCount = 2,
      view = {
        x: pic[0],
        y: pic[1],
        width: pic[2],
        height: pic[3],
      },
      innerText = {
        x: view.width * 0.7,
        y: view.height - 80,
      };

    let userImg = loadImage(imageUrl);
    let frameImg = null;
    if(index == 0){
      frameImg = loadImage("./dpEngine/img/Frame1.png");
    }else if(index == 1){
      frameImg = loadImage("./dpEngine/img/Frame2.png");
    }else{
      frameImg = loadImage("./dpEngine/img/Frame3.png");
    }

    function loadImage(src) {
      let img = new Image();
      img.onload = transformImage;
      img.src = src;
      return img;
    }

    function transformImage() {
      if (--imageCount !== 0) return;

      canvas.width = frameImg.width;
      canvas.height = frameImg.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(frameImg, 0, 0);

      ctx.save();
      ctx.beginPath();
      ctx.arc(310, 507, 231, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(userImg, view.x, view.y, view.width, view.height);

      ctx.restore();

      ctx = canvas.getContext("2d");

      if(index < 2){
        //Write user name
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.font = "65px Autography";
        ctx.fillStyle = "#7e5a19";
        var canvasText = name[0];
        ctx.fillText(canvasText, name[2], name[1]);
        // ctx.renderText(name[3], name[2], name[1], 1);
      }

      cb(index, canvas.toDataURL("image/jpeg", 1.0));
    }
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight, letterSpacing) {
    let words = text.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      // let metrics = context.measureText(testLine);
      // let testWidth = metrics.width;
      if (testLine.length > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
        // if (maxWidth <= 25) {
        //   maxWidth += 5;
        // } else {
        //   maxWidth -= 5;
        // }
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function wrapTextLetter(
    context,
    text,
    x,
    y,
    maxLetters,
    lineHeight,
    letterSpacing
  ) {
    let letters = text.split("");
    let line = "";

    for (let n = 0; n < letters.length; n++) {
      let testLine = line + letters[n];
      if (testLine.length > maxLetters && n > 0) {
        context.fillText(line, x, y);
        line = letters[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function navigateTo(view, temp = "") {
    switch (view) {
      case "yourdp":
        register.html(temp);
        break;
      default:
        register.innerHTML = registerContent;
    }
  }
  console.log("DOM fully loaded and parsed");
});
