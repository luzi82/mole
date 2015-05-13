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
		
		// check mole dead
		for(i=0;i<this.moleV.length;++i){
			if(this.moleV[i]==null)continue;
			
			this.moleV[i].lifetime -= sec;
			
			if(this.moleV[i].lifetime > 0)continue;
			
			if(this.moleV[i].type=="LIVE"){
				this.moleV[i].type = "MISS";
				this.moleV[i].lifetime += this.moleV[i].period;
				this.addScore(MoleLogicConst.MISS_SCORE);
			}else{
				this.moleV[i]=null;
			}
		}
		
//		cc.log("ZRsMcGhz time "+this.time);
//		cc.log("xWoHTJyO nextMoleTime "+this.nextMoleTime);
		this.nextMoleTime -= sec;

		// add mole
		while(true){
			var good=false;
			good = good || (this.nextMoleTime<0);

			good = good || (this.getLiveMoleCount()<3);

			var emptyMole=this.getEmptyMoleV();
			good = good && (emptyMole.length>=2);

			if(!good)break;
			
			var molePeriod = this.getMolePeriod();
//			cc.log("WQRoCoOK molePeriod="+molePeriod);
			
			var moleIdx=emptyMole[Math.floor(Math.random()*emptyMole.length)];
			this.moleV[moleIdx]={
				type : "LIVE",
				lifetime : molePeriod*4,
				period : molePeriod
			};
			
			if(this.nextMoleTime<0){
				this.nextMoleTime+=molePeriod;
			}else{
				this.nextMoleTime=molePeriod;
			}
		}
		
//		cc.log("YujRadIK MoleLogic.tick end");
	}
	
	this.hit = function(idx){
		// cc.log("kEhmbTyr MoleLogic.hit "+idx);
		var molePeriod = this.getMolePeriod();
		if(this.moleV[idx]==null){
			this.moleV[idx]={
				type : "BAD",
				lifetime : molePeriod,
				period : molePeriod
			};
			this.addScore(MoleLogicConst.BAD_SCORE);
			return;
		}
		// cc.log("UYNXRsOr this.moleV[idx] "+this.moleV[idx].type);
		if(this.moleV[idx].type=="LIVE"){
			this.moleV[idx].type = "GOOD";
			this.moleV[idx].lifetime = this.moleV[idx].period;
			this.addScore(MoleLogicConst.GOOD_SCORE);
			return;
		}
	}
	
	this.getMolePeriod = function(){
		return 0.5*Math.pow(50/15,0.25)/Math.pow(50/15+this.score,0.25);
		//return Math.pow(25/(6*this.score+100),0.5);
	}
	
	this.getLiveMoleCount = function(){
		var ret=0;
		for(i=0;i<this.moleV.length;++i){
			if(this.moleV[i]==null)continue;
			if(this.moleV[i].type=="LIVE")++ret;
		}
		return ret;
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
