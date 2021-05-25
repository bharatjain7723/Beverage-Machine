const expect = require('expect');
const request = require('supertest');

const { app } = require('../../index');
const Beverage = require('../../Schema/beverage');

const beverages = [
    {
        name: "Black Coffee",
        water: 3,
        coffee: 1,
        sugar: 1,
        milk: 0
    },
    {
        name: "Coffee with Milk",
        water: 1,
        coffee: 1,
        sugar: 1,
        milk: 2
    }
]

beforeEach((done)=>{
    Beverage.deleteMany({}).then(()=>{
        return Beverage.insertMany(beverages);
    }).then(()=>done());
});

describe('POST /api/v1/beverage', ()=>{
    it('should create a new Beverage', (done)=>{
        var bev = {
            name: "Coffee with Milk Sugarless",
            water: 1,
            coffee: 1,
            sugar: 0,
            milk: 2
        }

        var bevId = '';

        request(app)
            .post('/api/v1/beverage')
            .send(bev)
            .expect(200)
            .expect((res)=>{
                expect(res.body.data.name).toBe(bev.name);
                bevId = res.body.data.id;
            })
            .end((err, res)=>{
                if(err){
                    return done(err)
                }

                Beverage.find({_id: bevId}).then((beverages) => {
                    expect(beverages.length).toBe(1);
                    expect(beverages[0].name).toBe(bev.name);
                    done();
                }).catch((e)=>{
                    done(e);
                });
            });
    });

    it('should not create Beverage with invalid body data', (done)=>{
        request(app)
            .post('/api/v1/beverage')
            .send({})
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                Beverage.find().then((beverages)=>{
                    expect(beverages.length).toBe(2);
                    done();
                }).catch((e)=>{
                    done(e);
                });
            });
    });
});

describe('GET /api/v1/beverage', (done)=>{
    it('should get all Beverages', (done)=>{
        request(app)
            .get('/api/v1/beverage')
            .expect(200)
            .expect((res)=>{
                expect(res.body.data.count).toBe(2);
            })
            .end(done);
    });
});