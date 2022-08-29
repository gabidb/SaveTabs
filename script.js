document.getElementById("saveButton").addEventListener("click", getAllTabs);

function getAllTabs() {
    chrome.windows.getCurrent(function(window){
        chrome.tabs.query({windowId:window.id},function(tabs){
            chrome.bookmarks.create({
                title: "Test",
                url: null
                }, bookmarkItem => {
                    onBookmarkAdded(bookmarkItem);
                    chrome.bookmarks.create({
                        title: "Open All",
                        url: 'javascript: (() => {})();',
                        parentId: bookmarkItem.id
                    }, onBookmarkAdded);
                    tabs.forEach(function(tab){
                        console.log(tab.url);
                        chrome.bookmarks.create({
                            title: tab.title,
                            url: tab.url,
                            parentId: bookmarkItem.id
                        },onBookmarkAdded );
                    });
            });
        });
    });
   
}

function onBookmarkAdded(bookmarkItem) {
    console.log("Bookmark added with ID: " + bookmarkItem.id, bookmarkItem);
}