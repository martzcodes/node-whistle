var https = require('https');

exports.getToken = function(email, password, callback) {
    var post_data = {
        "email": email,
        "password": password
    };

    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/tokens.json',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset = UTF - 8',
            'Content-Length': JSON.stringify(post_data).length,
        }
    };

    httpsPostRequest(post_data, options, function(data) {
        callback(JSON.parse(data).token);
    });
};

exports.getUsers = function(token, callback) {
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/users',
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(JSON.parse(data));
        /*
    		Expect an object like:
			{
				"name": "",
				"first_name": "",
				"last_name": "",
				"email": "",
				"current_user": true,
				"profile_photo_url": null,
				"profile_photo_url_sizes": {
					"25x25": null,
					"33x33": null,
					"50x50": null,
					"66x66": null,
					"120x120": null,
					"240x240": null
				},
				"realtime_channel": {
					"service": "Pusher",
					"channel": ""
				},
				"has_unread_notifications": true
			}
    	*/
    });
};

exports.getDogs = function(token, callback) {
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs.json',
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(JSON.parse(data));
        /*
    		Of Note:  device_id
    		Expect an object like:
			[{
				"id": "",
				"city_id": "",
				"date_of_birth": "",
				"gender": "",
				"name": "",
				"default_followed_dog": false,
				"realtime_channel": {
					"service": "",
					"channel": ""
				},
				"weight": 60.0,
				"breed_name": "Other Mix",
				"photo_url": "",
				"photo_url_sizes": {
					"30x30": "",
					"60x60": "",
					"640x1136": "",
					"640x960": "",
					"320x480": "",
					"640x1136_blur": "",
					"640x960_blur": "",
					"320x480_blur": ""
				},
				"location": "",
				"profile_photo_url": "",
				"profile_photo_url_sizes": {
					"30x30": "",
					"60x60": "",
					"166x166": "",
					"332x332": ""
				},
				"relationship": "owner",
				"relationship_details": {
					"pending": false,
					"owner": true
				},
				"owners": [{
					"id": "2595",
					"first_name": "",
					"last_name": "",
					"profile_photo_url_sizes": {
						"33x33": null,
						"66x66": null
					},
					"friendship": null
				}],
				"device_id": "",
				"device_serial": "",
				"current_activity_goal": {
					"minutes": 30,
					"started_at": "2014-10-24T00:00:00-04:00 America/New_York"
				},
				"suggested_activity_range_lower": 67.0,
				"suggested_activity_range_upper": 107.0
			}]
    	*/
    });
};

exports.getDevice = function(token, deviceid, callback) {
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/devices/' + deviceid + '.json',
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(JSON.parse(data));
        /*
    		Expect an object like:
			{
				"serial_number": "",
				"firmware_version": "1.2-131212 :: 3.0-140321 :: 4.19-140428-a",
				"battery_level": 71.84897826282337,
				"last_check_in": "2014-10-25T08:21:48-04:00 America/New_York",
				"next_check_in": "2014-10-25T09:21:48-04:00 America/New_York",
				"bluetooth_mac": "",
				"wifi_mac": "",
				"battery_days_left": 5.324759319328048
			}
    	*/
    });
};

exports.getDailies = function(token, dogid, numberofdailies, callback) {
    if (!numberofdailies) numberofdailies = 30;
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/' + dogid + '/dailies?count=' + numberofdailies,
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(JSON.parse(data));
        /*
    		Expect an object like:
			[
				{
					"updated_at": "2014-10-25T12:35:54Z",
					"timestamp": "2014-10-25T00:00:00-04:00 America/New_York",
					"minutes_active": 0,
					"activity_goal": 30,
					"day_number": 16368
				},
				... times number of dailies
			]
    	*/
    });
};

exports.getDay = function(token, dogid, dayid, callback) {
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/' + dogid + '/dailies/' + dayid,
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(JSON.parse(data));
        /*
    		Expect an object like:
			[
				{
					"updated_at": "2014-10-25T12:35:54Z",
					"timestamp": "2014-10-25T00:00:00-04:00 America/New_York",
					"minutes_active": 0,
					"activity_goal": 30,
					"day_number": 16368
				},
				... times number of dailies
			]
    	*/
    });
};

exports.getRelationships = function(token, dogid, callback) {
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/' + dogid + '/relationships',
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(JSON.parse(data));
    });
};

