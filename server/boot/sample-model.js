module.exports = function(app) {

	var User = app.models.user;
	var Role = app.models.Role;
  	var RoleMapping = app.models.RoleMapping;

	var Place = app.models.place;
	var StickerSheet = app.models.stickerSheet;
	

	// CREATE SOME START UP DATA
	
	var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

	// Create the users
	User.create([
		{email: 'wadebekker@gmail.com', password: 'admin', emailVerified: true, hasAccess: true }, // Admin 
	    {email: 'john@doe.com', password: 'opensesame', emailVerified: true }, // Normal user
	    {email: 'jane@doe.com', password: 'opensesame', emailVerified: true }, // Normal user
	    {email: 'bob@projects.com', password: 'opensesame', emailVerified: true } // Normal user
	  ], function(err, users) {
	    if (err) throw err;

	    console.log('Created users:', users);


	    // Create the places (coffee shops)
		Place.create([
			{name: 'Seattle - Canal Walk'},
			{name: 'Seattle - Cavendish Square'},
		    {name: 'Seattle - Constantia'},
		    {name: 'Seattle - Kenilworth'},
		    {name: 'Seattle - V&A Waterfront'}
		], function(err, places) {
		    if (err) return debug('%j', err);
			console.log(err);
			console.log(places);

			// Create the sticker sheets
			StickerSheet.create([
				{
					date: Date.now() - (DAY_IN_MILLISECONDS * 4),
					count: 7,
					publisherId: users[1].id,
					placeId: places[1].id,
				},
				{
					date: Date.now() - (DAY_IN_MILLISECONDS * 4),
					count: 1,
					publisherId: users[2].id,
					placeId: places[1].id,
				},
				{
					date: Date.now() - (DAY_IN_MILLISECONDS * 4),
					count: 3,
					publisherId: users[3].id,
					placeId: places[1].id,
				},
			], function(err, stickersheets) {
			    if (err) return debug('%j', err);
				console.log(err);
				console.log(stickersheets);

				//create the admin role
				Role.create({
					name: 'admin'
				}, function(err, role) {
					if (err) throw err;

					console.log(err);

					console.log('Created role:', role);

					//make bob an admin
					role.principals.create({
						principalType: RoleMapping.USER,
						principalId: users[0].id
					}, function(err, principal) {
						if (err) throw err;

						console.log(err);

						console.log('Created principal:', principal);
					});
				});
			});
		});

	});

};

