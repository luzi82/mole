var MoleCommon = {};

function moleCommonMain(){
	var cppTest = cc.CppTest.create();
	cc.log(cppTest.helloMsg());

	var tmp;
	eval(jsb.fileUtils.getStringFromFile(res.HelloWorldLayer_js));
	eval(jsb.fileUtils.getStringFromFile(res.MoleLogic_js));

  cc.LoaderScene.preload(g_resources, function () {
    cc.director.runScene(new MoleCommon.HelloWorldScene());
	}, this);
}
