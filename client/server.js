const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 9000;

const mongoose = require('mongoose');

app.use(cors()); 

mongoose.connect('mongodb://127.0.0.1:27017/BRB').then(() => console.log('Connected to MongoDB!'));

async function fetchTrendingRepos(language = '', since = 'daily') {
  const url = `https://github.com/trending?${language ? `language=${language}` : ''}${since ? `&since=${since}` : ''}`;

  try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const trendingRepos = [];
      $('article.Box-row').each((i, element) => {
          if (i >= 6) return false; // Limit to 6 repositories
          
          const name = $(element).find('h2 a').text().trim().replace(/\n/g, '').replace(/\s+/g, ' ');
          const description = $(element).find('p.col-9').text().trim();
          const stars = $(element).find('a[href*="/stargazers"]').text().trim();
          const language = $(element).find('span[itemprop="programmingLanguage"]').text().trim();
          const url = $(element).find('h2 a').attr('href');

          trendingRepos.push({
              "name": name,
              "description": description,
              "stars": stars,
              "language": language,
              "url": `https://github.com/${url}`
          });
      });

      return trendingRepos;
  } catch (error) {
      console.error('Error fetching trending repositories:', error);
      throw error;
  }
}


app.get('/api/trending-repos', async (req, res) => {
  try {
      const repos = await fetchTrendingRepos('javascript', 'monthly');
      res.json(repos);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching repositories' });
  }
});



var signupSchema = mongoose.Schema({username:{type:String},email:{type:String},password:{type:String},usertype:{type:String}},{versionKey:false})

var SignupModel = mongoose.model("signup",signupSchema,"signup");// internal name, schema_name, real collection_name

app.post("/api/signup",async(req,res)=>
{
    var newrecord = new SignupModel({username:req.body.username,email:req.body.email,password:req.body.password,usertype:"normal"})    
    //this will create a temp record into the model, not in real collection

    var result = await newrecord.save();//it will save the record into real collection
    
    if(result)
    {
        res.status(200).send({statuscode:1,msg:"Signup Successfull"})
        console.log(result)
    }
    else
    {
        res.status(500).send({statuscode:0,msg:"Signup not successfull"})
    }    
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
