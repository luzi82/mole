
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    moleLogic:null,
    moleBadSpriteV:null,
    moleGoodSpriteV:null,
    moleLiveSpriteV:null,
    moleMissSpriteV:null,
    scoreLabel:null,
    maxScoreLabel:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        
        cc.log("JVFzMNYF HelloWorldLayer.ctor start");

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

//        // add a "close" icon to exit the progress. it's an autorelease object
//        var closeItem = new cc.MenuItemImage(
//            res.CloseNormal_png,
//            res.CloseSelected_png,
//            function () {
//                cc.log("Menu is clicked!");
//            }, this);
//        closeItem.attr({
//            x: size.width - 20,
//            y: 20,
//            anchorX: 0.5,
//            anchorY: 0.5
//        });
//
//        var menu = new cc.Menu(closeItem);
//        menu.x = 0;
//        menu.y = 0;
//        this.addChild(menu, 1);
//
//        /////////////////////////////
//        // 3. add your codes below...
//        // add a label shows "Hello World"
//        // create and initialize a label
//        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
//        // position the label on the center of the screen
//        helloLabel.x = size.width / 2;
//        helloLabel.y = 0;
//        // add the label as a child to this layer
//        this.addChild(helloLabel, 5);
//
//        // add "HelloWorld" splash screen"
//        this.sprite = new cc.Sprite(res.HelloWorld_png);
//        this.sprite.attr({
//            x: size.width / 2,
//            y: size.height / 2,
//            scale: 0.5,
//            rotation: 180
//        });
//        this.addChild(this.sprite, 0);
//
//        this.sprite.runAction(
//            cc.sequence(
//                cc.rotateTo(2, 0),
//                cc.scaleTo(2, 1, 1)
//            )
//        );
//        helloLabel.runAction(
//            cc.spawn(
//                cc.moveBy(2.5, cc.p(0, size.height - 40)),
//                cc.tintTo(2.5,255,125,0)
//            )
//        );
        
        this.moleLogic = new MoleLogic();
        
        this.moleBadSpriteV = [];
        this.moleGoodSpriteV = [];
        this.moleLiveSpriteV = [];
        this.moleMissSpriteV = [];
        var x;var y;
        for(x=0;x<3;++x){
          for(y=0;y<3;++y){
	        	var tmpSprite;

	        	tmpSprite = new cc.Sprite(res.MoleBad_png);
	        	tmpSprite.attr({x: x*120, y: y*120, anchorX: 0, anchorY: 0});
	        	tmpSprite.setVisible(false);
	        	this.addChild(tmpSprite,1);
	        	this.moleBadSpriteV.push(tmpSprite);

	        	tmpSprite = new cc.Sprite(res.MoleGood_png);
	        	tmpSprite.attr({x: x*120, y: y*120, anchorX: 0, anchorY: 0});
	        	tmpSprite.setVisible(false);
	        	this.addChild(tmpSprite,1);
	        	this.moleGoodSpriteV.push(tmpSprite);

	        	tmpSprite = new cc.Sprite(res.MoleLive_png);
	        	tmpSprite.attr({x: x*120, y: y*120, anchorX: 0, anchorY: 0});
	        	tmpSprite.setVisible(false);
	        	this.addChild(tmpSprite,1);
	        	this.moleLiveSpriteV.push(tmpSprite);

	        	tmpSprite = new cc.Sprite(res.MoleMiss_png);
	        	tmpSprite.attr({x: x*120, y: y*120, anchorX: 0, anchorY: 0});
	        	tmpSprite.setVisible(false);
	        	this.addChild(tmpSprite,1);
	        	this.moleMissSpriteV.push(tmpSprite);
          }
        }
        
	      this.scoreLabel = new cc.LabelTTF("", "Arial", 38);
	      this.scoreLabel.x = 90
	      this.scoreLabel.y = 420;
	      this.addChild(this.scoreLabel, 5);

	      this.maxScoreLabel = new cc.LabelTTF("", "Arial", 38);
	      this.maxScoreLabel.x = 270
	      this.maxScoreLabel.y = 420;
	      this.addChild(this.maxScoreLabel, 5);

        cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan
	      }, this);
        
        this.scheduleUpdate();
        
        cc.log("YwaZJIly HelloWorldLayer.ctor end");

        return true;
    },

    update:function(dt){
//    	cc.log("hWVwSRIu HelloWorldLayer.update start");
    	
    	this.moleLogic.tick(dt);
    	
    	var i;
    	for(i=0;i<MoleLogicConst.MOLE_COUNT;++i){
    		var type = null;
    		if(this.moleLogic.moleV[i]!=null){
    			type = this.moleLogic.moleV[i].type;
    		}
//    		cc.log("aRWezDle type="+type);
    		this.moleBadSpriteV[i].setVisible(type=="BAD");
    		this.moleGoodSpriteV[i].setVisible(type=="GOOD");
    		this.moleLiveSpriteV[i].setVisible(type=="LIVE");
    		this.moleMissSpriteV[i].setVisible(type=="MISS");
    	}
    	
    	this.scoreLabel.setString(this.moleLogic.score);
    	this.maxScoreLabel.setString(this.moleLogic.maxScore);
    	
//    	cc.log("tEFmPHmD HelloWorldLayer.update end");
    },

    onTouchBegan : function(touch, event) {
    	cc.log("wnVTjigS HelloWorldLayer.onTouchBegan start");
    	
      var pos = touch.getLocation();
      //cc.log("onTouchBegan id="+touch.getID()+" pos="+JSON.stringify(pos));
      if(pos.x<0)return false;
      if(pos.x>=360)return false;
      if(pos.y<0)return false;
      if(pos.y>=360)return false;
      
      var idx = (Math.floor(pos.x/120)*3)+Math.floor(pos.y/120);
      
      event.getCurrentTarget().moleLogic.hit(idx);
      
      return true;
  	}
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

