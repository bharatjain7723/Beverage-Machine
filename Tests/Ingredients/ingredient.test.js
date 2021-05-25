const expect = require('expect');
const request = require('supertest');

const { app } = require('../../index');
const Ingredient = require('../../Schema/ingredient');

const ingredients = [
    {
        name: "Coffee",
        units: 10
    },
    {
        name: "Water",
        units: 10
    }
]

beforeEach((done)=>{
    Ingredient.deleteMany({}).then(()=>{
        return Ingredient.insertMany(ingredients);
    }).then(()=>done());
});

describe('POST /api/v1/ingredient', ()=>{
    it('should create a new Ingredient', (done)=>{
        var ing = {
            name: "Coffee",
            units: 30
        }

        var ingId = '';

        request(app)
            .post('/api/v1/ingredient')
            .send(ing)
            .expect(200)
            .expect((res)=>{
                expect(res.body.data.name).toBe(ing.name);
                ingId = res.body.data.id;
            })
            .end((err, res)=>{
                if(err){
                    return done(err)
                }

                Ingredient.find({_id: ingId}).then((ingredients) => {
                    expect(ingredients.length).toBe(1);
                    expect(ingredients[0].name).toBe(ing.name);
                    done();
                }).catch((e)=>{
                    done(e);
                });
            });
    });

    it('should not create Ingedient with invalid body data', (done)=>{
        request(app)
            .post('/api/v1/ingredient')
            .send({})
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }

                Ingredient.find().then((ingredients)=>{
                    expect(ingredients.length).toBe(2);
                    done();
                }).catch((e)=>{
                    done(e);
                });
            });
    });
});

describe('GET /api/v1/ingredient', (done)=>{
    it('should get all ingredients', (done)=>{
        request(app)
            .get('/api/v1/ingredient')
            .expect(200)
            .expect((res)=>{
                expect(res.body.data.count).toBe(2);
            })
            .end(done);
    });
});