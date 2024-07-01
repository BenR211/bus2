import express from 'express';

const app = express();

const port = 3000;

app.get('/', (req,res) =>{
    res.send("Hello I am your express server :)");
    const name: string = req.query.name as string;
    fetchWithAwait(name);

});

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
})


async function fetchWithAwait(stopID : string): Promise<void> {
    const  myUrl : string = "https://api.tfl.gov.uk/StopPoint/" + stopID + "/Arrivals";
    const response = await fetch(myUrl);
    const data = await response.json();
    // deal with JSON response
    console.log(stopID);
  }
