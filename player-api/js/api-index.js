var BCLSVJS = ( function (window, document, docData, hljs) {
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
        findClassObjects,
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
        if ( x !== "" && x !== null && x !== undefined && x !== NaN){
            return true;
        } else {
            return false;
        }
    };
    /**
     * get a copy of (rather than reference to) an object
     * @param  {object} obj - the object you want a copy
     * @return {object}     the copy
     */
    copyObj = function (obj) {
        return JSON.parse(JSON.stringify(obj));
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
        if (objFound === false) {
            return -1;
        }
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
        var i, totalItems = targetArray.length, objFound = false, idxArr = [];
        for (i = 0; i < totalItems; i++) {
            if (targetArray[i][objProperty] === value) {
                objFound = true;
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
            } else {
                 return 0;
            }
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
     * finds the objects in the doc data for a fileName
     * @param {array} arr - the array of objects to search
     * @param {string} filename - the filename to look for in the meta object
     * @return {array} - array of the objects found
     */
    findClassObjects = function (arr, filename) {
        var i, totalItems = arr.length, newArr = [];
        for (i = 0; i < totalItems; i++) {
            if (isDefined(arr[i].meta)) {
                if (arr[i].meta.filename === filename) {
                    newArr.push(arr[i]);
                }
            }

        }
        return newArr;

    }
    /**
     * add the class header content
     */
    addHeaderContent = function () {
        var mainContent = createEl("div", {id:"main", class: "section"}),
            topSection = createEl("section", {id:"top", class: "section"}),
            topSectionEl,
            header = createEl("h1", {id:doc_data.thisClass.headerInfo.name}),
            headerEl;
        // add elements
        topSection.appendChild(header);
        mainContent.appendChild(topSection);
        doc_body.appendChild(mainContent);
        main = document.getElementById("main");
        topSectionEl = document.getElementById("top");
        headerEl = document.getElementById(doc_data.thisClass.headerInfo.name);
        // add content
        // page header
        headerEl.textContent = doc_data.thisClass.headerInfo.name;
        // other stuff
        if (isDefined(doc_data.parentClass)) {
            topSectionEl.innerHTML += "<p><strong>EXTENDS</strong>: <a href=\"" + doc_data.parentClass.headerInfo.meta.filename + "\">" + doc_data.parentClass.headerInfo.meta.filename + "</a></p>";
        }
        topSectionEl.innerHTML += "<p><strong>DEFINED IN</strong>: <a href=\"" + doc_data.thisClass.headerInfo.meta.filename + "\">src/" + doc_data.thisClass.headerInfo.meta.filename + " line number: " + doc_data.thisClass.headerInfo.meta.lineno + "</a></p>";
        topSectionEl.innerHTML += doc_data.thisClass.headerInfo.description;
    };
    /**
     * add the side nav
     */
    addIndex = function () {
        var section = createEl("section", {id: "index", class: "section"}),
            sectionHeader = createEl("h2"),
            memberIndex = createEl("div", {id: "memberIndex"}),
            methodsHeader,
            eventsHeader,
            propertieHeader,
            methodsList,
            propertiesList,
            eventsList,
            item,
            listItem,
            listLink,
            em,
            text,
            i,
            iMax,
            makeList = function (classArr, parentArr, member, header, list) {
                if (classArr.length > 0 || isDefined(doc_data.parentClass) && parentArr.length > 0) {
                    // add member list header
                    header = createEl("h3", {id: header});
                    text = document.createTextNode(member);
                    header.appendChild(text);
                    // add the list & items
                    list = createEl("ul", {id: list});
                    iMax = classArr.length;
                    for (i = 0; i < iMax; i++) {
                        item = classArr[i].name;
                        listItem = createEl("li");
                        listLink = createEl("a", {href: "#" + item});
                        text = document.createTextNode(item);
                        listLink.appendChild(text);
                        listItem.appendChild(listLink);
                        list.appendChild(listItem);
                    }
                    if (isDefined(doc_data.parentClass) && parentArr.length > 0) {
                    iMax = parentArr.length;
                        for (i = 0; i < iMax; i++) {
                            item = parentArr[i].name;
                            listItem = createEl("li");
                            listLink = createEl("a", {href: "#" + item});
                            listItem.appendChild(listLink);
                            text = document.createTextNode(item);
                            listLink.appendChild(text);
                            em = createEl("em");
                            text = document.createTextNode(" inherited");
                            em.appendChild(text);
                            listItem.appendChild(em);
                            list.appendChild(listItem);
                        }
                    }
                    memberIndex.appendChild(header);
                    memberIndex.appendChild(list);
                }
            };
        text = document.createTextNode("Index");
        sectionHeader.appendChild(text);
        // add parent class members if any
        if (isDefined(doc_data.parentClass)) {
            makeList(doc_data.thisClass.propertiesArray, doc_data.parentClass.propertiesArray, "Properties", "propertiesHeader", "propertiesList");
            makeList(doc_data.thisClass.methodsArray, doc_data.parentClass.methodsArray, "Methods", "methodsHeader", "methodsList");
            makeList(doc_data.thisClass.eventsArray, doc_data.parentClass.eventsArray, "Events", "eventsHeader", "eventsList");
        }
        section.appendChild(sectionHeader);
        section.appendChild(memberIndex);
        main.appendChild(section);
    };
    /**
     * use hljs to highlight the syntax in code blocks
     */
    highlightCode = function () {
        var codeBlocks = document.querySelectorAll("pre code"),
            i,
            iMax;
        if (isDefined(codeBlocks)) {
            iMax = codeBlocks.length;
            for (i = 0; i < iMax; i++) {
                hljs.highlightBlock(codeBlocks[i]);
            }
        }
    };
    /**
     * init gets things going
     */
    init = function () {
        var className,
            fileName,
            breadcrumbs,
            breadcrumbsEl,
            srcFileName,
            parent_class,
            privateItems = [],
            overriddenItems = [],
            idx,
            j,
            jMax;
        // create breadcrumbs
        breadcrumbs = createEl("div", {id: "breadcrumbs", class: "breadcrumbs"})
        doc_body.appendChild(breadcrumbs);
        breadcrumbsEl = document.getElementById("breadcrumbs");
        breadcrumbsEl.innerHTML = "<a href=\"./index.html\">API Docs</a>/";
        // get the data objects for all classes
        classes = getSubArray(docData, "kind", "class");
        // get the class overview object
        idx = findObjectInArray(classes.thisClass, "kind", "class");
        doc_data.thisClass = {};
        doc_data.thisClass.headerInfo = copyObj(classes.thisClass[idx]);
        // set the doc title
        title.innerHTML = doc_data.thisClass.headerInfo.name;
        // remove any private items
        privateItems = findObjectsInArray(classes.thisClass, "access", "private");
        j = privateItems.length;
        do {
            classes.thisClass.splice(privateItems[j--], 1);
        } while (j > 0);
        // now get the member arrays
        doc_data.thisClass.methodsArray = getSubArray(classes.thisClass, "kind", "function");
        doc_data.thisClass.methodsArray = sortArray(doc_data.thisClass.methodsArray, "name");
        doc_data.thisClass.eventsArray = getSubArray(classes.thisClass, "kind", "event");
        doc_data.thisClass.eventsArray = sortArray(doc_data.thisClass.eventsArray, "name");
        doc_data.thisClass.propertiesArray = getSubArray(classes.thisClass, "kind", "property");
        doc_data.thisClass.propertiesArray = sortArray(doc_data.thisClass.propertiesArray, "name");
        bclslog("thisClass", doc_data.thisClass);
        // get parent class, if any
        if (isDefined(doc_data.thisClass.headerInfo.augments)) {
            parent_class = doc_data.thisClass.headerInfo.augments[0].toLowerCase();
            // get data objects for the class
            classes.parentClass = findClassObjects(docData, parent_class + ".js");
            doc_data.parentClass = {};
            // get parent header info
            idx = findObjectInArray(classes.parentClass, "kind", "class");
            doc_data.parentClass.headerInfo = copyObj(classes.parentClass[idx]);
            // remove any private items
            privateItems = findObjectsInArray(classes.parentClass, "access", "private");
            bclslog("privateItems", privateItems);
            j = privateItems.length;
            do {
                classes.parentClass.splice(privateItems[j--], 1);
            } while (j > 0);
            // remove any overridden items
            jMax = classes.thisClass.length;
            for (j = 0; j < jMax; j++) {
                idx = findObjectInArray(classes.parentClass, "name", classes.thisClass[j].name);
                if (idx > 0) {
                    overriddenItems.push(idx);
                }
            }
            j = overriddenItems.length;
            do {
                classes.parentClass.splice(overriddenItems[j--], 1);
            } while (j > 0)
            // now get the member arrays
            doc_data.parentClass.methodsArray = getSubArray(classes.parentClass, "kind", "function");
            doc_data.parentClass.methodsArray = sortArray(doc_data.parentClass.methodsArray, "name");
            doc_data.parentClass.eventsArray = getSubArray(classes.parentClass, "kind", "event");
            doc_data.parentClass.eventsArray = sortArray(doc_data.parentClass.eventsArray, "name");
            doc_data.parentClass.propertiesArray = getSubArray(classes.parentClass, "kind", "property");
            doc_data.parentClass.propertiesArray = sortArray(doc_data.parentClass.propertiesArray, "name");
            bclslog("parentClass", doc_data.parentClass);
        }
        // now we're ready to roll
        addHeaderContent();
        addIndex();
        addMembersContent();
        highlightCode();
    };
    // bclslog("class_data", class_data);
    // bclslog("parent_class_data", parent_class_data);
    init();
    return {

    };
})(window, document, docData, hljs);