// ==UserScript==
// @name         淘宝实时流量关键词
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        ://sycm.taobao.com/ipoll/visitor.htm?*
// @grant        none
// @require      https://code.jquery.com/jquery-1.11.3.js
// ==/UserScript==

(function() {
    'use strict';
    var printKeyWord = function(){
        index = index + 1
        content = content + index + "<br /><br />"
        $("#component-visitor-list .content .table-container tbody tr").each(
            function(i){
                var time = $(this).children(".col-2").text();
                var city = $(this).children(".col-5").children(".city-name").text();
                var keyWord = $(this).children(".col-3").children("p").children(".keyword").text();
                if(keyWord != '')
                {
                    content = content + time+'-------'+city+'-------'+keyWord + '<br />'
                }
            }
        );
    };

    var index = 0
    var content = "";
    var doIt = function(){
        setTimeout(
            function(){
                printKeyWord();
                var next = $(".ui-pagination-next")[0];
                if(next){
                    next.click();
                    doIt()
                }
                else
                {
                    $("body").prepend(content);
                }
            },1000);
    }

    doIt()

})();