exports.getTrends = function(token, dogid, trenddate, callback) {
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/' + dogid + '/trends?date=' + trenddate,
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(JSON.parse(data));
        /*
			Expect an object like:
			{ days:
			   { '2014-10-20T00:00:00-04:00':
			      { total_minutes_active: 0,
			        total_minutes_rest: 0,
			        activity_goal: 30 },
			     '2014-10-21T00:00:00-04:00':
			      { total_minutes_active: 0,
			        total_minutes_rest: 0,
			        activity_goal: 30 },
			     '2014-10-22T00:00:00-04:00':
			      { total_minutes_active: 0,
			        total_minutes_rest: 0,
			        activity_goal: 30 },
			     '2014-10-23T00:00:00-04:00':
			      { total_minutes_active: 0,
			        total_minutes_rest: 57,
			        activity_goal: 30 },
			     '2014-10-24T00:00:00-04:00':
			      { total_minutes_active: 76,
			        total_minutes_rest: 683,
			        activity_goal: 30 },
			     '2014-10-25T00:00:00-04:00':
			      { total_minutes_active: null,
			        total_minutes_rest: null,
			        activity_goal: 30 },
			     '2014-10-26T00:00:00-04:00':
			      { total_minutes_active: null,
			        total_minutes_rest: null,
			        activity_goal: 30 } },
			  number_days_goal_reached: 1,
			  overall_activity_percent_change: 1.92,
			  overall_rest_percent_change: -19.73,
			  similar_dogs_minutes_rest: 883.637657279808,
			  similar_dogs_minutes_active: 98.4212670872765,
			  similar_dogs_rest_percent_difference: -22.71,
			  similar_dogs_activity_percent_difference: -22.78,
			  historical_average_minutes_rest: 850.928571428571,
			  historical_average_minutes_active: 74.5714285714286,
			  current_average_minutes_rest: 683,
			  current_average_minutes_active: 76,
			  average_minutes_rest: 850.928571428571,
			  average_minutes_active: 74.5714285714286,
			  total_minutes_rest: 683,
			  total_minutes_active: 76,
			  next_week_valid: false,
			  previous_week_valid: true }
    	*/
    });
};

exports.getMetrics = function(token, dogid, metricdate, callback) {
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/' + dogid + '/metrics?date=' + metricdate + '&id=' + dogid,
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(JSON.parse(data));
        /*
			Expect an object like:
			{ date: '2014-10-24T00:00:00-04:00',
			  summary: { total_minutes_active: 76, total_minutes_rest: 683 },
			  events:
			   [ { id: '4766387',
			       timeline_id: 'e4766387',
			       start_time: '2014-10-24T07:05:48-04:00 America/New_York',
			       end_time: '2014-10-24T07:13:48-04:00 America/New_York',
			       event_type: 'Walk',
			       event_title: '5 minutes',
			       event_details: null,
			       intensity: 'moderate',
			       minutes_active: 5,
			       manually_created: false,
			       share_url: 'http://whi.st/s/lrofef',
			       can_destroy: false,
			       users: [],
			       current_user_present: false,
			       path: null,
			       likes_count: 0,
			       liked: false,
			       comments: [],
			       comments_count: 0 },
			     ...
			     { id: '',
			       timeline_id: '',
			       start_time: '2014-10-24T23:59:59-04:00 America/New_York',
			       end_time: '2014-10-24T23:59:59-04:00 America/New_York',
			       event_title: 'Way to go, Astro!',
			       event_details: 'Friday was Astro\'s most active day over the past month.',
			       event_type: 'Insight',
			       event_subtype: 'most_active_day_last_30_days',
			       share_url: '',
			       can_destroy: false,
			       url: 'whistle://dog/(dognumber)',
			       likes_count: 0,
			       liked: false,
			       created_at: '2014-10-25T16:00:51Z' } ],
			  point_entries:
			   [ { timestamp: '2014-10-24T00:00:00-04:00', measurement: 0 },
			     { timestamp: '2014-10-24T00:30:00-04:00',
			       measurement: 8.849121094000001 },
			     ...
			     { timestamp: '2014-10-25T00:00:00-04:00',
			       measurement: 780.110351565 } ],
			  activity_goal:
			   { minutes: 30,
			     started_at: '2014-10-24T00:00:00-04:00 America/New_York' } }
    	*/
    });
};

