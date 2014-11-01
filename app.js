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

        var objs = items;
        var lodash = require('lodash');
        objs = lodash.sortBy(objs, 'id');
        objs = lodash.uniq(objs, 'id');

        objs = objs.map(function (obj) { return obj.id });
        objs = objs.join('\n');

        var fs = require('fs');
        fs.open('id.text', 'w', 0644, function(e, fd){
            if(e) throw e;
            fs.write(fd, objs, 0, 'utf-8', function(e){
                if(e) throw e;
                fs.closeSync(fd);
            });
        });

    });
});

app.listen(3000, function(){
    console.log('app is listening at port 3000');
});