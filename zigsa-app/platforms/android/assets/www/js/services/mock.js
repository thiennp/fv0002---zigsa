AppServices.factory('Mocks', [
    "$rootScope",
    "$http",
    "$q",
    function($rootScope, $http, $q) {
        $rootScope.loading = true;
        var deferred = {};

        // Get assignments list
        var mockData = function(_options, _rootOffset, _offset, _limit) {
            var attr = "item" + Math.random();
            deferred[attr] = $q.defer();
            var str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
            if (!_offset) {
                _offset = 0;
            }
            if (!_limit) {
                _limit = $rootScope.itemPerPage;
            }
            var data = [];
            var start, end, lang;
            for (var i = 0; i < _limit; i++) {
                data[i] = {};
                for (var index in _options) {
                    switch (_options[index]) {
                        case 'id':
                            start = Math.floor(Math.random() * 100);
                            end = start + 30 + Math.floor(Math.random() * 10);
                            data[i][index] = str.substring(start, end).split(" ").join("").split(",").join("").split(".").join("");
                            break;
                        case 'number':
                            data[i][index] = Math.random();
                            break;
                        case 'int':
                            data[i][index] = Math.floor(Math.random() * 1000);
                            break;
                        case 'phone':
                            data[i][index] = "0" + (10000000 + Math.floor(Math.random() * 89999999));
                            break;
                        case 'string':
                            data[i][index] = str.substring(Math.floor(Math.random() * 200), Math.floor(Math.random() * 100 + 100));
                            break;
                        case 'date':
                            data[i][index] = new Date();
                            break;
                        case 'image':
                            data[i][index] = "http://lorempixel.com/640/640/?" + Math.random();
                            break;
                        case 'url':
                            start = Math.floor(Math.random() * 100);
                            end = start + 5 + Math.floor(Math.random() * 10);
                            data[i][index] = "www." + str.substring(start, end).split(" ").join("").split(",").join("").split(".").join("") + ".com";
                            break;
                        case 'email':
                            start = Math.floor(Math.random() * 100);
                            end = start + 5 + Math.floor(Math.random() * 10);
                            data[i][index] = str.substring(start, end).split(" ").join("").split(",").join("").split(".").join("") + "@gmail.com";
                            break;
                        case 'boolean':
                            data[i][index] = Math.floor(Math.random() * 2) === 1;
                            break;
                        case 'ln':
                            lang = ["en", "es", "po"];
                            data[i][index] = lang[Math.floor(Math.random() * 3)];
                            break;
                        case 'language':
                            lang = ["English", "Espanol", "Portuguese"];
                            data[i][index] = lang[Math.floor(Math.random() * 3)];
                            break;
                        case 'name':
                            var firstName = ['Emily', 'James', 'Chloe', 'Jack', 'Charlotte', 'Alex', 'Megan', 'Ben', 'Lauren', 'Daniel', 'Emma', 'Tom', 'Sophie', 'Adam', 'Amy', 'Ryan', 'Hannah', 'Sam', 'Ellie', 'Matthew', 'Katie', 'Thomas', 'Lucy', 'Josh', 'Jessica', 'Jake', 'Rebecca', 'Joe', 'Olivia', 'David', 'Georgia', 'Callum', 'Sarah', 'Luke', 'Laura', 'Harry', 'Holly', 'Liam', 'Beth', 'Lewis', 'Rachel', 'William', 'Caitlin', 'Kieran', 'Bethany', 'Connor', 'Alice', 'Nathan', 'Molly', 'Joshua', 'Shannon', 'Jordan', 'Jess', 'Scott', 'Grace', 'Jamie', 'Abbie', 'George', 'Jade', 'Michael', 'Anna', 'Charlie', 'Zoe', 'Oliver', 'Amber', 'Henry', 'Leah', 'Chris', 'Ella', 'Dan', 'Rosie', 'Joseph', 'Becky', 'Sean', 'Jasmine', 'Cameron', 'Phoebe', 'Matt', 'Kate', 'Ethan', 'Louise', 'John', 'Courtney', 'Max', 'Niamh', 'Kyle', 'Natalie', 'Aaron', 'Mia', 'Andrew', 'Paige', 'Jacob', 'Erin', 'Dylan', 'Katy', 'Reece', 'Eleanor', 'Richard', 'Lydia', 'Will', 'Lily', 'Jason', 'Kirsty', 'Mark', 'Nicole', 'Jay', 'Danielle', 'Stephen', 'Elizabeth', 'Paul', 'Kayleigh', 'Edward', 'Gemma', 'Robert', 'Charlie', 'Tyler', 'Natasha', 'Declan', 'Daisy', 'Anthony', 'Melissa', 'Owen', 'Eve', 'Morgan', 'Chelsea', 'Rhys', 'Bethan', 'Jonathan', 'Jodie', 'Peter', 'Heather', 'Ross', 'Amelia', 'Craig', 'Georgina', 'Kian', 'Rachael', 'Brandon', 'Samantha', 'Nick', 'Freya', 'Samuel', 'Aimee', 'Patrick', 'Libby', 'Tommy', 'Ruby', 'Shaun', 'Alex', 'Robbie', 'Victoria', 'Harrison', 'Helen', 'Bradley', 'Naomi', 'Finlay', 'Izzy', 'Lee', 'Milly', 'Oscar', 'Abigail', 'Marcus', 'Stephanie', 'Marc', 'Abi', 'Alfie', 'Tia', 'Louis', 'Robyn', 'Aidan', 'Rhiannon', 'Nathaniel', 'Poppy', 'Rob', 'Harriet', 'Kane', 'Ashleigh', 'Billy', 'Catherine', 'Karl', 'Jennifer', 'Mike', 'Ellen', 'Alexander', 'Millie', 'Simon', 'Mollie', 'Finn', 'Rose', 'Harvey', 'Abby', 'Bailey', 'Mary', 'Kai', 'Isabella', 'Gabriel', 'Imogen', 'Jonny', 'Francesca', 'Sammy'];
                            var surName = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz'];
                            data[i][index] = firstName[Math.floor(Math.random()*firstName.length)]+' '+surName[Math.floor(Math.random()*surName.length)];
                            break;
                    }

                }
            }
            deferred[attr].resolve(data);
            $rootScope[_rootOffset] = _offset + _limit;
            return deferred[attr].promise;
        };

        return {
            mockData: mockData
        };
    }
]);