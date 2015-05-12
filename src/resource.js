var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    MoleBad_png : "res/mole_bad.png",
    MoleGood_png : "res/mole_good.png",
    MoleLive_png : "res/mole_live.png",
    MoleMiss_png : "res/mole_miss.png",
  	MoleLogic_js : "res/MoleLogic.js",
  	HelloWorldLayer_js : "res/HelloWorldLayer.js"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
