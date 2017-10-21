function setRouter(app){ 
 var router = app; 

router.get('/', function(req, res) {
  function getImgUrls(num) {
    var color, width, height, urls = [];
    for (var i = 0; i < num; i++) {
      color = Math.random().toString(16).substring(2, 8);
      width = 200;
      height = Math.floor(Math.random() * 300 + 200);
      urls.push("http://placehold.it/" + width + "x" + height + "/" + color + "/" + 'fff');
    }
      return urls; 

  }
  data = {
    status: 1,
    urls: getImgUrls(6)
  }
  console.log(data);
  res.send(data)  ;
})
}
 module.exports.setRouter = setRouter