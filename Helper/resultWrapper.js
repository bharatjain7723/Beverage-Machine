/* 
    A module containing wrappers for api responses
*/

function sendOk(res, data) {
    return res.json({
        status: {
            code: 200,
            message: 'Operation performed successfully'
        },
        data: data
    })
}

function badRequest(res) {
    return res.status(400).json({
        status: {
            code: 400,
            message: 'Operation failed'
        },
        data: {}
    })
}

module.exports = {
    sendOk,
    badRequest
}