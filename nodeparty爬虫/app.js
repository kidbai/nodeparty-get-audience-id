var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var app = express();
app.get('/', function (req, res, next) {
    superagent.get('https://github.com/cnodejs/nodeparty/issues/7')
    .end(function (err, sres){
        if(err)
        {
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items = [];
        $(".timeline-comment-header .author").each(function (idx, element){
            var $element = $(element);
            items.push({
                id: $element.text(),
            });
        });

        res.send(items);
    });
});

app.listen(3000, function(){
    console.log('app is listening at port 3000');
});