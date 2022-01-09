let chai = require('chai'); // require chai
let server = require('../app'); // require the server
let chaiHttp = require('chai-http');
const { response } = require('../app');
//Define assertion style:
chai.should();
chai.use(chaiHttp); // This allows to call the API through HTTP protocol

describe('Deleting Tasks',() => {
    
    //test the get route
    describe("GET /entries", () => {
        it("It should get all the entries", (done) => {
            chai.request(server)
                .get("/entries")
                .end((err, res) => {
                    response.should.have.status(200);

                });
        });
    });


});
