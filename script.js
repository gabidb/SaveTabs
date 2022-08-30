document.getElementById("saveButton").addEventListener("click", getAllTabs);

function getAllTabs() {
    chrome.windows.getCurrent(function(window){
        chrome.tabs.query({windowId:window.id},function(tabs){
            var bmName = document.getElementById("bm_name").value;
            var result = "javascript:(function(){"
            var num = 1;
            tabs.forEach(function(tab){
                var url = `var w${num} = window.open('${tab.url}','_blank');`
                num++;
                result = result.concat(url);
            });
            result = result.concat("})();");
            console.log(result)
            chrome.bookmarks.create({
                title: bmName,
                url: result,
            },onBookmarkAdded);
        });
    });
   
}

function onBookmarkAdded(bookmarkItem) {
    console.log("Bookmark added with ID: " + bookmarkItem.id, bookmarkItem);
    window.close();
}