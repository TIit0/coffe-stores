
const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);


const table = base('coffe-stores');

console.log({table})

export default function createCoffeStore(req, res) {
    console.log({req})
    
    if (req.method === "POST") {
        res.json({message: "Hi"})
    } else {
        res.json({message: "method is get"});
    }

}