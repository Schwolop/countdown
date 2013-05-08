// JavaScript Document

	// Constants
	var SECOND = 1;
	var MINUTE = 60 * SECOND;
	var HOUR = 60 * MINUTE;
	var DAY = 24 * HOUR;

	//initial time
	var d1_current = -1;
	var d2_current = -1;
	var d3_current = -1;
	var h1_current = -1;
	var h2_current = -1;
	var m1_current = -1;
	var m2_current = -1;
	var s1_current = -1;
	var s2_current= -1;
	var target_date = new Date("Fri, 17 May 2013 17:00:00 GMT+1000");
	var target = target_date.getTime();
	var now;


	function flip (upperId, lowerId, changeNumber, pathUpper, pathLower){
		var upperBackId = upperId+"Back";
		$(upperId).src = $(upperBackId).src;
		$(upperId).setStyle("height", "64px");
		$(upperId).setStyle("visibility", "visible");
		$(upperBackId).src = pathUpper+parseInt(changeNumber)+".png";
		
		$(lowerId).src = pathLower+parseInt(changeNumber)+".png";
		$(lowerId).setStyle("height", "0px");
		$(lowerId).setStyle("visibility", "visible");
		
		var flipUpper = new Fx.Tween(upperId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
		flipUpper.addEvents({
			'complete': function(){
				var flipLower = new Fx.Tween(lowerId, {duration: 200, transition: Fx.Transitions.Sine.easeInOut});
				flipLower.addEvents({
					'complete': function(){	
						lowerBackId = lowerId+"Back";
						$(lowerBackId).src = $(lowerId).src;
						$(lowerId).setStyle("visibility", "hidden");
						$(upperId).setStyle("visibility", "hidden");
					}
				});					
				flipLower.start('height', 64);
			}
		});
		flipUpper.start('height', 0);
		
		
	}//flip
				
	
	function retroClock(){
		
		// get new time
		now = new Date();
		difference = ((target - now.getTime()) / 1000);

		if( difference >= 0 ) {

			diff_days = Math.floor(difference / DAY);
			diff_days_left = Math.floor(diff_days / 100);
			diff_days_middle = Math.floor((diff_days % 100) / 10);
			diff_days_right = Math.floor((diff_days % 100) % 10);
			diff_hours = Math.floor((difference - (diff_days * DAY)) / HOUR);
			diff_hours_left = Math.floor(diff_hours / 10);
			diff_hours_right = Math.floor(diff_hours % 10);
			diff_mins = Math.floor((difference - (diff_days * DAY) - (diff_hours * HOUR)) / MINUTE);
			diff_mins_left = Math.floor(diff_mins / 10);
			diff_mins_right = Math.floor(diff_mins % 10);
			diff_secs = Math.floor((difference - (diff_days * DAY) - (diff_hours * HOUR) - (diff_mins * MINUTE)) / SECOND);
			diff_secs_left = Math.floor(diff_secs / 10);
			diff_secs_right = Math.floor(diff_secs % 10);

			//change pads

			if( diff_days_right != d3_current ){
				flip('daysUpRight', 'daysDownRight', diff_days_right, 'Triple/Up/Right/', 'Triple/Down/Right/');
				d3_current = diff_days_right;

				flip('daysUpMiddle', 'daysDownMiddle', diff_days_middle, 'Triple/Up/Middle/', 'Triple/Down/Middle/');
				d2_current = diff_days_middle;

				flip('daysUpLeft', 'daysDownLeft', diff_days_left, 'Triple/Up/Left/', 'Triple/Down/Left/');
				d1_current = diff_days_left;
			}

			if( diff_hours_right != h2_current ){
				flip('hoursUpRight', 'hoursDownRight', diff_hours_right, 'Double/Up/Right/', 'Double/Down/Right/');
				h2_current = diff_hours_right;

				flip('hoursUpLeft', 'hoursDownLeft', diff_hours_left, 'Double/Up/Left/', 'Double/Down/Left/');
				h1_current = diff_hours_right;
			}

			if( diff_mins_right != m2_current ){
				flip('minutesUpRight', 'minutesDownRight', diff_mins_right, 'Double/Up/Right/', 'Double/Down/Right/');
				m2_current = diff_mins_right;

				flip('minutesUpLeft', 'minutesDownLeft', diff_mins_left, 'Double/Up/Left/', 'Double/Down/Left/');
				m1_current = diff_mins_left;
			}

			if (diff_secs_right != s2_current ){
				flip('secondsUpRight', 'secondsDownRight', diff_secs_right, 'Double/Up/Right/', 'Double/Down/Right/');
				s2_current = diff_secs_right;

				flip('secondsUpLeft', 'secondsDownLeft', diff_secs_left, 'Double/Up/Left/', 'Double/Down/Left/');
				s1_current = diff_secs_left;
			}

			updateTitle(diff_days, diff_hours, diff_mins, diff_secs);
		}
	}

	function updateTitle(days, hours, mins, secs) {
		if( days == 1 ) {
			days = "1 day";
		} else if( days == 0 ) {
			days = "";
		} else {
			days = days + " days";
		}

		if( hours == 1 ) {
			hours = "1 hour";
		} else if( hours == 0 ) {
			hours = "";
		} else {
			hours = hours + " hours";
		}

		if( mins == 1 ) {
			mins = "1 minute";
		} else if( mins == 0 ) {
			mins = "";
		} else {
			mins = mins + " minutes";
		}

		if( secs == 1 ) {
			secs = "1 second";
		} else if( secs == 0 ) {
			secs = "";
		} else {
			secs = secs + " seconds";
		}

		if( days != "" && hours != "" )
			hours = ", " + hours;

		if( (days != "" || hours != "") && mins != "" )
			mins = ", " + mins;

		if( (days != "" || hours != "" || mins != "") && secs != "" )
			secs = ", " + secs;

		secs = secs + ".";
			

		document.title = days + hours + mins + secs;
	}
	
	setInterval('retroClock()', 1000);
