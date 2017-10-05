// Constructor function for the 'Basic Card'.
function BasicCard(front, back) {
	
	//Convert the incoming strings to lower case
	var frontToLower = front.toLowerCase();
	var basicToLower = back.toLowerCase();

    this.front = front;
    this.back = back;

};

module.exports = BasicCard;