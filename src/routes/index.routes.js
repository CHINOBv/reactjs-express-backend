module.exports = app =>{

  app.get('/', (req,res) => {
    res.send("index page")
  });

};