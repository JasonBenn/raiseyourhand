jsPlumb.ready(function() {

  $(".face").click(function(){

    jsPlumb.detachAllConnections("face1");
    jsPlumb.detachAllConnections("face3");
    jsPlumb.detachAllConnections("container3");

    // jsPlumb.connect({ source:e0, target:e1, detachable: false, anchor:"Top" });
    // jsPlumb.connect({ source:e0, target:e2, detachable: false});
    // jsPlumb.connect({ source:e0, target:e3, detachable: false});

    jsPlumb.connect({
  source:$(this),
  target:'face1',
  paintStyle:{ lineWidth:3, strokeStyle:'black' },
  anchors:["Bottom", "Top"],
  endpoint:[ "Blank", { width:1, height:1 }],
  detachable: false
});

        jsPlumb.connect({
  source:$(this),
  target:'face3',
  paintStyle:{ lineWidth:3, strokeStyle:'black' },
  anchors:["Bottom", "Top"],
  endpoint:[ "Blank", { width:1, height:1 }],
  detachable: false
});



    // alert("here");
  });


// jsPlumb.connect({
//     source:"container0",
//     target:"container1",
//     anchors:["RightMiddle", "LeftMiddle" ],
//     endpoint:"Rectangle",
//     endpointStyle:{ fillStyle: "yellow" }
// });


// // alert(jsPlumb);
  var e0 = jsPlumb.addEndpoint("container0"),
      e1 = jsPlumb.addEndpoint("container1");
    jsPlumb.connect({ source:e0, target:e1, detachable: false });

    });
