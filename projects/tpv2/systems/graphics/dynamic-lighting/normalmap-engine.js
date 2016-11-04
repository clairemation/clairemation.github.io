function PointLight(args){
  this.position = args.position; // array [x,y,z]
  this.color = args.color; // array [r,g,b]
  this.falloff = args.falloff; //in pixels

  // TODO: instead of a variable, make falloff a function, so a light can have a non-linear falloff if we want
}


// apply lighting to a pixel and return the new color as [r,g,b]
PointLight.lightPixel = function(args){
  // args: {normal, lightDirection, lightColor, baseColor, choke}

  // calculate light intensity
  var dot = ArrayVec3D.dot(args.lightDirection, args.normal);
  var intensity = Math.pow(dot, args.choke);
  intensity = clamp(intensity, 0, .65);

  // blend base color and light color based on intensity
  return ArrayVec3D.interpolate(args.baseColor, args.lightColor, intensity);
}

PointLight.lightCanvas = function(args){
  // args: {canvas, ctx, offset, lightPosition, normals}

  var texture = args.ctx.getImageData(0, 0, args.canvasHeight, args.canvasWidth);
  var textureData = texture.data;

  var texturePixel = [0,0,0],
    pixelPosition = [0,0,0],
    lightDirection = [0,0,0],
    litPixel = [0,0,0];

  var i = 0;

  for (var x = 0; x < args.canvasHeight; x++){
    for (var y = 0; y < args.canvasWidth; y++){

      pixelPosition[0] = args.offset[0] + x*SCALE;
      pixelPosition[1] = args.offset[2] - args.offset[1] + y*SCALE;
      pixelPosition[2] = args.offset[2] + args.normals[i+3];

      // calculate direction from light to pixel
      lightDirection = ArrayVec3D.unitVector(ArrayVec3D.subtractVectors(args.lightPosition, pixelPosition));

      // get pixel color
      ArrayVec3D.assign(texturePixel, [textureData[i], textureData[i+1], textureData[i+2]]);

      // apply light to pixel
      litPixel = this.lightPixel({
        baseColor: texturePixel,
        cel: false,
        choke: 5,
        falloff: 200,
        lightColor: args.lightColor,
        lightDirection: lightDirection,
        normal: [args.normals[i], args.normals[i+1], args.normals[i+2]],
        offset: args.offset
      });

      // write new pixel color back into texture data
      textureData[i] = litPixel[0];
      textureData[i+1] = litPixel[1];
      textureData[i+2] = litPixel[2];

      i += 4;
    }
  }

  // draw to canvas
  args.ctx.putImageData(texture, 0, 0);

}
