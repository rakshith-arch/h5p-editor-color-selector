/**
 * ColorSelector widget module
 *
 * @param {H5P.jQuery} $
 */
H5PEditor.widgets.colorSelector = H5PEditor.ColorSelector = (function ($) {

  /**
   * Creates a color selector.
   *
   * @class H5PEditor.ColorSelector
   * @param {Object} parent
   * @param {Object} field
   * @param {Object} params
   * @param {function} setValue
   */
  function ColorSelector(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;

    this.changes = [];
  }
  console.log(this.parent)
  console.log(this.field)
  console.log(this.params)
  console.log(this.setValue)

  /**
   * Append the field to the wrapper.
   * @public
   * @param {H5P.jQuery} $wrapper
   */
  ColorSelector.prototype.appendTo = function ($wrapper) {
    var self = this;
    const id = ns.getNextFieldId(this.field);
    var jsonData='';
    console.log(this.field)
    console.log(this)
    console.log(id)
    console.log(ns)
    var html = H5PEditor.createFieldMarkup(this.field, '<input type="text" id="' + id + '" class="h5p-color-picker">', id);
    console.log(html)
    self.$item = H5PEditor.$(html);
    self.$colorPicker = self.$item.find('.h5p-color-picker');
    console.log("This is h5p editor")
    console.log(self)
    console.log(ns)
    self.config = {
      appendTo: self.$item[0],
      preferredFormat: 'hex',
      color: self.getColor(),
      change: function (color) {
        self.setColor(color);
      },
      hide: function (color) {
        // Need this to get color if cancel is clicked
        self.setColor(color);
      }
    };

    // Make it possible to set spectrum config
    if (self.field.spectrum !== undefined) {
      self.config = $.extend(self.config, self.field.spectrum);
    }

    // Create color picker widget
    self.$colorPicker.spectrum(self.config);

    var fileElement=$('<input id="fileInput" type="file" name="file" /><div id=jsonFields></div>').appendTo($wrapper);
    console.log(fileElement)
    // var files = document.getElementById('selectFiles');
    // console.log(files)
    

    
    fileElement[0].addEventListener('change', handleFileSelect.bind(this), false);
    console.log(jsonData)

  //   fileElement[0].addEventListener('change',(e)=>{console.log("Hi hello")
  //   var targetfile=e.target.files[0]
  //   console.log(e.target.result)
  //   console.log(targetfile)
    

  //   // reader1.addEventListener('load', (event) => {
  //   //   const result = event.target.result;
  //   //   // Do something with result
  //   //   console.log(result)
  //   // });

  //   console.log(targetfile)
  //  console.log(e.target.files);
  //  let reader = new FileReader();
  //   // console.log(e.target.result)
    


  // })
  };


  this.handleFileSelect=function (event) {
    console.log("Added the content")
    console.log(event)
    console.log(this)
    const reader = new FileReader()
    reader.onload = handleFileLoad.bind(this);
    console.log(event.target.files[0])
    console.log(reader.readAsText(event.target.files[0]))
    // reader.readAsText(event.target.files[0])
  }
  
  this.handleFileLoad=function (event) {
    console.log('handle file load')
    console.log(event);
    console.log($('#jsonFields'))
    console.log(this)
    console.log(this.parent.children[5].getField('LevelNumber'))
    // this.parent.children[5].addItem(this.parent.children[5])
    console.log(this.parent.parent.parent.params.slides[0].levels)
    // this.parent.field.fields.push({name: 'Rakshith', type: 'text', label: 'Rakshith'})
    // this.parent.params.levels.push({levelType: 'letterOnly', PromptType: 'Visible', Puzzles: [{}]})
    console.log(this.parent.parent.parent.params.slides[0].levels)
    jsonData=JSON.parse(event.target.result)
    $('#jsonFields')[0].innerHTML='<div class="field field-name-label text"><label class="h5peditor-label-wrapper" for="field-label-15"><span class="h5peditor-label h5peditor-required">Slide label</span></label><input class="h5peditor-text" type="text" id="field-label-15" maxlength="255"><div class="h5p-errors"></div></div>'
    // document.getElementById('fileContent').textContent = event.target.result;
    console.log(this.parent.children[5])
    console.log(this.parent.children[5].getEntity())
    console.log(this.parent.children[5])
    console.log(this.parent.children[5].getValue())
    console.log($(this))
    var ele=$(this)[0].parent.$content.find('.field-name-LevelNumber')
    console.log(ele)
    ele[0].children[1].value='7';
    console.log($(this))
    console.log($(this).parent().parent())
    // this.parent.field.fields[5]
    this.setValue(this.findField("LevelNumber",this.parent.field.fields[5].field.fields),"5")
    // console.log(event.target.result)
    console.log(this.parent.field.fields[5].field)
    console.log(this.parent.field.fields[5].field.fields)


  for(let i=0;i<jsonData['Levels'].length;i++)
  {
    // console.log(jsonData['Levels'][i])
    // this.parent.children[5].addItem(this.parent.children[5])
    // this.parent.params.levels.push({levelType: 'letterOnly', PromptType: 'Visible', Puzzles: [{}]})
    // this.parent.field.fields[5].field.fields[1]  
    // this.setValue(this.parent.field.fields[5].field.fields[1],i)
  }
    
  }


  function generateTextField(header,content){
    return '<div class="field field-name-label text"><label class="h5peditor-label-wrapper" for="field-label-15"><span class="h5peditor-label h5peditor-required">'+header+'</span></label><input class="h5peditor-text" type="text" id="field-label-15" maxlength="255" value='+content+'><div class="h5p-errors"></div></div>'
  }

  ColorSelector.prototype.findField = function (name, fields) {
    console.log('function called')
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].name === name) {
        console.log(fields[i].name)
        console.log(fields[i])
        return fields[i];
      }
    }
  };
  async function readData(file){
     console.log(await new Response(file).json())
     var jsonData=await new Response(file).json();
     console.log(jsonData)
     return await jsonData
  }

  /**
   * Return colorcode in "css" format
   *
   * @method colorToString
   * @param  {Object}      color
   * @return {String}
   */
  ColorSelector.prototype.colorToString = function (color) {
    switch (this.config.preferredFormat) {
      case 'rgb': return color.toRgbString();
      case 'hsv': return color.toHsvString();
      case 'hsl': return color.toHslString();
      default: return color.toHexString();
    }
  };

  /**
   * Hide color selector
   * @method hide
   */
  ColorSelector.prototype.hide = function () {
    this.$colorPicker.spectrum('hide');
  };
  /**
   * Save the color
   *
   * @param {Object} color The
   */
  ColorSelector.prototype.setColor = function (color) {
    // Save the value, allow null
    this.params = (color === null ? null : this.colorToString(color));
    this.setValue(this.field, this.params);

    this.changes.forEach(function (cb) {
      cb(this.params);
    })
  };

  ColorSelector.prototype.getColor = function () {
    var isEmpty = (this.params === null || this.params === "");
    return isEmpty ? null : this.params;
  };

  /**
   * Validate the current values.
   */
  ColorSelector.prototype.validate = function () {
    this.hide();
    return (this.params !== undefined && this.params.length !== 0);
  };

  ColorSelector.prototype.remove = function () {};

  return ColorSelector;
})(H5P.jQuery);
