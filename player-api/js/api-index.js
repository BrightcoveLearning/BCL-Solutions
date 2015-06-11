var BCLSVJS = (function (window, document, docData, hljs) {
    "use strict";
    var title = document.getElementsByTagName('title')[0],
        // path as an array
        path = document.location.pathname.split("/"),
        // data structures
        classes = [],
        // elements
        main,
        doc_body = document.getElementsByTagName("body")[0],
        // functions
        isDefined,
        copyObj,
        findObjectInArray,
        findObjectsInArray,
        getSubArray,
        sortArray,
        createEl,
        bclslog,
        addHeaderContent,
        addIndex,
        highlightCode,
        init;
    /**
     * Logging function - safe for IE
     * @param  {string} context - description of the data
     * @param  {*} message - the data to be logged by the console
     * @return {}
     */
    bclslog = function (context, message) {
        if (window["console"] && console["log"]) {
            console.log(context, message);
        }
        return;
    };
    /**
     * tests for all the ways a variable might be undefined or not have a value
     * @param {*} x the variable to test
     * @return {Boolean} true if variable is defined and has a value
     */
    isDefined = function (x) {
        if (x !== "" && x !== null && x !== undefined && x !== NaN) {
            return true;
        }
        return false;
    };
    /**
     * find index of an object in array of objects
     * based on some property value
     * generally useful for finding a unique object
     *
     * @param {array} targetArray - array to search
     * @param {string} objProperty - object property to search
     * @param {string|number} value - value of the property to search for
     * @return {integer} index of first instance if found, otherwise returns -1
     */
    findObjectInArray = function (targetArray, objProperty, value) {
        var i, totalItems = targetArray.length, objFound = false;
        for (i = 0; i < totalItems; i++) {
            if (targetArray[i][objProperty] === value) {
                objFound = true;
                return i;
            }
        }
        return -1;
    };
    /**
     * find indexes of a set of object in array of objects
     * based on some property value
     * generally useful for finding several objects
     *
     * @param {array} targetArray - array to search
     * @param {string} objProperty - object property to search
     * @param {string|number} value - value of the property to search for
     * @return {array} array of indexes for matching objects
     */
    findObjectsInArray = function (targetArray, objProperty, value) {
        var i, totalItems = targetArray.length, newArr = [];
        for (i = 0; i < totalItems; i++) {
            if (targetArray[i][objProperty] === value) {
                newArr.push(i);
            }
        }
        return newArr;
    };
    /**
     * get a subset of objects in array of objects
     * based on some property value
     *
     * @param {array} targetArray - array to search
     * @param {string} objProperty - object property to search
     * @param {string|number} value - value of the property to search for
     * @return {array} array of objects with matching property value
     */
    getSubArray = function (targetArray, objProperty, value) {
        var i, totalItems = targetArray.length, idxArr = [];
        for (i = 0; i < totalItems; i++) {
            if (targetArray[i][objProperty] === value) {
                idxArr.push(targetArray[i]);
            }
        }
        return idxArr;
    };
    /**
     * sort an array of objects based on an object property
     * @param {array} targetArray - array to sort
     * @param {string} objProperty - property whose value to sort on
     * @return {array} the sorted array
     */
    sortArray = function (targetArray, objProperty) {
        targetArray.sort(function (a, b) {
            var propA = a[objProperty].toLowerCase(), propB = b[objProperty].toLowerCase();
            // sort ascending; reverse propA and propB to sort descending
            if (propA < propB) {
                 return -1;
            } else if (propA > propB) {
                 return 1;
            }
             return 0;
        });
        return targetArray;
    };
    /**
     * create an element
     * @param  {string} type - the element type
     * @param  {object} attributes - attributes to add to the element
     * @return {object} the HTML element
     */
    createEl = function (type, attributes) {
        var el;
        if (isDefined(type)) {
            el = document.createElement(type);
            if (isDefined(attributes)) {
                var attr;
                for (attr in attributes) {
                    el.setAttribute(attr, attributes[attr]);
                }
            }
            return el;
        }
    };
    /**
     * add the class header content
     */
    addHeaderContent = function () {
        var mainContent = createEl("div", {id: "main", class: "section"}),
            topSection = createEl("section", {id: "top", class: "section"}),
            topSectionEl,
            header = createEl("h1"),
            text = document.createTextNode("API Index"),
            headerEl;
        // add elements
        header.appendChild(text);
        topSection.appendChild(header);
        mainContent.appendChild(topSection);
        doc_body.appendChild(mainContent);
        main = document.getElementById("main");
    };
    /**
     * add the side nav
     */
    addIndex = function () {
        var section = createEl("section", {id: "index", class: "section"}),
            sectionHeader = createEl("h2"),
            classlists = {},
            alphaArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
            firstLetter,
            numberAlphaItems = 0,
            itemsPerColumn,
            columnDiv,
            item,
            indexEls = [],
            indexListHolder,
            indexList,
            indexListHeader,
            listItem,
            listLink,
            listText,
            em,
            text,
            i,
            iMax,
            j,
            jMax,
            counter = 0;
        text = document.createTextNode("Index of classes");
        sectionHeader.appendChild(text);
        // create alpha arrays
        iMax = classes.length;
        for (i = 0; i < iMax; i++) {
            item = classes[i];
            firstLetter = item.name.charAt(0).toLowerCase();
            // create alpha array if non-existent, push item
            if (isDefined(classlists[firstLetter])) {
                classlists[firstLetter].push(item.name);
            } else {
                classlists[firstLetter] = [item.name];
                numberAlphaItems++;
            }
        }
        itemsPerColumn = Math.ceil(numberAlphaItems / 3);
        iMax = alphaArr.length;
        for (i = 0; i < iMax; i++) {
            if (isDefined(classlists[alphaArr[i]])) {
                indexListHolder = createEl("div");
                indexListHeader = createEl("h4", {class: "indexHeader"});
                text = document.createTextNode("~" + alphaArr[i].toUpperCase() + "~");
                indexListHeader.appendChild(text);
                indexListHolder.appendChild(indexListHeader);
                indexList = createEl("ul");
                indexListHolder.appendChild(indexList);
                jMax = classlists[alphaArr[i]].length;
                for (j = 0; j < jMax; j++) {
                    bclslog("classlists[alphaArr[i]", classlists[alphaArr[i]]);
                    listItem = createEl("li");
                    indexList.appendChild(listItem);
                    listLink = createEl("a", {href: classlists[alphaArr[i]][j].toLowerCase() + ".html"})
                    listItem.appendChild(listLink);
                    listText = document.createTextNode(classlists[alphaArr[i]][j]);
                    listLink.appendChild(listText);
                }
                indexEls.push(indexListHolder);
            }
        }
        bclslog("classlists", classlists);
        section.appendChild(sectionHeader);
        iMax = indexEls.length;
        for (i = 0; i < iMax; i++) {
            if (counter > itemsPerColumn) {
                counter = 0;
            }
            if (counter === 0) {
                columnDiv = createEl("div", {class:"indexColumn"});
                section.appendChild(columnDiv);
            }
            columnDiv.appendChild(indexEls[i]);
        }
        main.appendChild(section);
    };
    /**
     * init gets things going
     */
    init = function () {
        var privateItems = [],
            j;
        // get the data objects for all classes
        classes = getSubArray(docData, "kind", "class");
        bclslog("classes", classes);
        // set the doc title
        title.innerHTML = "API Documentation Index";
        // remove any private items
        privateItems = findObjectsInArray(classes, "access", "private");
        j = privateItems.length;
        do {
            classes.splice(privateItems[j--], 1);
        } while (j > 0);
        // sort the array
        classes = sortArray(classes, "name");
        // now we're ready to roll
        addHeaderContent();
        addIndex();
    };
    init();
    return {

    };
})(window, document, docData, hljs);