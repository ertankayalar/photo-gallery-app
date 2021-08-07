/**
 * Array Helpers
 *
 *
 * @version 0.0.1
 */

/**
 * sort array for build tree view array
 * @param q (Array): A query result (see example below)
 * @param id (String): The name of the id column (Default: "id")
 * @param parentid (String): The name of the ParentItemID column (Default: "parentid") options
 * https://gist.github.com/smrchy/7040377
 * @returns
 */
export const _queryTreeSort = function (options) {
  var cfi, e, i, id, o, pid, rfi, ri, thisid, _i, _j, _len, _len1, _ref, _ref1;
  id = options.id || "id";
  pid = options.parentid || "parentid";
  ri = [];
  rfi = {};
  cfi = {};
  o = [];
  _ref = options.q;
  for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
    e = _ref[i];
    rfi[e[id]] = i;
    if (cfi[e[pid]] == null) {
      cfi[e[pid]] = [];
    }
    cfi[e[pid]].push(options.q[i][id]);
  }
  _ref1 = options.q;
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    e = _ref1[_j];
    if (rfi[e[pid]] == null) {
      ri.push(e[id]);
    }
  }
  while (ri.length) {
    thisid = ri.splice(0, 1);
    o.push(options.q[rfi[thisid]]);
    if (cfi[thisid] != null) {
      ri = cfi[thisid].concat(ri);
    }
  }
  return o;
};

/**
 * build Tree form sorted array
 * @param q (Array): A query result (see example below)
 * @param id (String): The name of the id column (Default: "id")
 * @param parentid (String): The name of the ParentItemID column (Default: "parentid")
 * @param children (String): The name of the "children" array to be created in rows that have children (Default: "children")
 * @returns
 */
export const _makeTree = function (options) {
  var children, e, id, o, pid, temp, _i, _len, _ref;
  id = options.id || "id";
  pid = options.parentid || "parentid";
  children = options.children || "children";
  temp = {};
  o = [];
  _ref = options.q;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    e = _ref[_i];
    e[children] = [];
    temp[e[id]] = e;
    if (temp[e[pid]] != null) {
      temp[e[pid]][children].push(e);
    } else {
      o.push(e);
    }
  }
  return o;
};

/**
 * Render Tree to HTML
 * @param {*} tree
 * @returns
 * https://gist.github.com/smrchy/7040377
 */
export const _renderTree = function (tree) {
  var e, html, _i, _len;
  html = "<ul>";
  for (_i = 0, _len = tree.length; _i < _len; _i++) {
    e = tree[_i];
    html += "<li>" + e.name;
    if (e.children != null) {
      html += _renderTree(e.children);
    }
    html += "</li>";
  }
  html += "</ul>";
  return html;
};
