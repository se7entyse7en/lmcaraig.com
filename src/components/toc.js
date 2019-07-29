import React from "react"

function buildList(sections, key, enableAnchors) {
  const items = buildItems(sections, key, enableAnchors);
  if (items.length === 0) {
    return items;
  } else {
    return <ul>{buildItems(sections, key, enableAnchors)}</ul>;
  }
}

function buildItems(sections, key, enableAnchors) {
  const items = [];
  for (var k in sections[key]) {
    const nestedList = buildList(sections[key], k, enableAnchors);
    const splitted = k.split("|");

    items.push(
      <ListItem key={splitted[1]} text={splitted[0]} anchor={splitted[1]}
                nestedList={nestedList} enableAnchors={enableAnchors}>
      </ListItem>
    );
  }
  return items;
}

export default props => {
  const flatSections = props.htmlAst.children.filter(function(elem) {
    if (elem.type === "element") {
      const patt = /^h(1|2|3|4|5|6)$/gmi;
      if (patt.test(elem.tagName)) {
        return true;
      }
    }

    return false;
  }).map(function(elem) {
    return {
      level: parseInt(elem.tagName[1]),
      anchor: elem.children[0].properties.href,
      text: elem.children[1].value
    };
  });

  const sections = {};
  let currentPath = ["root"];
  flatSections.map(function(elem) {
    while (currentPath.length + 1 > elem.level) {
      currentPath.pop();
    }

    const key = elem.text + "|" + elem.anchor;
    currentPath.push(key);
    let obj = sections;
    currentPath.slice(0, -1).map(function(elem) {
      if (!(elem in obj)) {
        obj[elem] = {};
      }

      obj = obj[elem];
      return null;
    });

    obj[currentPath[currentPath.length - 1]] = {};
    return null;
  });

  return (
    <React.Fragment>
      <h4>Table of contents</h4>
      <div>
        { buildList(sections, "root", props.enableAnchors) }
      </div>
    </React.Fragment>
  );
}

const ListItem = (props) => {
  const nestedList = props.nestedList;
  const anchor = props.anchor;
  const text = props.text;

  if (nestedList.length === 0) {
    if (props.enableAnchors) {
      return (<li><a href={anchor}>{text}</a></li>);
    } else {
      return (<li>{text}</li>);
    }
  } else {
    if (props.enableAnchors) {
      return (<li><a href={anchor}>{text}</a>{nestedList}</li>);
    } else {
      return (<li>{text}{nestedList}</li>);
    }
  }
};
