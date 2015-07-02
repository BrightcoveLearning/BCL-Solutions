var BCLSVJS = (function (window, document, docData, hljs) {
    "use strict";
    var title = document.getElementsByTagName('title')[0],
        // data structures
        classes = {thisClass: [], parentClass: []},
        doc_class,
        docsPath = "https://github.com/videojs/video.js/blob/master/src/js/",
        doc_data = {},
        // doc path as an array
        path = document.location.pathname.split("/"),
        // paths
        classFilePath,
        parentClassFilePath,
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
        addText,
        highlightCode,
        init;
    /**
     * Logging function - safe for IE
     *
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
     *
     * @param {*} x the variable to test
     * @return {Boolean} true if variable is defined and has a value
     */
    isDefined = function (x) {
        if (x === "" || x === null || x === undefined || x === NaN) {
            return false;
        }
        return true;
    };
    /**
     * get a copy of (rather than reference to) an object
     *
     * @param  {object} obj - the object you want a copy
     * @return {object}     the copy
     */
    copyObj = function (obj) {
        if (isDefined(obj)) {
            return JSON.parse(JSON.stringify(obj));
        }
        bclslog("no obj passed");
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
     *
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
     *
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
     * creates a text node and adds it to an element
     * @param {object|node} el - the node (element) to add the text to
     * @param {string} str - the text to add
     */
    addText = function (el, str) {
        var text = document.createTextNode(str);
        el.appendChild(text);
    };
    /**
     * finds the objects in the doc data for a fileName
     *
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
        var topSection = createEl('section', {id: 'top', class: 'section'}),
            headerData = doc_data.thisClass.headerInfo,
            header = createEl('h1', {id: headerData.name}),
            extendsNode = createEl('p'),
            extendsLink,
            definedIn = createEl('p'),
            definedInLink = createEl('a', {href: docsPath + classFilePath}),
            description = createEl('div', {style: 'border:none', id: 'classDescription'}),
            descriptionEl,
            constructorHeader = createEl('h3'),
            constructorPre = createEl('pre'),
            constructorCode = createEl('code'),
            constructorParamsHeader = createEl('h4'),
            constructorParams = [],
            text;
        // add main content wrapper
        doc_body.appendChild(mainContent);
        main = document.getElementById('main');
        // add elements
        topSection.appendChild(header);
        topSection.appendChild(description);
        // source file
        topSection.appendChild(definedIn);
        addText(definedIn, 'DEFINED IN: ');
        definedIn.appendChild(definedInLink);
        addText(definedInLink, headerData.meta.filename + ' line number: ' + headerData.meta.lineno);
        // parent info if this class extends another
        if (isDefined(doc_data.parentClass)) {
            topSection.appendChild(extendsNode);
            addText(extendsNode, 'EXTENDS: ');
            extendsLink = createEl('a', {href: parentClassFilePath + doc_data.parentClass.headerInfo.meta.filename});
            extendsNode.appendChild(extendsLink);
            addText(extendsLink, doc_data.parentClass.headerInfo.meta.filename);
        }
        // constructor info
        topSection.appendChild(constructorHeader);
        topSection.appendChild(constructorPre);
        constructorPre.appendChild(constructorCode);
        mainContent.appendChild(topSection);
        // page header
        addText(header, headerData.name);
        // create the constructor info
        addText(constructorHeader, 'Constructor');
        // get constructor params if any
        if (isDefined(headerData.params)) {
            var paramTableHeaders = ['name', 'Type', 'Required', 'Description'],
                paramTable = createEl('table'),
                paramThead = createEl('thead'),
                paramTbody = createEl('tbody'),
                paramTheadRow = createEl('tr'),
                paramTbodyRow = createEl('tr'),
                paramTH,
                paramTD,
                k,
                kMax;

            addText(constructorParamsHeader, 'Parameters');
            paramTable.appendChild(paramThead);
            paramTable.appendChild(paramTbody);
            paramThead.appendChild(paramTheadRow);
            // set the table headers
            kMax = paramTableHeaders.length;
            for (k = 0; k < kMax; k++) {
                paramTH = createEl('th');
                paramTheadRow.appendChild(paramTH);
                addText(paramTH, paramTableHeaders[k]);
            }
            // now the table info
            kMax = headerData.params.length;
            for (k = 0; k < kMax; k++) {
                paramTbodyRow = createEl('tr');
                paramTbody.appendChild(paramTbodyRow);
                paramTD = createEl('td');
                addText(paramTD, headerData.params[k].name);
                paramTbodyRow.appendChild(paramTD);
                paramTD = createEl('td');
                addText(paramTD, headerData.params[k].type.names.join('|'));
                paramTbodyRow.appendChild(paramTD);
                paramTD = createEl('td');
                if (headerData.params[k].optional) {
                    text = document.createTextNode('no');
                    constructorParams.push('[' + headerData.params[k].name + ']');
                } else {
                    text = document.createTextNode('yes');
                    constructorParams.push(headerData.params[k].name);
                }
                addText(paramTD, text);
                if (isDefined(headerData.params[k].description)) {
                    paramTbodyRow.appendChild(paramTD);
                    paramTD = createEl('td');
                    addText(paramTD, headerData.params[k].description.slice(3, headerData.params[k].description.indexOf('</p>')));
                    paramTbodyRow.appendChild(paramTD);
                }
                paramTbody.appendChild(paramTbodyRow);
            }
            topSection.appendChild(constructorParamsHeader);
            topSection.appendChild(paramTable);
        }
        if (constructorParams.length > 0) {
        text = document.createTextNode(headerData.name + '( ' + constructorParams.join(',') + ' )');
        } else {
        text = document.createTextNode(headerData.name + '()');
        }
        addText(constructorCode, text);
        descriptionEl = document.getElementById('classDescription');
        descriptionEl.innerHTML =  headerData.description;
        // other stuff
    };
    /**
     * add the side nav
     */
    addIndex = function () {
        var section = createEl('section', {id: 'index', class: 'sideNav'}),
            navHeader = createEl('h2'),
            navHeaderLink = createEl('a', {href: 'index.html'}),
            memberIndex = createEl('div', {id: 'memberIndex'}),
            item,
            parentList,
            header,
            listItem,
            listLink,
            classHeader,
            parentHeader,
            text,
            i,
            iMax,
            makeList = function (classArr, parentArr, member, list) {
                if (classArr.length > 0 || (isDefined(doc_data.parentClass) && parentArr.length > 0)) {
                    // add member list header
                    header = createEl('h3');
                    addText(header, doc_data.thisClass.headerInfo.name + ' ' + member);
                    classHeader = createEl('h4');
                    addText(classHeader, 'Class ' + member);
                    memberIndex.appendChild(header);
                    memberIndex.appendChild(classHeader);
                    // add the list & items
                    list = createEl('ul', {id: list});
                    memberIndex.appendChild(list);
                    iMax = classArr.length;
                    for (i = 0; i < iMax; i++) {
                        item = classArr[i].name;
                        listItem = createEl('li');
                        listLink = createEl('a', {href: '#' + item});
                        addText(listLink, item);
                        listItem.appendChild(listLink);
                        list.appendChild(listItem);
                    }
                    // add inherited items if any
                    if (isDefined(doc_data.parentClass) && parentArr.length > 0) {
                        parentHeader = createEl('h4');
                        addText(parentHeader, 'Inherited ' + member);
                        memberIndex.appendChild(parentHeader);
                        parentList = createEl('ul');
                        memberIndex.appendChild(parentList);
                        iMax = parentArr.length;
                        for (i = 0; i < iMax; i++) {
                            item = parentArr[i].name;
                            listItem = createEl('li');
                            listLink = createEl('a', {href: '#' + item});
                            listItem.appendChild(listLink);
                            addText(listLink, item);
                            parentList.appendChild(listItem);
                        }
                    }
                }
            };
        navHeader.appendChild(navHeaderLink);
        addText(navHeaderLink, 'API Index');
        // add parent class members if any
        if (isDefined(doc_data.parentClass)) {
            makeList(doc_data.thisClass.propertiesArray, doc_data.parentClass.propertiesArray, 'Properties', 'propertiesList');
            makeList(doc_data.thisClass.methodsArray, doc_data.parentClass.methodsArray, 'Methods', 'methodsList');
            makeList(doc_data.thisClass.eventsArray, doc_data.parentClass.eventsArray, 'Events', 'eventsList');
        } else {
            makeList(doc_data.thisClass.propertiesArray, [], 'Properties', 'propertiesList');
            makeList(doc_data.thisClass.methodsArray, [], 'Methods', 'methodsList');
            makeList(doc_data.thisClass.eventsArray, [], 'Events', 'eventsList');
        }
        section.appendChild(navHeader);
        section.appendChild(memberIndex);
        doc_body.appendChild(section);

    };
    /**
     * add the member content
     */
    addMembersContent = function () {
        var members = [{name: 'Properties', data: 'propertiesArray'}, {name: 'Methods', data: 'methodsArray'}, {name: 'Events', data: 'eventsArray'}],
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
            itemFooterLink,
            itemFooterContent,
            itemFooterContentEl,
            paramTable,
            paramThead,
            paramTbody,
            paramTheadRow,
            paramTbodyRow,
            paramTH,
            paramTD,
            paramTableHeaders = ['name', 'Type', 'Required', 'Description'],
            text,
            i,
            iMax,
            j,
            jMax,
            k,
            kMax,
            topLinkP,
            topLinkA,
            createMemberItem = function (classData, member) {
                section = createEl('section', {id: member.name.toLowerCase(), class: 'section'});
                main.appendChild(section);
                header = createEl('h2');
                addText(header, member.name);
                section.appendChild(header);
                // create the class member items
                jMax = classData[member.data].length;
                for (j = 0; j < jMax; j++) {
                    item = classData[member.data][j];
                    itemWrapper = createEl('div', {id: item.name});
                    section.appendChild(itemWrapper);
                    itemHeader = createEl('h3', {id: item.name + 'Header'});
                    itemHeaderStr = item.name;
                    itemWrapper.appendChild(itemHeader);
                    itemDescription = createEl('div', {id: item.name + 'Description'});
                    itemWrapper.appendChild(itemDescription);
                    itemFooter = createEl('p', {class: 'vjs-only'});
                    itemFooterLink = createEl('a', {href: docsPath + item.meta.filename + '#' + item.meta.lineno})
                    itemFooterContent = createEl('em', {id: item.name + 'Footer'});
                    itemFooter.appendChild(itemFooterContent);
                    topLinkP = createEl('p');
                    topLinkA = createEl('a', {href: '#top'});
                    addText(topLinkA, '[back to top]');
                    topLinkP.appendChild(topLinkA);
                    // handle params if any
                    if (isDefined(item.params)) {
                        itemParams = [];
                        itemParamsHeader = createEl('h4');
                        addText(itemParamsHeader, 'Parameters');
                        paramTable = createEl('table');
                        paramThead = createEl('thead');
                        paramTbody = createEl('tbody');
                        paramTable.appendChild(paramThead);
                        paramTable.appendChild(paramTbody);
                        paramTheadRow = createEl('tr');
                        paramThead.appendChild(paramTheadRow);
                        // set the table headers
                        kMax = paramTableHeaders.length;
                        for (k = 0; k < kMax; k++) {
                            paramTH = createEl('th');
                            paramTheadRow.appendChild(paramTH);
                            addText(paramTH, paramTableHeaders[k]);
                        }
                        // now the table info
                        kMax = item.params.length;
                        for (k = 0; k < kMax; k++) {
                            paramTbodyRow = createEl('tr');
                            paramTbody.appendChild(paramTbodyRow);
                            paramTD = createEl('td');
                            addText(paramTD, item.params[k].name);
                            paramTbodyRow.appendChild(paramTD);
                            paramTD = createEl('td');
                            addText(paramTD, item.params[k].type.names.join('|'));
                            paramTbodyRow.appendChild(paramTD);
                            paramTD = createEl('td');
                            if (item.params[k].optional) {
                                text = document.createTextNode('no');
                                itemParams.push('[' + item.params[k].name + ']');
                            } else {
                                text = document.createTextNode('yes');
                                itemParams.push(item.params[k].name);
                            }
                            addText(paramTD, text);
                            if (isDefined(item.params[k].description)) {
                                paramTbodyRow.appendChild(paramTD);
                                paramTD = createEl('td');
                                text = document.createTextNode(item.params[k].description.slice(3, item.params[k].description.indexOf('</p>')));
                                addText(paramTD, text);
                                paramTbodyRow.appendChild(paramTD);
                            }
                            paramTbody.appendChild(paramTbodyRow);
                        }
                        itemHeaderStr += '( ' + itemParams.join(', ') + ' )';
                        if (item.scope === 'static') {
                            itemHeaderStr = 'static ' + itemHeaderStr;
                        }
                        itemWrapper.appendChild(itemParamsHeader);
                        itemWrapper.appendChild(paramTable);
                    } else {
                        itemHeaderStr += '()';
                    }
                    itemWrapper.appendChild(itemFooter);
                    itemWrapper.appendChild(topLinkP);
                    addText(itemHeader, itemHeaderStr);
                    if (isDefined(item.deprecated)) {
                        headerSuffix = createEl('em', {class: 'deprecated'});
                        text = document.createTextNode();
                        addText(headerSuffix, ' (deprecated)');
                        itemHeader.appendChild(headerSuffix);
                    }
                    itemDescriptionEl = document.getElementById(item.name + 'Description');
                    itemDescriptionEl.innerHTML = item.description;
                    addText(itemFooterContent, 'Defined in ');
                    itemFooterContent.appendChild(itemFooterLink);
                    addText(itemFooterLink, 'src/js/' + item.meta.filename + ' line number: ' + item.meta.lineno);
                }
            };
        iMax = members.length;
        for (i = 0; i < iMax; i++) {
            member = members[i];
            if (doc_data.thisClass[member.data].length > 0) {
                createMemberItem(doc_data.thisClass, member);
            }
        }
        if (isDefined(doc_data.parentClass)) {
            for (i = 0; i < iMax; i++) {
                member = members[i];
                if (doc_data.parentClass[member.data].length > 0) {
                    createMemberItem(doc_data.parentClass, member);
                }
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
            text,
            j,
            jMax,
            parentCounter = 0.
            getAncestorData = function (class_name) {
                if (isDefined(doc_data[class_name]headerInfo.augments)) {
                parent_class = doc_data[class_name]headerInfo.augments[0].toLowerCase();
                // get data objects for the class
                classes.parentClasses[parentCounter] = findClassObjects(docData, parent_class + ".js");
                // check to see if there are any parent class items
                if (classes.parentClasses[parentCounter].length > 0) {
                    doc_data.parentClasses[parentCounter] = {};
                    // get parent header info
                    idx = findObjectInArray(classes.parentClasses[parentCounter], 'kind', 'class');
                    doc_data.parentClasses[parentCounter].headerInfo = copyObj(classes.parentClasses[parentCounter][idx]);
                    // get parent class path
                    idx = findObjectInArray(classes.parentClasses[parentCounter], 'kind', 'file');
                    if (idx > -1) {
                        parentClassFilePath = classes.parentClasses[parentCounter][idx].name;
                    } else {
                        parentClassFilePath = doc_data.parentClasses[parentCounter].headerInfo.meta.filename;
                    }
                    // remove any private items
                    privateItems = findObjectsInArray(classes.parentClasses[parentCounter], "access", "private");
                    j = privateItems.length;
                    while (j > 0) {
                        j--;
                        classes.parentClasses[parentCounter].splice(privateItems[j], 1);
                    }
                    // now get the member arrays
                    doc_data.parentClasses[parentCounter].methodsArray = getSubArray(classes.parentClass, 'kind', 'function');
                    doc_data.parentClasses[parentCounter].methodsArray = sortArray(doc_data.parentClass.methodsArray, 'name');
                    doc_data.parentClasses[parentCounter].eventsArray = getSubArray(classes.parentClass, 'kind', "event");
                    doc_data.parentClasses[parentCounter].eventsArray = sortArray(doc_data.parentClass.eventsArray, 'name');
                    doc_data.parentClasses[parentCounter].propertiesArray = getSubArray(classes.parentClass, 'kind', 'property');
                    doc_data.parentClasses[parentCounter].propertiesArray = sortArray(doc_data.parentClass.propertiesArray, 'name');
                }
            };
        // content wrapper
        mainContent = createEl('div', {id: "main", class: "section"});
        // get the class name from the file name
        fileName = path[path.length - 1];
        doc_class = fileName.substring(0, fileName.indexOf("."));
        srcFileName = doc_class + ".js";
        bclslog("srcFileName", srcFileName);
        // get the data objects for this class
        classes.thisClass = findClassObjects(docData, srcFileName);
        // get the class overview object
        bclslog("classes", classes);
        idx = findObjectInArray(classes.thisClass, 'kind', 'class');
        doc_data.thisClass = {};
        doc_data.thisClass.headerInfo = copyObj(classes.thisClass[idx]);
        // get the file path from @file object
        idx = findObjectInArray(classes.thisClass, 'kind', 'file');
        if (idx > -1) {
            classFilePath = classes.thisClass[idx].name;
        } else {
            classFilePath = doc_data.thisClass.headerInfo.meta.filename;
        }
        // set the doc title
        text = document.createTextNode(doc_data.thisClass.headerInfo.name);
        title.appendChild(text);
        // remove any private items
        privateItems = findObjectsInArray(classes.thisClass, "access", "private");
        j = privateItems.length;
        while (j > 0) {
            j--;
            classes.thisClass.splice(privateItems[j], 1);
        }
        // now get the member arrays
        doc_data.thisClass.methodsArray = getSubArray(classes.thisClass, 'kind', 'function');
        doc_data.thisClass.methodsArray = sortArray(doc_data.thisClass.methodsArray, 'name');
        doc_data.thisClass.eventsArray = getSubArray(classes.thisClass, 'kind', "event");
        doc_data.thisClass.eventsArray = sortArray(doc_data.thisClass.eventsArray, 'name');
        doc_data.thisClass.propertiesArray = getSubArray(classes.thisClass, 'kind', 'property');
        doc_data.thisClass.propertiesArray = sortArray(doc_data.thisClass.propertiesArray, 'name');
        bclslog("thisClass", doc_data.thisClass);
        // get parent class, if any, and anything it inherits
        if (isDefined(doc_data[class_name]headerInfo.augments)) {
            doc_data.parentClass = {};
            doc_data.parentClasses = [];
            getAncestorData('thisClass')
        }
        // remove any overridden items
        jMax = classes.thisClass.length;
        for (j = 0; j < jMax; j++) {
            idx = findObjectInArray(classes.parentClasses[parentCounter], 'name', classes.thisClass[j].name);
            if (idx > 0) {
                overriddenItems.push(idx);
            }
        }
        j = overriddenItems.length;
        while (j > 0) {
            j--;
            classes.parentClasses[parentCounter].splice(overriddenItems[j], 1);
        }

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