exports.getTimeline = function(token, timelineid, callback) {
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/timeline/' + timelineid,
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(data);
        /*
    		Expect an object like:
    			{
				    "id": "",
				    "timeline_id": "",
				    "start_time": "2014-10-24T07:05:48-04:00 America/New_York",
				    "end_time": "2014-10-24T07:13:48-04:00 America/New_York",
				    "event_type": "Walk",
				    "event_title": "5 minutes",
				    "event_details": null,
				    "intensity": "moderate",
				    "minutes_active": 5,
				    "manually_created": false,
				    "share_url": "",
				    "can_destroy": false,
				    "users": [],
				    "current_user_present": false,
				    "path": null,
				    "likes_count": 0,
				    "liked": false,
				    "comments": [],
				    "comments_count": 0
				}
    	*/
    });
};

exports.getHighlights = function(token, dogid, highlight, callback) {
    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/'+dogid+'/highlights?type='+highlight,
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };

    httpsGetRequest(options, function(data) {
        callback(data);
    });
};

exports.getUserPresent = function(token, dogid, start, callback) {

    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/'+dogid+'/stats/users_present',//?start_time=2014-10-17',
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };
    if (start) {
		options.path += '?start_time='+start;	
	}

    httpsGetRequest(options, function(data) {
        callback(data);
    });
};

exports.getGoals = function(token, dogid, start, callback) {

    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/'+dogid+'/stats/goals',//?start_time=2014-10-17',
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };
    if (start) {
		options.path += '?start_time='+start;	
	}

    httpsGetRequest(options, function(data) {
        callback(data);
    });
};

exports.getAverages = function(token, dogid, start, callback) {

    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/'+dogid+'/stats/averages',//?start_time=2014-10-17',
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };
    if (start) {
		options.path += '?start_time='+start;	
	}

    httpsGetRequest(options, function(data) {
        callback(data);
    });
};

exports.getDailyTotals = function(token, dogid, start, callback) {

    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/'+dogid+'/stats/daily_totals',//?start_time=2014-10-17',
        method: 'GET',
        headers: {
            'X-Whistle-AuthToken': token
        }
    };
    if (start) {
		options.path += '?start_time='+start;	
	}

    httpsGetRequest(options, function(data) {
        callback(data);
    });
};

exports.postHighlight = function(token, dogid, highlight, callback) {
	/*
		highlight is in the format:
		{
            "highlight_type": 'note or food or medication',
            "photos": [],
            "text": 'text...'
        }
	*/

    var d = Date.now();
    //2014-10-25 12:57:47.471000000 America/New_York
    var timestamp = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " "
    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ".000000000 America/New_York";

    highlight.timestamp = timestamp;
    
    var post_data = {
        "highlight": highlight
    };

    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/'+dogid+'/highlights',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset = UTF - 8',
            'Content-Length': JSON.stringify(post_data).length,
        }
    };

    httpsPostRequest(post_data, options, function(data) {
        callback(JSON.parse(data).token);
    });
};

exports.postComment = function(token, eventid, comment, callback) {
	/*
		comment is in the format:
		{
            "photos": [],
            "text": 'text...'
        }
	*/
    var post_data = {
        "comment": comment
    };

    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/timeline/'+eventid+'/comments',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset = UTF - 8',
            'Content-Length': JSON.stringify(post_data).length,
        }
    };

    httpsPostRequest(post_data, options, function(data) {
        callback(JSON.parse(data).token);
    });
};

exports.postGoals = function(token, dogid, minutes, callback) {
    var post_data = {
        "minutes":minutes
    };

    var options = {
        host: 'app.whistle.com',
        port: 443,
        path: '/api/dogs/'+dogid+'/activity_goals',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset = UTF - 8',
            'Content-Length': JSON.stringify(post_data).length,
        }
    };

    httpsPostRequest(post_data, options, function(data) {
        callback(JSON.parse(data).token);
    });
};

var httpsGetRequest = function(options, callback) {
    var req = https.request(options, function(res) {
        console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);
        var datastring = '';

        res.on('data', function(d) {
            datastring += d;
        });

        res.on('end', function() {
            callback(datastring);
        });
    });
    req.end();

    req.on('error', function(e) {
        callback(e);
    });
};

var httpsPostRequest = function(post_data, options, callback) {
    var req = https.request(options, function(res) {
        console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);
        var datastring = '';

        res.on('data', function(d) {
            datastring += d;
        });

        res.on('end', function() {
            callback(datastring);
        });
    });
    req.write(JSON.stringify(post_data));
    req.end();

    req.on('error', function(e) {
        callback(e);
    });
};
