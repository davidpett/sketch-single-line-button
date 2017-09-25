function alert(msg, title) {
  title = title || 'alert';
  var app = [NSApplication sharedApplication];
  [app displayDialog:msg withTitle:title];
}

var findTextLayer = function (selection) {
  for (var i = 0; i < [selection count]; i++) {
    var currentLayer = selection[i];
    var currentLayerFrame = [currentLayer frame]
    var existingOverrides = currentLayer.overrides();
    if ([currentLayer class] === MSSymbolInstance) {
      var symbolMaster = currentLayer.symbolMaster();
      var children = symbolMaster.children();
      for (var j = 0; j < [children count]; j++) {
        var layer = children[j];
        if ([layer class] === MSTextLayer) {
          var ObjectId = layer.objectID().toString();
          var symbolInstanceValue = existingOverrides.objectForKey(ObjectId);
          var oldVal = layer.stringValue();

          layer.stringValue = symbolInstanceValue;
          var frame = [layer frame];
          var layerWidth = [frame width];
          layer.stringValue = oldVal;
          
          var newWidth = layerWidth + ([frame x] * 2);
          [currentLayerFrame setWidth:newWidth]
        }
      }
    }
  }
  return null;
}

var onRun = function (context) {
  var selection = context.selection;

  if ([selection count] == 0) {
    alert('You need to select a Text layer', 'Selection is empty');
  } else {
    var textLayer = findTextLayer(selection)
  }
}
