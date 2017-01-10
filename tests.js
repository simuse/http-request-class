/**
 * Endpoints
 */
let b = 'https://reqres.in';
let r = {
    get: {
        list: '/api/users?page=2',
        single: '/api/users/2',
        singleNotFound: '/api/users/23',
        delayed: '/api/users?delay=3',
    },
    post: {
        create: '/api/users',
    }
};

let postData = {
    "name": "morpheus",
    "job": "leader"
};

/**
 * Tests
 */
let request = new Request();

request.debug = true;
request.format = 'xml';

request.get('https://www.reddit.com/r/pics.xml')
    .then((data) => console.log())
    .catch((error) => console.log());

// GET
// r.get.forEach(function (item, data) {
//     request.get(b + item)
//         .then((data) => console.log())
//         .catch((error) => console.log());
// });
//
// // POST
// r.post.forEach(function (item, data) {
//     request.post(b + item, postData)
//         .then((data) => console.log())
//         .catch((error) => console.log());
// });
