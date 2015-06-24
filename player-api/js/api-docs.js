var BCLSVJS = (function (window, document, docData, hljs) {
    "use strict";
    var title = document.getElementsByTagName('title')[0],
        // path as an array
        path = document.location.pathname.split("/"),
        // data structures
        classes = {thisClass: [], parentClass: []},
        doc_class,
        docsPath = "https://github.com/videojs/video.js/blob/master/src/js/",
        doc_data = {},
        // elements
        mainContent,
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
        addMembersContent,
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
     * get a copy of (rather than reference to) an object
     * @param  {object} obj - the object you want a copy
     * @return {object}     the copy
     */
    copyObj = function (obj) {
        if (isDefined(obj)) {
            return JSON.parse(JSON.stringify(obj));
        } else {
            bclslog("no obj passed");
        }

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

    };
    /**
     * add the class header content
     */
    addHeaderContent = function () {
        var topSection = createEl("section", {id: "top", class: "section"}),
            topSectionEl,
            header = createEl("h1", {id: doc_data.thisClass.headerInfo.name}),
            headerEl;
        // add main content wrapper
        doc_body.appendChild(mainContent);
        main = document.getElementById("main");
        // add elements
        topSection.appendChild(header);
        mainContent.appendChild(topSection);
        topSectionEl = document.getElementById("top");
        headerEl = document.getElementById(doc_data.thisClass.headerInfo.name);
        // add content
        // page header
        headerEl.textContent = doc_data.thisClass.headerInfo.name;
        // other stuff
        if (isDefined(doc_data.parentClass)) {
            topSectionEl.innerHTML += "<p><strong>EXTENDS</strong>: <a href=\"" + docsPath + doc_data.parentClass.headerInfo.meta.filename + "\">" + doc_data.parentClass.headerInfo.meta.filename + "</a></p>";
        }
        topSectionEl.innerHTML += "<p><strong>DEFINED IN</strong>: <a href=\"" + docsPath + doc_data.thisClass.headerInfo.meta.filename + "#" + doc_data.thisClass.headerInfo.meta.lineno +  "\">src/" + doc_data.thisClass.headerInfo.meta.filename + " line number: " + doc_data.thisClass.headerInfo.meta.lineno + "</a></p>";
        topSectionEl.innerHTML += doc_data.thisClass.headerInfo.description;
    };
    /**
     * add the side nav
     */
    addIndex = function () {
        var section = createEl("section", {id: "index", class: "sideNav"}),
            navHeader = createEl("h2"),
            navHeaderLink = createEl("a", {href: "index.html"}),
            memberIndex = createEl("div", {id: "memberIndex"}),
            item,
            parentList,
            header,
            listItem,
            listLink,
            classHeader,
            parentHeader,
            em,
            text,
            i,
            iMax,
            makeList = function (classArr, parentArr, member, headerText, list) {
                if (classArr.length > 0 || (isDefined(doc_data.parentClass) && parentArr.length > 0)) {
                    // add member list header
                    header = createEl("h3");
                    text = document.createTextNode(doc_data.thisClass.headerInfo.name + " " + member);
                    header.appendChild(text);
                    classHeader = createEl("h4");
                    text = document.createTextNode("Class " + member);
                    classHeader.appendChild(text);
                    memberIndex.appendChild(header);
                    memberIndex.appendChild(classHeader);
                    // add the list & items
                    list = createEl("ul", {id: list});
                    memberIndex.appendChild(list);
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
                        parentHeader = createEl("h4");
                        text = document.createTextNode("Inherited " + member);
                        parentHeader.appendChild(text);
                        memberIndex.appendChild(parentHeader);
                        parentList = createEl("ul");
                        memberIndex.appendChild(parentList);
                        iMax = parentArr.length;
                        for (i = 0; i < iMax; i++) {
                            item = parentArr[i].name;
                            listItem = createEl("li");
                            listLink = createEl("a", {href: "#" + item});
                            listItem.appendChild(listLink);
                            text = document.createTextNode(item);
                            listLink.appendChild(text);
                            // em = createEl("em");
                            // text = document.createTextNode(" inherited");
                            // em.appendChild(text);
                            // listItem.appendChild(em);
                            parentList.appendChild(listItem);
                        }
                    }
                }
            };
        text = document.createTextNode("API Index");
        navHeader.appendChild(navHeaderLink);
        navHeaderLink.appendChild(text);
        // add parent class members if any
        if (isDefined(doc_data.parentClass)) {
            makeList(doc_data.thisClass.propertiesArray, doc_data.parentClass.propertiesArray, "Properties", "propertiesHeader", "propertiesList");
            makeList(doc_data.thisClass.methodsArray, doc_data.parentClass.methodsArray, "Methods", "methodsHeader", "methodsList");
            makeList(doc_data.thisClass.eventsArray, doc_data.parentClass.eventsArray, "Events", "eventsHeader", "eventsList");
        } else {
            makeList(doc_data.thisClass.propertiesArray, [], "Properties", "propertiesHeader", "propertiesList");
            makeList(doc_data.thisClass.methodsArray, [], "Methods", "methodsHeader", "methodsList");
            makeList(doc_data.thisClass.eventsArray, [], "Events", "eventsHeader", "eventsList");
        }
        section.appendChild(navHeader);
        section.appendChild(memberIndex);
        doc_body.appendChild(section);

    };
    /**
     * add the member content
     */
    addMembersContent = function () {
        var members = [{name: "Properties", data: "propertiesArray"}, {name: "Methods", data: "methodsArray"}, {name: "Events", data: "eventsArray"}],
            member,
            section,
            header,
            headerSuffix,
            item,
            itemWrapper,
            itemHeader,
            itemHeaderStr,
            itemParams = [],
            itemParamsHeader,
            itemParamsList,
            itemParamsItem,
            itemParamsStr,
            itemDescription,
            itemDescriptionEl,
            itemFooter,
            itemFooterContent,
            itemFooterContentEl,
            paramTable,
            paramThead,
            paramTbody,
            paramTheadRow,
            paramTbodyRow,
            paramTH,
            paramTD,
            paramTableHeaders = ["Name", "Type", "Required", "Description"],
            text,
            i,
            iMax,
            j,
            jMax,
            k,
            kMax,
            topLinkP,
            topLinkA,
            createMemberItem = function (member) {
                section = createEl("section", {id: member.name.toLowerCase(), class: "section"});
                main.appendChild(section);
                header = createEl("h2");
                text = document.createTextNode(member.name);
                header.appendChild(text);
                section.appendChild(header);
                // create the class member items
                jMax = doc_data.thisClass[member.data].length;
                for (j = 0; j < jMax; j++) {
                    item = doc_data.thisClass[member.data][j];
                    itemWrapper = createEl("div", {id: item.name});
                    section.appendChild(itemWrapper);
                    itemHeader = createEl("h3", {id: item.name + "Header"});
                    itemHeaderStr = item.name;
                    itemWrapper.appendChild(itemHeader);
                    itemDescription = createEl("div", {id: item.name + "Description"});
                    itemWrapper.appendChild(itemDescription);
                    itemFooter = createEl("p", {class: "vjs-only"});
                    itemFooterContent = createEl("em", {id: item.name + "Footer"});
                    itemFooter.appendChild(itemFooterContent);
                    topLinkP = createEl("p");
                    topLinkA = createEl("a", {href: "#top"});
                    text = document.createTextNode("[back to top]");
                    topLinkA.appendChild(text);
                    topLinkP.appendChild(topLinkA);
                    // handle params if any
                    if (isDefined(item.params)) {
                        itemParams = [];
                        itemParamsHeader = createEl("h4");
                        text = document.createTextNode("Parameters");
                        itemParamsHeader.appendChild(text);
                        paramTable = createEl("table");
                        paramThead = createEl("thead");
                        paramTbody = createEl("tbody");
                        paramTable.appendChild(paramThead);
                        paramTable.appendChild(paramTbody);
                        paramTheadRow = createEl("tr");
                        paramThead.appendChild(paramTheadRow);
                        // set the table headers
                        kMax = paramTableHeaders.length;
                        for (k = 0; k < kMax; k++) {
                            paramTH = createEl("th");
                            text = document.createTextNode(paramTableHeaders[k]);
                            paramTheadRow.appendChild(paramTH);
                            paramTH.appendChild(text);
                        }
                        // now the table info
                        kMax = item.params.length;
                        for (k = 0; k < kMax; k++) {
                            paramTbodyRow = createEl("tr");
                            paramTbody.appendChild(paramTbodyRow);
                            paramTD = createEl("td");
                            text = document.createTextNode(item.params[k].name);
                            paramTD.appendChild(text);
                            paramTbodyRow.appendChild(paramTD);
                            paramTD = createEl("td");
                            text = document.createTextNode(item.params[k].type.names.join("|"));
                            paramTD.appendChild(text);
                            paramTbodyRow.appendChild(paramTD);
                            paramTD = createEl("td");
                            if (item.params[k].optional) {
                                text = document.createTextNode("no");
                                itemParams.push("[" + item.params[k].name + "]");
                            } else {
                                text = document.createTextNode("yes");
                                itemParams.push(item.params[k].name);
                            }
                            paramTD.appendChild(text);
                            if (isDefined(item.params[k].description)) {
                                paramTbodyRow.appendChild(paramTD);
                                paramTD = createEl("td");
                                text = document.createTextNode(item.params[k].description.slice(3, item.params[k].description.indexOf('</p>')));
                                paramTD.appendChild(text);
                                paramTbodyRow.appendChild(paramTD);
                            }
                            paramTbody.appendChild(paramTbodyRow);
                        }
                        itemHeaderStr += "( " + itemParams.join(", ") + " )";
                        if (item.scope === "static") {
                            itemHeaderStr = "static " + itemHeaderStr;
                        }
                        itemWrapper.appendChild(itemParamsHeader);
                        itemWrapper.appendChild(paramTable);
                    } else {
                        itemHeaderStr += "()";
                    }
                    itemWrapper.appendChild(itemFooter);
                    itemWrapper.appendChild(topLinkP);
                    text = document.createTextNode(itemHeaderStr);
                    itemHeader.appendChild(text);
                        if (isDefined(item.deprecated)) {
                            headerSuffix = createEl("em", {class: "deprecated"});
                            text = document.createTextNode(" (deprecated)");
                            headerSuffix.appendChild(text);
                            itemHeader.appendChild(headerSuffix);
                        }
                    itemDescriptionEl = document.getElementById(item.name + "Description");
                    itemDescriptionEl.innerHTML = item.description;
                    itemFooterContentEl = document.getElementById(item.name + "Footer");
                    itemFooterContentEl.innerHTML = "Defined in <a href=\"" + docsPath + item.meta.filename + "#" + item.meta.lineno + "\">src/js/" + item.meta.filename + " line number: " + item.meta.lineno + "</a>";
                }
                // now the inherited member items
                if (isDefined(doc_data.parentClass)) {
                    jMax = doc_data.parentClass[member.data].length;
                    for (j = 0; j < jMax; j++) {
                        item = doc_data.parentClass[member.data][j];
                        itemWrapper = createEl("div", {id: item.name});
                        section.appendChild(itemWrapper);
                        itemHeader = createEl("h3", {id: item.name + "Header"});
                        itemHeaderStr = item.name;
                        itemWrapper.appendChild(itemHeader);
                        itemDescription = createEl("div", {id: item.name + "Description"});
                        itemWrapper.appendChild(itemDescription);
                        itemFooter = createEl("p");
                        itemFooterContent = createEl("em", {id: item.name + "Footer"});
                        itemFooter.appendChild(itemFooterContent);
                        // handle params if any
                        if (isDefined(item.params)) {
                            itemParams = [];
                            itemParamsHeader = createEl("h4");
                            text = document.createTextNode("Parameters");
                            itemParamsHeader.appendChild(text);
                            itemParamsList = createEl("ul");
                            kMax = item.params.length;
                            for (k = 0; k < kMax; k++) {
                                itemParamsItem = createEl("li");
                                itemParamsList.appendChild(itemParamsItem);
                                itemParamsStr = item.params[k].name + " " + item.params[k].type.names.join("|");
                                if (item.params[k].optional) {
                                    itemParamsStr += " (Optional) ";
                                    itemParams.push("[" + item.params[k].name + "]");
                                } else {
                                    itemParams.push(item.params[k].name);
                                }
                                if (isDefined(item.params[k].description)) {
                                    itemParamsStr += " " + item.params[k].description.slice(3, item.params[k].description.indexOf('</p>'));
                                    text = document.createTextNode(itemParamsStr);
                                    itemParamsItem.appendChild(text);
                                }
                            }
                            itemHeaderStr += "( " + itemParams.join(", ") + " )";
                            itemWrapper.appendChild(itemParamsHeader);
                            itemWrapper.appendChild(itemParamsList);
                        } else {
                            if (itemHeaderStr[itemHeaderStr.length - 1] !== ")") {
                                itemHeaderStr += "()";
                            }
                        }
                        itemWrapper.appendChild(itemFooter);
                        text = document.createTextNode(itemHeaderStr);
                        itemHeader.appendChild(text);
                        itemDescriptionEl = document.getElementById(item.name + "Description");
                        itemDescriptionEl.innerHTML = item.description;
                        itemFooterContentEl = document.getElementById(item.name + "Footer");
                        itemFooterContentEl.innerHTML = "Inherited from <a href=\"" + docsPath + item.meta.filename + item.meta.lineno + "\">src/js/" + item.meta.filename + " line number: " + item.meta.lineno + "</a>";
                    }
                }

            };
        iMax = members.length;
        for (i = 0; i < iMax; i++) {
            member = members[i];
            if (doc_data.thisClass[member.data].length > 0) {
                createMemberItem(member);
            }
        }
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
        var fileName,
            srcFileName,
            parent_class,
            privateItems = [],
            overriddenItems = [],
            idx,
            j,
            jMax;
        // content wrapper
        mainContent = createEl("div", {id: "main", class: "section"});
        // get the class name from the file name
        fileName = path[path.length - 1];
        doc_class = fileName.substring(0, fileName.indexOf("."));
        srcFileName = doc_class + ".js";
        bclslog("srcFileName", srcFileName);
        // get the data objects for this class
        classes.thisClass = findClassObjects(docData, srcFileName);
        // get the class overview object
        bclslog("classes", classes)
        idx = findObjectInArray(classes.thisClass, "kind", "class");
        doc_data.thisClass = {};
        doc_data.thisClass.headerInfo = copyObj(classes.thisClass[idx]);
        // set the doc title
        title.innerHTML = doc_data.thisClass.headerInfo.name;
        // remove any private items
        privateItems = findObjectsInArray(classes.thisClass, "access", "private");
        j = privateItems.length;
        while (j > 0) {
            j--;
            classes.thisClass.splice(privateItems[j], 1);
        }
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
            j = privateItems.length;
            while (j > 0) {
                j--;
                classes.parentClass.splice(privateItems[j], 1);
            };
            // remove any overridden items
            jMax = classes.thisClass.length;
            for (j = 0; j < jMax; j++) {
                idx = findObjectInArray(classes.parentClass, "name", classes.thisClass[j].name);
                if (idx > 0) {
                    overriddenItems.push(idx);
                }
            }
            j = overriddenItems.length;
            while (j > 0) {
                j--;
                classes.parentClass.splice(overriddenItems[j], 1);
            };
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
        addIndex();
        addHeaderContent();
        addMembersContent();
        highlightCode();
    };
    // bclslog("class_data", class_data);
    // bclslog("parent_class_data", parent_class_data);
    init();
    return {

    };
})(window, document, docData, hljs);