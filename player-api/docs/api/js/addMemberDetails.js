jMax = doc_data.thisClass[member.data].length;
for (j = 0; j < jMax; j++) {
    item = doc_data.thisClass[member.data][j];
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