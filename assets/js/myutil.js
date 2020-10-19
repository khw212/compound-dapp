
function addOptionsToSelect(allselects, alltokens) {
	for (var j=0;j<allselects.length; j++) {
		var selectList = document.getElementById(allselects[j]);
		for (var i = 0; i < alltokens.length; i++) {
		    var option = document.createElement("option");
		    option.value = alltokens[i];
		    option.text = alltokens[i];
		    selectList.appendChild(option);
		}						
	}					
}

function withImage(symbol) {
	//add img to symbol
	newsym=symbol;
	if (symbol.charAt(0)=='c') { //convert cETH to ETH
		newsym = symbol.substring(1);
	}
	return '<img src="/images/asset_'+newsym+'.svg" width="30" style="vertical-align:middle">&nbsp;'+newsym;
}

function tableAddRow(elementId, inputArr) {			  	
	//insert row to table by elementId
	//each inputArr is a column
	var table = elementId.getElementsByTagName('tbody')[0];
	var row = table.insertRow(0);
	for (i=0;i<inputArr.length;i++) {
		var cell = row.insertCell(i);
		cell.innerHTML = inputArr[i];
	}		      		
}

function mathr(val, precision) {
	//math rounding
	if (precision>0) {
		var mul = precision*10;
		return Math.round(val*mul)/mul;	
	} else {
		return Math.round(val);
	}			  	
}

function showTokenMarket(supplyAPY, borrowAPY) { //APY, collateral, total
	(async function() {
	  const cData = await Compound.api.cToken();
	  if (Object.isExtensible(cData) && cData.cToken) {
	    cData.cToken.forEach((tok) => {
	    	collateral_factor = tok.collateral_factor.value;
	    	total_borrows = tok.total_borrows.value;					    	
	    	total_supply = tok.total_supply.value;
	    	underlying_symbol = withImage(tok.underlying_symbol);
	    	borrow_rate = tok.borrow_rate.value;
	    	supply_rate = tok.supply_rate.value; 
	    	
	    	if (supply_rate>0.001) {
	    		var inputarr = [underlying_symbol, mathr(supply_rate*100,2)+'%', mathr(collateral_factor*100,0)+'%', mathr(total_supply/1000000, 0)+'M'];
	    		tableAddRow(supplyAPY, inputarr);	
	    	}

	    	if (borrow_rate>0.001) {
	    		var inputarr = [underlying_symbol, mathr(borrow_rate*100,2)+'%', mathr(collateral_factor*100,0)+'%', mathr(total_borrows/1000000, 0)+'M'];
	    		tableAddRow(borrowAPY, inputarr);	
	    	}
	    });						    
	  }
	  console.log('cData', cData);
	})().catch(console.error);
}	  
 
