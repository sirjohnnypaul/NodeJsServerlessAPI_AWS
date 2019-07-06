module.exports.jobhandler=async(evt, ctx) => {
    console.log('context',ctx);
    return {
        statusCode:200,
        body: JSON.stringify({
            name: 'Node js Developer',
            evt
        })
    }  
}