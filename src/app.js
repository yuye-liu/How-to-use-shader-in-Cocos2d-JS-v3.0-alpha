var rend;
var lock = true;
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function ()
    {
        this._super();

        var size = cc.director.getWinSize();

      
        this.sprite = cc.Sprite.create(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
                                     
        this.addChild(this.sprite, 0);
        graySprite(this.sprite);
                                     
                                      rend = cc.RenderTexture.create(32, 64, cc.Texture2D.PIXEL_FORMAT_RGBA8888);
                                      
                                      if (!rend)
                                      return;
                                      rend.begin();
                                      cc.Director.getInstance().getRunningScene().visit();
                                      rend.end();
                                      //rend.saveToFile("coco2d-x-screenshot.png",Image.Format.PNG);
                                     /*
                                      var renderTexture = RenderTexture.create(size.width, size.height, Texture2D.PixelFormat.RGBA8888);
                                   
                                      renderTexture.begin();
                                 
                                      Director.getInstance().getRunningScene().visit();
                                 
                                      renderTexture.end();
                                
                                      renderTexture.saveToFile("coco2d-x-screenshot.png",Image.Format.PNG);
                         */
                                      
                                      //var fileName = cc.FileUtils.getInstance().getWritablePath() + "coco2d-x-screenshot.png";
       this.schedule(this.scoreCounter, 1.0);
                                    
                                      
                                     
                                      
        return true;
    },
    scoreCounter:function ()
    {
                                      
                                      if(lock)
                                      {
                                       lock = false;
                                      this.sprite2 = cc.Sprite.createWithTexture(rend.getSprite().getTexture());
                                      
                                      this.sprite2.attr({
                                                        x: 40,
                                                        y: 40,
                                                        scale: 0.3,
                                                        rotation: 180
                                                        });
                                      
                                      this.addChild(this.sprite2, 0);
                                      }
     
    }
});

function graySprite(sprite)
{
    if(sprite)
    {
        var shader = new cc.GLProgram();//cc.GLProgram.create("gray.vsh", "gray.fsh");
        shader.retain();
        //shader.initWithByteArrays("res/gray.vsh", "res/gray.fsh");
        shader.initWithFilenames("res/gray.vsh", "res/gray.fsh");
        shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
        shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
        shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
    
        shader.link();
        shader.updateUniforms();
        sprite.setShaderProgram(shader);
    }    
}

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

