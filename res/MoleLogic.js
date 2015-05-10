var MoleLogicConst = {
	MOLE_COUNT : 9,
	GOOD_SCORE : 1,
	BAD_SCORE : -10,
	MISS_SCORE : -5,
};

MoleCommon.MoleLogicConst = MoleLogicConst;

function MoleLogic(){

	this.score = 0;
	this.maxScore = 0;
	this.time = 0;
	this.nextMoleTime = 0;

	this.moleV = [];
	{
		var i;
		for(i=0;i<MoleLogicConst.MOLE_COUNT;++i){
			this.moleV.push(null);
		}
	}
	
	this.tick = function(sec){
//		cc.log("smJyKDSI MoleLogic.tick start "+sec);
		
		var i;
		
		this.time += sec;
		
		// check mole dead
		for(i=0;i<this.moleV.length;++i){
			if(this.moleV[i]==null)continue;
			if(this.moleV[i].dead>this.time)continue;
			
			if(this.moleV[i].type=="LIVE"){
				this.moleV[i].type = "MISS";
				this.moleV[i].dead += this.moleV[i].period;
				this.addScore(MoleLogicConst.MISS_SCORE);
			}else{
				this.moleV[i]=null;
			}
		}
		
//		cc.log("ZRsMcGhz time "+this.time);
//		cc.log("xWoHTJyO nextMoleTime "+this.nextMoleTime);

		// add mole
		while(true){
			var good=false;
			good = good || (this.nextMoleTime<=this.time);

			var emptyMole=this.getEmptyMoleV();
			good = good || (emptyMole.length>7);
			good = good && (emptyMole.length>0);

			if(!good)break;
			
			var molePeriod = this.getMolePeriod();
//			cc.log("WQRoCoOK molePeriod="+molePeriod);
			
			var moleIdx=emptyMole[Math.floor(Math.random()*emptyMole.length)];
			this.moleV[moleIdx]={
				type : "LIVE",
				dead : this.time+(molePeriod*4),
				period : molePeriod
			};
			
			this.nextMoleTime+=molePeriod;
		}
		
//		cc.log("YujRadIK MoleLogic.tick end");
	}
	
	this.hit = function(idx){
		cc.log("kEhmbTyr MoleLogic.hit "+idx);
		var molePeriod = this.getMolePeriod();
		if(this.moleV[idx]==null){
			this.moleV[idx]={
				type : "BAD",
				dead : this.time + molePeriod,
				period : molePeriod
			};
			this.addScore(MoleLogicConst.BAD_SCORE);
			return;
		}
		cc.log("UYNXRsOr this.moleV[idx] "+this.moleV[idx].type);
		if(this.moleV[idx].type=="LIVE"){
			this.moleV[idx].type = "GOOD";
			this.moleV[idx].dead = this.time + molePeriod;
			this.addScore(MoleLogicConst.GOOD_SCORE);
			return;
		}
	}
	
	this.getMolePeriod = function(){
		return 0.5*Math.pow(50/15,0.25)/Math.pow(50/15+this.score,0.25);
	}
	
	this.getEmptyMoleV = function(){
		var i;
		var ret=[];
		for(i=0;i<this.moleV.length;++i){
			if(this.moleV[i]!=null)continue;
			ret.push(i);
		}
		return ret;
	}
	
	this.addScore = function(s){
		this.score += s;
		if(this.score<0)this.score=0;
		if(this.maxScore<this.score)this.maxScore=this.score;
	}
	
}
